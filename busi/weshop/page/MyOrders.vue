<template>
  <section class="page edit-wrap" :class="{show:c_PageShow}">
    <div class="srcoll-tabs-wrap">
      <a class="back-a" @click="handleBack"></a>
      <div class="srcoll-tabs">全部订单</div>
      <!--<a class="tabs-more" :class="{open:tabsOpen}" @click="handleClickTabsMore">分类<i></i></a>-->
      <div class="drop-tabs" :class="{open:tabsOpen}">
        <a v-for="(item,index) in c_OrderTypes" :key="index" :class="{selected:c_OrderTypeSelected===index}"
           @click="handleChooseOrderType(index)">{{item.text}}</a>
      </div>
    </div>
    <div class="drop-mask" v-show="tabsOpen" @click="handleClickTabsMore"></div>
    <div class="page-panel" :class="{noscroll:noscroll}" :style="{minHeight:clientHeight+'px'}">
      <!--有订单情况-->
      <div class="order-list" v-if="orderList.length">
        <template v-for="(order, index) in orderList">
          <OrderItem :order="order" :index="index"
                     v-on:updateOrder="updateOrder"
                     v-on:cancelingOrder="cancelingOrder"
                     v-on:showCommonAlert="showCommonAlert"
          />
        </template>

        <!--加载中-->
        <div class="loading" v-if="showLoading">
          <div class="weui-loadmore">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">正在加载</span>
          </div>
        </div>

      </div>
      <!--没有订单情况-->
      <div class="no-records" v-if="!orderList.length">
        <div class="bg"></div>
        <p>亲，您还没有相关订单哦～</p>
      </div>
    </div>

    <!--页面通用提示-->
    <div class="js_dialog" style="opacity: 1;" v-if="showCommonAlertFlag">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__bd">{{commonAlertMsg}}</div>
        <div class="weui-dialog__ft">
          <a href="javascript:" @click="hideCommonAlert" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
  import weui from 'weui.js'
  import axios from 'axios'
  import cm from '../cm'
  import * as utils from '../util/utils'
  import OrderItem from '../components/myorders/OrderItem'

  const pageSize = 10
  let pageNo = 1
  let maxPageNo = 1
  let count = 1
  let pageStatus = 'loaded'

  let scrollFlag = true

  function getWindowHeight () {
    return document.documentElement.clientHeight
  }

  function getScrollTop () {
    let bodyScrollTop = 0
    let documentScrollTop = 0

    //body
    let body = document.body
    if (body) {
      bodyScrollTop = body.scrollTop
    }

    //html
    let documentElement = document.documentElement
    if (documentElement) {
      documentScrollTop = documentElement.scrollTop
    }

    if (bodyScrollTop > documentScrollTop) {
      return bodyScrollTop
    } else {
      return documentScrollTop
    }
  }

  export default {
    name: 'my-orders',
    components: {
      OrderItem
    },
    data () {
      return {
        c_PageShow: false,
        showLoading: true,
        c_OrderTypes: [
          {
            id: 0,
            text: '全部订单'
          },
          {
            id: 1,
            text: '门票'
          },
          {
            id: 2,
            text: '酒店'
          },
          {
            id: 3,
            text: '跟团游'
          },
          {
            id: 4,
            text: '自由行'
          },
          {
            id: 5,
            text: '当地游'
          },
          {
            id: 6,
            text: '酒店套餐'
          },
          {
            id: 7,
            text: '邮轮'
          },
          {
            id: 8,
            text: '签证'
          }
        ],
        c_OrderTypeSelected: 0,
        tabsOpen: false,
        noscroll: false,
        clientHeight: document.documentElement.clientHeight,

        showCommonAlertFlag: false,
        commonAlertMsg: '',
        //订单列表
        orderList: []
      }
    },
    mounted () {
      let self = this
      setTimeout(() => {
        this.c_PageShow = true
      }, 10)
      utils.setTitle('我的订单')

      this.renderOrderListData()

      document.addEventListener('scroll', function () {
        if (scrollFlag === false) {
          return
        }
        scrollFlag = false
        setTimeout(function () {
          scrollFlag = true
          self.isPageBottom()
        }, 300)
      })
    },

    methods: {

      handleClickTabsMore: function () {
        this.tabsOpen = !this.tabsOpen
        this.noscroll = this.tabsOpen
      },
      handleChooseOrderType: function (index) {
        if (index === this.c_OrderTypeSelected) {
          return
        }
        this.c_OrderTypeSelected = index
        this.tabsOpen = false
        // 假加载
        const loading = weui.loading('加载中...', {
          className: 'weui-wrap'
        })
        setTimeout(function () {
          loading.hide(function () {
            console.log('`loading` has been hidden')
          })
        }, 3000)
      },
      handleBack: function () {
        this.$router.back()
      },

      /**
       * 渲染订单列表数据
       */
      renderOrderListData: function () {
        this.addOrderListData()
      },

      /**
       * 添加订单列表数据
       */
      addOrderListData: function () {
        let self = this
        if (self.showLoading === false) {
          return
        }

        if (pageStatus === 'loading') {
          return
        }

        if (pageNo > maxPageNo) {
          self.showLoading = false
          return
        }

        pageStatus = 'loading'

        // 假装拉取数据
        let url = 'http://10.112.5.54:8082/weshopclient/order/list'
        axios.get(url, {
          params: {
            pageSize: pageSize,
            pageNo: pageNo
          }
        }).then(res => {
          let resData = res.data
          console.log(resData)
          if (resData.success) {

            count = resData.totalCount
            maxPageNo = Math.ceil(count / pageSize)

            for (let i = 0; i < resData.infos.length; i++) {
              let info = resData.infos[i]
              info.statusIsLoading = false
              self.orderList.push(info)
            }

            pageNo += 1
            pageStatus = 'loaded'
          }
        })

      },

      //是否滚动到底部
      isPageBottom: function () {
        let scrollTop = getScrollTop()

        let bodyHeight = document.body.offsetHeight
        let windowHeight = getWindowHeight()

        let diff = bodyHeight - windowHeight - scrollTop

        if (diff < 100) {
          this.addOrderListData()
        }
      },

      showCommonAlert: function (msg) {
        this.commonAlertMsg = msg
        this.showCommonAlertFlag = true
      },
      hideCommonAlert: function () {
        this.showCommonAlertFlag = false
      },
      updateOrder: function (options) {
        let self = this
        let index = options.index
        console.log(index)

        let order = this.orderList[index]
        order.statusIsLoading = false
        let vstOrderId = order.vstOrderId

        let url = 'http://10.112.5.54:8082/weshopclient/order/getById'
        axios.get(url, {
          params: {
            vstOrderId: vstOrderId,
            pageSize: pageSize,
            pageNo: 1
          }
        }).then(res => {

          let resData = res.data
          if(resData.success) {

            let info = resData.infos[0]
            info.statusIsLoading = false
            self.orderList.push(info)

          }
        })

      },
      cancelingOrder: function (options) {
        let index = options.index
        console.log(index)

        this.orderList[index].statusIsLoading = true
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/base";

  .noscroll {
    overflow: hidden !important;
  }

  .srcoll-tabs-wrap {
    width: 100%;
    height: 44px;
    /*overflow: hidden;*/
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    &:after {
      content: " ";
      position: absolute;
      left: 0;
      bottom: -1px;
      right: 0;
      /*height: 1px;*/
      border-bottom: 1px solid #e5e5e5;
      color: #e5e5e5;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      z-index: 2;
    }
    .back-a {
      width: 44px;
      height: 44px;
      background: url(../images/back_icon.png) no-repeat center;
      background-size: 30px;
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 3;
    }
  }

  .srcoll-tabs {
    height: 44px;
    background-color: #ffffff;
    font-size: 15px;
    text-align: center;
    z-index: 2;
    color: #000;
    position: relative;
    line-height: 44px;
    /*&::-webkit-scrollbar {*/
    /*height: 0 !important;*/
    /*display: none;*/
    /*}*/
    /*a {*/
    /*line-height: 44px;*/
    /*display: inline-block;*/
    /*font-size: 14px;*/
    /*color: #333333;*/
    /*padding: 0 10px;*/
    /*position: relative;*/
    /*z-index: 3;*/
    /*&.active {*/
    /*color: #1AAD19;*/
    /*&:after {*/
    /*content: "";*/
    /*width: 28px;*/
    /*height: 2px;*/
    /*background-color: #1AAD19;*/
    /*position: absolute;*/
    /*bottom: 1px;*/
    /*left: 50%;*/
    /*margin-left: -14px;*/
    /*}*/
    /*}*/
    /*}*/
  }

  .drop-tabs {
    position: absolute;
    width: 100%;
    left: 0;
    top: 44px;
    background-color: #ffffff;
    padding: 20/@rem 15/@rem;
    display: flex;
    flex-wrap: wrap;
    z-index: 1;
    transform: translateY(-160/@rem);
    transition: .4s all;
    transition-timing-function: ease-in-out;
    box-sizing: border-box;
    &.open {
      transform: translateY(0);
    }
    a {
      display: block;
      box-sizing: border-box;
      width: 108/@rem;
      height: 30/@rem;
      font-size: 12px;
      color: #333333;
      line-height: 30px;
      text-align: center;
      position: relative;
      margin-right: 8/@rem;
      margin-bottom: 10/@rem;
      &:after {
        content: " ";
        width: 200%;
        height: 200%;
        position: absolute;
        top: 0;
        left: 0;
        border: 1px solid rgba(0, 0, 0, 0.2);
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-radius: 100px;
      }
      &.selected {
        color: #1AAD19;
        &:after {
          border: 1px solid #1AAD19;
        }
      }
      &:nth-child(3n+0) {
        margin-right: 0;
      }
    }
  }

  .drop-mask {
    position: absolute;
    z-index: 5;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
  }

  .tabs-more {
    background-image: linear-gradient(270deg, #FFFFFF 58%, rgba(255, 255, 255, 0.00) 93%);
    position: absolute;
    right: 0;
    top: 0;
    font-size: 13px;
    height: 44px;
    line-height: 44px;
    padding: 0 10px 0 0;
    display: block;
    z-index: 2;
    color: #666;
    i {
      background: url("../images/arrow-icon-2.png") no-repeat center;
      width: 8px;
      height: 13px;
      transform: rotate(90deg);
      display: inline-block;
      background-size: 100%;
      transition: .4s all;
      margin-left: 5px;
      position: relative;
      top: 1px;
    }
    &.open {
      i {
        transform: rotate(270deg);
      }
    }
  }

  .page-panel {
    padding-top: 44px;
  }

  .no-records {
    .bg {
      background: url("../images/no-records-bg.png") no-repeat center;
      background-size: 100%;
      width: 158/@rem;
      height: 121/@rem;
      margin: 55/@rem auto 0;
    }
    p {
      font-size: 14px;
      color: #999999;
      text-align: center;
      margin-top: 20px;
    }
  }

  .order-list {
    padding: 10px 0;
  }


</style>
