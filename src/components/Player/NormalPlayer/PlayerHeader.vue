<template>
  <div class="header">
    <div class="header-left"
         @click="hideDefault"></div>
    <div class="header-text">
      <h3>{{currentSong.name}}</h3>
      <p>{{currentSong.author}}</p>
    </div>
    <div class="header-right"></div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'PlayerHeader',
  computed: {
    ...mapGetters(['currentSong']),
  },
  methods: {
    ...mapActions(['setFullScreen', 'setMiniPlayer']),
    hideDefault() {
      // this.setFullScreen(false)
      this.setMiniPlayer(true)
    },
  },
}
</script>
<style scoped lang="scss">
@import '~@/assets/css/mixin.scss';
@import '~@/assets/css/variable.scss';
.header {
  position: relative;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  padding: 0 10px;
  box-sizing: border-box;
  &-left,
  &-right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
  }
  &-left {
    @include bg_img('~@/assets/images/down');
  }
  &-right {
    // @include bg_img('~@/assets/images/more');
  }
  &-text {
    width: 60%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: #fff;
    @include font_size($font_medium);
    @include no-wrap();
  }
}
</style>
