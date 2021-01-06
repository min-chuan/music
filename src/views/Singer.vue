<template>
  <div class="singer">
    <ScrollView ref="scrollView">
      <ul class="wrapper">
        <li class="block"
            ref="block"
            v-for="(singerList, index) in list"
            :key="index">
          <h4 class="key">{{keys[index]}}</h4>
          <ul class="list">
            <li class="item"
                v-for="singer in singerList"
                :key="singer.id">
              <img v-lazy="singer.picUrl"
                   alt="">
              <span>{{singer.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </ScrollView>
    <ul class="bar">
      <li :class="{active: currentIndex === index}"
          v-for="(item, index) in keys"
          @click="clickKey(index)"
          :key="item">{{item}}</li>
    </ul>
  </div>
</template>
<script>
import { getAllLetterSinger } from '@/api'
import ScrollView from '@/components/ScrollView'
export default {
  name: 'Singer',
  components: {
    ScrollView,
  },
  async created() {
    await getAllLetterSinger().then((obj) => {
      this.keys = obj.keys
      this.list = obj.list
    })
  },
  methods: {
    clickKey(index) {
      this.$refs.scrollView.scrollTo(0, -this.blockTops[index], 100)
      this.currentIndex = index
    },
  },
  watch: {
    list(newVal, oldVal) {
      this.$nextTick(() => {
        this.blockTops = this.$refs.block.map((item) => {
          return item.offsetTop
        })
      })
    },
  },
  data() {
    return {
      keys: [],
      list: [],
      currentIndex: 0,
      blockTops: [],
    }
  },
}
</script>
<style scoped lang="scss">
@import '~@/assets/css/variable';
@import '~@/assets/css/mixin';
.singer {
  position: fixed;
  left: 0;
  right: 0;
  top: 184px;
  bottom: 0;
  overflow: hidden;
  @include bg_sub_color();
  .block {
    .key {
      padding: 10px 20px;
      @include bg_color();
      @include font_size($font_medium);
      color: #fff;
    }
    .list {
      .item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 10px 20px;
        border-bottom: 1px solid #ccc;
        @include font_color();
        @include font_size($font_medium);
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin-right: 20px;
        }
      }
    }
  }
  .bar {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    text-align: center;
    @include font_color();
    @include font_size($font_medium_s);
    li {
      margin-bottom: 5px;
      &.active {
        text-shadow: 0 0 10px #000;
      }
    }
  }
}
</style>
