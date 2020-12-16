import Vue from 'vue'
import VueRouter from 'vue-router'

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

Vue.use(VueRouter)

const routes = [
  { path: '/singer', component: Singer },
  { path: '/rank', component: Rank },
  { path: '/search', component: Search },
  { path: '/recommend', component: Recommend }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
