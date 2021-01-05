<template>
  <div class='player-middle'>
    <swiper :options="swiperOption"
            class="banner">
      <!-- slides -->
      <swiper-slide class="cd">
        <div class="img"
             ref="cdImg">
          <img :src="currentSong.picUrl" />
        </div>
        <p>{{firstLyric}}</p>
      </swiper-slide>
      <swiper-slide class="lyric"
                    ref="lyric">
        <ScrollView ref="scrollView">
          <ul>
            <li :class="{active: currentLineNum === key}"
                v-for="(item, key) in lyric"
                :key="key">{{item}}</li>
          </ul>
        </ScrollView>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"
           slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ScrollView from '@/components/ScrollView.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'PlayerMiddle',
  components: {
    swiper,
    swiperSlide,
    ScrollView,
  },
  computed: {
    ...mapGetters(['isPlaying', 'currentSong', 'lyric', 'currentTime']),
    firstLyric() {
      const keys = Object.keys(this.lyric)
      return this.lyric[keys[0]]
    },
  },
  watch: {
    isPlaying(newVal, oldVal) {
      if (newVal) {
        this.$refs.cdImg.classList.add('active')
      } else {
        this.$refs.cdImg.classList.remove('active')
      }
    },
    lyric(newVal, oldVal) {
      console.log('newVal', newVal)
      for (const key in newVal) {
        this.currentLineNum = key
        return
      }
    },
    currentTime(newVal, oldVal) {
      // 1.高亮歌词同步
      const lineNum = Math.floor(newVal)
      this.currentLineNum = this.getActiveLineNum(lineNum)
      // 2.歌词滚动同步
      const currentLyricTop = document.querySelector('.lyric .active').offsetTop
      const lyricHeight = this.$refs.lyric.$el.offsetHeight
      if (currentLyricTop > lyricHeight / 2) {
        this.$refs.scrollView.scrollTo(
          0,
          lyricHeight / 2 - currentLyricTop,
          100
        )
      } else {
        this.$refs.scrollView.scrollTo(0, 0, 100)
      }
    },
  },
  methods: {
    getActiveLineNum(lineNum) {
      if (lineNum < 0) {
        return this.currentLineNum
      }
      const result = this.lyric[lineNum + '']
      if (result === undefined || result === '') {
        lineNum--
        return this.getActiveLineNum(lineNum)
      } else {
        return lineNum + ''
      }
    },
  },
  data() {
    return {
      swiperOption: {
        // 如果需要分页器
        pagination: {
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active',
          el: '.swiper-pagination',
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
      },
      currentLineNum: '0',
    }
  },
}
</script>
<style scoped lang='scss'>
@import '~@/assets/css/variable.scss';
@import '~@/assets/css/mixin.scss';
.player-middle {
  .banner {
    position: fixed;
    top: 84px;
    left: 0;
    right: 0;
    bottom: 220px;
    .cd {
      div {
        margin: 100px auto;
        width: 500px;
        height: 500px;
        border-radius: 50%;
        overflow: hidden;
        border: 30px solid #fff;
        animation: rotate 3s linear infinite;
        animation-play-state: paused;
        &.active {
          animation-play-state: running;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      p {
        @include font_size($font_medium);
        @include font_color();
        text-align: center;
      }
    }
    .lyric {
      ul {
        position: relative;
        text-align: center;
        padding-bottom: 70%;
        li {
          @include font_size($font_medium);
          @include font_color();
          margin-top: 20px;
          &.active {
            color: #fff;
          }
        }
      }
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
<style lang="scss">
@import '~@/assets/css/mixin.scss';
.my-bullet {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: #fff;
  margin: 0 20px;
}
.my-bullet-active {
  width: 60px;
  @include bg_color();
}
</style>
