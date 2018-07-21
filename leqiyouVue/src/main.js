// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import store from './store'
import router from './router'
import axios from 'axios';
import VueViewload from 'vue-viewload'
import rem from './assets/js/rem'
import './assets/css/base.css'
import './assets/css/my-minit.scss'
// Vue.use(mint,{
//   lazyload: {
//     preLoad: 1.5,
//     error: '',
//     loading: '',
//     attempt: 3,
//     listenEvents:['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove']
//   }
// })
Vue.use(mint)
Vue.use(VueViewload,{
  threshold:-200,
  effectFadeIn: true
})



Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.directive('back',{//自定义全局指令
  bind(el){
    el.style.border='1px solid blue'
  }
})
/* eslint-disable no-new */
var app=new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
