<template>
  <!--景点门票订单-->
  <div class="order-item" v-if="order.productType==='TICKET'" v-bind:class="{loading: order.statusIsLoading}"
       v-bind:data-id="order.vstOrderId">
    <div class="order-hd wd-bd-bottom">
      <i class="menpiao"></i>
      <h3>门票</h3>
      <label>{{order.orderStatusShow}}</label>
    </div>
    <div class="order-bd">
      <div class="order-title">
        <div class="name">{{order.orderName}}</div>
        <div class="price"><i>¥</i>{{(parseInt(order.orderAmount) / 100).toFixed(2)}}</div>
      </div>
      <p>数量：{{order.quantity}}</p>
      <p>入住日期：{{order.visitTimeText}}</p>
      <div class="btns" v-if="!order.statusIsLoading">
        <a v-if="order.cancelFlag" class="weui-btn weui-btn_default"
           @click="handleCancelOrder(order, index)">取消订单</a>

        <!--<a v-if="order.payFlag" class="weui-btn weui-btn_primary">立即支付</a>-->
        <a v-bind:href="'/#/ticket/pay/'" class="weui-btn weui-btn_primary">立即支付</a>

        <!--<a v-if="order.smsFlag" class="weui-btn weui-btn_default">重发短信</a>-->

        <span v-if="resendMsgDisabled">
          {{time}}s后可以
        </span>

        <a @click="handlerResendMsg(order, index)"
           class="weui-btn weui-btn_default"

           v-bind:class="{'weui-btn_disabled': resendMsgDisabled}">重发短信</a>

      </div>

      <div class="btns" v-if="order.statusIsLoading">
        <a class="weui-btn weui-btn_default">操作进行中...</a>
      </div>

    </div>
  </div>
  <!--酒店订单-->
  <!--<div class="order-item">
      <div class="order-hd wd-bd-bottom">
          <i class="jiudian"></i>
          <h3>酒店</h3>
          <label>待支付</label>
      </div>
      <div class="order-bd">
          <div class="order-title">
              <div class="name">上海龙之梦大酒店</div>
              <div class="price"><i>¥</i>788</div>
          </div>
          <p>房间类型：标准房 1间</p>
          <p>入住日期：2017-10-28 住1晚</p>
      </div>
  </div>-->
  <!--自由行订单-->
  <!--<div class="order-item">
      <div class="order-hd wd-bd-bottom">
          <i class="ziyouxing"></i>
          <h3>自由行</h3>
          <label>待支付</label>
      </div>
      <div class="order-bd">
          <div class="order-title">
              <div class="name">上海龙之梦大酒店</div>
              <div class="price"><i>¥</i>788</div>
          </div>
          <p>房间类型：标准房 1间</p>
          <p>入住日期：2017-10-28 住1晚</p>
      </div>
  </div>-->
  <!--邮轮订单-->
  <!--<div class="order-item">
      <div class="order-hd wd-bd-bottom">
          <i class="youlun"></i>
          <h3>邮轮</h3>
          <label>待支付</label>
      </div>
      <div class="order-bd">
          <div class="order-title">
              <div class="name">上海龙之梦大酒店</div>
              <div class="price"><i>¥</i>788</div>
          </div>
          <p>房间类型：标准房 1间</p>
          <p>入住日期：2017-10-28 住1晚</p>
      </div>
  </div>-->
  <!--签证订单-->
  <!--<div class="order-item">
      <div class="order-hd wd-bd-bottom">
          <i class="qianzheng"></i>
          <h3>签证</h3>
          <label>待支付</label>
      </div>
      <div class="order-bd">
          <div class="order-title">
              <div class="name">上海龙之梦大酒店</div>
              <div class="price"><i>¥</i>788</div>
          </div>
          <p>房间类型：标准房 1间</p>
          <p>入住日期：2017-10-28 住1晚</p>
      </div>
  </div>-->
  <!--跟团游订单-->
  <!--<div class="order-item">
      <div class="order-hd wd-bd-bottom">
          <i class="gengtuanyou"></i>
          <h3>跟团游</h3>
          <label>待支付</label>
      </div>
      <div class="order-bd">
          <div class="order-title">
              <div class="name">上海龙之梦大酒店</div>
              <div class="price"><i>¥</i>788</div>
          </div>
          <p>房间类型：标准房 1间</p>
          <p>入住日期：2017-10-28 住1晚</p>
      </div>
  </div>-->
  <!--当地游订单-->
  <!--<div class="order-item">
      <div class="order-hd wd-bd-bottom">
          <i class="dangdiyou"></i>
          <h3>当地游</h3>
          <label>待支付</label>
      </div>
      <div class="order-bd">
          <div class="order-title">
              <div class="name">上海龙之梦大酒店</div>
              <div class="price"><i>¥</i>788</div>
          </div>
          <p>房间类型：标准房 1间</p>
          <p>入住日期：2017-10-28 住1晚</p>
      </div>
  </div>-->
  <!--酒店套餐订单-->
  <!--<div class="order-item">
      <div class="order-hd wd-bd-bottom">
          <i class="jiudiantaocan"></i>
          <h3>酒店套餐</h3>
          <label>待支付</label>
      </div>
      <div class="order-bd">
          <div class="order-title">
              <div class="name">上海龙之梦大酒店</div>
              <div class="price"><i>¥</i>788</div>
          </div>
          <p>房间类型：标准房 1间</p>
          <p>入住日期：2017-10-28 住1晚</p>
      </div>
  </div>-->
</template>

<script>
  import weui from 'weui.js'
  import axios from 'axios'

  export default {
    name: 'order-item',
    data () {
      return {
        resendMsgDisabled: false,
        time: 120,
        timer: null
      }
    },
    props: {
      order: Object,
      index: Number
    },
    methods: {
      handleCancelOrder: function (order, index) {

        //操作中的无法进行继续操作
        if (order.statusIsLoading) {
          return false
        }

        let vstOrderId = order.vstOrderId
        this.noscroll = true
        weui.confirm('您是否要取消该订单吗', {
          className: 'weui-wrap',
          buttons: [{
            label: '我再想想',
            type: 'default',
            onClick: () => {
              //DO nothing
              // console.log('no')
              this.noscroll = false
            }
          },
            {
              label: '取消订单',
              type: 'primary',
              onClick: () => {
                // console.log('yes')

                this.$emit('cancelingOrder', {
                  index: index
                })

                let url = 'http://10.112.5.54:8082/weshopclient/order/cancel'
                axios.get(url, {
                  params: {
                    vstOrderId: vstOrderId
                  }
                }).then(res => {
                  let resData = res.data

                  if (resData.success) {

                  } else {
                    this.$emit('showCommonAlert', '取消失败，当前订单状态不支持该操作')
                  }

                  this.$emit('updateOrder', {
                    index: index
                  })
                })

                this.noscroll = false
              }
            }]
        })
      },
      handlerResendMsg: function (order, index) {

        //刚发送短信的无法再次发送
        if (this.resendMsgDisabled) {
          return false
        }

        //操作中的无法进行继续操作
        if (order.statusIsLoading) {
          return false
        }

        let vstOrderId = order.vstOrderId

        let url = 'http://10.112.5.54:8082/weshopclient/order/sendSms'
        axios.get(url, {
          params: {
            vstOrderId: vstOrderId
          }
        }).then(res => {
          let resData = res.data

          if (resData.success) {
            this.$emit('showCommonAlert', resData.message)

            this.timeDown()

          } else {
            this.$emit('showCommonAlert', resData.message)
          }
        })

      },

      timeDown: function () {

        let self = this
        if (this.timer) {
          return false
        }

        this.resendMsgDisabled = true
        this.time = 120

        this.timer = setInterval(function () {
          self.time -= 1

          if (self.time === 0) {
            clearInterval(self.timer)

            self.resendMsgDisabled = false

          }
        }, 1000)

      }
    }
  }
</script>

<style lang="less" scoped>
  .order-item {
    background: #FFFFFF;
    padding: 0 15px;
    margin-bottom: 10px;
    &.loading {
    }
  }

  .order-hd {
    height: 40px;
    font-size: 14px;
    color: #666666;
    display: flex;
    align-items: center;
    i {
      display: block;
      width: 20px;
      height: 20px;
      margin-right: 5px;
      &.menpiao {
        background: url("../../images/menpiao-icon-1.png") no-repeat center;
        background-size: 100%;
      }
      &.jiudian {
        background: url("../../images/jiudian-cion-1.png") no-repeat center;
        background-size: 100%;
      }
      &.ziyouxing {
        background: url("../../images/ziyouxing-icon-1.png") no-repeat center;
        background-size: 100%;
      }
      &.youlun {
        background: url("../../images/youlun-icon-1.png") no-repeat center;
        background-size: 100%;
      }
      &.qianzheng {
        background: url("../../images/qianzheng-icon-1.png") no-repeat center;
        background-size: 100%;
      }
      &.gengtuanyou {
        background: url("../../images/gengtuan-icon-1.png") no-repeat center;
        background-size: 100%;
      }
      &.dangdiyou {
        background: url("../../images/dangdi-icon-1.png") no-repeat center;
        background-size: 100%;
      }
      &.jiudiantaocan {
        background: url("../../images/jiudiantaocan-icon-1.png") no-repeat center;
        background-size: 100%;
      }
    }
    h3 {
      font-size: 14px;
      flex: 1;
    }
    label {
      font-size: 12px;
    }
  }

  .order-bd {
    padding: 10px 0;
    p {
      font-size: 12px;
      color: #999999;
    }
    .btns {
      align-items: center;
      font-size: 12px;
      margin-top: 5px;
      display: flex;
      justify-content: flex-end;
      span {
        margin-left: 10px;
        color: #666;
      }
      .weui-btn {
        flex: none;
        margin: 0;
        height: 27px;
        line-height: 27px;
        font-size: 13px;
        border-radius: 100px;
        margin-left: 10px;
        &:after {
          border-radius: 100px;
        }
      }
      .weui-btn_default {
        color: #666666;
      }
      .weui-btn_disabled {
        background-color: #ccc;
      }
    }
  }

  .order-title {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    .name {
      font-size: 15px;
      color: #333333;
      flex: 1;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .price {
      font-size: 18px;
      color: #FF6600;
      margin-left: 20px;
      i {
        font-size: 12px;
        font-style: normal;
        margin-right: 2px;
      }
    }
  }
</style>
