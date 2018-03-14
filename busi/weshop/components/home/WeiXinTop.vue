<template>
  <section class="mp-wx">
    <img class="mp-logo" :src="storeDto.storeLogo"/>
    <h3>{{storeDto.storeName}}</h3>
    <a class="star" @click="handleShow">关注</a>
    <transition name="fade">
      <section v-show="qrShow" class="qr-wrap">
        <div class="qr-inner">
          <h4>关注店铺公众号</h4>
          <img :src="storeDto.appQrcodeUrl"/>
          <!-- <div class="qrcode" id="qrcode" style="width:200px;height:200px;margin:20px auto"></div> -->
          <p>长按识别二维码</p>
          <i @click="handleClose"></i>
        </div>
      </section>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'wei-xin-top',
    props:[
      'storeDto'
    ],
    data () {
      return {
        qrShow: false
      }
    },
    methods: {
      handleClose () {
        this.qrShow = false
      },
      handleShow () {
        const self = this;
        self.qrShow = true
        console.log(self.storeDto.appQrcodeUrl)
        // self.getQRCode(self.storeDto.storeUrlShort);
      },
      getQRCode(shareUrl) {
        const self = this;
        console.log(shareUrl)
        const qrCodeElem = document.getElementsByClassName('qrcode')[0];
        console.log(qrCodeElem)
        if(shareUrl && qrCodeElem){
          common.loadPlugin('//pics.lvjs.com.cn/mobile/coding/v2/my/recGift/static/js/qrcode.min.js', function() {
            new QRCode(qrCodeElem, {
                        width : 200,
                        height : 200
                    }).makeCode(shareUrl);
              self.storeDto.storeUrlShort = null;
          });
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../style/base";

  .mp-wx {
    background-color: #ffffff;
    padding: 11px;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    line-height: 14px;
    height: 50px;
    box-sizing: border-box;
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 600;
    align-items: center;
    transition: all .2s;
    > h3 {
      flex: 1;
      font-size: 14px;
      color: #333333;
      letter-spacing: 0;
      /*line-height: 28px;*/
      font-weight: normal;
    }
  }

  .mp-logo {
    display: block;
    width: 28px;
    height: 28px;
    margin-right: 6.5px;
  }

  .star {
    display: block;
    background: #FF8800;
    border-radius: 100px;
    width: 47px;
    height: 22px;
    line-height: 22px;
    color: #ffffff;
    text-align: center;
    padding-left: 15px;
    font-size: 12px;
    position: relative;
    &:before {
      content: "";
      display: block;
      position: absolute;
      left: 10px;
      top: 5px;
      background: url("../../images/start-icon-1.png") no-repeat center;
      width: 12px;
      height: 12px;
      background-size: 100%;
    }
  }

  .qr-wrap {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.50);
    top: 0;
    left: 0;
    z-index: 600;
  }

  .qr-inner {
    width: 285/@rem;
    height: 350/@rem;
    background-color: #ffffff;
    border-radius: 14px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    h4 {
      font-size: 14px;
      color: #333333;
      line-height: 14px;
      text-align: center;
      margin-top: 20/@rem;
    }
    img {
      display: block;
      width: 200/@rem;
      height: 200/@rem;
      margin: 0 auto;
      margin-top: 20/@rem;
    }
    p {
      font-size: 12px;
      color: #666666;
      text-align: center;
      margin-top: 20/@rem;
    }
    i {
      display: block;
      background: url("../../images/close-icon-1.png") no-repeat center;
      background-size: 100%;
      margin: 0 auto;
      margin-top: 25/@rem;
      width: 30/@rem;
      height: 30/@rem;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
