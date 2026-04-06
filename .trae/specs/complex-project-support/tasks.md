# 复杂项目支持 - The Implementation Plan (Decomposed and Prioritized Task List)

## [ ] Task 1: 更新类型定义以支持多文件结构
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 更新 types/index.ts 中的类型定义
  - 添加多文件项目结构的类型定义
  - 保持向后兼容，继续支持现有单文件模式
  - 定义项目模式枚举（single-file / multi-file）
  - 定义文件系统结构的类型
- **Acceptance Criteria Addressed**: [AC-1, AC-7, AC-8]
- **Test Requirements**:
  - `programmatic` TR-1.1: 类型定义正确编译，无 TypeScript 错误
  - `programmatic` TR-1.2: 可以同时表示单文件和多文件项目结构
  - `human-judgement` TR-1.3: 类型定义清晰易读，有良好的文档注释
- **Notes**: 使用 discriminated unions 来区分不同的项目模式

## [ ] Task 2: 实现文件系统状态管理（Zustand）
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 创建新的 Zustand store 或更新现有 store
  - 实现文件 CRUD 操作（创建、读取、更新、删除）
  - 实现文件选择和当前激活文件状态
  - 实现项目模式切换逻辑
  - 确保状态持久化（如果需要）
- **Acceptance Criteria Addressed**: [AC-1, AC-2, AC-3, AC-9, AC-10]
- **Test Requirements**:
  - `programmatic` TR-2.1: 可以正确创建和删除文件
  - `programmatic` TR-2.2: 可以正确切换当前激活文件
  - `programmatic` TR-2.3: 状态更新后正确触发组件重新渲染
  - `human-judgement` TR-2.4: Store 代码结构清晰，易于维护
- **Notes**: 参考现有 store 的实现模式

## [ ] Task 3: 实现文件树状编辑器 UI 组件
- **Priority**: P1
- **Depends On**: Task 2
- **Description**: 
  - 创建文件树组件，显示项目文件结构
  - 实现文件选择交互
  - 实现展开/折叠动画
  - 添加文件创建、删除、重命名按钮和交互
  - 集成到现有页面布局中
- **Acceptance Criteria Addressed**: [AC-2, AC-3, AC-9]
- **Test Requirements**:
  - `programmatic` TR-3.1: 文件树正确显示所有项目文件
  - `programmatic` TR-3.2: 点击文件可以正确切换当前编辑器
  - `human-judgement` TR-3.3: UI 美观，与现有风格一致
  - `human-judgement` TR-3.4: 交互流畅，无明显卡顿
- **Notes**: 使用 Tailwind CSS 保持与现有 UI 一致的风格

## [ ] Task 4: 更新 Monaco Editor 集成以支持多文件
- **Priority**: P1
- **Depends On**: Task 3
- **Description**: 
  - 根据当前选择的文件切换编辑器内容
  - 正确设置编辑器的语言模式（基于文件扩展名）
  - 保存编辑内容到正确的文件
  - 保持编辑器的所有现有功能（自动完成、语法高亮等）
- **Acceptance Criteria Addressed**: [AC-4, AC-10]
- **Test Requirements**:
  - `programmatic` TR-4.1: 切换文件时编辑器内容正确更新
  - `programmatic` TR-4.2: 不同扩展名的文件使用正确的语言模式
  - `human-judgement` TR-4.3: 编辑体验流畅，无性能问题
- **Notes**: 可以参考现有单文件编辑器的实现

## [ ] Task 5: 实现图片资源支持
- **Priority**: P1
- **Depends On**: Task 2
- **Description**: 
  - 实现图片上传功能（支持拖拽和文件选择）
  - 将图片转换为 Base64 编码
  - 在文件树中显示图片文件
  - 支持图片预览功能
  - 添加图片大小验证
- **Acceptance Criteria Addressed**: [AC-5]
- **Test Requirements**:
  - `programmatic` TR-5.1: 可以成功上传图片并转换为 Base64
  - `programmatic` TR-5.2: 超过 5MB 的图片被正确拒绝
  - `human-judgement` TR-5.3: 图片预览功能正常工作
- **Notes**: 支持常见格式（JPG、PNG、GIF、SVG）

## [ ] Task 6: 更新预览机制以支持多文件项目
- **Priority**: P1
- **Depends On**: Task 4, Task 5
- **Description**: 
  - 更新 getPreviewHtml() 函数以支持多文件项目
  - 正确处理相对路径引用
  - 将所有文件嵌入到预览 HTML 中
  - 确保图片资源正确显示
  - 保持 iframe 沙箱安全
- **Acceptance Criteria Addressed**: [AC-6]
- **Test Requirements**:
  - `programmatic` TR-6.1: 多文件项目可以正确预览
  - `programmatic` TR-6.2: 图片资源在预览中正确显示
  - `programmatic` TR-6.3: 相对路径引用正确解析
- **Notes**: 需要仔细处理文件引用的路径问题

## [ ] Task 7: 实现文件系统导出功能（ZIP）
- **Priority**: P2
- **Depends On**: Task 2
- **Description**: 
  - 添加 JSZip 库（或类似库）依赖
  - 实现将项目文件打包为 ZIP 的功能
  - 实现 ZIP 文件下载
  - 保持单文件导出功能（向后兼容）
- **Acceptance Criteria Addressed**: [AC-7]
- **Test Requirements**:
  - `programmatic` TR-7.1: 可以成功导出 ZIP 文件
  - `programmatic` TR-7.2: ZIP 文件包含所有项目文件
  - `human-judgement` TR-7.3: 导出过程有适当的用户反馈
- **Notes**: 选择轻量级的 ZIP 库以保持零服务器架构

## [ ] Task 8: 确保向后兼容性
- **Priority**: P0
- **Depends On**: Task 6
- **Description**: 
  - 确保现有单文件题目可以正常加载和编辑
  - 确保导出功能对单文件题目继续正常工作
  - 确保预览功能对单文件题目继续正常工作
  - 添加适当的迁移逻辑（如果需要）
- **Acceptance Criteria Addressed**: [AC-8]
- **Test Requirements**:
  - `programmatic` TR-8.1: 现有单文件题目可以正确加载
  - `programmatic` TR-8.2: 所有现有功能在单文件模式下正常工作
  - `programmatic` TR-8.3: 可以在单文件和多文件模式之间切换
- **Notes**: 这是关键任务，必须确保不破坏现有功能

## [ ] Task 9: 集成和端到端测试
- **Priority**: P1
- **Depends On**: Task 8
- **Description**: 
  - 测试完整的用户流程（创建多文件项目、编辑、预览、导出）
  - 测试边界情况（空项目、大量文件、大文件）
  - 测试浏览器兼容性（主要现代浏览器）
  - 性能测试和优化
- **Acceptance Criteria Addressed**: [AC-1, AC-2, AC-3, AC-4, AC-5, AC-6, AC-7, AC-8, AC-9, AC-10]
- **Test Requirements**:
  - `human-judgement` TR-9.1: 完整用户流程可以无错误完成
  - `human-judgement` TR-9.2: 边界情况处理得当
  - `human-judgement` TR-9.3: 性能可接受，无明显卡顿
- **Notes**: 可以手动测试或使用 E2E 测试工具
