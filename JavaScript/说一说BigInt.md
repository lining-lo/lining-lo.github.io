## BigInt

在 JavaScript 里，`BigInt`是 ES2020 引入的一种原始数据类型，它能够表示任意精度的整数。在处理非常大的数值时，`BigInt`就可以发挥作用，避免了使用`Number`类型时出现的精度丢失问题。

### 一、基本概念

#### 1. 用途

`BigInt`主要用于处理超出`Number`类型安全范围的整数。`Number`类型能安全表示的最大整数是`2^53 - 1`（即`Number.MAX_SAFE_INTEGER`，值为`9007199254740991`），而`BigInt`可以表示任意大的整数。

#### 2. 创建方式

- **字面量方式**：在数字后面加`n`。

  ```javascript
  const bigInt1 = 9007199254740992n; // 超过了Number的安全范围
  const bigInt2 = 123456789012345678901234567890n;
  ```

- **BigInt () 构造函数**：

  ```javascript
  const bigInt3 = BigInt("9007199254740992");
  const bigInt4 = BigInt(100); // 等价于100n
  ```

### 二、运算操作

`BigInt`支持常见的数学运算，但不支持单目`+`运算符。

```javascript
const a = 10n;
const b = 3n;

console.log(a + b); // 13n
console.log(a - b); // 7n
console.log(a * b); // 30n
console.log(a / b); // 3n（整除，不会产生小数）
console.log(a % b); // 1n
console.log(a ** b); // 1000n

// 自增/自减
let num = 1n;
num++; // 2n
num--; // 1n

// 比较运算
console.log(10n > 5n); // true
console.log(10n === 10); // false（类型不同）
console.log(10n == 10); // true（值相同）
```

### 三、与 Number 的区别

1. **精度**：

   - `Number`类型存在精度限制，超出`MAX_SAFE_INTEGER`的计算可能不准确。

   ```javascript
   console.log(9007199254740992 === 9007199254740993); // true（错误结果）
   console.log(9007199254740992n === 9007199254740993n); // false（正确结果）
   ```

2. **类型**

   - `BigInt`和`Number`是不同的类型，不能直接混合运算。

   ```javascript
   const x = 10; // Number
   const y = 5n; // BigInt
   // console.log(x + y); // 错误：Cannot mix BigInt and other types
   console.log(x + Number(y)); // 15（需要显式转换类型）
   ```

3. **方法支持**

   - `BigInt`不支持`Math`对象的方法，如`Math.sqrt()`。
   - 不能使用`JSON.stringify()`直接序列化`BigInt`，需要自定义转换函数。

### 四、应用场景

1. **密码学**：处理非常大的素数等。
2. **数据库 ID**：处理超过`Number`安全范围的 ID。
3. **金融计算**：需要高精度的货币计算。

### 五、注意事项

1. **兼容性**：IE 不支持`BigInt`，现代浏览器（Chrome 67+、Firefox 68+、Safari 14+）支持良好。

2. **性能**：`BigInt`的运算速度比`Number`慢，尤其是处理极大数值时。

3. **隐式转换风险**：

   ```javascript
   // 错误示例：可能导致意外结果
   if (10n) {
     console.log("BigInt作为布尔值使用"); // 会执行
   }
   ```

### 六、实用工具函数

#### 1. 转换为字符串

```javascript
const bigNum = 12345678901234567890n;
console.log(bigNum.toString()); // "12345678901234567890"
console.log(bigNum.toLocaleString()); // "12,345,678,901,234,567,890"
```

#### 2. 与字符串相互转换

```javascript
// 字符串转BigInt
const str ="9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999"
```

