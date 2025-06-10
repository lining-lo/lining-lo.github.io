## JS事件循环（Event Loop）：单线程非阻塞的核心机制

JavaScript 作为单线程语言，却能处理复杂的异步任务（如网络请求、定时器、DOM 事件），这一切都依赖于**事件循环（Event Loop）** 机制。理解事件循环是掌握 JS 异步编程的关键，下面从原理到实践全面解析：

### **一、单线程与异步的矛盾**

- **单线程特性**：JS 同一时间只能执行一个任务，避免了多线程共享资源的复杂性（如死锁）。
- **异步需求**：若遇到网络请求、定时器等耗时操作，不能阻塞线程（否则页面会卡死），需通过异步机制处理。
- **解决方案**：事件循环通过 “非阻塞” 方式管理异步任务，让 JS 在等待耗时操作时继续执行其他任务。

### **二、事件循环的核心组成部分**

事件循环的运行依赖于以下关键概念，它们共同构成了 JS 的异步执行环境：

#### 1. **调用栈（Call Stack）**

- **作用**：存储正在执行的函数调用，遵循 “后进先出（LIFO）” 原则。

- **示例**：

  ```javascript
  function a() { function b() { console.log('b') } b() }
  a() // 调用栈：a → b → 空（执行完弹出）
  ```

#### 2. **任务队列（Task Queue）**

- **作用**：存放异步任务的回调函数，等待调用栈空闲时执行。
- **分类**：
  - **宏任务（MacroTask）**：包括`setTimeout`、`setInterval`、`script`（整体代码）、`I/O`、`UI渲染`等。
  - **微任务（MicroTask）**：包括`Promise.then`、`MutationObserver`、`process.nextTick`（Node.js）等。

#### 3. **事件循环（Event Loop）**

- **核心逻辑**：不断检查调用栈是否为空，若为空则从任务队列中取出任务放入调用栈执行。
- **执行顺序**：先执行所有微任务，再执行一个宏任务，循环此过程。

### **三、事件循环的执行流程**

以一个经典案例演示事件循环的执行顺序：

```javascript
console.log('1')

setTimeout(() => {
  console.log('2')
  Promise.resolve().then(() => {
    console.log('3')
  })
  console.log('4')
}, 0)

Promise.resolve().then(() => {
  console.log('5')
})

console.log('6')
```

#### **执行步骤解析**：

1. **初始调用栈**：执行`console.log('1')` → 输出`1`。
2. <strong>遇到`setTimeout`<strong/>：作为宏任务，将回调函数放入**宏任务队列**。
3. <strong>遇到`Promise.then`<strong/>：作为微任务，将回调函数放入**微任务队列**。
4. **执行`console.log('6')`** → 输出`6`，此时调用栈为空。
5. **处理微任务队列**：执行`Promise.then`回调 → 输出`5`，微任务队列清空。
6. **处理宏任务队列**：执行`setTimeout`回调：
   - 输出`2`，调用栈执行`console.log('2')`。
   - 遇到`Promise.then` → 微任务入队。
   - 输出`4`，调用栈执行`console.log('4')`。
7. **调用栈再次为空**：处理微任务队列中的`Promise.then` → 输出`3`。

#### **最终输出顺序**：`1 → 6 → 5 → 2 → 4 → 3`

### **四、宏任务与微任务的执行优先级**

事件循环的核心规则是：**微任务优先级高于宏任务**，且每次事件循环中，**微任务会被全部执行完毕后才会执行下一个宏任务**。

#### **对比表格**：

| **任务类型** | **常见案例**                          | **执行时机**                     |
| ------------ | ------------------------------------- | -------------------------------- |
| 宏任务       | `setTimeout`、`setInterval`、`script` | 每次事件循环开始时执行           |
| 微任务       | `Promise.then`、`MutationObserver`    | 调用栈为空时，立即执行微任务队列 |

#### **关键场景示例**：

```javascript
setTimeout(() => {
  console.log('宏任务1')
  Promise.resolve().then(() => {
    console.log('微任务1-1')
  })
}, 0)

Promise.resolve().then(() => {
  console.log('微任务1')
  setTimeout(() => {
    console.log('宏任务2')
    Promise.resolve().then(() => {
      console.log('微任务2-1')
    })
  }, 0)
})

// 输出顺序：微任务1 → 微任务1-1 → 宏任务1 → 宏任务2 → 微任务2-1
```

### **五、浏览器与 Node.js 的事件循环差异**

虽然核心原理相同，但不同平台的事件循环实现存在细节差异：

#### 1. **浏览器环境**

- **宏任务队列**：包括`script`、`setTimeout`、`setInterval`、`UI渲染`等。
- **微任务队列**：`Promise.then`、`MutationObserver`。

#### 2. **Node.js 环境（版本≥11）**

- **宏任务阶段**：分为`timers`（定时器）、`I/O callbacks`、`idle, prepare`、`poll`（轮询）、`check`（`setImmediate`）、`close callbacks`。
- **微任务**：`process.nextTick`（优先级高于`Promise.then`）、`Promise.then`。

#### **Node.js 示例**：

```javascript
setTimeout(() => {
  console.log('setTimeout')
}, 0)

setImmediate(() => {
  console.log('setImmediate')
}, 0)

process.nextTick(() => {
  console.log('nextTick')
})

Promise.resolve().then(() => {
  console.log('Promise')
})
```

- **输出顺序**：`nextTick → Promise → setTimeout/setImmediate`（`setTimeout`和`setImmediate`的顺序取决于系统毫秒级精度）。

### **六、事件循环与 UI 渲染的关系**

- **渲染时机**：浏览器在宏任务执行完毕且微任务队列清空后，会进行 UI 渲染（属于宏任务）。
- **性能影响**：若调用栈长时间被占用（如死循环），会导致 UI 卡顿，因此需避免耗时操作阻塞线程。
- **优化方案**：
  - 将长任务拆分为多个短任务，利用`requestAnimationFrame`或`setTimeout`分片执行。
  - 使用`Web Worker`开启子线程处理耗时计算，避免阻塞主线程。

### **七、事件循环的实际应用场景**

#### 1. **异步编程模型**

- `Promise`、`async/await`底层依赖事件循环实现异步流程控制。

#### 2. **防抖与节流**

- 通过`setTimeout`（宏任务）延迟执行函数，避免频繁触发事件（如窗口滚动、按钮点击）。

#### 3. **微任务的优先级应用**

- 在数据更新后，利用`MutationObserver`（微任务）监听 DOM 变化，确保更新完成后执行回调。

### **总结：事件循环的核心逻辑**

1. **单线程执行**：所有任务在调用栈中按顺序执行。
2. **异步任务处理**：耗时操作的回调函数放入任务队列。
3. **循环检查**：调用栈为空时，先执行所有微任务，再执行一个宏任务，重复此过程。
4. **平台差异**：浏览器与 Node.js 的宏任务阶段划分不同，需注意 API 执行顺序。

理解事件循环机制是掌握 JS 异步编程的基础，从`Promise`到`async/await`，从浏览器渲染到 Node.js 后端处理，事件循环始终是 JS 非阻塞特性的核心驱动力。