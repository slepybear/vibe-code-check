'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#212121] flex flex-col" style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-6xl font-semibold bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              VibeCode Check
            </h1>
            <p className="text-lg text-gray-400">
              AI原生Vibe Coding工程师专属面试评估工具
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => router.push('/interviewer')}
              className="w-full p-6 bg-[#40414f] hover:bg-[#4a4b59] rounded-xl border border-gray-600 hover:border-[#10a37f] transition-all duration-200 group text-left"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">👨‍💼</div>
                <div className="flex-1">
                  <h2 className="text-lg font-medium text-white group-hover:text-[#10a37f] transition-colors">
                    面试官入口
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    查看题库、生成面试链接、评估候选人
                  </p>
                </div>
                <svg className="w-5 h-5 text-gray-500 group-hover:text-[#10a37f] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            <button
              onClick={() => router.push('/candidate')}
              className="w-full p-6 bg-[#40414f] hover:bg-[#4a4b59] rounded-xl border border-gray-600 hover:border-[#10a37f] transition-all duration-200 group text-left"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">👨‍💻</div>
                <div className="flex-1">
                  <h2 className="text-lg font-medium text-white group-hover:text-[#10a37f] transition-colors">
                    候选人入口
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    输入面试链接，开始编码任务
                  </p>
                </div>
                <svg className="w-5 h-5 text-gray-500 group-hover:text-[#10a37f] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      <footer className="py-8 text-center border-t border-gray-800">
        <p className="text-xs text-gray-600">
          © 2025 VibeCode Check. Powered by AI.
        </p>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
