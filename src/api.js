/**
 * Servie Api By axios
 * @author:liangzhimin
 */

import axios from 'axios'
//import router from './router'



// 接口配置
//export const HOST = '//weapi.jd.com'
export const HOST = ''

const handlerResult = (resolve, reject, result) => {
   //alert(JSON.stringify(result,null,4))
  switch (result.code || result.status) {
    case 302:
      // 未登录
      if (window.JSSDK.Client.isWeixin() || window.JSSDK.Client.isQQ()) {
        let rurl = pageReload('w_w_w')
        setTimeout(() => {
          window.location.href = `//wq.jd.com/pinbind/pintokenredirect?scope=1&biz=shareseason&url=${encodeURIComponent(rurl)}`
        }, 1000)
      } else {
        window.location.href = `//plogin.m.jd.com/user/login.action?appid=614&returnurl=${encodeURIComponent(window.location.href)}`
      }
      break
    case 200:
      resolve(result.data)
      break
    default:
      Toast(`${result.msg}`)
      break
    //isNeedReject ? reject(result) // 不抛出处理，直接跳转到错误页
    // : '' //loadPage(`/error`)
  }
}
/**
 * axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
 * axios.defaults.withCredentials = true
 */
axios.defaults.withCredentials = true
const ajax = (url, type, options, isNeedReject, others = {}) => {
  return new Promise((resolve, reject) => {
    console.log('1--' + `${url} 请求数据，参数=>`, JSON.stringify(options))
    console.log('2--真实的url is' + HOST + url)
    axios({
      ...others,
      method: type,
      url: HOST + url,
      params: type === 'get' ? options : null,
      data: type !== 'get' ? options : null,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(result => {
        console.log(
          `%c ${url} %c 请求数据，参数=> %c ${JSON.stringify(options)}`,
          'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
          `background: #fff; padding: 1px; border-radius: 0 3px 3px 0;  color: #000`,
          'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff'
        ),
          console.group(result),
          console.groupEnd(),
          handlerResult(resolve, reject, result.data, isNeedReject)
      }) //isNeedReject
      .catch(err => {
        console.log(err)
        //window.location.origin == 'https://pro.m.jd.com' ? reject(err) : loadPage(`/error`)
      })
  })
}

export default {
  async get(url, options, isNeedReject) {
    return await ajax(url, 'get', options, isNeedReject)
  },
  async post(url, options, isNeedReject) {
    return await ajax(url, 'post', options, isNeedReject)
  }
}
