import request from '@/utils/request'

/****
 * 这个模块专门处理 素材请求=
 * 导出若干个方法
 * ****/
export function getMaterial (params) {
  // 请求调用 返回结果
  return request({
    url: '/user/images', // 请求地址
    params
  })
}
