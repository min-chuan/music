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
export const getSingerSongs = (data) => Network.get('artists', data)
export const getTopList = () => {
  return new Promise((resolve, reject) => {
    const category = {
      officialList: [
        { name: '飙升榜', id: 0 },
        { name: '新歌榜', id: 1 },
        { name: '原创榜', id: 2 },
        { name: '热歌榜', id: 3 }
      ],
      recList: [
        { name: '云音乐说唱榜', id: 4 },
        { name: '云音乐电音榜', id: 5 },
        { name: '云音乐欧美新歌榜', id: 6 },
        { name: '抖音排行榜', id: 7 },
        { name: '云音乐ACG音乐榜', id: 8 },
        { name: '云音乐古典音乐榜', id: 9 }
      ],
      globalList: [
        { name: '美国Billboard周榜', id: 10 },
        { name: 'UK排行榜周榜', id: 11 },
        { name: 'Beatport全球电子舞曲榜', id: 12 },
        { name: '日本Oricon数字单曲周榜', id: 13 },
        { name: 'iTunes榜', id: 14 },
        { name: '英国Q杂志中文版周榜', id: 15 }
      ],
      otherList: [
        { name: 'KTV唛榜', id: 16 },
        { name: '法国 NRJ Vos Hits 周榜', id: 17 },
        { name: '台湾Hito排行榜', id: 18 },
        { name: '云音乐韩语榜', id: 19 },
        { name: '云音乐ACG动画榜', id: 20 },
        { name: '云音乐欧美热歌榜', id: 21 }
      ],
      titles: { officialList: '官方榜', recList: '推荐榜', globalList: '全球榜', otherList: '更多榜单' }
    }
    Network.get('toplist/detail')
      .then((data) => {
        console.log(data)
        data.list.forEach((obj) => {
          let flag = false
          for (const key in category) {
            for (let i = 0; i < category[key].length; i++) {
              if (obj.name === category[key][i].name) {
                category[key][i].rank = obj
                flag = true
                break
              }
            }
            if (flag) {
              break
            }
          }
        })
        resolve(category)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
export const getSearchList = (data) => Network.get('search?type=1', data)
export const getHotList = () => Network.get('search/hot')
