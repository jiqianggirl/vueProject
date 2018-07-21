import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
const router=new Router({
  routes: [
    {
      path: '/index_home',
      name: 'index_home',
      component: require('../components/index_home.vue').default,
      alias:'/'
    },
    {
      path:'/search',
      name:'search',
      component:require('@/components/search').default
    },
    {
      path:'/mine_history',
      name:'mine_history',
      component:require('@/components/mine_history').default
    },
    {
      path:'/mine_message',
      name:'mine_message',
      component:require('@/components/mine_message').default
    },
    {
      path:'/detail',
      name: 'detail',
      component: require('@/components/detail').default,
      meta: {
        keepAlive:'no' // 不需要被缓存
      }
    },
    {
      path:'/detail_zb',
      name: 'detail_zb',
      component: require('@/components/detail_zb').default
    },
    {
      path:'/list',
      name: 'list',
      component: require('@/components/list').default,
      meta: {
        keepAlive:'no' // 不需要被缓存
      }
    },
    {
      path:'/index_live',
      name: 'index_live',
      component: require('@/components/index_live').default
    },
    
    {
      path:'/index_db',
      name: 'index_db',
      component: require('@/components/index_db').default
    },
    {
      path:'/index_mine',
      name: 'index_mine',
      component: require('@/components/index_mine').default
    },
    {
      path:'/classify',
      name: 'classify',
      component: require('@/components/classify').default
    },
    {
      path:'/channel_back',
      name: 'channel_back',
      component: require('@/components/channel_back').default
    },

    {
      path: '*',
      redirect:'/'
    }
  ]
})
router.beforeEach(function (to,from,next) {
  switch(to.name){
    case 'index_home': case 'index_db': case 'index_mine':
    router.app.$store.commit('setheadNav','indexhead');break;
    default:
      router.app.$store.commit('setheadNav','')
  }

  if(to.name.indexOf('index_')>=0){
    router.app.$store.commit('setbotNav',to)
  }else{
    router.app.$store.commit('setbotNav',false);
  }
  next()
})
export default router
