<template>
  <header class="lvHeader-main" :class="{shadow:shadow}" v-show="show">
    <div class="lvHeader-left" @click="handleBackClick">
      <div class="lvHeader-back"></div>
    </div>
    <span class="lvHeader-title">{{title}}</span>
    <slot/>
  </header>
</template>

<script>
  export default {
    name: 'lv-header',
    props: {
      show: {
        type: Boolean,
        default: true
      },
      shadow: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: '驴妈妈-微店'
      }
    },
    methods: {
      handleBackClick: function () {
        this.$router.back()
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
