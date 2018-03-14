<template>
  <section class="nav-box">
    
    <div class="box" v-if="categoryTypeList.length===2">
      <div class="box-bg">
        <div class="bg-line bg-red-1"></div>
        <!--<div class="bg-line bg-red-2"></div>-->
        <!--<div class="bg-line bg-red-3"></div>-->
        <!--<div class="bg-line bg-blue-1"></div>-->
      </div>
      <div class="weui-flex">
        <div class="weui-flex__item">
          <div class="link-wrap plbg-2">
            <a>{{categoryTypeList[0]}}</a>
          </div>
        </div>
        <div class="weui-flex__item">
          <div class="link-wrap">
            <a>{{categoryTypeList[1]}}</a>
          </div>
        </div>
      </div>
    </div>

    <div class="box" v-if="categoryTypeList.length===3">
      <div class="box-bg">
        <div class="bg-line bg-red-1"></div>
        <!--<div class="bg-line bg-red-2"></div>-->
        <!--<div class="bg-line bg-red-3"></div>-->
        <!--<div class="bg-line bg-blue-1"></div>-->
      </div>
      <div class="weui-flex">
        <div class="weui-flex__item">
          <div class="link-wrap plbg-1">
            <a>{{categoryTypeList[0]}}</a>
          </div>
        </div>
        <div class="weui-flex__item">
          <div class="link-wrap">
            <a>{{categoryTypeList[1]}}</a>
          </div>
        </div>
        <div class="weui-flex__item">
          <div class="link-wrap">
            <a>{{categoryTypeList[2]}}</a>
          </div>
        </div>
      </div>
    </div>

    <div class="box" v-if="categoryTypeList.length===4">
      <div class="box-bg">
        <div class="bg-line bg-red-1"></div>
        <div class="bg-line bg-blue-1"></div>
      </div>
      <div class="weui-flex">
        <div class="weui-flex__item">
          <div class="link-wrap plbg-2">
            <a>{{categoryTypeList[0]}}</a>
          </div>
          <div class="link-wrap">
            <a>{{categoryTypeList[1]}}</a>
          </div>
        </div>
        <div class="weui-flex__item">
          <div class="link-wrap">
            <a>{{categoryTypeList[2]}}</a>
          </div>
          <div class="link-wrap">
            <a>{{categoryTypeList[3]}}</a>
          </div>
        </div>
      </div>
    </div>

    <div class="box" v-if="categoryTypeList.length===5">
      <div class="box-bg">
        <div class="bg-line bg-red-1"></div>
        <div class="bg-line bg-red-1"></div>
      </div>
      <div class="weui-flex">
        <div class="weui-flex__item">
          <div class="link-wrap row-2 plbg-3">
            <a>{{categoryTypeList[0]}}</a>
          </div>
        </div>
        <div class="weui-flex__item">
          <div class="link-wrap">
            <a>{{categoryTypeList[1]}}</a>
          </div>
          <div class="link-wrap">
            <a>{{categoryTypeList[2]}}</a>
          </div>
        </div>
        <div class="weui-flex__item">
          <div class="link-wrap">
            <a>{{categoryTypeList[3]}}</a>
          </div>
          <div class="link-wrap">
            <a>{{categoryTypeList[4]}}</a>
          </div>
        </div>
      </div>
    </div>

    <div class="box" v-if="categoryTypeList.length===6">
      <div class="box-bg">
        <div class="bg-line bg-red-1"></div>
        <div class="bg-line bg-blue-1"></div>
      </div>
      <div class="weui-flex">
        <div class="weui-flex__item">
          <div class="link-wrap plbg-1">
            <a>{{categoryTypeList[0]}}</a>
          </div>
          <div class="link-wrap">
            <a>{{categoryTypeList[1]}}</a>
          </div>
        </div>
        <div class="weui-flex__item">
          <div class="link-wrap">
            <a{{categoryTypeList[2]}}</a>
          </div>
          <div class="link-wrap">
            <a>{{categoryTypeList[3]}}</a>
          </div>
        </div>
        <div class="weui-flex__item">
          <div class="link-wrap">
            <a>{{categoryTypeList[4]}}</a>
          </div>
          <div class="link-wrap">
            <a>{{categoryTypeList[5]}}</a>
          </div>
        </div>
      </div>
    </div>

    <div class="box" v-if="categoryTypeList.length===7">
      <div class="box-bg">
        <div class="bg-line bg-red-1"></div>
        <div class="bg-line bg-red-1"></div>
        <div class="bg-line bg-red-1"></div>
      </div>
      <div class="weui-flex">
        <div class="weui-flex__item">
          <div class="link-wrap row-3 plbg-4">
            <a>{{categoryTypeList[0]}}</a>
          </div>
        </div>
        <div class="weui-flex__item">
          <div class="link-wrap">
            <a>{{categoryTypeList[1]}}</a>
          </div>
          <div class="link-wrap">
            <a>{{categoryTypeList[2]}}</a>
          </div>
          <div class="link-wrap">
            <a>{{categoryTypeList[3]}}</a>
          </div>
        </div>
        <div class="weui-flex__item">
          <div class="link-wrap">
            <a>{{categoryTypeList[4]}}</a>
          </div>
          <div class="link-wrap">
            <a>{{categoryTypeList[5]}}</a>
          </div>
          <div class="link-wrap">
            <a>{{categoryTypeList[6]}}</a>
          </div>
        </div>
      </div>
    </div>

    <div class="box" v-if="categoryTypeList.length===8">
      <div class="box-bg">
        <div class="bg-line bg-red-1"></div>
        <div class="bg-line bg-red-1"></div>
        <div class="bg-line bg-blue-1"></div>
      </div>
      <div class="weui-flex">
        <div class="weui-flex__item">
          <div class="link-wrap row-2 plbg-3">
            <a>{{categoryTypeList[0]}}</a>
          </div>
          <div class="link-wrap">
            <a>{{categoryTypeList[1]}}</a>
          </div>
        </div>
        <div class="weui-flex__item">
          <div class="link-wrap">
            <a>{{categoryTypeList[2]}}</a>
          </div>
          <div class="link-wrap">
            <a>{{categoryTypeList[3]}}</a>
          </div>
          <div class="link-wrap">
            <a>{{categoryTypeList[4]}}</a>
          </div>
        </div>
        <div class="weui-flex__item">
          <div class="link-wrap">
            <a>{{categoryTypeList[5]}}</a>
          </div>
          <div class="link-wrap">
            <a>{{categoryTypeList[6]}}</a>
          </div>
          <div class="link-wrap">
            <a>{{categoryTypeList[7]}}</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'nav-box',
    props: [
      'categoryTypeList'
    ]
  }
</script>

<style lang="less" scoped>
  @import "../../style/base";

  .nav-box {
    padding: 5px;
    background-color: #ffffff;
  }

  .box {
    position: relative;
    .box-bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      z-index: 1;
    }
  }

  .bg-red-1 {
    background-image: linear-gradient(-90deg, #FB974E 0%, #FB5D55 100%);
    height: 50/@rem;
  }

  .bg-blue-1 {
    background-image: linear-gradient(-90deg, #54bff3 0%, #4d9ced 100%);
    height: 50/@rem;
  }

  .bg-line {
    &:first-child {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    &:last-child {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }

  .weui-flex {
    position: relative;
    z-index: 2;
    .weui-flex__item {
      box-sizing: border-box;
      &:not(:first-child) {
        border-left: 1px solid #ffffff;
      }
    }
  }

  .link-wrap {
    height: 50/@rem;
    line-height: 50/@rem;
    box-sizing: border-box;
    a {
      display: block;
      text-align: center;
      color: #ffffff;
      font-size: 16px;
    }
    &:not(:first-child) {
      border-top: 1px solid #ffffff;
    }
    &.row-2 {
      height: 100/@rem;
    }
    &.row-3 {
      height: 150/@rem;
    }
  }

  .plbg-1 {
    background: url("../../images/pl-1.png") no-repeat center;
    background-size: 100%;
    border-bottom-left-radius: 5px;
  }

  .plbg-2 {
    background: url("../../images/pl-2.png") no-repeat center;
    background-size: 100%;
    border-bottom-left-radius: 5px;
  }

  .plbg-3 {
    background: url("../../images/pl-3.png") no-repeat center;
    background-size: 100%;
    border-bottom-left-radius: 5px;
  }

  .plbg-4 {
    background: url("../../images/pl-4.png") no-repeat center;
    background-size: 100%;
    border-bottom-left-radius: 5px;
  }
</style>
