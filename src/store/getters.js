export default {
  isFullScreen: (state) => {
    return state.isFullScreen
  },
  isShowMiniPlayer: (state) => {
    return state.isShowMiniPlayer
  },
  isShowListPlayer: (state) => {
    return state.isShowListPlayer
  },
  isPlaying: (state) => {
    return state.isPlaying
  },
  model: (state) => {
    return state.model
  },
  songs: (state) => {
    return state.songs
  },
  currentSong: (state) => {
    let currentSong = {
      id: '',
      name: '',
      author: '',
      picUrl: '',
      url: ''
    }
    if (state.songs.length) {
      currentSong = state.songs[state.currentIndex]
    }
    return currentSong
  },
  currentIndex: (state) => {
    return state.currentIndex
  },
  lyric: (state) => {
    return state.lyric
  }
}
