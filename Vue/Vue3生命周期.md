## Vue3 的生命周期

Vue3 的生命周期描述了组件从创建到销毁的整个过程，提供了一系列**钩子函数**，让开发者能在组件不同阶段（如创建、挂载、更新、销毁等）插入自定义逻辑。以下从**选项式 API**和**组合式 API**（更推荐、更灵活）两个视角，结合阶段划分详细介绍：

### **一、核心生命周期阶段与钩子（组合式 API 为主）**

Vue3 的生命周期可分为 **创建、挂载、更新、销毁** 四大核心阶段，对应钩子函数如下：

#### 1. **创建阶段**

- <strong>`setup()`<strong/>（替代 Vue2 的 `beforeCreate` + `created` ）

  - **时机**：组件实例创建前执行，是组合式 API 的入口。

  - **特点**：

    - 此时组件实例未完全初始化，`this` 不可用；
    - 可编写**初始化逻辑**（定义响应式数据、计算属性、方法等），也能调用其他生命周期钩子（如 `onMounted`）。

  - **示例**：

    ```vue
    <script setup>
    import { ref, onMounted } from 'vue'
    // 响应式数据
    const count = ref(0)  
    // 生命周期钩子（挂载阶段）
    onMounted(() => {  
      console.log('组件已挂载，可操作 DOM')
    })
    </script>
    ```

#### 2. **挂载阶段**

- **`onBeforeMount`**

  - **时机**：组件即将挂载到 DOM 前调用（模板已编译，但未生成真实 DOM）。
  - **用途**：可做**挂载前最后准备**（如修改响应式数据，影响初次渲染）。

- **`onMounted`**

  - **时机**：组件已挂载到 DOM 后调用（可访问真实 DOM 元素）。

  - **用途**：

    - 初始化依赖 DOM 的逻辑（如第三方库：图表、地图）；
    - 发送**首次异步请求**（需 DOM 渲染后执行的场景）。

  - 示例：

    ```vue
    <script setup>
    import { onBeforeMount, onMounted } from 'vue'
    onBeforeMount(() => {
      console.log('即将挂载，可最后调整数据')
    })
    onMounted(() => {
      // 操作 DOM（假设模板有 <div id="chart"></div>）
      const chartDom = document.getElementById('chart')  
      console.log('DOM 已挂载：', chartDom)
    })
    </script>
    ```

#### 3. **更新阶段**

- **`onBeforeUpdate`**

  - **时机**：响应式数据变化后、DOM 更新前调用。
  - **用途**：
    - 记录**更新前的状态**（如对比数据变化，优化性能）；
    - 避免不必要的计算（若数据变化无需 DOM 更新，可在此拦截）。

- **`onUpdated`**

  - **时机**：DOM 已完成更新后调用。

  - **用途**：

    - 执行**依赖最新 DOM 的操作**（如重新计算 DOM 尺寸、触发动画）；
    - 注意：避免在此修改响应式数据（否则会触发无限更新循环）。

  - **示例**：

    ```vue
    <script setup>
    import { ref, onBeforeUpdate, onUpdated } from 'vue'
    const count = ref(0)
    onBeforeUpdate(() => {
      console.log('数据变化了，DOM 即将更新：', count.value)
    })
    onUpdated(() => {
      // 假设模板有 <div>{{ count }}</div>，可获取更新后的 DOM 内容
      const domText = document.querySelector('div').textContent  
      console.log('DOM 已更新：', domText)
    })
    </script>
    ```

#### 4. **销毁阶段**

- **`onBeforeUnmount`**

  - **时机**：组件实例被卸载前调用（组件仍可访问，DOM 未移除）。
  - **用途**：
    - 清理**副作用逻辑**（如清除定时器、取消事件监听、终止异步请求）。

- **`onUnmounted`**

  - **时机**：组件实例已被卸载后调用（DOM 已移除，组件完全销毁）。

  - **用途**：

    - 执行**最终清理**（如释放全局资源、通知父组件销毁完成）。

  - **示例**：

    ```vue
    <script setup>
    import { onBeforeUnmount, onUnmounted } from 'vue'
    let timer = null
    // 初始化定时器
    onMounted(() => {
      timer = setInterval(() => {
        console.log('定时任务执行中...')
      }, 1000)
    })
    onBeforeUnmount(() => {
      // 清理定时器（关键！否则会内存泄漏）
      clearInterval(timer)  
      console.log('组件即将卸载，清理定时器')
    })
    onUnmounted(() => {
      console.log('组件已销毁，DOM 已移除')
    })
    </script>
    ```

------

### **二、选项式 API 的生命周期（兼容 Vue2 风格）**

若使用选项式 API（非 `<script setup>`），生命周期钩子以配置项形式编写，与 Vue2 类似，但部分名称调整（如 `beforeDestroy` → `beforeUnmount`，`destroyed` → `unmounted`）：

```vue
<script>
export default {
  // 创建阶段（替代 beforeCreate + created）
  setup() { /* ... */ }, 
  // 挂载阶段
  beforeMount() { /* 即将挂载 */ },
  mounted() { /* 已挂载 */ },
  // 更新阶段
  beforeUpdate() { /* 即将更新 */ },
  updated() { /* 已更新 */ },
  // 销毁阶段
  beforeUnmount() { /* 即将卸载 */ },
  unmounted() { /* 已卸载 */ }
}
</script>
```

**注意**：选项式 API 和组合式 API 的钩子**可混合使用**，但组合式 API 的钩子（如 `onMounted`）会**先于**选项式 API 的钩子（如 `mounted`）执行。

### **三、特殊场景钩子（进阶）**

除核心阶段，Vue3 还提供**特殊场景**的钩子，应对 Keep-Alive、错误处理、渲染调试等需求：

#### 1. **Keep-Alive 相关**

- <strong>`onActivated`<strong/>：组件被 Keep-Alive 缓存后**激活**时调用（如从隐藏标签切换到当前标签）。
- <strong>`onDeactivated`<strong/>：组件被 Keep-Alive 缓存后**失活**时调用（如切换到其他标签）。
- **用途**：处理缓存组件的状态恢复 / 暂停（如定时器、实时数据）。

#### 2. **错误处理**

- <strong>`onErrorCaptured`<strong/>：子组件抛出错误时调用，可捕获错误并阻止传播。

- **示例**：

  ```vue
  <script setup>
  import { onErrorCaptured } from 'vue'
  onErrorCaptured((err, instance, info) => {
    console.error('捕获到子组件错误：', err, info)
    // 返回 false 阻止错误向上传播
    return false 
  })
  </script>
  ```

#### 3. **渲染调试**

- <strong>`onRenderTracked`<strong/>：组件渲染时，响应式依赖被追踪时调用（调试用，查看依赖关系）。
- <strong>`onRenderTriggered`<strong/>：组件因响应式数据变化重新渲染时调用（调试用，查看触发更新的依赖）。

### **四、生命周期执行顺序（关键！避免逻辑冲突）**

组合式 API 的钩子执行顺序（以常见流程为例）：
`setup()` → `onBeforeMount` → `onMounted` → `onBeforeUpdate` → `onUpdated` → `onBeforeUnmount` → `onUnmounted`

### **五、Vue3 vs Vue2 生命周期对比**

| Vue2 钩子       | Vue3 组合式 API 替代（或对应）  | 说明                         |
| --------------- | ------------------------------- | ---------------------------- |
| `beforeCreate`  | `setup()`（更早执行，替代两者） | 组件创建前逻辑统一放 `setup` |
| `created`       | `setup()`                       |                              |
| `beforeMount`   | `onBeforeMount`                 | 即将挂载                     |
| `mounted`       | `onMounted`                     | 已挂载                       |
| `beforeUpdate`  | `onBeforeUpdate`                | 即将更新                     |
| `updated`       | `onUpdated`                     | 已更新                       |
| `beforeDestroy` | `onBeforeUnmount`               | 即将销毁（名称调整）         |
| `destroyed`     | `onUnmounted`                   | 已销毁（名称调整）           |
| `activated`     | `onActivated`                   | Keep-Alive 激活              |
| `deactivated`   | `onDeactivated`                 | Keep-Alive 失活              |

### **六、最佳实践**

1. **优先用组合式 API**：逻辑更聚合（`setup` 内集中管理），支持 hooks 复用（如封装 `useRequest` 处理异步请求）。
2. **避免在 `onMounted` 前操作 DOM**：`onMounted` 是首个可安全访问 DOM 的钩子。
3. **清理副作用必做**：在 `onBeforeUnmount` 中清除定时器、事件监听，避免内存泄漏。
4. **利用 `setup` 初始化**：响应式数据、方法、计算属性等都可在 `setup` 内定义，替代 `beforeCreate` + `created`。

掌握这些生命周期钩子，就能精准控制组件从 “诞生” 到 “销毁” 的全流程，实现 DOM 操作、数据初始化、性能优化等需求啦～