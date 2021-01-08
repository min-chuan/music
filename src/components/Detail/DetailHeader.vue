<template>
  <Header>
    <template v-slot:left>
      <div class="header-left"
           @click.stop="back"></div>
    </template>
    <template v-slot:center>
      <div class="header-text">{{title}}</div>
    </template>
    <template v-slot:right>
      <div class="header-right"></div>
    </template>
  </Header>
</template>
<script>
import Header from '@/components/Header'
export default {
  name: 'DetailHeader',
  components: {
    Header,
  },
  props: {
    title: {
      type: String,
      default: '',
      required: true,
    },
  },
  methods: {
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
.header-text {
  @include font_size($font_medium);
  @include no-wrap();
  color: #fff;
  line-height: 100px;
}
</style>
