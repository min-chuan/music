<template>
  <div class='song'>
    <div class="song-top">
      <h3>最新音乐</h3>
    </div>
    <ul class="song-list">
      <li v-for="value in songs" :key="value.id" class="item">
        <img :src="value.picUrl"/>
        <div>
          <h3>{{value.name}}</h3>
          <p>{{value.song.artists[0].name}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'SongList',
  props: {
    songs: {
      type: Array,
      default: () => [],
      required: true
    }
  }
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
    h3{
      @include font_size($font_large);
      @include font_color();
      font-weight: bold;
    }
  }
  .song-list {
    .item {
      display: flex;
      align-items: center;
      padding: 0 20px;
      height: 200px;
      img {
        width: 150px;
        height: 150px;
        margin-right: 20px;
        border-radius: 20px;
      }
      div {
        @include font_color();
        h3 {
          @include font_size($font_large);
        }
        p {
          @include font_size($font_medium);
          margin-top: 20px;
          opacity: 0.6;
        }
      }
    }

  }
}
</style>
