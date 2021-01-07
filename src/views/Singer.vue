<template>
  <div class="singer">
    <div class="singer-wrapper">
      <ScrollView ref="scrollView"
                  @scorll="onScroll">
        <ul class="wrapper">
          <li class="block"
              ref="block"
              v-for="(singerList, index) in list"
              :key="index">
            <h4 class="key">{{keys[index]}}</h4>
            <ul class="list">
              <li class="item"
                  v-for="singer in singerList"
                  :key="singer.id"
                  @click.stop="jump(singer.id)">
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
            :data-index="index"
            @touchstart.stop.prevent="onTouchStart"
            @touchmove.stop.prevent="onTouchMove"
            :key="item">{{item}}</li>
      </ul>
      <div class="fix-title"
           ref="fixTitle"
           v-show="fixTitle">{{fixTitle}}</div>
    </div>
    <transition name="change">
      <router-view></router-view>
    </transition>
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
  mounted() {
    this.$refs.scrollView.scrolling(this.onScroll)
  },
  methods: {
    jump(id) {
      console.log(id)
      this.$router.push(`/singer/detail/singer/${id}`)
    },
    onScroll(y) {
      this.scrollY = y
      // 处理第一个区域
      if (-y <= 0) {
        this.currentIndex = 0
        this.fixTitle = ''
        return
      }
      // 处理中间区域
      for (let i = 0; i < this.blockTops.length - 1; i++) {
        const preTop = this.blockTops[i]
        const nextTop = this.blockTops[i + 1]
        if (-y >= preTop && -y <= nextTop) {
          this.currentIndex = i
          this.fixTitle = this.keys[i]
          // 1.用下一组标题的偏移位 + 当前滚动出去的偏移位
          const diffOffsetY = nextTop + y
          let fixTitleOffsetY = 0
          // 2.判断计算的结果是否是 0 ~ 分组标题高度的值
          if (diffOffsetY >= 0 && diffOffsetY <= this.fixTitleHeight) {
            // 满足条件开始移动上一组标题
            fixTitleOffsetY = diffOffsetY - this.fixTitleHeight
          } else {
            // 不满足条件需要固定在顶部
            fixTitleOffsetY = 0
          }
          // if (fixTitleOffsetY === this.fixTitleOffsetY) {
          //   return
          // }
          // this.fixTitleOffsetY = fixTitleOffsetY
          this.$refs.fixTitle.style.transform = `translateY(${fixTitleOffsetY}px)`
          return
        }
      }
      // 处理最后一个区域
      this.$refs.fixTitle.style.transform = `translateY(${0}px)`
      this.currentIndex = this.blockTops.length - 1
      this.fixTitle = this.keys[this.blockTops.length - 1]
    },
    onTouchStart(e) {
      this.clickKey(+e.target.dataset.index)
      this.beginY = e.touches[0].pageY
    },
    onTouchMove(e) {
      const offsetY = e.touches[0].pageY - this.beginY
      const offsetIndex = Math.floor(offsetY / e.target.offsetHeight)
      let index = parseInt(e.target.dataset.index) + offsetIndex
      if (index < 0) {
        index = 0
      } else if (index > this.blockTops.length - 1) {
        index = this.blockTops.length - 1
      }
      this.clickKey(index)
    },
    clickKey(index) {
      this.$refs.scrollView.scrollTo(0, -this.blockTops[index], 100)
      this.currentIndex = index
    },
  },
  watch: {
    // scrollY(newVal, oldVal) {
    //   if (-newVal <= 0) {
    //     this.fixTitle = ''
    //     return
    //   }
    //   for (let i = 0; i < this.blockTops - 1; i++) {}
    // },
    list(newVal, oldVal) {
      this.$nextTick(() => {
        this.blockTops = this.$refs.block.map((item) => {
          return item.offsetTop
        })
      })
    },
    fixTitle() {
      this.$nextTick(() => {
        this.fixTitleHeight = this.$refs.fixTitle.offsetHeight
      })
    },
  },
  data() {
    return {
      keys: [],
      list: [],
      currentIndex: 0,
      blockTops: [],
      beginY: 0,
      scrollY: 0,
      fixTitle: '',
    }
  },
}
</script>
<style scoped lang="scss">
@import '~@/assets/css/variable';
@import '~@/assets/css/mixin';
.singer {
  width: 100%;
  height: 100%;
  .singer-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 184px;
    bottom: 0;
    overflow: hidden;
    @include bg_sub_color();
    .fix-title {
      position: absolute;
      top: 0px;
      left: 0;
      right: 0;
      padding: 10px 20px;
      @include bg_color();
      @include font_size($font_medium);
      color: #fff;
    }
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
        // padding-bottom: 5px;
        &.active {
          text-shadow: 0 0 10px #000;
        }
      }
    }
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
