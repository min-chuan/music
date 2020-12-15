<template>
  <div class="header" @click="themeChange">
    <div class="header-left"></div>
    <div class="header-text">知播渔音乐</div>
    <div class="header-right"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      index: 0,
      themes: ['theme', 'theme1', 'theme2']
    }
  },
  method: {
    themeChange: () => {
      let index = this.index++
      if (index > 2) {
        index = 0
      }
      this.index = index
      document.documentElement.setAttribute('data-theme', this.themes[index])
    }
  }
}
</script>
<style scoped lang="scss">
.header {
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
    background-color: #000;
  }
  &-text {
    line-height: 100px;
  }
}
</style>
