// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import FastClick from 'fastclick';
import App from './App'
import router from './router'
import TabBar from './components/global/TabBar'
// import common less
import './style/weui/weui.less'
import './style/base.less'
// import './common/util.js'

// add fastclick to remove click delays on browsers with touch UIs
// if ('addEventListener' in document) {
//   document.addEventListener('DOMContentLoaded', function () {
//     FastClick.attach(document.body);
//   }, false);
// }

Vue.config.productionTip = false
// register global components
Vue.component('tab-bar', TabBar)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
