<template>
  <div class="header"
       @click="themeChange">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data() {
    return {
      index: 0,
      themes: ['theme', 'theme1', 'theme2'],
    }
  },
  methods: {
    themeChange() {
      let index = ++this.index
      if (index > 2) {
        index = 0
      }
      this.index = index
      document.documentElement.setAttribute('data-theme', this.themes[index])
    },
  },
}
</script>
<style scoped lang="scss">
@import '~@/assets/css/mixin.scss';
@import '~@/assets/css/variable.scss';
.header {
  @include bg_color();
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  padding: 0 10px;
  box-sizing: border-box;
  .left,
  .right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
  }
}
</style>
