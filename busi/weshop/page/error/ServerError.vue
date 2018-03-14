<template>
    <section class="page show server-error" :style="{minHeight:clientHeight+'px'}">
        <i></i>
        <p>别慌，我们马上回来</p>
    </section>
</template>

<script>
  export default {
    data () {
      return {
        clientHeight: document.documentElement.clientHeight
      }
    },
    name: 'server-error'
  }
</script>

<style lang="less" scoped>
    @import "../../style/base";

    .server-error {
        background-color: #f5f5f5;
        overflow: hidden;
        > i {
            display: block;
            background: url("../../images/404-icon.png") no-repeat center;
            background-size: 100%;
            width: 194/@rem;
            height: 194/@rem;
            margin: 64px auto 0;
        }
        > p {
            margin-top: 18px;
            font-size: 14px;
            color: #999999;
            text-align: center;
            a {
                color: #999999;
            }
        }
    }
</style>
