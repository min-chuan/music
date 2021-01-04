import Network from './network.js'

export const getBanner = () => Network.get('banner?type=2')
export const getPersonalized = () => Network.get('personalized?limit=6')
export const getNewSong = () => Network.get('personalized/newsong')
export const getNewAlbum = () => Network.get('album/newest')
export const getPlayList = (data) => Network.get('playlist/detail', data)
export const getAlbum = (data) => Network.get('album', data)
export const getSongDetail = (data) => Network.get('song/detail', data)
export const getLyric = (data) => Network.get('lyric', data)
export const getSongUrl = (data) => Network.get('song/url', data)
