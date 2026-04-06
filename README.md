# VibeCode Check - AI原生Vibe Coding工程师专属面试评估工具

## 🚀 项目简介

VibeCode Check 是一个**纯静态、零服务器成本、开箱即用**的MVP工具，通过20-60分钟的「微型业务场景实战任务」，帮助HR/面试官快速、精准、量化地评估Vibe Coding工程师的真实实战能力。

### 核心特性

- ✅ **零成本运行**：纯前端静态应用，无后端服务、无数据库
- ✅ **开箱即用**：HR打开链接就能直接使用，无需任何配置
- ✅ **9道标准化题目**：初/中/高3级各3道，完美适配常规面试时长
- ✅ **浏览器端编码环境**：Monaco Editor + iframe沙箱，代码实时预览
- ✅ **标准化评估体系**：HR/面试官可直接对照完成量化评估
- ✅ **一键部署**：支持Vercel/GitHub Pages一键部署

## 📦 快速开始

### 一键部署到Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/vibe-code-check)

### 本地开发

1. 克隆仓库
```bash
git clone https://github.com/your-username/vibe-code-check.git
cd vibe-code-check
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 打开浏览器访问 http://localhost:3000

## 🎯 使用指南

### 面试官使用流程

1. 访问网站，点击【面试官入口】
2. 查看题库，选择适合的题目级别（初级/中级/高级）
3. 点击题目查看详情，包含：
   - 业务需求背景
   - 核心考察点
   - 可选加分项
   - 标准化评估打分表
   - 面试指导
4. 点击「复制链接」生成面试链接
5. 将链接发送给候选人
6. 候选人完成后，对照代码、预览效果、打分表完成评估

### 候选人使用流程

1. 打开面试官提供的面试链接
2. 在左侧编辑器中编写代码（HTML/CSS/JavaScript分标签页）
3. 右侧实时预览效果
4. 完成后点击「导出代码包」下载代码
5. 将代码包发送给面试官

## 📋 题库概览

### 初级题目（20分钟）
1. **电商商品搜索与库存高亮** - 考察需求拆解、基础框架使用、边界情况处理
2. **待办事项列表** - 考察基础功能实现、事件处理、状态管理
3. **简单计算器** - 考察逻辑思维、状态管理、用户交互

### 中级题目（40分钟）
1. **Markdown实时预览编辑器** - 考察技术选型、异步逻辑、用户体验细节
2. **天气查询应用** - 考察异步处理、数据渲染、错误处理
3. **图片上传与预览** - 考察文件处理、异步操作、拖拽交互

### 高级题目（60分钟）
1. **可复用表单组件库** - 考察架构设计、工程化思维、可复用性设计
2. **数据可视化仪表盘** - 考察架构设计、数据处理、组件化思维
3. **状态管理与数据流动设计** - 考察架构设计、API设计、工程化思维

## 🛠️ 技术栈

- **核心框架**: Next.js 14 (App Router)
- **代码编辑器**: Monaco Editor (@monaco-editor/react)
- **样式方案**: Tailwind CSS
- **状态管理**: React Hooks (轻量级)
- **导出功能**: JSZip
- **部署**: 纯静态导出，支持Vercel/GitHub Pages

## 📁 项目结构

```
vibe-code-check/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 首页
│   ├── layout.tsx         # 布局
│   ├── globals.css        # 全局样式
│   ├── interviewer/       # 面试官面板
│   │   └── page.tsx
│   └── candidate/         # 候选人编码环境
│       └── page.tsx
├── components/            # 组件目录（预留）
├── data/                  # 数据文件
│   └── problems.ts        # 题库数据
├── types/                 # TypeScript类型定义
│   └── index.ts
├── next.config.js         # Next.js配置
├── tailwind.config.ts     # Tailwind配置
├── tsconfig.json          # TypeScript配置
└── package.json           # 项目依赖
```

## 🔒 安全说明

- 所有代码执行都在浏览器端沙箱中完成，无任何后端请求
- 无用户系统、无数据库、无数据持久化
- 纯静态应用，零安全风险

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📞 联系方式

如有问题或建议，欢迎提交Issue。
