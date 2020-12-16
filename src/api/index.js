import Network from './network.js'

export const getBanner = () => Network.get('banner?type=2')
export const getPersonalized = () => Network.get('/personalized?limit=6')
