<template>
  <div class='account-bottom'>
    <div class="play">
      <span></span>
      <span @click.stop="onPlayAll">播放全部</span>
    </div>
    <div class="list">
      <ScrollView ref="scrollView">
        <SongItem :songs="songs" />
      </ScrollView>
    </div>
  </div>
</template>
<script>
import SongItem from '@/components/SongItem'
import ScrollView from '@/components/ScrollView'
import { mapMutations, mapActions } from 'vuex'
export default {
  name: 'AccountBottom',
  props: {
    songs: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  components: {
    SongItem,
    ScrollView,
  },
  methods: {
    ...mapMutations(['SET_SONGS']),
    ...mapActions(['setFullScreen', 'setCurrentIndex']),
    onPlayAll() {
      this.setFullScreen(true)
      this.setCurrentIndex(0)
      this.SET_SONGS(this.songs)
    },
  },
}
</script>
<style scoped lang='scss'>
@import '~@/assets/css/mixin.scss';
@import '~@/assets/css/variable.scss';
.account-bottom {
  .play {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 260px;
    height: 60px;
    margin: 20px auto;
    border: 1px solid #fff;
    @include border-color();
    border-radius: 30px;
    @include font_color();
    span {
      display: inline-block;
      &:nth-of-type(1) {
        width: 46px;
        height: 46px;
        @include bg_img('~@/assets/images/small_play');
        margin-right: 20px;
      }
    }
  }
  .list {
    position: fixed;
    top: 200px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
}
</style>
