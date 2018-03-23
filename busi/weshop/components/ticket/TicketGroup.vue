<template>
  <section class="goods-main combGoods">
    <div class="adult-ticket hasGoods" :class="{opened:opened}">
      <div class="title combTicket" :class="[ticketGroup.typeClass]" @click="handleTitleClick">{{ticketGroup.typeTxt}}</div>
      <div class="comb-box">
        <div class="top-shadow"></div>
        <div class="bottom-shadow"></div>
        <div class="list" v-for="(ticket,index) in showTickets" :key="index">
          <div class="list-module">
            <div class="name">{{ticket.name}}</div>
            <div class="tags">
              <i v-for="tag in ticket.tags" :key="tag">{{tag}}</i>
            </div>
            <div class="notes">
              <span v-for="note in ticket.notes" :key="note">{{note}}</span>
            </div>
            <div class="notes passLimit">
              <span>{{ticket.passLimit}}</span>
            </div>
            <div class="showExplain">
              <span class="explain" @click="handleShowExplainClick(ticket.id)">订票须知</span>
            </div>
            <div class="right-part noFan">
              <div class="price ">
                <span><i>¥</i><i>{{ticket.price}}</i><b>起</b></span>
                <div class="tag-box">
                  <div class="fan">
                    <span>{{ticket.onSale}}</span>
                  </div>
                </div>
              </div>
              <router-link class="btn btn-disabled" :to="{ path: '/ticket/order', query: { id: ticket.id }}">
                <span>预订</span>
              </router-link>
            </div>
          </div>
        </div>
        <div class="more-standard" v-if="!showAll&&ticketGroup.tickets.length>4" @click="handleExpandClick">
          <span>展开其余{{ticketGroup.tickets.length-showTickets.length}}个{{ticketGroup.typeTxt}}</span>
        </div>
        <div class="more-standard open" v-if="showAll" @click="handleCollapseClick()">
          <span>收起</span>
        </div>
      </div>
    </div>
    <div v-if="noticeShow">
      <div class="weui-mask" style="display: block;" @click="handleCloseNoticeShowClick"></div>
      <div class="ticket-type" :class="{toggle:noticeAniShow}">
        <div class="type-title">
          <div style="display: block;">{{goodsDetail.goodsName}}</div>
          <div style="display: none;"></div>
        </div>
        <div class="type-main">
          <span @click="handleCloseNoticeShowClick"></span>
          <div class="type-scroll">
            <div class="explain" style="display: block;">
              <div class="notice">
                <p class="deputy-title">费用包含：</p>
                <p>{{goodsDetail.priceIncludes}}</p>
              </div>
              <div class="notice">
                <p class="deputy-title">费用不包含：</p>
                <p>{{goodsDetail.costsNotIncluded}}</p>
              </div>
              <div class="notice">
                <p class="deputy-title">入园须知</p>
                <p class="tralNoticeMap" v-for="(item,index) in goodsDetail.beforeTralNoticeMap" :key="index">
                  <span>{{item.title}}：</span>
                  <span>{{item.text}}</span>
                </p>
              </div>
              <div class="notice">
                <p class="deputy-title">重要提示</p>
                <p>{{goodsDetail.importantTips}}</p>
              </div>
              <div class="notice">
                <p class="deputy-title">退票规则</p>
                <p><i class="type1"></i><span>{{goodsDetail.refundNotice}}</span></p>
              </div>
              <div class="notice">
                <p class="deputy-title">改期规则</p>
                <p>{{goodsDetail.changeDescStr}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="ticket-bottom">
          <div class="pay">
            <p style="display: block;">在线付：<i>¥</i> <i>155</i><i>起</i><i style="display: block;">门市价¥219</i></p>
            <p style="display: none;">景区付：<i>¥</i> <i>155</i><i>起</i><i style="display: block;">门市价¥219</i></p>
          </div>
          <div class="refer">立即预订</div>
        </div>
      </div>
    </div>
    <lv-loading :show="c_LoadingShow"/>
  </section>
</template>

<script>
  import * as ticketApi from '../../api/ticket'
  import LvLoading from '../../components/global/LvLoading'

  export default {
    name: 'ticket-group',
    components: {
      LvLoading
    },
    props: {
      iniOpened: Boolean,
      ticketGroup: Object
    },
    data () {
      return {
        opened: this.iniOpened,
        showAll: false,
        noticeShow: false,
        c_LoadingShow: false,
        noticeAniShow: false,
        goodsDetail: {}
      }
    },
    methods: {
      handleTitleClick: function () {
        this.opened = !this.opened
      },
      handleExpandClick: function () {
        this.showAll = true
      },
      handleCollapseClick: function () {
        this.showAll = false
      },
      handleCloseNoticeShowClick: function () {
        this.noticeAniShow = false
        setTimeout(() => {
          this.noticeShow = false
        }, 400)
      },
      handleShowExplainClick: function (id) {
        // 这里从服务器拉取数据
        this.c_LoadingShow = true
        ticketApi.getGoodsDetail(id).then(res => {
          if (res.data.success) {
            this.c_LoadingShow = false
            this.noticeShow = true
            this.goodsDetail = res.data.data
            setTimeout(() => {
              this.noticeAniShow = true
            }, 100)
          }
        })
      }
    },
    computed: {
      showTickets: function () {
        if (this.showAll) {
          return this.ticketGroup.tickets
        } else {
          return this.ticketGroup.tickets.slice(0, 4)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../style/base";

  .goods-main {
    background-color: #ffffff;
    margin-bottom: 10px;
    * {
      box-sizing: border-box;
    }
  }

  .title {
    font-size: 16px;
    color: #333;
    line-height: 50px;
    height: 50px;
    background: #fff;
    position: relative;
    padding-left: 45px;
    z-index: 1;
    font-weight: 700;
    &:before {
      content: "";
      background: url(../../images/common_ticket.png) 50% no-repeat;
      width: 22px;
      height: 22px;
      -webkit-background-size: 20px 20px;
      background-size: 20px 20px;
      position: absolute;
      left: 15px;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
    }
    &.COMMON:before {
      background-image: url(../../images/types/common_ticket.png)
    }
    &.DINNER:before {
      background-image: url(../../images/types/dinner_ticket.png)
    }

    &.PERFORM:before {
      background-image: url(../../images/types/perform_ticket.png)
    }

    &.TRAFFIC:before {
      background-image: url(../../images/types/traffic_ticket.png)
    }

    &.PARENTAGE:before {
      background-image: url(../../images/types/parent_ticket.png)
    }

    &.FAMILY:before {
      background-image: url(../../images/types/family_ticket.png)
    }

    &.LOVER:before {
      background-image: url(../../images/types/lover_ticket.png)
    }

    &.COUPE:before {
      background-image: url(../../images/types/coupe_ticket.png)
    }

    &.ADULT:before {
      background-image: url(../../images/types/adult_ticket.png);
      -webkit-background-size: 18px 18px;
      background-size: 18px 18px
    }

    &.CHILDREN:before {
      background-image: url(../../images/types/children_ticket.png)
    }

    &.OLDMAN:before {
      background-image: url(../../images/types/oldman_ticket.png)
    }

    &.STUDENT:before {
      background-image: url(../../images/types/student_ticket.png)
    }

    &.WOMAN:before {
      background-image: url(../../images/types/woman_ticket.png)
    }

    &.SOLDIER:before {
      background-image: url(../../images/types/soldier_ticket.png)
    }

    &.TEACHER:before {
      background-image: url(../../images/types/teacher_ticket.png)
    }

    &.DISABILITY:before {
      background-image: url(../../images/types/disability_ticket.png)
    }

    &.GROUP:before {
      background-image: url(../../images/types/group_ticket.png)
    }

    &.PROMOTESALE:before {
      background-image: url(../../images/types/recommend_ticket.png);
      -webkit-background-size: 18px 14px;
      background-size: 18px 14px
    }
  }

  .combTicket {
    &:after {
      content: "";
      width: 14px;
      height: 14px;
      position: absolute;
      top: 20px;
      right: 15px;
      background-image: url(../../images/standard_close.png);
      background-size: 100%;
      -webkit-background-size: 100%;
    }
  }

  .adult-ticket {
    &.opened {
      .comb-box {
        display: block;
      }
      .title {
        &:after {
          background-image: url(../../images/standard_open.png);
        }
      }
    }
  }

  .comb-box {
    background-color: #FBFBFD;
    position: relative;
    display: none;
  }

  .list {
    -webkit-border-image: url(data:image/gif;base64,R0lGODlhBQAFAPABANra2v///yH5BAUHAAEALAAAAAAFAAUAAAIHhB9pGatnCgA7) 2 stretch;
    border-style: solid;
    border-width: 0 0 1px;
    margin: 0 15px;
    min-height: 100px;
    .list-module {
      position: relative;
      padding: 10px 0 30px;
      overflow: hidden;
      .name {
        max-height: 40px;
        max-width: 72%;
        overflow: hidden;
        font-size: 14px;
        color: #333;
      }
      .tags {
        font-size: 0;
        i {
          display: inline-block;
          font-size: 10px;
          color: #FF8800;
          font-style: normal;
          height: 17px;
          line-height: 17px;
          padding: 0 2px;
          border: 1px solid #FF8800;
          margin-right: 4px;
          border-radius: 2px;
        }
      }
      .notes {
        min-height: 10px;
        position: relative;
        margin-top: 3px;
        max-width: 82%;
        overflow: hidden;
        span {
          color: #666;
          font-size: 10px;
          position: relative;
          padding-left: 15px;
          float: left;
          margin-right: 10px;
          &:before {
            content: "";
            background: url(../../images/pinxuan.png) no-repeat;
            width: 10px;
            height: 10px;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
            position: absolute;
            left: 0;
            top: 48%;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
          }
        }
        &.passLimit {
          min-height: 0;
          margin-top: 0;
          span:before {
            background: url(../../images/warning.png) no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
            width: 11px;
            height: 10px;
          }
        }
      }
      .showExplain {
        position: absolute;
        height: 100%;
        width: 50%;
        top: 0;
        .explain {
          font-size: 11px;
          color: #666;
          position: absolute;
          bottom: 10px;
          height: 20px;
          line-height: 20px;
          &:after {
            content: "";
            width: 8px;
            height: 13px;
            position: absolute;
            top: 3px;
            right: -10px;
            background-image: url(../../images/after_icon.png);
            background-size: 100%;
            -webkit-background-size: 100%;
            -webkit-transform: scale(.8);
            transform: scale(.8);
          }
        }
      }
      .right-part {
        height: 24px;
        position: absolute;
        top: 60px;
        right: 0;
        width: 50%;
        .price {
          position: absolute;
          right: 5px;
          top: -5px;
          text-align: right;
          line-height: .24rem;
          -webkit-transform: translateY(-100%);
          transform: translateY(-100%);
          span {
            font-size: 10px;
            color: #999;
            i {
              font-size: 20px;
              color: #F60;
              margin-right: 1px;
              font-weight: 700;
              font-style: normal;
              &:first-child {
                font-size: 12px;
                font-weight: 400;
              }
            }
            b {
              font-weight: normal;
            }
          }
          .fan {
            font-size: 10px;
            color: #666;
            margin-top: 5px;
            span {
              float: right;
              line-height: 10px;
              font-size: 10px;
              color: #F80;
              margin-left: .1rem;
              width: 100%;
              text-align: right;
            }
          }
        }
        .btn {
          width: 60px;
          height: 24px;
          line-height: 24px;
          /*background-image: url(../../images/btn_bg.png);*/


          border-radius: 24px;

          background: rgb(255,140,39);
          background: -moz-linear-gradient(left,  rgba(255,140,39,1) 0%, rgba(255,102,0,1) 100%);
          background: -webkit-linear-gradient(left,  rgba(255,140,39,1) 0%,rgba(255,102,0,1) 100%);
          background: linear-gradient(to right,  rgba(255,140,39,1) 0%,rgba(255,102,0,1) 100%);
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff8c27', endColorstr='#ff6600',GradientType=1 );




          background-size: 100%;
          -webkit-background-size: 100%;
          color: #fff;
          text-align: center;
          position: absolute;
          right: 0;
          top: 0;
          display: block;
          span {
            display: block;
            font-size: 13px;
          }
          .special {
            display: none;
          }
          &.btn-disabled {
            opacity: 0.5;
          }
        }
      }
    }
  }

  .bottom-shadow, .top-shadow {
    position: absolute;
    left: 0;
    height: 22px;
    width: 100%;
  }

  .top-shadow {
    top: 0;
    background: -webkit-linear-gradient(top, #efeff4 0, #fbfbfd 22px);
  }

  .bottom-shadow {
    bottom: 0;
    background: -webkit-linear-gradient(bottom, #f6f6ff 0, #fbfbfd 22px);
  }

  .more-standard {
    height: 48px;
    line-height: 48px;
    margin: 0 15px;
    text-align: center;
    font-size: 13px;
    color: #5CA2F8;
    padding-right: 16px;
    span {
      position: relative;
      &:after {
        content: '';
        background-image: url(../../images/more_close.png);
        width: 9px;
        height: 5px;
        background-size: 100%;
        -webkit-background-size: 100%;
        position: absolute;
        top: 7px;
        right: -15px;
      }
    }
    &.open {
      /*border-width: 1px 0 0;*/
      /*-webkit-border-image: url(data:image/gif;base64,R0lGODlhBQAFAPABANra2v///yH5BAUHAAEALAAAAAAFAAUAAAIHhB9pGatnCgA7) 2 stretch;*/
      /*border-style: solid;*/
      span:after {
        background-image: url(../../images/more_open.png);
      }
    }
  }

  .ticket-type {
    padding: 10px 15px 0;
    position: fixed;
    height: 80%;
    width: 100%;
    bottom: 0;
    left: 0;
    background-color: #fff;
    z-index: 1001;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transform: translate(0, 100%);
    backface-visibility: hidden;
    transition: transform .3s;
    &.toggle {
      transform: translate(0, 0);
    }
    .type-title {
      > div {
        color: #333;
        font-size: 16px;
        font-weight: 700;
        width: 100%;
        text-align: center;
        padding-right: 25px;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical
      }
    }
    .type-main {
      height: 100%;
      padding-bottom: 48px;
      box-sizing: border-box;
      padding-top: 10px;
      > span {
        position: absolute;
        top: 15px;
        right: 15px;
        height: 16px;
        width: 16px;
        background: url(../../images/ensure_close.png) no-repeat;
        background-size: 100%;
        -webkit-background-size: 100%;
      }
      .type-scroll {
        overflow-y: scroll;
        height: 100%;
        padding-bottom: 50px;
      }
    }
    .explain {
      padding: 10px 0 0;
      .notice {
        margin-bottom: 10px;
        padding-bottom: 10px;
      }
      p {
        font-size: 12px;
        color: #666;
        line-height: 20px;
        position: relative;
        white-space: pre-wrap;
        span {
          font-size: 12px;
          color: #666;
          line-height: 20px;
          position: relative;
          white-space: pre-wrap;
        }
        &.deputy-title {
          font-size: 13px;
          color: #333;
          margin-bottom: 3px;
          font-weight: 600;
        }
        &.tralNoticeMap {
          white-space: initial;
          padding-left: 64px;
          > span {
            &:first-child {
              position: absolute;
              left: 0;
              top: 0;
            }
          }
        }
      }
    }
    .ticket-bottom {
      height: 48px;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 3;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.10);
    }

    .ticket-bottom div {
      height: 48px;
      float: left;
      color: #fff;
      line-height: 48px;
      font-size: 15px
    }

    .ticket-bottom .pay {
      width: 60%;
      position: relative;
      background-color: #fff;
      font-size: 13px;
      color: #333;
    }

    .ticket-bottom .pay span.bottom-arrow, .ticket-bottom .pay span.top-arrow {
      width: .22rem;
      height: .22rem;
      border-top: 1px solid #fff;
      border-right: 1px solid #fff;
      right: .5rem;
      position: absolute
    }

    .ticket-bottom .pay span.top-arrow {
      -webkit-transform: translateY(-50%) rotate(-45deg);
      transform: translateY(-50%) rotate(-45deg);
      top: 60%
    }

    .ticket-bottom .pay span.bottom-arrow {
      -webkit-transform: translateY(-50%) rotate(135deg);
      transform: translateY(-50%) rotate(135deg);
      top: 50%
    }

    .detail-page .hongBao, .notice-popup .content .main p.title {
      border-width: 0 0 1px;
      border-style: solid;
      -webkit-border-image: url(data:image/gif;base64,R0lGODlhBQAFAPABANra2v///yH5BAUHAAEALAAAAAAFAAUAAAIHhB9pGatnCgA7) 2 stretch
    }

    .ticket-bottom .pay p {
      padding-left: 15px;
      font-size: 12px;
      color: #666
    }

    .ticket-bottom .pay p i {
      font-size: 12px;
      color: #F60;
      font-style: normal;
    }

    .ticket-bottom .pay p i:nth-child(2) {
      font-size: 22px
    }

    .ticket-bottom .pay p i:nth-child(3) {
      font-size: 10px;
      color: #999
    }

    .ticket-bottom .pay p i:last-child {
      font-size: 10px;
      color: #999;
      margin-left: 10px;
      display: inline !important
    }

    .ticket-bottom .refer {
      width: 40%;
      background: url(../../images/goPay.png) no-repeat;
      background-size: 100%;
      -webkit-background-size: 100%;
      text-align: center;
      -webkit-transition: 0s;
      transition: 0s
    }
  }
</style>
