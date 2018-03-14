<template>
  <section v-show="show">
    <div class="dataLoading">
      <i></i>
      <i></i>
      <span>{{txt}}</span>
    </div>
    <div class="loadingMask"></div>
  </section>
</template>

<script>
  export default {
    name: 'lv-loading',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      txt: {
        type: String,
        default: '加载中...'
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
