import {
  SET_FULL_SCREEN,
  SET_MINI_PLAYER,
  SET_LIST_PLAYER,
  SET_IS_PLAYING,
  SET_MODEL,
  SET_SONGS,
  SET_CURRENT_INDEX,
  SET_LYRIC,
  SET_DEL_SONG,
  SET_CURRENT_TIME,
  SET_TOTAL_TIME,
  SET_FAVORITE_LIST,
  SET_FAVORITE_SONG,
  SET_HISTORY_LIST,
  SET_HISTORY_SONG
} from './mutations-type.js'

export default {
  [SET_FULL_SCREEN] (state, flag) {
    state.isFullScreen = flag
    if (flag) {
      state.isShowListPlayer = false
      state.isShowMiniPlayer = false
    }
  },
  [SET_MINI_PLAYER](state, flag) {
    state.isShowMiniPlayer = flag
    if (flag) {
      state.isShowListPlayer = false
      state.isFullScreen = false
    }
  },
  [SET_LIST_PLAYER](state, flag) {
    state.isShowListPlayer = flag
  },
  [SET_IS_PLAYING](state, flag) {
    state.isPlaying = flag
  },
  [SET_MODEL](state, model) {
    state.model = model
  },
  [SET_SONGS](state, songs) {
    state.songs = songs
  },
  [SET_CURRENT_INDEX](state, index) {
    let currentIndex = index
    if (index < 0) {
      currentIndex = state.songs.length - 1
    } else if (index >= state.songs.length) {
      currentIndex = 0
    }
    state.currentIndex = currentIndex
  },
  [SET_LYRIC](state, lyric) {
    state.lyric = lyric
  },
  [SET_DEL_SONG](state, index) {
    if (index < state.currentIndex) {
      state.currentIndex -= 1
    }
    if (index === undefined) {
      state.songs = []
    } else {
      state.songs.splice(index, 1)
    }
    if (state.songs.length === 0) {
      state.isShowMiniPlayer = false
      state.isShowListPlayer = false
      state.isFullScreen = false
    }
  },
  [SET_CURRENT_TIME](state, time) {
    state.currentTime = time
  },
  [SET_TOTAL_TIME](state, time) {
    state.totalTime = time
  },
  [SET_FAVORITE_SONG](state, song) {
    const result = state.favoriteList.find(item => item.id === song.id)
    // 没有添加， 有删除
    if (result === undefined) {
      state.favoriteList.push(song)
    } else {
      state.favoriteList = state.favoriteList.filter(item => item.id !== song.id)
    }
  },
  [SET_FAVORITE_LIST](state, list) {
    if (list) {
      state.favoriteList = list
    }
  },
  [SET_HISTORY_SONG](state, song) {
    if (state.historyList.length === 30) {
      state.songs.shift()
    }
    state.historyList.push(song)
  },
  [SET_HISTORY_LIST](state, list) {
    if (list) {
      state.historyList = list
    }
  },
}
