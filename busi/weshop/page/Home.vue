<template>
    <div class="page show">
        <tab-bar :contactMobile="'tel:'+storeDto.contactMobile">
            <div slot="tab_panel" class="page-inner">
                <!-- 首页头部 -->
                <wei-xin-top :style="wxTopStyle" :storeDto="storeDto"/>
                <div class="page-panel" ref="pagePanel" @scroll="handleScroll">
                    <!-- 轮播图和搜索框 -->
                    <swiper1 :advertiseList="advertiseList">
                        <search-box v-if="categoryTypeList.length > 0" slot="search_box"/>
                    </swiper1>
                    <!-- 公告栏 -->
                    <!-- <notice-box/> -->
                    <!-- 品类入口 -->
                    <nav-box :categoryTypeList="categoryTypeList"/>
                    <!-- 热销推荐 -->
                    <hot-box :hotSaleList="hotSaleList"/>
                    <!-- 店主推荐 -->
                    <recommend-box :userId="userId" :clientHeight="clientHeight" :scrollHeight="scrollHeight" :scroll-top="scrollTop" @tabtotop="handleTabToTop"/>
                </div>
            </div>
        </tab-bar>
    </div>
</template>

<script>
  import WeiXinTop from '../components/home/WeiXinTop'
  import Swiper1 from '../components/home/Swiper1'
  import SearchBox from '../components/home/SearchBox'
  import NoticeBox from '../components/home/NoticeBox'
  import NavBox from '../components/home/NavBox'
  import HotBox from '../components/home/HotBox'
  import RecommendBox from '../components/home/RecommendBox'
  import cm from '../cm'
  import axios from 'axios'
  import * as utils from '../util/utils'

  export default {
    name: 'home',
    components: {
      WeiXinTop,
      Swiper1,
      SearchBox,
      NoticeBox,
      NavBox,
      HotBox,
      RecommendBox
    },
    data () {
      return {
        scrollTop: 0, // 滚动距离
        clientHeight: 0, // 窗口高度
        scrollHeight: 0, // 页面高度
        lastTime: 0,
        wxTopStyle: '', // 首页头部距离顶部距离
        userId: location.search.split('=')[1] - 0, // 分销商id
        storeDto: {}, // 店铺信息
        advertiseList: [], // 广告列表
        categoryTypeList: [], // 品类列表入口
        hotSaleList: []// 热销产品列表
      }
    },
    mounted () {
      const self = this
      self.init()
    },
    methods: {
      init () {
        const self = this

        console.log('userId::::' + self.userId)
        // if(sessionStorage.getItem('userId')){
        //   self.userId = sessionStorage.getItem('userId')
        //   console.log('userId:' + self.userId)
        // }
        // 获取店铺信息
        // if(sessionStorage.getItem('storeDto')){
        //   self.storeDto = JSON.parse(sessionStorage.getItem('storeDto'))
        //   self.categoryTypeList = JSON.parse(sessionStorage.getItem('categoryTypeList'))
        // }else{
        //   self.getStoreInfo();
        // }
        self.getStoreInfo()
        // 获取广告位
        if (sessionStorage.getItem('advertiseList')) {
          self.advertiseList = JSON.parse(sessionStorage.getItem('advertiseList'))
        } else {
          self.getAdvertise()
        }
        // 获取热销推荐
        if (sessionStorage.getItem('hotSaleList')) {
          self.hotSaleList = JSON.parse(sessionStorage.getItem('hotSaleList'))
        } else {
          self.getHotSale()
        }
      },
      getStoreInfo () {
        const self = this
        axios.get(cm.weshopHome.getStoreInfo, {
          params: {
            userId: self.userId
          }
        }).then(res => {
          if (res && res.data && res.data.result) {
            let result = res.data.result
            self.storeDto = {
              storeId: result.storeId, // 店铺id
              storeName: result.storeName, // 店铺名称
              storeLogo: result.storeLogo, // 店铺logo
              appQrcodeUrl: result.appQrcodeUrl, // 店铺公众号二维码
              categoryIds: result.categoryId, // 店铺支持的品类
              contactMobile: result.contactMobile// 店铺客服电话
            }
            utils.setTitle(self.storeDto.storeName)
            sessionStorage.setItem('storeId', self.storeDto.storeId)// 传storeId给个人中心
            sessionStorage.setItem('userId', self.userId)// 再次进入首页时获取userId
            sessionStorage.setItem('contactMobile', self.storeDto.contactMobile)
            let categoryIdArray = self.storeDto.categoryIds.split(',')
            categoryIdArray.forEach((item, index) => {
              if (item === 'TICKET') {
                self.categoryTypeList.push('景点门票')
              }
              if (item === 'HOTEL') {
                self.categoryTypeList.push('酒店')
              }
              if (item === 'ROUTE_GROUP') {
                self.categoryTypeList.push('跟团游')
              }
              if (item === 'ROUTE_LOCAL') {
                self.categoryTypeList.push('当地游')
              }
              if (item === 'ROUTE_FREEDOM') {
                self.categoryTypeList.push('自由行')
              }
              if (item === 'ROUTE_HOTEL_COMB') {
                self.categoryTypeList.push('酒店套餐')
              }
              if (item === 'COMB_CRUISE') {
                self.categoryTypeList.push('邮轮')
              }
              if (item === 'VISA') {
                self.categoryTypeList.push('签证')
              }
            })
            console.log('品类类型：')
            console.log(self.categoryTypeList)
            console.log('店铺信息:')
            console.log(self.storeDto)
            sessionStorage.setItem('storeDto', JSON.stringify(self.storeDto))
            sessionStorage.setItem('categoryTypeList', JSON.stringify(self.categoryTypeList))
          }
        })
      },
      getAdvertise () {
        const self = this
        axios.get(cm.weshopHome.getAdvertise, {
          params: {
            userId: self.userId
          }
        }).then(res => {
          if (res && res.data) {
            let result = res.data.infos
            result.forEach((item, index) => {
              let advertise = {
                advertiseImageUrl: item.advertiseImageUrl, // 广告位图片
                advertiseTitle: item.advertiseTitle, // 广告位标题
                advertiseLink: item.advertiseLink, // 广告位链接
                showLocation: item.showLocation, // 广告位位置（PAGETOP：页面头部）
                showType: item.showType, // 广告位展示方式（CAROUSEL：轮播显示）
                sortFlag: item.sortFlag// 排序标记
              }
              self.advertiseList.push(advertise)
            })
            console.log('广告位列表：')
            console.log(self.advertiseList)
            sessionStorage.setItem('advertiseList', JSON.stringify(self.advertiseList))
          }
        })
      },
      getHotSale () {
        const self = this
        axios.get(cm.weshopHome.getHotSale, {
          params: {
            userId: self.userId
          }
        }).then(res => {
          if (res && res.data) {
            self.hotSaleList = res.data
            console.log('热销产品列表')
            console.log(self.hotSaleList)
            sessionStorage.setItem('hotSaleList', JSON.stringify(self.hotSaleList))
          }
        })
      },
      // 滚动触发
      handleScroll (ev) {
        let currentTime = new Date().getTime()
        // if ((currentTime - this.lastTime) > 200) {
        //   }
        this.lastTime = currentTime
        this.scrollTop = ev.target.scrollTop
        this.scrollHeight = ev.target.scrollHeight
        this.clientHeight = ev.target.clientHeight
        console.log('滚动距离：' + this.scrollTop)
      },
      // 被子组件监听触发
      handleTabToTop (dis) {
        console.log(dis)
        if (dis > 44) {
          dis = 0
        } else if (dis <= 44 && dis >= 0) {
          dis = 44 - dis
        } else {
          dis = 44
        }
        console.log('wxTopStyle:' + 'top:-' + dis + 'px')
        this.wxTopStyle = 'top:-' + dis + 'px'
      }
    }
  }
</script>

<style lang="less" scoped>
    @import "../style/base";

    .page-panel {
        padding: 50px 0 48px;
    }
</style>
