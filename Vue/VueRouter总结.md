### Vue Router 总结

Vue Router 是 Vue.js 官方的路由管理器，用于构建单页面应用（SPA）。以下是在 Vue 3 项目中配置路由的完整流程，涵盖基础配置、高级功能和最佳实践。

### **一、安装与基本配置**

#### 1. 安装 Vue Router

```bash
# NPM
npm install vue-router@4

# Yarn
yarn add vue-router@4
```

#### 2. 创建路由文件

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// 导入组件
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import User from '../views/User.vue'

// 定义路由表
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/user/:id', // 动态路由参数
    name: 'User',
    component: User
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // 浏览器历史模式
  routes
})

export default router
```

#### 3. 在 main.js 中注册路由

```javascript
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
```

#### 4. 在 App.vue 中使用路由组件

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <!-- 路由链接 -->
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/user/123">User</router-link>
    </nav>
    
    <!-- 路由出口 -->
    <router-view />
  </div>
</template>
```

### **二、动态路由与参数**

#### 1. 动态路由参数

```javascript
// 路由定义
{
  path: '/user/:id',
  name: 'User',
  component: User
}

// 在组件中访问参数
<template>
  <div>
    <h1>用户 ID: {{ $route.params.id }}</h1>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    // 响应式获取参数
    console.log(route.params.id)
    return {}
  }
}
</script>
```

#### 2. 动态路由匹配规则

| 模式                     | 匹配路径               |
| ------------------------ | ---------------------- |
| `/user/:id`              | `/user/1` 或 `/user/2` |
| `/user/:id/post/:postId` | `/user/1/post/123`     |
| `/user/:id(\\d+)`        | 仅匹配数字 ID          |

### **三、嵌套路由（多级路由）**

```javascript
// 路由配置
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      {
        path: 'profile', // 完整路径：/user/123/profile
        component: UserProfile
      },
      {
        path: 'posts', // 完整路径：/user/123/posts
        component: UserPosts
      }
    ]
  }
]
```

```vue
<!-- User.vue 组件 -->
<template>
  <div>
    <h1>用户 {{ $route.params.id }}</h1>
    
    <!-- 嵌套路由出口 -->
    <router-view />
    
    <!-- 嵌套路由链接 -->
    <router-link to="/user/123/profile">个人资料</router-link>
    <router-link to="/user/123/posts">我的帖子</router-link>
  </div>
</template>
```

### **四、路由守卫（导航守卫）**

#### 1. 全局守卫

```javascript
// 全局前置守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login') // 未登录则重定向到登录页
  } else {
    next() // 允许访问
  }
})

// 全局解析守卫
router.beforeResolve((to, from, next) => {
  console.log('解析守卫，在导航被确认前调用')
  next()
})

// 全局后置钩子
router.afterEach((to, from) => {
  console.log(`已导航到 ${to.path}`)
})
```

#### 2. 路由独享守卫

```javascript
const routes = [
  {
    path: '/admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      const isAdmin = localStorage.getItem('role') === 'admin'
      if (isAdmin) {
        next()
      } else {
        next('/forbidden')
      }
    }
  }
]
```

#### 3. 组件内守卫

```vue
<script>
export default {
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被验证前调用
    next(vm => {
      // 通过 vm 访问组件实例
    })
  },
  beforeRouteUpdate(to, from, next) {
    // 路由参数变化时调用
    next()
  },
  beforeRouteLeave(to, from, next) {
    // 离开路由时调用（可用于防止用户未保存离开）
    const canLeave = window.confirm('确定要离开吗？')
    if (canLeave) next()
    else next(false)
  }
}
</script>
```

### **五、路由元信息（meta）**

```javascript
const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,  // 需要认证
      roles: ['admin', 'editor'],  // 允许的角色
      title: '仪表盘',  // 页面标题
      icon: 'dashboard'  // 菜单图标
    }
  }
]

// 在守卫中使用元信息
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})
```

### **六、路由懒加载（性能优化）**

```javascript
const routes = [
  {
    path: '/about',
    name: 'About',
    // 懒加载组件（Webpack 风格）
    component: () => import('../views/About.vue')
  },
  {
    path: '/user/:id',
    name: 'User',
    // ES module 动态导入
    component: () => import('../views/User.vue')
  }
]
```

### **七、编程式导航**

```vue
<script>
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    
    // 跳转到指定路由
    const goToHome = () => {
      router.push('/')
    }
    
    // 带参数跳转
    const goToUser = () => {
      router.push({ name: 'User', params: { id: '123' } })
    }
    
    // 替换当前路由
    const replaceRoute = () => {
      router.replace('/about')
    }
    
    // 后退到上一页
    const goBack = () => {
      router.back()
    }
    
    return {
      goToHome,
      goToUser,
      replaceRoute,
      goBack
    }
  }
}
</script>
```

### **八、路由过渡动画**

```vue
<!-- App.vue -->
<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
```

### **九、Vue 3 路由与 Vue 2 路由的主要区别**

| 特性         | Vue 2 (vue-router@3)                 | Vue 3 (vue-router@4)        |
| ------------ | ------------------------------------ | --------------------------- |
| 创建方式     | `new VueRouter()`                    | `createRouter()` 函数       |
| 历史模式     | `new VueRouter({ mode: 'history' })` | `createWebHistory()` 函数   |
| 组合式 API   | 无                                   | `useRouter()`, `useRoute()` |
| 路由守卫参数 | `to, from, next`                     | 相同，但支持异步守卫        |
| 安装方式     | 直接注册                             | 通过 `app.use(router)` 注册 |

### **十、路由配置最佳实践**

1. **动态路由权限控制**

   - 在路由元信息中标记需要权限的页面
   - 通过全局守卫验证用户权限
   - 未授权时重定向到登录页或错误页

2. **404 页面处理**

   ```javascript
   // 放在路由表最后
   {
     path: '/:pathMatch(.*)*',
     name: 'NotFound',
     component: NotFound
   }
   ```

3. **路由数据预获取**
   使用 `beforeRouteEnter` 或组件 `setup` 中的异步操作预加载数据：

   ```vue
   <script>
   import { useRoute, onBeforeRouteUpdate } from 'vue-router'
   import { fetchUser } from '../api'
   
   export default {
     setup() {
       const route = useRoute()
       const user = ref(null)
       
       const fetchUserData = async (id) => {
         user.value = await fetchUser(id)
       }
       
       // 首次进入路由时获取数据
       fetchUserData(route.params.id)
       
       // 路由参数变化时更新数据
       onBeforeRouteUpdate((to) => {
         fetchUserData(to.params.id)
       })
       
       return { user }
     }
   }
   </script>
   ```

4. **路由与 Pinia 结合**
   在路由守卫中更新 Pinia 状态，实现全局状态与路由的联动：

   ```javascript
   import { useUserStore } from '../stores/user'
   
   router.beforeEach(async (to, from, next) => {
     const userStore = useUserStore()
     if (to.meta.requiresAuth && !userStore.isLoggedIn) {
       await userStore.fetchUserInfo()
       if (!userStore.isLoggedIn) {
         next('/login')
         return
       }
     }
     next()
   })
   ```

通过以上配置，你可以在 Vue 3 项目中实现完整的路由功能，包括基础导航、动态路由、权限控制、性能优化等。Vue Router 4 与 Vue 3 的组合式 API 深度集成，使路由逻辑更加清晰和易于维护。