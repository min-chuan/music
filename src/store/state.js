import modelType from './model-type'
export default {
  isFullScreen: false,
  isShowMiniPlayer: false,
  isShowListPlayer: false,
  isPlaying: false,
  model: modelType.loop, // 播放模式
  songs: [],
  currentIndex: 0,
  lyric: {},
}
