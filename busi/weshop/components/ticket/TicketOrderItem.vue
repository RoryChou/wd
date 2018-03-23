<template>
  <div class="choose-module" v-bind:data-id="id">
    <div class="pos-relative">
      <div class="msg">
        <div class="left">
          <div class="name">
            <p>{{info.title}}</p>
          </div>
          <div class="notes"><span>{{info.tip}}</span>
          </div>
        </div>
      </div>
      <p class="splitNotice">
        订票须知
      </p>
    </div>

    <div class="sub-title">
      组合套票1 东方明珠可口可乐欢乐餐厅自助午餐【含东方明珠灯塔观光】
    </div>

    <div class="play-date">
      <p>游玩日期</p>
      <div class="choose1">

        <template v-for="(item, index) in calendar">
          <span
            v-bind:class="{selected: info.selectedIndex===index, isable: item.isable}"
            @click="selectDateClick(index,item.isable, id)"
          >今日{{dateStrToShortDateStr(item.date)}}<br>
            <i>￥{{item.price}}</i>
            <i class="select-icon"></i>
          </span>
        </template>

        <span v-if="moreCalendar" @click="moreDateClickItem(ticketIndex, id)"
              v-bind:class="{selected: info.selectedIndex===3, isable: true}"
        >今日{{dateStrToShortDateStr(moreCalendar.date)}}<br>
            <i>￥{{moreCalendar.price}}</i>
            <i class="select-icon"></i>
        </span>

        <span v-if="!moreCalendar" class="lineh5" @click="moreDateClickItem(ticketIndex, id)">更多日期</span>

      </div>
    </div>

    <div class="play-time">
      <div class="title">
        场次选择
      </div>
      <div @click="handlePlayTimeItem(id, info.time)" v-if="info.hasTime">

        <div class="select unselected" v-if="!info.time">
          请选择场次 <i></i>
        </div>
        <div class="select selected" v-if="info.time">

          <em class="full" v-if="info.timeStock>30">库存充足</em>
          <em class="empty" v-if="info.timeStock>info.num && info.timeStock<=30">库存紧张</em>
          <em class="less" v-if="info.timeStock<info.num">库存不足</em>

          {{info.time}}
        </div>

      </div>
    </div>

    <div class="sub-title">
      组合套票1 东方明珠可口可乐欢乐餐厅自助午餐【含东方明珠灯塔观光】
    </div>

    <div class="play-date">
      <p>游玩日期</p>
      <div class="choose1">

        <template v-for="(item, index) in calendar">
          <span
            v-bind:class="{selected: info.selectedIndex===index, isable: item.isable}"
            @click="selectDateClick(index,item.isable, id)"
          >今日{{dateStrToShortDateStr(item.date)}}<br>
            <i>￥{{item.price}}</i>
            <i class="select-icon"></i>
          </span>
        </template>

        <span v-if="moreCalendar" @click="moreDateClickItem(ticketIndex, id)"
              v-bind:class="{selected: info.selectedIndex===3, isable: true}"
        >今日{{dateStrToShortDateStr(moreCalendar.date)}}<br>
            <i>￥{{moreCalendar.price}}</i>
            <i class="select-icon"></i>
        </span>

        <span v-if="!moreCalendar" class="lineh5" @click="moreDateClickItem(ticketIndex, id)">更多日期</span>

      </div>
    </div>

    <div class="play-time">
      <div class="title">
        场次选择
      </div>
      <div @click="handlePlayTimeItem(id, info.time)" v-if="info.hasTime">

        <div class="select unselected" v-if="!info.time">
          请选择场次 <i></i>
        </div>
        <div class="select selected" v-if="info.time">

          <em class="full" v-if="info.timeStock>30">库存充足</em>
          <em class="empty" v-if="info.timeStock>info.num && info.timeStock<=30">库存紧张</em>
          <em class="less" v-if="info.timeStock<info.num">库存不足</em>

          {{info.time}}
        </div>

      </div>
    </div>

    <div class="number">
      <p>购买数量<i>每单最多预订{{info.maxNum}}张</i></p>
      <!--<p>
        <i class="dec-count gray"></i>
        <input type="tel" value="" v-model="info.num">
        <i class="add-count"></i>
      </p>-->
      <NumberBox
        v-bind:max="info.maxNum"
        v-model="info.num"
      />

    </div>
    <div class="warning">
      <i></i>当前出游日期不支持退改
    </div>

    <div class="link-ticket">

      <div class="msg">
        <div class="left">
          <div class="name">
            <p>{{info.title}}----联票</p>
          </div>
          <div class="trash"></div>
        </div>
      </div>

      <p class="splitNotice">
        订票须知
      </p>


      <div class="play-date-link">
        <p>游玩日期</p>

        <div class="right">

          <div class="date">
            明天 07-28
          </div>
          <div class="price">
            <i>￥</i>320
          </div>
        </div>
      </div>
      <div class="number">
        <p>购买数量<i>每单最多预订{{info.maxNum}}张</i></p>
        <!--<p>
          <i class="dec-count gray"></i>
          <input type="tel" value="" v-model="info.num">
          <i class="add-count"></i>
        </p>-->
        <NumberBox
          v-bind:max="info.maxNum"
          v-model="info.num"
        />

      </div>

    </div>
  </div>
</template>

<script>
  import Calendar from '../../util/calendar'
  import NumberBox from '../../components/ticket/NumberBox'

  export default {
    name: 'ticket-order-item',
    components: {
      NumberBox
    },
    props: [
      'id',
      'info',
      'calendar',
      'moreCalendar',
      'ticketIndex'
    ],
    methods: {
      dateStrToShortDateStr: function (dateStr) {
        let date = Calendar.getDateFromFormattedString(dateStr, 'yyyy-MM-dd')
        return Calendar.dateFormat(date, 'MM-dd')
      },
      moreDateClickItem: function (index, id) {
        this.$emit('moreDateClick', {
          index: index,
          id: id
        })
      },
      selectDateClick: function (index, isable, id) {
        if (isable) {
          this.$emit('selectDateNormal', {
            index: index,
            id: id
          })
        }
      },
      handlePlayTimeItem: function (id, time) {
        this.$emit('handlePlayTime', {
          time: time,
          id: id
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../style/base";

  .choose-module {
    background: #FFFFFF;
    border-radius: 5px;
    -webkit-border-image: url(data:image/gif;base64,R0lGODlhBQAFAPABANra2v///yH5BAUHAAEALAAAAAAFAAUAAAIHhB9pGatnCgA7) 2 stretch;
    border-style: solid;
    border-width: 1px 0 0;
    position: relative;
    margin-top: 10px;
    margin-bottom: 10px;
    &:before, &:after {
      /*width: 18px;*/
      /*height: 16px;*/
      /*background-color: #EEEEF5;*/
      /*position: absolute;*/
      /*top: -8px;*/
      /*content: "";*/
    }
    &:first-child {
      border-width: 0
    }
    /*&:before {*/
    /*border-radius: 0 8px 8px 0;*/
    /*left: -10px;*/
    /*box-shadow: 1px 0 0 0 #e8e8e8*/
    /*}*/
    /*&:after {*/
    /*border-radius: 8px 0 0 8px;*/
    /*right: -10px;*/
    /*box-shadow: -1px 0 0 0 #e8e8e8*/
    /*}*/
    .msg {
      padding: 10/@rem 25/@rem 0 10/@rem;
      overflow: hidden;
      .left {
        float: left;
        &.combLeft {
          width: 100%
        }
        .name {
          font-size: 0;
          position: relative;
          &.pdl0 {
            padding-left: 0
          }
          p {
            padding-right: 15px;
            -webkit-box-orient: vertical;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            font-weight: 600;
            font-size: 16px;
            color: #333;
            line-height: 22px
          }
        }
        .notes {
          overflow: hidden;
          padding-top: .1*50/@rem;
          span {
            float: left;
            font-size: .2*50/@rem;
            color: #666;
            height: .36*50/@rem;
            line-height: .36*50/@rem;
            margin-right: 10px;
            padding-left: 15px;
            background-size: 11px;
            /*-webkit-background-size: 11px;*/
            background-repeat: no-repeat;
            background-position-y: 3px;
            background-image: url(../../images/warning.png);
            /*background-size: 100%;*/
          }
        }
      }
    }
    .trash {
      background: url(../../images/delete-icon-2.png) no-repeat;
      width: .28*50/@rem;
      height: .3*50/@rem;
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      display: inline-block;
      position: absolute;
      right: .2*50/@rem;
      top: 13px
    }
    .number {
      overflow: hidden;
      padding: 0 10/@rem;
      p {
        &:first-child {
          float: left;
          color: #333;
          line-height: .85*50/@rem;
          font-size: .28*50/@rem;
          margin-top: 10px;
          > i {
            font-size: 10px;
            color: #999;
            padding-left: 10px;
            vertical-align: top;
          }
        }
      }
    }
  }

  .splitNotice {
    color: #999;
    font-size: .24*50/@rem;
    padding-left: .2*50/@rem;
    margin-top: .1*50/@rem;
    position: relative;
    width: 3*50/@rem;
    &:after {
      position: absolute;
      display: inline-block;
      top: 50%;
      content: "";
      margin-left: 2px;
      width: 8px;
      height: 13px;
      background-image: url(../../images/after_icon.png);
      background-size: 8px 13px;
      background-repeat: no-repeat;
      -webkit-transform: translateY(-50%) scale(.7);
      transform: translateY(-50%) scale(.7);
    }
  }

  .sub-title {
    font-size: 16px;
    margin: .2*50/@rem;
  }

  .play-date {
    border-top: 1px solid #f2f2f2;
    overflow: hidden;
    margin: .2*50/@rem;
    background: #fff;
    p {
      font-size: .28*50/@rem;
      color: #333;
      padding-top: 12px;
      padding-bottom: 7px;
    }
    .choose1 {
      font-size: .24*50/@rem;
      overflow: hidden;
      width: 100%;
      > span {
        position: relative;
        float: left;
        height: 45px;
        line-height: 17px;
        width: 23%;
        margin-right: 1%;
        text-align: center;
        padding-top: 3px;
        border-radius: 2px;
        color: #bbb;
        font-size: 12px;
        box-sizing: border-box;
        i {
          font-size: 12px;
          font-style: normal;
        }
        &:after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          border: 1px solid #ccc;
          box-sizing: border-box;
          width: 200%;
          height: 200%;
          border-radius: 5px;
          -webkit-transform: scale(.5);
          transform: scale(.5);
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
        }
        &.isable {
          color: #333;
        }
        &:nth-child(4) {
          color: #333;
          position: relative;
          width: 28%;
          margin-right: 0;
          &.lineh5 {
            line-height: 45px;
            padding-top: 0;
            text-align: center;
            padding-right: 8px;
          }
        }
        &.selected:after {
          border: 1px solid #f80;
        }
        &.selected:nth-child(4):after {
          right: 7px;
        }
        &.selected {
          .select-icon {
            position: absolute;
            width: 14px;
            height: 14px;
            bottom: 0;
            right: 0;
            background-image: url(../../images/selectDate.png);
            background-size: 100%;
          }
        }
        &:nth-child(4):before {
          content: "";
          position: absolute;
          top: 22px;
          right: 10px;
          width: 8px;
          height: 13px;
          -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
          background: url(../../images/after_icon.png) no-repeat;
          background-size: 8px 13px;
        }
      }
    }
  }

  .play-time {
    margin: .2*50/@rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 16px;
    }
    .select {
      color: #999;
      font-size: 14px;
      display: flex;
      align-items: center;
      i {
        background-image: url(../../images/arrow-icon-1.png);
        display: block;
        width: 5px;
        height: 8px;
        background-size: cover;
        margin-left: 5px;
      }
    }
    em {
      margin-right: 10px;
      font-size: 12px;
      font-style: normal;
      &.full {
        color: #00b71d;
      }
      &.empty {
        color: #ca0d00;
      }
      &.less {
        color: #c47900;
      }
    }
  }

  .warning {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 0.13333333rem 0.33333333rem 0 0.13333333rem;
    i {
      margin-right: 4px;
      display: block;
      width: 16px;
      height: 16px;
      background-image: url(../../images/attention-icon-1.png);
      background-size: cover;

    }
  }

  .link-ticket {
    &:before {
      position: absolute;
      top: -8.5px;
      left: 0;
      content: "";
      background: url(../../images/link-ticket.png) top right;
      width: 7px;
      height: 15px;
      background-size: 15px;
    }
    &:after {
      position: absolute;
      top: -8.5px;
      right: 0;
      content: "";
      background-image: url(../../images/link-ticket.png);
      width: 7px;
      height: 15px;
      background-size: 15px;
    }
    position: relative;
    border-top: 2px solid #f2f2f2;
  }

  .play-date-link {
    border-top: 1px solid #f2f2f2;
    margin-top: 10px;
    padding-top: 10px;
    font-size: 14px;
    display: flex;

    margin-left: 0.13333333rem;
    margin-right: 0.13333333rem;
    p {
      flex-grow: 1;
      width: 100px;
    }
    .date {
      margin-right: 5px;
      color: #6b6b6b;
    }
    .right {
      display: flex;
    }
  }
</style>
