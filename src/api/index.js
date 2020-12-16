import Network from './network.js'

export const getBanner = () => Network.get('banner?type=2')
export const getPersonalized = () => Network.get('personalized?limit=6')
export const getNewSong = () => Network.get('personalized/newsong')
export const getNewAlbum = () => Network.get('album/newest')
