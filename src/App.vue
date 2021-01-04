<template>
  <div id="app" class="aaa">
    <div>
      <Header />
      <Tabbar />
      <router-view />
    </div>
    <Player />
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Tabbar from '@/components/Tabbar.vue'
import Player from '@/views/Player'
export default {
  name: 'App',
  components: {
    Header,
    Tabbar,
    Player
  }
}
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
