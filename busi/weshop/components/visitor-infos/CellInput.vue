<template>
    <div class="weui-cell__bd" :class="{showerr:showerr}">
        <input class="weui-input" v-bind:value="value" v-on:input="updateValue($event.target.value)" :type="type" :pattern="pattern" :placeholder="placeholder" @focus="handleFocus" @blur="handleBlur">
        <label class="err">{{errTxt}}</label>
    </div>
</template>

<script>
  export default {
    name: 'cell-input',
    data () {
      return {
        errTxt: '',
        showerr: false
      }
    },
    props: {
      type: {
        type: String,
        default: 'text'
      },
      pattern: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      value: {
        type: String,
        default: ''
      },
      validator: {
        type: Function,
        default: function () {
          return {message: 'hello'}
        }
      }
    },
    methods: {
      updateValue: function (value) {
        this.$emit('input', value)
      },
      handleFocus: function () {
        this.showerr = false
      },
      handleBlur: function () {
        let res = this.validator(this.value)
        if (res) {
          this.showerr = true
          this.errTxt = res.errmsg
        } else {
          this.showerr = false
          this.errTxt = ''
        }
      },
      validate: function () {
        let res = this.validator(this.value)
        if (res) {
          this.showerr = true
          this.errTxt = res.errmsg
        } else {
          this.showerr = false
          this.errTxt = ''
        }
        return res === null
      }
    },
    watch: {
      validator: function () {
        this.validate()
      }
    }
  }
</script>

<style lang="less" scoped>
    .weui-cell__bd {
        position: relative;
        input {
            top: 0;
        }
        * {
            transition: .3s all;
        }
        .err {
            font-size: 10px;
            color: #FF5465;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            z-index: 1;
        }
        .weui-input {
            position: relative;
            z-index: 2;
        }
        &.showerr {
            .err {
                opacity: 1;
                top: -6px;
            }
            input {
                top: 6px;
            }
        }
    }
</style>
