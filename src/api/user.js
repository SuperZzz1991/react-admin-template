import request from '@/utils/request'

export function reqUserInfo(data) {
  return request({
    url: 'user/info',
    method: 'post',
    data
  })
}