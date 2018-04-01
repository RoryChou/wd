<template>
  <section class="page" :class="{show:c_PageShow}" :style="{minHeight:clientHeight+'px'}">
    <lv-header title="订单支付"/>

    <section class="pre-pay" v-if="!hasPay">
      <div class="header">
        <i class="weui-icon-success weui-icon_msg"></i>
        <div class="info">
          <h5>订单已提交等待支付！</h5>
          <div>
            <p>请尽快支付订单，预期将自动取消</p>
            <p>剩余支付时间： {{time}}</p>
          </div>

        </div>
      </div>

      <div class="lists">

        <div class="list">
          <h5>上海野生动物园</h5>
          <div class="items">

            <div class="item">
              <div class="left">
                <p>普通成人马戏套票 下午场（含景区大门票+猛兽区大巴游览）</p>
                <p><i>游玩日期：</i>2018-5-1</p>
              </div>
              <div class="right">
                <em>￥240</em> x1
              </div>
            </div>
            <div class="item">
              <div class="left">
                <p>普通成人马戏套票 下午场（含景区大门票+猛兽区大巴游览）</p>
                <p><i>游玩日期：</i>2018-5-1</p>
              </div>
              <div class="right">
                <em>￥240</em> x1
              </div>
            </div>
          </div>

        </div>

        <div class="count">
          应付总额：<em>￥400</em>
        </div>

      </div>

      <div class="main">
        <a class="weui-btn weui-btn_primary" @click="payItNow"
           v-bind:class="{'weui-btn_disabled': remainderPaymentTime===0}">微信支付</a>

      </div>
    </section>

    <section class="has-pay" v-if="hasPay">
      <div class="header">
        <i class="weui-icon-success weui-icon_msg"></i>
        <div class="info">
          <h5>恭喜,订单支付成功！</h5>
          <p class="tip">关注公众号可查看订单信息</p>
        </div>
      </div>
      <div class="main">
        <div class="qr-code">
          <img src="https://placehold.it/170x170" alt="">
        </div>
        <p>长按进入公众号</p>
      </div>
    </section>

    <div class="js_dialog" id="iosDialog2" style="opacity: 1;" v-if="showPayError">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__bd">
          <i class="weui-icon-warn"></i>
          {{errorMsg}}
        </div>
        <div class="weui-dialog__ft">
          <a class="weui-dialog__btn weui-dialog__btn_primary" @click="handlerPayError">知道了</a>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
  import LvHeader from '../components/global/LvHeader'
  import * as utils from '../util/utils'

  export default {
    name: 'pay',
    components: {
      LvHeader
    },
    data () {
      return {
        showPayError: false,
        hasPay: false,
        c_PageShow: false,
        clientHeight: document.documentElement.clientHeight,
        yearMonthList: [],
        orderinfo: null,
        remainderPaymentTime: 1800,
        errorMsg: '支付失败'
      }
    },
    computed: {
      time: function () {

        let h = 0
        let m = 0
        let s

        let t = this.remainderPaymentTime

        if (t === 0) {
          return '已超时'
        }

        if (t / 3600 >= 1) {
          h = Math.floor(t / 3600)
          t = t - h * 3600
        }

        if (t / 60 >= 1) {
          m = Math.floor(t / 60)
          t = t - m * 60
        }

        s = t

        return utils.leftPad(h, '0', 2) + 'h' +
          utils.leftPad(m, '0', 2) + '\'' +
          utils.leftPad(s, '0', 2) + '\'\''
      }
    },
    mounted () {
      this.c_PageShow = true
      let self = this
      let timer = setInterval(function () {
        self.remainderPaymentTime--
        if (self.remainderPaymentTime <= 0) {
          clearInterval(timer)
        }
      }, 1000)
    },
    methods: {
      payItNow: function () {

        //是否已过 支付截止时间
        if (this.remainderPaymentTime > 0) {

          {
            let ret = this.tryOrderStatus()
            if (ret === false) {
              return
            }
          }

          {
            let ret = this.tryOrderPrice()
            if (ret === false) {
              return
            }
          }

          this.onBridgeReady()
        } else {
          //超时

          this.errorMsg = '已过支付截止时间，无法支付'
          this.showPayError = true
        }
      },
      //订单状态是否 正常且未支付
      tryOrderStatus: function () {

        //AJAX获取订单状态
        let orderStatus = true

        //订单状态是否 正常且未支付
        if (orderStatus === true) {

          return true
        } else {

          this.errorMsg = '当前订单状态为xxx，无法支付'
          this.showPayError = true

          return false
        }

      },
      //订单总额 是否匹配
      tryOrderPrice: function () {

        let newOrderPrice = 123
        let oldOrderPrice = 123

        if (newOrderPrice === oldOrderPrice) {
          return true
        } else {
          this.errorMsg = '订单总额不匹配，无法支付'
          this.showPayError = true

          return false
        }

      },
      toHas: function () {
        this.hasPay = true
      },
      handlerPayError: function () {
        this.showPayError = false
      },
      onBridgeReady: function () {
        let self = this

        if (typeof WeixinJSBridge === 'undefined') {
          self.errorMsg = '请在微信中使用'
          self.showPayError = true
          return
        }

        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            'appId': 'wx2421b1c4370ec43b',     //公众号名称，由商户传入
            'timeStamp': '1395712654',         //时间戳，自1970年以来的秒数
            'nonceStr': 'e61463f8efa94090b1f366cccfbbb444', //随机串
            'package': 'prepay_id=u802345jgfjsdfgsdg888',
            'signType': 'MD5',         //微信签名方式：
            'paySign': '70EA570631E4BB79628FBCA90534C63FF7FADD89' //微信签名
          },
          function (res) {

            //调用失败
            if (res.errMsg.indexOf('chooseWXPay:fail') !== -1) {

              self.errorMsg = res.errMsg.replace('chooseWXPay:fail, ', '支付失败，失败原因：')

              self.showPayError = true
              return
            }

            //支付失败
            if (res.err_msg === 'get_brand_wcpay_request:fail') {
              self.errorMsg = '支付失败'
              self.showPayError = true
              return
            }

            //支付过程中用户取消
            if (res.err_msg === 'get_brand_wcpay_request:cancel') {

              self.errorMsg = '支付过程中用户取消'
              self.showPayError = true
              return
            }

            //支付成功
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              self.toHas()
            }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
          }
        )
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/base";

  .page {
    background-color: #f6f6f6;
  }

  .header {
    background-color: #fff;
    margin: 0 auto;
    padding: 20px 0;
    margin-top: 45px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    .weui-icon-success {
      font-size: 55px;
      margin-right: 10px;
      display: flex;
      align-items: center;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;

      h5 {
        margin-bottom: 10px;
        flex-grow: 1;
        font-size: 16px;
        line-height: 25px;
      }
      p {
        flex-grow: 1;
      }
    }
    em {
      font-style: normal;
      font-weight: bold;
      color: #f90;
    }
    .tip {
      color: #f00;
    }
  }

  .main {
    margin: 0 auto;
    width: 90%;
    font-size: 12px;
    padding: 20px 0;
    .time {
      padding-top: 50px;
      text-align: center;
      em {
        font-style: normal;
      }
    }
    .qr-code {
      height: 170px;
      display: flex;
      justify-content: center;
      padding-top: 20px;
      align-items: center;
      img {
        width: 170px;
        height: 170px;
        background-color: #ccc;
      }
    }
    p {
      text-align: center;
      margin-top: 20px;
    }
  }

  .lists {
    padding-top: 20px;
  }

  .list {
    font-size: 12px;
    width: 90%;
    margin: 0 auto;
    h5 {
      font-weight: normal;
      font-size: 16px;
      line-height: 30px;
      border-bottom: 1px solid #ccc;
    }
    .item {
      font-size: 14px;
      display: flex;
      padding: 10px 0 5px 0;
      line-height: 20px;
      .left {
        width: 80%;
        i {
          color: #999;
        }
        p {
          margin-bottom: 5px;
        }
      }
      .right {
        width: 20%;
        text-align: right;
        em {
          font-style: normal;
          color: #f60;
        }
      }
    }
  }

  .count {
    padding-top: 10px;
    width: 90%;
    margin: 0 auto;
    font-size: 14px;
    em {
      color: #f90;
      font-style: normal;
    }
  }

</style>
