<template>
  <transition appear
              name="change">
    <div class='account'>
      <AccountHeader :switchNumber.sync="switchNumber"></AccountHeader>
      <AccountBottom :songs="songs"></AccountBottom>
    </div>
  </transition>

</template>
<script>
import { mapGetters } from 'vuex'
import AccountHeader from '@/components/Account/AccountHeader'
import AccountBottom from '@/components/Account/AccountBottom'

export default {
  name: 'Account',
  components: {
    AccountHeader,
    AccountBottom,
  },
  data() {
    return {
      switchNumber: 0,
    }
  },
  computed: {
    ...mapGetters(['favoriteList', 'historyList']),
    songs() {
      return this.switchNumber === 0 ? this.favoriteList : this.historyList
    },
  },
}
</script>
<style lang='scss'>
@import '~@/assets/css/variable.scss';
@import '~@/assets/css/mixin.scss';
.account {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
}
.change-enter,
.change-leave-to {
  transform: translateX(100%);
}
.change-enter-active,
.change-leave-active {
  transition: all 1s;
}
</style>
