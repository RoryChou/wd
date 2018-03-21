import request from '../util/request'

export function getUserInfo (params) {
  return request({
    url: '/member/index',
    params
  })
}
