import request from '@/utils/request'

export function getChannels () {
  return request({
    url: '/channels'
  })
}
