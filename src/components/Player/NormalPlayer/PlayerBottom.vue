<template>
  <div class='player-bottom'>
    <div class="bottom-progress">
      <span>{{currentTime | formatTime}}</span>
      <div class="progress-bar"
           @click.stop="onSetProgress"
           ref="progressBar">
        <div class="progress-line"
             :style="{width: percentage + '%'}">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span>{{totalTime | formatTime}}</span>
    </div>
    <div class="bottom-controll">
      <div class="mode loop"
           ref="model"
           @click.stop="onChangeModel"></div>
      <div class="prev"
           @click.stop="onPrev"></div>
      <div class="play"
           ref="play"
           @click.stop="onPlay"></div>
      <div class="next"
           @click.stop="onNext"></div>
      <div :class="['favorite', {active: isFavorite}]"
           @click.stop="setFavoriteSong(currentSong)"></div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import modelType from '@/store/model-type'
export default {
  name: 'PlayerBottom',
  filters: {
    formatTime(time) {
      let minutes = parseInt(time / 60)
      let seconds = parseInt(time % 60)
      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds
      return minutes + ':' + seconds
    },
  },
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setModel',
      'setCurrentIndex',
      'setFavoriteSong',
    ]),
    onSetProgress(e) {
      const currentTime =
        (e.offsetX / this.$refs.progressBar.offsetWidth) * this.totalTime
      this.$emit('setProgress', currentTime)
    },
    onPrev() {
      this.setCurrentIndex(this.currentIndex - 1)
    },
    onNext() {
      this.setCurrentIndex(this.currentIndex + 1)
    },
    onChangeModel() {
      if (this.model === modelType.loop) {
        this.setModel(modelType.one)
      } else if (this.model === modelType.one) {
        this.setModel(modelType.random)
      } else {
        this.setModel(modelType.loop)
      }
    },
    onPlay() {
      if (this.isPlaying) {
        this.setIsPlaying(false)
      } else {
        this.setIsPlaying(true)
      }
    },
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'model',
      'currentIndex',
      'currentTime',
      'totalTime',
      'currentSong',
      'favoriteList',
    ]),
    percentage() {
      return (this.currentTime / this.totalTime) * 100
    },
    isFavorite() {
      const result = this.favoriteList.find(
        (item) => item.id === this.currentSong.id
      )
      return !!result
    },
  },
  watch: {
    isPlaying(newVal, oldVal) {
      if (newVal) {
        this.$refs.play.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
      }
    },
    model(newVal, oldVal) {
      if (newVal === modelType.loop) {
        this.$refs.model.classList.remove('random')
        this.$refs.model.classList.add('loop')
      } else if (newVal === modelType.one) {
        this.$refs.model.classList.remove('loop')
        this.$refs.model.classList.add('one')
      } else {
        this.$refs.model.classList.remove('one')
        this.$refs.model.classList.add('random')
      }
    },
  },
}
</script>
<style scoped lang='scss'>
@import '~@/assets/css/mixin.scss';
@import '~@/assets/css/variable.scss';
.player-bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  @include bg_color();
  .bottom-progress {
    position: relative;
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 84px;
    .progress-bar {
      width: 60%;
      height: 10px;
      background-color: #fff;
      border-radius: 10px;
      .progress-line {
        position: relative;
        width: 0%;
        height: 100%;
        background-color: #ccc;
        .progress-dot {
          position: absolute;
          top: -50%;
          left: 100%;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #fff;
        }
      }
    }
  }
  .bottom-controll {
    width: 80%;
    margin: 0 auto;
    display: flex;
    padding: 20px 0;
    justify-content: space-between;
    align-items: center;
    div {
      width: 84px;
      height: 84px;
    }
    .mode {
      &.loop {
        @include bg_img('~@/assets/images/loop');
      }
      &.one {
        @include bg_img('~@/assets/images/one');
      }
      &.random {
        @include bg_img('~@/assets/images/shuffle');
      }
    }
    .prev {
      @include bg_img('~@/assets/images/prev');
    }
    .play {
      @include bg_img('~@/assets/images/play');
      &.active {
        @include bg_img('~@/assets/images/pause');
      }
    }
    .next {
      @include bg_img('~@/assets/images/next');
    }
    .favorite {
      @include bg_img('~@/assets/images/un_favorite');
      &.active {
        @include bg_img('~@/assets/images/favorite');
      }
    }
  }
}
</style>
