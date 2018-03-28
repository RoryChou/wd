<template>
  <section class="page" :class="{show:c_PageShow}" :style="{minHeight:clientHeight+'px'}">
    <header class="header">
      <div class="top">
        <div class="back" @click="handleBackClick"></div>
        <a class="download" v-bind:href="downloadHref"></a>
      </div>
    </header>
    <div class="banner" ref="banner">
      <section class="swiper-wrap">
        <swiper :options="c_SwiperOption" ref="mySwiper">
          <swiper-slide v-for="image in imageList">
            <a>
              <img
                v-bind:data-src="image.url"
                class="swiper-lazy"/>
            </a>
          </swiper-slide>
        </swiper>
      </section>
    </div>
    <footer class="footer">
      <div class="paging">
        {{imageCurrent}}
        /
        {{imageTotal}}
        张
      </div>
    </footer>
  </section>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    name: 'view-large-images',
    components: {
      swiper,
      swiperSlide
    },
    data () {
      return {
        c_PageShow: false,
        clientHeight: document.documentElement.clientHeight,
        imageList: [
          {
            url: '//pics.lvjs.com.cn//uploads/pc/place2/2017-06-23/294d8e11-7cb7-4e46-a8e5-96c237775de9_1280_.jpg'
          },
          {
            url: '//pic.lvmama.com//uploads/pc/place2/2015-05-20/9deacddb-2a9b-4bf4-87be-eb934f799278_1280_.jpg'
          },
          {
            url: '//pic.lvmama.com//uploads/pc/place2/2017-05-08/ae67c3ad-6d9f-48ea-8748-e0f0c7ed7998_1280_.jpg'
          },
          {
            url: '//pic.lvmama.com//uploads/pc/place2/100792/1370684426225_1280_.jpg'
          },
          {
            url: '//pic.lvmama.com//uploads/pc/place2/100792/1370684416975_1280_.jpg'
          },
          {
            url: '//pic.lvmama.com//uploads/pc/place2/2015-06-17/963f004c-bb67-48d1-91af-6f548fe7b706_1280_.jpg'
          }
        ],
        imageIndex: 0,
        c_SwiperOption: {
          autoplay: false,
          loop: true,

          lazy: {
            loadPrevNext: true
          }
        }
      }
    },
    computed: {
      swiper () {
        return this.$refs.mySwiper.swiper
      },
      downloadHref () {
        return this.imageList[this.imageIndex].url
      },
      imageCurrent () {
        return this.imageIndex + 1
      },
      imageTotal () {
        return this.imageList.length
      }
    },
    mounted () {
      let self = this
      this.c_PageShow = true
      this.swiper.on('slideChangeTransitionEnd', function () {
        let count = self.imageList.length
        self.imageIndex = (this.activeIndex + count - 1) % count
      })
    },
    methods: {
      handleBackClick: function () {
        this.$router.back()
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/base";

  .page {
    background-color: #333333;
    display: flex;
    flex-direction: column;
  }

  .header {
    height: 100px;
    box-sizing: border-box;
    padding: 20px;
    flex-grow: 1;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .back {
      background-image: url(../images/back_white_icon.png);
      width: 30px;
      height: 30px;
      background-size: cover;
    }
    .download {
      margin: 7px 9px;
      display: block;
      width: 13px;
      height: 16px;
      background-image: url(../images/download_icon.png);
      background-size: cover;
    }
  }

  .footer {
    height: 100px;
    flex-grow: 1;
  }

  .banner {
    position: relative;
    height: 0;
    width: 100%;
    padding-bottom: 66.7%;
    overflow: hidden;
    background-size: 100%;
    -webkit-background-size: 100%;
    background: url(../images/default-banner.png) no-repeat;
    z-index: 1;

  }

  .swiper-slide {
    > a {
      display: block;
      width: 100%;
      height: 250/@rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .paging {
      bottom: 30px;
      position: absolute;
      font-size: 12px;
      text-align: center;
      color: #fff;
    }
  }
</style>
