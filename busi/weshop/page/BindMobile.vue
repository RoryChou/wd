<template>
    <div class="page show">
        <i class="moble-icon"></i>
        <p class="bind-tip">绑定手机，方便查看订单</p>
        <section class="form-wrap">
            <div class="ui-cell">
                <div class="ui-cell__hd"><label class="ui-label">手机号</label></div>
                <div class="ui-cell__bd" :class="{'show-err':mobileErrShow}">
                    <input id="mobile" class="ui-input" type="number" pattern="[0-9]*" placeholder="请输入手机号" v-model="mobile" @blur="handleMobileTouch">
                    <label class="err">请输入正确的手机号码</label>
                </div>
            </div>
            <div class="ui-cell border-bt">
                <div class="ui-cell__hd"><label class="ui-label">验证码</label></div>
                <div class="ui-cell__bd" :class="{'show-err':codeErrShow}">
                    <input id="vcCode" class="ui-input" type="number" pattern="[0-9]*" placeholder="请输入验证码" v-model="code" @blur="handleCodeTouch">
                    <label class="err">{{vcCodeTxt}}</label>
                </div>
                <div class="ui-cell__ft">
                    <button class="ui-vcode-btn-z"></button>
                    <a class="ui-vcode-btn" @click="handleGetVcCode" :class="{disabled:(secs>0||!ruleAgree)}">{{getCodeTxt}}</a>
                </div>
            </div>
            <label class="agreement" @click="handleAgreeMentClick">
                <i :class="{checked:ruleAgree}"></i>绑定即表示已阅读并同意
                <router-link to="/weshopagreement" class="rule">微店平台用户协议</router-link>
            </label>
            <label class="agg-err" v-show="!ruleAgree">请先阅读并同意用户协议</label>
            <a class="bind-btn weui-btn weui-btn_primary" :class="{'weui-btn_disabled':!ruleAgree}" @click="handleBind">立即绑定</a>
            <router-link to="/my" class="skip-btn">跳过，暂不绑定</router-link>
        </section>

        <div class="j_dialog" v-show="dlgShow">
            <div class="mask"></div>
            <div class="ui-dialog">
                <div class="ui-dialog__bd">{{showMessage}}</div>
                <div class="ui-dialog__ft">
                    <a href="javascript:" class="ui-dialog__btn ui-dialog__btn_primary" @click="handleDlgOk">知道了</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import * as utils from '../util/utils'
  import cm from '../cm'

  export default {
    name: 'bind-mobile',
    data () {
      return {
        memberId: sessionStorage.getItem('memberId'),
        showMessage: '',
        ruleAgree: true,
        mobile: '',
        mobileTouch: false,
        code: '',
        codeTouch: false,
        dlgShow: false,
        secs: 0,
        getCodeTxt: '获取验证码',
        toRoute: '/my',
        vcCodeTxt: '',
        errorCode: [
          {code: 'member-0100', message: '手机号格式不正确'},
          {code: 'member-0101', message: '该手机号已绑定过店铺，请更换手机号'},
          {code: 'member-0102', message: '验证码错误或失效，请重新输入'},
          {code: 'member-0103', message: '账户异常，绑定失败，请24小时后重新绑定'},
          {code: 'member-0104', message: '您的发送频率过高，请稍后重试'}
        ]
      }
    },
    mounted () {
      this.init()
    },

    methods: {
      // 初始化方法
      init: function () {
        utils.setTitle('绑定手机')
        this.toRoute = this.$route.query.routeTo
        let memberId = this.$route.query.memberId
        if (memberId) {
          sessionStorage.setItem('isLogin', true)
        }

        console.log('跳转到memberId：' + memberId)
        sessionStorage.setItem('memberId', memberId)
        console.log('跳转到：' + this.toRoute)
      },
      handleAgreeMentClick () {
        this.ruleAgree = !this.ruleAgree
      },
      handleGetVcCode () {
        if (this.secs > 0 || !this.ruleAgree) {
          return
        }
        this.mobileTouch = true
        if (!this.mobileErrShow) {
          this.secs = 60
          this.rollTime()
          // 发验证码
          axios.post(cm.bindMobile.sendMobileAuthCode, {
            mobile: this.mobile
          })
            .then((response) => {
              if (response.data.success) {
                this.showMessage = '验证码已发送请注意查收游霸平台发送的短信'
                this.dlgShow = true
              } else if (response.data.status === 'FAIL') {
                if (response.data.code === 'member-0103') {
                  this.showMessage = '账户异常，获取验证码失败，请24小时后重新获取'
                  this.dlgShow = true
                } else {
                  this.showMessage = this.getErrorMsg(response.data.code)
                }
                this.dlgShow = true
              } else {
                this.showMessage = response.data.message
                this.dlgShow = true
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
      },
      handleBind () {
        if (!this.ruleAgree) {
          return
        }
        this.mobileTouch = true
        this.codeTouch = true
        const that = this
        let memberId = sessionStorage.getItem('memberId')
        console.log('memberId是' + memberId)

        if (!this.mobileErrShow && !this.codeErrShow) {
          axios.post(cm.bindMobile.validMobileAuthCode, {
            memberId: memberId,
            mobile: this.mobile,
            code: this.code
          }).then(function (response) {
            if (response.data.success) {
              // 弹出绑定成功
              alert('手机绑定成功')
              // 跳转到我的页面
              that.$router.push({path: '/my'})
            } else if (response.data.status === 'FAIL') {
              that.showMessage = that.getErrorMsg(response.data.code)
              that.dlgShow = true
            } else {
              that.showMessage = response.data.message
              that.dlgShow = true
            }
          })
            .catch(function (error) {
              console.log(error)
            })
        }
      },
      handleDlgOk () {
        this.dlgShow = false
      },
      handleMobileTouch () {
        this.mobileTouch = true
      },
      handleCodeTouch () {
        this.codeTouch = true
      },
      rollTime () {
        const that = this
        that.secs--
        if (that.secs <= 0) {
          that.secs = 0
          that.getCodeTxt = '获取验证码'
        } else {
          that.getCodeTxt = that.secs + 'S后重发'
          setTimeout(function () {
            that.rollTime()
          }, 1000)
        }
      }
    },
    computed: {
      mobileErrShow: function () {
        return this.mobileTouch && (!/^[1][0-9]{10}$/.test(this.mobile))
      },
      codeErrShow: function () {
        if (!this.code) {
          this.vcCodeTxt = '验证码为空，请输入验证码'
        }
        return this.codeTouch && !this.code
      }
    }
  }
</script>

<style lang="less" scoped>
    @import "../style/base";

    .page {
        padding-top: 30/@rem;
    }

    .moble-icon {
        display: block;
        width: 60/@rem;
        height: 60/@rem;
        margin: 0 auto;
        background: url("../images/mobile-icon-1@2x.png") no-repeat center;
        background-size: 100%;
    }

    .bind-tip {
        font-size: 12px;
        color: #999999;
        text-align: center;
        margin-top: 10/@rem;
    }

    .form-wrap {
        width: 345/@rem;
        margin: 20px auto 0;
        position: relative;
    }

    .ui-cell {
        padding: 10px 15px;
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        font-size: 14px;
        &:before {
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            height: 1px;
            border-top: 1px solid #e5e5e5;
            color: #e5e5e5;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
            z-index: 2;
        }
        .err {
            font-size: 10px;
            color: #FF5465;
            position: absolute;
            left: 0;
            top: -10px;
            opacity: 0;
            transition: .3s all;
        }
    }

    .show-err {
        .err {
            opacity: 1;
            top: -5px;
        }
        .ui-input {
            top: 6px;
        }
    }

    .agg-err {
        font-size: 10px;
        color: #FF5465;
        display: block;
    }

    .border-bt {
        &:after {
            content: " ";
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            height: 1px;
            border-bottom: 1px solid #e5e5e5;
            color: #e5e5e5;
            -webkit-transform-origin: 0 100%;
            transform-origin: 0 100%;
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
            z-index: 2;
        }
    }

    .ui-label {
        display: block;
        width: 80/@rem;
        word-wrap: break-word;
        word-break: break-all;
        font-size: 14px;
    }

    .ui-cell__bd {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        position: relative;
    }

    .ui-input {
        width: 100%;
        border: 0;
        outline: 0;
        -webkit-appearance: none;
        background-color: transparent;
        font-size: inherit;
        color: inherit;
        height: 1.47058824em;
        line-height: 1.47058824;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        position: relative;
        transition: .3s all;
    }

    .ui-cell__ft {
        text-align: right;
        color: #ffffff;
    }

    .ui-vcode-btn-z {
        display: inline-block;
        height: 1.47058824em;
        width: 80px;
        //padding: 0 0.6em 0 0.7em;
        border: none;
        line-height: 1.47058824em;
        vertical-align: middle;
        color: #3CC51F;
        background-color: transparent;
        border-top: 0;
        border-right: 0;
        border-bottom: 0;
        outline: 0;
    }

    .ui-vcode-btn {
        position: absolute;
        right: 0;
        top: 0;
        display: inline-block;
        height: 100%;
        width: 95px;
        font-size: 12px;
        //padding: 0 0.6em 0 0.7em;
        border: none;
        //line-height: 1.47058824em;
        vertical-align: middle;
        color: #3CC51F;
        background-color: transparent;
        border-top: 0;
        border-right: 0;
        border-bottom: 0;
        outline: 0;
        line-height: 42px;
        text-align: center;
        &.disabled {
            color: #999999;;
        }
        &:before {
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            width: 1px;
            border-left: 1px solid #e5e5e5;
            color: #e5e5e5;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scaleX(0.5);
            transform: scaleX(0.5);
            z-index: 2;
            height: 100%;
        }
    }

    .skip-btn {
        font-size: 12px;
        color: #999999;
        margin-top: 15px;
        display: block;
        text-align: center;
    }

    .bind-btn {
        margin-top: 20px;
    }

    .agreement {
        margin-top: 10px;
        font-size: 12px;
        color: #999999;
        display: block;
        i {
            display: inline-block;
            width: 15px;
            height: 15px;
            background: url("../images/check-icon-1.png") no-repeat center;
            background-size: 100%;
            vertical-align: text-bottom;
            margin-right: 5px;
            &.checked {
                background: url("../images/check-icon-1-checked.png") no-repeat center;
                background-size: 100%;
            }
        }
        .rule {
            color: #151515;
        }
    }

    /*.j_dialog {*/
    /*display: none;*/
    /*}*/

    .mask {
        position: fixed;
        z-index: 100;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
    }

    .ui-dialog {
        position: fixed;
        z-index: 5000;
        width: 72vw;
        max-width: 300px;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background-color: #FFFFFF;
        text-align: center;
        border-radius: 3px;
        overflow: hidden;
    }

    .ui-dialog__bd {
        padding: 25px 18px;
        //min-height: 40px;
        font-size: 12px;
        line-height: 1.3;
        word-wrap: break-word;
        word-break: break-all;
        color: #333333;
        //&:first-child {
        //  padding: 2.7em 20px 1.7em;
        //  color: #353535;
        //}
    }

    .ui-dialog__ft {
        position: relative;
        line-height: 40px;
        //font-size: 18px;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        &:after {
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            height: 1px;
            border-top: 1px solid #D5D5D6;
            color: #D5D5D6;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
        }
    }

    .ui-dialog__btn {
        display: block;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        color: #3CC51F;
        text-decoration: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        position: relative;
        font-size: 14px;
        &:active {
            background-color: #EEEEEE;
        }
    }

    .ui-dialog__btn_primary {
        color: #0BB20C;
    }
</style>
