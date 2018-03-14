<template>
  <section class="hot-box">
    <section class="hot-inner" v-if="hotSaleList.length===1">
      <div class="hot-title weui-flex">
        <h3 class="weui-flex__item">热销推荐<span>TOP1</span></h3>
        <a>更多</a>
      </div>
      <div class="hot-items top-1">
        <a class="hot-item" href="javascript:">
          <img src="https://pics.lvjs.com.cn/pics//uploads/pc/place2/2017-09-12/69129f7e-dd25-4519-bea6-d3a3d695c09c.jpg"/>
          <div class="item-content">
            <p>海南三亚5日4晚半自助游(5钻)·春节爆款！不怕比钜划算！180海景/国际品牌/人气经典等酒店任选+四大名菜+经典线路 100景/国际品牌/人气经典等酒店任选+四大名菜+经典线路 100</p>
            <div class="sale-con">
              <i>￥34555<span>起/人</span></i>
              <label>已售100份</label>
            </div>
          </div>
        </a>
      </div>
    </section>

    <section class="hot-inner" v-if="hotSaleList.length===2">
      <div class="hot-title weui-flex">
        <h3 class="weui-flex__item">热销推荐<span>TOP2</span></h3>
        <a>更多</a>
      </div>
      <div class="hot-items weui-flex top-2">
        <a class="hot-item" href="javascript:">
          <img src="https://pics.lvjs.com.cn/pics//uploads/pc/place2/2017-09-12/69129f7e-dd25-4519-bea6-d3a3d695c09c.jpg"/>
          <div class="item-content">
            <p>海南三亚5日4晚半自助游(5钻)·春节爆款！不怕比钜划算！180海景/国际品牌/人气经典等酒店任选+四大名菜+经典线路 100景/国际品牌/人气经典等酒店任选+四大名菜+经典线路 100</p>
            <div class="sale-con">
              <i>￥34555<span>起/人</span></i>
              <label>已售100份</label>
            </div>
          </div>
        </a>
        <a class="hot-item" href="javascript:">
          <img src="https://pics.lvjs.com.cn/pics//uploads/pc/place2/2017-09-12/69129f7e-dd25-4519-bea6-d3a3d695c09c.jpg"/>
          <div class="item-content">
            <p>海南三亚5日4晚半自助游(5钻)·春节爆款！不怕比钜划算！180海景/国际品牌/人气经典等酒店任选+四大名菜+经典线路 100景/国际品牌/人气经典等酒店任选+四大名菜+经典线路 100</p>
            <div class="sale-con">
              <i>￥34555<span>起/人</span></i>
              <label>已售100份</label>
            </div>
          </div>
        </a>
      </div>
    </section>

    <section class="hot-inner" v-if="hotSaleList.length>2">
      <div class="hot-title weui-flex">
        <h3 class="weui-flex__item">热销推荐</h3>
        <a>更多</a>
      </div>
      <div class="hot-items top-15" @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd'>
        <a class="hot-item" href="javascript:">
          <img src="http://s2.lvjs.com.cn/pics//uploads/pc/place2/2017-12-15/3d09b6df-8748-4ca1-ac41-a136899c8abd_300_200.jpg"/>
          <div class="item-content">
            <p>海南三亚5日4晚半自助游(5钻)·春节爆款！不怕比钜划算！180海景/国际品牌/人气经典等酒店任选+四大名菜+经典线路 100景/国际品牌/人气经典等酒店任选+四大名菜+经典线路 100</p>
            <div class="sale-con">
              <i>￥34555<span>起/人</span></i>
              <label>已售100份</label>
            </div>
          </div>
        </a>
        <a class="hot-item" href="javascript:">
          <img src="http://s2.lvjs.com.cn/pics//uploads/pc/place2/2017-12-15/3d09b6df-8748-4ca1-ac41-a136899c8abd_300_200.jpg"/>
          <div class="item-content">
            <p>海南三亚5日4晚半自助游(5钻)·春节爆款！不怕比钜划算！180海景/国际品牌/人气经典等酒店任选+四大名菜+经典线路 100景/国际品牌/人气经典等酒店任选+四大名菜+经典线路 100</p>
            <div class="sale-con">
              <i>￥34555<span>起/人</span></i>
              <label>已售100份</label>
            </div>
          </div>
        </a>
        <a class="hot-item" href="javascript:">
          <img src="http://s2.lvjs.com.cn/pics//uploads/pc/place2/2017-12-15/3d09b6df-8748-4ca1-ac41-a136899c8abd_300_200.jpg"/>
          <div class="item-content">
            <p>海南三亚5日4晚半自助游(5钻)·春节爆款！不怕比钜划算！180海景/国际品牌/人气经典等酒店任选+四大名菜+经典线路 100景/国际品牌/人气经典等酒店任选+四大名菜+经典线路 100</p>
            <div class="sale-con">
              <i>￥34555<span>起/人</span></i>
              <label>已售100份</label>
            </div>
          </div>
        </a>
        <a class="hot-item" href="javascript:">
          <img src="http://s2.lvjs.com.cn/pics//uploads/pc/place2/2017-12-15/3d09b6df-8748-4ca1-ac41-a136899c8abd_300_200.jpg"/>
          <div class="item-content">
            <p>海南三亚5日4晚半自助游(5钻)·春节爆款！不怕比钜划算！180海景/国际品牌/人气经典等酒店任选+四大名菜+经典线路 100景/国际品牌/人气经典等酒店任选+四大名菜+经典线路 100</p>
            <div class="sale-con">
              <i>￥34555<span>起/人</span></i>
              <label>已售100份</label>
            </div>
          </div>
        </a>
        <a class="hot-item" href="javascript:">
          <img src="http://s2.lvjs.com.cn/pics//uploads/pc/place2/2017-12-15/3d09b6df-8748-4ca1-ac41-a136899c8abd_300_200.jpg"/>
          <div class="item-content">
            <p>海南三亚5日4晚半自助游(5钻)·春节爆款！不怕比钜划算！180海景/国际品牌/人气经典等酒店任选+四大名菜+经典线路 100景/国际品牌/人气经典等酒店任选+四大名菜+经典线路 100</p>
            <div class="sale-con">
              <i>￥34555<span>起/人</span></i>
              <label>已售100份</label>
            </div>
          </div>
        </a>
        <a class="hot-item" href="javascript:">
          <img src="http://s2.lvjs.com.cn/pics//uploads/pc/place2/2017-12-15/3d09b6df-8748-4ca1-ac41-a136899c8abd_300_200.jpg"/>
          <div class="item-content">
            <p>海南三亚5日4晚半自助游(5钻)·春节爆款！不怕比钜划算！180海景/国际品牌/人气经典等酒店任选+四大名菜+经典线路 100景/国际品牌/人气经典等酒店任选+四大名菜+经典线路 100</p>
            <div class="sale-con">
              <i>￥34555<span>起/人</span></i>
              <label>已售100份</label>
            </div>
          </div>
        </a>
        <a class="hot-item" href="javascript:">
          <img src="http://s2.lvjs.com.cn/pics//uploads/pc/place2/2017-12-15/3d09b6df-8748-4ca1-ac41-a136899c8abd_300_200.jpg"/>
          <div class="item-content">
            <p>海南三亚5日4晚半自助游(5钻)·春节爆款！不怕比钜划算！180海景/国际品牌/人气经典等酒店任选+四大名菜+经典线路 100景/国际品牌/人气经典等酒店任选+四大名菜+经典线路 100</p>
            <div class="sale-con">
              <i>￥34555<span>起/人</span></i>
              <label>已售100份</label>
            </div>
          </div>
        </a>
        <a class="hot-item" href="javascript:">
          <img src="http://s2.lvjs.com.cn/pics//uploads/pc/place2/2017-12-15/3d09b6df-8748-4ca1-ac41-a136899c8abd_300_200.jpg"/>
          <div class="item-content">
            <p>海南三亚5日4晚半自助游(5钻)·春节爆款！不怕比钜划算！180海景/国际品牌/人气经典等酒店任选+四大名菜+经典线路 100景/国际品牌/人气经典等酒店任选+四大名菜+经典线路 100</p>
            <div class="sale-con">
              <i>￥34555<span>起/人</span></i>
              <label>已售100份</label>
            </div>
          </div>
        </a>
      </div>
    </section>
  </section>
</template>

<script>
  export default {
    name: 'hot-box',
    props: [
      'hotSaleList'
    ],
    methods: {
      touchStart () {
      },
      touchMove (ev) {
        console.log(ev.currentTarget.scrollWidth)
      },
      touchEnd () {
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../style/base";

  .hot-box {
    margin-top: 10px;
    background-color: #ffffff;
    padding-bottom: 15px;
    font-size: 12px;
    color: #333333;
  }

  .hot-title {
    padding: 10px 0;
    line-height: 22px;
    > h3 {
      padding-left: 10px;
      color: #333333;
      font-size: 12px;
      border-left: 3px solid #FF8800;
      span {
        font-size: 10px;
        color: #666666;
        font-weight: normal;
        margin-left: 3px;
      }
    }
    > a {
      margin-right: 18px;
      font-size: 10px;
      color: #999999;
      position: relative;
      &:after {
        content: "";
        background: url("../../images/arrow-icon-1.png") no-repeat center;
        width: 5px;
        height: 8px;
        background-size: 100%;
        position: absolute;
        right: -10px;
        top: 6px;
      }
    }
  }

  .hot-item {
    display: block;
    > img {
      display: block;
      width: 100%;
    }
    .item-content {
      padding: 5px 5px 10px;
      box-sizing: border-box;
      font-size: 12px;
      color: #333333;
      line-height: 14px;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.10);
      height: 68px;
      overflow: hidden;
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-word;
        white-space: normal;
      }
    }
    .sale-con {
      overflow: hidden;
      line-height: 15px;
      margin-top: 6px;
      i {
        display: block;
        float: left;
        font-size: 10px;
        color: #FF8800;
        font-style: normal;
      }
      span {
        margin-left: 2px;
      }
      span, label {
        font-size: 10px;
        color: #AAAAAA;
      }
      label {
        float: right;
        display: block;
      }
    }
  }

  .top-1 {
    .hot-item {
      width: 355/@rem;
      margin: 0 auto;
      img {
        height: 150/@rem;
      }
    }
  }

  .top-2 {
    justify-content: flex-start;
    .hot-item {
      width: 150/@rem;
      margin-left: 25/@rem;
      img {
        height: 100/@rem;
      }
    }
  }

  .top-15 {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    font-size: 0;
    /* padding: 0 5px; */
    -webkit-overflow-scrolling: touch;
    padding-bottom: 5px;
    padding-right: 30px;
    &::-webkit-scrollbar {
      height: 0 !important;
      display: none;
    }
    .hot-item {
      width: 150/@rem;
      margin-left: 10/@rem;
      display: inline-block;
      img {
        height: 100/@rem;
      }
    }
  }
</style>
