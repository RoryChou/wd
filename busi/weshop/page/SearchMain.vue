<template>
  <section class="page" :class="{show:c_PageShow}" :style="{minHeight:clientHeight+'px'}">
    <div class="top">
      <div class="back"></div>
      <div class="search-bar">
        <div class="search-city">
          <span>上海</span>
          <b></b>
          <em></em>
        </div>
        <i></i>
        <input type="text" placeholder="春季旅游节">
      </div>
    </div>

    <div class="search-history" v-if="!searched">

      <div class="title">
        <h4>
          历史搜索
        </h4>
        <span class="clear">
          <i></i>
          清除
        </span>
      </div>
      <div class="list">
        <a>三亚</a>
        <a>三亚</a>
        <a>三亚</a>
        <a>三亚</a>
        <a>三亚</a>
        <a>三亚</a>
        <a>三亚</a>
        <a>三亚</a>
        <a>三亚</a>
      </div>

    </div>

    <div class="search-list" v-if="searched">
      <ul>
        <li>
          <a href="#">
            <div class="title">
              <i class="ticket"></i>
              <p>
                上海迪士尼乐园相关的门票
              </p>
              <span>
                约142个结果
              </span>
            </div>
          </a>
        </li>
        <li>
          <a href="#">
            <div class="title">
              <p>
                上海迪士尼乐园
              </p>
            </div>
          </a>
        </li>
      </ul>
    </div>

  </section>
</template>

<script>
  export default {
    name: 'search-main',
    data () {
      return {
        c_PageShow: false,
        clientHeight: document.documentElement.clientHeight,
        searched: false

      }
    },
    mounted: function () {
      this.c_PageShow = true
    }
  }
</script>

<style lang="less" scoped>
  .page {
    background-color: #fff;
  }

  .top {

    max-width: 540px;
    min-width: 320px;
    margin: 0 auto;
    z-index: 1000;
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
    .back {
      width: 30px;
      height: 30px;
      background-image: url(../images/back_icon.png);
      display: block;
      background-size: cover;
    }
    .search-bar {
      flex-grow: 1;
      position: relative;
      display: flex;
      align-items: center;
      i {
        left: 85px;
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
        padding: 5px 5px 5px 95px;
        margin: 10px;
      }
    }
    .search-city {
      padding-left: 20px;
      display: flex;
      align-items: center;
      position: absolute;
      text-align: center;
      span {
        display: block;
        width: 3em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      b {
        margin-left: 5px;
        background-image: url(../images/bottom_arrow.png);
        width: 8px;
        height: 5px;
        display: block;
        background-size: cover;
      }
      em {
        height: 15px;
        width: 1px;
        background-color: #999;
        display: block;
        margin: 10px;
      }
    }
  }

  .search-history {
    font-size: 12px;
    margin-top: 45px;
    padding: 0 10px 10px 10px;
    .title {
      display: flex;
      padding: 10px 0;
      color: #999;
      h4 {
        flex-grow: 1;
        font-size: 14px;
        font-weight: normal;
      }
      .clear {
        display: flex;
        align-items: center;
        i {
          background-size: cover;
          margin-right: 5px;
          width: 14px;
          height: 15px;
          background-image: url(../images/delete-icon-2.png);
          display: block;
        }
      }
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      a {

        margin: 0 10px 10px 0;
        padding: 0 10px;
        line-height: 30px;
        background-color: #eef2f6;
        color: #333;
        border-radius: 5px;
        font-size: 12px;
      }
    }
  }

  .search-list {
    margin-top: 45px;
    font-size: 14px;
    padding: 10px 0;
    li {
      padding: 0 10px;
      border-bottom: 1px solid #ececec;
      a {
        padding: 10px 20px 10px 0;
        display: block;
        color: #333333;
        position: relative;
        :after {
          position: absolute;
          content: "";
          display: block;
          top: 0;
          right: 0;
          background-image: url(../images/after_icon.png);
          width: 8px;
          height: 13px;
          margin: 15px 0 0 0;
          background-size: cover;
        }
        i {
          margin-right: 5px;
          display: block;
          float: left;
          width: 21px;
          height: 21px;
          background-image: url(../images/iconCol.png);
          background-size: 50px 681px;
          &.ticket {
            background-position: 0 -399px;
          }
        }
      }
    }
    .title {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      p {
        flex-grow: 1;
      }
    }
  }
</style>
