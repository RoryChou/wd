<template>
    <section class="page show" :style="{minHeight:clientHeight+'px'}">
        <div class="search-head">
            <span class="search-head-back" @click="handleBack"></span>
            <div class="search-bar">
                <div class="search-right">
                    <span class="split"></span>
                    <span class="fangdajin"></span>
                    <input type="search" class="input" placeholder="门票" v-model="searchKey" @keyup.enter="goSearch">
                    <a class="clearTxt" v-show="searchKey.length>0" @click="handleClearTxt">×</a>
                </div>
                <a class="city">
                    <span>上海</span>
                </a>
            </div>
        </div>
        <div class="colligateSearch" v-show="!searchKey&&searchHistory.length>0">
            <div class="colligate-history">
                <h3>历史搜索 <span @click="handleClearHistory"><i></i>清除</span></h3>
                <div class="historyList">
                    <span class="search_record" v-for="(item,index) in searchHistory" :key="index">{{item}}</span>
                </div>
            </div>
        </div>
        <div class="search-content" v-show="searchKey">
            <div class="result-item">
                <a href="javascript:void(0)">
                    <i class="ticket"></i>
                    <p>
                        <span>上海迪士尼乐园相关的门票</span>
                        <span>约142个结果</span>
                    </p>
                </a>
            </div>
            <div class="result-item">
                <a href="javascript:void(0)">
                    <i class="ticket"></i>
                    <p>
                        <span>上海迪士尼乐园相关的门票</span>
                        <span>约142个结果</span>
                    </p>
                </a>
            </div>
            <div class="result-item">
                <a href="javascript:void(0)">
                    <i class="ticket"></i>
                    <p>
                        <span>上海迪士尼乐园相关的门票</span>
                        <span>约142个结果</span>
                    </p>
                </a>
            </div>
            <div class="result-item">
                <a href="javascript:void(0)">
                    <p>
                        <span>上海迪士尼乐园</span>
                        <span></span>
                    </p>
                </a>
            </div>
            <div class="result-item">
                <a href="javascript:void(0)">
                    <p>
                        <span>上海迪士尼乐园</span>
                        <span></span>
                    </p>
                </a>
            </div>
            <div class="result-item">
                <a href="javascript:void(0)">
                    <p>
                        <span>上海迪士尼乐园</span>
                        <span></span>
                    </p>
                </a>
            </div>
        </div>
    </section>
</template>

<script>
  export default {
    name: 'main-search',
    data () {
      return {
        clientHeight: document.documentElement.clientHeight,
        searchKey: '',
        searchHistory: []
      }
    },
    mounted () {
      let aa = localStorage.getItem('search_history')
      this.searchHistory = aa ? JSON.parse(aa) : []
    },
    methods: {
      handleClearTxt: function () {
        this.searchKey = ''
      },
      getSearchResult: function () {
        // TODO 这里异步请求搜索
      },
      goSearch: function () {
        if (this.searchKey) {
          let isExisted = false
          this.searchHistory.forEach(item => {
            if (this.searchKey === item) {
              isExisted = true
            }
          })
          if (isExisted) { return }
          this.searchHistory.push(this.searchKey)
          localStorage.setItem('search_history', JSON.stringify(this.searchHistory))
          // TODO 跳转搜索页
        }
      },
      handleClearHistory: function () {
        this.searchHistory = []
        localStorage.removeItem('search_history')
      },
      handleBack: function () {
        this.$router.back()
      }
    },
    watch: {
      searchKey: function (newKey, oldKey) {
        this.getSearchResult()
      }
    }
  }
</script>

<style lang="less" scoped>
    .page {
        padding-top: 45px;
        box-sizing: border-box;
    }

    .search-head {
        margin: 0;
        width: 100%;
        height: 45px;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #fff;
        z-index: 1002;
        border: 0;
        box-sizing: border-box;
        padding: 10px 10px 0 45px;
        * {
            box-sizing: border-box;
        }
    }

    .search-head-back {
        position: absolute;
        top: 10px;
        left: 0;
        height: 30px;
        width: 35px;
        background: url(../images/back_icon.png) 50% no-repeat;
        background-size: 30px;
    }

    .search-bar {
        height: 30px;
        padding: 0 10px;
        background-color: #eef2f6;
        color: #aaa;
        border-radius: 30px;
        position: relative;
        .input {
            border: none;
            width: 100%;
            padding-left: 69px;
            border-radius: 15px;
            font-size: 15px;
            color: #999;
            appearance: none;
            -webkit-appearance: none;
            background-color: #eef2f6;
            display: block;
            height: 20px;
            line-height: 20px;
            margin-top: 5px;
        }
        .city {
            position: absolute;
            top: 0;
            left: 10px;
            width: 45px;
            font-size: 12px;
            height: 30px;
            line-height: 30px;
            text-align: left;
            color: #1AAD19;
            overflow: hidden;
        }
    }

    .search-right {
        width: 100%;
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        .split {
            position: absolute;
            top: 8px;
            left: 56px;
            width: 1px;
            height: 13px;
            display: block;
            background: #aaa;
        }
        .fangdajin {
            width: 13px;
            height: 13px;
            position: absolute;
            top: 8px;
            left: 62px;
            background: url(../images/fangdajing.png) no-repeat;
            background-size: 13px 13px;
        }
        .clearTxt {
            position: absolute;
            font-size: 14px;
            width: 16px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            top: 7px;
            right: 5px;
            color: #fff;
            background: #ccc;
            border-radius: 50%;
        }
    }

    .colligateSearch {
        margin-top: 8px;
        h3 {
            overflow: hidden;
            height: 30px;
            line-height: 30px;
            font-size: 13px;
            color: #9d9d9d;
            font-weight: normal;
            span {
                float: right;
                margin-right: 11px;
                font-size: 12px;
                i {
                    display: inline-block;
                    vertical-align: sub;
                    width: 12px;
                    height: 14px;
                    background: url(../images/delete-icon-1.png) no-repeat;
                    background-size: 100%;
                    margin-right: 6px;
                }
            }
        }
    }

    .colligate-history {
        margin-left: 10px;
        /*display: none;*/
    }

    .historyList {
        width: 100%;
        padding-right: 10px;
        height: 50px;
        border-image: url(data:image/gif;base64,R0lGODlhBQAFAPABANra2v///yH5BAUHAAEALAAAAAAFAAUAAAIHhB9pGatnCgA7) 2 stretch;
        -webkit-border-image: url(data:image/gif;base64,R0lGODlhBQAFAPABANra2v///yH5BAUHAAEALAAAAAAFAAUAAAIHhB9pGatnCgA7) 2 stretch;
        border-width: 0 0 1px;
        border-style: solid;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        white-space: normal
    }

    .historyList span {
        margin: 9px 0 10px 10px;
        float: left;
        height: 30px;
        padding: 0 10px;
        line-height: 30px;
        background-color: #eef2f6;
        color: #333;
        border-radius: 5px;
        font-size: 12px
    }

    .historyList span:nth-of-type(1) {
        margin-left: 0
    }

    .search-content {
        font-size: 14px;
        .result-item {
            a {
                padding-right: 10px;
                padding-left: 10px;
                position: relative;
                color: #666;
                line-height: 45px;
                height: 45px;
                display: flex;
                align-items: center;
                -webkit-border-image: url(data:image/gif;base64,R0lGODlhBQAFAPABANra2v///yH5BAUHAAEALAAAAAAFAAUAAAIHhB9pGatnCgA7) 2 stretch;
                border-width: 0 0 1px;
                border-style: solid;
                border-image: url(data:image/gif;base64,R0lGODlhBQAFAPABANra2v///yH5BAUHAAEALAAAAAAFAAUAAAIHhB9pGatnCgA7) 2 stretch;
                i {
                    display: block;
                    width: 20px;
                    height: 20px;
                    margin-right: 5px;
                    &.ticket {
                        background: url(../images/type-icons/ticket.png) no-repeat center;
                        background-size: 100%;
                    }
                }
                p {
                    display: block;
                    padding-right: 16px;
                    position: relative;
                    flex: 1;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    span {
                        &:nth-of-type(2) {
                            float: right;
                            color: #aaa;
                        }
                    }
                    &:before {
                        content: "";
                        width: 7px;
                        height: 7px;
                        display: block;
                        border-top: 1px solid #666;
                        border-left: 1px solid #666;
                        transform: rotate(135deg);
                        -webkit-transform: rotate(135deg);
                        right: 2px;
                        top: 19px;
                        position: absolute;
                    }
                }
            }
        }
    }
</style>
