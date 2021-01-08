<template>
  <Header>
    <template v-slot:left>
      <div class="header-left"></div>
    </template>
    <template v-slot:center>
      <div class="header-text">知播渔音乐</div>
    </template>
    <template v-slot:right>
      <div class="header-right"
           @click.stop="clickAccount"></div>
    </template>
  </Header>
</template>
<script>
import Header from '@/components/Header'
export default {
  name: 'MainHeader',
  components: {
    Header,
  },
  methods: {
    clickAccount() {
      this.$router.push('/account')
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
  @include bg_img('~@/assets/images/logo');
}
.header-right {
  width: 100%;
  height: 100%;
  @include bg_img('~@/assets/images/account');
}
.header-text {
  @include font_size($font_medium);
  color: #fff;
  line-height: 100px;
}
</style>
