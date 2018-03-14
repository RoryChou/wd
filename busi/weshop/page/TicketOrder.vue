<template>
  <section class="page" :class="{show:c_PageShow}">
    <lv-header title="订单填写"/>
    <div class="order-fill">
      <!-- 票信息 -->
      <div class="splitComb">
        <div class="choose-module">
          <div class="pos-relative">
            <div class="msg">
              <div class="left">
                <div class="name">
                  <p>东方明珠观光E票-儿童票</p>
                </div>
                <div class="notes"><span>预订成功后1小时30分可入园</span>
                </div>
              </div>
            </div>
            <p class="splitNotice">
              订票须知
            </p>
          </div>
          <div class="play-date">
            <p>游玩日期</p>
            <div class="choose1">
                <span class="isable">今日03-07<br>
                  <i>￥90</i>
                  <i class="select-icon"></i>
                </span>
              <span class="selected isable">明天03-08<br>
                  <i>￥90</i>
                  <i class="select-icon"></i>
                </span>
              <span class="isable">周五03-09<br>
                  <i>￥90</i>
                  <i class="select-icon"></i>
                </span>
              <span class="lineh5">更多日期</span>
            </div>
          </div>
          <div class="number">
            <p>购买数量<i>每单最多预订5张</i></p>
            <p>
              <i class="dec-count gray"></i>
              <input type="tel" value="1">
              <i class="add-count"></i>
            </p>
          </div>
        </div>
        <div class="choose-module">
          <div class="pos-relative">
            <div class="msg">
              <div class="left">
                <div class="name">
                  <p>东方明珠观光E票-儿童票</p>
                </div>
                <div class="notes"><span>预订成功后1小时30分可入园</span>
                </div>
              </div>
            </div>
            <p class="splitNotice">
              订票须知
            </p>
          </div>
          <div class="play-date">
            <p>游玩日期</p>
            <div class="choose1">
                <span class="isable">今日03-07<br>
                  <i>￥90</i>
                  <i class="select-icon"></i>
                </span>
              <span class="selected isable">明天03-08<br>
                  <i>￥90</i>
                  <i class="select-icon"></i>
                </span>
              <span class="isable">周五03-09<br>
                  <i>￥90</i>
                  <i class="select-icon"></i>
                </span>
              <span class="lineh5">更多日期</span>
            </div>
          </div>
          <div class="number">
            <p>购买数量<i>每单最多预订5张</i></p>
            <p>
              <i class="dec-count gray"></i>
              <input type="tel" value="1">
              <i class="add-count"></i>
            </p>
          </div>
        </div>
      </div>

      <!-- 购买其他门票按钮 -->
      <div class="add">
        <p>同时购买该景区其他票</p>
      </div>

      <!-- 取票人信息 -->
      <div class="tourist-info justify">
        <div class="title">
          <p class="fontBold">取票人信息</p>
          <i class="red" style="display: none">请补全取票人信息</i>
          <i class="gray">请确保以下信息填写正确</i>
          <span class="user-contacts"></span>
        </div>
        <div class="fill">
          <div class="infoError">
            <span>姓名</span>
            <span class="errMsg">生僻字可用拼音代替</span>
            <input class="searchInput" name="contactName" type="text" placeholder="必填">
            <i class="inputRemove"></i>
          </div>
          <div>
            <span class="width-auto">姓(拼音)</span>
            <span class="errMsg">请输入姓(拼音)</span>
            <input name="contactLastName" class="searchInput" type="text" placeholder="例：李，填Li">
            <i class="inputRemove"></i>
          </div>
          <div>
            <span class="width-auto">名(拼音)</span>
            <span class="errMsg">请输入名(拼音)</span>
            <input name="contactFirstName" class="searchInput" type="text" placeholder="例：明，填Ming">
            <i class="inputRemove"></i>
          </div>
          <div class="gender">
            <span>人群</span>
            <span class="errMsg">请选择人群</span>
            <label><i class="selected"></i>成人</label>
            <label><i></i>儿童</label>
          </div>
          <div>
            <span>手机号</span>
            <span class="errMsg">请输入正确的手机号</span>
            <input name="contactMobile" type="tel" placeholder="接收取票短信凭证" maxlength="13">
            <i class="inputRemove"></i>
            <!--<div class="gray able">发送验证码</div>-->
            <!--<div class="reCount">60秒后重发</div>-->
            <!--<div>重发验证码</div>-->
          </div>
          <div>
            <span>邮箱</span>
            <span class="errMsg">请输入正确的邮箱</span>
            <input name="contactMobile" type="tel" placeholder="用于接收协议等">
            <i class="inputRemove"></i>
          </div>
          <div class="gender">
            <span>性别</span>
            <span class="errMsg">请选择性别</span>
            <label><i class="selected"></i>男</label>
            <label><i></i>女</label>
          </div>
          <div class="id-card">
            <span>身份证<i></i></span>
            <span class="errMsg">请输入正确的证件号</span>
            <input name="contactIdNo" class="searchInput" type="search" placeholder="用于景区入园等凭证" maxlength="20">
            <i class="inputRemove"></i>
          </div>
          <div>
            <span class="width-auto">出生年月</span>
            <span class="errMsg">请选择出生日期</span>
            <input onfocus="this.blur()" type="text" placeholder="与证件一致" readonly="readonly">
          </div>
        </div>
      </div>

      <!-- 添加邮寄地址信息 -->
      <div class="tourist-info add-address">
        <div class="title">
          <p class="fontBold">邮寄地址信息</p>
          <i class="red" style="display: none">请补全取票人信息</i>
          <i class="gray">请确保以下信息填写正确</i>
          <span class="usual-add">选择常用地址</span>
        </div>
        <div class="fill">
          <div class="infoError">
            <span>收件人</span>
            <span class="errMsg">请输入收件人</span>
            <input class="searchInput" name="contactName" type="text" placeholder="必填">
            <i class="inputRemove"></i>
          </div>
          <div>
            <span class="width-auto">手机号</span>
            <span class="errMsg">请输入收件人手机号码</span>
            <input name="contactLastName" class="searchInput" type="text" placeholder="必填">
            <i class="inputRemove"></i>
          </div>
          <div class="infoError">
            <span class="width-auto">所在地</span>
            <span class="errMsg">请选择所在地</span>
            <i class="arrow-right"></i>
          </div>
          <div class="addressdes">
            <span class="width-auto">详细地址</span>
            <span class="errMsg">请输入详细地址</span>
            <textarea class="addressdes"></textarea>
          </div>
          <div>
            <span>邮政编码</span>
            <span class="errMsg">请输入正确的邮箱</span>
            <input name="contactMobile" type="tel" placeholder="用于接收协议等">
            <i class="inputRemove"></i>
          </div>
          <div>
            <span>快递</span>
            <span class="kd-price">￥20</span>
          </div>
        </div>
      </div>

      <!-- 同意条款 -->
      <div class="agree">
        <div class="icon red"></div>
        <p>已阅读并同意 <a href="https://m.lvmama.com/static/publicPage/clause.html"><span>驴妈妈旅游网预订条款</span></a></p>
      </div>

      <!-- 费用明细弹窗 -->
      <div class="cost-detail ticket-popup" style="display: none">
        <div class="content">
          <h3>费用明细</h3>
          <div class="costListBox">
            <div class="cost-ticket">
              <div class="cost-title">
                <span>门票</span>
                <span><i>¥</i>340</span>
              </div>
              <div class="cost-list">
                <p>成人票【扫码入园无需排队】</p>
                <span><i>¥170/人</i><i>x2</i></span>
              </div>
            </div>
            <div class="cost-ticket">
              <div class="cost-title">
                <span>快递</span>
                <span><i>¥</i>20</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="lvOrder-mask" style="display: none"></div>
    </div>
    <div class="ticket-bottom">
      <div class="pay">
        <div class="inner">
          <i>应付：</i>
          <i>￥</i>
          <i class="orderPrice">588</i>
          <i class="savedAmount long3">已省￥7</i>
          <span class="foot-arrow"></span>
          <!--<p>您还未选择游玩日期</p>-->
        </div>
        <!--<p>5555</p>-->
      </div>
      <div class="refer">提交订单</div>
    </div>
  </section>
</template>

<script>
  import LvHeader from '../components/global/LvHeader'

  export default {
    name: 'ticket-order',
    components: {
      LvHeader
    },
    data () {
      return {
        c_PageShow: false
      }
    },
    mounted () {
      setTimeout(() => {
        this.c_PageShow = true
        console.log(this.$route.query.id)
      }, 200)
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  @import "../style/base";

  ::-webkit-input-placeholder {
    color: #bbb
  }

  :-moz-placeholder {
    color: #bbb
  }

  ::-moz-placeholder {
    color: #bbb
  }

  :-ms-input-placeholder {
    color: #bbb
  }

  .transition-hide {
    opacity: 0;
    -webkit-transition: 1s;
    transition: 1s;
  }

  .transition-show {
    display: block;
    opacity: 1 !important;
  }

  .pos-fixed {
    position: fixed !important;
  }

  .lvOrder-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    z-index: 1500;
  }

  .fontBold {
    font-weight: 600;
    color: #333;
  }

  .page {
    opacity: 0;
    transition: opacity .5s;
    background-color: #EEEEF5;
    position: relative;
    &.show {
      opacity: 1;
    }
  }

  .order-fill {
    padding: 45px 0 50px;
    .choose-module {
      -webkit-border-image: url(data:image/gif;base64,R0lGODlhBQAFAPABANra2v///yH5BAUHAAEALAAAAAAFAAUAAAIHhB9pGatnCgA7) 2 stretch;
      border-style: solid;
      border-width: 1px 0 0;
      position: relative;
      margin-top: 10px;
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
              background-image: url(../images/warning.png);
              /*background-size: 100%;*/
            }
          }
        }
      }
      .trash {
        background: url(../images/delete-icon-2.png) no-repeat;
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
          &:last-child {
            float: right;
            margin: 14px 0;
            font-size: 0;
            i {
              display: inline-block;
              width: 41px;
              height: 36px;
            }
            input {
              width: 50px;
              font-size: 16px;
              text-align: center;
              height: 35px;
              line-height: 35px;
              vertical-align: top;
              color: #333;
              border-image: url(data:image/gif;base64,R0lGODlhBQAFAPABANra2v///yH5BAUHAAEALAAAAAAFAAUAAAIHhB9pGatnCgA7) 2 stretch;
              border-width: 1px;
              box-sizing: border-box;
              outline: none;
              border-style: solid;
            }
          }
        }
        .dec-count {
          background: url(../images/dec_able.png) no-repeat;
          background-size: 100%;
          &.gray {
            background: url(../images/dec_unable.png) no-repeat;
            background-size: 100%;
          }
        }
        .add-count {
          background: url(../images/add_able.png) no-repeat;
          background-size: 100%;
          &.gray {
            background: url(../images/add_unable.png) no-repeat;
            background-size: 100%;
          }
        }
      }
    }
    .play-date {
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
              background-image: url(../images/selectDate.png);
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
            background: url(../images/after_icon.png) no-repeat;
            background-size: 8px 13px;
          }
        }
      }
    }
    .add, .tourist-info {
      font-size: 14px;
      color: #666;
      background: #FFFFFF;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05);
      border-radius: 5px;
    }
    .add {
      height: .85*50/@rem;
      line-height: .85*50/@rem;
      position: relative;
      padding-left: 20px;
      background: #fff;
      margin: 0 10px 10px;
      text-align: center;
      p:before {
        content: "";
        background: url(../images/addTicket.png) no-repeat;
        width: 15px;
        height: 15px;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        position: absolute;
        margin-left: -20px;
        top: 48%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
      }
    }
    .agree {
      position: relative;
      height: 45px;
      line-height: 45px;
      .icon {
        background: url(../images/checkBox1.png) no-repeat;
        width: 15px;
        height: 15px;
        -webkit-background-size: 15px;
        background-size: 15px;
        position: absolute;
        left: 20px;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        &.red {
          background: url(../images/checkBox2.png) no-repeat;
          -webkit-background-size: 15px;
          background-size: 15px;
        }
      }
      p {
        font-size: .24*50/@rem;
        color: #999;
        padding-left: 40px;
        span {
          color: #666;
          font-size: 12px;
        }
      }
    }
  }

  .splitComb {
    margin: 0 10px 10px;
    background: #FFFFFF;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05);
    border-radius: 5px;
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
      background-image: url(../images/after_icon.png);
      background-size: 8px 13px;
      background-repeat: no-repeat;
      -webkit-transform: translateY(-50%) scale(.7);
      transform: translateY(-50%) scale(.7);
    }
  }

  .inputRemove {
    background: url(../images/inputRemove.png) no-repeat;
    width: 16px;
    height: 16px;
    -webkit-background-size: 16px;
    background-size: 16px;
    top: 15px;
    right: 0;
    position: absolute;
  }

  .tourist-info {
    font-size: 14px;
    color: #666;
    background: #FFFFFF;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    margin: 0 10px;
    .title {
      position: relative;
      overflow: hidden;
      height: 35px;
      line-height: .86*50/@rem;
      padding: 0 .2*50/@rem;
      i {
        padding-left: 10px;
        font-size: 10px;
        color: #ff5465;
        vertical-align: top;
        &.gray {
          color: #999;
        }
      }
      .user-contacts {
        position: absolute;
        right: 10px;
        width: 15px;
        height: 15px;
        top: 14px;
        background-size: 100%;
        background-image: url(../images/userContacts.png);
      }
      .usual-add {
        color: #999;
        position: relative;
        float: right;
        font-size: 10px;
        padding-right: 8px;
        &:after {
          content: "";
          background: url("../images/arrow-right.png") no-repeat center;
          width: 5px;
          height: 8px;
          position: absolute;
          right: 0;
          top: 19px;
          background-size: 100%;
        }
      }
    }
    .title p, &.add-address .address p:first-child {
      float: left
    }
    .fill {
      > div {
        line-height: 45px;
        height: 45px;
        -webkit-border-image: url(data:image/gif;base64,R0lGODlhBQAFAPABANra2v///yH5BAUHAAEALAAAAAAFAAUAAAIHhB9pGatnCgA7) 2 stretch;
        border-style: solid;
        border-width: 1px 0 0;
        margin-left: .2*50/@rem;
        margin-right: .2*50/@rem;
        position: relative;
        &:first-child {
          border-width: 0;
        }
        span {
          display: inline-block;
          /*width: 42px;*/
          &:first-child {
            text-align: justify;
            /*max-width: 84px;*/
            min-width: 42px;
            height: 45px;
            &:after {
              content: '';
              display: inline-block;
              overflow: hidden;
              width: 100%;
              height: 0;
            }
          }
          &.width-auto {
            width: auto;
          }
          &.kd-price {
            position: absolute;
            left: 84px;
            top: 0;
          }
        }
        .errMsg {
          width: auto;
          font-size: 10px;
          color: #ff5465;
          line-height: 22px;
          position: absolute !important;
          left: 84px;
          top: 6px;
          transition: all .1s ease-out;
          -webkit-transition: all .1s ease-out;
          opacity: 0;
        }
        input {
          position: absolute;
          left: 84px;
          top: 13px;
          color: #333;
          transition: all .3s ease-out;
          -webkit-transition: all .3s ease-out;
          line-height: 19px;
          font-size: 14px;
          &.searchInput {
            width: 60%;
          }
        }
        &.addressdes {
          height: 66px;
          span {
            &:first-child {
              float: left;
            }
          }
          textarea {
            position: absolute;
            z-index: 2;
            height: 44px;
            line-height: 22px;
            top: 11px;
            left: 84px;
            width: 60%;
            font-size: 14px;
          }
        }
        &.infoError {
          .errMsg {
            top: 0;
            opacity: 1;
            transition: all .3s ease-in .1s;
            -webkit-transition: all .3s ease-in .1s;
          }
          input {
            top: 21px;
          }
        }
        .arrow-right {
          width: 8px;
          height: 13px;
          position: absolute;
          right: 5px;
          top: 16px;
          background: url("../images/after_icon.png") no-repeat;
          background-size: 100%;
        }
      }
      .id-card span:first-child:after {
        content: "";
        width: 8px;
        height: 5px;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAKCAYAAAC9vt6cAAAAAXNSR0IArs4c6QAAAShJREFUKBVjXLVq1VtmZma/4ODgowxEgg0bNsj+/v37MCMjozcTkGj4+/fvZqBBWkTqZ/jz54/N////l4SEhFxlBGlavXp1K5CKY2VltQoICHiMy6Bt27axf/nyZQPQ0hmhoaEbQeqYQASQUw2kdv369WsH0CVCIDF0ALSR6evXr8uA4sJA9l6YPNgAEAcomAak7gJNB3mHE6YARgNdOQXI1gVi77CwsC8wcbgBQMG/QMFwoEH/gYYAzVjFDFME1FwLFAsASrkD1b2GiYNouAEgDlDyOxcXly+QqQjUMAsktmbNmlSgxmJgTHkC5e+DxJABOBCRBUDstWvXygBj5hjQkHNArisQewPD6QCQxgAoLoDJAtPEExYWFnegzfpAQ+JwaYapp4gGAMOpch3grIcXAAAAAElFTkSuQmCC);
        background-size: 8px 5px;
        background-repeat: no-repeat;
        position: absolute;
        top: 52%;
        margin-left: 4px
      }
    }
    .gender {
      label {
        position: absolute;
        padding: 0 22px 0 25px;
        left: 84px;
        top: 0;
        i {
          &:first-child {
            background: url(../images/insure_select1.png) no-repeat;
            width: 18px;
            height: 19px;
            -webkit-background-size: 18px;
            background-size: 18px;
            position: absolute;
            left: 0;
            top: 14px;
            overflow: hidden;
          }
          &.selected {
            background: url(../images/insure_select2.png) no-repeat;
            -webkit-background-size: 18px;
            background-size: 18px;
          }
        }
        &:last-child {
          left: 154px;
        }
      }
    }
  }

  .add-address {
    margin-top: 10px;
  }

  .ticket-bottom {
    height: 48px;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 1501;
    position: fixed;
    > div {
      height: 48px;
      float: left;
      color: #fff;
      line-height: 48px;
      font-size: 13px;
    }
    .pay {
      -webkit-border-image: url(data:image/gif;base64,R0lGODlhBQAFAPABANra2v///yH5BAUHAAEALAAAAAAFAAUAAAIHhB9pGatnCgA7) 2 stretch;
      box-shadow: -2px 0 10px #E1E1E1;
      width: 60%;
      background-color: #fff;
      position: relative;
      font-size: 13px;
      color: #333;
      border: 0 solid;
      .inner {
        font-size: 12px;
        color: #BBB;
        padding-left: 15px;
        position: relative;
        box-sizing: border-box;
        i {
          font-size: 22px;
          color: #f60;
          &:first-child {
            font-size: 12px;
            color: #666;
            position: absolute;
          }
          &:nth-child(2) {
            font-size: 12px;
            position: absolute;
            left: 54px;
            line-height: 50px;
          }
          &:nth-child(3) {
            position: absolute;
            left: 66px;
            line-height: 43px;
          }
          &.savedAmount {
            font-size: 12px;
            color: #999;
            line-height: 10px;
            margin-left: 85px;
            &.long3 {
              margin-left: 99px;
            }
          }
        }
      }
    }
    .foot-arrow {
      position: absolute;
      right: 10px;
      top: 19px;
      width: 14px;
      height: 9px;
      background-size: 100%;
      background-image: url("../images/top_arrow.png");
      &.opened {
        background-image: url("../images/bottom_arrow.png");
      }
    }
    .refer {
      width: 40%;
      background: -webkit-linear-gradient(-40deg, #FE686C 0, #FE3C71 60%);
      text-align: center;
      -webkit-transition: 0s;
      transition: 0s;
    }
  }

  .cost-detail {
    position: relative;
    z-index: 1502;
    .content {
      border-radius: 10px;
      position: fixed;
      bottom: 48px;
      width: 100%;
      background: #fff;
      z-index: 4;
      h3 {
        font-size: 14px;
        height: 45px;
        line-height: 45px;
        border-width: 0 0 1px;
        -webkit-border-image: url(data:image/gif;base64,R0lGODlhBQAFAPABANra2v///yH5BAUHAAEALAAAAAAFAAUAAAIHhB9pGatnCgA7) 2 stretch;
        border-style: solid;
        margin: 0 15px;
        border-radius: 10px;
        background-color: #fff;
        color: #999;
      }
      .costListBox {
        max-height: 280px;
        overflow-y: auto;
        background-color: #fff;
        .cost-ticket {
          margin: 0 15px;
        }
        .cost-title {
          font-size: 14px;
          color: #333;
          padding: 10px 0;
          span {
            &:last-child {
              float: right;
            }
            i {
              font-size: 12px;
            }
          }
        }
      }
      .cost-list {
        background: #fff;
        padding: 0 0 10px;
        overflow: hidden;
        line-height: 20px;
        position: relative;
        p {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          font-size: 12px;
          color: #666;
          width: 60%;
          overflow: hidden;
        }
        span {
          font-size: 14px;
          /*color: #d30775;*/
          position: absolute;
          right: 0;
          top: 0;
          i {
            &:first-child {
              font-size: 12px;
              color: #666;
            }
            &:last-child {
              font-size: 10px;
              color: #666;
              margin-left: 15px;
            }
          }
        }
      }
    }
  }
</style>
