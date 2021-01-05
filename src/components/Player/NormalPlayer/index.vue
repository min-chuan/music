<template>
  <transition @enter="enter"
              @leave="leave"
              :css="false">
    <div class="normal-player"
         v-show="isFullScreen">
      <div class="player-wrapper">
        <PlayerHeader />
        <PlayerMiddle />
        <PlayerBottom @setProgress="(val) => $emit('setProgress', val)" />
      </div>
      <div class="player-bg">
        <img :src="currentSong.picUrl" />
      </div>
    </div>
  </transition>

</template>
<script>
import PlayerHeader from '@/components/Player/NormalPlayer/PlayerHeader.vue'
import PlayerMiddle from '@/components/Player/NormalPlayer/PlayerMiddle.vue'
import PlayerBottom from '@/components/Player/NormalPlayer/PlayerBottom.vue'
import { mapGetters, mapActions } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: 'NormalPlayer',
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom,
  },
  computed: {
    ...mapGetters(['isFullScreen', 'currentSong']),
  },
  watch: {
    currentSong(newVal, oldVal) {
      if (newVal.id) {
        this.setLyric(newVal.id)
      }
    },
  },
  methods: {
    ...mapActions(['setLyric']),
    enter(el, done) {
      Velocity(el, 'transition.shrinkIn', { duration: 300 }, () => {
        done()
      })
    },
    leave(el, done) {
      Velocity(el, 'transition.shrinkOut', { duration: 300 }, () => {
        done()
      })
    },
  },
}
</script>
<style scoped lang="scss">
@import '~@/assets/css/variable.scss';
@import '~@/assets/css/mixin.scss';
.normal-player {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
  .player-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 999;
  }
  .player-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    img {
      height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      filter: blur(10px);
    }
  }
}
</style>
