<template>
    <div class="page" :class="{show:c_PageShow}">
        <i class="logo"></i>
        <a class="wx-login" :href="aHref">微信登录</a>
        <!--<a class="wx-login" href="http://10.112.1.86:8082/weshopclient/member/callback?openid=o4yzB1Nx5V158I4hA4ymhQDtJ6vg&appid=wxbd01848a518c18c0">微信登录</a>-->
        <!--<a class="wx-login" @click="toFake" href="javascript:">微信登录</a>-->
    </div>
</template>

<script>

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
    computed: {
      aHref () {
        // return ''
        return '/wechatgateway/oauth2/authorizeuserinfo?appid=' + process.env.APPID + '&callback=http://' + process.env.DOMAIN + '/weshopclient/member/callback'
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
