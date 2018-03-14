<template>
    <section class="page edit-wrap" :class="{show:c_PageShow}">
        <div class="srcoll-tabs-wrap">
            <a class="back-a" @click="handleBack"></a>
            <div class="srcoll-tabs">全部订单</div>
            <a class="tabs-more" :class="{open:tabsOpen}" @click="handleClickTabsMore">分类<i></i></a>
            <div class="drop-tabs" :class="{open:tabsOpen}">
                <a v-for="(item,index) in c_OrderTypes" :key="index" :class="{selected:c_OrderTypeSelected===index}" @click="handleChooseOrderType(index)">{{item.text}}</a>
            </div>
        </div>
        <div class="drop-mask" v-show="tabsOpen"></div>
        <div class="page-panel" :class="{noscroll:noscroll}" :style="{minHeight:clientHeight+'px'}">
            <!--有订单情况-->
            <div class="order-list">
                <!--景点门票订单-->
                <div class="order-item">
                    <div class="order-hd wd-bd-bottom">
                        <i class="menpiao"></i>
                        <h3>景点门票</h3>
                        <label>待支付</label>
                    </div>
                    <div class="order-bd">
                        <div class="order-title">
                            <div class="name">上海龙之梦大酒店</div>
                            <div class="price"><i>¥</i>788</div>
                        </div>
                        <p>房间类型：标准房 1间</p>
                        <p>入住日期：2017-10-28 住1晚</p>
                        <div class="btns">
                            <a class="weui-btn weui-btn_default" @click="handleCancelOrder">取消订单</a>
                            <a class="weui-btn weui-btn_primary">立即支付</a>
                        </div>
                    </div>
                </div>
                <!--酒店订单-->
                <div class="order-item">
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
                </div>
                <!--自由行订单-->
                <div class="order-item">
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
                </div>
                <!--邮轮订单-->
                <div class="order-item">
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
                </div>
                <!--签证订单-->
                <div class="order-item">
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
                </div>
                <!--跟团游订单-->
                <div class="order-item">
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
                </div>
                <!--当地游订单-->
                <div class="order-item">
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
                </div>
                <!--酒店套餐订单-->
                <div class="order-item">
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
                </div>
            </div>
            <!--没有订单情况-->
            <div class="no-records">
                <div class="bg"></div>
                <p>亲，您还没有相关订单哦～</p>
            </div>
        </div>
    </section>
</template>

<script>
  import weui from 'weui.js'
  import axios from 'axios'
  import cm from '../cm'
  import * as utils from '../util/utils'

  export default {
    name: 'my-orders',
    data () {
      return {
        c_PageShow: false,
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
          }
          ,
          {
            id: 8,
            text: '签证'
          }
        ],
        c_OrderTypeSelected: 0,
        tabsOpen: false,
        noscroll: false,
        clientHeight: document.documentElement.clientHeight
      }
    },
    mounted () {
      setTimeout(() => {
        this.c_PageShow = true
      }, 10)
      this.init()
    },

    methods: {
      // 初始化方法
      init: function () {
        // var isLogin = sessionStorage.getItem('isLogin')
        // if (isLogin == 'true') {
        //   //do nothing
        // } else {
        //   axios.get(cm.myHome.saveFromRoute, {
        //     params: {
        //       fromRoute: '/myOrders'
        //     }
        //   })
        //   this.$router.replace('/wxlogin')
        // }
        utils.setTitle('我的订单')
      },
      handleCancelOrder: function () {
        this.noscroll = true
        weui.confirm('您是否要取消该订单吗', {
          className: 'weui-wrap',
          buttons: [{
            label: '我再想想',
            type: 'default',
            onClick: () => {
              console.log('no')
              this.noscroll = false
            }
          },
            {
              label: '取消订单',
              type: 'primary',
              onClick: () => {
                console.log('yes')
                this.noscroll = false
              }
            }]
        })
      },
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

    .order-item {
        background: #FFFFFF;
        padding: 0 15px;
        margin-bottom: 10px;
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
                background: url("../images/menpiao-icon-1.png") no-repeat center;
                background-size: 100%;
            }
            &.jiudian {
                background: url("../images/jiudian-cion-1.png") no-repeat center;
                background-size: 100%;
            }
            &.ziyouxing {
                background: url("../images/ziyouxing-icon-1.png") no-repeat center;
                background-size: 100%;
            }
            &.youlun {
                background: url("../images/youlun-icon-1.png") no-repeat center;
                background-size: 100%;
            }
            &.qianzheng {
                background: url("../images/qianzheng-icon-1.png") no-repeat center;
                background-size: 100%;
            }
            &.gengtuanyou {
                background: url("../images/gengtuan-icon-1.png") no-repeat center;
                background-size: 100%;
            }
            &.dangdiyou {
                background: url("../images/dangdi-icon-1.png") no-repeat center;
                background-size: 100%;
            }
            &.jiudiantaocan {
                background: url("../images/jiudiantaocan-icon-1.png") no-repeat center;
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
            margin-top: 5px;
            display: flex;
            justify-content: flex-end;
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
