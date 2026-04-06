'use client';

import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('VibeCode Check Error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#343541] flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-[#2d2d30] border border-red-500/50 rounded-2xl p-8 shadow-2xl text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-white mb-3">
              出了点问题
            </h1>
            <p className="text-gray-300 mb-6">
              应用遇到了意外错误，请尝试刷新页面或重置状态。
            </p>

            {this.state.error && (
              <details className="mb-6 text-left bg-[#1e1e1e] rounded-lg p-4 overflow-auto max-h-40">
                <summary className="text-sm font-medium text-gray-400 cursor-pointer mb-2">
                  错误详情（点击展开）
                </summary>
                <pre className="text-xs text-red-400 mt-2 whitespace-pre-wrap break-words font-mono">
                  {this.state.error.message}
                </pre>
              </details>
            )}

            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={this.handleReset}
                className="px-6 py-2.5 bg-[#10a37f] hover:bg-[#1a7f64] text-white font-medium rounded-lg transition-colors"
              >
                🔄 重试
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 bg-transparent hover:bg-[#3a3a3c] border border-gray-600 text-gray-300 font-medium rounded-lg transition-colors"
              >
                ↻ 刷新页面
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
