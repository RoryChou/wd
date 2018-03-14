<template>
  <div class="info-box">
    <div class="content" @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd' :style="deleteSlider">
      <h3>{{model.visitorName}}</h3>
      <p>手机号：{{mobile}}</p>
      <p v-if="model.visitorCardRelation">{{cardType}}：{{cardNumber}}</p>
      <p v-else style="color:red">信息不完整请补充信息</p>
      <i class="edit" @click="handleEdit(model.visitorId)"></i>
    </div>
    <div class="remove" ref='remove' @click="handleDelete(model)">删除</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        moveX: 0,
        moveY: 0,
        disX: 0,
        disY: 0,
        deleteSlider: '',
          mobile:'',
          cardType :'',
          cardNumber :''
      }
    },
      mounted(){
          this.init()
      },
    props: {
      model: Object
    },
    methods: {
        init:function () {
          //初始化手机号
            if(this.model!=null && this.model.visitorMobile!=null){
              var mobile = this.model.mobileNum;
              if (this.model.regionNum == '86') {
                //国内手机号(86的)显示规则：中间四位****号显示
                this.mobile = mobile.substr(0, 3)
                for (var i = 0; i < mobile.length - 7; i++) {
                  this.mobile += '*'
                }
                this.mobile += mobile.substr(-4)
              } else {
                //境外（非86的）显示规则：手机号位数小于或者是等于5位时，全部都是星号显示，大于5位时，前面两位和最后两位显示，中间部分星号
                if (mobile.length < 6) {
                  for (var i = 0; i < mobile.length; i++) {
                    this.mobile += '*'
                  }
                } else {
                  this.mobile = mobile.substr(0, 2)
                  for (var i = 0; i < mobile.length - 4; i++) {
                    this.mobile += '*'
                  }
                  this.mobile += mobile.substr(-2)
                }
              }
            }
          //初始化证件号
          if (this.model != null && this.model.visitorCardRelation != null) {
            this.cardType = this.model.visitorCardRelation[0].type
            var cardNum = this.model.visitorCardRelation[0].cardNumber + ''
            this.cardNumber = cardNum.substr(0, 1)
            if (cardNum.length > 2) {
              for (var i = 0; i < cardNum.length - 2; i++) {
                this.cardNumber += '*'
              }
            }
            this.cardNumber += cardNum.substr(-1)
          }

        },
      touchStart (ev) {
        ev = ev || event
        if (ev.touches.length === 1) {
          this.startX = ev.touches[0].clientX
          this.startY = ev.touches[0].clientY
        }
      },
      touchMove (ev) {
        ev = ev || event
        let wd = this.$refs.remove.offsetWidth
        if (ev.touches.length === 1) {
          this.moveX = ev.touches[0].clientX
          this.moveY = ev.touches[0].clientY
          this.disX = this.startX - this.moveX
          this.disY = this.startY - this.moveY
          if (Math.abs(this.disY) >= Math.abs(this.disX)) {
            return
          }
          if (this.disX < 0 || this.disX === 0) {
            this.deleteSlider = 'transform:translateX(0px)'
          } else if (this.disX > 0) {
            this.deleteSlider = 'transform:translateX(-' + this.disX * 1.5 + 'px)'
            if (this.disX * 1.5 >= wd) {
              this.deleteSlider = 'transform:translateX(-' + wd + 'px)'
            }
          }
        }
      },
      touchEnd (ev) {
        ev = ev || event
        let wd = this.$refs.remove.offsetWidth
        if (ev.changedTouches.length === 1) {
          let endX = ev.changedTouches[0].clientX
          let endY = ev.changedTouches[0].clientY
          this.disX = this.startX - endX
          this.disY = this.startX - endY
          if (Math.abs(this.disY) >= Math.abs(this.disX)) {
            return
          }
          if ((this.disX * 1.5) < (wd / 2)) {
            this.deleteSlider = 'transform:translateX(0px)'
          } else {
            this.deleteSlider = 'transform:translateX(-' + wd + 'px)'
          }
        }
      },
      handleDelete (model) {
        this.$emit('delete', model)
      },
      handleEdit (id) {
        this.$emit('edit', id)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../style/base";

  .info-box {
    margin-top: 10/@rem;
    background: #FFFFFF;
    border-radius: 5px;
    height: 84px;
    position: relative;
    user-select: none;
    .content {
      position: absolute;
      padding: 15px 10px;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: #ffffff;
      z-index: 100;
      transition: 0.3s;
      h3 {
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
        line-height: 14px;
      }
      p {
        font-size: 12px;
        color: #999999;
        letter-spacing: 0;
        line-height: 12px;
        margin-top: 8px;
      }
      .edit {
        display: block;
        width: 17/@rem;
        height: 17/@rem;
        position: absolute;
        right: 10px;
        top: 10px;
        background: url("../../images/edit-icon-1.png") no-repeat center;
        background-size: 100%;
      }
    }
    .remove {
      position: absolute;
      width: 65px;
      height: 84px;
      background: #F76260;
      right: 0;
      top: 0;
      text-align: center;
      font-size: 12px;
      color: #FFFFFF;
      line-height: 84px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
</style>
