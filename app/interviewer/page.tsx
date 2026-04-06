'use client';

import { useState } from 'react';
import { problems } from '@/data/problems';
import { Problem } from '@/types';
import Link from 'next/link';

type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

function getDifficultyBadge(level: DifficultyLevel) {
  const styles: Record<DifficultyLevel, string> = {
    beginner: 'bg-cyan-900/30 text-cyan-400',
    intermediate: 'bg-purple-900/30 text-purple-400',
    advanced: 'bg-red-900/30 text-red-400'
  };

  const labels: Record<DifficultyLevel, string> = {
    beginner: '初级',
    intermediate: '中级',
    advanced: '高级'
  };

  return (
    <span className={`${styles[level]} text-xs px-2 py-0.5 rounded-full whitespace-nowrap font-medium`}>
      {labels[level]}
    </span>
  );
}

export default function InterviewerPage() {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [copied, setCopied] = useState(false);

  const generateInterviewLink = (problemId: string) => {
    const baseUrl = window.location.origin;
    const fullUrl = `${baseUrl}/candidate?problemId=${problemId}`;

    if (baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1')) {
      console.warn('⚠️ 当前是本地开发环境，此链接仅在本机可用！');
    }

    return fullUrl;
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredProblems = problems;

  return (
    <div className="flex h-screen bg-[#212121]">
      {/* 左侧边栏 */}
      <aside className="w-64 bg-[#202123] flex-shrink-0 flex flex-col">
        {/* 顶部区域 */}
        <div className="p-4 border-b border-gray-700">
          <Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">返回首页</span>
          </Link>
        </div>

        {/* 题目列表 */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {filteredProblems.map((problem) => (
            <button
              key={problem.id}
              onClick={() => setSelectedProblem(problem)}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors duration-200 group ${
                selectedProblem?.id === problem.id
                  ? 'bg-[#343541] text-white'
                  : 'text-gray-300 hover:bg-[#2a2b32] hover:text-white'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${
                    selectedProblem?.id === problem.id ? 'text-white' : 'text-gray-200'
                  }`}>
                    {problem.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{problem.description}</p>
                </div>
                {getDifficultyBadge(problem.level)}
              </div>
              <div className="mt-2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                ⏱️ {problem.duration}分钟
              </div>
            </button>
          ))}
        </nav>
      </aside>

      {/* 右侧主内容区 */}
      <main className="flex-1 bg-[#343541] flex flex-col overflow-hidden">
        {/* 固定顶部Header */}
        <header className="px-6 py-4 border-b border-gray-600 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {selectedProblem ? selectedProblem.title : '选择一个题目'}
            </h2>
            {selectedProblem && (
              <p className="text-sm text-gray-400 mt-1">{selectedProblem.description}</p>
            )}
          </div>
          {selectedProblem && (
            <div className="flex items-center gap-3">
              {getDifficultyBadge(selectedProblem.level)}
              <span className="text-sm text-gray-400">⏱️ {selectedProblem.duration}分钟</span>
            </div>
          )}
        </header>

        {/* 内容区域 */}
        <div className="flex-1 overflow-y-auto p-6">
          {!selectedProblem ? (
            /* 空状态 */
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center space-y-3">
                <div className="text-6xl">📋</div>
                <p className="text-lg">从左侧选择一个题目查看详情</p>
                <p className="text-sm">点击题目卡片以查看完整信息</p>
              </div>
            </div>
          ) : (
            /* 详情面板 */
            <div className="max-w-4xl mx-auto space-y-6">
              {/* 业务需求背景 */}
              <section className="bg-[#444654] rounded-lg p-6">
                <h3 className="text-base font-medium text-gray-100 mb-4 flex items-center gap-2">
                  📋 业务需求背景
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {selectedProblem.requirements}
                </p>
              </section>

              {/* 核心考察点 */}
              <section className="bg-[#444654] rounded-lg p-6">
                <h3 className="text-base font-medium text-gray-100 mb-4 flex items-center gap-2">
                  🎯 核心考察点
                </h3>
                <ul className="space-y-3">
                  {selectedProblem.evaluationPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-gray-300 bg-[#40414f] rounded-lg p-4 transition-colors duration-200 hover:bg-[#4a4b59]">
                      <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 可选加分项 */}
              <section className="bg-[#444654] rounded-lg p-6">
                <h3 className="text-base font-medium text-gray-100 mb-4 flex items-center gap-2">
                  ⭐ 可选加分项
                </h3>
                <ul className="space-y-3">
                  {selectedProblem.bonusPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-gray-300 bg-[#40414f] rounded-lg p-4 transition-colors duration-200 hover:bg-[#4a4b59]">
                      <span className="text-yellow-400 mt-0.5 flex-shrink-0">★</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 标准化评估打分表 */}
              <section className="bg-[#444654] rounded-lg p-6">
                <h3 className="text-base font-medium text-gray-100 mb-4 flex items-center gap-2">
                  📝 标准化评估打分表
                </h3>
                <div className="overflow-x-auto rounded-lg border border-gray-600">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-gray-400 font-normal pb-3 pr-4 pl-4 pt-3">考察点</th>
                        <th className="text-gray-400 font-normal pb-3 pr-4 pt-3">评分标准</th>
                        <th className="text-gray-400 font-normal pb-3 pr-4 pl-4 pt-3 text-center">满分</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProblem.scoringCriteria.map((criterion, index) => (
                        <tr
                          key={index}
                          className={`${
                            index % 2 === 1 ? 'bg-[#40414f]' : ''
                          } transition-colors duration-150 hover:bg-[#4a4b59]`}
                        >
                          <td className="py-3 pr-4 pl-4 font-medium text-gray-200">{criterion.name}</td>
                          <td className="py-3 pr-4 text-gray-400">{criterion.description}</td>
                          <td className="py-3 pr-4 pl-4 text-center font-bold text-cyan-400">{criterion.maxScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 面试指导 */}
              <section className="bg-[#444654] rounded-lg p-6">
                <h3 className="text-base font-medium text-gray-100 mb-4 flex items-center gap-2">
                  💡 面试指导
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-cyan-300 mb-3 flex items-center gap-2 text-sm">
                      🔍 考察重点：
                    </h4>
                    <ul className="space-y-2">
                      {selectedProblem.interviewGuide.keyPoints.map((point, index) => (
                        <li key={index} className="text-sm text-gray-300 pl-3 border-l-2 border-cyan-500/30">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-300 mb-3 flex items-center gap-2 text-sm">
                      ❓ 参考问题：
                    </h4>
                    <ul className="space-y-2">
                      {selectedProblem.interviewGuide.questions.map((question, index) => (
                        <li key={index} className="text-sm text-gray-300 pl-3 border-l-2 border-purple-500/30">
                          {question}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* 生成面试链接 */}
              <section className="bg-[#444654] rounded-lg p-6">
                <h3 className="text-base font-medium text-gray-100 mb-4 flex items-center gap-2">
                  🔗 生成面试链接
                </h3>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={generateInterviewLink(selectedProblem.id)}
                    readOnly
                    className="flex-1 bg-[#40414f] border border-gray-600 rounded-md px-4 py-2.5 text-sm text-gray-200 focus:border-[#10a37f] focus:ring-1 focus:ring-[#10a37f]/50 outline-none transition-all duration-150"
                  />
                  <button
                    onClick={() => copyToClipboard(generateInterviewLink(selectedProblem.id))}
                    className="ml-2 px-4 py-2.5 bg-[#10a37f] hover:bg-[#1a7f64] text-white rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    {copied ? '✓ 已复制' : '复制链接'}
                  </button>
                </div>
                <p className="text-gray-500 mt-3 text-xs">
                  将此链接发送给候选人，候选人可直接进入编码环境
                </p>
                {window.location.origin.includes('localhost') && (
                  <div className="mt-3 p-3 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
                    <p className="text-yellow-400 text-xs flex items-center gap-2">
                      ⚠️ 当前为本地开发环境，此链接仅本机可用。
                      <br />
                      部署到生产环境后再分享给候选人。
                    </p>
                  </div>
                )}
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
