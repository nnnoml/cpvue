import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'

import Home from './components/Home.vue'
import About from './components/About.vue'
import Calc from './components/Calc.vue'
import Main from './components/Main.vue'

import axios from 'axios'

Vue.prototype.$http = axios;

Vue.prototype.HOST = '/api';

Vue.use(VueRouter)

Vue.use(ElementUI)

const routes = [ //定义路由
  { path: '/', component: Home},
  { path: '/about',component: About},
  { path: '/calc',component: Calc},
  { path: '/main',component: Main}
]

const router = new VueRouter({//创建路由实例
  routes
})


Vue.prototype.getCookie = function(c_name)
{
    if (document.cookie.length>0)
    {
    var c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1)
        { 
            c_start=c_start + c_name.length+1 
            var c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
return 0
}

Vue.prototype.setCookie = function(c_name,value,expiredays)
{
    document.cookie='cookieName=cookieValue;expires=expireDate;path=/'
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : "; expires="+exdate.toGMTString())
}


new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')


