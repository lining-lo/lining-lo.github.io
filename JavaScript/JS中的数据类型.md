## JS的数据类型

在 JavaScript 中，数据类型分为**基本类型**（Primitive）和**引用类型**（Reference），它们在内存存储和使用方式上有本质区别。

**1.基本类型（Primitive Types）**

基本类型的值是不可变的，且直接存储在栈内存中。共有 **7 种**基本类型：

（1）`undefined`

- 变量已声明但未赋值，或函数无返回值时的默认值。

```javascript
let x;
console.log(x); // undefined
```

（2）`null`

- 表示 “空值”，需主动赋值。

```javascript
const obj = null;
```

（3）`boolean`

- `true` 或 `false`。

```javascript
const isDone = false;
```

（4）`number`

- 整数和浮点数，支持科学计数法。

```javascript
const num = 42;
const float = 3.14;
const infinity = Infinity;
const notANumber = NaN;
```

（5）`string`

- 文本值，用单引号、双引号或反引号（模板字符串）表示。

```javascript
const name = 'Alice';
const greeting = `Hello, ${name}!`;
```

（6）`symbol`（ES6+）

- 唯一且不可变的值，常用于对象属性键。

```javascript
const key = Symbol('uniqueKey');
const obj = { [key]: 'value' };
```

（7）`bigint`（ES2020+）

- 任意精度的整数，用 `n` 后缀表示。

```javascript
const largeNum = 123456789012345678901234567890n;
```

**2.引用类型（Reference Types）**

引用类型的值是可变的，存储在堆内存中，变量保存的是内存地址（引用）。常见的引用类型有：

（1）`object`

- 键值对的集合，可动态添加 / 删除属性。

```javascript
const person = {
  name: 'Alice',
  age: 30,
  hobbies: ['reading', 'coding']
};
```

（2）`array`

- 有序的数据集合，可包含不同类型的值。

```javascript
const arr = [1, 'hello', true];
```

（3）`function`

- 可执行的代码块，也是对象。

```javascript
const add = function(a, b) {
  return a + b;
};
```

（4）其他内置对象

- `Date`、`RegExp`、`Map`、`Set` 等。

```javascript
const date = new Date();
const regex = /abc/;
const map = new Map();
const set = new Set();
```

**3. 基本类型 vs 引用类型的区别**

| **特性**     | **基本类型**           | **引用类型**               |
| ------------ | ---------------------- | -------------------------- |
| **存储方式** | 直接存储值（栈内存）   | 存储引用（堆内存地址）     |
| **复制方式** | 值复制（互不影响）     | 引用复制（共享同一对象）   |
| **比较方式** | 值相等（`===` 比较值） | 引用相等（需指向同一对象） |
| **可变性**   | 不可变（值无法修改）   | 可变（可修改对象内容）     |

示例：复制的区别

```javascript
// 基本类型：值复制
let a = 5;
let b = a;
b = 10;
console.log(a); // 5（不受影响）

// 引用类型：引用复制
let obj1 = { x: 1 };
let obj2 = obj1;
obj2.x = 2;
console.log(obj1.x); // 2（共享同一对象）
```

**4.类型判断方法**

（1）`typeof` 操作符

- 适用于基本类型（除 `null`），对引用类型返回 `object`（函数返回 `function`）。

```javascript
typeof 'hello'; // "string"
typeof [1, 2];  // "object"
typeof null;    // "object"（历史遗留问题）
```

（2）`instanceof` 操作符

- 判断对象是否由某个构造函数创建。

```javascript
[1, 2] instanceof Array; // true
```

（3）`Array.isArray()`

- 专门判断是否为数组。

```javascript
Array.isArray([1, 2]); // true
```

（4）`Object.prototype.toString.call()`

- 返回 `[object Type]`，精确判断所有类型。

```javascript
Object.prototype.toString.call(new Date()); // "[object Date]"
```

**5.注意事项**

（1）`null` 的特殊性

- `typeof null` 返回 `"object"`，这是 JavaScript 的历史 bug。

（2）基本类型的包装对象

- 基本类型（如 `string`、`number`）有对应的包装对象（`String`、`Number`），可临时调用方法。

```javascript
const str = 'hello';
str.toUpperCase(); // "HELLO"（临时创建 String 对象）
```

（3）不可变性（Immutability）

- 基本类型的值不可变，但变量可重新赋值；引用类型的内容可变。