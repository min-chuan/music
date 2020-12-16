<template>
  <div>
    <Banner :banners="banners"/>
    <Personalized title="推荐歌单" :personalized="personalized"/>
    <Personalized title="最新专辑" :personalized="albums"/>
    <SongList :songs="songs"/>
  </div>
</template>
<script>
import { getBanner, getPersonalized, getNewAlbum, getNewSong } from '@/api/index.js'
import Banner from '@/components/Banner.vue'
import Personalized from '@/components/Personalized.vue'
import SongList from '@/components/SongList.vue'
export default {
  name: 'Recommend',
  components: {
    Banner,
    Personalized,
    SongList
  },
  data () {
    return {
      banners: [],
      personalized: [],
      albums: [],
      songs: []
    }
  },
  created () {
    getBanner()
      .then((data) => {
        this.banners = data.banners
      })
      .catch((e) => {
        console.log(e)
      })
    getPersonalized()
      .then((data) => {
        this.personalized = data.result
      })
      .catch(function (err) {
        console.log(err)
      })
    getNewAlbum()
      .then((data) => {
        this.albums = data.albums.slice(0, 6)
      })
      .catch(function (err) {
        console.log(err)
      })
    getNewSong()
      .then((data) => {
        this.songs = data.result
      })
      .catch(function (err) {
        console.log(err)
      })
  }
}
</script>
<style scoped lang="scss">

</style>
