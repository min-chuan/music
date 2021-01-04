<template>
  <div class='player'>
    <NormalPlayer />
    <MiniPlayer />
    <ListPlayer />
    <audio :src="currentSong.url"></audio>
  </div>
</template>
<script>
import NormalPlayer from '@/components/Player/NormalPlayer'
import MiniPlayer from '@/components/Player/MiniPlayer'
import ListPlayer from '@/components/Player/ListPlayer'
import { mapGetters } from 'vuex'
export default {
  name: 'Player',
  methods: {
    onFold: () => {
      this.listVisible = false
      this.normalVisible = true
    },
  },
  computed: {
    ...mapGetters(['currentSong']),
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
