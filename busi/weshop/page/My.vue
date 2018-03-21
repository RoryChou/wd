<template>
    <div class="page" :class="{show:c_PageShow}">
        <tab-bar :contactMobile="'tel:'+contactMobile">
            <div slot="tab_panel" class="my-wrap clearfix" :style="{minHeight:clientHeight+'px'}">
                <div class="profile">
                    <i v-if="isLogin" class="attention" @click="showDes"></i>
                    <router-link to="/wxlogin" class="to-login">
                        <img v-if="!isLogin || !member.headImgUrl" src="../images/default-avatat.png">
                    </router-link>
                    <!-- <img v-if ="!isLogin || !member.headImgUrl" src="../images/default-avatat.png"> -->
                    <img v-if="isLogin && member.headImgUrl" :src="member.headImgUrl">

                    <p v-if="isLogin">{{member.nickName}}</p>
                    <p v-else>
                        <router-link to="/wxlogin" class="to-login">请点击登录</router-link>
                    </p>
                    <!--存在会员且会员手机号为空-->
                    <p v-if="isLogin && !member.mobile">

                        <router-link :to="{path:'/bindmobile',query:{memberId:member.memberId}}" class="bind-mobile">绑定手机</router-link>
                    </p>
                    <label v-if="isLogin && member.mobile">已绑定:{{member.mobile}}</label>
                </div>
                <div class="weui-panel menus-panel">
                    <div class="weui-panel__bd">
                        <div class="weui-media-box weui-media-box_small-appmsg">
                            <div class="weui-cells">
                                <router-link :to="{path:'/myorders',query:{memberId:member.memberId}}" class="weui-cell weui-cell_access" href="javascript:">
                                    <div class="weui-cell__hd">
                                        <img src="../images/order-icon-1.png" alt="">
                                    </div>
                                    <div class="weui-cell__bd weui-cell_primary">
                                        <p>我的订单</p>
                                    </div>
                                    <span class="weui-cell__ft"></span>
                                </router-link>
                                <router-link v-if="true" :to="{path:'/visitorinfos',query:{memberId:member.memberId}}" class="weui-cell weui-cell_access">
                                    <div class="weui-cell__hd">
                                        <img src="../images/user-info-icon-1.png" alt="">
                                    </div>
                                    <div class="weui-cell__bd weui-cell_primary">
                                        <p>常用游玩人信息</p>
                                    </div>
                                    <span class="weui-cell__ft"></span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </tab-bar>
        <transition name="fade">
            <div class="js_dialog" v-if="dialogShow">
                <div class="weui-mask"></div>
                <div class="weui-dialog">
                    <div class="weui-dialog__bd">您的账户已授权给游霸平台统一管理，账户相关信息不会泄露至微店商家</div>
                    <div class="weui-dialog__ft">
                        <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_primary"
                           @click="handleDlgOK">确认</a>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
  import { getUserInfo } from '@/api/user'
  import * as utils from '../util/utils'

  export default {
    name: 'my',
    data () {
      return {
        c_PageShow: false,
        clientHeight: document.documentElement.clientHeight,
        storeId: this.$route.query.storeId,
        dialogShow: false,
        isLogin: false,
        contactMobile: '',
        member: {
          memberId: '',
          openId: '',
          storeId: '',
          nickName: '',
          headImgUrl: ''
        }
      }
    },
    mounted () {
      // setTimeout(() => {
      //   this.c_PageShow = true
      // }, 10)
      // // 假装拉取数据
      // this.init()
      this.loadMember()
    },
    methods: {
      // 初始化方法
      init: function () {
        utils.setTitle('会员中心')
        // 查询绑定列表需要的数据
        this.loadMember()
      },
      // 加载session数据
      loadMember: function () {
        // this代表该vue对象
        let self = this
        const u = navigator.userAgent
        const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
        let mobileType = isiOS ? 'iphone' : 'android'
        let storeId = sessionStorage.getItem('storeId')
        self.contactMobile = sessionStorage.getItem('contactMobile')
        getUserInfo({
          storeId: storeId,
          mobileType: mobileType
        }).then(res => {
          if (res.data.success) {
            this.member = res.data.infos[0]
            localStorage.setItem('user', JSON.stringify(this.member))
            let cbUrl = sessionStorage.getItem('cburl')
            if (cbUrl) {
              sessionStorage.removeItem('cburl')
              this.$router.push(cbUrl)
            }
            this.isLogin = true
          } else {
            localStorage.removeItem('user')
            this.member = {
              memberId: '',
              openId: '',
              storeId: '',
              nickName: '',
              headImgUrl: ''
            }
            this.isLogin = false
          }
          this.c_PageShow = true
        })
      },
      handleDlgOK () {
        this.dialogShow = false
      },
      showDes () {
        this.dialogShow = true
      }
    }
  }
</script>

<style lang="less" scoped>
    @rem: 75rem;
    .my-wrap {
        box-sizing: border-box;
        height: 100%;
        padding-bottom: 48px;
        background-color: #f5f5f5;
    }

    .profile {
        background: url("../images/my-bg.png") no-repeat center;
        background-size: 100%;
        width: 375/@rem;
        height: 170/@rem;
        box-sizing: border-box;
        padding-top: 22/@rem;
        position: relative;
        > img {
            display: block;
            width: 78/@rem;
            height: 78/@rem;
            border-radius: 50%;
            margin: 0 auto;
        }
        > a > img {
            display: block;
            width: 78/@rem;
            height: 78/@rem;
            border-radius: 50%;
            margin: 0 auto;
        }
        > p {
            font-size: 14px;
            color: #FFFFFF;
            line-height: 14/@rem;
            text-align: center;
            margin-top: 7/@rem;
        }
        > label {
            font-size: 12px;
            color: #FFFFFF;
            line-height: 12/@rem;
            display: block;
            text-align: center;
            margin-top: 6/@rem;
        }
        .to-login {
            font-size: 14px;
            color: #FFFFFF;
            text-align: center;
            display: block;
            margin-top: 6/@rem;
        }
        .bind-mobile {
            border: 1px solid #FFFFFF;
            border-radius: 98px;
            font-size: 12px;
            color: #FFFFFF;
            display: block;
            padding: 0 15px;
            height: 25px;
            line-height: 25px;
            width: 50px;
            margin: 6/@rem auto 0;
        }
        .attention {
            background: url("../images/about-icon-1.png") no-repeat center;
            width: 18px;
            height: 18px;
            background-size: 100%;
            position: absolute;
            right: 10px;
            top: 15px;
        }
    }

    .menus-panel {
        margin-top: 0;
        .weui-cells {
            font-size: 14px;
            line-height: 1.6;
            .weui-cell__hd {
                img {
                    width: 16px;
                    margin-right: 5px;
                    display: block;
                }
            }
        }
    }

    .js_dialog {
        position: relative;
        z-index: 100;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
