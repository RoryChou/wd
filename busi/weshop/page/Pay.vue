<template>
  <section class="page" :class="{show:c_PageShow}">
    <lv-header title="订单支付"/>

    <div class="header">
      <i class="weui-icon-success weui-icon_msg"></i>
      <div class="info">
        <h5>订单已提交等待支付！</h5>
        <p>订单总额：<em>￥300</em></p>
      </div>
    </div>
    <div class="main">
      <a class="weui-btn weui-btn_primary" v-bind:class="{'weui-btn_disabled': remainderPaymentTime===0}">微信支付</a>
      <div class="time">
        剩余支付时间：
        <em>
          {{time}}
        </em>
      </div>
    </div>

    <div class="header">
      <i class="weui-icon-success weui-icon_msg"></i>
      <div class="info">
        <h5>订单已提交等待支付！</h5>
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
        c_PageShow: false,
        yearMonthList: [],
        orderinfo: null,
        // remainderPaymentTime: 1800
        remainderPaymentTime: 5
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
          utils.leftPad(s, '0', 2) + '\"'
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
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/base";

  body {
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
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 25px;
      h5 {
        flex-grow: 1;
        font-size: 16px;
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
    padding: 50px 0;
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
</style>
