<template>
  <div class="tabbar">
    <router-link tag="div" class="item" to="/recommend">
      <span>推荐</span>
    </router-link>
    <router-link tag="div" class="item" to="/singer">
      <span>歌手</span>
    </router-link>
    <router-link tag="div" class="item" to="/rank">
      <span>排行</span>
    </router-link>
    <router-link tag="div" class="item" to="/search">
      <span>搜索</span>
    </router-link>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped lang="scss">
@import '~@/assets/css/mixin.scss';
@import '~@/assets/css/variable.scss';
.tabbar {
  @include bg_sub_color();
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 84px;
  line-height: 84px;
  .item {
    @include font_color();
    @include font_size($font_medium_s)
  }
  .router-link-active {
    @include font_active_color();
  }
}
</style>
