<template>
  <div class="recommend">
    <div class="recommend-wrapper">
      <ScrollView>
        <div>
          <Banner :banners="banners" />
          <Personalized title="推荐歌单"
                        type="songs"
                        @select="fatherSelectItem"
                        :personalized="personalized" />
          <Personalized title="最新专辑"
                        type="albums"
                        @select="fatherSelectItem"
                        :personalized="albums" />
          <SongList :songs="songs" />
        </div>
      </ScrollView>
    </div>
    <transition name="change">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import {
  getBanner,
  getPersonalized,
  getNewAlbum,
  getNewSong,
} from '@/api/index.js'
import Banner from '@/components/Recommend/Banner.vue'
import Personalized from '@/components/Recommend/Personalized.vue'
import SongList from '@/components/Recommend/SongList.vue'
import ScrollView from '@/components/ScrollView.vue'
export default {
  name: 'Recommend',
  components: {
    Banner,
    Personalized,
    SongList,
    ScrollView,
  },
  data() {
    return {
      banners: [],
      personalized: [],
      albums: [],
      songs: [],
    }
  },
  created() {
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
        this.songs = data.result.map((item) => {
          let author = ''
          for (let i = 0; i < item.song.artists.length; i++) {
            const artist = item.song.artists[i].name
            if (i === 0) {
              author = artist
            } else {
              author += '-' + artist
            }
          }
          return {
            id: item.id,
            name: item.name,
            picUrl: item.picUrl,
            author: author,
          }
        })
      })
      .catch(function (err) {
        console.log(err)
      })
  },
  methods: {
    fatherSelectItem(type, id) {
      this.$router.push({
        path: `/recommend/detail/${type}/${id}`,
      })
    },
  },
}
</script>
<style scoped lang="scss">
.recommend {
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  .recommend-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
.change-enter,
.change-leave-to {
  transform: translateX(100%);
}
.change-enter-active,
.change-leave-active {
  transition: all 1s;
}
</style>
