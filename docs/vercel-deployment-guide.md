# ⚡ Vercel 部署配置指南

## 🎯 快速开始（3分钟部署）

### 前置条件

1. ✅ GitHub 仓库已创建并推送代码
2. ✅ Vercel 账号（免费注册：https://vercel.com/signup）
3. ✅ GitHub 仓库已授权给 Vercel

---

## 🔧 方法一：Vercel CLI 部署（推荐开发者）

### Step 1: 安装 Vercel CLI

```bash
# 使用 npm 安装
npm i -g vercel

# 或使用 yarn
yarn global add vercel

# 或使用 pnpm
pnpm add -g vercel
```

### Step 2: 登录 Vercel

```bash
vercel login
```

会弹出浏览器窗口，授权登录。

### Step 3: 部署项目

在项目根目录执行：

```bash
# 第一次部署（交互式）
vercel

# 后续部署（非交互式，使用生产环境）
vercel --prod
```

**首次部署时的选项选择：**
```
? Set up and deploy “~/projects/vibe”? [Y/n] → Y
? Which scope do you want to deploy to? → 选择你的账号/团队
? Link to existing project? [Y/n] → N (新项目)
? What’s your project's name? → vibe-code-check
? In which directory is your code located? → ./
? Want to modify these settings? [y/N] → N (使用默认)
```

### Step 4: 获取部署信息

部署成功后会显示：
```
✓  Deployed to production [查看URL]

Project:        vibe-code-check
Deployed URL:   https://vibe-code-check.vercel.app
```

**保存这些信息到本地环境变量（用于CI/CD）：**

```bash
# 获取 Project ID 和 Org ID
vercel ls vibe-code-check

# 输出示例:
#     vibe-code-check  prj_xxxxxxxxxxxxx  production   https://vibe-code-check.vercel.app
#                                        ↑ 这是 PROJECT_ID
```

---

## 🌐 方法二：Vercel 网页端部署（推荐非开发者）

### Step 1: 导入GitHub仓库

1. 打开 https://vercel.com/new
2. 点击 **"Import Git Repository"**
3. 选择你的 `vibe-code-check` 仓库
4. 点击 **"Import"**

### Step 2: 配置构建设置

**Project Settings:**
```
Framework Preset: Next.js
Root Directory: ./ (保持默认)
Build Command: npm run build (或留空自动检测)
Output Directory: out (重要！必须是out/)
Install Command: npm ci (或留空)
```

### Step 3: 添加环境变量（可选）

如果未来有环境变量：

```
Settings → Environment Variables
添加:
NEXT_PUBLIC_APP_URL=https://vibe-code-check.vercel.app
```

### Step 4: 部署

点击 **"Deploy"** 按钮，等待构建完成（通常1-2分钟）。

---

## 🔐 配置自动化部署（GitHub Actions）

### 获取必要的Token和ID

#### 1. Vercel Token

1. 登录 https://vercel.com/account/tokens
2. 点击 **Create**
3. 名称输入：`vibe-code-check-ci`
4. Scope 选择：**Full Account**
5. Expiration: **No Expiration** (或选择90天)
6. 点击 **Create Token**
7. **复制Token值**（只显示一次！）

#### 2. Organization ID (如果是团队项目)

如果你使用的是个人账号，Org ID 可以跳过。

团队项目：
1. 打开 https://vercel.com/dashboard
2. 在顶部导航切换到正确的Team
3. URL中的ID就是Org ID：
   ```
   https://vercel.com/teams/<TEAM_NAME>/...
                                    ^^^^^^^^^^
                                    这就是 ORG_ID
   ```

#### 3. Project ID

部署后运行：
```bash
vercel link --yes
# 会显示: Linked to <project-id>
```

或者在Vercel Dashboard中：
1. 进入项目 Settings
2. General → Project ID

### 配置 GitHub Secrets

进入你的GitHub仓库：

```
Settings → Secrets and variables → Actions → New repository secret
```

添加以下Secrets：

| Secret Name | Value | 说明 |
|-------------|-------|------|
| `VERCEL_TOKEN` | 你的Vercel Token | 从步骤1获取 |
| `VERCEL_ORG_ID` | 你的Org ID | 个人账号可留空 |
| `VERCEL_PROJECT_ID` | 你的Project ID | 从步骤3获取 |

**示例：**
```
Name: VERCEL_TOKEN
Value: vcb_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
🔒 Secret (隐藏)

Name: VERCEL_PROJECT_ID  
Value: prj_xxxxxxxxxxxxx
🔒 Secret (隐藏)
```

### 测试CI/CD

推送代码到main分支后：
- 自动触发CI检查（Lint + Type Check + Build）
- 构建成功后自动部署到Vercel
- 你会收到邮件通知

---

## 🌍 自定义域名配置（可选但推荐）

### 步骤：

1. **Vercel Dashboard:**
   - 进入项目 Settings → Domains
   - 添加域名：`www.yourdomain.com` 或 `vibecodecheck.yourdomain.com`

2. **DNS 配置（在你的域名服务商）：**

**方式A: CNAME记录（推荐）**
```
Type: CNAME
Name: www (或 @, 或其他子域名)
Value: cname.vercel-dns.com
TTL: 3600 (或默认)
```

**方式A: A记录（如果CNAME不支持）**
```
Type: A
Name: www (或 @)
Value: 76.76.21.21 (Vercel的IP之一)
TTL: 3600
```

3. **等待生效：** 通常5-30分钟（取决于DNS TTL）

4. **HTTPS证书：** Vercel会自动为你的域名申请Let's Encrypt免费SSL证书

5. **强制HTTPS：** 在Domains设置中开启 "Force HTTPS"

---

## ⚙️ 高级配置

### Performance (性能优化)

在 `vercel.json` 中添加：

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": "out",
  "installCommand": "npm ci",
  "devCommand": "npm run dev",
  "regions": ["hnd1"], // 部署到香港节点（国内访问更快）
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options", 
          "value": "nosniff"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Analytics (分析)

在Dashboard中启用：
- **Web Analytics**: 访问量、页面浏览、地理位置
- **Speed Insights**: Core Web Vitals 监控
- **Error Logging**: 自动捕获前端错误

---

## 🔄 部署工作流推荐

### 开发阶段（日常开发）

```bash
# 本地开发
npm run dev

# 预览部署（生成临时URL供测试）
vercel

# 团队成员预览
vercel --team <team-slug>
```

### 发布阶段（合并到main时）

```bash
# 手动生产部署
git checkout main
git pull origin main
npm run build
vercel --prod

# 或通过GitHub Actions自动部署（已配置好）
git push origin main
# → 触发 CI → Build → Auto Deploy
```

### 回滚版本（如果出问题）

```bash
# 方式A: Vercel Dashboard回滚
1. 进入项目 Deployments
2. 找到之前的稳定版本
3. 点击 "..." → "Promote to Production"

# 方式B: Git回滚
git revert HEAD~1
git push origin main
# → 自动重新部署上一个版本
```

---

## 🆘 常见问题排查

### Q: 部署后页面404？

**A:** 检查以下几点：
1. `next.config.js` 是否有 `output: 'export'`
2. 构建命令是否生成了 `out/` 目录
3. Vercel的Output Directory是否设置为 `out`

### Q: 国内访问慢？

**A:** 优化方案：
1. 在Vercel.json中设置 `"regions": ["hnd1"]` (香港节点)
2. 使用Cloudflare CDN做前端代理
3. 或改用腾讯云/阿里云部署（见国内部署指南）

### Q: 如何查看部署日志？

**A:** 
- Vercel Dashboard → 项目 → Deployments → 点击某次部署 → Functions 标签
- 或使用CLI: `vercel logs <deployment-url>`

### Q: 环境变量不生效？

**A:**
- 确保变量名以 `NEXT_PUBLIC_` 开头（客户端可访问）
- 重新部署后环境变量才会生效
- 检查是否有拼写错误

---

## 📊 监控和维护

### 定期检查清单（每月一次）：

- [ ] Vercel Usage: 流量和带宽是否接近免费额度
- [ ] Dependencies: `npm outdated` 检查过期的依赖
- [ ] Security: `npm audit` 检查安全漏洞
- [ ] Performance: Lighthouse分数是否下降
- [ ] Errors: Dashboard中Error日志数量

---

## 💰 成本预估

**Vercel Free Plan 限制：**
- ✅ 100GB 带宽/月
- ✅ 无限构建次数
- ✅ 无限团队成员
- ✅ 自定义域名
- ❌ 无Serverless Functions (需要Pro)

**对于VibeCode Check（纯静态站点）：**
- 单次访问约消耗 0.5-2MB流量
- Free Plan支持 **50,000-200,000次访问/月**
- 对于个人开源项目完全够用！

**如果超限：**
- Hobby Plan: $20/月 (100GB带宽)
- Pro Plan: $100/月 (1000GB带宽 + Serverless)

---

## 🎉 完成！

现在你的项目已经可以通过以下地址访问：

**Production URL:** https://vibe-code-check.vercel.app （或你自定义的域名）

**下一步：**
1. ✅ 访问测试所有功能
2. ✅ 分享给你的朋友/同事体验
3. ✅ 准备品牌素材和社交媒体发布内容
4. ✅ 在GitHub README中更新部署链接

**有问题？** 查看 Vercel Docs: https://vercel.com/docs 或提交Issue给我们！
