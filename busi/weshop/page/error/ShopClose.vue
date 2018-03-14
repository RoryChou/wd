<template>
    <section class="page show shop-close" :style="{minHeight:clientHeight+'px'}">
        <i></i>
        <h3>小店已打烊</h3>
        <p>有事请找客服：<a href="tel:4000000000">4000000000</a></p>
    </section>
</template>

<script>
  export default {
    data () {
      return {
        clientHeight: document.documentElement.clientHeight
      }
    },
    name: 'shop-close'
  }
</script>

<style lang="less" scoped>
    @import "../../style/base";

    .shop-close {
        background-color: #f5f5f5;
        overflow: hidden;
        > i {
            display: block;
            background: url("../../images/404-icon.png") no-repeat center;
            background-size: 100%;
            width: 194/@rem;
            height: 194/@rem;
            margin: 0 auto;
            margin-top: 64px;
        }
        > h3 {
            font-size: 16px;
            color: #333333;
            text-align: center;
            margin-top: 18px;
        }
        > p {
            font-size: 14px;
            color: #999999;
            text-align: center;
            margin-top: 15px;
            a {
                color: #999999;
            }
        }
    }
</style>
