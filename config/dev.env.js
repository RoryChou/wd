const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_BASE: '"http://1s960h2139.51mypc.cn/weshopclient"',
  API_SIGNAL: '""'
})
