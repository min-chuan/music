<template>
  <div class='detail'>
    <DetailHeader :title="playlist.name" />
    <DetailTop :path="playlist.coverImgUrl"
               ref="top" />
    <div class="bottom-wrapper">
      <ScrollView ref="scrollView">
        <DetailBottom :playlist="playlist.tracks" />
      </ScrollView>
    </div>
  </div>
</template>
<script>
import DetailHeader from '@/components/Detail/DetailHeader'
import DetailTop from '@/components/Detail/DetailTop'
import DetailBottom from '@/components/Detail/DetailBottom'
import ScrollView from '@/components/ScrollView'
import { getPlayList, getAlbum, getSingerSongs } from '@/api/index.js'
export default {
  name: 'Detail',
  components: {
    DetailHeader,
    DetailTop,
    DetailBottom,
    ScrollView,
  },
  data() {
    return {
      playlist: {},
    }
  },
  created() {
    const { type, id } = this.$route.params
    if (type === 'songs' || type === 'rank') {
      getPlayList({ id })
        .then((data) => {
          this.playlist = data.playlist
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (type === 'albums') {
      getAlbum({ id })
        .then((data) => {
          this.playlist = {
            name: data.album.name,
            coverImgUrl: data.album.picUrl,
            tracks: data.songs,
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (type === 'singer') {
      getSingerSongs({ id }).then((data) => {
        this.playlist = {
          name: data.artist.name,
          coverImgUrl: data.artist.picUrl,
          tracks: data.hotSongs,
        }
      })
    }
  },
  mounted() {
    this.$refs.scrollView.scrolling((offsetY) => {
      const defaultHeight = this.$refs.top.$el.offsetHeight
      if (offsetY < 0) {
        const opacity = Math.abs(offsetY) / defaultHeight
        this.$refs.top.changeOpacity(opacity)
      } else {
        const scale = 1 + offsetY / defaultHeight
        this.$refs.top.changeScale(scale)
      }
    })
  },
}
</script>
<style scoped lang='scss'>
.detail {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  .bottom-wrapper {
    position: absolute;
    top: 484px;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
