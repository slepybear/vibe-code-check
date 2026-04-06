'use client';

import { useState, useEffect, useCallback } from 'react';

interface TimerProps {
  duration: number; // 题目时长（分钟）
  onTimeUp?: () => void;
  className?: string;
}

export default function Timer({ duration, onTimeUp, className = '' }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // 转换为秒
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  // 倒计时逻辑
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onTimeUp?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isPaused, timeLeft, onTimeUp]);

  // 最后5分钟警告
  useEffect(() => {
    if (timeLeft <= 300 && timeLeft > 0 && isRunning) { // 5分钟 = 300秒
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [timeLeft, isRunning]);

  // 开始计时
  const startTimer = useCallback(() => {
    setIsRunning(true);
    setIsPaused(false);
  }, []);

  // 暂停/继续
  const togglePause = useCallback(() => {
    setIsPaused(!isPaused);
  }, [isPaused]);

  // 重置计时器
  const resetTimer = useCallback(() => {
    setTimeLeft(duration * 60);
    setIsRunning(false);
    setIsPaused(false);
    setShowWarning(false);
  }, [duration]);

  // 格式化时间显示
  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 计算进度百分比
  const progressPercent = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  // 判断是否超时
  const isTimeUp = timeLeft === 0;

  // 判断是否快到时间（最后5分钟或最后20%时间）
  const isUrgent = timeLeft <= 300 || progressPercent > 80;

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* 计时器显示 */}
      <div className={`flex items-center gap-3 px-4 py-2 rounded-lg border transition-all duration-200 ${
        isTimeUp 
          ? 'bg-red-900/30 border-red-500 text-red-400' 
          : isUrgent 
            ? 'bg-yellow-900/30 border-yellow-500 text-yellow-400'
            : 'bg-[#40414f] border-gray-600 text-gray-200'
      }`}>
        {/* 时钟图标 */}
        <svg 
          className={`w-5 h-5 ${isTimeUp ? 'animate-pulse' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" strokeWidth="2"/>
          <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round"/>
        </svg>

        {/* 时间数字 */}
        <span className="text-lg font-mono font-semibold tabular-nums min-w-[70px]">
          {formatTime(timeLeft)}
        </span>

        {/* 状态标签 */}
        {!isRunning && !isTimeUp && (
          <span className="text-xs px-2 py-0.5 bg-gray-700 text-gray-300 rounded">
            未开始
          </span>
        )}
        {isPaused && (
          <span className="text-xs px-2 py-0.5 bg-yellow-600/30 text-yellow-400 rounded animate-pulse">
            已暂停
          </span>
        )}
        {isTimeUp && (
          <span className="text-xs px-2 py-0.5 bg-red-600/30 text-red-400 rounded">
            ⏰ 时间到！
          </span>
        )}
      </div>

      {/* 控制按钮 */}
      <div className="flex items-center gap-2">
        {!isRunning || isPaused ? (
          <button
            onClick={startTimer}
            disabled={isTimeUp}
            className="px-3 py-1.5 bg-[#10a37f] hover:bg-[#1a7f64] disabled:bg-gray-700 disabled:text-gray-500 
                       text-white text-sm font-medium rounded-md transition-colors duration-200 flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            {isPaused ? '继续' : '开始'}
          </button>
        ) : (
          <button
            onClick={togglePause}
            className="px-3 py-1.5 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium 
                       rounded-md transition-colors duration-200 flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
            暂停
          </button>
        )}

        <button
          onClick={resetTimer}
          className="px-3 py-1.5 bg-transparent hover:bg-[#2a2b32] border border-gray-600 hover:border-gray-500 
                     text-gray-300 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          重置
        </button>
      </div>

      {/* 进度条 */}
      {isRunning && (
        <div className="hidden md:flex items-center gap-2 w-32">
          <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ease-linear ${
                isUrgent ? 'bg-red-500' : 'bg-[#10a37f]'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 tabular-nums w-10 text-right">
            {Math.round(progressPercent)}%
          </span>
        </div>
      )}

      {/* 超时警告弹窗 */}
      {showWarning && !isTimeUp && (
        <div className="fixed top-20 right-6 z-50 animate-fade-in">
          <div className="bg-yellow-900/95 backdrop-blur-sm border border-yellow-500 rounded-lg p-4 shadow-xl max-w-sm">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="font-semibold text-yellow-200 mb-1">时间提醒</p>
                <p className="text-sm text-yellow-100/80">
                  还剩 {Math.ceil(timeLeft / 60)} 分钟，请合理安排时间！
                </p>
              </div>
              <button 
                onClick={() => setShowWarning(false)}
                className="text-yellow-300 hover:text-white ml-auto"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 超时提示 */}
      {isTimeUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#2d2d30] border border-red-500 rounded-2xl p-8 shadow-2xl max-w-md mx-4 text-center">
            <div className="text-6xl mb-4">⏰</div>
            <h2 className="text-2xl font-bold text-red-400 mb-2">面试时间已结束！</h2>
            <p className="text-gray-300 mb-6">
              您的答题时间已经用完。请立即停止编码，准备提交您的作品。
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowWarning(false)}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              >
                我知道了
              </button>
              <button
                onClick={resetTimer}
                className="px-6 py-2.5 bg-transparent hover:bg-[#3a3a3c] border border-gray-600 text-gray-300 font-medium rounded-lg transition-colors"
              >
                继续答题（延长）
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
