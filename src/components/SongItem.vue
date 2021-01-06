<template>
  <ul class="song-list">
    <li v-for="value in songs"
        :key="value.id"
        class="item"
        @click="selectItem(value.id)">
      <img v-lazy="value.picUrl" />
      <div>
        <h3>{{value.name}}</h3>
        <p>{{value.author}}</p>
      </div>
    </li>
  </ul>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'SongItem',
  props: {
    songs: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  methods: {
    ...mapActions(['setFullScreen', 'setSongs']),
    async selectItem(id) {
      await this.setSongs([id])
      this.setFullScreen(true)
    },
  },
}
</script>
<style scoped lang='scss'>
@import '~@/assets/css/mixin.scss';
@import '~@/assets/css/variable.scss';
.song-list {
  width: 100%;
  overflow: hidden;
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
</style>
