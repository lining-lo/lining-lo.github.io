## Nodejs连接MySQL自动断开

```
node:events:496
      throw er; // Unhandled 'error' event
      ^

Error: Connection lost: The server closed the connection.
    at Protocol.end (C:\Users\Administrator\Desktop\message-wall\serve\node_modules\mysql\lib\protocol\Protocol.js:112:13)
    at Socket.<anonymous> (C:\Users\Administrator\Desktop\message-wall\serve\node_modules\mysql\lib\Connection.js:94:28)
    at Socket.<anonymous> (C:\Users\Administrator\Desktop\message-wall\serve\node_modules\mysql\lib\Connection.js:526:10)
    at Socket.emit (node:events:530:35)
    at endReadableNT (node:internal/streams/readable:1698:12)
    at process.processTicksAndRejections (node:internal/process/task_queues:90:21)
Emitted 'error' event on Connection instance at:
    at Connection._handleProtocolError (C:\Users\Administrator\Desktop\message-wall\serve\node_modules\mysql\lib\Connection.js:423:8)
    at Protocol.emit (node:events:518:28)
    at Protocol._delegateError (C:\Users\Administrator\Desktop\message-wall\serve\node_modules\mysql\lib\protocol\Protocol.js:398:10)
    at Protocol.end (C:\Users\Administrator\Desktop\message-wall\serve\node_modules\mysql\lib\protocol\Protocol.js:116:8)
    at Socket.<anonymous> (C:\Users\Administrator\Desktop\message-wall\serve\node_modules\mysql\lib\Connection.js:94:28)
    [... lines matching original stack trace ...]
    at process.processTicksAndRejections (node:internal/process/task_queues:90:21) {
  fatal: true,
  code: 'PROTOCOL_CONNECTION_LOST'
```

这个错误是 Node.js 应用连接 MySQL 数据库时常见的问题，错误信息 `PROTOCOL_CONNECTION_LOST` 表示数据库连接意外断开，而你的应用没有处理这个异常。以下是详细分析和解决方案：

### **一、错误原因**

1. **数据库服务器主动关闭连接**：
   - MySQL 默认连接超时时间（`wait_timeout`）为 8 小时，长时间空闲的连接会被服务器断开。
   - 服务器重启、网络波动或负载过高也可能导致连接丢失。
2. **Node.js 应用未处理连接断开事件**：
   - 当连接断开时，MySQL 驱动会触发 `error` 事件，如果没有监听该事件，Node.js 会抛出未捕获的异常。

### **二、解决方案**

#### 1. **添加错误处理**

在创建数据库连接时，监听 `error` 事件并处理连接丢失的情况：

```javascript
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydb'
});

// 监听错误事件
connection.on('error', function(err) {
  console.error('数据库连接错误: ' + err.stack);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    // 重新连接逻辑（见方案2）
  } else {
    throw err; // 处理其他类型的错误
  }
});
```

#### 2. **实现自动重连机制**

当检测到连接丢失时，自动重新建立连接：

```javascript
let connection;

function handleDisconnect() {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mydb'
  });

  connection.connect(function(err) {
    if (err) {
      console.error('连接数据库失败: ' + err.stack);
      setTimeout(handleDisconnect, 2000); // 2秒后重试
    }
    console.log('数据库连接成功');
  });

  connection.on('error', function(err) {
    console.error('数据库错误: ' + err.stack);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect(); // 重新连接
    } else {
      throw err;
    }
  });
}

handleDisconnect(); // 初始化连接
```

#### 3. **使用连接池（推荐）**

连接池会自动管理连接的生命周期，减少手动处理断开的复杂度：

```javascript
const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydb',
  connectionLimit: 10, // 最大连接数
  waitForConnections: true,
  queueLimit: 0
});

// 使用连接池获取连接
pool.getConnection(function(err, connection) {
  if (err) throw err; // 处理获取连接时的错误

  // 使用连接执行查询
  connection.query('SELECT * FROM users', function(error, results) {
    connection.release(); // 释放连接回池
    if (error) throw error;
    console.log('查询结果:', results);
  });
});

// 处理池错误（可选）
pool.on('error', function(err) {
  console.error('连接池错误: ' + err.stack);
});
```

#### 4. **调整 MySQL 服务器配置**

增加 `wait_timeout` 值，减少连接自动断开的频率：

```sql
-- 临时修改（重启后失效）
SET GLOBAL wait_timeout = 28800; -- 8小时（默认值）

-- 永久修改（需编辑 my.cnf 配置文件）
[mysqld]
wait_timeout = 28800
```

### **三、最佳实践**

1. **优先使用连接池**：连接池会自动回收和复用连接，减少频繁创建连接的开销，同时处理连接断开问题。

2. **避免长事务**：长时间运行的事务可能导致连接长时间占用，增加断开风险。

3. 定期 ping 连接

   ：在使用前检查连接状态，确保连接有效：

   ```javascript
   connection.ping(function(err) {
     if (err) throw err;
     console.log('连接正常');
   });
   ```

4. **错误处理**：始终监听 `error` 事件，特别是 `PROTOCOL_CONNECTION_LOST` 错误。

### **四、常见误区**

- **不要在错误处理中直接重启应用**：频繁重启会导致服务不稳定。
- **避免重复创建连接**：每次断开都创建新连接可能导致连接泄漏。
- **不要忽略错误**：未处理的 `error` 事件会导致应用崩溃。



通过以上方法，你可以有效解决 `PROTOCOL_CONNECTION_LOST` 错误，提高 Node.js 应用与 MySQL 数据库交互的稳定性。