import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const Recommend = (resolve) => {
  import('@/views/Recommend').then((module) => {
    resolve(module)
  })
}

const Search = (resolve) => {
  import('@/views/Search').then((module) => {
    resolve(module)
  })
}

const Rank = (resolve) => {
  import('@/views/Rank').then((module) => {
    resolve(module)
  })
}

const Singer = (resolve) => {
  import('@/views/Singer').then((module) => {
    resolve(module)
  })
}

const Detail = (resolve) => {
  import('@/views/Detail').then((module) => {
    resolve(module)
  })
}

const Test = (resolve) => {
  import('@/views/Test').then((module) => {
    resolve(module)
  })
}

const Account = (resolve) => {
  import('@/views/Account').then((module) => {
    resolve(module)
  })
}

Vue.use(VueRouter)

const routes = [
  { path: '/test', component: Test },
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: 'detail/:type/:id/',
        component: Detail
      }
    ]
  },
  {
    path: '/rank',
    component: Rank,
    children: [
      {
        path: 'detail/:type/:id/',
        component: Detail
      }
    ]
  },
  { path: '/search', component: Search },
  { path: '/account', component: Account },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: 'detail/:type/:id/',
        component: Detail
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
