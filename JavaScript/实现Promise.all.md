## 实现 Promise.all

`Promise.all` 是 JavaScript 中常用的处理并发异步操作的工具，它接收一个可迭代对象（通常是数组），并返回一个新的 Promise，该 Promise 在所有输入的 Promise 都成功时才会成功，否则会立即失败。下面我将实现一个功能类似的函数。

### **一、实现说明**

这个实现包含几个关键点：

1. **返回新 Promise**：函数返回一个新的 Promise，用于统一处理所有输入的 Promise。
2. **结果数组**：使用一个数组 `results` 来存储每个 Promise 的结果，确保结果的顺序与输入的 Promise 顺序一致。
3. **计数机制**：使用 `completed` 变量跟踪已完成的 Promise 数量，当所有 Promise 都完成时才 resolve 结果数组。
4. **错误处理**：任何一个 Promise 失败，立即 reject 并返回错误信息。
5. **处理非 Promise 值**：使用 `Promise.resolve()` 将每个输入值转换为 Promise，确保可以处理普通值。

### **二、实现思路**

#### 1. **返回新 Promise**

所有输入的 Promise 需要被包装在一个新的 Promise 中，这样才能统一控制最终的成功或失败状态。

#### 2. **结果数组与索引映射**

- 使用数组 `results` 存储每个 Promise 的结果。
- **关键点**：结果的顺序必须与输入的 Promise 顺序一致，因此需要通过索引 `index` 来映射结果位置。

#### 3. **计数器机制**

- 使用变量 `completed` 记录已成功完成的 Promise 数量。
- 当 `completed` 等于输入数组的长度时，表示所有 Promise 都已成功。

### **三、实现步骤拆解**

#### 1. **参数校验与边界处理**

- **空数组处理**：如果输入是**空数组**，直接 `resolve([])`。
- **非 Promise 值转换**：使用 `Promise.resolve()` 将每个输入值转换为 Promise，确保可以处理普通值（如 `1`、`"hello"`）。

#### 2. **遍历与并发执行**

- 使用 `forEach` 遍历所有 Promise，为每个 Promise 添加 `then` 和 `catch` 回调。
- **并发执行**：所有 Promise 会同时开始执行（只要它们是可并发的）。

#### 3. **结果收集与成功条件**

- **成功条件**：所有 Promise 都成功时，`resolve(results)`。
- **失败条件**：任何一个 Promise 失败时，`reject(error)` 并终止整个过程。

#### 4. **异步控制关键点**

- **顺序保证**：通过索引 `index` 确保结果顺序与输入一致，即使 Promise 完成时间不同。
- **并发安全**：使用计数器 `completed` 而非数组长度判断完成状态，避免异步执行顺序的干扰。

### **四、具体实现**

```js
function promiseAll(promises) {
    // 返回一个新的 Promise
    return new Promise((resolve, reject) => {
        // 用于存储结果的数组
        const results = [];
        // 记录已完成的 Promise 数量
        let completed = 0;
        
        // 如果传入的 promises 为空数组，直接 resolve
        if (promises.length === 0) {
            resolve(results);
            return;
        }
        
        // 遍历每个 Promise
        promises.forEach((promise, index) => {
            // 将每个元素转换为 Promise，确保处理非 Promise 值
            Promise.resolve(promise)
                .then((value) => {
                    // 将结果存入对应的索引位置
                    results[index] = value;
                    // 增加已完成计数
                    completed++;
                    
                    // 当所有 Promise 都完成时，resolve 结果数组
                    if (completed === promises.length) {
                        resolve(results);
                    }
                })
                .catch((error) => {
                    // 任何一个 Promise 失败，立即 reject
                    reject(error);
                });
        });
    });
}

// 示例用法
const promises = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
];

promiseAll(promises)
    .then((values) => {
        console.log(values); // 输出: [1, 2, 3]
    })
    .catch((error) => {
        console.error(error);
    });    
```

### **六、与原生实现的对比**

| **特性**              | **自定义实现**            | **原生 Promise.all**           |
| --------------------- | ------------------------- | ------------------------------ |
| **结果顺序**          | ✅ 严格按输入顺序返回      | ✅ 严格按输入顺序返回           |
| **并发执行**          | ✅ 所有 Promise 同时执行   | ✅ 所有 Promise 同时执行        |
| **失败立即终止**      | ✅ 任意 Promise 失败即终止 | ✅ 任意 Promise 失败即终止      |
| **处理非 Promise 值** | ✅ 通过 `Promise.resolve`  | ✅ 自动转换非 Promise 值        |
| **迭代器支持**        | ❌ 仅支持数组              | ✅ 支持所有可迭代对象（如 Set） |

这个实现体现了 JavaScript 异步编程的核心思想 —— 通过 Promise 组合和控制多个异步操作，同时保持代码的简洁性和可维护性。

