const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DOMAIN:'"1s960h2139.51mypc.cn"',
  APPID:'"wxbd01848a518c18c0"',
  API_BASE: '"/weshopclient"',
  API_SIGNAL: '""',
  ASSET_PATH: '/'
})
