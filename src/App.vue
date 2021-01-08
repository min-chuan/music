<template>
  <div id="app"
       class="aaa">
    <div>
      <MainHeader />
      <Tabbar />
      <keep-alive include="Singer,Search">
        <router-view />
      </keep-alive>
    </div>
    <Player />
  </div>
</template>
<script>
import MainHeader from '@/components/MainHeader.vue'
import Tabbar from '@/components/Tabbar.vue'
import Player from '@/views/Player'
export default {
  name: 'App',
  components: {
    MainHeader,
    Tabbar,
    Player,
  },
}
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
