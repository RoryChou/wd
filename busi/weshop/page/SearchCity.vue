<template>
  <section class="page" :class="{show:c_PageShow}" :style="{minHeight:clientHeight+'px'}">

    <div class="top">
      <div class="close"></div>
      <div class="search-bar">
        <i></i>
        <input type="text" placeholder="出发城市">
      </div>
    </div>
    <div class="main">
      <div class="city-area">
        <div class="title">
          当前定位城市
        </div>
        <div class="city-group">
          <a href="" class="active">上海</a>
        </div>
      </div>
      <div class="city-area">
        <div class="title">
          历史选择城市
        </div>
        <div class="city-group">
          <a>苏州</a>
          <a>苏州</a>
          <a>苏州</a>
        </div>
      </div>
      <div class="city-area">
        <div class="title">
          热门城市
        </div>
        <div class="city-group">
          <a>苏州</a>
          <a>苏州</a>
          <a>苏州</a>
          <a>苏州</a>
          <a>苏州</a>
          <a>苏州</a>
        </div>
      </div>

      <div class="city-box">
        <div class="pinyin">
          S
        </div>

        <div class="city-list">
          <a>上海</a>
          <a>双鸭山</a>
          <a>绥化</a>
        </div>
      </div>

      <div class="city-box">
        <div class="pinyin">
          B
        </div>

        <div class="city-list">
          <a>上海</a>
          <a>双鸭山</a>
          <a>绥化</a>
        </div>
      </div>
    </div>
    <div class="sidebar">
      <a>当前</a>
      <a>历史</a>
      <a>热门</a>
      <a>S</a>
      <a>B</a>
      <a>T</a>
      <a>C</a>
      <a>H</a>
      <a>J</a>
      <a>D</a>
      <a>Y</a>
      <a>M</a>
      <a>N</a>
      <a>W</a>
      <a>X</a>
      <a>L</a>
      <a>Z</a>
      <a>A</a>
      <a>E</a>
      <a>F</a>
      <a>P</a>
      <a>G</a>
      <a>R</a>
      <a>K</a>
    </div>

  </section>
</template>

<script>
  export default {
    name: 'search-city',
    data () {
      return {
        c_PageShow: false,
        clientHeight: document.documentElement.clientHeight
      }
    },
    mounted: function () {
      this.c_PageShow = true
      let self = this

      //获取地理位置

      if ('geolocation' in navigator) {
        /* 地理位置服务可用 */

        navigator.geolocation.getCurrentPosition(function (position) {
          self.tryPosition(position.coords.latitude, position.coords.longitude)
        })

      } else {
        /* 地理位置服务不可用 */
      }
    },
    methods: {
      tryPosition: function (lat, lon) {
        console.log(lat, lon)
      }
    }
  }
</script>

<style lang="less" scoped>
  .page {
    background-color: #efeff7;
  }

  .top {

    max-width: 540px;
    min-width: 320px;
    margin: 0 auto;
    z-index: 1000;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
    position: fixed;
    align-items: center;
    top: 0;
    width: 100%;
    background-color: #fff;
    font-size: 12px;
    height: 45px;
    display: flex;
    padding: 10px;
    box-sizing: border-box;
    .close {
      width: 16px;
      height: 16px;
      background-image: url(../images/ensure_close.png);
      display: block;
      background-size: cover;
    }
    .search-bar {
      flex-grow: 1;
      position: relative;
      display: flex;
      align-items: center;
      i {
        left: 20px;
        position: absolute;
        pointer-events: none;
        display: block;
        width: 14px;
        height: 14px;
        background-image: url(../images/search-icon-1.png);
        background-size: cover;
      }
      input {
        background-color: #eff1f5;
        border-radius: 50px;
        flex-grow: 1;
        line-height: 20px;
        padding: 5px 5px 5px 30px;
        margin: 10px;
      }
    }
  }

  .main {
    margin-top: 45px;
    font-size: 12px;

  }

  .city-area {
    padding: 10px 40px 10px 10px;
    .title {
      line-height: 20px;
      margin-bottom: 5px;
    }
  }

  .city-group {
    display: flex;
    flex-wrap: wrap;

    a {
      font-size: 14px;
      border-radius: 5px;
      box-sizing: border-box;
      margin: 0 10px 10px 0;
      padding: 5px;
      width: 30%;
      display: block;
      background-color: #fff;
      border: 1px solid #fff;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &.active {
        color: #d30775;
        border: 1px solid #d30775;
      }
    }
  }

  .city-box {
    .pinyin {
      padding: 10px;
    }
  }

  .city-list {
    a {
      padding: 10px;
      display: block;
      background-color: #fff;
    }
  }

  .sidebar {
    background-color: rgba(255, 255, 255, 0.5);
    text-align: center;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 75px 0 25px 0;
    width: 40px;
    font-size: 12px;

    display: flex;
    flex-direction: column;
    a {
      flex-grow: 1;

      display: block;
    }
  }

</style>
