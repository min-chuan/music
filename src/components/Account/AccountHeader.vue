<template>
  <Header>
    <template v-slot:left>
      <div class="header-left"
           @click.stop="back"></div>
    </template>
    <template v-slot:center>
      <ul class="header-center">
        <li :class="{active: switchNumber === 0}"
            @click.stop="changeSwitchNumber(0)">我喜欢的</li>
        <li :class="{active: switchNumber === 1}"
            @click.stop="changeSwitchNumber(1)">最近听的</li>
      </ul>
    </template>
    <template v-slot:right>
      <div class="header-right"></div>
    </template>
  </Header>
</template>
<script>
import Header from '@/components/Header'
export default {
  name: 'AccountHeader',
  components: {
    Header,
  },
  props: {
    switchNumber: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  methods: {
    changeSwitchNumber(number) {
      this.$emit('update:switchNumber', number)
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
.header-left {
  width: 100%;
  height: 100%;
  @include bg_img('../../assets/images/back');
}
.header-right {
  width: 100%;
  height: 100%;
  @include bg_img('../../assets/images/more');
}
.header-center {
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
</style>
