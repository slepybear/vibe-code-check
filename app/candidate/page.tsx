'use client';

import { useState, useEffect, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { problems } from '@/data/problems';
import { ProjectMode, isImageFile, Problem } from '@/types';
import { LEVEL_LABELS, LEVEL_COLORS } from '@/lib/constants';
import Editor from '@monaco-editor/react';
import JSZip from 'jszip';
import Link from 'next/link';
import { useFileSystemStore } from '@/store/fileSystemStore';
import FileTreeEditor from '@/components/FileTreeEditor';
import Timer from '@/components/Timer';

function CandidateContent() {
  const searchParams = useSearchParams();
  const problemId = searchParams.get('problemId');

  const [problem, setProblem] = useState<Problem | null>(null);
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false);

  useEffect(() => {
    if (problemId) {
      const foundProblem = problems.find(p => p.id === problemId);
      setProblem(foundProblem || null);
    } else {
      setProblem(null);
    }
  }, [problemId]);
  
  // 候选人信息
  const [candidateInfo, setCandidateInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [showCandidateForm, setShowCandidateForm] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  
  const {
    files,
    activeFilePath,
    initializeFromProblem,
    updateFile,
    getActiveFile,
    resetFiles
  } = useFileSystemStore();

  useEffect(() => {
    if (problem) {
      initializeFromProblem(problem.template, problem.mode, problem.images);
    }
  }, [problem, initializeFromProblem]);

  const activeFile = useMemo(() => getActiveFile(), [getActiveFile, files, activeFilePath]);

  const getPreviewHtml = () => {
    if (files.length === 0) {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>VibeCode Preview</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            }
            .empty-project {
              text-align: center;
              padding: 40px;
              background: white;
              border-radius: 16px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .empty-project h1 {
              color: #333;
              margin-bottom: 10px;
            }
            .empty-project p {
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="empty-project">
            <h1>📁 空项目</h1>
            <p>请在左侧创建文件开始编码</p>
          </div>
        </body>
        </html>
      `;
    }

    const findEntryHtml = () => {
      let entryFile = files.find(f => f.path.toLowerCase() === 'index.html');
      if (!entryFile) {
        entryFile = files.find(f => f.path.endsWith('.html'));
      }
      return entryFile;
    };

    const getFileByPath = (path: string) => {
      return files.find(f => f.path === path);
    };

    const normalizePath = (basePath: string, relativePath: string) => {
      if (relativePath.startsWith('/')) {
        return relativePath.slice(1);
      }
      
      const baseDir = basePath.includes('/') 
        ? basePath.substring(0, basePath.lastIndexOf('/'))
        : '';
      
      let parts = [...(baseDir ? baseDir.split('/') : []), ...relativePath.split('/')];
      
      const result: string[] = [];
      for (const part of parts) {
        if (part === '..') {
          if (result.length > 0) {
            result.pop();
          }
        } else if (part !== '.' && part !== '') {
          result.push(part);
        }
      }
      
      return result.join('/');
    };

    const entryHtml = findEntryHtml();
    
    if (!entryHtml) {
      let htmlContent = '';
      let cssContent = '';
      let jsContent = '';
      
      files.forEach(file => {
        if (file.path.endsWith('.html')) {
          htmlContent += file.content;
        } else if (file.path.endsWith('.css')) {
          cssContent += file.content;
        } else if (file.path.endsWith('.js') || file.path.endsWith('.jsx')) {
          jsContent += file.content;
        }
      });

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <style>${cssContent}</style>
        </head>
        <body>
          ${htmlContent}
          <script>${jsContent}</script>
        </body>
        </html>
      `;
    }

    let processedHtml = entryHtml.content;
    const entryDir = entryHtml.path.includes('/') 
      ? entryHtml.path.substring(0, entryHtml.path.lastIndexOf('/'))
      : '';

    processedHtml = processedHtml.replace(
      /<link\s+[^>]*href=["']([^"']+)["'][^>]*>/gi,
      (match, href) => {
        const normalizedPath = normalizePath(entryHtml.path, href);
        const cssFile = getFileByPath(normalizedPath);
        if (cssFile) {
          return `<style>${cssFile.content}</style>`;
        }
        return match;
      }
    );

    processedHtml = processedHtml.replace(
      /<script\s+[^>]*src=["']([^"']+)["'][^>]*><\/script>/gi,
      (match, src) => {
        const normalizedPath = normalizePath(entryHtml.path, src);
        const jsFile = getFileByPath(normalizedPath);
        if (jsFile) {
          return `<script>${jsFile.content}</script>`;
        }
        return match;
      }
    );

    files.forEach(file => {
      if (file.path.endsWith('.css') && !processedHtml.includes(file.content)) {
        const styleTag = `<style data-vibe-embedded="${file.path}">${file.content}</style>`;
        const headEndIndex = processedHtml.indexOf('</head>');
        if (headEndIndex !== -1) {
          processedHtml = processedHtml.slice(0, headEndIndex) + styleTag + processedHtml.slice(headEndIndex);
        }
      }
    });

    files.forEach(file => {
      if ((file.path.endsWith('.js') || file.path.endsWith('.jsx')) && !processedHtml.includes(file.content)) {
        const scriptTag = `<script data-vibe-embedded="${file.path}">${file.content}</script>`;
        const bodyEndIndex = processedHtml.indexOf('</body>');
        if (bodyEndIndex !== -1) {
          processedHtml = processedHtml.slice(0, bodyEndIndex) + scriptTag + processedHtml.slice(bodyEndIndex);
        }
      }
    });

    files.forEach(file => {
      if (isImageFile(file.path)) {
        const escapedPath = file.path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const pathRegex = new RegExp(`(["'])${escapedPath}\\1`, 'g');
        processedHtml = processedHtml.replace(pathRegex, `$1${file.content}$1`);
        
        const filename = file.path.includes('/') 
          ? file.path.substring(file.path.lastIndexOf('/') + 1)
          : file.path;
        const filenameRegex = new RegExp(`(["'])${filename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\1`, 'g');
        processedHtml = processedHtml.replace(filenameRegex, `$1${file.content}$1`);
      }
    });

    return processedHtml;
  };

  const resetCode = () => {
    resetFiles();
  };

  // 提交候选人信息
  const handleCandidateFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (candidateInfo.name.trim()) {
      setIsFormSubmitted(true);
      setShowCandidateForm(false);
      // 保存到localStorage
      localStorage.setItem('vibe-candidate-info', JSON.stringify(candidateInfo));
    }
  };

  // 增强的导出功能（包含候选人信息和报告）
  const exportCode = async () => {
    try {
      const zip = new JSZip();

      if (files.length === 0) {
        const readme = `# VibeCode Export

This is an empty project exported from VibeCode Check.
`;
        zip.file('README.md', readme);
      } else {
        files.forEach(file => {
          if (file.path && file.content !== undefined) {
            zip.file(file.path, file.content);
          }
        });
      }

      // 增强的元数据（包含候选人信息）
      const metaData = {
        candidate: isFormSubmitted ? candidateInfo : { name: '未填写', email: '', phone: '' },
        problem: {
          id: problem?.id || 'unknown',
          title: problem?.title || 'Unknown',
          level: problem?.level || 'unknown',
          duration: problem?.duration || 0
        },
        exportDate: new Date().toISOString(),
        fileCount: files.length,
        mode: problem?.mode || 'unknown'
      };

      zip.file('vibe-meta.json', JSON.stringify(metaData, null, 2));

      // 生成HTML报告
      const reportHtml = generateReportHtml(metaData);
      zip.file('report.html', reportHtml);

      const content = await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 9 }
      });

      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      const fileName = isFormSubmitted && candidateInfo.name
        ? `${candidateInfo.name.replace(/\s+/g, '_')}-${problem?.id || 'vibe'}-export.zip`
        : `${problem?.id || 'vibe-code'}-export.zip`;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export code:', error);
      alert('导出失败，请重试');
    }
  };

  // 生成HTML报告
  const generateReportHtml = (metaData: any) => {
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VibeCode Check - 面试报告</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #212121 0%, #171717 100%);
      color: #ececf1;
      padding: 40px 20px;
      min-height: 100vh;
    }
    .container { max-width: 900px; margin: 0 auto; }
    h1 {
      font-size: 32px;
      background: linear-gradient(to right, #10a37f, #1e88e5);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 30px;
      text-align: center;
    }
    .card {
      background: #444654;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 20px;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .card h2 {
      font-size: 20px;
      color: #fff;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }
    .info-item {
      background: #40414f;
      padding: 12px 16px;
      border-radius: 8px;
    }
    .info-label {
      font-size: 12px;
      color: #8e8ea0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .info-value {
      font-size: 16px;
      color: #ececf1;
      font-weight: 500;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      color: #8e8ea0;
      font-size: 14px;
    }
    .footer a {
      color: #10a37f;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎯 VibeCode Check 面试报告</h1>
    
    <div class="card">
      <h2>👤 候选人信息</h2>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">姓名</div>
          <div class="info-value">${metaData.candidate.name}</div>
        </div>
        <div class="info-item">
          <div class="info-label">邮箱</div>
          <div class="info-value">${metaData.candidate.email || '未填写'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">手机</div>
          <div class="info-value">${metaData.candidate.phone || '未填写'}</div>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>📋 面试题目</h2>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">题目ID</div>
          <div class="info-value">${metaData.problem.id}</div>
        </div>
        <div class="info-item">
          <div class="info-label">题目标题</div>
          <div class="info-value">${metaData.problem.title}</div>
        </div>
        <div class="info-item">
          <div class="info-label">难度级别</div>
          <div class="info-value">${metaData.problem.level}</div>
        </div>
        <div class="info-item">
          <div class="info-label">建议时长</div>
          <div class="info-value">${metaData.problem.duration} 分钟</div>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>📦 导出信息</h2>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">导出时间</div>
          <div class="info-value">${new Date(metaData.exportDate).toLocaleString('zh-CN')}</div>
        </div>
        <div class="info-item">
          <div class="info-label">文件数量</div>
          <div class="info-value">${metaData.fileCount} 个文件</div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>由 <a href="https://github.com/your-username/vibe-code-check" target="_blank">VibeCode Check</a> 生成</p>
      <p style="margin-top: 8px;">© ${new Date().getFullYear()} VibeCode Check Team. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
  };

  if (!problemId) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#343541]">
        <div className="max-w-2xl w-full p-8 text-center bg-[#202123] rounded-2xl shadow-lg border border-gray-700">
          <Link href="/" className="text-[#10a37f] hover:text-[#1a7f64] mb-6 inline-block transition-colors duration-200">
            ← 返回首页
          </Link>
          <div className="text-8xl mb-6">🤔</div>
          <h1 className="text-3xl font-bold text-white mb-4">无法开始面试</h1>
          <p className="text-gray-300 mb-8 text-lg">
            我们无法识别您要完成的面试题目
          </p>

          <div className="bg-[#40414f] rounded-xl p-6 max-w-md mx-auto text-left space-y-3 mb-8">
            <h3 className="font-semibold text-white flex items-center gap-2">
              💡 可能的原因：
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>面试链接不完整或已过期</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>链接被复制时丢失了部分内容</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>您直接访问了候选人入口而没有通过面试官分享的链接</span>
              </li>
            </ul>
          </div>

          <Link
            href="/"
            className="inline-block px-6 py-3 bg-[#10a37f] hover:bg-[#1a7f64] text-white rounded-lg font-medium transition-colors duration-200"
          >
            🏠 返回首页
          </Link>
        </div>
      </main>
    );
  }

  if (!problem) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#343541]">
        <div className="max-w-2xl w-full p-8 text-center bg-[#202123] rounded-2xl shadow-lg border border-gray-700">
          <Link href="/" className="text-[#10a37f] hover:text-[#1a7f64] mb-6 inline-block transition-colors duration-200">
            ← 返回首页
          </Link>
          <div className="text-8xl mb-6">❌</div>
          <h1 className="text-3xl font-bold text-white mb-4">题目未找到</h1>
          <p className="text-gray-300 mb-8 text-lg">
            无效的题目ID，请检查面试链接是否正确
          </p>

          <div className="bg-[#40414f] rounded-xl p-6 max-w-md mx-auto text-left space-y-3 mb-8">
            <h3 className="font-semibold text-white flex items-center gap-2">
              🔍 排查建议：
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">•</span>
                <span>确认链接完整复制，不要遗漏任何字符</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">•</span>
                <span>联系面试官确认链接是否有效</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">•</span>
                <span>尝试重新从面试官处获取新的链接</span>
              </li>
            </ul>
          </div>

          <Link
            href="/"
            className="inline-block px-6 py-3 bg-[#10a37f] hover:bg-[#1a7f64] text-white rounded-lg font-medium transition-colors duration-200"
          >
            🏠 返回首页
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#343541]">
      {/* 候选人信息提示条（非遮挡式） */}
      {!isFormSubmitted && problem && (
        <div className="bg-[#10a37f]/10 border-b border-[#10a37f]/30 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-2xl">👋</span>
              <div>
                <p className="text-white font-medium">欢迎参加面试！请先填写您的基本信息</p>
                <p className="text-gray-400 text-xs mt-0.5">本次题目：<span className="text-[#10a37f] font-semibold">{problem.title}</span> | 建议时长：{problem.duration}分钟</p>
              </div>
            </div>

            <form onSubmit={handleCandidateFormSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={candidateInfo.name}
                onChange={(e) => setCandidateInfo({...candidateInfo, name: e.target.value})}
                placeholder="请输入您的姓名 *"
                required
                className="w-48 bg-[#40414f] border border-gray-600 rounded-lg px-3 py-1.5 text-white 
                           placeholder-gray-500 focus:border-[#10a37f] focus:ring-1 focus:ring-[#10a37f]/50 
                           outline-none transition-all duration-200 text-sm"
              />
              <button
                type="submit"
                disabled={!candidateInfo.name.trim()}
                className="px-4 py-1.5 bg-[#10a37f] hover:bg-[#1a7f64] disabled:bg-gray-700 disabled:text-gray-500 
                           text-white font-medium rounded-lg transition-colors duration-200 text-sm whitespace-nowrap"
              >
                开始答题 →
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col h-screen">
        <header className="bg-[#202123] text-white px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-gray-700">
          <div className="flex items-center gap-3 flex-wrap">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
              ← 退出
            </Link>
            {isFormSubmitted && (
              <span className="px-2 py-1 bg-[#10a37f]/20 text-[#10a37f] text-xs rounded-full font-medium">
                👤 {candidateInfo.name}
              </span>
            )}
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${LEVEL_COLORS[problem.level]}`}>
              {LEVEL_LABELS[problem.level]}
            </span>
            <h1 className="text-base font-semibold text-white">{problem.title}</h1>
          </div>
          
          <div className="flex items-center gap-3 flex-wrap">
            {/* 计时器组件 */}
            <Timer duration={problem.duration} />
            
            <div className="flex gap-2">
              <button
                onClick={resetCode}
                className="px-3 py-1.5 bg-transparent hover:bg-[#2a2b32] text-gray-300 rounded-md text-sm transition-colors duration-200"
              >
                🔄 重置
              </button>
              <button
                onClick={exportCode}
                className="bg-[#10a37f] hover:bg-[#1a7f64] text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200"
              >
                📦 导出
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <FileTreeEditor className="w-56" />

          <div className="w-1/2 flex flex-col border-r border-gray-700">
            <div className="bg-[#2d2d30] p-3 flex items-center border-b border-gray-700">
              <span className="text-gray-300 text-sm px-2 font-medium">
                {activeFilePath || '选择一个文件'}
              </span>
            </div>

            <div className="flex-1 bg-[#1e1e1e]">
              {activeFile ? (
                isImageFile(activeFile.path) ? (
                  <div className="h-full flex items-center justify-center bg-[#1e1e1e] overflow-auto p-4">
                    <img
                      src={activeFile.content}
                      alt={activeFile.path}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : (
                  <Editor
                    key={activeFile.path}
                    height="100%"
                    defaultLanguage={activeFile.language}
                    value={activeFile.content}
                    onChange={(value) => activeFilePath && updateFile(activeFilePath, value || '')}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      wordWrap: 'on',
                    }}
                  />
                )
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  从左侧选择文件进行编辑
                </div>
              )}
            </div>
          </div>

          {!isPreviewFullscreen && (
            <div className="w-1/2 flex flex-col bg-white rounded-lg border border-gray-700 overflow-hidden">
              <div className="bg-[#f7f7f8] p-3 border-b border-gray-200 flex items-center justify-between">
                <h2 className="font-semibold text-gray-800">👁️ 实时预览</h2>
                <button
                  onClick={() => setIsPreviewFullscreen(true)}
                  className="px-3 py-1.5 bg-[#10a37f] hover:bg-[#1a7f64] text-white text-sm rounded-md transition-colors duration-200"
                >
                  ⏱️ 全屏预览
                </button>
              </div>
              <iframe
                srcDoc={getPreviewHtml()}
                className="flex-1 w-full border-0 bg-white"
                title="Preview"
                sandbox="allow-scripts allow-modals"
              />
            </div>
          )}

          {isPreviewFullscreen && (
            <div className="fixed inset-0 z-50 bg-white flex flex-col">
              <div className="bg-[#f7f7f8] p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="font-semibold text-gray-800">👁️ 全屏预览</h2>
                <button
                  onClick={() => setIsPreviewFullscreen(false)}
                  className="px-4 py-2 bg-[#ef4444] hover:bg-[#dc2626] text-white rounded-md transition-colors duration-200"
                >
                  ✕ 退出全屏
                </button>
              </div>
              <iframe
                srcDoc={getPreviewHtml()}
                className="flex-1 w-full border-0 bg-white"
                title="Preview"
                sandbox="allow-scripts allow-modals"
              />
            </div>
          )}
        </div>

        <div className="bg-[#202123] text-white p-4 border-t border-gray-700">
          <details className="max-w-4xl mx-auto">
            <summary className="cursor-pointer font-semibold text-gray-200 hover:text-white transition-colors duration-150">📋 题目要求与考察点</summary>
            <div className="mt-4 space-y-4 text-gray-300">
              <div>
                <h3 className="font-medium text-white mb-2">业务需求背景：</h3>
                <p className="whitespace-pre-wrap">{problem.requirements}</p>
              </div>
              <div>
                <h3 className="font-medium text-white mb-2">核心考察点：</h3>
                <ul className="list-disc list-inside space-y-1">
                  {problem.evaluationPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-white mb-2">可选加分项：</h3>
                <ul className="list-disc list-inside space-y-1">
                  {problem.bonusPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </details>
        </div>
      </div>
    </main>
  );
}

export default function CandidatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#343541] text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-xl text-gray-300">加载中...</p>
        </div>
      </div>
    }>
      <CandidateContent />
    </Suspense>
  );
}
