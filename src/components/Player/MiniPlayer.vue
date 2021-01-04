<template>
  <transition @enter="enter"
              @leave="leave"
              :css="false">
    <div class='mini-player'
         v-show="isShowMiniPlayer">
      <div class="bottom-left">
        <img :src="currentSong.picUrl"
             alt=""
             @click="showDefault"
             class="cd-img"
             ref="cdImg">
        <div>
          <h3>{{currentSong.name}}</h3>
          <p>{{currentSong.author}}</p>
        </div>
      </div>
      <div class="bottom-right">
        <div class="play"
             ref="play"
             @click="onPlay"></div>
        <div class="list"
             @click="showList"></div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: 'MiniPlayer',
  computed: {
    ...mapGetters(['isShowMiniPlayer', 'isPlaying', 'currentSong']),
  },
  watch: {
    isPlaying(newVal, oldVal) {
      if (newVal) {
        this.$refs.play.classList.add('active')
        this.$refs.cdImg.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
        this.$refs.cdImg.classList.remove('active')
      }
    },
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'setListPlayer',
      'setIsPlaying',
    ]),
    onPlay() {
      if (this.isPlaying) {
        this.setIsPlaying(false)
      } else {
        this.setIsPlaying(true)
      }
    },
    enter(el, done) {
      Velocity(el, 'transition.bounceUpIn', { duration: 300 }, () => {
        done()
      })
    },
    leave(el, done) {
      Velocity(el, 'transition.bounceDownOut', { duration: 300 }, () => {
        done()
      })
    },
    showDefault() {
      this.setFullScreen(true)
    },
    showList() {
      this.setListPlayer(true)
    },
  },
}
</script>
<style scoped lang='scss'>
@import '~@/assets/css/mixin.scss';
@import '~@/assets/css/variable.scss';
.mini-player {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px;
  padding-left: 20px;
  overflow: hidden;
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  @include bg_color();
  .bottom-left {
    float: left;
    margin-top: 20px;
    // display: flex;
    img {
      width: 84px;
      height: 84px;
      border-radius: 50%;
      margin-right: 10px;
    }
    div {
      @include font_color();
      display: inline-block;
      // display: flex;
      // flex-direction: column;
      // align-items: center;
      h3 {
        @include font_size($font_medium);
      }
      p {
        @include font_size($font_medium);
      }
    }
    .cd-img {
      animation: rotate 3s linear infinite;
      animation-play-state: paused;
      &.active {
        animation-play-state: running;
      }
    }
  }
  .bottom-right {
    // display: flex;
    // align-items: center;
    float: right;
    .play {
      display: inline-block;
      width: 84px;
      height: 84px;
      position: relative;
      top: -16px;
      @include bg_img('~@/assets/images/play');
      &.active {
        @include bg_img('~@/assets/images/pause');
      }
    }
    .list {
      display: inline-block;
      width: 120px;
      height: 120px;
      @include bg_img('~@/assets/images/list');
    }
  }
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
