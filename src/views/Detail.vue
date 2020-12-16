<template>
  <div class='detail'>
    <SubHeader :title="playlist.name"/>
    <DetailTop :path="playlist.coverImgUrl"/>
    <div class="bottom-wrapper">
      <DetailBottom :playlist="playlist.tracks"/>
    </div>
  </div>
</template>
<script>
import SubHeader from '@/components/SubHeader'
import DetailTop from '@/components/DetailTop'
import DetailBottom from '@/components/DetailBottom'
import { getPlayList } from '@/api/index.js'
export default {
  name: 'Detail',
  components: {
    SubHeader,
    DetailTop,
    DetailBottom
  },
  data () {
    return {
      playlist: {}
    }
  },
  created () {
    getPlayList({ id: this.$route.params.id })
      .then((data) => {
        this.playlist = data.playlist
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>
<style scoped lang='scss'>
.detail {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: red;
  .bottom-wrapper {
    position: absolute;
    top: 584px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
  }
}
</style>
