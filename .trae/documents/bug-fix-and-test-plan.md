# VibeCode Check 完整测试与 Bug 修复计划

## 📋 问题诊断报告

### 🔴 关键 Bug（已确认）：vercel.json 路由配置错误

**问题描述：**
[vercel.json](vercel.json) 中配置了 SPA（单页应用）重写规则，导致所有路由都被重定向到首页。

```json
// 当前错误配置 ❌
{
  "rewrites": [
    {
      "source": "/(.*)",           // 匹配所有路径
      "destination": "/index.html" // 全部指向首页
    }
  ]
}
```

**影响范围：**
- ✗ 候选人访问 `/candidate?problemId=xxx` → 显示首页而非题目页面
- ✗ 面试官访问 `/interviewer` → 可能显示首页
- ✗ 所有子路由全部失效

**根因分析：**
这是 Create React App (CRA) 项目需要的配置（因为 CRA 只生成单个 `index.html`），但本项目使用 **Next.js 14 静态导出模式**，已经为每个路由生成了独立的 HTML 文件：
- `out/index.html` （首页）
- `out/candidate/index.html` （候选人页）
- `out/interviewer/index.html` （面试官页）

**解决方案：**
删除或修改 [vercel.json](vercel.json)，让 Vercel 使用 Next.js 的原生路由。

---

### 🟡 次要 Bug（待验证）

#### Bug #2: 静态导出模式下 useSearchParams() 兼容性

**文件位置：** [app/candidate/page.tsx#L17](app/candidate/page.tsx#L17)

**现象：**
在纯静态导出（`output: 'export'`）模式下，`useSearchParams()` 在首次加载时可能返回 `null`，导致：
- 第一次渲染时 `problemId` 为空
- 显示"请输入面试链接"的错误页面
- 需要刷新才能正常工作

**代码位置：**
```tsx
// app/candidate/page.tsx:17
const searchParams = useSearchParams();
const problemId = searchParams.get('problemId'); // 可能为 null
```

**影响场景：**
- 用户第一次点击链接进入
- 直接从浏览器地址栏输入带参数的 URL

---

#### Bug #3: 候选人用户体验问题 - 表单遮挡题目信息

**文件位置：** [app/candidate/page.tsx#L486-L569](app/candidate/page.tsx#L486-L569)

**现象：**
候选人打开链接后，首先看到的是**全屏表单弹窗**（要求填写姓名），而不是题目内容。用户反馈"不是题目"可能是指：
1. 看到了表单而不是编码界面
2. 表单中的题目信息预览不够明显

**当前流程：**
```
打开链接 → 全屏表单弹窗（填写姓名）→ 点击"开始答题" → 编码界面
```

**用户期望流程：**
```
打开链接 → 看到题目信息和编码界面 → 可选填写姓名 → 开始答题
```

---

#### Bug #4: 错误提示不够友好

**文件位置：** [app/candidate/page.tsx#L443-L481](app/candidate/page.tsx#L443-L481)

**问题：**
当 `problemId` 缺失或无效时，显示的技术性提示对非技术用户不友好：

```tsx
// 当前提示 ❌
<p>请输入面试官提供的面试链接，或直接在URL中添加problemId参数</p>
<code>{window.location.origin}/candidate?problemId=beginner-1</code>
```

**应该改为：**
- 更清晰的中文说明
- 提供"返回首页"按钮
- 自动检测并提示常见错误原因

---

#### Bug #5: 面试官链接复制功能未考虑部署环境

**文件位置：** [app/interviewer/page.tsx#L34-L37](app/interviewer/page.tsx#L34-L37)

**代码：**
```tsx
const generateInterviewLink = (problemId: string) => {
  const baseUrl = window.location.origin; // 动态获取当前域名
  return `${baseUrl}/candidate?problemId=${problemId}`;
};
```

**潜在问题：**
- 本地开发时生成的链接是 `http://localhost:3000/...`
- 部署到 Vercel 后应该是 `https://out-drab-phi.vercel.app/...`
- 如果面试官在本地测试后复制链接发给候选人，候选人无法访问

---

## 🧪 完整测试计划

### 测试环境准备

| 环境 | URL | 用途 |
|------|-----|------|
| 本地开发 | http://localhost:3000 | 功能调试 |
| Vercel 生产 | https://out-drab-phi.vercel.app | 真实环境测试 |

### 测试用例清单

#### Test Case #1: 核心功能 - 链接生成与访问

**前置条件：** 访问 https://out-drab-phi.vercel.app/interviewer

**步骤：**
1. 选择任意一道题（例如 beginner-1）
2. 点击"复制链接"按钮
3. 打开新浏览器窗口（模拟候选人）
4. 粘贴链接并访问

**预期结果：**
- ✅ 链接格式正确：`https://out-drab-phi.vercel.app/candidate?problemId=beginner-1`
- ✅ 页面显示候选人界面（不是首页）
- ✅ 能看到题目信息和编码编辑器
- ✅ Monaco Editor 正常加载

**实际结果（Bug 状态）：**
- ❌ 当前会跳转到首页（vercel.json 配置错误）

---

#### Test Case #2: 无效 problemId 处理

**步骤：**
1. 访问 `https://out-drab-phi.vercel.app/candidate?problemId=invalid-id`
2. 观察页面显示

**预期结果：**
- ✅ 显示友好的错误提示
- ✅ 提供返回首页的选项
- ✅ 不会出现白屏或控制台报错

---

#### Test Case #3: 缺少 problemId 参数

**步骤：**
1. 直接访问 `https://out-drab-phi.vercel.app/candidate`（不带参数）
2. 观察页面显示

**预期结果：**
- ✅ 显示引导页面，说明如何使用
- ✅ 提供"返回首页"链接

---

#### Test Case #4: 所有 15 道题目链接测试

**步骤：**
1. 从面试官页面依次选择每道题目
2. 生成链接并在新标签页打开
3. 验证每道题都能正确显示

**测试数据：**
| 题目 ID | 标题 | 难度 | 预期行为 |
|---------|------|------|---------|
| beginner-1 | 电商商品搜索 | 初级 | 正常显示 |
| beginner-2 | 待办事项列表 | 初级 | 正常显示 |
| beginner-3 | 简单计算器 | 初级 | 正常显示 |
| beginner-4 | React Counter | 初级 | 正常显示 |
| beginner-5 | Todo List React | 初级 | 正常显示 |
| intermediate-1 | Markdown 编辑器 | 中级 | 正常显示 |
| intermediate-2 | 天气查询应用 | 中级 | 正常显示 |
| intermediate-3 | 图片上传预览 | 中级 | 正常显示 |
| intermediate-4 | User Data Fetching | 中级 | 正常显示 |
| intermediate-5 | Image Lazy Loading | 中级 | 正常显示 |
| advanced-1 | 表单组件库 | 高级 | 正常显示 |
| advanced-2 | 数据可视化仪表盘 | 高级 | 正常显示 |
| advanced-3 | Custom Hook Design | 高级 | 正常显示 |
| advanced-4 | Context API Global State | 高级 | 正常显示 |
| advanced-5 | Data Structures & Algorithms | 高级 | 正常显示 |

---

#### Test Case #5: 候选人完整流程测试

**步骤：**
1. 通过正确链接进入候选人页面
2. 填写姓名表单
3. 点击"开始答题"
4. 编辑代码
5. 使用计时器
6. 导出代码包
7. 验证导出的 ZIP 文件包含正确的文件

**预期结果：**
- ✅ 表单提交后进入编码界面
- ✅ 编辑器可正常输入代码
- ✅ 预览区实时更新
- ✅ 计时器倒计时正常
- ✅ 导出的 ZIP 包含 HTML/CSS/JS 文件和 report.html

---

#### Test Case #6: 移动端兼容性测试

**设备：**
- iPhone Safari
- Android Chrome
- iPad 平板

**测试点：**
- 页面布局是否自适应
- 编辑器是否可用
- 表单是否可填写
- 导出按钮是否可点击

---

#### Test Case #7: 浏览器兼容性测试

**浏览器：**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**测试点：**
- URL 参数解析是否正确
- Monaco Editor 是否加载
- JSZip 导出是否工作
- localStorage 是否可用

---

## 🔧 修复方案详细设计

### Fix #1: 删除 vercel.json 或更新为 Next.js 兼容配置（P0 - 最高优先级）

**方案 A：完全删除 vercel.json（推荐）✅**

```bash
rm vercel.json
```

**理由：**
- Next.js 静态导出生成的 `out/` 目录已经有完整的路由结构
- Vercel 会自动识别 Next.js 输出格式
- 无需额外配置

**方案 B：保留但修改配置（备选）**

如果未来需要自定义 headers 或 redirects：

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" }
      ]
    }
  ]
}
```

**注意：** 不要包含 rewrites 规则！

---

### Fix #2: 优化 useSearchParams() 使用（P1 - 高优先级）

**文件：** [app/candidate/page.tsx](app/candidate/page.tsx)

**修改位置：** 第 16-19 行

**当前代码：**
```tsx
function CandidateContent() {
  const searchParams = useSearchParams();
  const problemId = searchParams.get('problemId');

  const [problem, setProblem] = useState(problems.find(p => p.id === problemId) || null);
```

**优化后的代码：**
```tsx
function CandidateContent() {
  const searchParams = useSearchParams();
  const problemId = searchParams.get('problemId');

  const [problem, setProblem] = useState<Problem | null>(null);

  useEffect(() => {
    if (problemId) {
      const foundProblem = problems.find(p => p.id === problemId);
      setProblem(foundProblem || null);
    } else {
      setProblem(null);
    }
  }, [problemId]);
```

**改进点：**
- 将 problem 的查找逻辑移入 `useEffect`
- 避免 SSR/CSR 不一致导致的闪烁
- 更新响应式地处理 URL 参数变化

---

### Fix #3: 改善候选人首屏体验（P1 - 高优先级）

**方案：将表单从全屏弹窗改为侧边栏或内嵌区域**

**当前 UI（差）：**
```
┌─────────────────────────────┐
│     全屏黑色遮罩            │
│  ┌───────────────────┐     │
│  │  👋 欢迎参加面试   │     │
│  │  姓名: [________] │     │
│  │  [开始答题]        │     │
│  └───────────────────┘     │
└─────────────────────────────┘
```

**优化后 UI（好）：**
```
┌─────────────────────────────────────────────┐
│ ← 退出  [👤 姓名]  初级  商品搜索  ⏱️ 导出  │
├────────────┬────────────────┬───────────────┤
│ 📁 文件树   │  代码编辑器     │  实时预览     │
│            │               │               │
│            ├───────────────┤               │
│            │ 📋 题目要求    │               │
│            │ (可折叠)       │               │
├────────────┴───────────────┴───────────────┤
│ ⚠️ 请先在上方填写您的姓名以开始正式计时      │
└─────────────────────────────────────────────┘
```

**实现要点：**
1. 移除全屏遮罩弹窗
2. 将表单移至 header 区域或底部提示条
3. 默认显示编码界面（即使未填表单）
4. 计时器在填表后才启动
5. 导出功能始终可用

---

### Fix #4: 增强错误提示友好度（P2 - 中优先级）

**文件：** [app/candidate/page.tsx#L443-L481](app/candidate/page.tsx#L443-L481)

**修改前（技术化）：**
```tsx
<h1 className="text-3xl font-bold text-white mb-4">候选人入口</h1>
<p className="text-gray-300 mb-8">
  请输入面试官提供的面试链接，或直接在URL中添加problemId参数
</p>
<code className="bg-[#40414f] px-2 py-1 rounded text-[#10a37f]">
  {window.location.origin}/candidate?problemId=beginner-1
</code>
```

**修改后（用户友好）：**
```tsx
<div className="text-center space-y-6">
  <div className="text-8xl">🤔</div>
  
  <div>
    <h1 className="text-3xl font-bold text-white mb-4">无法开始面试</h1>
    <p className="text-gray-300 text-lg mb-2">
      我们无法识别您要完成的面试题目
    </p>
  </div>

  <div className="bg-[#40414f] rounded-xl p-6 max-w-md mx-auto text-left space-y-3">
    <h3 className="font-semibold text-white flex items-center gap-2">
      💡 可能的原因：
    </h3>
    <ul className="space-y-2 text-gray-300 text-sm">
      <li className="flex items-start gap-2">
        <span className="text-red-400 mt-0.5">•</span>
        <span>面试链接不完整或已过期</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-red-400 mt-0.5">•</span>
        <span>链接被复制时丢失了部分内容</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-red-400 mt-0.5">•</span>
        <span>您直接访问了候选人入口而没有通过面试官分享的链接</span>
      </li>
    </ul>
  </div>

  <div className="space-y-3">
    <Link 
      href="/" 
      className="inline-block px-6 py-3 bg-[#10a37f] hover:bg-[#1a7f64] text-white rounded-lg font-medium transition-colors duration-200"
    >
      🏠 返回首页
    </Link>
  </div>
</div>
```

---

### Fix #5: 添加环境检测和智能提示（P2 - 中优先级）

**文件：** [app/interviewer/page.tsx#L34-L37](app/interviewer/page.tsx#L34-L37)

**增强功能：**
```tsx
const generateInterviewLink = (problemId: string) => {
  const baseUrl = window.location.origin;
  const fullUrl = `${baseUrl}/candidate?problemId=${problemId}`;
  
  // 开发环境警告
  if (baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1')) {
    console.warn('⚠️ 当前是本地开发环境，此链接仅在本机可用！');
  }
  
  return fullUrl;
};
```

**UI 增强：**
在"复制链接"按钮下方添加提示：

```tsx
{window.location.origin.includes('localhost') && (
  <div className="mt-3 p-3 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
    <p className="text-yellow-400 text-xs flex items-center gap-2">
      ⚠️ 当前为本地开发环境，此链接仅本机可用。
      部署到生产环境后再分享给候选人。
    </p>
  </div>
)}
```

---

## 📊 测试执行计划

### Phase 1: 修复实施（预计时间：30 分钟）

1. **Fix #1** - 删除 vercel.json（5 分钟）
2. **Fix #2** - 优化 useSearchParams（10 分钟）
3. **Fix #3** - 重构候选人表单 UI（15 分钟）

### Phase 2: 本地测试（预计时间：20 分钟）

1. 启动开发服务器：`npm run dev`
2. 执行 Test Case #1 - #5
3. 记录测试结果

### Phase 3: 部署到 Vercel（预计时间：5 分钟）

```bash
npm run build
npx vercel deploy out --prod --yes
```

### Phase 4: 生产环境测试（预计时间：15 分钟）

1. 在 Vercel 生产环境执行 Test Case #1 - #7
2. 使用不同浏览器测试
3. 使用手机浏览器测试（可选）

### Phase 5: 生成测试报告（预计时间：10 分钟）

整理所有测试结果，输出完整的测试报告文档。

---

## 🎯 成功标准

### 必须通过（Must Have）

- [ ] 候选人通过链接能直接进入编码界面（不再跳转首页）
- [ ] 所有 15 道题目链接均可正常访问
- [ ] 候选人能看到题目信息（不仅是表单）
- [ ] 无效链接有友好的错误提示

### 应该通过（Should Have）

- [ ] 表单不再遮挡主要内容
- [ ] 移动端基本可用
- [ ] 主流浏览器兼容

### 可以通过（Nice to Have）

- [ ] 本地开发环境有明确警告
- [ ] 错误页面有详细的排查指引
- [ ] 控制台无报错或警告

---

## 📝 交付物清单

### 代码修改

- [ ] 修改 [vercel.json](vercel.json) 或删除该文件
- [ ] 修改 [app/candidate/page.tsx](app/candidate/page.tsx)（useSearchParams + UI 重构）
- [ ] 修改 [app/interviewer/page.tsx](app/interviewer/page.tsx)（环境检测）

### 测试文档

- [ ] 完整测试报告（Markdown 格式）
- [ ] 测试用例执行记录（通过/失败）
- [ ] 截图证据（可选）
- [ ] Bug 清单及修复状态

### 部署更新

- [ ] 重新构建项目
- [ ] 部署到 Vercel
- [ ] 更新 GitHub 仓库（如有必要）

---

## ⚠️ 风险评估

| 风险 | 影响 | 概率 | 应对措施 |
|------|------|------|---------|
| 修改 UI 导致样式错乱 | 高 | 中 | 逐步修改，每步测试 |
| 删除 vercel.json 影响其他功能 | 低 | 低 | 仅删除 rewrites，保留其他配置 |
| useSearchParams 兼容性问题 | 中 | 中 | 添加降级方案（window.location.search） |
| 移动端适配工作量超预期 | 中 | 中 | 先保证桌面端可用，移动端后续迭代 |

---

## 🔄 回滚方案

如果修复后出现问题，可以快速回滚：

```bash
git checkout HEAD~1 -- vercel.json app/candidate/page.tsx app/interviewer/page.tsx
npm run build
npx vercel deploy out --prod --yes
```

---

**计划制定时间：** 2025-04-05
**预计完成时间：** 2025-04-05（1.5 小时内）
**负责人：** AI Assistant
**审核人：** User
