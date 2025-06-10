### CSS 选择器

CSS 选择器是前端开发中最基础且核心的概念之一，用于精准定位 HTML 元素并应用样式。以下从基础到高级全面解析 CSS 选择器的分类、用法和优先级规则：

### **一、基础选择器**

#### 1. **元素选择器**

- **语法**：直接使用 HTML 元素名称（如`div`, `p`, `h1`）。

- **示例**：

  ```css
  p {
    color: red;
  }
  ```

#### 2. **类选择器**

- **语法**：以`.`开头，后跟类名（如`.container`, `.btn-primary`）。

- **示例**：

  ```css
  .highlight {
    background-color: yellow;
  }
  ```

#### 3. **ID 选择器**

- **语法**：以`#`开头，后跟 ID 名（如`#header`, `#main-content`）。

- **示例**：

  ```css
  #logo {
    width: 200px;
  }
  ```

#### 4. **通用选择器**

- **语法**：`*`，匹配所有元素。

- **示例**：

  ```css
  * {
    margin: 0;
    padding: 0;
  }
  ```

### **二、属性选择器**

通过元素的属性或属性值来选择元素。

#### 1. **存在属性选择器**

- **语法**：`[attr]`，匹配具有指定属性的元素。

- **示例**：

  ```css
  [disabled] {
    cursor: not-allowed;
  }
  ```

#### 2. **精确值属性选择器**

- **语法**：`[attr="value"]`，匹配属性值完全等于指定值的元素。

- **示例**：

  ```css
  [type="text"] {
    border: 1px solid #ccc;
  }
  ```

#### 3. **部分值属性选择器**

| **语法**           | **含义**                          | **示例**             |
| ------------------ | --------------------------------- | -------------------- |
| `[attr~="value"]`  | 包含指定词（词以空格分隔）        | `[class~="btn"]`     |
| `[attr\|="value"]` | 以指定值开头（后跟`-`或完全匹配） | `[lang|="en"]`       |
| `[attr^="value"]`  | 以指定值开头                      | `[href^="https"]`    |
| `[attr$="value"]`  | 以指定值结尾                      | `[src$=".jpg"]`      |
| `[attr*="value"]`  | 包含指定子字符串                  | `[title*="example"]` |

### **三、组合选择器**

通过元素之间的关系来选择元素。

#### 1. **后代选择器**

- **语法**：`A B`，选择 A 元素内的所有 B 元素（无论嵌套多深）。

- **示例**：

  ```css
  ul li {
    list-style-type: circle;
  }
  ```

#### 2. **子选择器**

- **语法**：`A > B`，选择 A 元素的直接子元素 B。

- **示例**：

  ```css
  div > p {
    font-weight: bold;
  }
  ```

#### 3. **相邻兄弟选择器**

- **语法**：`A + B`，选择 A 元素后紧邻的同级元素 B。

- **示例**：

  ```css
  h2 + p {
    color: #666;
  }
  ```

#### 4. **通用兄弟选择器**

- **语法**：`A ~ B`，选择 A 元素后的所有同级元素 B。

- **示例**：

  ```css
  input:checked ~ span {
    text-decoration: line-through;
  }
  ```

### **四、伪类选择器**

通过元素的状态或位置来选择元素，以`:`开头。

#### 1. **动态伪类**

| **伪类**   | **含义**                         | **示例**                                    |
| ---------- | -------------------------------- | ------------------------------------------- |
| `:hover`   | 鼠标悬停状态                     | `a:hover { color: red; }`                   |
| `:active`  | 激活状态（如按钮被点击时）       | `button:active { transform: scale(0.98); }` |
| `:focus`   | 获得焦点状态（如输入框被选中时） | `input:focus { outline: none; }`            |
| `:visited` | 已访问的链接                     | `a:visited { color: purple; }`              |

#### 2. **结构伪类**

| **伪类**             | **含义**                                                | **示例**                                            |
| -------------------- | ------------------------------------------------------- | --------------------------------------------------- |
| `:first-child`       | 作为父元素的第一个子元素                                | `li:first-child { font-weight: bold; }`             |
| `:last-child`        | 作为父元素的最后一个子元素                              | `li:last-child { border-bottom: none; }`            |
| `:nth-child(n)`      | 作为父元素的第 n 个子元素（n 可为数字、表达式或关键词） | `tr:nth-child(even) { background-color: #f2f2f2; }` |
| `:nth-last-child(n)` | 从后往前数第 n 个子元素                                 | `p:nth-last-child(2) { color: blue; }`              |
| `:only-child`        | 作为父元素的唯一子元素                                  | `div:only-child { margin: 0 auto; }`                |

#### 3. **目标伪类**

- <strong>`:target`<strong/>：匹配当前 URL 片段标识符对应的元素（如`#section1`）。

  ```css
  :target {
    background-color: yellow;
  }
  ```

#### 4. **表单相关伪类**

| **伪类**    | **含义**                  | **示例**                                     |
| ----------- | ------------------------- | -------------------------------------------- |
| `:disabled` | 禁用状态的表单元素        | `input:disabled { background-color: #eee; }` |
| `:enabled`  | 可用状态的表单元素        | `input:enabled { cursor: pointer; }`         |
| `:checked`  | 选中状态的单选框 / 复选框 | `input:checked + label { color: green; }`    |
| `:required` | 必填字段                  | `input:required { border: 1px solid red; }`  |
| `:valid`    | 验证通过的表单元素        | `input:valid { border: 1px solid green; }`   |

### **五、伪元素选择器**

用于选择元素的特定部分，以`::`开头（部分旧版浏览器支持单冒号）。

#### 1. **内容伪元素**

| **伪元素** | **含义**             | **示例**                       |
| ---------- | -------------------- | ------------------------------ |
| `::before` | 在元素内容前插入内容 | `a::before { content: "→ "; }` |
| `::after`  | 在元素内容后插入内容 | `p::after { content: "✓"; }`   |

#### 2. **文本伪元素**

| **伪元素**       | **含义**         | **示例**                                    |
| ---------------- | ---------------- | ------------------------------------------- |
| `::first-letter` | 元素的第一个字母 | `p::first-letter { font-size: 2em; }`       |
| `::first-line`   | 元素的第一行     | `p::first-line { font-weight: bold; }`      |
| `::selection`    | 被用户选中的部分 | `::selection { background-color: yellow; }` |

### **六、选择器优先级（Specificity）**

当多个选择器应用于同一元素且样式冲突时，优先级规则决定最终生效的样式：

#### 1. **优先级计算规则**

| **选择器类型**         | **权重** | **示例**                          |
| ---------------------- | -------- | --------------------------------- |
| 内联样式（style 属性） | 1,0,0,0  | `<div style="color: red;">`       |
| ID 选择器              | 0,1,0,0  | `#header`                         |
| 类 / 属性 / 伪类选择器 | 0,0,1,0  | `.btn`, `[type="text"]`, `:hover` |
| 元素 / 伪元素选择器    | 0,0,0,1  | `div`, `::before`                 |
| 通用选择器（*）        | 0,0,0,0  | `*`                               |

#### 2. **特殊情况**

- **!important**：强制提升优先级，但会破坏样式的自然层级，应谨慎使用。

  ```css
  color: red !important; /* 优先级最高 */
  ```

- **相同优先级**：后声明的样式生效。

  ```css
  p { color: red; }
  p { color: blue; } /* 最终p为蓝色 */
  ```

### **七、选择器组合实战示例**

```css
/* 1. 选择所有带有data-tooltip属性的元素 */
[data-tooltip] {
  position: relative;
}

/* 2. 选择第一个表单中的所有必填输入框 */
form:first-of-type input:required {
  border: 2px solid #ff0000;
}

/* 3. 选择未被访问的外部链接（以https开头） */
a[href^="https"]:not(:visited) {
  color: #0066cc;
}

/* 4. 为每个列表项添加序号（CSS计数器） */
ol {
  counter-reset: item;
  list-style-type: none;
}
li::before {
  counter-increment: item;
  content: counter(item) ". ";
  font-weight: bold;
}

/* 5. 选择最后一个子元素，如果是p标签则应用样式 */
div > :last-child:p {
  margin-bottom: 0;
}
```

### **八、性能优化建议**

1. **避免深层嵌套选择器**：如`body div ul li a {...}`会显著降低渲染性能。
2. **优先使用类选择器**：类选择器比标签选择器更具语义化且性能更高。
3. **减少！important 使用**：破坏样式优先级规则，增加调试难度。
4. **避免通用选择器与属性选择器滥用**：如`*[data-attr]`会遍历所有元素。

### **九、浏览器兼容性**

现代选择器（如`:nth-child`、属性选择器）在 IE9 + 及所有现代浏览器中均支持。对于旧版浏览器（如 IE8 及以下），需注意：

- 不支持伪元素双冒号语法（仅支持单冒号）。
- 不支持结构伪类（如`:nth-child`）。
- 不支持属性选择器（如`[attr="value"]`）。

可通过 Autoprefixer 等工具自动添加浏览器前缀，或使用 CSS 预处理器（如 Sass）提升兼容性。

### **总结：选择器的核心应用场景**

1. **元素定位**：通过类、ID、标签等精准选择目标元素。
2. **状态样式**：利用伪类（如`:hover`, `:focus`）实现交互反馈。
3. **动态内容**：通过`::before`和`::after`插入装饰性内容。
4. **表单验证**：使用`:valid`, `:invalid`等伪类实现表单样式反馈。
5. **响应式设计**：结合媒体查询和选择器实现不同屏幕尺寸的样式适配。

掌握 CSS 选择器是前端开发的基础，合理使用选择器不仅能提高代码效率，还能显著提升样式的可维护性和性能。