// const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const InjectCommonPlugin = require('./injectCommonPlugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const env = config.build.env

const webpackConfig = merge(baseWebpackConfig, {
  output: {
    // path: config.build.assetsRoot,
    filename: 'build.[hash:16].js',
    chunkFilename: '[name].[hash:16].js'
    // publicPath: config.build.assetsCdnPublicPath,

  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    }).concat([
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000, // 图片尽量走url
          name: utils.assetsPath('[path][name].[ext]'),
          publicPath: config.build.assetsCdnPublicPath + '/',
          emitFile: false
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000, // 图片尽量走url
          name: utils.assetsPath('[path][name].[ext]'),
          publicPath: config.build.assetsCdnPublicPath,
          emitFile: false
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000, // 图片尽量走url
          name: utils.assetsPath('[path][name].[ext]'),
          publicPath: config.build.assetsCdnPublicPath,
          emitFile: false
        }
      }
    ])
  },
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'axios': 'axios'
  },
  devtool: '#source-map',
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      // filename: utils.assetsPath('css/[name].css')
      filename: '[name].[contenthash:16].css'
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   chunks: ['vendor']
    // }),
    // copy custom static assets

    // 注入公共js、css
    new InjectCommonPlugin()
  ]
})

module.exports = webpackConfig
