import Api from '@/api'

/**
 * mock 注入
 */

//if (process.env.VUE_APP_MOCK) require('./mock')
const host = ''
//const host = ''
export default {
  getSeller: async params => {
    return await Api.get(host + '/api/seller', params)
  },
  getGoods: async params => {
    return await Api.get(host + '/api/goods', params)
  },
  getRatings: async params => {
    return await Api.get(host + '/api/ratings', params)
  }
}
