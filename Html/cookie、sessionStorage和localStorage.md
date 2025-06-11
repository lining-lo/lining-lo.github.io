## Cookie、SessionStorage 和 LocalStorage

在前端开发中，Cookie、SessionStorage 和 LocalStorage 是三种常用的客户端存储方式，它们各有特点和适用场景。以下是对它们的详细对比：

### **一、基本概念**

#### 1. **Cookie**

- **特性**：服务器发送到用户浏览器并保存在本地的小段数据，会随 HTTP 请求发送到服务器。
- **用途**：身份验证（如登录状态）、用户偏好设置、跟踪用户行为。
- **存储大小**：通常为 4KB 左右。
- **有效期**：可设置过期时间（`expires` 或 `max-age`），否则会话结束时清除。
- **访问权限**：可通过 HTTP 和 JavaScript 访问，但有同源策略限制。

#### 2. **SessionStorage**

- **特性**：临时保存同一窗口（或标签页）的数据，在关闭窗口或标签页后清除。
- **用途**：保存表单数据、临时会话状态、页面间传递参数。
- **存储大小**：约 5-10MB（不同浏览器可能不同）。
- **有效期**：仅当前会话有效，关闭窗口即清除。
- **访问权限**：仅 JavaScript 可访问，有同源策略限制。

#### 3. **LocalStorage**

- **特性**：长期保存数据，除非手动清除，否则不会过期。
- **用途**：保存用户偏好（如主题设置）、缓存数据、减少 API 请求。
- **存储大小**：约 5-10MB（不同浏览器可能不同）。
- **有效期**：永久有效，除非手动调用 `localStorage.clear()` 或 `removeItem()`。
- **访问权限**：仅 JavaScript 可访问，有同源策略限制。

### **二、核心区别对比**

| **特性**     | **Cookie**                              | **SessionStorage**                        | **LocalStorage**          |
| ------------ | --------------------------------------- | ----------------------------------------- | ------------------------- |
| **存储大小** | 4KB 左右                                | 5-10MB                                    | 5-10MB                    |
| **有效期**   | 可设置过期时间，或会话结束时清除        | 仅当前会话有效（窗口 / 标签页关闭即清除） | 永久有效，需手动清除      |
| **数据共享** | 同源窗口 / 标签页共享，且会发送到服务器 | 不共享，每个窗口 / 标签页独立存储         | 同源窗口 / 标签页共享     |
| **访问权限** | HTTP 和 JavaScript                      | 仅 JavaScript                             | 仅 JavaScript             |
| **安全性**   | 易受 CSRF 攻击，需设置 `HttpOnly`       | 相对安全，仅当前会话可用                  | 相对安全，需防止 XSS 攻击 |
| **用途**     | 身份验证、用户跟踪                      | 临时会话数据、表单保存                    | 长期缓存、用户偏好设置    |

### **三、使用示例**

#### 1. **Cookie 操作**

```javascript
// 设置 Cookie（有效期 1 天）
document.cookie = "username=John; expires=" + new Date(Date.now() + 86400000).toUTCString() + "; path=/";

// 获取 Cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop().split(';').shift() : '';
}

// 删除 Cookie
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
```

#### 2. **SessionStorage 操作**

```javascript
// 存储数据
sessionStorage.setItem('username', 'John');
sessionStorage.setItem('cart', JSON.stringify({ items: 3 }));

// 获取数据
const username = sessionStorage.getItem('username');
const cart = JSON.parse(sessionStorage.getItem('cart'));

// 删除数据
sessionStorage.removeItem('username');
sessionStorage.clear(); // 清除所有数据
```

#### 3. **LocalStorage 操作**

```javascript
// 存储数据
localStorage.setItem('theme', 'dark');
localStorage.setItem('user', JSON.stringify({ id: 1, name: 'John' }));

// 获取数据
const theme = localStorage.getItem('theme');
const user = JSON.parse(localStorage.getItem('user'));

// 删除数据
localStorage.removeItem('theme');
localStorage.clear(); // 清除所有数据
```

### **四、监听存储变化**

通过 `storage` 事件监听 `localStorage` 和 `sessionStorage` 的变化（不包括当前窗口）：

```javascript
window.addEventListener('storage', event => {
  console.log(`键 ${event.key} 被修改：`);
  console.log(`旧值: ${event.oldValue}, 新值: ${event.newValue}`);
  console.log(`发生变化的 URL: ${event.url}`);
});
```

### **五、安全性考虑**

#### 1. **Cookie 安全**

-  <strong>`HttpOnly` </strong>：防止 JavaScript 访问 Cookie，减少 XSS 攻击风险。

  ```javascript
  document.cookie = "sessionId=123; HttpOnly; Secure"; // Secure 仅 HTTPS 传输
  ```

-   <strong>`SameSite` </strong>：防止 CSRF 攻击，限制 Cookie 在跨站请求中的使用。

  ```javascript
  document.cookie = "csrfToken=abc; SameSite=Strict"; // 严格模式
  ```

#### 2. **Web Storage 安全**

- **防止 XSS**：避免存储敏感信息（如密码），对存储的数据进行加密。
- **同源策略**：不同源的页面无法访问彼此的 Web Storage。

### **六、应用场景选择**

#### 1. **使用 Cookie**

- 需要在客户端和服务器间传递数据时（如会话 ID）。
- 需要设置数据过期时间时。
- 实现跨域身份验证（需结合 CORS 配置）。

#### 2. **使用 SessionStorage**

- 临时保存表单数据，防止用户刷新页面丢失。
- 保存页面间传递的一次性数据（如购物车临时状态）。
- 存储仅当前会话需要的数据（如游戏进度）。

#### 3. **使用 LocalStorage**

- 缓存不常变化的数据（如用户偏好、应用配置）。
- 减少 API 请求（如缓存下拉菜单选项）。
- 实现离线应用（结合 Service Worker）。

### **七、浏览器兼容性**

- **Cookie**：所有浏览器支持。
- **Web Storage**：IE8+、Chrome、Firefox、Safari 等现代浏览器支持。
- **降级处理**：对不支持 Web Storage 的浏览器，可使用 Cookie 或第三方库（如 `localForage`）。

### **总结**

- **Cookie**：适合客户端与服务器间的数据传递，但有大小限制和安全风险。
- **SessionStorage**：适合临时保存会话数据，窗口关闭即清除。
- **LocalStorage**：适合长期缓存数据，同源窗口间共享。

在实际开发中，应根据数据的重要性、有效期和共享需求选择合适的存储方式，并注意数据加密和安全防护。