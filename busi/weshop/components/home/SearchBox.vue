<template>
  <section class="search-inner">
    <i class="s-icon"></i>
    <label class="s-label">输入目的地/关键词/主题</label>
  </section>
</template>

<script>
  export default {
    name: 'search-box'
  }
</script>

<style lang="less" scoped>
  @import "../../style/base";

  .search-inner {
    width: 305/@rem;
    height: 30px;
    background-color: #ffffff;
    opacity: 0.95;
    border-radius: 100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }

  .s-icon {
    background: url("../../images/search-icon-1.png") no-repeat center;
    width: 14px;
    height: 14px;
    background-size: 100%;
    display: block;
    margin-left: 10px;
  }

  .s-label {
    font-size: 14px;
    color: #CCCCCC;
    letter-spacing: -0.15px;
    line-height: 14px;
    margin-left: 5px;
  }
</style>
