<template>
  <div class='detail-top' ref="top">
    <div class="img-container">
      <img :src="path" alt="">
      <div class="mask" ref="mask"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DetailTop',
  methods: {
    changeScale (scale) {
      this.$refs.top.style.transform = `scale(${scale})`
    },
    changeOpacity (opacity) {
      this.$refs.mask.style.opacity = opacity
    }
  },
  props: {
    path: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>
<style scoped lang='scss'>
.detail-top{
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: relative;
  img{
    width: 100%;
  }
  .mask{
    position: absolute;
    left: 0;
    top: 0;
    background: #000;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
</style>
