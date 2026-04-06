'use client';

import { useState, useRef, useEffect } from 'react';
import { useFileSystemStore } from '@/store/fileSystemStore';
import { IMAGE_EXTENSIONS, MAX_IMAGE_SIZE, isImageFile } from '@/types';

interface FileTreeEditorProps {
  className?: string;
}

export default function FileTreeEditor({ className }: FileTreeEditorProps) {
  const {
    files,
    activeFilePath,
    selectedFiles,
    createFile,
    deleteFile,
    selectFile,
    setActiveFile
  } = useFileSystemStore();

  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [editingFilePath, setEditingFilePath] = useState<string | null>(null);
  const [editingFileName, setEditingFileName] = useState('');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const newFileInputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCreatingFile && newFileInputRef.current) {
      newFileInputRef.current.focus();
    }
  }, [isCreatingFile]);

  useEffect(() => {
    if (editingFilePath && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingFilePath]);

  const getLanguageFromFileName = (fileName: string): string => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      case 'js':
      case 'jsx':
        return 'javascript';
      case 'ts':
      case 'tsx':
        return 'typescript';
      case 'json':
        return 'json';
      default:
        return 'plaintext';
    }
  };

  const getFileIcon = (path: string) => {
    const ext = path.split('.').pop()?.toLowerCase();
    if (isImageFile(path)) {
      return '🖼️';
    }
    switch (ext) {
      case 'html':
        return '📄';
      case 'css':
        return '🎨';
      case 'js':
      case 'jsx':
        return '📜';
      case 'ts':
      case 'tsx':
        return '🔷';
      case 'json':
        return '📋';
      default:
        return '📝';
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (file: File) => {
    setUploadError(null);
    
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    if (!IMAGE_EXTENSIONS.includes(ext)) {
      setUploadError(`不支持的图片格式，请上传 JPG、PNG、GIF 或 SVG 格式的图片`);
      return;
    }
    
    if (file.size > MAX_IMAGE_SIZE) {
      setUploadError(`图片大小不能超过 5MB，当前文件大小: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
      return;
    }

    const existingFile = files.find(f => f.path === file.name);
    let fileName = file.name;
    let counter = 1;
    while (files.find(f => f.path === fileName)) {
      const nameParts = file.name.split('.');
      const name = nameParts.slice(0, -1).join('.');
      const extension = nameParts.pop();
      fileName = `${name} (${counter}).${extension}`;
      counter++;
    }

    try {
      const base64Content = await fileToBase64(file);
      createFile({
        path: fileName,
        content: base64Content,
        language: 'image'
      });
    } catch (error) {
      setUploadError('文件上传失败，请重试');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      handleImageUpload(selectedFiles[0]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      handleImageUpload(droppedFiles[0]);
    }
  };

  const handleCreateFile = () => {
    if (!newFileName.trim()) return;
    
    createFile({
      path: newFileName.trim(),
      content: '',
      language: getLanguageFromFileName(newFileName.trim())
    });
    
    setNewFileName('');
    setIsCreatingFile(false);
  };

  const handleStartRename = (path: string) => {
    setEditingFilePath(path);
    setEditingFileName(path);
  };

  const handleRename = (oldPath: string) => {
    if (!editingFileName.trim() || editingFileName === oldPath) {
      setEditingFilePath(null);
      return;
    }

    const file = useFileSystemStore.getState().getFileByPath(oldPath);
    if (file) {
      const newFile = {
        ...file,
        path: editingFileName.trim(),
        language: getLanguageFromFileName(editingFileName.trim())
      };
      deleteFile(oldPath);
      createFile(newFile);
      
      if (activeFilePath === oldPath) {
        setActiveFile(newFile.path);
      }
    }
    
    setEditingFilePath(null);
  };

  const handleDelete = (path: string) => {
    setIsDeleting(path);
  };

  const confirmDelete = (path: string) => {
    deleteFile(path);
    setIsDeleting(null);
  };

  const cancelDelete = () => {
    setIsDeleting(null);
  };

  return (
    <div className={`flex flex-col h-full bg-gray-800 border-r border-gray-700 ${className}`}>
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <h2 className="text-white font-semibold text-sm">📁 文件</h2>
        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.gif,.svg"
            onChange={handleFileSelect}
            className="hidden"
          />
          {!isCreatingFile && (
            <>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                title="上传图片"
              >
                🖼️
              </button>
              <button
                onClick={() => setIsCreatingFile(true)}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                title="新建文件"
              >
                ➕
              </button>
            </>
          )}
        </div>
      </div>

      <div 
        className={`flex-1 overflow-y-auto p-2 transition-colors ${isDragging ? 'bg-blue-900/30' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {uploadError && (
          <div className="mb-2 p-2 bg-red-900/30 border border-red-700 rounded text-red-300 text-xs">
            {uploadError}
          </div>
        )}
        {isDragging && (
          <div className="mb-2 p-4 border-2 border-dashed border-blue-500 rounded bg-blue-900/20 text-blue-300 text-center text-sm">
            松开鼠标上传图片
          </div>
        )}
        {files.map((file) => (
          <div key={file.path} className="mb-1">
            {isDeleting === file.path ? (
              <div className="bg-red-900/30 rounded p-2 border border-red-700">
                <p className="text-red-300 text-xs mb-2">确定删除？</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => confirmDelete(file.path)}
                    className="text-xs px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                  >
                    删除
                  </button>
                  <button
                    onClick={cancelDelete}
                    className="text-xs px-2 py-1 bg-gray-600 hover:bg-gray-500 text-white rounded transition-colors"
                  >
                    取消
                  </button>
                </div>
              </div>
            ) : editingFilePath === file.path ? (
              <div className="flex items-center gap-2 p-1.5 bg-gray-700 rounded">
                <span className="text-gray-400">{getFileIcon(file.path)}</span>
                <input
                  ref={editInputRef}
                  type="text"
                  value={editingFileName}
                  onChange={(e) => setEditingFileName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRename(file.path);
                    if (e.key === 'Escape') setEditingFilePath(null);
                  }}
                  onBlur={() => handleRename(file.path)}
                  className="flex-1 bg-gray-600 text-white text-sm px-2 py-0.5 rounded border border-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            ) : (
              <div
                className={`
                  flex items-center justify-between group
                  p-1.5 rounded cursor-pointer transition-colors
                  ${activeFilePath === file.path 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }
                `}
                onClick={() => selectFile(file.path)}
              >
                <div className="flex items-center gap-2">
                  <span>{getFileIcon(file.path)}</span>
                  <span className="text-sm truncate">{file.path}</span>
                </div>
                <div className="hidden group-hover:flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartRename(file.path);
                    }}
                    className="p-1 hover:bg-gray-600 rounded text-xs"
                    title="重命名"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(file.path);
                    }}
                    className="p-1 hover:bg-gray-600 rounded text-xs"
                    title="删除"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {isCreatingFile && (
          <div className="flex items-center gap-2 p-1.5 bg-gray-700 rounded mt-2">
            <span className="text-gray-400">📝</span>
            <input
              ref={newFileInputRef}
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateFile();
                if (e.key === 'Escape') {
                  setIsCreatingFile(false);
                  setNewFileName('');
                }
              }}
              onBlur={() => {
                if (newFileName.trim()) handleCreateFile();
                else {
                  setIsCreatingFile(false);
                  setNewFileName('');
                }
              }}
              placeholder="文件名"
              className="flex-1 bg-gray-600 text-white text-sm px-2 py-0.5 rounded border border-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        )}
      </div>
    </div>
  );
}
