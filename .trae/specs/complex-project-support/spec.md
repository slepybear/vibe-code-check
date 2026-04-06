# 复杂项目支持 - Product Requirement Document

## Overview
- **Summary**: 扩展 VibeCode Check 工具，支持更复杂的项目结构，包括多文件代码组织、图片资源和复杂的项目配置。
- **Purpose**: 解决当前项目仅支持单个 HTML/CSS/JS 文件的限制，使工具能够处理更真实的 Web 开发场景，包括模块化代码、资源文件和完整的项目结构。
- **Target Users**: 需要评估更复杂项目能力的面试官、需要在真实项目环境中展示技能的候选人。

## Goals
- 支持多文件代码结构（模块化的 JS、CSS 和其他文件）
- 支持图片资源的内嵌和管理
- 提供文件树状编辑器用于管理项目文件
- 保持向后兼容性，继续支持单文件模式
- 支持文件导入和导出功能

## Non-Goals (Out of Scope)
- 不支持复杂的构建工具（Webpack、Vite 等）
- 不支持后端语言或全栈项目
- 不做实时同步或多人协作功能
- 不做 npm 包或依赖管理
- 不做 Git 版本控制集成

## Background & Context
- 当前项目仅支持单个 HTML、CSS、JS 文件，限制了复杂项目的评估
- 真实的 Web 开发通常涉及模块化代码、资源文件和多文件结构
- 面试官希望能够评估候选人在复杂项目中的组织和架构能力
- 保持零服务器、纯前端的架构原则

## Functional Requirements
- **FR-1**: 项目结构类型支持，包括单文件模式和多文件模式
- **FR-2**: 文件树状编辑器，支持创建、删除、重命名文件
- **FR-3**: 多文件代码编辑，每个文件独立的编辑器
- **FR-4**: 图片资源支持，支持 Base64 内嵌和文件管理
- **FR-5**: 预览机制更新，支持正确渲染多文件项目
- **FR-6**: 文件系统导出，支持导出完整项目的 ZIP
- **FR-7**: 向后兼容，现有题目继续正常工作

## Non-Functional Requirements
- **NFR-1**: 保持零服务器、纯前端架构
- **NFR-2**: 文件操作响应时间 < 100ms
- **NFR-3**: 大文件编辑性能优化
- **NFR-4**: 支持至少 50 个文件的项目
- **NFR-5**: 图片大小限制在 5MB 以内

## Constraints
- **Technical**: 继续使用 Next.js、Monaco Editor、Tailwind CSS、Zustand
- **Business**: 保持零成本运行、无服务器依赖
- **Dependencies**: 继续仅使用开源免费依赖

## Assumptions
- 用户会合理使用文件系统功能
- 单个项目文件总数不会过多（< 100）
- 图片主要用于 UI 展示，非超大资源文件
- 浏览器支持 File API 和 Blob 对象

## Acceptance Criteria

### AC-1: 项目结构类型选择
- **Given**: 用户在面试官或候选人界面
- **When**: 创建或选择题目
- **Then**: 可以选择单文件模式或多文件模式
- **Verification**: `programmatic`
- **Notes**: 默认保持单文件模式以兼容现有题目

### AC-2: 文件树状编辑器
- **Given**: 用户在多文件模式下
- **When**: 查看项目文件结构
- **Then**: 显示可交互的文件树，支持展开/折叠
- **Verification**: `programmatic`

### AC-3: 文件创建与删除
- **Given**: 用户在文件树编辑器中
- **When**: 点击创建/删除文件按钮
- **Then**: 可以创建新文件（支持多种扩展名）或删除现有文件
- **Verification**: `programmatic`

### AC-4: 多文件编辑
- **Given**: 用户选择了某个文件
- **When**: 在编辑器中修改代码
- **Then**: 每个文件有独立的编辑器，支持切换编辑
- **Verification**: `human-judgment`

### AC-5: 图片资源管理
- **Given**: 用户需要添加图片
- **When**: 上传图片文件
- **Then**: 图片被转换为 Base64 并嵌入到项目中，可以在文件树中查看
- **Verification**: `programmatic`

### AC-6: 多文件预览
- **Given**: 用户有一个多文件项目
- **When**: 查看实时预览
- **Then**: 预览正确加载和渲染所有相关文件
- **Verification**: `programmatic`

### AC-7: 文件导出
- **Given**: 用户完成项目
- **When**: 点击导出按钮
- **Then**: 下载包含完整项目结构的 ZIP 文件
- **Verification**: `programmatic`

### AC-8: 向后兼容
- **Given**: 用户打开现有单文件题目
- **When**: 正常使用功能
- **Then**: 所有现有功能正常工作，无兼容性问题
- **Verification**: `programmatic`

### AC-9: 文件重命名
- **Given**: 用户在文件树中
- **When**: 右键点击文件并选择重命名
- **Then**: 可以修改文件名和扩展名
- **Verification**: `programmatic`

### AC-10: 大文件处理
- **Given**: 用户编辑较大的文件
- **When**: 在编辑器中工作
- **Then**: 编辑器保持响应，性能可接受
- **Verification**: `human-judgment`

## Open Questions
- [ ] 是否需要支持文件夹嵌套结构，还是仅支持扁平文件结构？
- [ ] 图片是否需要支持其他格式（SVG、WebP），还是仅支持常见格式？
- [ ] 是否需要实现文件搜索功能？
