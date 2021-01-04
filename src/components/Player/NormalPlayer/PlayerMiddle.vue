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
      <swiper-slide class="lyric">
        <ScrollView>
          <ul>
            <li v-for="(item, index) in lyric"
                :key="index">{{item}}</li>
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
    ...mapGetters(['isPlaying', 'currentSong', 'lyric']),
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
        text-align: center;
        li {
          @include font_size($font_medium);
          @include font_color();
          margin-top: 20px;
          &:last-child {
            padding-bottom: 100px;
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
