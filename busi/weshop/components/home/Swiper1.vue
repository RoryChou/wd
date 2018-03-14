<template>
  <section class="swiper-wrap">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="(item, index) in advertiseList" :key="item.sortFlag">
        <a>
          <img :data-src="item.advertiseImageUrl" :src="index===0?item.advertiseImageUrl:''" class="swiper-lazy"/>
        </a>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination swiper-pagination-1" slot="pagination"></div>
    </swiper>
    <section class="search-box">
      <slot name="search_box"/>
    </section>
  </section>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    name: 'swiper1',
    props:[
      'advertiseList'
    ],
    components: {
      swiper,
      swiperSlide
    },
    data () {
      return {
        swiperOption: {
          autoplay: true,
          loop: true,
          pagination: {
            el: '.swiper-pagination'
          },
          lazy: {
            loadPrevNext: true
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../style/base";

  .swiper-wrap {
    position: relative;
  }

  .swiper-slide {
    a {
      display: block;
      width: 100%;
      height: 160/@rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .search-box {
    position: absolute;
    width: 100%;
    bottom: 10/@rem;
    left: 0;
    z-index: 2;
  }

</style>

<style lang="less">
  @import "../../style/base";

  .swiper-pagination-1 {
    text-align: right;
    width: 98% !important;
    line-height: 5px;
    bottom: 50/@rem !important;
    .swiper-pagination-bullet {
      width: 5px;
      height: 5px;
      background: rgba(255, 255, 255, 0.7);
      transition: width .5s;
    }
    .swiper-pagination-bullet-active {
      width: 12px;
      border-radius: 4px;
    }
  }
</style>
