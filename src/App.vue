<template>
  <div id="app" class="aaa">
    <Header />
    <Tabbar />
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Tabbar from '@/components/Tabbar.vue'
export default {
  name: 'App',
  components: {
    Header,
    Tabbar
  }
}
</script>
<style lang="scss">
#app {

}
</style>
