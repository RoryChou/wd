const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"fangzheng"',
  DOMAIN:'"fangzhen.yobab2b.com"',
  APPID:'"wxbd01848a518c18c0"',
  API_BASE: '"/weshopclient"',
  API_SIGNAL: '""',
  ASSET_PATH: '//fangzhen.yobab2b.com/h5/'
})
