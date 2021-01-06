<template>
  <div class='song'>
    <div class="song-top">
      <h3>最新音乐</h3>
    </div>
    <SongItem :songs="songs" />
  </div>
</template>
<script>
import SongItem from '@/components/SongItem'
export default {
  name: 'SongList',
  components: {
    SongItem,
  },
  props: {
    songs: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
}
</script>
<style scoped lang='scss'>
@import '~@/assets/css/mixin.scss';
@import '~@/assets/css/variable.scss';
.song {
  @include bg_sub_color();
  .song-top {
    @include bg_sub_color();
    width: 100%;
    height: 84px;
    line-height: 84px;
    border-bottom: 1px solid #ccc;
    padding: 0 20px;
    h3 {
      @include font_size($font_large);
      @include font_color();
      font-weight: bold;
    }
  }
}
</style>
