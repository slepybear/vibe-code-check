# 🇨🇳 国内云平台部署指南

## 🎯 为什么需要国内部署方案？

### 问题分析

**Vercel 在国内的现状：**
- ⚠️ 访问速度慢（DNS解析到海外节点）
- ⚠️ 偶尔无法访问（网络波动）
- ❌ 部分企业网络屏蔽
- ⚠️ CDN节点少，静态资源加载慢

**目标用户的痛点：**
- 国内面试官/候选人需要**快速稳定**的访问体验
- 企业用户可能要求**数据在国内**
- 政策合规性考虑（等保、数据出境）

---

## 🏗️ 推荐的国内部署方案

### 方案对比

| 云厂商 | 免费额度 | 静态托管 | Serverless | 数据库 | 价格 | 推荐度 |
|--------|---------|---------|-----------|--------|------|--------|
| **Vercel** | ✅ 100GB带宽 | ✅ 优秀 | ✅ 支持 | ❌ 无 | Free/$20/mo | ⭐⭐⭐⭐ 海外首选 |
| **Netlify** | ✅ 100GB带宽 | ✅ 优秀 | ✅ 支持 | ❌ 无 | Free/$19/mo | ⭐⭐⭐⭐ 备选 |
| **Cloudflare Pages** | ✅ 无限请求 | ✅ 极快 | ✅ Workers | ✅ KV | Free | ⭐⭐⭐⭐⭐ **性价比王** |
| **腾讯云 COS+CDN** | ✅ 50GB存储 | ✅ 静态网站 | ✅ SCF | ✅ MySQL | ¥0.1/GB | ⭐⭐⭐⭐⭐ 国内首选 |
| **阿里云 OSS+CDN** | ✅ 5GB存储 | ✅ OSS静态托管 | ✅ FC函数计算 | ✅ RDS | ¥0.12/GB | ⭐⭐⭐⭐⭐ 国内备选 |
| **GitHub Pages** | ✅ 1GB仓库 | ✅ 基础 | ❌ 不支持 | ❌ 无 | Free | ⭐⭐⭐ 简单场景 |

---

## 🚀 方案一：Cloudflare Pages（推荐！全球加速）

### 为什么选 Cloudflare？

✅ **优势：**
- 全球200+数据中心（包括国内香港、台湾节点）
- **无限请求数**（Free Plan）
- 自定义域名 + 免费 SSL
- Workers (Serverless) 可扩展后端
- KV/ D1/Durable Objects 数据库
- **国内访问速度优于 Vercel**

❌ **劣势：**
- 国内无备案域名可能被干扰
- 控制台界面英文为主

### 部署步骤

#### Step 1: 准备工作

```bash
# 1. 确保项目可以静态导出
# 检查 next.config.js 是否有 output: 'export'
cat next.config.js
# 应该看到: module.exports = { output: 'export', ... }

# 2. 本地构建测试
npm run build
# 成功后会生成 out/ 目录
```

#### Step 2: Cloudflare 账号设置

1. 注册 Cloudflare 账号：https://dash.cloudflare.com/sign-up
2. 添加你的域名（或使用 .pages.dev 子域名）
3. 进入 **Workers & Pages** → **Create application**

#### Step 3: 连接 GitHub 仓库

```
选择 "Connect to Git" 
→ 授权 GitHub 账号
→ 选择 vibe-code-check 仓库
→ 配置构建设置：
   Framework preset: Next.js
   Build command: npm run build
   Build output directory: out
   Root directory: (leave empty)
   
→ 点击 "Save and Deploy"
```

#### Step 4: 配置自定义域名（可选但推荐）

```
1. 在 Cloudflare Pages 项目设置中
2. 点击 "Custom domains"
3. 添加你的域名：vibecodecheck.yourdomain.com
4. 按提示修改 DNS 记录：
   • CNAME -> vibecodecheck.pages.dev
   或
   • A -> 192.0.2.1 (Cloudflare IP)

等待 SSL证书自动生成（通常5-10分钟）
```

#### Step 5: 性能优化配置

在项目根目录创建 `wrangler.toml`：

```toml
name = "vibe-code-check"
compatibility_date = "2024-01-01"

[site]
bucket = "./out"

[[redirects]]
from = "/old-path"
to = "/new-path"
status = 301

[[headers]]
for = "/*"
[headers.values]
X-Frame-Options = "DENY"
X-Content-Type-Options = "nosniff"
Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
for = "/*.html"
[headers.values]
Cache-Control = "public, max-age=0, must-revalidate"

# 启用 Cloudflare 优化
[build]
command = "npm run build"
```

#### Step 6: 测试验证

```bash
# 1. 访问分配的URL
https://vibe-code-check.pages.dev

# 2. 检查控制台是否有错误
# F12 → Console

# 3. 测试所有功能
• 首页加载 ✓
• 题目列表 ✓  
• 编辑器加载 ✓
• 导出功能 ✓
```

---

## 🔥 方案二：腾讯云 COS + CDN（国内企业级方案）

### 适用场景
- 目标用户主要在中国大陆
- 企业客户有合规要求
- 需要备案域名

### 架构图

```
┌─────────────┐     HTTPS      ┌─────────────┐     CDN       ┌─────────────┐
│  用户浏览器  │ ────────────▶ │  腾讯云CDN   │ ──────────▶ │  COS对象存储│
│             │               │  (边缘节点)  │             │  (源站)    │
└─────────────┘               └─────────────┘             └─────────────┘
                                     ↑                           ↑
                              自动缓存加速              存储静态文件
```

### 部署步骤

#### Step 1: 开通腾讯云服务

```bash
# 需要开通的服务：
1. 对象存储 (COS) - 存储静态文件
2. 内容分发网络 (CDN) - 加速访问
3. SSL证书 (可选) - HTTPS支持

# 费用预估（免费额度）:
COS: 50GB 免费 /月
CDN: 10GB 流量免费 /月
总计: 个人使用完全免费！
```

#### Step 2: 创建COS存储桶

1. 登录 [腾讯云控制台](https://console.cloud.tencent.com/cos)
2. 点击"创建存储桶"
3. 配置：
   - 名称：`vibe-code-check` （或自定义）
   - 所属地域：选择离你用户最近的区域（如 ap-shanghai）
   - 访问权限：公有读私有写
4. 创建完成

#### Step 3: 构建并上传

```bash
# 1. 构建项目
npm run build

# 2. 安装腾讯云 COS CLI工具
npm install -g coscmd

# 3. 配置密钥（从腾讯云控制台获取）
coscmd config -a <SecretId> -s <SecretKey> -b vibe-code-check-1234567890 -r ap-shanghai

# 4. 上传构建产物
coscmd upload -r out/ / --sync
# 这会将 out/ 目录下所有文件上传到 COS
```

或者使用 **COSBrowser 客户端**（GUI工具）直接拖拽上传。

#### Step 4: 配置CDN加速

1. 进入 [CDN控制台](https://console.cloud.tencent.com/cdn)
2. 点击"添加域名"
3. 配置：
   - 加速域名：`cdn.yourdomain.com` 或 `vibe-code-check.cdntest.com`
   - 加速类型：网页小文件
   - 源站类型：COS域名
   - 选择刚创建的COS存储桶
4. 点击确认创建

#### Step 5: 配置HTTPS（推荐）

```
方法A: 使用腾讯云免费SSL证书
1. 在CDN域名管理中点击"配置"
2. 选择"HTTPS配置"
3. 申请免费证书（自动审核，约10分钟）
4. 强制HTTPS跳转

方法B: 使用自有证书（如果有备案域名）
1. 上传证书和私钥
2. 配置HTTPS
```

#### Step 6: 绑定自定义域名（需要备案）

```bash
# 如果你有已备案的域名：

1. DNS解析配置：
   记录类型: CNAME
   主机记录: www (或 cdn/api 等)
   记录值: vibecode-check.cdntest.com.cdn.dnsv1.com

2. 等待DNS生效（通常5-30分钟）

3. 访问 https://www.yourdomain.com 测试
```

#### Step 7: CDN缓存策略优化

在CDN域名的高级配置中：

```
缓存过期时间规则：
• HTML文件: 不缓存（每次回源）
• JS/CSS文件: 30天
• 图片/SVG: 365天
• 字体文件: 365天

性能优化：
• 开启Gzip压缩
• 开启Brotli压缩
• 开启HTTP/2
• 开发智能压缩（图片WebP转换）
```

---

## 💡 方案三：GitHub Pages（最简单）

### 适合场景
- 快速原型展示
- 个人项目托管
- 不想配置复杂的服务

### 部署步骤

#### Step 1: 启用GitHub Pages

```bash
# 进入你的GitHub仓库
→ Settings (设置)
→ Pages (左侧菜单)
→ Source: Deploy from a branch
→ Branch: main / (root)
→ Folder: / (root) 或 /out
→ Save
```

#### Step 2: 更新构建脚本

在 `package.json` 中添加：

```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d out"
  }
}
```

安装依赖：
```bash
npm install --save-dev gh-pages
```

#### Step 3: 一键部署

```bash
npm run deploy
# 自动构建并推送到 gh-pages 分支

# 几分钟后即可通过 https://your-username.github.io/vibe-code-check 访问
```

**注意：** GitHub Pages在国内速度一般，适合作为备用方案。

---

## 📦 部署包准备（一键部署脚本）

我已经为你创建了完整的部署自动化脚本：<tool_call>Write<arg_key>content</arg_key><arg_value>#!/bin/bash

# ============================================================
# VibeCode Check - 一键部署脚本
# 支持: Vercel / Cloudflare Pages / 腾讯云 / GitHub Pages
# ============================================================

set -e  # 遇到错误立即退出

echo "🚀 VibeCode Check 部署工具"
echo "================================"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ============================================================
# Step 0: 环境检查
# ============================================================
echo -e "\n${BLUE}Step 0: 环境检查${NC}"

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ 错误: 未安装 Node.js (需要 v18+)${NC}"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ 错误: Node.js 版本过低 (当前: v$(node -v), 需要: v18+)${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js: $(node -v)${NC}"

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ 错误: 未安装 npm${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm: $(npm -v)${NC}"

# ============================================================
# Step 1: 安装依赖
# ============================================================
echo -e "\n${BLUE}Step 1: 安装依赖${NC}"

if [ ! -d "node_modules" ]; then
    npm install
    echo -e "${GREEN}✓ 依赖安装完成${NC}"
else
    echo -e "${YELLOW}⚠ node_modules 已存在，跳过安装${NC}"
    echo -e "   如需重新安装: rm -rf node_modules && npm install"
fi

# ============================================================
# Step 2: 构建
# ============================================================
echo -e "\n${BLUE}Step 2: 构建项目${NC}"

npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ 构建成功! 输出目录: out/${NC}"
else
    echo -e "${RED}❌ 构建失败!${NC}"
    exit 1
fi

# ============================================================
# Step 3: 选择部署平台
# ============================================================
echo -e "\n${BLUE}Step 3: 选择部署平台${NC}"
echo ""
echo "请选择部署目标:"
echo "  1) Vercel (推荐 - 海外用户)"
echo "  2) Cloudflare Pages (推荐 - 全球加速)"
echo "  3) 腾讯云 COS+CDN (国内企业)"
echo "  4) GitHub Pages (最简单)"
echo "  5) 仅构建 (不部署)"
echo ""
read -p "请输入选项 (1-5): " choice

case $choice in
    1)
        deploy_vercel
        ;;
    2)
        deploy_cloudflare
        ;;
    3)
        deploy_tencent
        ;;
    4)
        deploy_github_pages
        ;;
    5)
        echo -e "${GREEN}✓ 构建完成! out/ 目录已准备好${NC}"
        echo -e "   你可以手动将 out/ 目录上传到任何静态托管服务"
        ;;
    *)
        echo -e "${RED}❌ 无效选项${NC}"
        exit 1
        ;;
esac

# ============================================================
# 部署函数
# ============================================================

function deploy_vercel() {
    echo -e "\n${BLUE}部署到 Vercel...${NC}"
    
    if command -v vercel &> /dev/null; then
        vercel --prod
        echo -e "${GREEN}✓ 部署成功!${NC}"
        echo -e "   访问地址: 查看 Vercel 终端输出的 URL"
    else
        echo -e "${YELLOW}⚠ 未安装 Vercel CLI${NC}"
        echo -e "   安装命令: npm i -g vercel"
        echo -e "   或者手动部署:"
        echo -e "   1. 打开 https://vercel.com/new"
        echo -e "   2. 导入此Git仓库"
        echo -e "   3. 点击 Deploy"
    fi
}

function deploy_cloudflare() {
    echo -e "\n${BLUE}部署到 Cloudflare Pages...${NC}"
    
    if command -v wrangler &> /dev/null; then
        wrangler pages deploy out/ --project-name=vibe-code-check
        echo -e "${GREEN}✓ 部署成功!${NC}"
        echo -e "   访问地址: https://vibe-code-check.pages.dev"
    else
        echo -e "${YELLOW}⚠ 未安装 Wrangler CLI${NC}"
        echo -e "   安装命令: npm i -g wrangler"
        echo -e "   或者手动部署:"
        echo -e "   1. 登录 https://dash.cloudflare.com"
        echo -e "   2. 进入 Workers & Pages → Create application"
        echo -e "   3. Connect to Git → 选择此仓库"
        echo -e "   4. Build settings: Framework preset → Next.js"
        echo -e "   5. Build output: out"
        echo -e "   6. Click Deploy"
    fi
}

function deploy_tencent() {
    echo -e "\n${BLUE}部署到腾讯云 COS + CDN...${NC}"
    
    echo -e "${YELLOW}⚠ 腾讯云部署需要手动操作:${NC}"
    echo ""
    echo "步骤 1: 上传到 COS"
    echo "  • 登录 https://console.cloud.tencent.com/cos"
    echo "  • 创建存储桶 (如: vibe-code-check)"
    echo "  • 将 out/ 目录下的所有文件上传"
    echo ""
    echo "步骤 2: 配置 CDN"
    echo "  • 进入 https://console.cloud.tencent.com/cdn"
    echo "  • 添加加速域名"
    echo "  • 源站类型: COS域名"
    echo "  • 选择刚创建的存储桶"
    echo ""
    echo "步骤 3: (可选) 绑定自定义域名"
    echo "  • 需要已完成ICP备案的域名"
    echo "  • DNS解析 CNAME 到 CDN 域名"
    
    read -p "是否打开腾讯云控制台？(y/n): " open_console
    if [ "$open_console" = "y" ] || [ "$open_console" = "Y" ]; then
        open "https://console.cloud.tencent.com/cos"
    fi
}

function deploy_github_pages() {
    echo -e "\n${BLUE}部署到 GitHub Pages...${NC}"
    
    # 检查是否安装 gh-pages
    if ! npm list gh-pages &> /dev/null 2>&1; then
        echo -e "${YELLOW}正在安装 gh-pages...${NC}"
        npm install --save-dev gh-pages
    fi
    
    # 部署
    npx gh-pages -d out
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ 部署成功!${NC}"
        echo -e "   访问地址: https://$(git config remote.origin.url | sed 's/.*:\\/\\/' | sed 's/\\.git$//' | sed 's/github\\.com\\//')}.github.io/vibe-code-check"
        echo -e "   (首次部署需等待 1-2 分钟生效)"
    else
        echo -e "${RED}❌ 部署失败!${NC}"
        exit 1
    fi
}

# ============================================================
# 完成
# ============================================================

echo ""
echo "================================"
echo -e "${GREEN}🎉 完成!${NC}"
echo ""
echo "下一步操作:"
echo "  1. 访问部署后的URL进行测试"
echo "  2. 检查所有功能是否正常"
echo "  3. 将品牌素材放入 brand-assets/ 文件夹"
echo "  4. 准备社交媒体发布内容"
echo ""
echo "相关文档:"
echo "  • 品牌素材指南: brand-assets/README.md"
echo "  • 社交媒体帖子: brand-assets/social-media/"
echo "  • 投屏模式说明: docs/screen-share-mode.md"
echo ""
