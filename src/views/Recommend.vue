<template>
  <div>
    <Banner :banners="banners"/>
    <Personalized title="推荐歌单" :personalized="personalized"/>
  </div>
</template>
<script>
import { getBanner, getPersonalized } from '@/api/index.js'
import Banner from '@/components/Banner.vue'
import Personalized from '@/components/Personalized.vue'
export default {
  name: 'Recommend',
  components: {
    Banner,
    Personalized
  },
  data () {
    return {
      banners: [],
      personalized: []
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
      // console.log(data)
        this.personalized = data.result
      })
      .catch(function (err) {
        console.log(err)
      })
  }
}
</script>
<style scoped lang="scss">

</style>
