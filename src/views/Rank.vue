<template>
  <div class="rank">
    <div class="rank-wrapper">
      <ScrollView>
        <ul class="group">
          <li v-for="(group, key) in rankList"
              :key="key"
              class="group-item">
            <h3 class="title">{{titles[key]}}</h3>
            <ul class="rank-list"
                v-if="key === 'officialList'">
              <li class="rank-item"
                  v-for="obj in rankList[key]"
                  :key="obj.id"
                  @click.stop="jump(obj.rank.id)">
                <div class="rank-left">
                  <img v-lazy="obj.rank.coverImgUrl"
                       alt="">
                  <p>{{obj.rank.updateFrequency}}</p>
                </div>
                <div class="rank-right">
                  <p v-for="(song, index) in obj.rank.tracks"
                     :key="index">
                    {{`${index}.${song.first} - ${song.second}`}}
                  </p>
                </div>
              </li>
            </ul>
            <ul v-else
                class="other-list">
              <li v-for="obj in rankList[key]"
                  :key="obj.id"
                  class="other-item"
                  @click.stop="jump(obj.rank.id)">
                <div class="other-top">
                  <img v-lazy="obj.rank.coverImgUrl"
                       alt="">
                  <p>{{obj.rank.updateFrequency}}</p>
                </div>
                <div class="other-bottom">
                  <p>{{obj.name}}</p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </ScrollView>
    </div>
    <transition name="change">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import { getTopList } from '@/api'
import ScrollView from '@/components/ScrollView'
export default {
  name: 'Rank',
  created() {
    getTopList().then((data) => {
      this.titles = data.titles
      delete data.titles
      this.rankList = data
    })
  },
  methods: {
    jump(id) {
      this.$router.push(`/rank/detail/rank/${id}`)
    },
  },
  components: {
    ScrollView,
  },
  data() {
    return {
      rankList: {},
      titles: {},
    }
  },
}
</script>
<style scoped lang="scss">
@import '~@/assets/css/variable';
@import '~@/assets/css/mixin';
.rank {
  width: 100%;
  height: 100%;
  .rank-wrapper {
    position: fixed;
    top: 184px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    @include bg_sub_color();
    .group {
      .group-item {
        .title {
          padding: 0 20px;
          font-weight: bold;
          @include font_color();
          @include font_size($font_large);
        }
        .rank-list {
          .rank-item {
            position: relative;
            display: flex;
            align-items: center;
            padding: 20px;
            .rank-left {
              img {
                width: 180px;
                height: 180px;
                border-radius: 10px;
              }
              p {
                position: absolute;
                bottom: 30px;
                left: 30px;
                color: #fff;
                @include font_size($font_medium_s);
              }
            }
            .rank-right {
              margin-left: 20px;
              p {
                @include font_size($font_medium_s);
                @include font_color();
                padding-bottom: 5px;
              }
            }
          }
        }
        .other-list {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          padding: 20px;

          .other-item {
            .other-top {
              position: relative;
              img {
                width: 200px;
                height: 200px;
                border-radius: 10px;
              }
              p {
                position: absolute;
                bottom: 10px;
                left: 10px;
                color: #fff;
                // @include font_color();
                @include font_size($font_medium_s);
              }
            }
            .other-bottom {
              width: 200px;
              @include no-wrap();
              p {
                padding: 10px 0;
                @include font_color();
                @include font_size($font_medium_s);
              }
            }
          }
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
