# 内置图片资源功能 - 产品需求文档

## Overview
- **Summary**: 为VibeCode Check面试题库中的每道题目提供内置的图片资源，候选人可以直接使用这些图片而无需自己上传或寻找合适的图片
- **Purpose**: 解决面试过程中候选人需要自己寻找和上传图片的痛点，节省宝贵的面试时间，让候选人专注于核心功能实现
- **Target Users**: 面试候选人、HR面试官

## Goals
- 为每道题目提供相关的、高质量的图片资源
- 图片资源可以直接在代码中引用，无需额外上传
- 图片资源与题目场景高度匹配，符合业务需求
- 提供多种格式的图片（PNG、JPG、SVG等）
- 图片可以在预览中正确显示

## Non-Goals (Out of Scope)
- 不实现图片上传功能（已有文件系统支持）
- 不实现图片编辑功能
- 不提供无限量的图片资源
- 不实现图片AI生成功能
- 不做图片版权管理

## Background & Context
- 现有项目：VibeCode Check - AI原生Vibe Coding工程师专属面试评估工具
- 现有功能：9道面试题，包含初/中/高级三个等级
- 痛点：候选人在面试时需要自己寻找合适的图片，浪费宝贵的面试时间
- 解决方案：为每道题目预置相关的图片资源，候选人可以直接使用

## Functional Requirements
- **FR-1**: 扩展题目数据结构，支持内置图片资源
- **FR-2**: 每道题目包含3-5张相关的图片资源
- **FR-3**: 图片资源可以通过文件路径直接引用
- **FR-4**: 图片资源在预览中正确显示
- **FR-5**: 候选人可以在文件树中看到内置图片
- **FR-6**: 图片资源包含商品图片、用户头像、产品图片、装饰图片等多种类型

## Non-Functional Requirements
- **NFR-1**: 图片加载时间 < 500ms
- **NFR-2**: 图片大小合理（单张 < 500KB）
- **NFR-3**: 图片格式兼容性好（支持主流浏览器）
- **NFR-4**: 图片质量高，适合用于演示

## Constraints
- **Technical**: 使用纯静态资源，无后端存储
- **Business**: 图片必须是合法、可商用的
- **Dependencies**: 依赖现有的文件系统存储和预览功能

## Assumptions
- 图片资源可以通过文本转图片API生成或使用免费图库
- 候选人会根据题目需求合理使用内置图片
- 图片资源不会占用过多存储空间

## Acceptance Criteria

### AC-1: 题目数据结构支持内置图片
- **Given**: 现有题目数据结构
- **When**: 扩展数据结构添加图片资源字段
- **Then**: 每道题目可以包含images数组，每个image包含path、content、description
- **Verification**: `programmatic`

### AC-2: 初级题目内置图片
- **Given**: 初级题目（电商商品搜索、待办事项、简单计算器）
- **When**: 为这些题目添加相关图片
- **Then**: 
  - 电商题目包含商品图片（耳机、手表、充电宝等）
  - 待办事项包含装饰图标
  - 计算器包含UI元素图片
- **Verification**: `human-judgment`

### AC-3: 中级题目内置图片
- **Given**: 中级题目（用户数据表格、表单验证、天气应用）
- **When**: 为这些题目添加相关图片
- **Then**: 
  - 用户表格包含用户头像
  - 表单验证包含图标和装饰
  - 天气应用包含天气图标（晴天、多云、下雨等）
- **Verification**: `human-judgment`

### AC-4: 高级题目内置图片
- **Given**: 高级题目（购物车、状态管理库）
- **When**: 为这些题目添加相关图片
- **Then**: 
  - 购物车包含商品图片
  - 状态管理库包含架构示意图
- **Verification**: `human-judgment`

### AC-5: 图片在文件树中显示
- **Given**: 候选人进入编码环境
- **When**: 查看左侧文件树
- **Then**: 可以看到内置图片文件在assets/或images/目录下
- **Verification**: `human-judgment`

### AC-6: 图片在预览中正确显示
- **Given**: 候选人在代码中引用内置图片
- **When**: 查看实时预览
- **Then**: 图片正确显示，无404错误
- **Verification**: `human-judgment`

### AC-7: 图片可直接引用
- **Given**: 候选人在HTML中使用图片
- **When**: 使用相对路径引用（如&lt;img src="assets/product1.png"&gt;）
- **Then**: 图片正常加载和显示
- **Verification**: `programmatic`

## Open Questions
- [ ] 是否需要为图片添加缩略图预览功能？
- [ ] 图片数量是否需要根据题目等级调整？
- [ ] 是否需要提供图片的使用说明？
