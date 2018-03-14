import request from '../util/request'

export function getGoodsDetail (goodsIds) {
  return request({
    url: '/api.com.csa.ticket.goods.getGoodsDetail',
    params: {
      method: 'api.com.csa.ticket.goods.getGoodsDetail',
      version: '1.0.0',
      goodsIds
    }
  })
}
