# VibeCode Check - The Implementation Plan (Decomposed and Prioritized Task List)

## [x] Task 1: 项目初始化与技术栈配置
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 使用Next.js (App Router)初始化项目
  - 配置Tailwind CSS
  - 安装必要依赖：@monaco-editor/react、zustand、jspdf、html2canvas、jszip
  - 配置Vercel部署相关文件
  - 配置纯静态导出设置
- **Acceptance Criteria Addressed**: [AC-11]
- **Test Requirements**:
  - `programmatic` TR-1.1: `npx create-next-app@latest` 成功初始化项目，使用App Router
  - `programmatic` TR-1.2: Tailwind CSS配置完成，可正常使用
  - `programmatic` TR-1.3: 所有依赖安装成功，package.json包含所有必要包
  - `programmatic` TR-1.4: `next build && next export` 成功生成纯静态文件
- **Notes**: 确保next.config.js配置output为'export'以支持纯静态导出

## [ ] Task 2: 项目基础架构与状态管理
- **Priority**: P0
- **Depends On**: [Task 1]
- **Description**: 
  - 设计项目目录结构（app、components、lib、store、data等）
  - 使用Zustand创建全局状态管理
  - 定义题目数据结构TypeScript类型
  - 创建基础布局组件
- **Acceptance Criteria Addressed**: [AC-1, AC-2]
- **Test Requirements**:
  - `programmatic` TR-2.1: 项目目录结构清晰，符合Next.js App Router规范
  - `programmatic` TR-2.2: Zustand store创建成功，类型定义完整
  - `programmatic` TR-2.3: 题目数据结构TypeScript类型定义完整
  - `human-judgement` TR-2.4: 基础布局组件美观、响应式

## [ ] Task 3: 首页与入口设计
- **Priority**: P0
- **Depends On**: [Task 2]
- **Description**: 
  - 实现极简首页，包含【面试官入口】和【候选人入口】两个按钮
  - 实现HR面试使用指南页面/模态框
- **Acceptance Criteria Addressed**: [AC-12]
- **Test Requirements**:
  - `programmatic` TR-3.1: 首页正常显示两个入口按钮
  - `programmatic` TR-3.2: 点击【面试官入口】跳转到面试官面板
  - `programmatic` TR-3.3: 点击【候选人入口】显示输入链接的界面
  - `human-judgement` TR-3.4: HR使用指南内容完整、清晰

## [ ] Task 4: 题库数据与9道标准化面试题
- **Priority**: P0
- **Depends On**: [Task 2]
- **Description**: 
  - 定义完整的题目数据结构（包含业务需求背景、前置基础模板、核心考察点、可选加分项、标准化评估打分表）
  - 创建3道初级题目（20分钟）
  - 创建3道中级题目（40分钟）
  - 创建3道高级题目（60分钟）
- **Acceptance Criteria Addressed**: [AC-1, AC-2]
- **Test Requirements**:
  - `programmatic` TR-4.1: 题目数据结构完整，包含所有必需字段
  - `programmatic` TR-4.2: 初级3道题、中级3道题、高级3道题数据齐全
  - `human-judgement` TR-4.3: 每道题的需求背景、考察点、打分表设计合理
  - `human-judgement` TR-4.4: 基础模板代码可用、无语法错误

## [ ] Task 5: 面试官面板 - 题库展示与选择
- **Priority**: P0
- **Depends On**: [Task 3, Task 4]
- **Description**: 
  - 实现题库列表页面，按初/中/高分级展示
  - 实现题目详情页面，展示5个标准化模块
- **Acceptance Criteria Addressed**: [AC-1, AC-2]
- **Test Requirements**:
  - `programmatic` TR-5.1: 题库列表正确显示3个级别，每个级别3道题
  - `programmatic` TR-5.2: 每道题正确显示建议完成时长
  - `programmatic` TR-5.3: 点击题目可进入详情页面
  - `human-judgement` TR-5.4: 题目详情页面布局清晰，5个模块内容完整展示

## [ ] Task 6: 面试链接生成功能
- **Priority**: P0
- **Depends On**: [Task 5]
- **Description**: 
  - 实现通过URL参数携带题目ID的机制
  - 实现生成链接按钮，一键复制功能
- **Acceptance Criteria Addressed**: [AC-3]
- **Test Requirements**:
  - `programmatic` TR-6.1: 点击生成链接按钮，生成包含正确题目ID的URL
  - `programmatic` TR-6.2: 链接自动复制到剪贴板
  - `programmatic` TR-6.3: 访问生成的链接可正确解析题目ID

## [ ] Task 7: 候选人入口与链接解析
- **Priority**: P0
- **Depends On**: [Task 3, Task 6]
- **Description**: 
  - 实现候选人入口的链接输入界面
  - 实现URL参数解析逻辑，自动识别题目ID
  - 实现根据题目ID加载对应题目的功能
- **Acceptance Criteria Addressed**: [AC-4]
- **Test Requirements**:
  - `programmatic` TR-7.1: 候选人入口正确显示链接输入界面
  - `programmatic` TR-7.2: 直接访问带参数的URL可自动解析并进入编码环境
  - `programmatic` TR-7.3: 环境加载时间不超过20秒
  - `programmatic` TR-7.4: 无效题目ID有友好的错误提示

## [ ] Task 8: 在线代码编辑器集成
- **Priority**: P0
- **Depends On**: [Task 2, Task 7]
- **Description**: 
  - 集成Monaco Editor (@monaco-editor/react)
  - 配置语法高亮、自动补全
  - 支持HTML/CSS/JS/React技术栈
  - 实现代码状态管理
- **Acceptance Criteria Addressed**: [AC-5]
- **Test Requirements**:
  - `programmatic` TR-8.1: Monaco Editor正常加载和显示
  - `programmatic` TR-8.2: 语法高亮功能正常
  - `human-judgement` TR-8.3: 编辑器界面美观，与整体风格统一
  - `human-judgement` TR-8.4: 自动补全功能可用

## [ ] Task 9: 浏览器端沙箱实时预览
- **Priority**: P0
- **Depends On**: [Task 8]
- **Description**: 
  - 基于iframe实现浏览器端沙箱环境
  - 实现代码实时渲染更新
  - 确保完全本地执行，无任何后端请求
- **Acceptance Criteria Addressed**: [AC-6]
- **Test Requirements**:
  - `programmatic` TR-9.1: iframe沙箱正常加载和显示
  - `programmatic` TR-9.2: 代码修改后500ms内预览更新
  - `programmatic` TR-9.3: 网络请求监控确认无任何后端请求
  - `human-judgement` TR-9.4: 预览区域布局合理，与编辑器区域协调

## [ ] Task 10: 代码重置与导出功能
- **Priority**: P0
- **Depends On**: [Task 8, Task 9]
- **Description**: 
  - 实现代码重置功能，恢复到初始模板
  - 实现代码导出功能，使用jszip打包成ZIP文件下载
- **Acceptance Criteria Addressed**: [AC-7, AC-8]
- **Test Requirements**:
  - `programmatic` TR-10.1: 点击重置按钮，代码恢复到初始状态
  - `programmatic` TR-10.2: 点击导出代码包按钮，下载ZIP文件
  - `programmatic` TR-10.3: ZIP文件内容完整，包含所有代码文件

## [ ] Task 11: 标准化评估打分表
- **Priority**: P0
- **Depends On**: [Task 5]
- **Description**: 
  - 实现评估打分界面
  - 支持每个考察点0-10分打分
  - 实现总分自动计算
- **Acceptance Criteria Addressed**: [AC-9]
- **Test Requirements**:
  - `programmatic` TR-11.1: 打分界面正确显示所有考察点
  - `programmatic` TR-11.2: 每个考察点可输入0-10分
  - `programmatic` TR-11.3: 总分自动计算并实时更新
  - `human-judgement` TR-11.4: 打分界面清晰易用

## [ ] Task 12: 评估报告导出功能
- **Priority**: P1
- **Depends On**: [Task 11]
- **Description**: 
  - 使用jsPDF + html2canvas实现PDF导出
  - 或者实现图片格式导出
- **Acceptance Criteria Addressed**: [AC-10]
- **Test Requirements**:
  - `programmatic` TR-12.1: 点击导出报告按钮，下载PDF/图片文件
  - `programmatic` TR-12.2: 报告内容完整，包含所有打分信息
  - `human-judgement` TR-12.3: 报告格式美观、清晰

## [ ] Task 13: Vercel一键部署配置
- **Priority**: P0
- **Depends On**: [Task 1]
- **Description**: 
  - 配置vercel.json文件
  - 创建README.md，包含详细的部署使用指南
  - 创建一键部署按钮
- **Acceptance Criteria Addressed**: [AC-11]
- **Test Requirements**:
  - `programmatic` TR-13.1: vercel.json配置正确
  - `programmatic` TR-13.2: README.md包含完整的部署指南
  - `programmatic` TR-13.3: 一键部署按钮可用
  - `human-judgement` TR-13.4: 文档清晰易懂

## [ ] Task 14: HR操作手册与使用指南
- **Priority**: P1
- **Depends On**: [Task 3]
- **Description**: 
  - 创建HR开箱即用操作手册
  - 完善面试使用指南内容
- **Acceptance Criteria Addressed**: [AC-12]
- **Test Requirements**:
  - `human-judgement` TR-14.1: 操作手册内容完整
  - `human-judgement` TR-14.2: 面试使用指南包含每道题的考察重点、面试话术、打分标准

## [ ] Task 15: 整体测试与优化
- **Priority**: P0
- **Depends On**: [Task 1-Task 14]
- **Description**: 
  - 端到端测试所有功能
  - 性能优化
  - 响应式适配
  - 浏览器兼容性测试
- **Acceptance Criteria Addressed**: [AC-1-AC-12]
- **Test Requirements**:
  - `programmatic` TR-15.1: 所有功能正常工作，无明显bug
  - `programmatic` TR-15.2: 环境加载时间不超过20秒
  - `programmatic` TR-15.3: 预览更新时间不超过500ms
  - `human-judgement` TR-15.4: 界面美观、响应式良好
  - `programmatic` TR-15.5: 无任何后端网络请求
