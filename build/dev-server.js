require('./check-versions')()

const config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const opn = require('opn')
const express = require('express')
const webpack = require('webpack')
const merge = require('webpack-merge')
const proxyMiddleware = require('http-proxy-middleware')
let webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

const utils = require('./utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
const autoOpenBrowser = config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

const app = express()

let autoTask = ''

utils.computeTaskList('dev').forEach(function (task, index) {
  // 绝对路径转相对路径，例如："e:\website\static_project\webapp\busi\testOnePage"  =》  "busi/testOnePage"
  task = task.replace(config.build.basePath + '\\', '').replace(/\\/g, '/')
  webpackConfig.entry[task] = ['./build/dev-client'].concat(`./busi/${task}/main.js`)
  webpackConfig = merge(webpackConfig, {
    plugins: [
      new HtmlWebpackPlugin({
        filename: `${task}/index.html`,
        template: `busi/${task}/template.html`,
        chunks: [task],
        inject: true
      })
    ]
  })
  if (index === 0) {
    autoTask = task
  }
})

const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true,
  index: 'index.html'
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
})

// proxy api requests
// Object.keys(proxyTable).forEach(function (context) {
//   var options = proxyTable[context]
//   if (typeof options === 'string') {
//     options = { target: options }
//   }
//   app.use(proxyMiddleware(options.filter || context, options))
// })
app.use(proxyMiddleware(proxyTable.pattern, proxyTable.options))

// handle fallback for HTML5 history API
// app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
// var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use('/static', express.static('./static'))

const uri = `http://localhost:${port}/${autoTask}`

let _resolve
const readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

const server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
