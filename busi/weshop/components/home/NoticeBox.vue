<template>
  <section class="notice-box">
    <i></i>
    <a>促销公告：近期公园周边出现不良商贩雨不良商贩雨衣hhhhhhhhhhhhhhhh</a>
  </section>
</template>

<script>
  export default {
    name: 'notice-box'
  }
</script>

<style lang="less" scoped>
  .notice-box {
    height: 40px;
    background-color: #ffffff;
    padding: 0 30px;
    box-sizing: border-box;
    position: relative;
  }

  a {
    font-size: 12px;
    color: #666666;
    line-height: 40px;
    height: 40px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    display: block;
  }

  i {
    position: absolute;
    background: url("../../images/notice-icon-1.png") no-repeat center;
    background-size: 100%;
    width: 15.6px;
    height: 12.8px;
    left: 10px;
    top: 13px;
    display: block;
  }
</style>
