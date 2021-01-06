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
export const getHotSingers = (data) => {
  return new Promise((resolve, reject) => {
    Network.get('top/artists?offset=0&limit=5')
      .then((result) => {
        resolve(result.artists)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
export const getLetterSingers = (letter) => {
  return new Promise((resolve, reject) => {
    Network.all([
      Network.get(`artist/list?type=-1&area=7&limit=5&initial=${letter}`),
      Network.get(`artist/list?type=-1&area=96&limit=5&initial=${letter}`),
      Network.get(`artist/list?type=-1&area=8&limit=5&initial=${letter}`),
      Network.get(`artist/list?type=-1&area=16&limit=5&initial=${letter}`),
    ])
      .then((result) => {
        const artists = []
        result.forEach(item => {
          artists.push(...item.artists)
        })
        resolve(artists)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
export const getAllLetterSinger = () => {
  return new Promise((resolve, reject) => {
    const keys = ['热']
    const list = [getHotSingers()]

    for (let i = 65; i < 91; i++) {
      const char = String.fromCharCode(i)
      keys.push(char)
      list.push(getLetterSingers(char))
    }

    Network.all(list)
      .then((result) => {
        const obj = {}
        obj.keys = keys
        obj.list = result
        resolve(obj)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
