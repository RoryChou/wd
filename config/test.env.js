const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  DOMAIN:'"1s960h2139.51mypc.cn"',
  APPID:'"wxbd01848a518c18c0"',
  API_BASE: '"/weshopclient"',
  API_SIGNAL: '""',
  ASSET_PATH: '//1s960h2139.51mypc.cn/h5/busi/weshop/'
})
