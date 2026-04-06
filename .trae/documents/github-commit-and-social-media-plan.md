# GitHub 提交 + 社交媒体运营计划

## 📋 任务概览

| 任务 | 优先级 | 预计时间 | 状态 |
|------|--------|---------|------|
| **Part 1: GitHub 代码提交** | P0 - 紧急 | 15 分钟 | 待执行 |
| **Part 2: 社交媒体自动化方案调研与实施** | P1 - 重要 | 30-60 分钟 | 待执行 |
| **Part 3: 多平台发布执行** | P2 - 增值 | 持续进行 | 待执行 |

---

## Part 1: GitHub 代码提交（紧急）

### 🔴 当前问题

Git 处于 **rebase 中断状态**，需要先处理才能正常提交。

### 执行步骤

#### Step 1: 清理 Git 状态（必须先做）

```bash
# 方案 A：放弃 rebase，回到干净状态（推荐）
git rebase --abort

# 或者方案 B：继续完成 rebase（如果有未完成的操作）
git rebase --continue
```

**建议使用方案 A**，因为之前的 rebase 是为了移除敏感 Token，现在已经通过 orphan 分支重新提交了。

#### Step 2: 查看当前修改状态

```bash
git status
```

**预期看到的文件：**
- `modified: app/candidate/page.tsx` （Bug 修复 + UI 重构）
- `modified: app/interviewer/page.tsx` （环境检测增强）
- `modified: vercel.json` （正确的 cleanUrls 配置）
- `untracked: .trae/documents/bug-fix-and-test-plan.md` （修复计划）
- `untracked: docs/test-report-bug-fix.md` （测试报告）

#### Step 3: 创建 v1.0.1 版本提交

```bash
git add -A
git commit -m "🐛 v1.0.1 - Bug 修复：解决候选人页面 404 问题并优化用户体验

关键修复：
🔧 修复线上 404 Bug (vercel.json cleanUrls 配置)
🎨 重构候选人表单 UI（全屏弹窗 → 顶部提示条）
⚡ 优化 useSearchParams() SSR/CSR 一致性
💬 增强错误提示友好度（分级错误页面）
🌐 添加本地开发环境智能检测

技术改进：
✅ 删除错误的 SPA rewrites 规则
✅ 使用 Next.js 标准的 cleanUrls 配置
✅ useEffect 响应式处理 URL 参数
✅ 非 UX 阻挡式候选人信息收集

影响范围：
- /candidate?problemId=xxx 路由现在返回 200 OK（之前 404）
- 候选人直接看到编码界面（不再被表单遮挡）
- 错误页面提供清晰的排查指引

测试结果：
✅ 本地测试：14/14 用例通过
✅ 生产部署：所有路由 HTTP 200 OK
✅ 测试报告：docs/test-report-bug-fix.md

🚀 已部署到 Vercel：https://out-drab-phi.vercel.app"
```

#### Step 4: 推送到 GitHub

```bash
git push origin main
```

**预期结果：**
- ✅ 所有代码成功推送到 https://github.com/slepybear/vibe-code-check
- ✅ GitHub 仓库显示 v1.0.1 的 commit 记录
- ✅ 文件列表包含最新的修改

---

## Part 2: 社交媒体运营方案

### 📊 可用的社交媒体平台分析

| 平台 | 目标受众 | 自动化难度 | 优先级 | 工具/API 可用性 |
|------|---------|-----------|--------|----------------|
| **Twitter/X** | 全球开发者 | ⭐ 低（有官方 API） | **P0 - 最高** | ✅ 免费层级可用 |
| **小红书** | 中国设计师/产品经理 | ⭐⭐ 中等 | **P1 - 高** | ⚠️ 需申请或用第三方工具 |
| **V2EX** | 中国开发者社区 | ⭐ 低 | **P1 - 高** | ✅ 手动发布即可 |
| **掘金 (Juejin)** | 中国前端开发者 | ⭐ 低 | **P2 - 中** | ✅ 手动发布 |
| **GitHub Discussions** | 开源项目用户 | ⭐ 低 | **P1 - 高** | ✅ 直接在仓库发布 |
| **LinkedIn** | 职场/招聘人群 | ⭐⭐ 中等 | **P2 - 中** | ⚠️ 需手动或 API |

---

### 🐦 方案一：Twitter/X 自动发布（推荐立即实施）

#### 为什么选择 Twitter？

1. **全球开发者聚集地** - #BuildInPublic、#opensource 标签活跃度高
2. **免费 API 层级** - 每天 17 条推文足够日常运营
3. **已有完善的内容模板** - brand-assets 文件夹中有中英文版本
4. **病毒式传播潜力** - 技术圈转发率高

#### 技术实现方案

##### Option A: 使用 Twitter API v2 + Node.js 脚本（完全自动）

**前置条件（需要用户提供）：**

1. **Twitter Developer Account**（免费）
   - 申请地址：https://developer.twitter.com/en/portal/dashboard
   - 选择 Free 层级（免费）

2. **创建 App 并获取 Keys**
   - 在 Developer Portal 创建一个 App
   - 获取以下 4 个凭证：
     ```
     TWITTER_CONSUMER_KEY (API Key)
     TWITTER_CONSUMER_SECRET (API Secret)
     TWITTER_ACCESS_TOKEN
     TWITTER_ACCESS_TOKEN_SECRET
     ```

3. **设置 App 权限**
   - 确保 App 有 Read and Write 权限
   - 在 User Authentication Settings 中开启 OAuth 2.0

**实施代码：**

创建 `scripts/publish-twitter.js`:

```javascript
const { TwitterApi } = require('twitter-api-v2');

// 从环境变量读取凭证
const client = new TwitterApi({
  appKey: process.env.TWITTER_CONSUMER_KEY,
  appSecret: process.env.TWITTER_CONSUMER_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

async function postTweet(text, options = {}) {
  try {
    const tweet = await client.v2.tweet(text, {
      ...options,
    });
    
    console.log(`✅ Tweet 发布成功！`);
    console.log(`🔗 链接: https://twitter.com/user/status/${tweet.data.id}`);
    return tweet;
  } catch (error) {
    console.error('❌ 发布失败:', error.message);
    throw error;
  }
}

// 主函数：读取内容模板并发布
async function main() {
  const content = `
🎉 开源发布！VibeCode Check - 全球首个专为AI原生Vibe Coding时代打造的面试评估工具！

✨ 核心特性：
• 零成本 - 纯静态应用，无需服务器
• 15+道真实业务场景编程题（React/API/算法）
• 内置计时器 ⏱️ + 实时预览 + 一键导出
• ChatGPT级别暗色主题UI
• 隐私优先 - 所有数据本地处理 🔒

🔗 在线体验：https://out-drab-phi.vercel.app
📦 GitHub开源：https://github.com/slepybear/vibe-code-check

#VibeCoding #前端面试 #开源项目 #BuildInPublic #开发者工具
`.trim();

  await postTweet(content);
  
  console.log('\n🎉 发布完成！');
}

main().catch(console.error);
```

**运行命令：**
```bash
# 安装依赖
npm install twitter-api-v2 dotenv

# 设置环境变量
echo "TWITTER_CONSUMER_KEY=your_key" > .env.twitter
echo "TWITTER_CONSUMER_SECRET=your_secret" >> .env.twitter
echo "TWITTER_ACCESS_TOKEN=your_token" > .env.twitter
echo "TWITTER_ACCESS_TOKEN_SECRET=your_token_secret" >> .env.twitter

# 发布推文
node scripts/publish-twitter.js
```

##### Option B: 使用 n8n 或 Zapier 无代码平台（半自动）

如果不想写代码，可以使用：

1. **Zapier**（免费额度够用）
   - 连接 GitHub + Twitter
   - 当新 Release 时自动发推
   
2. **n8n**（开源自动化工具）
   - 自托管工作流
   - 定时发推、监控互动

**推荐：先用 Option A（Node.js 脚本）快速验证，后续再考虑自动化流程。**

---

### 📕 方案二：小红书发布（中国市场重点）

#### 挑战与机会

**挑战：**
- 小红书官方 API 需要企业资质申请
- 个人账号难以获得正式 API 权限
- 平台对自动化行为检测严格

**解决方案：**

##### 方案 2A: 手动发布（最安全，推荐初期使用）

**步骤：**
1. 打开 [brand-assets/social-media/xiaohongshu/xiaohongshu-note.md](brand-assets/social-media/xiaohongshu/xiaohongshu-note.md)
2. 按照模板准备图文内容
3. 在小红书 APP 或网页端手动发布

**优势：**
- ✅ 100% 安全，不会被封号
- ✅ 可以实时调整内容和图片
- ✅ 能及时回复评论互动

**劣势：**
- ❌ 无法批量自动化
- ❌ 耗时较长

##### 方案 2B: 使用第三方工具（需评估风险）

**可选工具：**

1. **iFlow CLI**（基于官方 API）
   - 需要申请小红书开放平台权限
   - 合法合规但门槛较高
   - 参考：https://www.jzl.com/news/345

2. **xiaohongshu-mcp**（MCP 协议工具）
   - GitHub 开源项目
   - 支持多账号管理
   - 参考：https://modelscope.cn/mcp/servers/Alobak/automation-xhs

3. **RPA 脚本**（模拟人工操作）
   - 使用 Puppeteer/Selenium
   - 风险较高，可能违反 ToS
   - 不推荐长期使用

**我的建议：**
> 初期采用**手动发布**（方案 2A），同时申请小红书开放平台权限。获得权限后迁移到 iFlow CLI（方案 2B）实现自动化。

---

### 💬 方案三：其他平台发布策略

#### 3.1 V2EX 发布（中国开发者社区）

**为什么重要：**
- 中国高质量技术社区
- 开源项目分享板块活跃
- 容易获得早期用户反馈

**发布位置：**
- 板块：`分享创造` 或 `酷工作`
- 格式：Markdown 富文本

**内容模板（已准备好）：**

参考 brand-assets 中的素材，调整语气适合 V2EX 技术风格（更简洁、更技术化）

**发布时机：**
- 工作日上午 10-11 点（流量高峰）
- 避免周末（技术讨论较少）

#### 3.2 掘金 (Juejin) 发布（前端专区）

**目标板块：**
- `前端` - 主要目标
- `开源项目` - 次要目标
- `工具推荐` - 可选

**特点：**
- 支持 Markdown
- 可以添加代码示例
- 有"沸点"功能可短内容更新

#### 3.3 GitHub 仓库自身运营

**Actions：**
- [ ] 创建 GitHub Discussion（欢迎帖 + FAQ）
- [ ] 添加 Wiki 文档（快速开始指南）
- [ ] 配置 GitHub Stars History 徽章
- [ ] 设置 Issue 模板（已完成 ✅）
- [ ] 配置 PR 模板（已完成 ✅）

**Release Note：**
创建 v1.0.1 Release，包含：
- 修复的 Bug 清单
- 新增功能说明
- 升级指导
- 截图/GIF Demo

---

## Part 3: 完整执行计划

### 📅 时间线（建议）

#### Day 0: 今天（立即执行）

**上午（30 分钟）：**
- [x] Part 1: GitHub 代码提交
  - [ ] 清理 Git rebase 状态
  - [ ] 提交 v1.0.1 Bug 修复版本
  - [ ] 推送到 GitHub main 分支

**下午（60 分钟）：**
- [ ] Part 2: Twitter 设置
  - [ ] 注册/登录 Twitter Developer Portal
  - [ ] 创建 App 并获取 API Keys
  - [ ] 安装依赖并测试发布脚本
  - [ ] 发布第一条推文（中文版）

**晚上（30 分钟）：**
- [ ] Part 3: 其他平台
  - [ ] 在 V2EX 发布项目介绍帖
  - [ ] 更新 GitHub README.md（添加实际链接）
  - [ ] 创建 v1.0.1 GitHub Release

---

#### Day 1: 后续跟进

**上午：**
- [ ] 回复 Twitter 上的评论和互动
- [ ] 在掘金发布文章版介绍
- [ ] 准备小红书图文内容

**下午：**
- [ ] 手动发布小红书笔记
- [ ] 在相关 Discord/Slack 社区分享
- [ ] 监控 GitHub Star 增长情况

**晚上：**
- [ ] 整理第一天数据（Star 数、互动率）
- [ ] 调整第二天的发布策略

---

#### Day 2-7: 持续运营

**每 2-3 天一次 Twitter 更新：**
- Day 2: 功能深度解析（Timer 组件设计思路）
- Day 3: 用户故事/使用场景分享
- Day 4: 技术架构详解（Next.js + Monaco Editor）
- Day 5: 数据成果展示（"首周 X 个 Star！"）
- Day 7: 社区反馈汇总 + Roadmap 公布

**每周一次长内容：**
- 掘金/V2EX 技术博客
- YouTube/B站 Demo 视频（如果愿意出镜）

---

## 🛠️ 技术实施细节

### 项目结构（新增文件）

```
vibe-code-check/
├── scripts/
│   ├── publish-twitter.js      # Twitter 自动发布脚本
│   └── publish-all.js          # 多平台统一发布入口（未来）
├── .env.twitter                # Twitter API 凭证（不提交到 Git）
├── .env.example                # 环境变量示例
└── brand-assets/
    ├── social-media/
    │   ├── twitter/
    │   │   ├── launch-post-cn.md  # 中文推文模板 ✅ 已有
    │   │   └── launch-post-en.md  # 英文推文模板 ✅ 已有
    │   └── xiaohongshu/
    │       └── xiaohongshu-note.md  # 小红书笔记模板 ✅ 已有
    └── README.md               # 品牌资源使用指南 ✅ 已有
```

### 依赖安装

```json
{
  "devDependencies": {
    "twitter-api-v2": "^1.15.0",
    "dotenv": "^16.4.5"
  }
}
```

**注意：** 这些依赖仅用于发布脚本，不影响生产构建大小。

---

## 📈 成功指标（KPIs）

### 短期目标（第 1 周）

| 指标 | 目标值 | 追踪方式 |
|------|--------|---------|
| GitHub Stars | ⭐ 50+ | GitHub API |
| Twitter Impressions | 👁️ 5,000+ | Twitter Analytics |
| Twitter Engagements | 💬 100+ (点赞/转发/回复) | Twitter Analytics |
| V2EX Views | 👀 500+ | V2EX 后台 |
| 小红书收藏 | ❤️ 50+ | 小红书创作者中心 |

### 中期目标（第 1 月）

| 指标 | 目标值 |
|------|--------|
| GitHub Stars | ⭐ 200+ |
| 独立访客 (UV) | 1,000+ |
| 候选人使用次数 | 50+ 次 |
| GitHub Issues (反馈) | 10+ 个 |
| Fork 数 | 20+ |

### 长期目标（第 3 月）

| 指标 | 目标值 |
|------|--------|
| GitHub Stars | ⭐ 1,000+ |
| 月活用户 (MAU) | 500+ |
| 企业试用咨询 | 10+ 家 |
| 社区贡献者 | 5+ 人 |

---

## ⚠️ 注意事项与风险

### Twitter API 限制

| Free Tier 限制 | 数值 | 应对策略 |
|----------------|------|---------|
| 每日发推数 | **17 条/天** | 足够日常运营（每天 1-3 条） |
| 每月发推数 | **500 条/月** | 批量发布时注意 |
| API 调用频率 | 有限制 | 使用缓存避免重复请求 |
| 媒体上传 | ✅ 支持 | 可以上传截图/GIF |

**重要：** 不要滥用 API，否则可能被封禁！

### 内容规范

**Twitter：**
- ✅ 使用真实的项目截图/Demo GIF
- ✅ 添加相关的 Hashtag（最多 2-3 个）
- ✅ 回复评论时保持专业和友善
- ❌ 不要刷屏或垃圾信息
- ❌ 不要过度使用 Emoji（适度即可）

**小红书：**
- ✅ 封面图要精美（第一印象很重要）
- ✅ 标题要有吸引力（但不标题党）
- ✅ 内容要真实有用
- ❌ 不要涉及政治敏感话题
- ❌ 不要夸大宣传

**通用原则：**
- **真诚分享** - 讲述真实的开发过程和动机
- **提供价值** - 让读者学到东西或得到启发
- **保持一致** - 固定频率更新，建立期待感
- **积极互动** - 回复每一条评论和私信

---

## 🎯 下一步行动清单（按顺序执行）

### ✅ 立即执行（今天内完成）

1. **[ ] 清理 Git 状态并提交代码**
   ```bash
   git rebase --abort
   git add -A
   git commit -m "🐛 v1.0.1 - Bug 修复..."
   git push origin main
   ```

2. **[ ] 准备 Twitter API 凭证**
   - 访问 https://developer.twitter.com
   - 登录并创建 App
   - 获取 4 个 Key/Token
   - 发给我保存到 `.env.twitter`（不会提交到 Git）

3. **[ ] 发布第一条 Twitter 推文**
   - 我会帮你运行发布脚本
   - 使用 `launch-post-cn.md` 中的方案 A 内容

4. **[ ] 在 V2EX 发布项目介绍**
   - 我会帮你整理适合 V2EX 风格的内容
   - 你复制粘贴到 V2EX 发布

5. **[ ] 创建 GitHub v1.0.1 Release**
   - 包含完整的 Changelog
   - 附上在线演示链接

### 📅 近期计划（本周内）

6. **[ ] 掘金文章发布**
7. **[ ] 小红书笔记发布（手动）**
8. **[ ] 设置 Twitter 自动回复规则**
9. **[ ] 监控并记录所有平台的数据**

### 🗓️ 长期规划（本月内）

10. **[ ] 录制 30 秒 Demo GIF/视频**
11. **[ ] 写一篇技术博客（掘金/V2EX）**
12. **[ ] 建立 Discord/微信群（用户交流）**
13. **[ ] 收集用户反馈并迭代产品**

---

## 💡 我的建议

### 优先级排序

**今天必做（P0）：**
1. ✅ **GitHub 提交** - 这是基础，其他都依赖于此
2. ✅ **Twitter 发布** - 全球曝光最快渠道
3. ✅ **V2EX 发布** - 国内高质量用户

**本周选做（P1）：**
4. 掘金文章
5. 小红书笔记
6. GitHub Release

**有空再做（P2）：**
7. LinkedIn 发布
8. YouTube/B站视频
9. 邮件列表建设

### 运营策略核心

> **"Build in Public"（公开构建）理念**

不要只是发布一个链接说"我做了一个东西"，而是：
- ✅ 分享你的**思考过程**
- ✅ 展示**遇到的问题和解决方案**
- ✅ 公开**数据和进展**
- ✅ 邀请社区**参与决策**

这种方式能：
- 吸引志同道合的开发者
- 获得真实且有价值的反馈
- 建立个人品牌和技术影响力
- 让项目自然增长（而不是强行推广）

---

## 📞 需要你提供的信息

为了顺利执行计划，我需要你提供：

### 必须项（用于 Twitter 自动发布）

1. **Twitter Developer Portal 凭证**（4 个值）：
   - `TWITTER_CONSUMER_KEY`
   - `TWITTER_CONSUMER_SECRET`
   - `TWITTER_ACCESS_TOKEN`
   - `TWITTER_ACCESS_TOKEN_SECRET`
   
   *获取方法：https://developer.twitter.com → 创建 App → Keys and Tokens*

### 可选项（用于更好的运营效果）

2. **项目截图/Demo GIF**
   - 如果有的话，我可以帮你生成发布用的配图
   - 至少需要：首页截图、候选人页截图、面试官页截图

3. **你的 Twitter/X 用户名**
   - 用于在帖子中 @你
   - 也方便我追踪发布后的表现

4. **偏好设置**
   - 先发中文还是英文？
   - 希望多频繁更新？（每天/隔天/每周）
   - 是否希望我帮你起草内容还是你自己写？

---

**准备好了吗？让我们开始吧！🚀**

请告诉我：
1. 是否同意这个计划？
2. 你是否已经有 Twitter Developer 账号？
3. 你希望我先执行哪一部分？（GitHub 提交？Twitter 设置？还是两者并行？）
