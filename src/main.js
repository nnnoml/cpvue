import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'

import Home from './components/Home.vue'
import About from './components/About.vue'


Vue.use(VueRouter)

Vue.use(ElementUI)

const routes = [ //定义路由
  { path: '/', component: Home},
  { path: '/about',component: About}
]

const router = new VueRouter({//创建路由实例
  routes
})

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
