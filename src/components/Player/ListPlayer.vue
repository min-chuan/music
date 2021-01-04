<template>
  <transition @enter="enter"
              @leave="leave"
              :css="false">
    <div class='list-player'
         v-show="isShowListPlayer">
      <div class="list-top">
        <div class="top-left">
          <div class="mode loop"
               ref="model"
               @click.stop="onChangeModel"></div>
          <p>{{modelText}}</p>
        </div>
        <div class="top-right">
          <div class="del"
               @click.stop="removeAll"></div>
        </div>
      </div>
      <div class="list-middle">
        <ScrollView ref="scrollView">
          <ul>
            <li class="item"
                v-for="(item, index) in songs"
                :key="item.id"
                @click="onSelect(index)">
              <div class="item-left">
                <div :class="['play', {active: isPlaying}]"
                     @click.stop="onPlay"
                     v-if="item.id === currentSong.id"></div>
                <p>{{item.name}}</p>
              </div>
              <div class="item-right">
                <div class="favorite"></div>
                <div class="close"
                     @click.stop="remove(index)"></div>
              </div>
            </li>
          </ul>
        </ScrollView>
      </div>
      <div class="list-bottom">
        <p @click="hideList">关闭</p>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import modelType from '@/store/model-type'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import ScrollView from '@/components/ScrollView'
export default {
  name: 'ListPlayer',
  components: {
    ScrollView,
  },
  computed: {
    ...mapGetters([
      'isShowListPlayer',
      'isPlaying',
      'model',
      'songs',
      'currentSong',
    ]),
    modelText() {
      if (this.model === modelType.loop) {
        return '顺序播放'
      } else if (this.model === modelType.one) {
        return '单曲循环'
      } else {
        return '随机播放'
      }
    },
  },
  watch: {
    isShowListPlayer(newValue, oldValue) {
      if (newValue) {
        this.$refs.scrollView.refresh()
      }
    },
    model(newVal, oldVal) {
      if (newVal === modelType.loop) {
        this.$refs.model.classList.remove('random')
        this.$refs.model.classList.add('loop')
      } else if (newVal === modelType.one) {
        this.$refs.model.classList.remove('loop')
        this.$refs.model.classList.add('one')
      } else {
        this.$refs.model.classList.remove('one')
        this.$refs.model.classList.add('random')
      }
    },
  },
  methods: {
    ...mapActions([
      'setListPlayer',
      'setIsPlaying',
      'setModel',
      'setDelSong',
      'setCurrentIndex',
    ]),
    onSelect(index) {
      this.setCurrentIndex(index)
    },
    removeAll() {
      this.setDelSong()
    },
    remove(index) {
      this.setDelSong(index)
    },
    onChangeModel() {
      if (this.model === modelType.loop) {
        this.setModel(modelType.one)
      } else if (this.model === modelType.one) {
        this.setModel(modelType.random)
      } else {
        this.setModel(modelType.loop)
      }
    },
    hideList() {
      this.setListPlayer(false)
    },
    onPlay() {
      if (this.isPlaying) {
        this.setIsPlaying(false)
      } else {
        this.setIsPlaying(true)
      }
    },
    enter(el, done) {
      Velocity(el, 'transition.perspectiveUpIn', { duration: 300 }, () => {
        done()
      })
    },
    leave(el, done) {
      Velocity(el, 'transition.perspectiveUpOut', { duration: 300 }, () => {
        done()
      })
    },
  },
}
</script>
<style scoped lang='scss'>
@import '~@/assets/css/variable.scss';
@import '~@/assets/css/mixin.scss';
.list-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  @include bg_sub_color();
  .list-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 84px;
    padding: 0 20px;
    box-sizing: border-box;
    .top-left {
      display: flex;
      align-items: center;
      .mode {
        width: 56px;
        height: 56px;
        margin-right: 20px;
        &.loop {
          @include bg_img('~@/assets/images/small_loop');
        }
        &.one {
          @include bg_img('~@/assets/images/small_one');
        }
        &.random {
          @include bg_img('~@/assets/images/small_shuffle');
        }
      }
      p {
        @include font_size($font_medium);
        @include font_color();
      }
    }
    .top-right {
      margin-right: -10px;
      .del {
        width: 84px;
        height: 84px;
        @include bg_img('~@/assets/images/small_del');
      }
    }
  }
  .list-middle {
    height: 700px;
    overflow: hidden;
    ul {
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 84px;
        padding: 0 20px;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
        &:last-child {
          border-bottom: none;
        }
        .item-left {
          display: flex;
          align-items: center;
          .play {
            width: 56px;
            height: 56px;
            margin-right: 20px;
            @include bg_img('~@/assets/images/small_play');
            &.active {
              @include bg_img('~@/assets/images/small_pause');
            }
          }
          p {
            @include font_size($font_medium_s);
            @include font_color();
          }
        }
        .item-right {
          display: flex;
          align-items: center;
          .favorite {
            width: 56px;
            height: 56px;
            margin-right: 20px;
            @include bg_img('~@/assets/images/small_un_favorite');
          }
          .close {
            width: 56px;
            height: 56px;
            @include bg_img('~@/assets/images/small_close');
          }
        }
      }
    }
  }
  .list-bottom {
    width: 100%;
    height: 84px;
    line-height: 84px;
    text-align: center;
    color: #fff;
    @include font_size($font_medium);
    @include bg_color();
  }
}
</style>
