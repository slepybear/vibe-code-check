# VibeCode Check - AI原生Vibe Coding工程师专属面试评估工具 - Product Requirement Document

## Overview
- **Summary**: 打造一个纯静态、零服务器成本、开箱即用的MVP工具，通过20-60分钟的「微型业务场景实战任务」，帮助HR/面试官快速、精准、量化地评估Vibe Coding工程师的真实实战能力。
- **Purpose**: 解决传统面试（算法题、闲聊式面试）无法准确评估AI原生Web开发工程师真实能力的痛点，提供标准化、轻量化的面试评估方案。
- **Target Users**: 企业HR、无资深前端技术面试官的中小企业招聘负责人、需要快速筛选Vibe Coding候选人的技术管理者。

## Goals
- 提供9道初/中/高3级共9道符合Vibe Coding场景的标准化面试题
- 内置浏览器端在线编码+实时沙箱预览环境，零后端依赖
- 面试官可1分钟内完成题目选择、生成面试链接、查看打分表
- 候选人打开链接可直接进入编码环境，20秒内完成环境加载
- 纯静态部署，支持Vercel/GitHub Pages一键部署，零成本运维

## Non-Goals (Out of Scope)
- 不做后端服务、数据库、用户系统、权限管理
- 不做复杂的在线协同、实时音视频面试功能
- 不做AI自动评分、代码检测的复杂功能
- 不做大型项目、全栈部署类的复杂任务
- 不做LeetCode式的纯算法题、纯语法记忆题
- 不做需要付费的第三方服务集成

## Background & Context
- AI原生时代，Web开发从业者的工作模式已转变为以AI为核心辅助工具
- 传统面试方式（算法题、闲聊）完全脱离Vibe Coding日常工作场景
- 中小企业普遍缺乏资深前端技术面试官资源，HR无法独立完成初筛
- 需要一个标准化、轻量化的工具，让无技术背景的HR也能快速评估候选人

## Functional Requirements
- **FR-1**: 题库模块，提供初/中/高3级共9道标准化面试题
- **FR-2**: 在线编码环境，支持Monaco Editor，语法高亮、自动补全
- **FR-3**: 浏览器端沙箱预览，代码实时预览渲染
- **FR-4**: 面试官面板，可查看题库、选择题目、生成面试链接
- **FR-5**: 候选人入口，通过URL参数直接进入编码环境
- **FR-6**: 标准化评估打分表，支持0-10分量化评估
- **FR-7**: 代码导出功能，候选人可一键导出代码包
- **FR-8**: 评估报告导出功能，面试官可一键导出PDF/图片

## Non-Functional Requirements
- **NFR-1**: 所有功能纯前端静态实现，无任何后端请求
- **NFR-2**: 环境加载时间不超过20秒
- **NFR-3**: 代码修改后预览响应时间不超过500ms
- **NFR-4**: 支持一键部署到Vercel/GitHub Pages
- **NFR-5**: 兼容现代主流浏览器（Chrome、Firefox、Safari、Edge）

## Constraints
- **Technical**: Next.js (App Router)、Monaco Editor、Tailwind CSS、Zustand、jsPDF + html2canvas
- **Business**: 零成本运行、无需任何服务器运维
- **Dependencies**: 仅使用开源免费依赖，无付费服务集成

## Assumptions
- 用户使用现代主流浏览器
- 用户具备基本的GitHub操作能力（Fork、一键部署）
- 面试官可以将面试链接复制发送给候选人
- 候选人可以在面试结束后导出代码并发送给面试官

## Acceptance Criteria

### AC-1: 题库展示与分级
- **Given**: 面试官进入面试官入口
- **When**: 查看题库列表
- **Then**: 显示初/中/高3个级别，每个级别3道题，共9道题，每道题标注建议完成时长
- **Verification**: `programmatic`
- **Notes**: 初级20分钟、中级40分钟、高级60分钟

### AC-2: 面试题详情展示
- **Given**: 面试官选择某道题目
- **When**: 查看题目详情
- **Then**: 显示业务需求背景、前置基础模板、核心考察点、可选加分项、标准化评估打分表5个模块
- **Verification**: `programmatic`

### AC-3: 面试链接生成
- **Given**: 面试官选择某道题目
- **When**: 点击生成链接按钮
- **Then**: 生成包含题目ID的URL参数链接，支持一键复制
- **Verification**: `programmatic`

### AC-4: 候选人通过链接进入编码环境
- **Given**: 候选人获得面试链接
- **When**: 在浏览器中打开链接
- **Then**: 20秒内直接进入对应题目的编码环境，无需任何注册
- **Verification**: `programmatic`

### AC-5: 在线代码编辑器功能
- **Given**: 候选人在编码环境中
- **When**: 编写代码
- **Then**: 显示Monaco Editor，支持语法高亮、自动补全，支持HTML/CSS/JS/React主流技术栈
- **Verification**: `human-judgment`

### AC-6: 浏览器端沙箱实时预览
- **Given**: 候选人在编码环境中修改代码
- **When**: 点击实时预览或代码自动保存
- **Then**: 500ms内右侧iframe沙箱实时渲染更新代码效果，完全本地执行无后端请求
- **Verification**: `programmatic`

### AC-7: 代码重置功能
- **Given**: 候选人在编码环境中
- **When**: 点击重置按钮
- **Then**: 代码恢复到初始模板状态
- **Verification**: `programmatic`

### AC-8: 代码包导出功能
- **Given**: 候选人完成编码
- **When**: 点击导出代码包按钮
- **Then**: 下载包含所有代码的ZIP压缩包
- **Verification**: `programmatic`

### AC-9: 标准化评估打分
- **Given**: 面试官在评估面板
- **When**: 对照代码、预览效果、打分表
- **Then**: 可对每个考察点进行0-10分打分，自动计算总分
- **Verification**: `programmatic`

### AC-10: 评估报告导出
- **Given**: 面试官完成打分
- **When**: 点击导出报告按钮
- **Then**: 下载包含打分结果的PDF/图片文件
- **Verification**: `programmatic`

### AC-11: 纯静态部署验证
- **Given**: 用户Fork仓库后
- **When**: 点击一键部署到Vercel
- **Then**: 部署成功，所有功能正常运行，无任何后端请求
- **Verification**: `programmatic`

### AC-12: HR使用指南展示
- **Given**: 用户首次使用
- **When**: 查看HR面试使用指南
- **Then**: 显示每道题的考察重点、面试话术、打分标准
- **Verification**: `human-judgment`

## Open Questions
- [ ] 是否需要支持Vue技术栈的模板（当前需求只提到React/Vue/原生JS，但示例只提到React）
- [ ] 评估报告导出格式是否需要同时支持PDF和图片，还是只需支持其中一种
