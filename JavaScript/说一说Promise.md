## 说一说 Promise

JavaScript 的 `Promise` 对象是处理异步操作的核心工具，它代表一个异步操作的最终完成（或失败）及其结果值。ES6 引入的 `Promise API` 提供了一套完整的方法来创建、组合和管理异步操作，避免了传统回调地狱的问题。

**1.Promise 基本状态**

- `pending`：初始状态，既不是成功也不是失败。
- `fulfilled`：操作成功完成。
- `rejected`：操作失败。
- `settled`：Promise 已完成（fulfilled 或 rejected）。

**2.创建 Promise**

使用 `new Promise()` 构造函数，接受一个执行器函数（executor）：

```javascript
const promise = new Promise((resolve, reject) => {
  // 异步操作（如网络请求、定时器）
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve('操作成功'); // 完成时调用
    } else {
      reject(new Error('操作失败')); // 失败时调用
    }
  }, 1000);
});
```

**3.Promise 实例方法**

（1）`then(onFulfilled, onRejected)`

处理 Promise 的结果，返回一个新的 Promise：

```javascript
promise.then(
  value => console.log(value), // 成功回调
  error => console.error(error) // 失败回调（可选）
);
```

（2）`catch(onRejected)`

等同于 `then(null, onRejected)`，专门处理错误：

```javascript
promise.catch(error => console.error(error));
```

（3）`finally(onFinally)`

无论 Promise 状态如何都会执行，不接收参数：

```javascript
promise.finally(() => console.log('操作结束'));
```

**4.Promise 静态方法**

（1） `Promise.resolve(value)`

返回一个已完成的 Promise：

```javascript
const resolvedPromise = Promise.resolve(42);
```

（2）`Promise.reject(reason)`

返回一个已拒绝的 Promise：

```javascript
const rejectedPromise = Promise.reject(new Error('失败'));
```

（3）`Promise.all(iterable)`

并行处理多个 Promise，全部成功则返回结果数组，任一失败则立即终止：

```javascript
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
Promise.all([promise1, promise2]).then(values => console.log(values)); // [1, 2]
```

（4）`Promise.race(iterable)`

返回第一个 settled 的 Promise 的结果（无论成功或失败）：

```javascript
const fastPromise = new Promise(resolve => setTimeout(resolve, 100, 'fast'));
const slowPromise = new Promise(resolve => setTimeout(resolve, 500, 'slow'));
Promise.race([fastPromise, slowPromise]).then(value => console.log(value)); // "fast"
```

（5）`Promise.allSettled(iterable)`

等待所有 Promise 都 settled，返回包含每个 Promise 结果（状态和值）的数组：

```javascript
Promise.allSettled([promise1, promise2]).then(results => {
  results.forEach(result => {
    console.log(result.status); // "fulfilled" 或 "rejected"
  });
});
```

（6）`Promise.any(iterable)`

返回第一个成功的 Promise 的结果，若全部失败则抛出 `AggregateError`：

```javascript
Promise.any([promise1, promise2]).then(value => console.log(value));
```

**5.链式调用与错误处理**

Promise 的链式调用允许异步操作按顺序执行：

```javascript
fetchData()
  .then(data => processData(data))
  .then(result => saveResult(result))
  .catch(error => console.error('处理过程出错:', error))
  .finally(() => console.log('操作完成'));
```

**6.与 async/await 的关系**

`async/await` 是 Promise 的语法糖，使异步代码更像同步代码：

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('请求失败:', error);
    throw error;
  }
}
```

**7.常见应用场景**

- 并行操作：使用 `Promise.all` 同时处理多个请求。
- 顺序执行：通过链式调用按顺序执行异步操作。
- 超时控制：结合 `Promise.race` 和 `setTimeout` 实现超时处理。
- 错误处理：集中捕获和处理异步错误。

**8.注意事项**

- Promise 不可取消：一旦创建就无法中途取消，需自行实现取消逻辑。
- 内存泄漏：未处理的 Promise 可能导致内存泄漏。
- 微任务队列：Promise 的回调是微任务，会在当前事件循环结束前执行。

**9.兼容性**

Promise 是 ES6（2015）的标准特性，现代浏览器和 Node.js 均已支持。在旧浏览器（如 IE）中需使用 polyfill（如 `es6-promise`）。

掌握 Promise API 是编写高效、可维护异步代码的关键，结合 `async/await` 能进一步提升代码的可读性和可维护性。