# ChatGPT风格全站UI重构 Spec

## Why
当前VibeCode Check应用的UI虽然已经实现了暗色调，但整体设计语言还不够现代化和统一。需要将整个应用（首页、面试官页面、候选人页面）重构为模仿ChatGPT官网的设计风格——极简、深色主题、居中布局、渐变色品牌标识、精致的交互细节，打造专业且具有科技感的面试评估工具界面。

## What Changes
- **BREAKING**: 完全重新设计所有页面的视觉风格为ChatGPT风格
- 采用ChatGPT官方配色方案和设计语言
- 重构首页为ChatGPT风格的欢迎页
- 统一面试官页面与ChatGPT侧边栏+主内容区布局
- 优化候选人页面的代码编辑器集成体验
- 添加统一的动画过渡和微交互效果

## Impact
- Affected specs: modern-dark-interviewer-ui (需更新以符合新风格)
- Affected code:
  - `/app/page.tsx` - 首页完全重写
  - `/app/interviewer/page.tsx` - 面试官页面重新设计
  - `/app/candidate/page.tsx` - 候选人页面优化
  - 可能需要调整全局样式或Tailwind配置

## ADDED Requirements

### Requirement: ChatGPT风格设计系统
系统 SHALL 提供一个完整遵循ChatGPT设计语言的UI体系：

#### 场景1: 首页欢迎界面 (ChatGPT Landing Page Style)
- **WHEN** 用户访问应用根路径
- **THEN** 页面应呈现：
  - **背景**: 深色渐变 `#212121` → `#171717` (类似ChatGPT的 #343541)
  - **品牌Logo**: 居中显示 "VibeCode Check" 使用渐变文字（类似OpenAI的渐变Logo）
    - 渐变色: `from-teal-400 via-cyan-400 to-blue-500` 或 `bg-gradient-to-r from-[#10a37f] to-[#1e88e5]`
    - 字体大小: `text-6xl font-semibold`
    - 添加subtle glow效果
  - **副标题**: 简洁描述文字 `text-gray-400 text-lg`
  - **核心操作区域**:
    - 居中的大型输入框或选择器（类似ChatGPT的输入框）
      - 样式: `bg-[#40414f] border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-[#10a37f] focus:ring-1 focus:ring-[#10a37f]/50`
      - placeholder: "选择你的角色..."
    - 或两个大型功能卡片（面试官/候选人）
      - 卡片样式: `bg-[#40414f] hover:bg-[#4a4b59] rounded-xl p-6 transition-all duration-200 hover:border-gray-500`
      - hover时边框变为 `border-[#10a37f]` 并有subtle glow
  - **底部信息栏**: 
    - 极简的文字链接或版权信息
    - `text-xs text-gray-500`

#### 场景2: 面试官页面 (ChatGPT Sidebar + Main Content Layout)
- **WHEN** 用户访问 /interviewer 路径
- **THEN** 页面应采用ChatGPT式布局：

  **左侧边栏 (Sidebar)**:
  - 固定宽度: `w-64` (260px)
  - 背景: `bg-[#202123]` (更深的侧边栏背景)
  - **顶部区域**:
    - Logo/返回链接: 文字使用渐变色
    - 新建对话按钮(可选): `bg-[#10a37f] hover:bg-[#1a7f64] rounded-md px-3 py-2 text-sm`
  - **题目列表区域**:
    - 每个题目项:
      * 默认状态: `text-gray-300 hover:bg-[#2a2b32] rounded-md px-3 py-2 text-sm`
      * 选中状态: `bg-[#343541] text-white`
      * Hover时显示更多操作图标
    - 难度标签: 小型pill badge
      * 初级: `bg-cyan-900/30 text-cyan-400 text-xs px-2 py-0.5 rounded-full`
      * 中级: `bg-purple-900/30 text-purple-400 text-xs px-2 py-0.5 rounded-full`
      * 高级: `bg-red-900/30 text-red-400 text-xs px-2 py-0.5 rounded-full`

  **右侧主内容区 (Main Content)**:
  - 背景: `#343541`
  - **顶部Header** (固定):
    * 页面标题: "📋 题库管理" 或选中题目标题
    * 操作按钮组（生成链接、复制等）
  - **内容区域**:
    * 未选中时: 显示空状态或引导文字
    * 选中后: 显示详情面板
      - 详情容器: `bg-[#444654] rounded-lg p-6`
      - 各区块标题: `text-base font-medium text-gray-100 mb-3`
      - 表格: `w-full text-left text-sm`
        * 表头: `text-gray-400 font-normal border-b border-gray-600 pb-2`
        * 单元格: `text-gray-200 py-2`
        * 斑马纹: `even:bg-[#40414f]`
        * hover: `hover:bg-[#4a4b59]`

#### 场景3: 候选人页面优化
- **WHEN** 用户访问 /candidate 路径
- **THEN** 页面保持现有功能但优化视觉:
  - 整体背景统一为 `#343541`
  - 编辑器区域: 保持Monaco编辑器但外层容器适配暗色
  - 工具栏: 使用 `bg-[#202123]` 的工具栏
  - 按钮: 统一使用ChatGPT风格按钮样式

### Requirement: ChatGPT配色方案 (Design Tokens)

**背景层级 (Background Hierarchy):**
```css
--bg-primary: #212121;          /* 最深层背景 */
--bg-secondary: #343541;        /* 主要工作区 */
--bg-tertiary: #444654;         /* 卡片/面板 */
--bg-elevated: #40414f;         /* 输入框、悬浮元素 */
--bg-sidebar: #202123;          /* 侧边栏 */
```

**文字颜色 (Text Colors):**
```css
--text-primary: #ececf1;       /* 主要文字 */
--text-secondary: #c5c5d2;     /* 次要文字 */
--text-muted: #8e8ea0;         /* 辅助/提示文字 */
--text-inverse: #ffffff;        /* 反白文字 */
```

**强调色 (Accent Colors):**
```css
--accent-primary: #10a37f;      /* OpenAI绿 - 主强调色 */
--accent-hover: #1a7f64;        /* hover状态 */
--accent-light: rgba(16, 163, 127, 0.1); /* 浅色变体 */
```

**边框 & 分割线:**
```css
--border-default: #565869;      /* 默认边框 */
--border-subtle: #4d4d4f;       /* 微妙边框 */
--border-focus: #10a37f;        /* 聚焦边框 */
```

### Requirement: 动画与微交互 (Animations & Micro-interactions)
- **按钮hover**: `transition-all duration-200 ease-in-out` + 背景色变化
- **卡片hover**: `transition-shadow duration-200` + shadow增强
- **输入框focus**: `transition-colors duration-150` + border颜色变化 + ring出现
- **页面切换**: `fade-in` 效果 (opacity 0→1)
- **列表项hover**: 背景色平滑过渡
- **所有动画** 应该是 subtle 和 smooth，避免过度花哨

### Requirement: 排版系统 (Typography)
- **字体栈**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` (系统默认无衬线字体)
- **标题字号**:
  - H1 (Logo): `text-6xl` (60px) - 仅首页使用
  - H2 (页面标题): `text-2xl font-semibold`
  - H3 (区块标题): `text-lg font-medium`
  - Body: `text-sm` 或 `text-base`
- **行高**: `leading-relaxed` 或 `leading-normal`
- **字重**: 正常使用 `font-normal`, 标题使用 `font-semibold` (避免过粗)

## MODIFIED Requirements

### Requirement: 响应式设计
适配ChatGPT式的响应式断点：
- **Desktop (>1024px)**: 显示完整侧边栏 + 主内容区
- **Tablet (768-1024px)**: 侧边栏可折叠，主内容区占满
- **Mobile (<768px)**: 全屏单列布局，隐藏侧边栏（通过汉堡菜单触发）

### Requirement: 无障碍性 (Accessibility)
- 所有可交互元素必须有明确的focus状态（ring或border高亮）
- 文字对比度至少达到 WCAG AA 标准（4.5:1）
- 支持键盘导航（Tab键顺序合理）
- 为图标按钮添加aria-label

## REMOVED Requirements

### Requirement: 旧版浅色主题
**原因**: 不再支持浅色模式，全面转向ChatGPT式深色主题
**迁移**: 删除所有浅色相关的样式类和配置

### Requirement: 复杂的玻璃拟态效果
**原因**: ChatGPT使用的是扁平化的分层设计而非玻璃拟态
**迁移**: 替换为实色的背景层级（--bg-primary, --bg-secondary等）
