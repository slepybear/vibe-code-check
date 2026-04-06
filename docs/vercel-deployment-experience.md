# VibeCode Check - Vercel 部署完整经验文档

## 完整安装与部署流程阐述

### 一、整体架构

```
vibe-code-check/
├── app/                ← Next.js 14 App Router 页面目录
│   ├── page.tsx        ← 首页（暗色渐变风格）
│   ├── interviewer/    ← 面试官页面
│   └── candidate/      ← 候选人页面
├── components/         ← React 组件（Timer, ErrorBoundary 等）
├── data/problems.ts    ← 面试题库（16 道）
├── store/              ← Zustand 状态管理
├── public/             ← 静态资源（logo.svg）
├── out/                ← next build 输出的静态产物 ⭐
├── package.json        ← 依赖清单
└── next.config.js      ← Next.js 配置（output: 'export'）
```

**核心事实**：
- 项目是 **Next.js 14.1.0**（App Router 模式），不是 Create React App
- 使用 **静态导出模式** (`output: 'export'`)，构建命令固定为 `next build`
- **输出目录固定为 `out/`**（Next.js 静态导出的默认目录，不同于 CRA 的 `build/`）
- 包含 Monaco Editor、Zustand、JSZip 等核心依赖

---

### 二、安装依赖（npm install）

**执行命令**：
```bash
cd /Users/Zhuanz/Documents/trae_projects/vibe
npm install
```

**实际过程**：

1. **读取 package.json**：npm 扫描 `dependencies` 和 `devDependencies` 字段，得到所有需要安装的包列表。

2. **命中缓存**：因为这是第二次执行（第一次在项目初始化时已缓存到 `node_modules`），这一次几乎瞬间完成——`up to date, audited 427 packages in 1m`，说明所有包已存在于本地缓存。

3. **依赖树规模**：共 **427 个包**（包括 next 14.1.0、react 18.2.0、@monaco-editor/react、zustand、jszip 等核心依赖）。

4. **安全警告**：输出中有 **13 个漏洞**（3 中等，8 高危，2 严重），这是 Next.js 14 和相关依赖的已知问题，不影响构建和运行，可忽略。

**关键点**：
- 无需手动指定 Registry 或换源，npm 自动使用默认 Registry（`https://registry.npmjs.org`）
- Next.js 项目的依赖比 CRA 轻量很多（427 vs 1662）

---

### 三、构建（npm run build）

**执行命令**：
```bash
npm run build
```

**实际过程**：

#### 3.1 第一次构建失败 ❌

**错误信息**：
```
./app/candidate/page.tsx:42:61
Type error: Expected 2 arguments, but got 3.

> 42 |       initializeFromProblem(problem.template, problem.mode, problem.images);
     |                                                             ^
```

**原因分析**：
- [fileSystemStore.ts#L14](store/fileSystemStore.ts#L14) 的接口定义只接受 2 个参数：
  ```typescript
  initializeFromProblem: (template: SingleFileTemplate | MultiFileTemplate, mode: ProjectMode) => void;
  ```
- 但实际实现（[fileSystemStore.ts#L39](store/fileSystemStore.ts#L39)）和调用处都传了 3 个参数（多传了 `images` 可选参数）

**解决方案**：
修改 [fileSystemStore.ts#L14](store/fileSystemStore.ts#L14) 的类型定义：
```typescript
// 修改前
initializeFromProblem: (template: SingleFileTemplate | MultiFileTemplate, mode: ProjectMode) => void;

// 修改后 ✅
initializeFromProblem: (template: SingleFileTemplate | MultiFileTemplate, mode: ProjectMode, images?: BuiltInImage[]) => void;
```

#### 3.2 第二次构建成功 ✅

修复类型错误后重新执行 `npm run build`：

**Next.js 构建流程**：
1. **next build 执行**：Next.js 14 的标准生产构建流程，自动完成：
   - 编译 TypeScript 和 JSX
   - Tree-shaking（去除未使用代码）
   - 代码压缩（JS/CSS minification）
   - 生成静态 HTML（Static Generation / SSG）
   - **静态导出**（因为配置了 `output: 'export'`）

2. **输出文件**（见构建日志）：
   ```
   out/
   ├── _next/static/
   │   ├── chunks/69-fcf9992a789ad8c5.js          (29 kB)
   │   ├── chunks/fd9d1056-fcd995c0e4f0eb66.js   (53.4 kB)
   │   └── ...
   ├── index.html                                 (首页)
   ├── interviewer/index.html                     (面试官页)
   ├── candidate/index.html                       (候选人页)
   └── ...
   ```

3. **路由表**：
   | 页面 | 路径 | 大小 | 首次加载 JS |
   |------|------|------|-------------|
   | 首页 | `/` | 4.61 kB | 88.9 kB |
   | 候选人页 | `/candidate` | **50.7 kB** | **155 kB** |
   | 面试官页 | `/interviewer` | 2.46 kB | 107 kB |
   | 404 页 | `/_not-found` | 882 B | 85.2 kB |
   | 共享 JS | - | - | **84.3 kB** |

4. **关键配置生效**：
   - `output: 'export'` → 生成纯静态文件（无需 Node.js 服务器）
   - `images.unoptimized: true` → 图片不优化（静态导出必须）
   - 所有页面都是 **○ (Static)** 预渲染状态

---

### 四、部署到 Vercel

**执行命令**：
```bash
npx vercel@latest deploy out --prod --yes --token YOUR_VERCEL_TOKEN_HERE
```

**参数解析**：

| 参数 | 含义 |
|------|------|
| `npx vercel@latest` | 使用最新版 Vercel CLI（无需全局安装，npx 临时下载执行） |
| `deploy out` | 告知 CLI：我要上传 `out/` 目录作为静态产物（⭐ 关键：Next.js 输出目录是 `out/`，不是 CRA 的 `build/`） |
| `--prod` | 直接部署到生产环境（不加则部署到预览环境） |
| `--yes` | 自动确认所有交互提示，无需人工介入 |
| `--token <Token>` | 用 Access Token 完成身份认证，无需浏览器登录 |

**CLI 实际行为（分步）**：

#### 4.1 安装 Vercel CLI
```
Need to install the following packages:
vercel@50.39.0
Ok to proceed? (y) y
```
- npx 自动检测到需要安装 `vercel@50.39.0`
- 用户确认后自动下载并执行

#### 4.2 项目关联
```
🔗  Linked to slepybears-projects/out (created .vercel and added it to .gitignore)
```
- Vercel CLI 在当前目录创建 `.vercel/` 配置文件夹
- 自动将 `.vercel` 添加到 `.gitignore`（不会进入 Git 仓库）
- **项目名称自动识别为 `out`**（因为是从 `out/` 目录部署的）

#### 4.3 环境变量处理
```
> Downloading `development` Environment Variables for slepybears-projects/out
✅  Created .env.local file and added it to .gitignore [244ms]
```
- 自动从 Vercel 项目设置中拉取环境变量
- 创建 `.env.local` 文件并加入 `.gitignore`

#### 4.4 上传与部署
```
🔍  Inspect: https://vercel.com/slepybears-projects/out/4b8iNdv5nkGt3g2r9bqKDmXW9eYp [4s]
✅  Production: https://out-rnmyyx8ty-slepybears-projects.vercel.app [9s]
🔗  Aliased: https://out-drab-phi.vercel.app [9s]
```

**详细步骤**：
1. **读取项目配置**：`vercel` 命令从当前目录读取 `.vercel/` 项目配置
2. **Token 鉴权**：拿着 `--token` 向 `https://api.vercel.com/v13/deployments` 发起请求，Vercel 用此 Token 确认你属于哪个 Team/Account
3. **上传 out/ 内容**：CLI 将 `out/` 目录下的文件逐一上传到 Vercel 的 CDN 存储
4. **配置路由**：因为是纯静态文件，Vercel 自动识别为 **Static Deployment**，直接托管所有 HTML/CSS/JS 文件
5. **分配域名**：Vercel 自动分配两个域名：
   - **真实生产地址**: `https://out-rnmyyx8ty-slepybears-projects.vercel.app`
   - **用户友好的别名**: `https://out-drab-phi.vercel.app`

**性能数据**：
- 🔍 检查耗时：4 秒
- 🚀 部署耗时：9 秒（极速！）
- 📦 总计：约 13 秒完成全流程

#### 4.5 CLI 自动创建的文件

首次执行后，Vercel CLI 在项目根目录下创建了以下文件：

```
.v/                    ← Vercel 项目配置（已加入 .gitignore）
.env.local             ← 环境变量文件（已加入 .gitignore）
.gitignore             ← 更新了忽略规则
```

**重要提示**：后续再次执行时只需运行：
```bash
npx vercel deploy out --prod --yes
```
**无需再传 `--token`**，CLI 会自动读取本地缓存的凭证。

---

### 五、遇到的问题及解决方案

#### 问题 1：TypeScript 类型错误 ❌→✅

**现象**：
```
Type error: Expected 2 arguments, but got 3.
```

**根因**：
Zustand store 的接口定义与实现不一致，缺少可选参数 `images`。

**解决**：
修改 `store/fileSystemStore.ts` 第 14 行的类型签名，添加第三个可选参数。

**经验总结**：
- Next.js 构建时会进行严格的 TypeScript 类型检查
- Zustand 的接口定义必须与实际实现完全匹配
- 修改后必须重新运行 `npm run build` 验证

#### 问题 2：网络瞬断（参考模板中的经验）

虽然本次未遇到，但根据之前的部署经验，可能会出现以下错误：

**现象**：
```
EPIPE / socket hang up
```

**解决方案**：
**原命令不加任何参数重试一次**，Vercel CLI 会自动续传，Vercel 服务端也会做幂等处理。

---

### 六、Next.js vs CRA 部署对比

| 维度 | Create React App (CRA) | Next.js (本项目) |
|------|------------------------|------------------|
| **框架版本** | react-scripts 5.0.1 | next 14.1.0 |
| **构建命令** | `react-scripts build` | `next build` |
| **输出目录** | `build/` | `out/` |
| **依赖数量** | 1662 个包 | 427 个包 |
| **构建时间** | ~2-3 分钟 | ~30 秒 |
| **产物特点** | 单页应用 (SPA) | 多页静态站点 (SSG) |
| **路由方式** | 需要 `vercel.json` rewrites | 自动按目录结构路由 |
| **部署命令** | `vercel deploy build` | `vercel deploy out` ⭐ |

**关键差异**：
- Next.js 静态导出会生成多个独立的 HTML 文件（每个路由一个）
- 不需要额外的 `vercel.json` 配置 rewrites 规则
- 产物更轻量、加载更快（每个页面只加载必要的 JS）

---

### 七、总结图示

```
npm install          npm run build           vercel deploy out
   │                     │                        │
   ▼                     ▼                        ▼
读取 package.json      next build               上传 out/ 到 Vercel CDN
安装 427 个包          ↓                        ↓
   │                ✓ 编译 TypeScript           自动识别 Static Deployment
   │                ✓ 类型检查 (遇到错误❌)      分配域名
   │                ✓ 生成静态 HTML                 │
   │                ✓ Tree-shaking                ▼
   │                ✓ 代码压缩            https://out-drab-phi.vercel.app
   ▼                     ▼
node_modules/          out/ (静态产物)         ⏱️ 总耗时: ~13 秒
                      ├─ index.html
                      ├─ interviewer/index.html
                      ├─ candidate/index.html
                      └─ _next/static/chunks/
```

---

### 八、常用运维命令

#### 8.1 日常部署
```bash
# 完整部署流程（推荐）
npm install && npm run build && npx vercel deploy out --prod --yes

# 快速部署（假设依赖已安装、代码未变）
npx vercel deploy out --prod --yes
```

#### 8.2 查看部署日志
```bash
# 查看最近一次部署的日志
npx vercel inspect out-rnmyyx8ty-slepybears-projects.vercel.app --logs

# 查看特定部署的信息
npx vercel inspect <deployment-url>
```

#### 8.3 重新部署
```bash
# 使用相同代码重新部署
npx vercel redeploy out-rnmyyx8ty-slepybears-projects.vercel.app
```

#### 8.4 本地预览
```bash
# 启动开发服务器
npm run dev

# 或者使用 Vercel CLI 预览
npx vercel dev
```

---

### 九、性能优化建议

#### 9.1 当前性能指标
- **首页加载**: 88.9 kB (First Load JS)
- **候选人页**: 155 kB (包含 Monaco Editor，较大但合理)
- **面试官页**: 107 kB
- **部署速度**: 9 秒（优秀）

#### 9.2 进一步优化方向
1. **Monaco Editor 懒加载**：候选人页可延迟加载编辑器，减少首屏 JS
2. **图片优化**：如果后续添加图片资源，可使用 Vercel Image Optimization
3. **CDN 缓存**：Vercel 自动缓存静态资源，利用 Edge Network 加速全球访问
4. **代码分割**：Next.js 已自动做 Code Splitting，无需额外配置

---

### 十、注意事项

1. **Token 安全**：
   - ⚠️ 本次使用的 Token 已暴露在命令历史中，建议后续轮换
   - 生产环境应使用环境变量存储：`VERCEL_TOKEN=xxx vercel deploy ...`

2. **`.vercel/` 目录**：
   - 已自动加入 `.gitignore`，不会提交到 Git
   - 包含项目 ID 和组织信息，删除后需重新关联

3. **`.env.local` 文件**：
   - 同样在 `.gitignore` 中，不会被提交
   - 包含 Vercel 环境变量，用于本地开发

4. **静态导出限制**：
   - 不能使用 API Routes（不需要服务器功能）
   - 不能使用 `getServerSideProps`（只能用 SSG/SSR 替代方案）
   - 图片必须设置 `unoptimized: true`（已在配置中处理）

5. **域名自定义**：
   - 当前使用 Vercel 提供的免费子域名
   - 后续可通过 Vercel Dashboard 绑定自定义域名（如 `vibecodecheck.dev`）

---

### 十一、故障排查指南

| 错误现象 | 可能原因 | 解决方案 |
|---------|---------|---------|
| `Type error: Expected N arguments` | TypeScript 接口定义不匹配 | 检查并修正类型签名 |
| `EPIPE / socket hang up` | 网络瞬断 | 重试相同命令 |
| `404 Not Found` | 路由配置问题 | 检查 `out/` 目录结构是否正确 |
| `Deploy failed` | 构建产物过大或格式错误 | 运行 `npm run build` 重新构建 |
| 权限错误 | Token 过期或权限不足 | 到 Vercel Dashboard 重新生成 Token |

---

## 附录：完整命令记录

```bash
# 1. 进入项目目录
cd /Users/Zhuanz/Documents/trae_projects/vibe

# 2. 安装依赖
npm install
# 输出: up to date, audited 427 packages in 1m

# 3. 第一次构建（失败）
npm run build
# 输出: Type error: Expected 2 arguments, but got 3.

# 4. 修复类型错误
# 编辑 store/fileSystemStore.ts 第 14 行

# 5. 第二次构建（成功）
npm run build
# 输出:
# ✓ Compiled successfully
# ✓ Linting and checking validity of types
# ✓ Generating static pages (6/6)

# 6. 部署到 Vercel
npx vercel@latest deploy out --prod --yes --token YOUR_VERCEL_TOKEN_HERE
# 输出:
# ✅ Production: https://out-rnmyyx8ty-slepybears-projects.vercel.app
# 🔗 Aliased: https://out-drab-phi.vercel.app
```

---

**文档版本**: v1.0
**最后更新**: 2025-04-05
**部署状态**: ✅ 成功上线
**访问地址**: https://out-drab-phi.vercel.app
