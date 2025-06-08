## ES6 新特性

ES6（ECMAScript 2015）为 JavaScript 带来了许多重要的新特性，显著提升了代码的可读性和开发效率。以下是一些核心特性的介绍：

### **1. 箭头函数（Arrow Functions）**

提供了更简洁的函数写法，并且不会绑定自己的 `this`：

```javascript
// 传统函数
const sum = function(a, b) {
  return a + b;
};

// 箭头函数
const sum = (a, b) => a + b;
```

### **2.块级作用域变量（let 和 const）**

`let` 和 `const` 声明具有块级作用域，解决了 `var` 的变量提升问题：

```javascript
if (true) {
  let x = 10;
  const y = 20;
  // x 和 y 只在此块内有效
}
// x 和 y 在此处不可用
```

### **3.解构赋值（Destructuring）**

允许从数组或对象中提取值并赋值给变量：

```javascript
// 数组解构
const [a, b] = [1, 2];

// 对象解构
const { name, age } = { name: 'Alice', age: 30 };
```

### **4.默认参数（Default Parameters）**

函数参数可以设置默认值：

```javascript
function greet(name = 'Guest') {
  return `Hello, ${name}!`;
}

greet(); // 输出: Hello, Guest!
```

### **5.扩展运算符（Spread Operator）**

用 `...` 展开数组或对象：

```javascript
// 数组展开
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]

// 对象展开
const obj1 = { a: 1 };
const obj2 = { ...obj1, b: 2 }; // { a: 1, b: 2 }
```

### **6.类（Classes）**

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, ${this.name}!`;
  }
}

const alice = new Person('Alice');
```

### **7.Promise 对象**

简化了异步编程，避免回调地狱：

```javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('Data loaded'), 1000);
  });
}

fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### **8.模块化（Modules）**

支持 `import` 和 `export` 语法：

```javascript
// module.js
export const PI = 3.14;

// main.js
import { PI } from './module.js';
```

### **9.模板字符串（Template Literals）**

使用反引号 ` 允许嵌入表达式：

```javascript
const name = 'Alice';
console.log(`Hello, ${name}!`); // 输出: Hello, Alice!
```

### **10.增强的对象字面量**

对象可以更简洁地定义方法和属性：

```javascript
const name = 'Alice';
const person = {
  name, // 等同于 name: name
  greet() { // 等同于 greet: function() {...}
    return `Hello, ${this.name}!`;
  }
};
```

### **11. Map 和 Set 数据结构**

- `Map`：存储键值对，键可以是任意类型。
- `Set`：存储唯一值，没有重复项。

```javascript
// Map示例
const map = new Map();
map.set("name", "Alice");
map.set(123, "Number key");
console.log(map.get("name")); // "Alice"
console.log(map.size); // 2

// Set示例
const set = new Set([1, 2, 2, 3]);
console.log([...set]); // [1, 2, 3]
set.add(4);
set.delete(2);
console.log(set.has(3)); // true
```

### **11.Object 方法扩展**

- `Object.assign()`：用于对象的浅拷贝和合并。
- `Object.keys()/values()/entries()`：返回对象的键、值或键值对数组。

```javascript
// 对象合并
const target = { a: 1 };
const source = { b: 2 };
const merged = Object.assign(target, source);
console.log(merged); // { a: 1, b: 2 }

// 获取键、值、键值对
const person = { name: "Alice", age: 30 };
console.log(Object.keys(person)); // ["name", "age"]
console.log(Object.values(person)); // ["Alice", 30]
console.log(Object.entries(person)); // [["name", "Alice"], ["age", 30]]
```

### **12.数组方法扩展**

- `Array.from()`：从类数组对象或可迭代对象创建新数组。
- `Array.find()/findIndex()`：查找符合条件的元素或索引。
- `Array.includes()`：判断数组是否包含某个值。

```javascript
// Array.from示例
const arrayLike = { 0: "a", 1: "b", length: 2 };
const arr = Array.from(arrayLike); // ["a", "b"]

// find示例
const numbers = [1, 3, 5, 7, 9];
const firstEven = numbers.find(num => num % 2 === 0); // undefined
const firstOdd = numbers.find(num => num % 2 !== 0); // 1

// includes示例
console.log(numbers.includes(5)); // true
console.log(numbers.includes(10)); // false
```

### **13.字符串方法扩展**

- `String.includes()`：判断字符串是否包含子字符串。
- `String.repeat()`：重复字符串指定次数。

```javascript
const str = "Hello, world!";
console.log(str.includes("world")); // true
console.log(str.repeat(3)); // "Hello, world!Hello, world!Hello, world!"
```

这些就是 ES6 的核心 API 和特性，它们极大地提升了 JavaScript 的表达能力和开发效率。