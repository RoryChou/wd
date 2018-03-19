<template>
  <p>
    <i class="dec-count" v-bind:class="{gray: value === 0}" v-on:click="decCount"></i>
    <input type="tel" v-bind:value="value" v-bind:datasrc="max"
           v-on:input="updateValue($event.target.value)" readonly>
    <i class="add-count" v-bind:class="{gray: value === max}" v-on:click="addCount"></i>
  </p>
</template>

<script>
  export default {
    name: 'number-box',
    props: {
      value: {
        type: Number,
        default: 1
      },
      max: {
        type: Number,
        default: 1
      }
    },
    methods: {
      updateValue: function (value) {
        let number = parseInt(value)
        if (isNaN(number)) {
          number = 0
        }
        this.$emit('input', number)
      },
      decCount: function () {
        let number = this.value
        number--
        if (number < 0) {
          number = 0
        }
        this.$emit('input', number)
      },
      addCount: function () {
        let number = this.value
        number++
        let max = this.max
        if (number > max) {
          number = max
        }
        this.$emit('input', number)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../style/base";

  p {
    float: right;
    margin: 14px 0;
    font-size: 0;
    i {
      display: inline-block;
      width: 41px;
      height: 36px;
    }
    input {
      width: 50px;
      font-size: 16px;
      text-align: center;
      height: 35px;
      line-height: 35px;
      vertical-align: top;
      color: #333;
      border-image: url(data:image/gif;base64,R0lGODlhBQAFAPABANra2v///yH5BAUHAAEALAAAAAAFAAUAAAIHhB9pGatnCgA7) 2 stretch;
      border-width: 1px;
      box-sizing: border-box;
      outline: none;
      border-style: solid;
    }
  }

  .dec-count {
    background: url(../../images/dec_able.png) no-repeat;
    background-size: 100%;
    &.gray {
      background: url(../../images/dec_unable.png) no-repeat;
      background-size: 100%;
    }
  }

  .add-count {
    background: url(../../images/add_able.png) no-repeat;
    background-size: 100%;
    &.gray {
      background: url(../../images/add_unable.png) no-repeat;
      background-size: 100%;
    }
  }
</style>
