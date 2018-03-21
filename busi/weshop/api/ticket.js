import request from '../util/request'

export function getGoodsDetail (goodsIds) {
  return request({
    url: 'https://www.easy-mock.com/mock/5aa62f3e19bd8f2d97b03001/example_copy/api.com.csa.ticket.goods.getGoodsDetail',
    params: {
      method: 'api.com.csa.ticket.goods.getGoodsDetail',
      version: '1.0.0',
      goodsIds
    }
  })
}
