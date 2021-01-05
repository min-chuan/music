import {
  SET_FULL_SCREEN,
  SET_LIST_PLAYER,
  SET_MINI_PLAYER,
  SET_IS_PLAYING,
  SET_MODEL,
  SET_SONGS,
  SET_LYRIC,
  SET_DEL_SONG,
  SET_CURRENT_INDEX,
  SET_CURRENT_TIME,
  SET_TOTAL_TIME,
  SET_FAVORITE_SONG,
  SET_FAVORITE_LIST,
  SET_HISTORY_SONG,
  SET_HISTORY_LIST
} from './mutations-type'
import { getSongDetail, getLyric, getSongUrl } from '@/api'

export default {
  setFullScreen ({ commit }, flag) {
    commit(SET_FULL_SCREEN, flag)
  },
  setListPlayer ({ commit }, flag) {
    commit(SET_LIST_PLAYER, flag)
  },
  setMiniPlayer ({ commit }, flag) {
    commit(SET_MINI_PLAYER, flag)
  },
  setIsPlaying ({ commit }, flag) {
    commit(SET_IS_PLAYING, flag)
  },
  setModel ({ commit }, model) {
    commit(SET_MODEL, model)
  },
  setDelSong({ commit }, index) {
    commit(SET_DEL_SONG, index)
  },
  setCurrentIndex({ commit }, index) {
    commit(SET_CURRENT_INDEX, index)
  },
  setCurrentTime({ commit }, time) {
    commit(SET_CURRENT_TIME, time)
  },
  setTotalTime({ commit }, time) {
    commit(SET_TOTAL_TIME, time)
  },
  setFavoriteSong({ commit }, song) {
    commit(SET_FAVORITE_SONG, song)
  },
  setFavoriteList({ commit }, list) {
    commit(SET_FAVORITE_LIST, list)
  },
  setHistorySong({ commit }, song) {
    commit(SET_HISTORY_SONG, song)
  },
  setHistoryList({ commit }, list) {
    commit(SET_HISTORY_LIST, list)
  },
  async setSongs ({ commit }, ids) {
    const { songs } = await getSongDetail({ ids: ids.join(',') })
    const { data: urls } = await getSongUrl({ id: ids.join(',') })
    const formatSongs = songs.map((item, index) => {
      let author = ''
      item.ar.forEach((arItem, index) => {
        if (index === 0) {
          author = arItem.name
        } else {
          author += '-' + arItem.name
        }
      })
      let url = ''
      const findUrl = urls.filter(url => url.id === item.id)
      if (findUrl) {
        url = findUrl[0].url
      }
      return {
        id: item.id,
        name: item.name,
        author,
        picUrl: item.al.picUrl,
        url,
      }
    })
    commit(SET_SONGS, formatSongs)
    commit(SET_CURRENT_INDEX, 0)
  },
  async setLyric({ commit }, id) {
    const { lrc } = await getLyric({ id })
    const lyric = parseLyric(lrc.lyric)
    commit(SET_LYRIC, lyric)
  }
}

// 格式化歌词方法
function parseLyric (lrc) {
  const lyrics = lrc.split('\n')
  // [00:00.000] 作曲 : 林俊杰
  // 1.定义正则表达式提取[00:00.000]
  const reg1 = /\[\d*:\d*(\.\d*)?\]/g
  // 2.定义正则表达式提取 [00
  const reg2 = /\[\d*/i
  // 3.定义正则表达式提取 :00
  // eslint-disable-next-line no-useless-escape
  const reg3 = /\:\d*/i
  // 4.定义对象保存处理好的歌词
  const lyricObj = {}
  lyrics.forEach(function (lyric) {
    // 1.提取时间
    let timeStr = lyric.match(reg1)
    if (!timeStr) { return }
    timeStr = timeStr[0]
    // 2.提取分钟
    const minStr = timeStr.match(reg2)[0].substr(1)
    // 3.提取秒钟
    const secondStr = timeStr.match(reg3)[0].substr(1)
    // 4.合并时间, 将分钟和秒钟都合并为秒钟
    const time = parseInt(minStr) * 60 + parseInt(secondStr)
    // 5.处理歌词
    const text = lyric.replace(reg1, '').trim()
    // 6.保存数据
    lyricObj[time] = text
  })
  return lyricObj
}
