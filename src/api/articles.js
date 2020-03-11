import request from '@/utils/request'

export function getArticles (params) {
  return request({
    url: '/articles', // 请求地址
    params // es6写法
  })
}
