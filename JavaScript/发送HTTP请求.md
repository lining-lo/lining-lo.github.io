## 发送 HTTP 请求

在 JavaScript 中，发送 HTTP 请求是与后端 API 交互的基础操作。从早期的 `XMLHttpRequest` 到现代的 `fetch API` 和第三方库（如 `axios`），以下是常用的请求方式及其对比：

### **一、XMLHttpRequest（XHR）**

**特点**：原生 API，兼容性强（支持 IE9+），但用法繁琐。

**示例**：

```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data', true); // 第三个参数表示异步

// 设置请求头（可选）
xhr.setRequestHeader('Content-Type', 'application/json');

// 监听状态变化
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log('响应数据:', xhr.responseText);
  }
};

// 处理错误
xhr.onerror = function() {
  console.error('请求失败');
};

// 发送请求（POST 请求需在 send 中传入数据）
xhr.send();
```

**缺点**：

- 回调地狱问题（多层嵌套请求）。
- 状态码和错误处理复杂。

### **二、Fetch API**

**特点**：现代原生 API（ES6+），基于 Promise，语法简洁，但需手动处理错误和兼容性。

**示例 1：GET 请求**

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // 解析 JSON 数据
  })
  .then(data => console.log('响应数据:', data))
  .catch(error => console.error('请求失败:', error));
```

**示例 2：POST 请求**

```javascript
fetch('https://api.example.com/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'John', age: 30 })
})
  .then(response => response.json())
  .then(data => console.log('提交成功:', data))
  .catch(error => console.error('提交失败:', error));
```

**缺点**：

- 不支持取消请求（需配合 `AbortController`）。
- 对错误处理不够友好（404/500 状态码不会触发 `catch`）。

### **三、Axios**

**特点**：第三方库（需引入），功能全面（拦截器、取消请求、自动转换 JSON 等），兼容性好。

**安装**：

```bash
npm install axios
# 或通过 CDN 引入
<script src="https://cdn.tailwindcss.com"></script>
```

**示例 1：GET 请求**

```javascript
axios.get('https://api.example.com/data')
  .then(response => console.log('响应数据:', response.data))
  .catch(error => {
    if (error.response) {
      console.error('请求错误:', error.response.status);
    } else if (error.request) {
      console.error('请求未收到响应');
    } else {
      console.error('请求设置错误:', error.message);
    }
  });
```

**示例 2：POST 请求**

```javascript
axios.post('https://api.example.com/submit', {
  name: 'John',
  age: 30
})
  .then(response => console.log('提交成功:', response.data))
  .catch(error => console.error('提交失败:', error));
```

**优势**：

- 自动转换 JSON 数据（无需手动调用 `response.json()`）。
- 拦截器可全局处理请求 / 响应（如添加 Token、日志记录）。
- 支持请求取消和超时设置。
- 错误处理更友好（统一处理网络错误和 HTTP 错误）。

### **四、对比与选型建议**

| **维度**           | **XMLHttpRequest**   | **Fetch API**             | **Axios**                |
| ------------------ | -------------------- | ------------------------- | ------------------------ |
| **兼容性**         | IE9+                 | 现代浏览器（需 polyfill） | 全兼容（依赖 Promise）   |
| **语法复杂度**     | 高（回调嵌套）       | 中（Promise）             | 低（API 简洁）           |
| **自动 JSON 解析** | 否                   | 否（需手动调用）          | 是                       |
| **拦截器**         | 无                   | 无                        | 有（全局处理）           |
| **取消请求**       | 复杂                 | 通过 AbortController      | 简单（cancelToken）      |
| **超时设置**       | 支持（timeout 属性） | 需手动实现                | 直接支持                 |
| **浏览器支持**     | 全支持               | 不支持 IE                 | 不支持 IE（需 polyfill） |

### **五、高级用法示例**

#### **1. Axios 全局配置**

```javascript
import axios from 'axios';

// 创建实例并配置
const instance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000, // 超时时间
  headers: {
    'Content-Type': 'application/json'
  }
});

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    // 添加 Token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// 使用实例发送请求
instance.get('/users').then(response => console.log(response.data));
```

#### **2. Fetch 处理文件上传**

```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('name', 'example');

fetch('https://api.example.com/upload', {
  method: 'POST',
  body: formData
  // 注意：不要设置 Content-Type 头，让浏览器自动设置
})
  .then(response => response.json())
  .then(data => console.log('上传成功:', data));
```

#### **3. 取消请求（Axios）**

```javascript
const source = axios.CancelToken.source();

axios.get('/data', {
  cancelToken: source.token
})
  .catch(error => {
    if (axios.isCancel(error)) {
      console.log('请求被取消:', error.message);
    } else {
      console.error('请求错误:', error);
    }
  });

// 取消请求
source.cancel('用户取消请求');
```

### **六、总结**

- **优先选 Axios**：功能全面，适合企业级应用（尤其是需要拦截器、错误统一处理的场景）。
- **简单场景用 Fetch**：现代浏览器原生支持，无需额外依赖，适合轻量应用。
- **兼容性要求高用 XHR**：如必须支持 IE9 及以下版本。



无论选择哪种方式，都建议封装请求逻辑，统一处理错误、加载状态和接口前缀，以提高代码可维护性。