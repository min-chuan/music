import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:3000'
axios.defaults.timeout = 3000

export default {
  get: (path = '', data = {}) => {
    return new Promise((resolve, reject) => {
      axios.get(path, {
        params: data
      })
        .then((response) => {
          resolve(response.data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },
  post: (path = '', data = {}) => {
    return new Promise((resolve, reject) => {
      axios.post(path, data)
        .then((response) => {
          resolve(response.data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
}
