<template>
  <section class="page" :class="{show:c_PageShow}" :style="{minHeight:clientHeight+'px'}">
    <lv-header title="订单详情"/>

    <div class="state">
      待支付
    </div>

    <div class="introduction">
      <dl>
        <dt>订单号：</dt>
        <dd>61378520</dd>
      </dl>
      <dl>
        <dt>下单时间：</dt>
        <dd>0218-03-14</dd>
      </dl>

    </div>

    <div class="tickets">
      <div class="ticket">
        <div class="header">
          <i class="menpiao"></i>
          <h3>
            上海野生动物园
          </h3>
          <strong></strong>
        </div>
        <div class="body">
          <div class="title">
            <h4>普通成人马戏套票 下午场（含景区大门票+猛犸区大巴游览）</h4>
            <span><em>￥195</em>x1</span>
          </div>
          <dl>
            <dt>游玩时间：</dt>
            <dd>2018-04-12 星期四</dd>
          </dl>
          <dl>
            <dt>入园方式：</dt>
            <dd>
              1.订票人凭身份证至景区网络票人工窗口换票入园
            </dd>
          </dl>

          <a class="more-rules-controller"
             v-bind:class="{active: ruleExpand}"
             @click="handlerMoreRule" href="#">退改规则和须知 <i></i></a>

          <div class="more-rules" v-bind:class="{expand: ruleExpand}">
            <dl>
              <dt>退款规则：</dt>
              <dd>预订付款后未使用，可在“我的订单”中申请退款，需扣除每张门票10%的手续费。</dd>
            </dl>
            <dl>
              <dt>改期规则：</dt>
              <dd>本商品不可改期</dd>
            </dl>
            <dl>
              <dt>费用包含：</dt>
              <dd>成人票 2张</dd>
            </dl>
            <dl>
              <dt>费用不含：</dt>
              <dd>景区交通</dd>
            </dl>
            <dl>
              <dt>取票时间：</dt>
              <dd>无限制</dd>
            </dl>
            <dl>
              <dt>取票地点：</dt>
              <dd>11号线上海迪士尼地铁站1号口出口</dd>
            </dl>
            <dl>
              <dt>有效期限：</dt>
              <dd> （有效期内，仅限入园1次）指定游玩日1天内有效</dd>
            </dl>
          </div>
        </div>
        <div class="footer">
          <div class="title">
            人保驴妈妈景区意外险（10万元保额）
          </div>
          <span>￥1234</span>
        </div>
      </div>
      <div class="count">
        <div class="title">
          订单总额
        </div>
        <span>￥4567</span>
      </div>
    </div>

    <div class="map">
      <div class="title">
        <h4>
          上海野生动物园
        </h4>
        <span><i></i>到这去</span>
      </div>
      <p>
        <i></i>
        上海市浦东新区南六路178号
      </p>
    </div>

    <div class="guide">
      <div class="title">导游信息</div>
      <dl>
        <dt>导游姓名：</dt>
        <dd>王美丽</dd>
      </dl>
      <dl>
        <dt>联系电话：</dt>
        <dd>13800138000</dd>
      </dl>
    </div>

    <div class="mail">
      <div class="title">
        <h4>
          邮寄信息
        </h4>
        <span>￥10</span>
      </div>
      <dl>
        <dt>联系人：</dt>
        <dd>余前坤</dd>
      </dl>
      <dl>
        <dt>邮寄地址：</dt>
        <dd>上海市普陀区怒江北路302弄</dd>
      </dl>
      <dl>
        <dt>邮政编码：</dt>
        <dd>210062</dd>
      </dl>
    </div>

    <div class="operation">
      <a href="javascript:;" class="weui-btn weui-btn_default">取消订单</a>
      <a href="javascript:;" class="weui-btn weui-btn_primary">立即支付</a>
    </div>

    <div class="dialog-refund" v-if="dialogRefundShow">
      <div class="mask"></div>
      <div class="content">
        <p>亲，我们目前暂时还不支持在线退款，您可以致电客服热线申请退款哦</p>
        <div class="tel">
          400-820-8888
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import LvHeader from '../components/global/LvHeader'
  import * as utils from '../util/utils'

  export default {
    name: 'order-detail',
    components: {
      LvHeader
    },
    data () {
      return {
        c_PageShow: false,
        clientHeight: document.documentElement.clientHeight,
        dialogRefundShow: false,
        ruleExpand: false
      }
    },
    mounted: function () {
      this.c_PageShow = true
    },
    methods: {
      handlerMoreRule: function () {
        this.ruleExpand = !this.ruleExpand
      }
    }
  }
</script>

<style lang="less" scoped>
  .page {
    background-color: #f0f0f0;
    padding-top: 45px;
    line-height: 20px;
  }

  .state {
    background-color: #fff;
    font-size: 14px;
    padding: 10px;
    line-height: 25px;
    margin-bottom: 10px;
  }

  .introduction {
    padding: 10px;
    background-color: #fff;
    font-size: 12px;
    margin-bottom: 10px;
    dl {
      display: flex;
    }
  }

  .tickets {

    font-size: 12px;
    padding: 10px;
    background-color: #fff;
    margin-bottom: 10px;
  }

  .ticket {
    .header {
      line-height: 30px;
      padding: 10px 0;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      h3 {
        flex-grow: 1;
        font-size: 16px;
        font-weight: normal;
      }
      i {

        display: block;
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
      i.menpiao {
        background: url("../images/menpiao-icon-1.png") no-repeat center;
        background-size: 100%;
      }
      strong {
        transform: rotate(180deg);
        width: 20px;
        height: 20px;
        display: block;
        background: url(../images/back_icon.png) 50% no-repeat;
        background-size: 30px;
      }
    }
    .body {
      padding: 10px 0;
      .title {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        span {
          margin-left: 10px;
          font-size: 16px;
        }
        em {
          color: #f60;
          font-style: normal;
        }

      }
      h4 {
        font-size: 12px;
        font-weight: normal;
      }
      dl {
        display: flex;
        flex-wrap: wrap;
        margin: 5px 0;
      }
      dt {
        color: #999999;
        width: 20%;

      }
      dd {
        width: 80%;
      }
      .more-rules-controller {
        display: flex;
        align-items: center;
        color: #29e;
        i {
          margin-left: 5px;
          width: 9px;
          height: 5px;
          display: block;
          background-size: cover;
          background-image: url(../images/more_close.png);
        }
        &.active {
          i {
            background-image: url(../images/more_open.png);
          }
        }
      }
    }
    .footer {
      border-top: 1px solid #ccc;
      padding: 10px 0;
      line-height: 30px;
      display: flex;
      .title {
        font-size: 14px;
        flex-grow: 1;
      }

      span {
        font-size: 16px;
        color: #f60;
      }
    }
    .more-rules {
      display: none;
      &.expand {
        display: block;
      }
    }
  }

  .count {
    border-top: 1px solid #ccc;
    padding: 10px 0;
    line-height: 30px;
    display: flex;
    .title {
      font-size: 14px;
      flex-grow: 1;
    }

    span {
      font-size: 16px;
      color: #f60;
    }
  }

  .map {

    font-size: 12px;
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    .title {
      display: flex;
      margin-bottom: 10px;
      h4 {
        font-weight: normal;
        flex-grow: 1;
        font-size: 16px;
        display: flex;
        align-items: center;

      }
      span {
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #ccc;
        border-radius: 5px;
        i {
          margin-right: 5px;
          width: 20px;
          height: 20px;
          background-size: cover;
          display: block;
          background-image: url(../images/ziyouxing-icon-1.png);

        }
      }
    }
    p {
      display: flex;
      align-items: center;
      i {
        margin-right: 10px;
        width: 11px;
        height: 14px;

        background-size: cover;
        display: block;
        background-image: url(../images/address-icon.png);

      }
    }
  }

  .guide {
    .title {
      padding: 0 0 10px 0;
      line-height: 20px;
      display: flex;
      font-size: 14px;
      border-bottom: 1px solid #ccc;
    }
    dl {
      display: flex;
      flex-wrap: wrap;
      margin: 5px 0;
    }
    dt {
      color: #999999;
      width: 20%;

    }
    dd {
      width: 80%;
    }
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 12px;
  }

  .mail {
    .title {
      padding: 0 0 10px 0;
      line-height: 20px;
      display: flex;
      font-size: 14px;
      border-bottom: 1px solid #ccc;
      h4 {
        flex-grow: 1;
        font-weight: normal;
      }
      span {
        color: #f90;
      }
    }
    dl {
      display: flex;
      flex-wrap: wrap;
      margin: 5px 0;
    }
    dt {
      color: #999999;
      width: 20%;

    }
    dd {
      width: 80%;
    }
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 12px;
  }

  .operation {
    display: flex;

    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 12px;
    .weui-btn {
      flex-grow: 1;
      margin: 5px;

    }
  }

  .dialog-refund {
    font-size: 12px;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1500;
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .5);
    }
    .content {
      border-radius: 5px;
      position: absolute;
      text-align: center;
      width: 60%;
      padding: 10px;
      background-color: #f0f0f0;
      p {
        padding: 10px;
        border-bottom: 1px solid #ccc;
      }
      .tel {
        line-height: 30px;
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
</style>
