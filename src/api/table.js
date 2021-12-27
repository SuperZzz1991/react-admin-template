import request from '@/utils/request'
export function pageInfo(data) {
  return request({
    url: '/table/pageInfo',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/table/del',
    method: 'post',
    data
  })
}