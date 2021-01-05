<template>
  <div class='player'>
    <NormalPlayer @setProgress="setProgress" />
    <MiniPlayer />
    <ListPlayer />
    <audio :src="currentSong.url"
           ref="audio"
           @ended="onEnd"
           @timeupdate="timeupdate"></audio>
  </div>
</template>
<script>
import NormalPlayer from '@/components/Player/NormalPlayer'
import MiniPlayer from '@/components/Player/MiniPlayer'
import ListPlayer from '@/components/Player/ListPlayer'
import { mapGetters, mapActions } from 'vuex'
import modelType from '@/store/model-type'
export default {
  name: 'Player',
  methods: {
    ...mapActions([
      'setCurrentTime',
      'setTotalTime',
      'setCurrentIndex',
      'setFavoriteList',
      'setHistorySong',
      'setHistoryList',
    ]),
    getRandomIntInclusive(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min // 含最大值，含最小值
    },
    onEnd() {
      if (this.model === modelType.loop) {
        this.setCurrentIndex(this.currentIndex + 1)
      } else if (this.model === modelType.one) {
        this.$refs.audio.play()
      } else {
        const index = this.getRandomIntInclusive(0, this.songs.length)
        this.setCurrentIndex(index)
      }
    },
    setProgress(time) {
      this.$refs.audio.currentTime = time
      this.setCurrentTime(time)
    },
    onFold() {
      this.listVisible = false
      this.normalVisible = true
    },
    timeupdate(e) {
      // 计算currentLyric
      this.setCurrentTime(e.target.currentTime)
    },
  },
  computed: {
    ...mapGetters([
      'currentSong',
      'isPlaying',
      'currentIndex',
      'currentTime',
      'model',
      'songs',
      'lyric',
      'favoriteList',
      'historyList',
    ]),
  },
  watch: {
    isPlaying(newVal, oldVal) {
      if (newVal) {
        this.setHistorySong(this.currentSong)
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    currentSong: {
      handler(newVal, oldVal) {
        if (this.isPlaying) {
          this.setHistorySong(this.currentSong)
        }
        /*
        注意点: 在iOS中系统不会自动加载歌曲, 所以oncanplay不会自动执行
                https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/AudioandVideoTagBasics/AudioandVideoTagBasics.html
                在PC端和Android端, 系统会自动加载歌曲, 所以oncanplay会自动被执行
        解决方案: 如何监听iOS中Audio的歌曲是否已经准备好了, 通过ondurationchange事件来监听
                  ondurationchange事件什么时候执行: 当歌曲加载完成之后执行, 因为只有歌曲加载完成之后才能获取到歌曲的总时长
        * */
        if (this.$refs.audio) {
          this.$refs.audio.ondurationchange = (e) => {
            this.setTotalTime(e.target.duration)
            if (this.isPlaying) {
              this.$refs.audio.play()
            } else {
              this.$refs.audio.pause()
            }
          }
        }
      },
      immediate: true,
    },
    favoriteList(newVal, oldVal) {
      window.localStorage.setItem('favoriteList', JSON.stringify(newVal))
    },
    historyList(newVal, oldVal) {
      window.localStorage.setItem('historyList', JSON.stringify(newVal))
    },
  },
  created() {
    const favoriteList = JSON.parse(window.localStorage.getItem('favoriteList'))
    this.setFavoriteList(favoriteList)
    const historyList = JSON.parse(window.localStorage.getItem('historyList'))
    this.setHistoryList(historyList)
  },
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer,
  },
}
</script>
<style scoped lang='scss'>
@import '~@/assets/css/variable.scss';
@import '~@/assets/css/mixin.scss';
.player {
  // position: fixed;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
  // z-index: 1000;
}
</style>
