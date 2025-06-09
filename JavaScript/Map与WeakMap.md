## Map与WeakMap

在 JavaScript 中，`WeakMap` 和 `Map` 都是用于存储键值对的数据结构，但它们在设计目的、内存管理和使用场景上有显著差异。以下是详细对比：

### **一、核心差异对比表**

| **维度**         | **Map**                                            | **WeakMap**                      |
| ---------------- | -------------------------------------------------- | -------------------------------- |
| **键的类型**     | 任意类型（对象、原始值均可）                       | 仅接受对象作为键（原始值会报错） |
| **垃圾回收机制** | 键值对会阻止键对象被垃圾回收                       | 键对象的引用是弱引用，不阻止回收 |
| **迭代支持**     | 支持 `keys()`、`values()`、`entries()`             | 不支持迭代，无 `size` 属性       |
| **方法差异**     | 完整 API（`set`、`get`、`has`、`delete`、`clear`） | 无 `clear()`，无迭代方法         |
| **使用场景**     | 需要完整迭代和操作的通用存储                       | 临时关联数据，避免内存泄漏       |

### **二、详细差异解析**

#### **1. 键的类型限制**

- **Map**：键可以是任意类型，包括对象、原始值（如字符串、数字、布尔值）。

  ```javascript
  const map = new Map();
  const obj = {};
  map.set(obj, 'value');
  map.set('key', 123);
  map.set(123, true);
  ```

- **WeakMap**：键必须是对象，原始值会报错。

  ```javascript
  const weakMap = new WeakMap();
  const obj = {};
  weakMap.set(obj, 'value');
  weakMap.set('key', 'error'); // 报错：Invalid value used as weak map key
  ```

#### **2. 垃圾回收机制**

- **Map**：键对象的引用是强引用，即使对象在外部被销毁，只要 Map 存在，对象就不会被垃圾回收。

  ```javascript
  let obj = { name: 'example' };
  const map = new Map();
  map.set(obj, 'data');
  
  obj = null; // 对象在外部被销毁，但 map 仍保留引用，对象不会被回收
  ```

- **WeakMap**：键对象的引用是弱引用，若对象在外部被销毁，WeakMap 中的引用不会阻止垃圾回收。

  ```javascript
  let obj = { name: 'example' };
  const weakMap = new WeakMap();
  weakMap.set(obj, 'data');
  
  obj = null; // 对象被垃圾回收，WeakMap 中的键值对自动消失
  ```

#### **3. 迭代与方法差异**

- **Map**：支持完整迭代，有 `size` 属性和丰富方法。

  ```javascript
  const map = new Map([['a', 1], ['b', 2]]);
  console.log(map.size); // 2
  map.forEach((value, key) => console.log(key, value));
  ```

- **WeakMap**：不支持迭代，无 `size` 属性，方法有限（仅 `get`、`set`、`has`、`delete`）。

  ```javascript
  const weakMap = new WeakMap();
  console.log(weakMap.size); // undefined
  weakMap.forEach(() => {}); // 报错：weakMap.forEach is not a function
  ```

### **三、典型应用场景**

#### **1. Map 的适用场景**

- **需要完整迭代功能**：如遍历所有键值对。
- **键为原始值**：如存储字符串到对象的映射。
- **需要跟踪键值对数量**：通过 `size` 属性。

**示例**：缓存计算结果

```javascript
const cache = new Map();

function calculate(key) {
  if (cache.has(key)) {
    return cache.get(key);
  }
  const result = /* 复杂计算 */;
  cache.set(key, result);
  return result;
}
```

#### **2. WeakMap 的适用场景**

- **避免内存泄漏**：如为 DOM 元素关联元数据（元素销毁时，元数据自动回收）。
- **私有属性存储**：在类中隐藏私有变量。
- **临时数据关联**：如缓存只在对象存活时有效的数据。

**示例 1：DOM 元素关联数据**

```javascript
const elementData = new WeakMap();

function setupElement(element) {
  elementData.set(element, {
    created: new Date(),
    metadata: '...'
  });
}

// 当元素被 DOM 移除并销毁时，WeakMap 中的数据自动被回收
```

**示例 2：类的私有属性**

```javascript
const privateData = new WeakMap();

class MyClass {
  constructor() {
    privateData.set(this, {
      secret: '私有数据'
    });
  }
  
  getSecret() {
    return privateData.get(this).secret;
  }
}
```

### **四、常见误解与注意事项**

1. **“WeakMap 性能更好”**
   错误。WeakMap 的设计目的是避免内存泄漏，而非提升性能。在需要频繁迭代或存储大量数据时，Map 反而更高效。
2. **“WeakMap 可用于缓存”**
   仅适用于缓存与对象生命周期绑定的数据。若需长期缓存，应使用 Map 或其他方案。
3. **“WeakMap 完全不可遍历”**
   正确。WeakMap 无法被迭代，因此无法获取所有键值对，这是为了保证垃圾回收机制的正确性。

### **五、总结与选型建议**

- **选 Map**：当需要存储任意类型的键，且需要完整的迭代和操作功能时。
- **选 WeakMap**：当仅需要用对象作为键，且不希望阻止对象被垃圾回收时（如临时数据、避免内存泄漏）。

理解两者差异的核心在于**内存管理策略**：Map 会保留对象的强引用，而 WeakMap 不会阻止对象被回收。合理选择数据结构可避免内存泄漏，提升应用性能。