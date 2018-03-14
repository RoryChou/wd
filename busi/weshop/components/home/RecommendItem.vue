<template>
  <a class="recom-item weui-flex " href="javascript:">
    <div class="cover">
      <i class="tag">{{categoryActiveTypeCN}}</i>
      <img src="http://s2.lvjs.com.cn/pics//uploads/pc/place2/2017-12-15/3d09b6df-8748-4ca1-ac41-a136899c8abd_300_200.jpg"/>
      <div class="address">上海出发</div>
    </div>
    <div class="recom-con weui-flex__item">
      <h4>{{recommendProd.weshopProdDto.productNameMin}}</h4>
      <!-- <h4>{{recommendProd.prodId}}</h4> -->
      <p><i class="rl-icon"></i>浦东新区川沙新镇</p>
      <div class="sale-con">
        <i><b>￥</b>34555<span>起</span></i>
        <label>已售100份</label>
      </div>
    </div>
  </a>
</template>

<script>
  export default {
    name: 'recommend-item',
    props: [
      'categoryActiveTypeCN',
      'recommendProd'
    ]
  }
</script>

<style lang="less" scoped>
  .recom-item {
    padding: 10px;
    display: flex;
    position: relative;
    &:not(:first-child) {
      &:after {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid #e5e5e5;
        color: #e5e5e5;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        z-index: 2;
      }
    }
  }

  .cover {
    width: 104px;
    height: 78px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .tag {
      height: 14px;
      line-height: 14px;
      padding: 0 10px;
      background: rgba(0, 0, 0, 0.40);
      border-bottom-right-radius: 7px;
      position: absolute;
      left: 0;
      top: 0;
      font-size: 10px;
      color: #FFFFFF;
      font-style: normal;
    }
    .address {
      background: rgba(0, 0, 0, 0.40);
      width: 100%;
      height: 14px;
      line-height: 14px;
      text-align: center;
      font-size: 10px;
      color: #FFFFFF;
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }

  .recom-con {
    margin-left: 10px;
    h4 {
      font-size: 14px;
      color: #333333;
      letter-spacing: 0;
      line-height: 20px;
      height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-word;
      font-weight: normal;
    }
    p {
      font-size: 11px;
      color: #999999;
      letter-spacing: 0;
      line-height: 12px;
      margin-top: 6px;
      i {
        display: inline-block;
        width: 12px;
        height: 12px;
        vertical-align: bottom;
        margin-right: 5px;
        &.rl-icon {
          background: url("../../images/cal-icon-1.png") no-repeat center;
          background-size: 100%;
        }
      }
    }
    .sale-con {
      overflow: hidden;
      line-height: 15px;
      margin-top: 6px;
      i {
        display: block;
        float: left;
        font-size: 20px;
        color: #FF8800;
        font-style: normal;
        b {
          font-size: 10px;
        }
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
</style>
