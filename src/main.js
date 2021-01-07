import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import Loading from './plugin/loading/index'
import '@/assets/css/base.scss'

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('./assets/images/loading.png')
})

Vue.use(Loading, {
  title: '正在加载...'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
