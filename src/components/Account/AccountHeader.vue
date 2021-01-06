<template>
  <div class="header"
       @click="themeChange">
    <div class="header-left"
         @click.stop="back"></div>
    <ul class="header-center">
      <li :class="{active: switchNumber === 0}"
          @click.stop="changeSwitchNumber(0)">我喜欢的</li>
      <li :class="{active: switchNumber === 1}"
          @click.stop="changeSwitchNumber(1)">最近听的</li>
    </ul>
    <div class="header-right"></div>
  </div>
</template>
<script>
export default {
  name: 'AccountHeader',
  props: {
    switchNumber: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  data() {
    return {
      index: 0,
      themes: ['theme', 'theme1', 'theme2'],
    }
  },
  methods: {
    changeSwitchNumber(number) {
      this.$emit('update:switchNumber', number)
    },
    themeChange() {
      let index = ++this.index
      if (index > 2) {
        index = 0
      }
      this.index = index
      document.documentElement.setAttribute('data-theme', this.themes[index])
    },
    back() {
      window.history.back()
    },
  },
}
</script>
<style scoped lang="scss">
@import '~@/assets/css/mixin.scss';
@import '~@/assets/css/variable.scss';
.header {
  @include bg_color();
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
    @include bg_img('~@/assets/images/back');
  }
  &-right {
    @include bg_img('~@/assets/images/more');
  }
  &-center {
    height: 60px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: bold;
    border: 1px solid #fff;
    border-radius: 10px;
    li {
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
      &:nth-of-type(1) {
        border-right: 1px solid #fff;
      }
      &.active {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }
  }
}
</style>
