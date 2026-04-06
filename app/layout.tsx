import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VibeCode Check - AI原生Vibe Coding工程师面试评估工具",
  description: "纯静态、零服务器成本的Vibe Coding工程师面试评估工具",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {children}
      </body>
    </html>
  );
}
