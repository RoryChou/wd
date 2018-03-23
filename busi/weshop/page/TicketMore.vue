<template>
  <section class="page" :class="{show:c_PageShow}">
    <lv-header title="添加更多门票"/>
    <div class="content">
      <div class="ticket-list">
        <div class="ticket">
          <div class="title combTicket ADULT">成人票</div>
          <div class="item">
            <div class="check unselected"></div>
            <div class="left">
              <h4>上海迪士尼乐园一日游-成人套票【往返迪士尼主题巴士接送】</h4>
              <div class="tip">
                <i></i>需提前1天18:00前订票
              </div>
              <div class="notice">
                订票须知<i></i>
              </div>
            </div>
            <div class="right">
              <div class="price">
                ￥<em>370</em>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="check unselected"></div>
            <div class="left">
              <h4>上海迪士尼乐园一日游-成人套票【往返迪士尼主题巴士接送】</h4>
              <div class="tip">
                <i></i>需提前1天18:00前订票
              </div>
              <div class="notice">
                订票须知<i></i>
              </div>
            </div>
            <div class="right">
              <div class="price">
                ￥<em>370</em>
              </div>
            </div>
          </div>
        </div>
        <div class="ticket">
          <div class="title combTicket CHILDREN">儿童票</div>
          <div class="item">
            <div class="check unselected"></div>
            <div class="left">
              <h4>上海迪士尼乐园一日游-成人套票【往返迪士尼主题巴士接送】</h4>
              <div class="tip">
                <i></i>需提前1天18:00前订票
              </div>
              <div class="notice">
                订票须知<i></i>
              </div>
            </div>
            <div class="right">
              <div class="price">
                ￥<em>370</em>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="check unselected"></div>
            <div class="left">
              <h4>上海迪士尼乐园一日游-成人套票【往返迪士尼主题巴士接送】</h4>
              <div class="tip">
                <i></i>需提前1天18:00前订票
              </div>
              <div class="notice">
                订票须知<i></i>
              </div>
            </div>
            <div class="right">
              <div class="price">
                ￥<em>370</em>
              </div>
            </div>
          </div>
        </div>
        <div class="ticket">
          <div class="title combTicket OLDMAN">老人票</div>
          <div class="item">
            <div class="check selected"></div>
            <div class="left">
              <h4>上海迪士尼乐园一日游-成人套票【往返迪士尼主题巴士接送】</h4>
              <div class="tip">
                <i></i>需提前1天18:00前订票
              </div>
              <div class="notice">
                订票须知<i></i>
              </div>
            </div>
            <div class="right">
              <div class="price">
                ￥<em>370</em>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="check selected"></div>
            <div class="left">
              <h4>上海迪士尼乐园一日游-成人套票【往返迪士尼主题巴士接送】</h4>
              <div class="tip">
                <i></i>需提前1天18:00前订票
              </div>
              <div class="notice">
                订票须知<i></i>
              </div>
            </div>
            <div class="right">
              <div class="price">
                ￥<em>370</em>
              </div>
            </div>
          </div>
        </div>
        <div class="add-button">
          <a>确定</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import LvHeader from '../components/global/LvHeader'

  export default {
    name: 'ticket-more',
    components: {
      LvHeader
    },
    data () {
      return {
        c_PageShow: false
      }
    },
    mounted: function () {
      this.c_PageShow = true
    }
  }
</script>

<style lang="less" scoped>
  .content {

    padding: 45px 10px 100px;
    background-color: #EEEEF5;
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
      display: block;
      content: "";
      background: url(../images/common_ticket.png) 50% no-repeat;
      width: 22px;
      height: 22px;
      background-size: 20px 20px;
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
    }
    &.COMMON:before {
      background-image: url(../images/types/common_ticket.png)
    }
    &.DINNER:before {
      background-image: url(../images/types/dinner_ticket.png)
    }

    &.PERFORM:before {
      background-image: url(../images/types/perform_ticket.png)
    }

    &.TRAFFIC:before {
      background-image: url(../images/types/traffic_ticket.png)
    }

    &.PARENTAGE:before {
      background-image: url(../images/types/parent_ticket.png)
    }

    &.FAMILY:before {
      background-image: url(../images/types/family_ticket.png)
    }

    &.LOVER:before {
      background-image: url(../images/types/lover_ticket.png)
    }

    &.COUPE:before {
      background-image: url(../images/types/coupe_ticket.png)
    }

    &.ADULT:before {
      background-image: url(../images/types/adult_ticket.png);
      background-size: 18px 18px
    }

    &.CHILDREN:before {
      background-image: url(../images/types/children_ticket.png)
    }

    &.OLDMAN:before {
      background-image: url(../images/types/oldman_ticket.png)
    }

    &.STUDENT:before {
      background-image: url(../images/types/student_ticket.png)
    }

    &.WOMAN:before {
      background-image: url(../images/types/woman_ticket.png)
    }

    &.SOLDIER:before {
      background-image: url(../images/types/soldier_ticket.png)
    }

    &.TEACHER:before {
      background-image: url(../images/types/teacher_ticket.png)
    }

    &.DISABILITY:before {
      background-image: url(../images/types/disability_ticket.png)
    }

    &.GROUP:before {
      background-image: url(../images/types/group_ticket.png)
    }

    &.PROMOTESALE:before {
      background-image: url(../images/types/recommend_ticket.png);
      background-size: 18px 14px
    }
  }

  .ticket {
    overflow: hidden;
    background-color: #fff;
    border-radius: 5px;
    margin: 10px 0;
  }

  .item {
    display: flex;
    border-top: 1px solid #eee;
    margin: 0 10px;
    padding: 10px 0;
    position: relative;
    font-size: 12px;
    .check {
      position: absolute;
      top: 10px;
      right: 0px;
      width: 18px;
      height: 18px;
      background-size: 18px 18px;
      background-image: url(../images/checkBox1.png);
      &.selected {
        background-image: url(../images/checkBox2.png);
      }
    }
    .left {
      width: 100px;
      flex-grow: 1;
    }
    h4 {
      font-size: 14px;
      font-weight: normal;
    }
    .tip {
      color: #999999;
      display: flex;
      align-items: center;
      i {
        margin-right: 5px;
        background-image: url(../images/pinxuan.png);
        background-size: cover;
        display: block;
        width: 10px;
        height: 10px;
      }
    }
    .notice {
      color: #999999;
      display: flex;
      align-items: center;
      i {
        margin-left: 5px;
        background-image: url(../images/arrow-icon-1.png);
        background-size: cover;
        width: 5px;
        height: 8px;
        display: block;
      }
    }
    .right {
      text-align: right;
      width: 100px;
    }
    .price {
      margin-top: 40px;
      color: #F60;
      em {

        font-size: 20px;
        font-style: normal;
      }
    }
  }

  .add-button {
    position: fixed;
    box-sizing: border-box;
    padding: 45px 15px 15px;
    bottom: 0;
    left: 0;
    width: 100%;
    background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0, #FFF 45%);
    a {
      border-radius: 25px;
      background: rgb(254, 103, 108);
      background: linear-gradient(to right, rgba(254, 103, 108, 1) 0%, rgba(253, 60, 113, 1) 100%);
      display: block;
      width: 100%;
      height: 50px;
      line-height: 50px;
      color: #fff;
      font-size: 18px;
      text-align: center;
    }
  }
</style>
