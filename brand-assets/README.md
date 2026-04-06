# 📸 VibeCode Check 品牌素材使用指南

## 📁 文件夹结构说明

```
brand-assets/
├── screenshots/          # 产品截图（需要你手动截取后放入）
│   ├── 01-homepage.png          # 首页欢迎页（ChatGPT风格Logo+卡片）
│   ├── 02-interviewer-list.png  # 面试官页面-题目列表Sidebar
│   ├── 03-interviewer-detail.png# 面试官页面-题目详情面板
│   ├── 04-candidate-editor.png  # 候选人页面-代码编辑器+计时器
│   ├── 05-candidate-preview.png # 候选人页面-实时预览区
│   └── 06-export-report.png    # 导出的HTML报告示例
│
├── logos/                 # Logo变体
│   ├── logo.svg                # 主Logo（渐变VC图标）✅ 已创建
│   ├── favicon.ico             # 浏览器标签页图标（32x32, 16x16）
│   ├── apple-touch-icon.png   # iOS书签图标（180x180）
│   ├── og-image.png            # 社交分享预览图（1200x630）
│   └── logo-white.svg          # 白色版本（用于深色背景）
│
├── social-media/          # 社交媒体帖子素材
│   ├── twitter/                  # Twitter/X 帖子
│   │   ├── launch-post-cn.md     # 中文发布帖
│   │   └── launch-post-en.md     # 英文发布帖
│   ├── weibo/                    # 微博帖子
│   │   └── weibo-post.md         # 微博文案
│   ├── xiaohongshu/              # 小红书笔记
│   │   └── xiaohongshu-note.md   # 小红书图文方案
│   ├── juejin/                   # 掘金文章
│   │   └── juejin-article.md     # 掘金技术文章
│   └── product-hunt/              # Product Hunt Launch
│       └── ph-launch.md           # PH发布素材
│
├── demos/                 # Demo/GIF素材
│   ├── README-demo-guide.md      # 截图/GIF制作指南
│   └── demo-script.txt            # 录制脚本（推荐步骤）
│
└── templates/             # 文档模板
    ├── github-readme-banner.md    # GitHub README头图文字
    ├── email-template.md          # 推广邮件模板
    └── press-kit.md               # 媒体资料包
```

---

## 📸 产品截图指南（重要！）

### 截图要求

**分辨率**: 1920x1080 (Full HD) 或 2560x1440 (2K)
**格式**: PNG (无损) 或 WebP (更小体积)
**浏览器**: Chrome/Edge (使用暗色主题)

### 必须截取的6张关键截图

#### 1️⃣ **01-homepage.png** - 首页欢迎页
```
内容展示:
✅ 渐变色 "VibeCode Check" Logo
✅ 副标题："AI原生Vibe Coding工程师专属面试评估工具"
✅ 两个功能卡片：
   • 👨‍💼 面试官入口 - 查看题库、生成面试链接、评估候选人
   • 👨‍💻 候选人入口 - 开始你的编程面试
✅ 底部版权信息

截图技巧:
• 清除浏览器地址栏和书签栏
• 使用浏览器开发者工具的设备模拟(Desktop)
• 确保页面完全加载
```

#### 2️⃣ **02-interviewer-list.png** - 面试官页面-列表视图
```
内容展示:
✅ 左侧深色侧边栏 (#202123):
   • 返回首页链接
   • 题目列表（至少显示5-6道题）
   • 难度Badge（初级青/中级紫/高级红）
   • 选中状态高亮
   
✅ 右侧主内容区 (#343541):
   • 空状态提示："从左侧选择一个题目查看详情"
   
截图技巧:
• 选择一道中级题目作为选中状态
• 展示难度标签的颜色差异
• 保持侧边栏宽度约260px
```

#### 3️⃣ **03-interviewer-detail.png** - 面试官页面-详情视图
```
内容展示:
✅ 选中某道题目后的完整详情面板
✅ 包含以下区块（至少3-4个）:
   • 📋 业务需求背景
   • 🎯 核心考察点（带绿色✓图标）
   • ⭐ 可选加分项（带黄色★图标）
   • 📝 标准化评估打分表（斑马纹表格）
   
✅ 底部的"生成面试链接"按钮
✅ 复制链接输入框

截图技巧:
• 选择一道有代表性的题目（如 intermediate-1 用户表格排序）
• 确保表格清晰可见
• 展示OpenAI绿色的主按钮
```

#### 4️⃣ **04-candidate-editor.png** - 候选人页面-编辑器
```
内容展示:
✅ 顶部工具栏:
   • ← 退出按钮
   • 候选人姓名标签（如已填写）
   • 难度Badge
   • 题目标题
   • ⏱️ 计时器组件（显示倒计时）
   • 🔄 重置 + 📦 导出按钮
   
✅ 左侧文件树:
   • index.html
   • style.css
   • script.js
   • assets/ (图片文件夹，可展开)

✅ 中间代码编辑器:
   • Monaco Editor界面
   • 显示一些示例代码
   • 行号、语法高亮

截图技巧:
• 在编辑器中写几行示例代码
• 让计时器显示一个合理的时间（如 25:30）
• 展示文件树展开状态
```

#### 5️⃣ **05-candidate-preview.png** - 候选人页面-预览区
```
内容展示:
✅ 右侧或底部的实时预览iframe
✅ 显示候选人编写的代码渲染效果
✅ 如果是电商搜索题，展示商品卡片UI
✅ 全屏切换按钮可见

截图技巧:
• 确保预览区域内容丰富美观
• 可以在代码中写一些好看的样式
• 展览响应式效果（如果有的话）
```

#### 6️⃣ **06-export-report.png** - 导出报告示例
```
内容展示:
✅ 导出的HTML报告在浏览器中打开的效果
✅ ChatGPT风格的暗色主题设计
✅ 包含:
   • 候选人信息卡片
   • 面试题目信息
   • 导出时间戳
   • 底部品牌信息和链接

制作方法:
1. 完成一次完整的答题流程
2. 点击导出按钮
3. 解压ZIP包
4. 用浏览器打开 report.html
5. 截图保存
```

### 🎨 截图美化建议

**使用浏览器扩展:**
- **GoFullPage** - 全页面长截图
- **Awesome Screenshot** - 注释和标注
- **Nimbus Capture** - 录屏+截图

**后期处理（可选）:**
```bash
# 使用 ImageMagick 批量处理
# 添加圆角阴影
convert screenshot.png \
  \( +clone -background black -shadow 20x20+10+10 \) \
  +swap -background white -layers merge +repage \
  output-with-shadow.png

# 调整尺寸（用于GitHub README）
convert input.png -resize 1200x800> output-resized.png
```

**在线工具:**
- Remove.bg - 去除背景（如果需要）
- TinyPNG - 无损压缩图片
- Canva - 添加标注和文字

---

## 🎬 Demo GIF 录制指南

### 推荐录制工具

| 工具 | 平台 | 特点 |
|------|------|------|
| **LICEcap** | Windows/Mac | 轻量级，GIF直接输出 |
| **ScreenToGif** | Windows | 功能强大，可编辑帧 |
| **GIPHY Capture** | Mac | macOS原生体验 |
| **CleanShot X** | Mac | 专业级录屏+GIF |

### 录制脚本（30秒核心流程）

```
场景: 从选择题目到导出结果的完整流程

[00:00-00:03] 打开首页 → 点击"👨‍💼 面试官入口"
[00:03-00:08] 进入面试官页面 → 点击左侧某道题目（如"用户数据表格排序"）
[00:08-00:12] 右侧显示详情 → 点击"生成面试链接" → 复制链接
[00:12-00:15] 切换到新标签页 → 粘贴链接打开候选人页面
[00:15-00:18] 弹出信息表单 → 输入姓名"测试用户" → 点击"开始答题"
[00:18-00:22] 进入编辑器 → 计时器开始倒计时 → 快速编写几行代码
[00:22-00:26] 点击"📦 导出"按钮 → ZIP文件下载
[00:26-00:30] 显示VibeCode Check Logo + 文字"The Future of AI Interviews"

录制参数设置:
• 帧率: 15 fps (平衡流畅度和文件大小)
• 尺寸: 1280x720 或 1920x1080
• 循环: 是 (无限循环播放)
• 优化: 启用 (减少文件大小)
• 目标大小: < 2MB (便于上传)
```

### GIF 后期处理

```bash
# 使用 gifsicle 优化 GIF 大小
gifsicle -O3 --lossy=30 --colors 64 input.gif -o output.gif

# 或使用在线工具:
# https://ezgif.com/optimize
# https://gifmaker.org/
```

---

## 🔗 社交媒体发布检查清单

### 发布前确认:

- [ ] 6张产品截图已截取并放入 `screenshots/` 文件夹
- [ ] Logo变体已生成（favicon.ico, apple-touch-icon.png, og-image.png）
- [ ] Demo GIF 已录制并压缩到 < 2MB
- [ ] 所有素材已推送到 GitHub 仓库
- [ ] GitHub README 已更新添加截图

### 各平台发布顺序:

1. **Twitter/X** (英文) - 技术社区首发
2. **即刻/V2EX** (中文) - 国内技术圈
3. **掘金** (中文) - 技术文章深度介绍
4. **小红书** (中文) - 视觉化种草
5. **Product Hunt** (英文) - 国际曝光
6. **Hacker News** (英文) - Show HN 帖子
7. **微博** (中文) - 广泛传播

---

## 💡 专业提示

### 截图最佳实践:

1. **一致性**: 所有截图使用相同的浏览器窗口尺寸
2. **干净背景**: 关闭所有无关的浏览器扩展和标签页
3. **真实数据**: 使用真实的题目内容和示例代码
4. **突出重点**: 用鼠标悬停或选中状态引导视线
5. **多语言**: 如果可能，准备中英文两个版本的截图

### 文件命名规范:

```
{序号}-{页面}-{描述}.{格式}

示例:
01-homepage-welcome-screen.png
02-interviewer-sidebar-list.png
03-interviewer-detail-panel.png
04-candidate-code-editor-timer.png
05-candidate-live-preview.png
06-export-html-report-dark-theme.png
```

---

**准备好开始了吗？按照这个指南，你将在1小时内拥有专业的品牌素材库！** 🚀
