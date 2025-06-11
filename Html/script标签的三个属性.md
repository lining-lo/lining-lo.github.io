## `<script>` 标签的三个属性

在 HTML 中，脚本的加载和执行方式对页面性能和用户体验有显著影响。`<script>` 标签的三个属性（普通、`async` 和 `defer`）决定了脚本的加载时机和执行顺序，下面详细分析它们的区别：

### **一、基本概念**

#### 1. **普通 `<script>`**

```html
<script src="script.js"></script>
```

- **特性**：
- **阻塞加载**：浏览器遇到 `<script>` 标签时，会暂停解析 HTML，立即下载并执行脚本。
  - **执行顺序**：按文档中出现的顺序执行。
- **应用场景**：需要立即执行的脚本（如初始化代码）。

#### 2. **`<script async>`**

```html
<script async src="script.js"></script>
```

- **特性**：
  - **异步加载**：脚本异步下载，不阻塞 HTML 解析。
  - **执行时机**：脚本下载完成后立即执行，可能在 DOMContentLoaded 事件触发前或后。
  - **执行顺序**：不保证按文档顺序执行，先下载完成的先执行。
  - **应用场景**：独立脚本（如广告、分析工具），不依赖其他脚本或 DOM。

#### 3. **`<script defer>`**

```html
<script defer src="script.js"></script>
```

- **特性**：
  - **异步加载**：脚本异步下载，不阻塞 HTML 解析。
  - **执行时机**：在 HTML 解析完成后、DOMContentLoaded 事件触发前执行。
  - **执行顺序**：按文档中出现的顺序执行。
  - **应用场景**：依赖 DOM 的脚本（如操作 DOM 的库），或需要按顺序执行的脚本。

### **二、执行流程对比**

#### 1. **普通 `<script>`**

```plaintext
HTML 解析 → 遇到 <script> → 暂停解析 → 下载脚本 → 执行脚本 → 继续解析 HTML
```



- **问题**：阻塞页面渲染，可能导致白屏或加载缓慢。

#### 2. **`<script async>`**

```plaintext
HTML 解析 → 遇到 <script async> → 继续解析 HTML → 异步下载脚本 → 脚本下载完成 → 暂停解析 → 执行脚本 → 继续解析 HTML
```

- **特点**：脚本执行时机不确定，可能打断 HTML 解析。

#### 3. **`<script defer>`**

```plaintext
HTML 解析 → 遇到 <script defer> → 继续解析 HTML → 异步下载脚本 → HTML 解析完成 → 按顺序执行 defer 脚本 → 触发 DOMContentLoaded 事件
```

- **特点**：脚本按顺序执行，且在 DOM 准备好后执行。

### **三、核心区别对比**

| **特性**             | **普通 `<script>`**   | **`<script async>`**  | **`<script defer>`**            |
| -------------------- | --------------------- | --------------------- | ------------------------------- |
| **下载时机**         | 阻塞 HTML 解析        | 异步下载，不阻塞解析  | 异步下载，不阻塞解析            |
| **执行时机**         | 下载后立即执行        | 下载完成后立即执行    | HTML 解析完成后执行             |
| **执行顺序**         | 按文档顺序            | 不保证顺序            | 按文档顺序                      |
| **DOM 就绪**         | 可能在 DOM 完成前执行 | 可能在 DOM 完成前执行 | 在 DOM 完成后执行               |
| **DOMContentLoaded** | 脚本执行完才触发      | 可能在脚本执行前触发  | 在脚本执行后触发                |
| **适用场景**         | 需要立即执行的脚本    | 独立脚本，不依赖 DOM  | 需要按顺序执行且依赖 DOM 的脚本 |

### **四、示例与演示**

#### 1. **普通 `<script>` 示例**

```html
<!DOCTYPE html>
<html>
<head>
  <title>普通脚本</title>
  <script src="https://example.com/script1.js"></script> <!-- 阻塞解析 -->
  <script src="https://example.com/script2.js"></script> <!-- 按顺序执行 -->
</head>
<body>
  <!-- 页面内容 -->
</body>
</html>
```

- **结果**：页面解析到 `<script>` 时会暂停，等待脚本下载并执行后再继续。

#### 2. **`<script async>` 示例**

```html
<!DOCTYPE html>
<html>
<head>
  <title>异步脚本</title>
  <script async src="https://example.com/script1.js"></script> <!-- 不保证顺序 -->
  <script async src="https://example.com/script2.js"></script>
</head>
<body>
  <!-- 页面内容 -->
</body>
</html>
```

- **结果**：`script1.js` 和 `script2.js` 异步下载，先下载完成的先执行，可能打乱顺序。

#### 3. **`<script defer>` 示例**

```html
<!DOCTYPE html>
<html>
<head>
  <title>延迟脚本</title>
  <script defer src="https://example.com/script1.js"></script> <!-- 按顺序执行 -->
  <script defer src="https://example.com/script2.js"></script>
</head>
<body>
  <!-- 页面内容 -->
</body>
</html>
```

- **结果**：`script1.js` 和 `script2.js` 异步下载，HTML 解析完成后按顺序执行。

### **五、注意事项**

#### 1. **内联脚本（无 src）**

- `async` 和 `defer` 对内联脚本无效（部分浏览器会忽略）。

- **示例**：

  ```html
  <script async>
    console.log('内联脚本，async 无效');
  </script>
  ```

#### 2. **动态添加的脚本**

- 通过 JavaScript 动态创建的 `<script>` 默认是 `async` 的。

- **示例**：

  ```javascript
  const script = document.createElement('script');
  script.src = 'script.js';
  // 需要显式设置 defer
  script.defer = true;
  document.head.appendChild(script);
  ```

#### 3. **跨域脚本**

- `async` 和 `defer` 对跨域脚本同样有效，但需注意 CORS 配置。

### **六、最佳实践**

#### 1. **使用 `<script defer>`**

- 当脚本依赖 DOM 或需要按顺序执行时（如 jQuery 插件、DOM 操作库）。

- **示例**：

  ```html
<script defer src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
  <script defer src="app.js"></script> <!-- 依赖 jQuery -->
```

#### 2. **使用 `<script async>`**

- 当脚本独立且不依赖其他脚本时（如广告、分析工具）。

- **示例**：

  ```html
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  ```

#### 3. **使用普通 `<script>`**

- 当脚本必须立即执行，且内容较少时（如 polyfill）。

- **示例**：

  ```html
  <script>
    // 立即执行的 polyfill
    if (!window.Promise) {
      // 加载 Promise polyfill
    }
  </script>
  ```
  

### **七、总结**

- <stong>普通 `<script>`</stong>：阻塞解析，适合立即执行的关键脚本。
- <stong>`<script async>`</stong>：异步加载，适合独立脚本，不保证执行顺序。
- <stong>`<script defer>`</stong>：异步加载，按顺序执行，适合依赖 DOM 的脚本。

合理使用这三种方式，可以优化页面加载性能，提升用户体验。建议优先使用 `defer`，避免不必要的阻塞。