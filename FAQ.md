# 常见问题解答 (FAQ)

## 🚀 快速开始

### Q: VibeCode Check 是什么？
**A:** VibeCode Check 是一个专为AI原生Vibe Coding工程师设计的面试评估工具。它提供标准化的编程题目、实时代码编辑器和评估体系，帮助面试官快速、精准地评估候选人的实战能力。

### Q: 如何部署和使用？
**A:** 这是一个纯静态应用，无需后端服务器：
1. **本地运行**: `npm install && npm run dev`
2. **一键部署**: 点击 [Deploy with Vercel](https://vercel.com/new-clone?repository-url=https://github.com/your-username/vibe-code-check)
3. **静态导出**: `npm run build` 生成静态文件，可部署到任何静态托管服务

### Q: 需要注册账号吗？
**A:** 不需要！完全免费，开箱即用，无任何注册或登录要求。

---

## 📝 题目相关

### Q: 有多少道题目？难度如何分布？
**A:** 目前有 **15道题目**，分为3个级别：
- **初级 (Beginner)**: 5道 - 15-20分钟 - 适合1年以下经验
- **中级 (Intermediate)**: 5道 - 25-40分钟 - 适合1-3年经验
- **高级 (Advanced)**: 5道 - 35-60分钟 - 适合3年以上经验

### Q: 题目涵盖哪些技术栈？
**A:** 题目覆盖：
- **前端基础**: HTML/CSS/JavaScript DOM操作
- **React Hooks**: useState, useEffect, 自定义Hook
- **API调用**: async/await, fetch, 错误处理
- **算法数据结构**: 数组操作、树形结构、LRU缓存
- **架构设计**: 状态管理库、Context API

### Q: 可以自定义题目吗？
**A:** 目前版本支持通过修改 `data/problems.ts` 文件添加新题目。未来版本将支持可视化题目编辑器。

---

## 👨‍💻 候选人使用

### Q: 候选人需要安装什么吗？
**A:** 不需要任何安装！候选人只需：
1. 打开面试官提供的链接
2. 在浏览器中直接编写代码
3. 实时预览效果
4. 完成后导出代码包

### Q: 支持哪些代码语言？
**A:** 支持 HTML、CSS、JavaScript（ES6+），以及 JSX/TypeScript（在Monaco Editor中）。

### Q: 代码会保存到服务器吗？
**A:** **不会！** 所有代码都在浏览器本地处理，不会上传到任何服务器。保护隐私安全。

### Q: 计时器功能怎么用？
**A:** 进入答题页面后会自动显示计时器：
- 点击"开始"按钮启动倒计时
- 可随时暂停/继续
- 超时会弹出提醒（但仍可继续答题）
- 时间格式：MM:SS 或 HH:MM:SS

### Q: 导出的代码包包含什么？
**A:** ZIP压缩包包含：
- 所有编写的源代码文件
- `vibe-meta.json`: 元数据信息（候选人、题目、时间等）
- `report.html`: 精美的HTML面试报告

---

## 🔒 安全与隐私

### Q: 数据安全吗？
**A:** 非常安全！
- ✅ 纯前端应用，无后端服务器
- ✅ 所有数据处理在浏览器本地完成
- ✅ 无需登录，不收集个人信息
- ✅ 代码不上传，不存储到云端

### Q: 适合企业使用吗？
**A:** 适合！特别是对数据安全有高要求的：
- 金融行业
- 医疗健康
- 政府机构
- 任何重视隐私的企业

---

## 🎨 UI与体验

### Q: 为什么选择暗色主题？
**A:** 
1. **护眼**: 减少蓝光，长时间编码更舒适
2. **专业**: 符合开发者工具的主流设计趋势
3. **现代感**: ChatGPT级别的视觉体验
4. **省电**: OLED屏幕更省电

### Q: 支持移动端吗？
**A:** 基础支持移动端浏览，但**推荐使用桌面端**进行编码面试（屏幕更大，键盘更好用）。

### Q: 浏览器兼容性如何？
**A:** 推荐使用现代浏览器：
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ⚠️ Safari 14+ (部分功能可能受限)
- ❌ IE (不支持)

---

## 🔧 技术问题

### Q: Monaco Editor 加载失败怎么办？
**A:** 可能原因及解决方案：
1. **网络问题**: 检查网络连接，可能需要代理
2. **浏览器扩展冲突**: 暂时禁用广告拦截器等扩展
3. **清除缓存**: 清除浏览器缓存后重试

### Q: 预览功能不工作？
**A:** 检查以下几点：
1. 确保 `index.html` 存在
2. 检查HTML语法是否正确
3. 查看 Console是否有错误信息
4. 尝试点击"全屏预览"按钮

### Q: 导出功能失败？
**A:** 可能原因：
1. **浏览器限制**: 某些浏览器可能阻止自动下载
2. **文件过大**: 代码文件过多或过大时
3. **解决方案**: 手动复制代码或尝试其他浏览器

---

## 🤝 贡献与定制

### Q: 如何添加新题目？
**A:** 编辑 `data/problems.ts` 文件，按照现有格式添加新的题目对象。详见 [CONTRIBUTING.md](CONTRIBUTING.md)。

### Q: 如何修改UI样式？
**A:** 项目使用 Tailwind CSS，主要样式文件：
- `app/globals.css`: 全局样式
- 各页面组件中的 className
- `tailwind.config.ts`: Tailwind配置

### Q: 可以商用吗？
**A:** 可以！项目采用 MIT 开源协议，允许自由使用、修改和分发，包括商业用途。

---

## 📊 性能与优化

### Q: 应用加载速度慢？
**A:** 优化建议：
1. 使用 Chrome DevTools 分析性能瓶颈
2. 启用浏览器缓存
3. 使用 CDN 部署（如 Vercel 自动优化）

### Q: 内存占用高？
**A:** 正常现象！Monaco Editor 是完整的代码编辑器，内存占用约 50-100MB 属于正常范围。

---

## 🆘 故障排除

### 页面白屏无法加载
```bash
# 1. 清除依赖重新安装
rm -rf node_modules package-lock.json
npm install

# 2. 检查 Node.js 版本（需要 18+）
node --version

# 3. 查看控制台错误信息
```

### 样式显示异常
```bash
# 1. 重新构建 Tailwind CSS
npm run build

# 2. 清除浏览器缓存
# Ctrl+Shift+R (Windows/Linux)
# Cmd+Shift+R (Mac)
```

### 编译错误
```bash
# 运行类型检查
npx tsc --noEmit

# 运行 Lint
npm run lint
```

---

## 📞 获取帮助

- **GitHub Issues**: [提交问题](https://github.com/your-username/vibe-code-check/issues)
- ** Discussions**: [社区讨论](https://github.com/your-username/vibe-code-check/discussions)
- **Email**: team@vibecodecheck.dev

---

## 🎯 还没有找到答案？

欢迎在 GitHub 上提交 Issue 或 Discussion，我们会尽快回复！

**感谢您使用 VibeCode Check! 🎉**
