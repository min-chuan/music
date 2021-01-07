<template>
  <div class="search">
    <div class="search-wrapper">
      <div class="search-input">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg=="
             alt="">
        <input type="text"
               v-model="keywords"
               v-throttle="search">
      </div>
      <div class="search-list-wrapper"
           v-show="keywords">
        <ScrollView>
          <ul class="search-list">
            <li v-for="value in songs"
                :key="value.id"
                class="item"
                @click.stop="play(value)">
              <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg=="
                   alt="">
              <span>{{value.name}} - {{value.artists[0].name}}</span>
            </li>
          </ul>
        </ScrollView>
      </div>
      <div class="search-hot">
        <div class="hot-top">
          <h3>热门搜索</h3>
        </div>
        <div class="hot-bottom">
          <ul class="hot-list">
            <li v-for="item in hotList"
                :key="item.first"
                class="hot-item"
                @click="onHotClick(item.first)">{{item.first}}</li>
          </ul>
        </div>
      </div>
      <div class="search-history">
        <ul class="history-list">
          <li v-for="item in historySearch"
              :key="item"
              class="history-item"
              @click.stop="onHotClick(item)">
            <div class="history-left">
              <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+"
                   alt="">
              <span>{{item}}</span>
            </div>
            <div class="history-right">
              <img @click.stop="delHistory(item)"
                   src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4="
                   alt="">
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import ScrollView from '@/components/ScrollView'
import { getSearchList, getHotList } from '@/api'
import { mapActions } from 'vuex'
import { setLocalStorage, getLocalStorage } from '@/tools/tools'
export default {
  name: 'Search',
  components: {
    ScrollView,
  },
  created() {
    getHotList().then((data) => {
      this.hotList = data.result.hots
    })
    // 获取历史记录
    this.historySearch = getLocalStorage('historySearch') || []
  },
  methods: {
    ...mapActions(['setFullScreen', 'setSongs']),
    delHistory(value) {
      this.historySearch = this.historySearch.filter((item) => item !== value)
      setLocalStorage('historySearch', this.historySearch)
    },
    onHotClick(keywords) {
      this.keywords = keywords
      this.search()
    },
    async play(item) {
      // 存储历史记录
      const result = this.historySearch.find((value) => value === item.name)
      if (!result) {
        this.historySearch.push(item.name)
        setLocalStorage('historySearch', this.historySearch)
      }
      // 播放
      await this.setSongs([item.id])
      this.setFullScreen(true)
      this.keywords = ''
    },
    search() {
      if (this.keywords === '') {
        return
      }
      getSearchList({ keywords: this.keywords })
        .then((data) => {
          this.songs = data.result.songs
        })
        .catch(function (err) {
          console.log(err)
        })
    },
  },
  directives: {
    throttle: {
      // 指令的定义
      inserted: function (el, obj) {
        let timerId = null
        let flag = true
        el.addEventListener('input', function () {
          if (!flag) return
          flag = false
          timerId && clearTimeout(timerId)
          timerId = setTimeout(function () {
            flag = true
            obj.value()
          }, 1000)
        })
      },
    },
  },
  data() {
    return {
      keywords: '',
      songs: '',
      hotList: [],
      historySearch: [],
    }
  },
}
</script>
<style scoped lang="scss">
@import '~@/assets/css/variable';
@import '~@/assets/css/mixin';
.search {
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
  .search-input {
    display: flex;
    align-items: center;
    margin: 40px 20px;
    height: 60px;
    border-radius: 30px;
    background-color: #ebecec;
    img {
      width: 40px;
      height: 40px;
      margin-right: 20px;
      margin-left: 20px;
    }
    input {
      border: none;
      outline: none;
      background: transparent;
      @include font_size($font_medium);
      height: 60px;
    }
  }
  .search-list-wrapper {
    position: absolute;
    top: 120px;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    @include bg_sub_color();
    .search-list {
      .item {
        display: flex;
        align-items: center;
        height: 60px;
        padding-left: 40px;
        border-bottom: 1px solid #ccc;
        img {
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }
        span {
          @include font_size($font_medium_s);
          @include font_color();
        }
      }
    }
  }
  .search-hot {
    .hot-top {
      padding: 0 20px;
      h3 {
        @include font_color();
        @include font_size($font_medium_s);
      }
    }
    .hot-bottom {
      .hot-list {
        display: flex;
        flex-wrap: wrap;
        .hot-item {
          padding: 0px 20px;
          line-height: 50px;
          border: 1px solid #ccc;
          border-radius: 25px;
          margin-left: 20px;
          margin-top: 20px;
          @include font_size($font_medium_s);
          @include font_color();
        }
      }
    }
  }
  .search-history {
    margin-top: 20px;
    .history-list {
      .history-item {
        height: 60px;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        .history-left {
          display: flex;
          align-items: center;
          img {
            width: 35px;
            height: 35px;
            margin-right: 20px;
          }
          span {
            @include font_color();
            @include font_size($font_medium_s);
          }
        }
        .history-right {
          img {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
  }
}
</style>
