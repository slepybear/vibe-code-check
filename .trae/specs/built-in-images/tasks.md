# 内置图片资源功能 - 实现计划

## [ ] Task 1: 扩展TypeScript类型定义
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 在types/index.ts中扩展Problem接口，添加images字段
  - 定义BuiltInImage接口，包含path、content、description
  - 确保类型安全
- **Acceptance Criteria Addressed**: [AC-1]
- **Test Requirements**:
  - `programmatic` TR-1.1: TypeScript编译无错误
  - `programmatic` TR-1.2: 类型定义完整，包含所有必需字段
- **Notes**: 保持向后兼容，images字段设为可选

## [ ] Task 2: 为初级题目生成内置图片
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 为电商商品搜索题目生成商品图片（耳机、手表、充电宝、键盘、鼠标）
  - 为待办事项题目生成装饰图标
  - 为简单计算器题目生成UI元素图片
  - 所有图片使用文本转图片API生成
  - 图片保存为Base64编码
- **Acceptance Criteria Addressed**: [AC-2]
- **Test Requirements**:
  - `human-judgement` TR-2.1: 每道题包含3-5张相关图片
  - `human-judgement` TR-2.2: 图片质量高，适合演示
  - `human-judgement` TR-2.3: 图片与题目场景匹配

## [ ] Task 3: 为中级题目生成内置图片
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 为用户数据表格题目生成用户头像（5-10个不同头像）
  - 为表单验证题目生成图标和装饰
  - 为天气应用题目生成天气图标（晴天、多云、下雨、下雪等）
  - 所有图片使用文本转图片API生成
  - 图片保存为Base64编码
- **Acceptance Criteria Addressed**: [AC-3]
- **Test Requirements**:
  - `human-judgement` TR-3.1: 每道题包含3-5张相关图片
  - `human-judgement` TR-3.2: 天气图标风格统一
  - `human-judgement` TR-3.3: 用户头像多样化

## [ ] Task 4: 为高级题目生成内置图片
- **Priority**: P1
- **Depends On**: Task 1
- **Description**: 
  - 为购物车题目生成商品图片
  - 为状态管理库题目生成架构示意图
  - 所有图片使用文本转图片API生成
  - 图片保存为Base64编码
- **Acceptance Criteria Addressed**: [AC-4]
- **Test Requirements**:
  - `human-judgement` TR-4.1: 每道题包含3-5张相关图片
  - `human-judgement` TR-4.2: 架构示意图清晰易懂

## [ ] Task 5: 修改文件系统初始化逻辑
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 修改store/fileSystemStore.ts中的initializeFromProblem函数
  - 将题目内置的图片资源添加到文件系统
  - 图片文件放在assets/或images/目录下
  - 确保图片文件的language设为'image'
- **Acceptance Criteria Addressed**: [AC-1, AC-5]
- **Test Requirements**:
  - `programmatic` TR-5.1: 图片文件正确添加到文件系统
  - `programmatic` TR-5.2: 图片路径正确（assets/*.png等）
  - `human-judgement` TR-5.3: 文件树中可以看到图片文件

## [ ] Task 6: 测试预览功能
- **Priority**: P0
- **Depends On**: Task 2, Task 3, Task 5
- **Description**: 
  - 测试图片在预览中是否正确显示
  - 测试相对路径引用是否正常工作
  - 测试不同格式的图片（PNG、JPG、SVG）
  - 确保无404错误
- **Acceptance Criteria Addressed**: [AC-6, AC-7]
- **Test Requirements**:
  - `human-judgement` TR-6.1: 图片在预览中正确显示
  - `programmatic` TR-6.2: 无404错误
  - `human-judgement` TR-6.3: 相对路径引用正常工作

## [ ] Task 7: 更新题目模板
- **Priority**: P1
- **Depends On**: Task 2, Task 3, Task 4
- **Description**: 
  - 更新题目模板中的示例代码，演示如何使用内置图片
  - 在HTML模板中添加图片引用示例
  - 提供注释说明图片路径
- **Acceptance Criteria Addressed**: [AC-7]
- **Test Requirements**:
  - `human-judgement` TR-7.1: 模板中包含图片使用示例
  - `human-judgement` TR-7.2: 示例代码清晰易懂
