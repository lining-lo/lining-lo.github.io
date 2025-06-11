## HTML5 新元素与新特性

HTML5 作为 HTML 标准的第五次重大修订，引入了大量新元素、API 和功能，显著提升了 Web 应用的语义化、多媒体能力和交互体验。以下是其核心新特性的详细介绍：

### **一、语义化结构元素**

HTML5 新增了一系列语义化标签，替代传统的 `<div>` 布局，提升代码可读性和 SEO：

#### 1. **页面结构元素**

- `<header>`：页面或章节的头部，通常包含标题、导航或标志。
- `<nav>`：导航链接区域（如菜单、目录）。
- `<main>`：文档的主要内容（每个页面只能有一个）。
- `<article>`：独立的内容块（如文章、博客、评论）。
- `<section>`：文档的章节或区域（如章节、选项卡内容）。
- `<aside>`：侧边栏或辅助内容（如广告、相关链接）。
- `<footer>`：页面或章节的底部，通常包含版权、联系方式。

#### 2. **其他语义元素**

- `<hgroup>`：标题组（已废弃，推荐直接使用 `<h1>`-`<h6>`）。
- `<figcaption>` 和 `<figure>`：图片 / 插图及其说明。
- `<mark>`：高亮文本（如搜索结果）。
- `<time>`：机器可读的日期 / 时间。
- `<wbr>`：可选换行点（Word Break Opportunity）。

### **二、表单增强**

HTML5 大幅简化了表单开发，新增多种输入类型和属性：

#### 1. **新输入类型**

- `type="email"`：邮箱格式验证。
- `type="url"`：URL 格式验证。
- `type="number"`：数字输入，带上下箭头。
- `type="range"`：滑块控件。
- `type="date"`/`"time"`/`"datetime-local"`：日期时间选择器。
- `type="color"`：颜色选择器。
- `type="search"`：搜索框（部分浏览器显示清除按钮）。

#### 2. **新属性**

- `placeholder`：输入提示文本。
- `required`：必填字段验证。
- `pattern`：正则表达式验证。
- `autofocus`：自动聚焦。
- `autocomplete`：自动完成。
- `formaction`：覆盖表单的 `action` 属性。
- `novalidate`：禁用表单验证。

#### 3. **表单元素**

- `<datalist>`：为输入框提供预定义选项（配合 `list` 属性）。
- `<keygen>`：生成密钥对（已废弃，推荐使用 HTTPS）。
- `<output>`：显示计算结果。

### **三、多媒体支持**

HTML5 原生支持音频和视频，无需依赖 Flash：

#### 1. **视频元素**

```html
<video src="movie.mp4" controls width="320" height="240">
  您的浏览器不支持视频标签。
</video>
```

- **属性**：`controls`（控制条）、`autoplay`、`loop`、`muted`、`poster`（封面图）。
- **支持格式**：MP4、WebM、Ogg。

#### 2. **音频元素**

```html
<audio src="music.mp3" controls>
  您的浏览器不支持音频标签。
</audio>
```

- **属性**：同 `<video>`。
- **支持格式**：MP3、WAV、OGG。

#### 3. **`<source>` 元素**

为媒体提供多格式支持：

```html
<video controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.webm" type="video/webm">
  您的浏览器不支持视频标签。
</video>
```

### **四、Canvas 与 SVG**

#### 1. **Canvas**

- **特性**：通过 JavaScript 动态绘制图形（位图）。

- **应用**：游戏、数据可视化、图像处理。

- **示例**：

  ```html
  <canvas id="myCanvas" width="200" height="100"></canvas>
  <script>
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'red';
    ctx.fillRect(10, 10, 100, 50);
  </script>
  ```

#### 2. **SVG**

- **特性**：基于 XML 的矢量图形，可直接嵌入 HTML。

- **应用**：图标、地图、复杂图形。

- **示例**：

  ```html
  <svg width="100" height="100">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
  </svg>
  ```

### **五、Web 存储**

替代 Cookie，提供更大容量的客户端存储：

#### 1. **localStorage**

- **特性**：持久化存储（除非手动清除，否则不会过期）。

- **容量**：约 5-10MB。

- **示例**：

  ```javascript
  localStorage.setItem('username', 'John');
  const username = localStorage.getItem('username');
  ```

#### 2. **sessionStorage**

- **特性**：会话期间有效（页面关闭即清除）。

- **示例**：

  ```javascript
  sessionStorage.setItem('cart', JSON.stringify({ items: 3 }));
  ```

### **六、Web API 与 JavaScript 增强**

#### 1. **地理定位（Geolocation）**

```javascript
navigator.geolocation.getCurrentPosition(
  position => {
    const { latitude, longitude } = position.coords;
    console.log(`位置：${latitude}, ${longitude}`);
  },
  error => console.error('定位失败:', error)
);
```

#### 2. **拖放 API（Drag and Drop）**

- 通过设置 `draggable="true"` 和监听 `dragstart`、`dragover`、`drop` 事件实现。

#### 3. **Web Workers**

- 在后台线程执行脚本，避免阻塞 UI：

  ```javascript
  // main.js
  const worker = new Worker('worker.js');
  worker.postMessage('计算');
  worker.onmessage = e => console.log('结果:', e.data);
  
  // worker.js
  self.onmessage = e => {
    // 耗时计算
    self.postMessage('完成');
  };
  ```

#### 4. **Web Sockets**

- 双向实时通信：

  ```javascript
  const socket = new WebSocket('ws://example.com/socket');
  socket.onopen = () => socket.send('连接成功');
  socket.onmessage = e => console.log('收到消息:', e.data);
  ```

#### 5. **History API**

- 操作浏览器历史记录，实现无刷新导航：

  ```javascript
  history.pushState({ page: 'home' }, '首页', '/home');
  window.onpopstate = e => console.log('导航变化:', e.state);
  ```

### **七、离线应用**

通过 **Application Cache**（已废弃）和 **Service Workers** 实现离线功能：

#### 1. **Service Workers**

- **特性**：拦截网络请求，缓存资源，支持推送通知。

- **示例**：

  ```javascript
  // service-worker.js
  self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('my-cache').then(cache => cache.addAll(['/', '/index.html']))
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request));
  });
  ```

### **八、其他特性**

#### 1. **微数据（Microdata）**

- 在 HTML 中嵌入结构化数据，提升搜索引擎理解：

  ```html
  <div itemscope itemtype="http://schema.org/Person">
    <span itemprop="name">John Doe</span>
    <span itemprop="email">john@example.com</span>
  </div>
  ```

#### 2. **Web SQL 和 IndexedDB**

- **Web SQL**：基于 SQL 的客户端数据库（已废弃）。
- **IndexedDB**：NoSQL 数据库，支持事务和索引。

#### 3. **Web Components**

- 封装可复用组件（含 `<template>`、`<slot>`、Shadow DOM）。

### **九、浏览器兼容性**

- **现代浏览器**（Chrome、Firefox、Safari、Edge）：全面支持。
- **IE 浏览器**：IE9+ 部分支持，IE10+ 支持更多特性（如 Canvas、音频视频）。
- **降级处理**：使用 Polyfill 库（如 Modernizr、html5shiv）增强旧浏览器兼容性。

### **总结**

HTML5 的新元素和特性显著提升了 Web 开发的效率和质量，包括：

- **语义化**：更清晰的页面结构和更好的 SEO。
- **多媒体**：原生支持音频视频，减少对插件的依赖。
- **表单**：简化表单验证和用户体验。
- **存储**：更大容量的客户端数据存储。
- **API**：丰富的 Web 功能（定位、拖拽、WebSocket 等）。

建议在实际项目中结合 CSS3 和 JavaScript 框架（如 React、Vue），充分发挥 HTML5 的优势。