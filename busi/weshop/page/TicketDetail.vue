<template>
  <section class="page" :class="{show:c_PageShow}">
    <lv-header :show="mainHeaderShow" :shadow="!navShow" title="东方明珠">
      <div class="lvHeader-right">
        <!--<div class="lvHeader-favourite" :class="{favourited:userFavourited}"></div>-->
      </div>
    </lv-header>
    <nav class="navFixed" v-show="navShow">
      <span :class="{active:!c_NoticeInView}">订票</span>
      <span :class="{active:c_NoticeInView}">须知</span>
    </nav>
    <div class="banner" ref="banner">
      <div class="banner-header">
        <div class="back"></div>
        <!--<div class="favourite" :class="{favourited:userFavourited}"></div>-->
      </div>
      <section class="swiper-wrap">
        <swiper :options="c_SwiperOption" v-if="ticketProductDto.imageList">
          <swiper-slide v-for="(image, index) in ticketProductDto.imageList" :key="index">
            <a>
              <img :data-src="image.photoUrl" :src="index===0?image.photoUrl:''" class="swiper-lazy"/>
            </a>
          </swiper-slide>
        </swiper>
        <div class="imgCount">
          <div class="swiper-number" slot="pagination"></div>
        </div>
      </section>
    </div>
    <div class="viewspot-infos borderRedius" ref="infos">
      <div class="productName">
        <p>
          {{ticketProductDto.productName}}
          <i>{{ticketProductDto.star}}[5A景区--暂无数据]</i>
          <em>已下线--暂无接口</em>
        </p>
      </div>
      <div class="addressWrap"><p class="address">
        {{ticketProductDto.baiduComCoordinateVo&&ticketProductDto.baiduComCoordinateVo.address}}
      </p></div>
      <div class="intro-main">
        <router-link class="intro-link left" to="/ticket/introduction">
          <p>景区须知</p>
          <span>开放时间、入园须知</span>
        </router-link>
        <div class="intro-link right">
          <p>分享产品</p>
          <span>分享产品分享产品</span>
        </div>
      </div>
      <div class="notice">{{ticketProductDto.abroad}}光大银行信用卡支付满300减100--暂无数据</div>
      <div class="supplier-box">
        <div class="supplier">
          <i class="supplier-lvmama"></i>供应商:驴妈妈旅游网
        </div>
      </div>
    </div>
    <ticket-group v-for="(item,index) in ticketGroups" :key="index" :iniOpened="index===0" :ticketGroup="item"/>
    <div class="detail-notice" ref="notice">
      <h3>景区须知</h3>
      <div class="detailSpots detailShow">
        <div class="notice-list">
          <h2 class="redPoint">开放时间</h2>
          <p class="noticeDesc">{{ticketProductDto.saleTime}}</p>
        </div>
        <div class="notice-list">
          <h2 class="redPoint">免票政策</h2>
          <p class="noticeDesc">{{ticketProductDto.freePolicy}}</p>
        </div>
        <div class="notice-list">
          <h2 class="redPoint">优惠政策</h2>
          <p class="noticeDesc">{{ticketProductDto.favouredPolicy}}</p>
        </div>
        <div class="notice-list">
          <h2 class="redPoint">重要说明</h2>
          <p class="noticeDesc">{{ticketProductDto.bookDescription}}</p>
        </div>
        <div class="notice-list">
          <h2 class="redPoint">开具发票</h2>
          <p class="noticeDesc">{{ticketProductDto.invoicePolicy}}</p>
        </div>
      </div>
      <div class="notice-all">
        <span>包括</span>
        <div>
          <div><span>开放时间</span></div>
          <div><span>免票政策</span></div>
          <div><span>优惠人群</span></div>
          <div><span>开具发票</span></div>
          <div><span>温馨提示</span></div>
        </div>
      </div>
      <div class="more-comment">
        <span>查看全部景区须知</span>
      </div>
    </div>
    <div class="bottom-tips">
      <span>亲，拉到最底啦~</span>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import TicketGroup from '../components/ticket/TicketGroup'
  import LvHeader from '../components/global/LvHeader'

  export default {
    name: 'ticket-detail',
    components: {
      swiper,
      swiperSlide,
      TicketGroup,
      LvHeader
    },
    data () {
      return {
        c_PageShow: false,
        c_SwiperOption: {
          autoplay: false,
          loop: true,
          pagination: {
            el: '.swiper-number',
            type: 'fraction'
          },
          lazy: {
            loadPrevNext: true
          }
        },
        c_BannerHeight: 0,
        c_ScrollTop: 0,
        c_LoadingShow: false,
        c_InfoHeight: 0,
        c_NoticeInView: false,
        // 用户是否收藏
        userFavourited: true,

        //门票基本信息
        ticketProductDto: {},

        ticketGroups: [
          {
            typeClass: 'PROMOTESALE',
            typeTxt: '推荐',
            tickets: [
              {
                id: 1,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '最高返¥2'
              },
              {
                id: 1,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '最高返¥2'
              },
              {
                id: 1,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '最高返¥2'
              },
              {
                id: 1,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '最高返¥2'
              },
              {
                id: 1,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '最高返¥2'
              },
              {
                id: 1,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '最高返¥2'
              },
              {
                id: 1,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '最高返¥2'
              }
            ]
          },
          {
            typeClass: 'ADULT',
            typeTxt: '成人票',
            tickets: [
              {
                id: 1,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              },
              {
                id: 2,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              }
            ]
          },
          {
            typeClass: 'CHILDREN',
            typeTxt: '儿童票',
            tickets: [
              {
                id: 1,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              },
              {
                id: 2,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              }
            ]
          },
          {
            typeClass: 'COMMON',
            typeTxt: '相关票',
            tickets: [
              {
                id: 1,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              },
              {
                id: 2,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              }
            ]
          },
          {
            typeClass: 'COMMON',
            typeTxt: '组合套票',
            tickets: [
              {
                id: 1,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              },
              {
                id: 2,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              }
            ]
          },
          {
            typeClass: 'COMMON',
            typeTxt: '优待票',
            tickets: [
              {
                id: 1,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              },
              {
                id: 2,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              }
            ]
          },
          {
            typeClass: 'COUPE',
            typeTxt: '双人票',
            tickets: [
              {
                id: 1,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              },
              {
                id: 2,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              }
            ]
          },
          {
            typeClass: 'DINNER',
            typeTxt: '成人票',
            tickets: [
              {
                id: 1,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              },
              {
                id: 2,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              }
            ]
          },
          {
            typeClass: 'DISABILITY',
            typeTxt: '残疾票',
            tickets: [
              {
                id: 1,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              },
              {
                id: 2,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              }
            ]
          },
          {
            typeClass: 'FAMILY',
            typeTxt: '家庭票',
            tickets: [
              {
                id: 1,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              },
              {
                id: 2,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              }
            ]
          },
          {
            typeClass: 'GROUP',
            typeTxt: '团体票',
            tickets: [
              {
                id: 1,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              },
              {
                id: 2,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              }
            ]
          },
          {
            typeClass: 'LOVER',
            typeTxt: '情侣票',
            tickets: [
              {
                id: 1,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              },
              {
                id: 2,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              }
            ]
          },
          {
            typeClass: 'OLDMAN',
            typeTxt: '老人票',
            tickets: [
              {
                id: 1,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              },
              {
                id: 2,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              }
            ]
          },
          {
            typeClass: 'PARENTAGE',
            typeTxt: '亲子票',
            tickets: [
              {
                id: 1,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              },
              {
                id: 2,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              }
            ]
          },
          {
            typeClass: 'SOLDIER',
            typeTxt: '军人票',
            tickets: [
              {
                id: 1,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              },
              {
                id: 2,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              }
            ]
          },
          {
            typeClass: 'STUDENT',
            typeTxt: '学生票',
            tickets: [
              {
                id: 1,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              },
              {
                id: 2,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              }
            ]
          },
          {
            typeClass: 'TEACHER',
            typeTxt: '教师票',
            tickets: [
              {
                id: 1,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              },
              {
                id: 2,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              }
            ]
          },
          {
            typeClass: 'WOMAN',
            typeTxt: '女士票',
            tickets: [
              {
                id: 1,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              },
              {
                id: 2,
                name: '[门票]东方明珠观光E票-儿童票',
                tags: ['红包可用', '多订多惠', '赠'],
                notes: ['19:00前可订今日票', '随时退'],
                passLimit: '预订成功后1小时30分可入园',
                price: 165,
                onSale: '立减20元'
              }
            ]
          }
        ]

        //单独门票

      }
    },
    mounted () {
      this.c_BannerHeight = this.$refs.banner.offsetHeight
      this.c_InfoHeight = this.$refs.infos.offsetHeight
      if (sessionStorage.getItem('detailtobuy')) {
        sessionStorage.removeItem('detailtobuy')
        setTimeout(() => {
          document.documentElement.scrollTop = this.c_BannerHeight + this.c_InfoHeight - 78
          document.body.scrollTop = this.c_BannerHeight + this.c_InfoHeight - 78
        }, 5)
      }
      this.c_PageShow = true
      window.addEventListener('scroll', this.handleScroll)

      //加载基本信息
      this.loadBasicInfoData()

      //加载须知数据
      this.loadNoticeData()

    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
      handleScroll: function (ev) {
        this.c_ScrollTop = ev.currentTarget.scrollY
        this.c_NoticeInView = (this.$refs.notice.offsetTop - this.c_ScrollTop - document.documentElement.clientHeight) <= 0
      },

      //加载基本信息
      loadBasicInfoData: function () {
        let self = this

        let url = 'http://10.200.5.119:8082/weshopclient/ticket/index/2988304'
        axios.get(url, {
          params: {}
        }).then(res => {
          let resData = res.data
          if (/*resData.success*/1) {

            self.ticketProductDto = resData.ticketProductDto
            console.log(resData)
          }
        })

      },

      loadNoticeData: function () {
        var params = {
          'goodsId': 4173126,
          'packageType': 'UN_PACK',
          'categoryId': 11
        }
        axios.post('http://10.200.5.119:8082/weshopclient/goods/tips', params).then(function (response) {
          let resData = response.data

          if (resData.success) {
            console.log(resData)
          }
        })
      }

    },
    computed: {
      mainHeaderShow: function () {
        return this.c_ScrollTop + 45 > this.c_BannerHeight
      },
      navShow: function () {
        return this.c_ScrollTop + 80 > this.c_InfoHeight + this.c_BannerHeight
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/base";

  .page {
    position: relative;
    background-color: #eeeef5;
    opacity: 0;
    transition: opacity .5s;
    &.show {
      opacity: 1;
    }
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
    .imgCount {
      border-radius: 20px;
      position: absolute;
      bottom: 20px;
      margin-bottom: 15px;
      right: 10px;
      background-color: rgba(0, 0, 0, .35);
      z-index: 2;
      .swiper-number {
        color: #fff;
        font-size: 12px;
        background: url(../images/banner_count.png) 10px 5px no-repeat;
        /*width: 56px;*/
        height: 20px;
        line-height: 19px;
        -webkit-background-size: 12px 10px;
        background-size: 12px 10px;
        padding: 0 10px 0 25px;
        z-index: 1;
        /*display: none;*/
        box-sizing: border-box;
      }
    }
  }

  .banner-header {
    width: 100%;
    height: 45px;
    position: fixed;
    top: 0;
    left: 0;
    line-height: 45px;
    box-sizing: border-box;
    z-index: 10;
    > div {
      &.back {
        background: url(../images/back_icon2.png) 50% no-repeat;
        background-size: 30px;
        position: absolute;
        bottom: 0;
        left: 10px;
        height: 45px;
        width: 35px;
      }
      &.favourite {
        background: url(../images/favourite_gray1.png) 50% no-repeat;
        background-size: 30px;
        position: absolute;
        bottom: 0;
        right: 10px;
        height: 45px;
        width: 35px;
        &.favourited {
          background: url(../images/favourite_gray2.png) 50% no-repeat;
          background-size: 30px
        }
      }
    }
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

  .viewspot-infos {
    background: #fff;
    font-size: .24rem;
    color: #666;
    position: relative;
    z-index: 1;
    &.borderRedius {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      margin-top: -10px;
      margin-bottom: 10px
    }
    p {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 20px;
      position: relative;
      padding: 15px 15px 0;
      &.address {
        padding-left: 30px;
        font-size: 13px;
        display: inline-block;
        padding-top: 10px;
        max-width: 100%;
        padding-right: 25px;
      }
    }
    .productName {
      p {
        font-size: 20px;
        height: auto;
        color: #333;
        font-weight: 600;
        overflow: initial;
        white-space: inherit;
        text-overflow: initial;
        i {
          font-size: 14px;
          font-weight: 400;
          font-style: normal;
        }
        em {
          background: #C7CACE;
          border-radius: 100px;
          line-height: 18px;
          font-size: 10px;
          color: #fff;
          margin-left: 5px;
          font-weight: normal;
          font-style: normal;
          padding: 0 7px;
        }
      }
    }
    .addressWrap {
      background-color: #fff;
      position: relative;
    }
    .address {
      &:before {
        content: "";
        background: url(../images/address-icon.png) no-repeat;
        width: 11px;
        height: 14px;
        background-size: 100% 100%;
        position: absolute;
        left: 15px;
        top: 13px;
      }
      &:after {
        content: "";
        position: absolute;
        top: 20px;
        right: 14px;
        width: 8px;
        height: 13px;
        transform: translateY(-50%) scale(.8);
        background: url(../images/after_icon.png) no-repeat;
        background-size: 8px 13px;
      }
    }
    .intro-main {
      width: 100%;
      height: 60px;
      overflow: hidden;
      padding: 0 15px;
      margin-top: 6px;
      box-sizing: border-box;
      > .intro-link {
        background: #F7F7FB;
        width: calc(~'50% - 5px');
        float: left;
        border-radius: 3px;
        height: 50px;
        padding-top: 10px;
        padding-left: 10px;
        position: relative;
        box-sizing: border-box;
        > p {
          padding: 0;
          font-size: 13px;
          line-height: 13px;
          color: #333;
          i {
            font-size: 13px;
            font-weight: 700;
            font-style: normal;
          }
        }
        &.right {
          float: right;
        }
        > span {
          font-size: 11px;
          color: #999;
          line-height: 11px;
          display: block;
          margin-top: 5px;
        }
        &:before {
          content: "";
          position: absolute;
          top: 50%;
          right: 10px;
          width: 8px;
          height: 13px;
          transform: translateY(-50%);
          background: url(../images/after_icon.png) no-repeat;
          background-size: 8px 13px;
        }
        &:after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          border: 1px solid #EBEBF0;
          box-sizing: border-box;
          width: 200%;
          height: 200%;
          border-radius: 5px;
          transform: scale(.5);
          transform-origin: 0 0;
        }
      }
    }
    .notice {
      line-height: 11px;
      background: #fff;
      margin: 0 15px;
      padding: 10px 30px 10px 17px;
      font-size: 11px;
      color: #5CA2F8;
      position: relative;
      overflow: hidden;
      /*border-style: solid;*/
      /*border-width: 0 0 1px;*/
      &.promotionActivity {
        color: #666;
      }
      &:last-child {
        border-width: 0;
      }
      &:before {
        content: "";
        background: url(../images/blue_horn.png) no-repeat;
        width: 11px;
        height: 10px;
        background-size: 100% 100%;
        position: absolute;
        left: 1px;
        top: 10px;
      }
      &:after {
        content: "";
        position: absolute;
        top: 15px;
        right: 0;
        width: 8px;
        height: 13px;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        background: url(../images/after_icon.png) no-repeat;
        background-size: 8px 13px;
      }
    }
    .supplier-box {
      display: flex;
      padding: 10px 15px 15px 15px;
    }
    .supplier {
      align-items: center;
      line-height: 18px;
      padding: 0 5px;
      background: #FFFFFF;
      border: 1px solid #BEC1CB;
      border-radius: 100px;
      display: flex;
      overflow: hidden;
      font-size: 10px;
      color: #7F8496;
    }
    .supplier-lvmama {
      margin-right: 4px;
      display: block;
      background-image: url(../images/supplier-lvmama.png);
      width: 13px;
      height: 14px;
      background-size: cover;
    }
  }

  .detail-notice {
    background-color: #ffffff;
    h3 {
      position: relative;
      font-size: 16px;
      color: #333;
      line-height: 16px;
      background-color: #fff;
      padding: 11px 15px 0;
      font-weight: 700;
    }
    .detailShow {
      height: 150px;
      overflow: hidden;
      margin-bottom: 18px;
    }
    .notice-list {
      position: relative;
      background: #fff;
      font-size: .28rem;
      color: #666;
      border: 0 solid;
      margin: 0;
      padding: 5px 10px;
      &:first-child {
        padding-top: 4px;
      }
      p {
        white-space: pre-wrap;
        position: relative;
        line-height: 18px;
        font-size: 12px;
        color: #666;
      }
    }
    .redPoint {
      padding-left: .4rem;
      position: relative;
      font-size: 14px;
      color: #333;
      line-height: 14px;
      padding-top: 5px;
      padding-bottom: 5px;
      margin: 0;
      &:before {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        background-image: url(../images/notice_icon.png);
        background-size: 100%;
        -webkit-background-size: 100%;
        top: 8px;
        left: 5px;
      }
    }
    .noticeDesc {
      padding-left: 20px;
    }
    .notice-all {
      margin: 10px 15px 24px;
      -webkit-border-image: url(data:image/gif;base64,R0lGODlhBQAFAPABANra2v///yH5BAUHAAEALAAAAAAFAAUAAAIHhB9pGatnCgA7) 2 stretch;
      border-style: solid;
      border-width: 1px 0 0;
      position: relative;
      * {
        box-sizing: border-box;
      }
      > span {
        color: #999;
        background-color: #fff;
        padding: 0 10px;
        font-size: 12px;
        line-height: 18px;
        height: 18px;
        position: absolute;
        top: -10px;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
      }
      > div {
        margin-top: 4px;
        overflow: hidden;
        > div {
          width: 33.33%;
          float: left;
          color: #333;
          font-size: 14px;
          line-height: 14px;
          padding-top: 15px;
          padding-left: 15px;
          > span {
            position: relative;
            &:after {
              content: '';
              display: block;
              width: 10px;
              height: 10px;
              background-image: url(../images/notice_icon.png);
              background-size: 100%;
              -webkit-background-size: 100%;
              position: absolute;
              top: 4px;
              left: -15px;
            }
          }
          &:nth-of-type(3n+1) {
            text-align: left;
          }
          &:nth-of-type(3n+2) {
            text-align: center;
          }
          &:nth-of-type(3n+3) {
            text-align: right;
          }
        }
      }
    }
    .more-comment {
      height: 50px;
      line-height: 30px;
      text-align: center;
      background: #fff;
      > span {
        font-size: 13px;
        display: block;
        width: 146px;
        height: 30px;
        line-height: 30px;
        color: #5CA2F8;
        position: relative;
        z-index: 1;
        margin: 0 auto;
        &:after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          border: 1px solid #5CA2F8;
          box-sizing: border-box;
          width: 200%;
          height: 200%;
          border-radius: 40px;
          -webkit-transform: scale(.5);
          transform: scale(.5);
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
        }
      }
    }
  }

  .bottom-tips {
    width: 100%;
    height: 60px;
    text-align: center;
    line-height: 60px;
    color: #999;
    font-size: 12px;
    position: relative;
    span {
      color: #999;
      font-size: 12px;
      position: relative;
      &:after, &:before {
        content: '';
        height: 1px;
        width: 33px;
        border-top: 1px solid #D6D6D8;
        position: absolute;
        top: 7px;
      }
      &:before {
        left: -42px;
      }
      &:after {
        right: -42px;
      }
    }
  }

  .navFixed {
    /*display: none;*/
    overflow: hidden;
    line-height: 35px;
    height: 35px;
    text-align: center;
    background: #fff;
    position: fixed;
    width: 100%;
    top: 44px;
    z-index: 2;
    /*display: block;*/
    box-shadow: 0 0 10px #ddd;
    display: flex;
    span {
      font-size: 15px;
      flex: 1;
      &.active {
        font-weight: 700;
        display: inline-block;
        background: url(../images/tab_active.png) no-repeat;
        background-size: 30px 4px;
        background-position-y: 32px;
        background-position-x: center;
      }
    }
  }
</style>
