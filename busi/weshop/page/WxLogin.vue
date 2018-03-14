<template>
    <div class="page" :class="{show:c_PageShow}">
        <i class="logo"></i>
        <a class="wx-login" href="http://1s960h2139.51mypc.cn/wechatgateway/oauth2/authorizeuserinfo?appid=wxbd01848a518c18c0&callback=http://1s960h2139.51mypc.cn/weshopclient/member/callback">微信登录</a>
        <!--<a class="wx-login" href="http://10.112.1.86:8082/weshopclient/member/callback?openid=o4yzB1Nx5V158I4hA4ymhQDtJ6vg&appid=wxbd01848a518c18c0">微信登录</a>-->
        <!--<a class="wx-login" @click="toFake" href="javascript:">微信登录</a>-->
    </div>
</template>

<script>
  import axios from 'axios'
  import cm from '../cm'

  export default {
    name: 'wx-login',
    data () {
      return {
        c_PageShow: false
      }
    },
    mounted () {
      setTimeout(() => {
        this.c_PageShow = true
      }, 10)
    },
    methods: {
      toAuthorize: function () {
        let params = {
          appid: 'wxbd01848a518c18c0',
          callback: cm.wechat.toAuthCallback
        }

        axios.get('http://1s960h2139.51mypc.cn/wechatgateway/oauth2/authorizeuserinfo', {
          params: params
        })
      },

      //假登录
      toFake: function () {
        var params = {
          appid: 'wxbd01848a518c18c0',
          openid: 'o4yzB1CDQA64fLEWZXH7gBCk0uXc'

        }
        axios.get(cm.wechat.toFake, {
          params: params
        })
        //     .then(res => {
        //     console.log("进来看了");
        //     if (res.data.success) {
        //         var member = res.data.infos[0];
        //         if (member == null) {
        //             console.log("出错了");
        //         }
        //         const u = navigator.userAgent;
        //         const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        //         var mobileType = isiOS ? "iphone" : "android";
        //         sessionStorage.setItem("memberId", member.memberId);
        //         //TODO 写死了数据 保存店铺信息和手机类型
        //         var storeId = sessionStorage.getItem('storeId');
        //
        //         axios.put(cm.wechat.putMember, {
        //                 storeId: 41,
        //                 mobileType: mobileType,
        //                 memberId: member.memberId
        //             }
        //         ).then(res => {
        //             if (res.data.success) {
        //                 this.$router.push({
        //                     path: '/my'
        //                 })
        //             } else {
        //
        //             }
        //         })
        //     } else {
        //     }
        // })
      },

      toUpdateMobileType: function () {

      }

    }
  }
</script>

<style lang="less" scoped>
    @import "../style/base";

    .page {
        padding-top: 40/@rem;
    }

    .logo {
        background: url("../images/wx-logo-1@2x.png") no-repeat center;
        background-size: 100%;
        width: 100/@rem;
        height: 26.6vw;
        margin: 0 auto;
        display: block;
    }

    .wx-login {
        width: 335/@rem;
        height: 50/@rem;
        line-height: 50/@rem;
        background: #1AAD19;
        border-radius: 5px;
        margin: 60/@rem auto 0;
        display: block;
        text-align: center;
        color: #ffffff;
        font-size: 18/@rem;
        &:active {
            color: rgba(255, 255, 255, 0.6);
            background-color: #179B16;
        }
    }

</style>
