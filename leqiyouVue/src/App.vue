<template>
  <div id="app">
    <Head/>
    <router-view v-if="$route.meta.keepAlive=='no'"></router-view>
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive!='no'"></router-view>
    </keep-alive>
    <Bot v-if="botnav"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Head from '@/components/header/head'
import Bot from '@/components/header/bot'
export default {
  name: 'App',
  computed:mapState(['botnav']),
  components:{
    Head,Bot
  }
}
</script>

<style lang="scss">
#app{
  width:7.5rem;
  height:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: .28rem;
  line-height: .48rem;
  color:#333;
}
</style>
