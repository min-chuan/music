import axios from 'axios'

axios.defaults.baseURL = '/api'
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
