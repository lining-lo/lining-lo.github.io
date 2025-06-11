## Service Worker 指南

Service Worker 是现代 Web 开发的核心技术，它允许你在浏览器后台运行脚本，实现离线缓存、消息推送、后台同步等功能，为 Web 应用提供接近原生应用的体验。以下是全面解析：

### **一、核心概念**

#### 1. **本质**

- Service Worker 是一个**独立线程**运行的 JavaScript 文件，与网页分离。
- 它不直接操作 DOM，而是通过事件机制与页面通信。

#### 2. **生命周期**

1. **注册**：页面通过 `navigator.serviceWorker.register()` 注册。
2. **安装**：下载并缓存静态资源（`install` 事件）。
3. **激活**：清理旧缓存（`activate` 事件）。
4. **空闲 / 监听**：等待网络请求或消息（`fetch`、`message` 事件）。
5. **终止**：浏览器回收资源时终止，下次需要时重新启动。

#### 3. **主要功能**

- **离线缓存**：拦截网络请求，使用缓存资源。
- **推送通知**：接收服务器推送消息。
- **后台同步**：网络恢复时自动同步数据。

### **二、工作原理**

1. **注册阶段**：

   ```javascript
   // 在页面中注册 service worker
   if ('serviceWorker' in navigator) {
     window.addEventListener('load', () => {
       navigator.serviceWorker.register('/service-worker.js')
         .then(registration => {
           console.log('Service Worker 注册成功:', registration);
         })
         .catch(error => {
           console.log('Service Worker 注册失败:', error);
         });
     });
   }
   ```

2. **安装阶段**：缓存静态资源

   ```javascript
   // service-worker.js
   const CACHE_NAME = 'my-app-cache-v1';
   const urlsToCache = [
     '/',
     '/index.html',
     '/styles.css',
     '/main.js'
   ];
   
   self.addEventListener('install', event => {
     event.waitUntil(
       caches.open(CACHE_NAME)
         .then(cache => cache.addAll(urlsToCache))
     );
   });
   ```

3. **激活阶段**：清理旧缓存

   ```javascript
   self.addEventListener('activate', event => {
     event.waitUntil(
       caches.keys().then(cacheNames => {
         return Promise.all(
           cacheNames.filter(name => name !== CACHE_NAME)
             .map(name => caches.delete(name))
         );
       })
     );
   });
   ```

4. **拦截请求**：处理网络请求

   ```javascript
   self.addEventListener('fetch', event => {
     event.respondWith(
       caches.match(event.request)
         .then(response => {
           // 缓存命中则返回缓存，否则继续网络请求
           return response || fetch(event.request);
         })
     );
   });
   ```

### **三、缓存策略**

Service Worker 支持多种缓存策略，根据场景选择：

#### 1. **Cache Only**

- **特点**：只使用缓存，不发起网络请求。
- **适用场景**：静态资源（如 logo、样式表）。

#### 2. **Network Only**

- **特点**：只使用网络，不检查缓存。
- **适用场景**：需要实时数据的请求（如登录接口）。

#### 3. **Cache First**

- **特点**：优先使用缓存，缓存不存在时发起网络请求。
- **适用场景**：静态资源、不常变化的内容（如文章）。

#### 4. **Network First**

- **特点**：优先使用网络，网络失败时使用缓存。
- **适用场景**：频繁更新的内容（如新闻、评论）。

#### 5. **Stale-While-Revalidate**

- **特点**：立即返回缓存，同时在后台更新缓存。
- **适用场景**：需要快速响应且允许数据稍旧的场景（如搜索结果）。

### **四、实际应用场景**

#### 1. **离线应用**

- **场景**：用户断网时仍可访问部分功能。
- **实现**：缓存关键页面和 API 响应。

#### 2. **性能优化**

- **场景**：加速页面加载，减少网络请求。
- **实现**：缓存静态资源（图片、JS、CSS）。

#### 3. **消息推送**

- **场景**：向用户发送通知（即使应用未打开）。
- **实现**：结合 `Push API` 和 `Notification API`。

#### 4. **后台同步**

- **场景**：网络恢复时自动提交表单或同步数据。
- **实现**：使用 `Background Sync API`。

### **五、使用限制与注意事项**

1. **必须使用 HTTPS**：出于安全考虑，Service Worker 只能在 HTTPS 环境下运行（本地开发可使用 `localhost`）。
2. **作用域限制**：Service Worker 的作用域由注册路径决定，默认影响同目录及子目录的页面。
3. **异步操作**：Service Worker 中所有操作都是异步的，使用 `event.waitUntil()` 等待异步操作完成。
4. **调试挑战**：生命周期复杂，需通过浏览器开发者工具（Application 面板）调试。
5. **版本更新**：更新 Service Worker 时需注意缓存清理，避免新旧版本冲突。

### **六、浏览器兼容性**

Service Worker 已被现代浏览器广泛支持（Chrome、Firefox、Safari、Edge 等），但需注意：

- 不支持 IE（需降级方案）。
- 部分 API（如 `Background Sync`）在某些浏览器中需前缀或实验性标记。

### **七、工具与框架**

1. **Workbox**：Google 开发的工具集，简化 Service Worker 开发：

   ```javascript
   import { precacheAndRoute } from 'workbox-precaching';
   import { registerRoute } from 'workbox-routing';
   import { CacheFirst } from 'workbox-strategies';
   
   // 预缓存静态资源
   precacheAndRoute(self.__WB_MANIFEST);
   
   // 配置缓存策略
   registerRoute(
     /\.(?:png|jpg|jpeg|svg)$/,
     new CacheFirst({
       cacheName: 'images',
       plugins: [
         new ExpirationPlugin({ maxEntries: 50 })
       ]
     })
   );
   ```

2. **Vite PWA Plugin**：为 Vite 项目提供一键式 PWA 支持。

3. **Create React App**：内置 Service Worker 支持（通过 Workbox）。

### **八、示例：完整的 Service Worker 文件**

```javascript
// service-worker.js
const CACHE_NAME = 'my-app-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/main.js',
  '/images/logo.png'
];

// 安装阶段缓存静态资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// 激活阶段清理旧缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

// 拦截网络请求
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 缓存命中则返回，否则发起网络请求
        return response || fetch(event.request);
      })
  );
});

// 接收来自页面的消息
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
```

### **九、调试技巧**

1. **Chrome DevTools**：
   - Application 面板 → Service Workers：查看、调试、更新。
   - Network 面板：观察请求是否被 Service Worker 拦截。
2. **强制更新**：
   - 勾选 "Update on reload" 自动更新 Service Worker。
   - 使用 `self.skipWaiting()` 和 `clients.claim()` 跳过等待阶段。

### **总结**

Service Worker 是 PWA（渐进式 Web 应用）的核心技术，通过缓存策略和事件监听，它能大幅提升 Web 应用的性能和可靠性。合理使用 Service Worker 可以：

- 实现离线体验，减少对网络的依赖。
- 加速页面加载，降低服务器压力。
- 提供推送通知等原生应用级功能。

建议从简单的缓存策略开始，逐步引入更复杂的功能，如消息推送和后台同步。