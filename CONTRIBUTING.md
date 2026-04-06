# 贡献指南 (Contributing Guide)

感谢你对 VibeCode Check 项目的关注！我们欢迎各种形式的贡献，包括但不限于：

- 🐛 Bug 修复
- ✨ 新功能开发
- 📝 文档改进
- 🎨 UI/UX 优化
- 🌍 国际化翻译
- 💡 题目贡献

---

## 🚀 快速开始

### 1. Fork 并克隆仓库

```bash
# Fork 本仓库到你的 GitHub 账号
# 然后克隆到本地
git clone https://github.com/YOUR_USERNAME/vibe-code-check.git
cd vibe-code-check
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看应用。

### 4. 创建分支

```bash
# 基于 main 分支创建新分支
git checkout -b feature/your-feature-name
```

---

## 📋 开发规范

### 代码风格

#### TypeScript
- 使用 TypeScript 进行类型定义
- 避免使用 `any` 类型
- 为函数添加返回值类型
- 使用接口（interface）定义对象结构

**示例：**
```typescript
// ✅ 好的实践
interface Problem {
  id: string;
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

function getProblem(id: string): Problem | undefined {
  return problems.find(p => p.id === id);
}

// ❌ 避免
function getProblem(id) {  // 缺少类型注解
  // ...
}
```

#### React/Next.js
- 使用函数式组件和 Hooks
- 组件名使用 PascalCase
- 文件名与组件名一致
- Props 接口单独定义

**示例：**
```typescript
// components/Timer.tsx
interface TimerProps {
  duration: number;
  onTimeUp?: () => void;
}

export default function Timer({ duration, onTimeUp }: TimerProps) {
  // ...
}
```

#### CSS/Tailwind
- 优先使用 Tailwind CSS 工具类
- 自定义样式放在 `globals.css`
- 遵循项目现有的配色方案（ChatGPT风格暗色主题）

**配色速查：**
- 主背景: `#343541`
- 卡片背景: `#444654`
- 强调色: `#10a37f` (OpenAI绿)
- 主文字: `#ececf1`
- 边框: `border-gray-600`

---

## 🎯 提交题目指南

VibeCode Check 的核心价值在于**高质量的面试题目**，我们非常欢迎社区贡献新题目！

### 题目模板

在 `data/problems.ts` 中添加新的题目对象：

```typescript
{
  id: 'unique-id',                    // 唯一标识符 (kebab-case)
  title: '题目标题',                   // 简洁明了的标题
  level: 'beginner' | 'intermediate' | 'advanced',  // 难度级别
  duration: 30,                        // 建议时长（分钟）
  description: '一句话描述',            // 简短描述
  requirements: `
    详细的需求说明...
    
    💡 提示信息（可选）:
    • 技术要点提示
    • API资源链接
    • 参考实现思路
  `,
  mode: ProjectMode.SINGLE_FILE,       // 项目模式
  template: {                           // 初始代码模板
    html: '',
    css: '',
    js: ''
  },
  evaluationPoints: [                   // 核心考察点 (4-6个)
    '考察点1',
    '考察点2',
    // ...
  ],
  bonusPoints: [                       // 可选加分项 (3-5个)
    '加分项1',
    // ...
  ],
  scoringCriteria: [                   // 评分标准 (4项)
    { name: '评估维度', description: '说明', maxScore: 10 },
    // ...
  ],
  interviewGuide: {                     // 面试指导
    keyPoints: ['关键点1', '关键点2'],
    questions: ['问题1？', '问题2？']
  },
  images: [                            // 内置图片资源 (可选)
    { path: 'assets/image.svg', content: 'SVG_DATA_URI', description: '描述' }
  ]
}
```

### 题目质量标准

#### ✅ 优秀的题目应该：

1. **场景化**: 来自真实业务场景，而非纯算法题
2. **明确性**: 需求清晰无歧义，有明确的验收标准
3. **层次性**: 有基础要求和高级挑战（bonus points）
4. **可评估**: 打分表具体可量化
5. **时效性**: 能在规定时间内完成（参考时长）
6. **公平性**: 不依赖特定框架或库的特殊知识

#### ❌ 避免的题目：

1. 过于简单的 "Hello World" 级别
2. 过于复杂需要数天才能完成
3. 依赖特定商业API或付费服务
4. 与已有题目高度重复
5. 纯算法题（应结合实际应用场景）

---

## 🧪 测试

### 运行测试

```bash
# 运行所有测试
npm test

# 运行特定测试文件
npm test -- --testPathPattern="Timer"

# 监视模式（文件变化自动重跑）
npm test --watch
```

### 添加测试

使用 Jest + React Testing Library：

```typescript
// __tests__/Timer.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Timer from '@/components/Timer';

describe('Timer Component', () => {
  it('should display initial time', () => {
    render(<Timer duration={30} />);
    expect(screen.getByText('30:00')).toBeInTheDocument();
  });

  it('should start countdown on button click', () => {
    render(<Timer duration={30} />);
    fireEvent.click(screen.getByText('开始'));
    expect(screen.getByText('暂停')).toBeInTheDocument();
  });
});
```

---

## 📝 Commit 规范

### Commit Message 格式

采用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

<body>
```

**Type 类型：**
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式调整（不影响功能）
- `refactor`: 重构（既不是新功能也不是修复）
- `test`: 添加或修改测试
- `chore`: 构建/工具链变更

**示例：**
```
feat(timer): add pause/resume functionality to interview timer

- Add pause and resume buttons
- Show paused state with visual indicator
- Preserve time when pausing

Closes #123
```

---

## 🔍 Pull Request 流程

### 1. 确保代码质量

```bash
# 运行 Lint
npm run lint

# 运行类型检查
npx tsc --noEmit

# 运行测试
npm test

# 构建检查
npm run build
```

### 2. 更新文档

如果添加了新功能：
- 更新 `README.md`（如需要）
- 更新 `CHANGELOG.md`
- 更新相关注释和 JSDoc

### 3. 提交 PR

1. Push 你的分支到 Fork 的仓库
2. 在 GitHub 上创建 Pull Request
3. 填写 PR 模板（会自动加载）
4. 等待 Code Review

### PR Checklist

提交前请确认：

- [ ] 代码遵循项目规范
- [ ] 无 TypeScript 错误
- [ ] 无 ESLint 警告
- [ ] 新功能包含测试
- [ ] 文档已更新
- [ ] Commit message 符合规范

---

## 🐛 报告 Bug

使用 GitHub Issues 报告 Bug，请提供：

1. **问题描述**: 清晰描述问题现象
2. **复现步骤**: 详细的重现步骤
3. **期望行为**: 你期望的正确行为
4. **实际行为**: 实际发生的错误行为
5. **环境信息**: 
   - 浏览器及版本
   - 操作系统
   - Node.js 版本
   - 截图（如有）

**Bug Report 模板：**

```markdown
## 🐛 Bug 描述
[清晰描述问题]

## 🔄 复现步骤
1. 访问 '...'
2. 点击 '...'
3. 观察到 '...'

## 😊 期望行为
[期望的正确行为]

## 😔 实际行为
[实际发生的错误]

## 🖥️ 环境信息
- OS: [e.g., macOS 14.0]
- Browser: [e.g., Chrome 120]
- Node.js: [e.g., v18.17.0]

## 📸 截图
[如有，请附上截图]
```

---

## 💡 功能请求

使用 GitHub Issues 或 Discussions 提出新功能建议。

**Feature Request 模板：**

```markdown
## ✨ 功能描述
[清晰描述你想要的功能]

## 🎯 使用场景
[这个功能解决什么问题？谁会用？]

## 📋 实现建议
[如果你有实现思路，可以简单描述]

## 📊 优先级
- [ ] P0 - 必须有
- [ ] P1 - 应该有
- [ ] P2 - 可以有
```

---

## 🌟 贡献者名单

感谢所有为 VibeCode Check 做出贡献的开发者！（即将添加）

---

## 📜 行为准则

参与本项目即表示您同意遵守：

1. **尊重他人**: 保持专业、友善的沟通
2. **欢迎新人**: 帮助新贡献者融入社区
3. **建设性反馈**: 评论要具体、可操作、友好
4. **专注技术**: 讨论聚焦于技术和产品本身

---

## 📞 联系方式

- **GitHub Issues**: [github.com/your-username/vibe-code-check/issues](https://github.com/your-username/vibe-code-check/issues)
- **Email**: team@vibecodecheck.dev
- **Discussions**: [github.com/your-username/vibe-code-check/discussions](https://github.com/your-username/vibe-code-check/discussions)

---

**再次感谢你的贡献！🎉**

每一个 Issue、PR、文档改进都让 VibeCode Check 变得更好。期待你的参与！

_💚 Made with love by the VibeCode Check Team_
