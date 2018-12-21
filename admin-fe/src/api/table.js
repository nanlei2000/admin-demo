import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/movie/list',
    method: 'get',
    params
  })
}
