### HTML 三层架构

HTML 的三层架构是一种经典的前端开发模式，它将网页的不同功能划分为三个独立的层次，使代码更易于维护、扩展和协作。以下是对这三层架构的详细解析：

### **一、结构层（Structure Layer）**

#### 1. **核心技术**

- **HTML（超文本标记语言）**：定义页面的基本结构和内容。

#### 2. **主要职责**

- 使用语义化标签（如 `<header>`、`<nav>`、`<main>`、`<article>`、`<section>`、`<footer>`）描述页面元素的含义。
- 创建页面的骨架，不涉及样式和交互。
- 提供内容的层次结构（如标题 `<h1>`-`<h6>`、列表 `<ul>`/`<ol>`）。

#### 3. **示例**

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <title>我的网站</title>
</head>
<body>
  <!-- 页面头部 -->
  <header>
    <h1>网站标题</h1>
    <nav>
      <ul>
        <li><a href="#">首页</a></li>
        <li><a href="#">关于</a></li>
      </ul>
    </nav>
  </header>

  <!-- 主要内容区 -->
  <main>
    <article>
      <h2>文章标题</h2>
      <p>文章内容...</p>
    </article>
  </main>

  <!-- 页面底部 -->
  <footer>
    <p>版权信息 © 2023</p>
  </footer>
</body>
</html>
```

### **二、表现层（Presentation Layer）**

#### 1. **核心技术**

- **CSS（层叠样式表）**：控制页面的视觉呈现。

#### 2. **主要职责**

- 设置元素的样式（如颜色、字体、大小、间距）。
- 实现布局（如浮动、Flexbox、Grid）。
- 添加动画和过渡效果。
- 适配不同屏幕尺寸（响应式设计）。

#### 3. **示例**

```css
/* 全局样式 */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

/* 导航栏样式 */
nav {
  background-color: #333;
  color: white;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
}

nav li {
  padding: 10px;
}

nav a {
  color: white;
  text-decoration: none;
}

/* 响应式设计 */
@media (max-width: 768px) {
  nav ul {
    flex-direction: column;
  }
}
```

### **三、行为层（Behavior Layer）**

#### 1. **核心技术**

- **JavaScript**：实现页面的交互逻辑。

#### 2. **主要职责**

- 处理用户输入（如点击、滚动、表单提交）。
- 动态修改 DOM 结构和样式。
- 与后端 API 通信（如 AJAX 请求）。
- 实现复杂的交互效果（如轮播图、模态框）。

#### 3. **示例**

```javascript
// 导航栏点击事件
document.querySelector('nav').addEventListener('click', function(event) {
  if (event.target.tagName === 'A') {
    event.preventDefault();
    // 页面跳转或加载内容
    console.log('导航到: ' + event.target.href);
  }
});

// 表单验证
const form = document.querySelector('form');
form.addEventListener('submit', function(event) {
  const input = form.querySelector('input');
  if (!input.value) {
    event.preventDefault();
    input.classList.add('error');
    alert('请输入内容');
  }
});

// 页面滚动时修改导航栏样式
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
```

### **四、三层之间的关系**

- **依赖顺序**：结构层 → 表现层 → 行为层。
  - 结构层是基础，表现层依赖结构层，行为层依赖结构层和表现层。
- **交互方式**：
  - CSS 通过选择器关联 HTML 元素。
  - JavaScript 通过 DOM API 操作 HTML 元素和 CSS 样式。
- **分离原则**：
  - 理想情况下，三层应保持独立，修改一层不影响其他层。
  - 例如：修改 CSS 样式不应影响 HTML 结构或 JavaScript 逻辑。

### **五、优势与最佳实践**

#### 1. **优势**

- **可维护性**：各层职责明确，修改代码时不会影响其他层。
- **可扩展性**：易于添加新功能（如添加新的 CSS 类或 JavaScript 模块）。
- **协作效率**：前端团队可分工开发（HTML 结构、CSS 样式、JavaScript 逻辑）。
- **性能优化**：可独立优化各层（如压缩 CSS、优化 JavaScript）。

#### 2. **最佳实践**

- **语义化 HTML**：使用合适的标签描述内容，提高 SEO 和可访问性。
- **外部资源**：将 CSS 和 JavaScript 放在外部文件中，便于缓存和维护。
- **命名规范**：使用一致的 CSS 类名和 JavaScript 变量名（如 BEM 命名法）。
- **渐进增强**：先确保 HTML 结构可用，再添加 CSS 样式和 JavaScript 交互。

### **六、现代前端框架中的应用**

- **Vue/React/Angular**：虽然这些框架采用组件化开发，但仍遵循三层架构思想：
  - **模板（Template）**：对应结构层。
  - **样式（Style）**：对应表现层。
  - **脚本（Script）**：对应行为层。
- **分离方式**：
  - 单文件组件（SFC）：如 Vue 的 `.vue` 文件，将 HTML、CSS、JavaScript 写在一个文件中，但逻辑分离。
  - 组件化：每个组件内部仍遵循三层架构，确保职责分离。

### **七、总结**

HTML 三层架构是前端开发的基础思想，通过分离结构、表现和行为，使代码更清晰、可维护和高效。在实际项目中，应始终遵循这一原则，并结合现代前端工具和框架，进一步提升开发体验和项目质量。