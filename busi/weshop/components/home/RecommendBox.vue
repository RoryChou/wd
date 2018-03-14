<template>
  <section class="recommed-box">
    <div class="recom-title" ref="tabs" :class="{mb44:tabToTop<=0}">
      <h2>店主推荐</h2>
    </div>
    <div class="srcoll-tabs-wrap" :class="{fixed:tabToTop<=0}">
      <div class="srcoll-tabs">
        <a v-for="(item, index) in recommendCategoryTypesCN" :class="{active: item === categoryActiveTypeCN}" @click="changeActive(item,index)">{{item}}</a>
      </div>
    </div>
    <div class="recom-list">
      <recommend-item :categoryActiveTypeCN="categoryActiveTypeCN" :recommendProd="item" v-for="(item, index) in recommendProds" :key="index"/>
    </div>
    <div class="load-more">
      <div class="weui-loadmore" v-if="isLoading">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
      </div>
      <div class="weui-loadmore weui-loadmore_line" v-if="!isLoading">
        <span class="weui-loadmore__tips">已加载显示全部内容</span>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'
  import RecommendItem from './RecommendItem'
  import cm from '../../cm'

  export default {
    name: 'recommend-box',
    props: [
      'scrollTop',
      'userId',
      'clientHeight',
      'scrollHeight'
    ],
    components: {
      RecommendItem
    },
    data () {
      return {
        tabOffsetTop: 1000,
        loadMoreOffsetTop: 1000,
        recommendList: [],//店铺推荐列表
        recommendCategoryTypesCN: [],//店铺推荐品类中文
        recommendCategoryTypesEN: [],//店铺推荐品类英文
        categoryActiveTypeCN: "",//店主选中推荐品类中文
        categoryActiveTypeEN: "",//店主选中推荐品类英文
        pageNo: 1,//推荐位产品默认第一页
        pageSize: 12,//每此下拉展示12条数据
        recommendProds: [],//推荐位产品列表
        isLoading: false,//是否有产品加载
        interceptType: false//拦截多次加载请求
      }
    },
    
    mounted () {
      this.init();
    },
    methods: {
      init () {
        const self = this;
        if(sessionStorage.getItem('categoryActiveTypeEN')){
          self.categoryActiveTypeEN = sessionStorage.getItem('categoryActiveTypeEN')
          console.log(self.categoryActiveTypeEN)
        }
        if(sessionStorage.getItem(self.categoryActiveTypeEN)){
          self.recommendList = JSON.parse(sessionStorage.getItem('recommendList'))
          console.log(self.recommendList)
          self.recommendCategoryTypesEN = JSON.parse(sessionStorage.getItem('recommendCategoryTypesEN'))
          console.log(self.recommendCategoryTypesEN)
          self.recommendCategoryTypesCN = JSON.parse(sessionStorage.getItem('recommendCategoryTypesCN'))
          console.log(self.recommendCategoryTypesCN)
          self.categoryActiveTypeCN = sessionStorage.getItem('categoryActiveTypeCN')
          console.log(self.categoryActiveTypeCN)
          self.recommendProds = JSON.parse(sessionStorage.getItem(self.categoryActiveTypeEN))
          console.log(self.recommendProds)
          self.isLoading = JSON.parse(sessionStorage.getItem(self.categoryActiveTypeCN))
          console.log(self.isLoading)
          self.interceptType = JSON.parse(sessionStorage.getItem('interceptType'))
          console.log(self.interceptType)
        }else{
          self.getRecommendList();
        }
      },
      //获取推荐位列表(店主推荐/...)
      getRecommendList () {
        const self = this;
        axios.get(cm.weshopHome.getRecommendList,{params:{
          userId: self.userId
        }}).then(res => {
          if(res && res.data && res.data.infos){
            self.recommendList = res.data.infos;
            sessionStorage.setItem('recommendList',JSON.stringify(self.recommendList));
            console.log("推荐位列表recommendList:");
            console.log(self.recommendList);
            self.getRecommendCategoryTypes(self.recommendList[0].recommendId);
          }
        })
      },
      //获取某推荐位所有品类(景点门票/...)
      getRecommendCategoryTypes (recommendId) {
        const self = this
        axios.get(cm.weshopHome.getRecommendCategoryTypes, {
          params: {
            recommendId: recommendId
          }
        }).then(res => {
          if (res && res.data && res.data.infos) {
            self.recommendCategoryTypesEN = res.data.infos
            self.recommendCategoryTypesEN.forEach((item, index) => {
              if (item === 'TICKET') {
                self.recommendCategoryTypesCN.push('景点门票')
              }
              if(item==='HOTEL'){
                self.recommendCategoryTypesCN.push('酒店');
              }
              if(item==='ROUTE_FREEDOM'){
                self.recommendCategoryTypesCN.push('自由行');
              }
              if(item==='ROUTE_LOCAL'){
                self.recommendCategoryTypesCN.push('当地游');
              }
              if(item==='ROUTE_GROUP'){
                self.recommendCategoryTypesCN.push('跟团游');
              }
              if(item==='ROUTE_HOTEL_COMB'){
                self.recommendCategoryTypesCN.push('酒店套餐');
              }
              if(item==='COMB_CRUISE'){
                self.recommendCategoryTypesCN.push('邮轮');
              }
              if (item === 'VISA') {
                self.recommendCategoryTypesCN.push('签证')
              }
            })
            if (self.recommendCategoryTypesCN) {
              self.categoryActiveTypeCN = self.recommendCategoryTypesCN[0]
              self.categoryActiveTypeEN = self.recommendCategoryTypesEN[0]
            }
            console.log('推荐位的所有品类')
            console.log(self.recommendCategoryTypesCN)
            sessionStorage.setItem('recommendCategoryTypesEN', JSON.stringify(self.recommendCategoryTypesEN))
            sessionStorage.setItem('recommendCategoryTypesCN', JSON.stringify(self.recommendCategoryTypesCN))
            sessionStorage.setItem('categoryActiveTypeCN', self.categoryActiveTypeCN)
            sessionStorage.setItem('categoryActiveTypeEN', self.categoryActiveTypeEN)
            self.getRecommendProds(recommendId)
          }
        })
      },
      //获取某个品类的所有产品(迪士尼/...)
      getRecommendProds (recommendId) {
        const self = this;
         axios.get(cm.weshopHome.getRecommendProds,{params:{
          recommendId: recommendId,
          productType: self.categoryActiveTypeEN,
          pageSize: self.pageSize,
          pageNo: self.pageNo
        }}).then(res => {
          if(res && res.data && res.data.infos){
            if(self.recommendProds){
              res.data.infos.forEach((item, index)=>{
                self.recommendProds.push(item)
              })
            }else{
              self.recommendProds = res.data.infos;
            }
            let totalCount = res.data.totalCount;
            console.log("推荐位：")
            console.log(self.recommendProds)
            console.log("totalCount:"+totalCount)
            console.log("pageNo:"+self.pageNo)
            //判断是否加载更多
            if(totalCount > self.pageSize*self.pageNo){
              self.isLoading = true;
            }else{
              self.isLoading = false;
            }
          }
          self.interceptType = false;
          sessionStorage.setItem(self.categoryActiveTypeEN,JSON.stringify(self.recommendProds));//每个品类的推荐位由品类英文名称对应的布尔值决定
          sessionStorage.setItem(self.categoryActiveTypeCN,JSON.stringify(self.isLoading));//每个品类是否加载由品类中文名称对应的布尔值决定
          sessionStorage.setItem('interceptType',JSON.stringify(self.interceptType));
        })
      },
      changeActive (item, index) {
        const self = this;
        self.categoryActiveTypeCN = item;
        self.categoryActiveTypeEN = self.recommendCategoryTypesEN[index];
        self.pageNo = 1;
        self.recommendProds = [];
        if(sessionStorage.getItem(self.categoryActiveTypeEN)){
          self.recommendProds = JSON.parse(sessionStorage.getItem(self.categoryActiveTypeEN))
        }else{
          self.getRecommendProds(self.recommendList[0].recommendId);
        }
        self.isLoading = JSON.parse(sessionStorage.getItem(self.categoryActiveTypeCN))
        self.interceptType = false;
        sessionStorage.setItem('categoryActiveTypeCN',self.categoryActiveTypeCN);
        sessionStorage.setItem('categoryActiveTypeEN',self.categoryActiveTypeEN);
      },
    },
    watch: {
      scrollTop: function () {
        const self = this;
        self.tabOffsetTop = self.$refs.tabs.offsetTop + 44;
        console.log("滚动距离"+self.scrollTop);
        console.log("窗口高度"+self.clientHeight);
        console.log("页面高度"+self.scrollHeight);
        let aaa = self.scrollTop + self.clientHeight + 66 - self.scrollHeight;
        console.log(aaa)
        if(self.isLoading){
          if(aaa>0){
            console.log(self.interceptType)
            if(self.interceptType){
              return;
            }
            self.interceptType = true;
            self.pageNo = self.pageNo + 1;
            self.getRecommendProds();
          }
        }
      }
    },
    computed: {
      tabToTop: function () {
        const self = this;
        //监听了父组件的tabToTop事件：@tabToTop
        this.$emit('tabtotop', this.tabOffsetTop - this.scrollTop);
        return this.tabOffsetTop - this.scrollTop;
      }
    }
  }
</script>

<style lang="less" scoped>
  .recommed-box {
    background-color: #ffffff;
    margin-top: 10px;
  }

  .recom-title {
    height: 44px;
    h2 {
      font-size: 14px;
      color: #333333;
      letter-spacing: 0;
      line-height: 44px;
      width: 70px;
      text-align: center;
      margin: 0 auto;
      position: relative;
      &:before, &:after {
        content: "";
        position: absolute;
        width: 12px;
        height: 2px;
        top: 21px;
        background-color: #000000;
      }
      &:before {
        left: -13px;
      }
      &:after {
        right: -13px;
      }
    }
  }

  .srcoll-tabs-wrap {
    width: 100%;
    height: 44px;
    overflow: hidden;
    position: relative;
    z-index: 10;
    &:after {
      content: " ";
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 1px;
      border-bottom: 1px solid #e5e5e5;
      color: #e5e5e5;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      z-index: 2;
    }
  }

  .srcoll-tabs {
    height: 44px;
    background-color: #ffffff;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    font-size: 0;
    -webkit-overflow-scrolling: touch;
    position: relative;
    &::-webkit-scrollbar {
      height: 0 !important;
      display: none;
    }

    a {
      line-height: 44px;
      display: inline-block;
      font-size: 14px;
      color: #333333;
      padding: 0 10px;
      position: relative;
      z-index: 3;
      &.active {
        color: #1AAD19;
        &:after {
          content: "";
          width: 28px;
          height: 2px;
          background-color: #1AAD19;
          position: absolute;
          bottom: 1px;
          left: 50%;
          margin-left: -14px;
        }
      }
    }
  }

  .load-more {
    background-color: #f5f5f5;
    overflow: hidden;
    /*padding-top: 1.5rem;*/
    .weui-loadmore__tips {
      background-color: #f5f5f5;
    }
  }

  .fixed {
    position: fixed;
    top: 0;
    left: 0;
  }

  .mb44 {
    margin-bottom: 44px;
  }
</style>
