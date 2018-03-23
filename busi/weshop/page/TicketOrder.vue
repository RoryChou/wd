<template>
  <section class="page" :class="{show:c_PageShow}">
    <lv-header title="订单填写"/>
    <div class="order-fill">
      <!-- 票信息 -->
      <div class="splitComb">
        <template v-for="(ticket, ticketIndex) in ticketList">
          <TicketOrderItem
            :id="ticket.id"
            :info="ticket.info"
            :calendar="ticket.calendar"
            :moreCalendar="ticket.moreCalendar"
            :ticketIndex="ticketIndex"
            v-on:moreDateClick="moreDateClick"
            v-on:selectDateNormal="selectDateNormal"
            v-on:handlePlayTime="handlePlayTime"
          />
        </template>

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
            <!--<span class="errMsg">生僻字可用拼音代替</span>-->
            <!--<input class="searchInput" name="contactName" v-model="ticketInfo.contactName" type="text" placeholder="必填">-->
            <cell-input placeholder="请输入中文姓名" ref="contactName" v-model="ticketInfo.contactName"
                        :validator="validateChineseName"/>
            <div class="btn-box">
              <div class="btn" @click="handleTrans2En">转英文</div>
            </div>
          </div>
          <div>
            <span class="width-auto">姓(拼音)</span>
            <!--<span class="errMsg">请输入姓(拼音)</span>-->
            <!--<input name="" v-model="" class="searchInput" type="text"
                   placeholder="">-->
            <cell-input placeholder="例：李，填Li" ref="contactLastName" v-model="ticketInfo.contactLastName"
                        :validator="validateEnName"/>
          </div>
          <div>
            <span class="width-auto">名(拼音)</span>
            <!--<span class="errMsg">请输入名(拼音)</span>-->
            <!--<input name="contactFirstName" v-model="ticketInfo.contactFirstName" class="searchInput" type="text"
                   placeholder="例：明，填Ming">-->
            <cell-input placeholder="例：明，填Ming" ref="contactFirstName" v-model="ticketInfo.contactFirstName"
                        :validator="validateEnName"/>
          </div>
          <div class="gender">
            <span>人群</span>
            <span class="errMsg">请选择人群</span>
            <label @click="handleHumanStep(1)">
              <i v-bind:class="{selected: ticketInfo.contactHumanStep===1}"></i>成人
            </label>
            <label @click="handleHumanStep(2)">
              <i v-bind:class="{selected: ticketInfo.contactHumanStep===2}"></i>儿童
            </label>
          </div>
          <div>
            <span>手机号</span>
            <!--<span class="errMsg">请输入正确的手机号</span>-->
            <!--<input name="" v-model="" type="tel" placeholder="接收取票短信凭证"
                   maxlength="13">-->
            <cell-input ref="contactMobile" type="number" pattern="[0-9]*" placeholder="请输入手机号码"
                        v-model="ticketInfo.contactMobile" :validator="validate86Mobile"/>
            <!--<div class="gray able">发送验证码</div>-->
            <!--<div class="reCount">60秒后重发</div>-->
            <!--<div>重发验证码</div>-->
          </div>
          <div>
            <span>邮箱</span>
            <!--<span class="errMsg">请输入正确的邮箱</span>-->
            <!--<input name="contactEmail" v-model="ticketInfo.contactEmail" type="tel" placeholder="用于接收协议等">-->
            <cell-input type="email" ref="ticketInfo.contactEmail" placeholder="选填" v-model="ticketInfo.contactEmail"
                        :validator="validateEmail"/>
          </div>
          <div class="gender">
            <span>性别</span>
            <span class="errMsg">请选择性别</span>
            <label @click="handleChooseGender(1)">
              <i v-bind:class="{selected: ticketInfo.contactGender===1}"></i>男
            </label>
            <label @click="handleChooseGender(2)">
              <i v-bind:class="{selected: ticketInfo.contactGender===2}"></i>女
            </label>
          </div>
          <div class="id-card">
            <span @click="handleChooseCaType">{{ticketInfo.contactCertificatesType}}<i></i></span>
            <span class="errMsg">请输入正确的证件号</span>
            <!--<input name="" v-model="" class="searchInput" type="search"
                   placeholder="用于景区入园等凭证" maxlength="20">-->

            <cell-input placeholder='与证件保持一致' ref="ticketInfo.contactCertificatesNumber"
                        v-model="ticketInfo.contactCertificatesNumber"
                        :validator="ticketInfo.contactCertificatesTypeId==='ID_CARD'?validateIdCard:validateOtherCard"/>

          </div>
          <div @click="handleChooseBirthday">
            <span class="width-auto">出生年月</span>
            <span class="errMsg">请选择出生日期</span>
            <input onfocus="this.blur()" type="text" placeholder="与证件一致" readonly="readonly" v-model="birthDayTxt">
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
            <!--<span class="errMsg">请输入收件人</span>-->
            <!--<input class="searchInput" name="contactName" v-model="mailInfo.contactName" type="text" placeholder="必填">-->
            <cell-input placeholder="请输入中文姓名" ref="contactName" v-model="mailInfo.contactName"
                        :validator="validateChineseName"/>
          </div>
          <div>
            <span class="width-auto">手机号</span>
            <span class="errMsg">请输入收件人手机号码</span>
            <!--<input name="contactMobile" v-model="mailInfo.contactMobile" class="searchInput" type="text"
                   placeholder="必填">-->
            <cell-input ref="contactMobile" type="number" pattern="[0-9]*" placeholder="请输入手机号码"
                        v-model="mailInfo.contactMobile" :validator="validate86Mobile"/>
          </div>
          <div class="infoError" @click="handleChooseLocation">
            <span class="width-auto">所在地</span>
            <span class="errMsg">请选择所在地</span>
            <input type="text" readonly v-model="positionTxt">
            <i class="arrow-right"></i>
          </div>
          <div class="addresses">
            <span class="width-auto">详细地址</span>
            <span class="errMsg">请输入详细地址</span>
            <textarea class="addresses" v-model="mailInfo.addresses"></textarea>
          </div>
          <div>
            <span>邮政编码</span>
            <span class="errMsg">请输入正确的邮箱</span>
            <input name="contactZip" v-model="mailInfo.contactZip" type="tel" placeholder="用于接收协议等">
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
      <div class="cost-detail ticket-popup"
           v-if="payPaneShow">
        <div class="content">
          <h3>费用明细</h3>
          <div class="costListBox">

            <div class="cost-ticket" v-for="ticket in ticketList">
              <div class="cost-title">
                <span>{{ticket.info.title}}</span>
                <span><i>¥{{getTicketPrice(ticket) * ticket.info.num}}</i></span>
              </div>
              <div class="cost-list">
                <p>{{ticket.info.tip}}</p>
                <span><i>¥{{getTicketPrice(ticket)}}/人</i><i>x{{ticket.info.num}}</i></span>
              </div>
            </div>

            <div class="cost-ticket">
              <div class="cost-title">
                <span>快递</span>
                <span><i>¥</i>{{expressPrice}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="lvOrder-mask"
           @click="switchPayPaneClick()"
           v-if="payPaneShow"></div>
    </div>
    <div class="ticket-bottom">
      <div class="pay" @click="switchPayPaneClick()">
        <div class="inner">
          <i>应付：</i>
          <i>￥</i>
          <i class="orderPrice">{{getAllTicketPrice()}}</i>
          <i class="savedAmount long3">已省￥7</i>
          <span class="foot-arrow" v-bind:class="{opened: payPaneShow}"></span>
          <!--<p>您还未选择游玩日期</p>-->
        </div>
        <!--<p>5555</p>-->
      </div>
      <div class="refer">提交订单</div>
    </div>
    <section class="weui-wrap">
      <!--英文姓选择弹层-->
      <section class="en-surname" v-if="surNamesShow">
        <div class="weui-mask weui-animate-fade-in"></div>
        <div class="weui-dialog weui-animate-fade-in">
          <div class="weui-dialog__hd"><strong class="weui-dialog__title">请选择英文姓</strong></div>
          <div class="weui-dialog__bd ">
            <div class="weui-dialog__tip">与证件所示英文姓一致</div>
            <div class="sur-names">
              <a v-for="(item,index) in selSurNames.items" :key="index" class="wd-bd"
                 :class="{selected:index===selSurNames.index}"
                 @click="handleChooseSurName(index)">{{item.zh+item.en}}</a>
            </div>
          </div>
          <div class="weui-dialog__ft">
            <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_default" @click="handleCloseSurName">手动填写</a>
            <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_primary" @click="handleConfirmSurName">确定</a>
          </div>
        </div>
      </section>
      <!--名字多音字选择弹层-->
      <section class="en-givenname" v-if="givenNameShow">
        <div class="weui-mask weui-animate-fade-in"></div>
        <div class="weui-dialog weui-animate-fade-in">
          <div class="weui-dialog__hd"><strong class="weui-dialog__title">请选择多音字</strong></div>
          <div class="weui-dialog__bd ">
            <div class="weui-dialog__tip">与证件所示拼音一致</div>
            <div class="dy-line" v-for="(item,index) in selGivenNames" :key="index" v-show="item.en.length>1">
              <div class="dy-z">{{item.zh}}</div>
              <div class="sur-names">
                <a class="wd-bd" v-for="(item1,index1) in item.en" :key="index1" :class="{selected:index1===item.index}"
                   @click="handleChooseGivenName(index,index1)">{{item1}}</a>
              </div>
            </div>
          </div>
          <div class="weui-dialog__ft">
            <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_default"
               @click="handleCloseGivenName">手动填写</a>
            <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_primary"
               @click="handleConfirmGivenName">确定</a>
          </div>
        </div>
      </section>
      <!--姓名填写说明弹层-->
      <section class="name-rule" v-if="nameRuleShow">
        <div class="weui-mask"></div>
        <div class="weui-actionsheet" :class="{'weui-actionsheet_toggle':nameRuleAniShow}">
          <div class="rule-title">姓名填写说明</div>
          <div class="rule-content">
            <p style="margin: 0">姓名需与所持证件一致。</p>
            <p style="margin: 0">使用香港、台湾、澳门的护照，不能乘坐国内航班。</p>
            <div class="p-title"><i>中</i>中文姓名填写：</div>
            <p>生僻字可用拼音代替，如：“王嚈君”填写为：</p>
            <div class="box-line">
              <div class="weui-cell">
                <div class="weui-cell__hd">
                  <label class="weui-label" style="line-height: 12px;">中文姓名</label>
                </div>
                <div class="weui-cell__bd">
                  <div class="box-con">王yan君</div>
                </div>
              </div>
            </div>
            <p>姓名中有特殊字符，无需输入。如：“汉祖然·买买提”填写为：</p>
            <div class="box-line">
              <div class="weui-cell">
                <div class="weui-cell__hd">
                  <label class="weui-label" style="line-height: 12px;">中文姓名</label>
                </div>
                <div class="weui-cell__bd">
                  <div class="box-con">汉祖然买买提</div>
                </div>
              </div>
            </div>
            <div class="p-title"><i>英</i>英文姓名填写：</div>
            <p>1、中文姓名“张三”填写为：</p>
            <div class="box-line">
              <div class="weui-cell">
                <div class="weui-cell__hd">
                  <label class="weui-label" style="line-height: 12px;">英文姓</label>
                  <i class="e-name-i" style="font-size: 10px;font-style: normal">Surname</i>
                </div>
                <div class="weui-cell__bd">
                  <div class="box-con">ZHANG</div>
                </div>
              </div>
              <div class="weui-cell">
                <div class="weui-cell__hd">
                  <label class="weui-label" style="line-height: 12px;">英文名</label>
                  <i class="e-name-i" style="font-size: 10px;font-style: normal">Given names</i>
                </div>
                <div class="weui-cell__bd">
                  <div class="box-con">SAN</div>
                </div>
              </div>
            </div>
            <p>2、英文姓名</p>
            <p>·姓与名总长度小于等于26个字符，若过长请使用缩写。如Anastasia Cassandra Christina缩写为：</p>
            <div class="box-line">
              <div class="weui-cell">
                <div class="weui-cell__hd">
                  <label class="weui-label" style="line-height: 12px;">英文姓</label>
                  <i class="e-name-i" style="font-size: 10px;font-style: normal">Surname</i>
                </div>
                <div class="weui-cell__bd">
                  <div class="box-con">CHRISTINA</div>
                </div>
              </div>
              <div class="weui-cell">
                <div class="weui-cell__hd">
                  <label class="weui-label" style="line-height: 12px;">英文名</label>
                  <i class="e-name-i" style="font-size: 10px;font-style: normal">Given names</i>
                </div>
                <div class="weui-cell__bd">
                  <div class="box-con">AC</div>
                </div>
              </div>
            </div>
            <P>·Middle name填写在Given name（英文名）栏，并填写在given name之后，以空格区分。如“Losie Smith Paul”填写为：</P>
            <div class="box-line">
              <div class="weui-cell">
                <div class="weui-cell__hd">
                  <label class="weui-label" style="line-height: 12px;">英文姓</label>
                  <i class="e-name-i" style="font-size: 10px;font-style: normal">Surname</i>
                </div>
                <div class="weui-cell__bd">
                  <div class="box-con">PAUL</div>
                </div>
              </div>
              <div class="weui-cell">
                <div class="weui-cell__hd">
                  <label class="weui-label" style="line-height: 12px;">英文名</label>
                  <i class="e-name-i" style="font-size: 10px;font-style: normal">Given names</i>
                </div>
                <div class="weui-cell__bd">
                  <div class="box-con">LOSIE SMITH</div>
                </div>
              </div>
            </div>
            <P>·姓名中含特殊符号时，在姓名中不输入，名中用空格代替。如“jame.M-C Black.s_a”填写为：</P>
            <div class="box-line">
              <div class="weui-cell">
                <div class="weui-cell__hd">
                  <label class="weui-label" style="line-height: 12px;">英文姓</label>
                  <i class="e-name-i" style="font-size: 10px;font-style: normal">Surname</i>
                </div>
                <div class="weui-cell__bd">
                  <div class="box-con">BLACKSA</div>
                </div>
              </div>
              <div class="weui-cell">
                <div class="weui-cell__hd">
                  <label class="weui-label" style="line-height: 12px;">英文名</label>
                  <i class="e-name-i" style="font-size: 10px;font-style: normal">Given names</i>
                </div>
                <div class="weui-cell__bd">
                  <div class="box-con">JAMEMC</div>
                </div>
              </div>
            </div>
          </div>
          <div class="rule-btn">
            <a class="weui-btn weui-btn_primary" @click="handleCloseNameRule">确定</a>
          </div>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
  import weui from 'weui.js'
  import LvHeader from '../components/global/LvHeader'
  import TicketOrderItem from '../components/ticket/TicketOrderItem'
  import CellInput from '../components/visitor-infos/CellInput'
  import * as utils from '../util/utils'
  import pinyin from '../util/pinyin'

  const CaTypes = [
    {
      label: '身份证',
      value: 'ID_CARD'
    },
    {
      label: '护照',
      value: 'HUZHAO'
    },
    {
      label: '台湾通行证',
      value: 'TAIBAO'
    },
    {
      label: '港澳通行证',
      value: 'GANGAO'
    },
    {
      label: '台胞证',
      value: 'TAIBAOZHENG'
    },
    {
      label: '回乡证',
      value: 'HUIXIANG'
    },
    {
      label: '外国人永久居留身份证',
      value: 'FOREIGNER_ID_CARD'
    }
  ]

  //城市数据
  const cityData = [
    {
      label: '上海',
      value: 0,
      children: [
        {
          label: '普陀',
          value: 1,
          children: [
            {
              label: '江桥',
              value: 1
            },
            {
              label: '郊区',
              value: 2
            }
          ]
        },
        {
          label: '宝山',
          value: 2,
          children: [
            {
              label: '城区',
              value: 1
            },
            {
              label: '大场',
              value: 2
            }
          ]
        }
      ]
    },
    {
      label: '安徽',
      value: 1,
      children: [
        {
          label: '芜湖',
          value: 1,
          disabled: true // 不可用
        },
        {
          label: '合肥',
          value: 2,
          children: [
            {
              label: '肥东',
              value: 1
            },
            {
              label: '肥西',
              value: 2
            }
          ]
        },
        {
          label: '黄山',
          value: 3,
          children: [
            {
              label: '祁门',
              value: 1
            },
            {
              label: '歙县',
              value: 2
            }
          ]
        }
      ]
    },
    {
      label: '香港',
      value: 3,
      children: [
        {
          label: '九龙',
          value: 1
        },
        {
          label: '尖沙咀',
          value: 2
        }
      ]
    }
  ]

  const playTimes = [
    {
      value: '0',
      stock: 0,
      label: '13:00-14:00'
    },
    {
      value: '1',
      stock: 30,
      label: '15:00-16:00'
    },
    {
      value: '2',
      stock: 50,
      label: '16:00-17:00'
    }
  ]

  export default {
    name: 'ticket-order',
    components: {
      LvHeader,
      TicketOrderItem,
      CellInput
    },
    data () {
      return {
        c_PageShow: false,

        //快递价格
        expressPrice: 20,

        //门票信息
        ticketList: [
          {
            id: 'abc1234',
            info: {
              title: '东方明珠观光E票-成人票',
              tip: '预订成功后1小时30分可入园',
              hasTime: true,
              timeId: '0',
              time: '13:00-14:00',
              timeStock: 0,
              num: 1,
              maxNum: 5,
              selectedIndex: 3
            },

            calendar: [{
              date: '2018-04-06',
              price: 90,
              isable: false
            }, {
              date: '2018-04-07',
              price: 100,
              isable: true
            }, {
              date: '2018-04-08',
              price: 110,
              isable: true
            }],
            moreCalendar: {
              date: '2018-04-10',
              price: 90
            }
          },
          {
            id: 'def5678',
            info: {
              title: '东方明珠观光E票-儿童票',
              tip: '预订成功后1小时45分可入园',

              num: 1,
              maxNum: 5,
              selectedIndex: 0
            },

            calendar: [{
              date: '2018-04-07',
              price: 100,
              isable: true
            }, {
              date: '2018-04-08',
              price: 90,
              isable: true
            }, {
              date: '2018-04-09',
              price: 80,
              isable: false
            }]
          }
        ],

        //取票人信息
        ticketInfo: {
          //姓名
          contactName: '令狐冲',

          //姓
          contactLastName: '张',

          //名
          contactFirstName: '三',

          //人群
          contactHumanStep: 1,

          //手机号
          contactMobile: '136',

          //邮箱
          contactEmail: 'qq',

          // 性别 1:男 2:女
          contactGender: 2,

          //证件类型
          contactCertificatesType: '身份证',
          contactCertificatesTypeId: 'ID_CARD',

          //证件号码
          contactCertificatesNumber: '341',

          //出生年月
          contactBirthday: null
        },

        //邮寄地址信息
        mailInfo: {
          //收件人
          contactName: '李四',

          //手机号
          contactMobile: '136',

          //所在地
          //TODO
          contactPosition: [0, 0, 0],

          //详细地址
          addresses: '真北路',

          //邮政编码
          contactZip: '200000'

          //快递
        },

        payPaneShow: false,

        // 供选择的英文姓
        selSurNames: {
          index: 0,
          items: [{
            zh: '',
            en: ''
          }]
        },
        selGivenNames: [],
        // 供选择的英文姓弹窗开关
        surNamesShow: false,
        givenNameShow: false,
        nameRuleShow: false,
        nameRuleAniShow: false,
        enNames: []
      }
    },
    computed: {
      birthDayTxt: function () {
        return this.ticketInfo.contactBirthday ? this.ticketInfo.contactBirthday : ''
      },
      positionTxt: function () {

        let position = this.mailInfo.contactPosition

        let arr = []
        let temp = cityData
        for (let i = 0; i < position.length; i++) {
          let item = position[i]
          let value = this.getCityDataFromIdInList(item, temp)
          if (!value) {
            break
          }
          arr.push(value.label)
          temp = value.children
        }

        return arr.join('-')
      }
    },
    mounted () {
      let self = this
      setTimeout(() => {
        this.c_PageShow = true
        // console.log(this.$route.query.id)

        let orderinfoStr = sessionStorage.getItem('orderinfo')
        if (orderinfoStr) {
          let orderinfo = JSON.parse(orderinfoStr)
          if (orderinfo) {
            if (orderinfo.ticketList) {
              self.ticketList = orderinfo.ticketList
            }

            if (orderinfo.ticketList) {
              self.ticketList = orderinfo.ticketList
            }

            if (orderinfo.ticketInfo) {
              self.ticketInfo = orderinfo.ticketInfo
            }

            if (orderinfo.mailInfo) {
              self.mailInfo = orderinfo.mailInfo
            }

            // TODO 以下依次类推
            sessionStorage.removeItem('orderinfo')
          }
        }

      }, 200)
    },
    methods: {
      getCityDataFromIdInList: function (idStr, data) {
        for (let i = 0; i < data.length; i++) {
          let item = data[i]
          if (!item) {
            return null
          }
          if (idStr === item.value) {
            return item
          }
        }
      },
      moreDateClick: function (options) {
        let ticketId = options.id

        this.$router.push('/ticket/ordercalendar')
        sessionStorage.setItem('orderinfo', JSON.stringify({
          ticketList: this.ticketList,
          ticketInfo: this.ticketInfo,
          mailInfo: this.mailInfo,

          ticketActive: {
            id: ticketId
          }

          // TODO 以下依次类推
        }))

      },
      selectDateNormal: function (options) {
        let ticketList = this.ticketList
        for (let i = 0; i < ticketList.length; i++) {
          let ticket = ticketList[i]
          if (ticket.id === options.id) {
            ticket.info.selectedIndex = options.index
          }
        }
      },
      switchPayPaneClick: function () {
        this.payPaneShow = !this.payPaneShow
      },
      getTicketPrice: function (ticket) {
        let selectedIndex = ticket.info.selectedIndex
        if (selectedIndex === 3) {
          return ticket.moreCalendar.price
        } else {
          return ticket.calendar[selectedIndex].price
        }
      },
      getAllTicketPrice: function () {
        let ticketList = this.ticketList
        let count = this.expressPrice
        for (let i = 0; i < ticketList.length; i++) {
          let ticket = ticketList[i]
          count += this.getTicketPrice(ticket) * ticket.info.num
        }
        return count
      },
      // 点击选择性别事件
      handleChooseGender: function (i) {
        this.ticketInfo.contactGender = i
      },
      // 点击选择人群事件
      handleHumanStep: function (i) {
        this.ticketInfo.contactHumanStep = i
      },
      // 点击选择出生日期事件
      handleChooseBirthday: function () {
        weui.datePicker({
          start: 1920,
          end: 2020,
          defaultValue: [1980, 9, 18],
          onConfirm: (result) => {
            this.ticketInfo.contactBirthday = result[0].value + '-' + (result[1].value < 10 ? ('0' + result[1].value) : result[1].value) + '-' + (result[2].value < 10 ? ('0' + result[2].value) : result[2].value)
          }
        })
      },
      // 点击修改证件类型事件
      handleChooseCaType: function (i, value) {
        let selectedValues = []
        selectedValues.push(this.ticketInfo.contactCertificatesType)
        let unSelectedCas = []
        CaTypes.forEach(item => {
          if (selectedValues.indexOf(item.label) < 0 || item.label === value) {
            unSelectedCas.push(item)
          }
        })
        weui.picker(unSelectedCas, {
          container: 'body',
          defaultValue: [0],
          onConfirm: (result) => {
            this.ticketInfo.contactCertificatesTypeId = result[0].value
            this.ticketInfo.contactCertificatesType = result[0].label
          }
        })
      },
      handlePlayTime: function (options) {
        weui.picker(playTimes, {
          container: 'body',
          defaultValue: playTimes[0],
          onConfirm: (result) => {
            let ticketList = this.ticketList
            for (let i = 0; i < ticketList.length; i++) {
              let ticket = ticketList[i]
              if (ticket.id === options.id) {
                ticket.info.timeId = result[0].value
                ticket.info.time = result[0].label
                ticket.info.timeStock = result[0].stock
              }
            }
          }
        })
      },
      //点击选择所在地
      handleChooseLocation: function () {
        let self = this
        // 级联picker
        weui.picker(cityData, {
          defaultValue: self.mailInfo.contactPosition,
          onChange: function (result) {
          },
          onConfirm: function (result) {

            let ret = []
            for (let i = 0; i < result.length; i++) {
              let item = result[i]
              if (!item) {
                break
              }
              ret.push(item.value)
            }
            self.mailInfo.contactPosition = ret
          }
        })
      },
      validateChineseName: function (value) {
        if (value === '') {
          return {errmsg: '请输入姓名'}
        }
        if (/[^\u4e00-\u9fa5a-zA-Z]/.test(value)) {
          return {errmsg: '姓名格式有误，请重新输入'}
        } else {
          return null
        }
      },
      validateEnName: function (value) {
        if (value === '') {
          return null
        }
        if (/[^a-zA-Z\s]/.test(value)) {
          return {errmsg: '英文格式有误，请重新输入'}
        } else {
          return null
        }
      },
      validateIdCard: function (value) {
        if (value === '') {
          return null
        }
        if (utils.isValidID(value)) {
          return null
        } else {
          return {errmsg: '身份证格式有误，请重新输入'}
        }
      },
      validateOtherCard: function (value) {
        if (value === '') {
          return null
        }
        if (/[^a-zA-Z\d]/.test(value)) {
          return {errmsg: '证件格式有误，请重新输入'}
        } else {
          return null
        }
      },
      validateEmail: function (value) {
        if (value === '') {
          return null
        }
        if (utils.isValidEmail(value)) {
          return null
        } else {
          return {
            errmsg: '邮箱格式有误，请重新输入'
          }
        }
      },
      validate86Mobile: function (value) {
        if (value === '') {
          return {
            errmsg: '请输入联系电话'
          }
        }
        if (utils.isValidMobile(value)) {
          return null
        } else {
          return {
            errmsg: '联系电话格式有误，请重新输入'
          }
        }
      },
      validateMobile: function (value) {
        if (value === '') {
          return {
            errmsg: '请输入联系电话'
          }
        }
        if (/\d+/.test(value)) {
          return null
        } else {
          return {
            errmsg: '联系电话格式有误，请重新输入'
          }
        }
      },

      // 英文姓选择事件
      handleChooseSurName: function (index) {
        this.selSurNames.index = index
      },
      // 英文名多音选择事件
      handleChooseGivenName: function (index, index1) {
        this.selGivenNames[index].index = index1
      },
      // 关闭英文姓选择事件
      handleCloseSurName: function () {
        this.surNamesShow = false
      },
      // 关闭英文名选择事件
      handleCloseGivenName: function () {
        this.givenNameShow = false
      },
      // 英文姓选择确定点击事件
      handleConfirmSurName: function () {
        // this.surName = this.selSurNames.items[this.selSurNames.index].en
        this.surNamesShow = false
        // 复姓选择
        if (this.enNames.length > 1) {
          this.enNames = [
            this.enNames[this.selSurNames.index]
          ]
          // 姓多音字选择
        } else if (this.enNames[0].surName.en.length > 1) {
          this.enNames[0].surName.en = [this.enNames[0].surName.en[this.selSurNames.index]]
        }
        this.trans2En()
      },
      // 英文名选择确定点击事件
      handleConfirmGivenName: function () {
        this.givenNameShow = false
        this.enNames[0].givenName.forEach((item, index) => {
          item.en = [this.selGivenNames[index].en[this.selGivenNames[index].index]]
        })
        this.trans2En()
      },

      // 点击转换英文事件
      handleTrans2En: function () {
        // this.surNamesShow = true
        let cName = this.ticketInfo.contactName
        // 输入太短 不予处理
        if (cName.length < 2) {
          return
        }
        // 姓名只有两个字,不可能存在复姓
        if (cName.length === 2) {
          this.enNames = [{
            surName: {
              zh: cName[0],
              en: pinyin.getPinyin(cName[0])
            },
            givenName: [{
              zh: cName[1],
              en: pinyin.getPinyin(cName[1])
            }]
          }]
        }
        // 姓名超两个字
        if (cName.length > 2) {
          let a = {
            surName: {
              zh: cName[0],
              en: pinyin.getPinyin(cName[0])
            },
            givenName: []
          }
          for (let i = 1; i < cName.length; i++) {
            a.givenName.push({
              zh: cName[i],
              en: pinyin.getPinyin(cName[i])
            })
          }
          this.enNames = [a]
          if (pinyin.getFuxingPinyin(cName)) {
            // 存在复姓可能
            let fx = pinyin.getFuxingPinyin(cName)
            let b = {
              surName: {
                zh: cName.substr(0, 2),
                en: [fx]
              },
              givenName: []
            }
            for (let i = 2; i < cName.length; i++) {
              b.givenName.push({
                zh: cName[i],
                en: pinyin.getPinyin(cName[i])
              })
            }
            this.enNames.push(b)
          }
        }
        console.log(this.enNames)
        this.trans2En()
      },

      // 中文转英文
      trans2En: function () {
        // 存在复姓选择
        if (this.enNames.length > 1) {
          this.selSurNames.index = 0
          this.selSurNames.items = []
          this.selSurNames.items.push({
            zh: this.enNames[0].surName.zh,
            en: this.enNames[0].surName.en[0]
          })
          this.selSurNames.items.push({
            zh: this.enNames[1].surName.zh,
            en: this.enNames[1].surName.en[0]
          })
          this.surNamesShow = true
          return
        }
        // 姓多音选择
        if (this.enNames[0].surName.en.length > 1) {
          this.selSurNames.index = 0
          this.selSurNames.items = []
          this.enNames[0].surName.en.forEach(item => {
            this.selSurNames.items.push({
              zh: this.enNames[0].surName.zh,
              en: item
            })
          })
          this.surNamesShow = true
          return
        }

        this.ticketInfo.contactLastName = this.enNames[0].surName.en[0]

        // 处理名多音字
        let dymNum = 0
        this.selGivenNames = []
        this.enNames[0].givenName.forEach(item => {
          let givenName = {
            index: 0,
            zh: item.zh,
            en: item.en
          }
          this.selGivenNames.push(givenName)
          if (item.en.length > 1) {
            dymNum++
          }
        })
        // 名字里存在多音字
        if (dymNum > 0) {
          this.givenNameShow = true
        } else {
          // 名字里不存在多音字
          let bbb = ''
          this.selGivenNames.forEach(item => {
            bbb = bbb + '' + item.en[0]
          })
          this.ticketInfo.contactFirstName = bbb
        }
      }
    }
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
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05);
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
        &.addresses {
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

  .weui-cell__bd {
    position: absolute !important;
    left: 84px;
    top: 0;
  }

  .btn-box {
    position: absolute;
    top: 0;
    right: 0;
    .btn {
      background-color: #fff;
      line-height: 22px;
      color: #ff8800;
      font-size: 12px;
      border: 1px solid #ff8800;
      margin: 10px;
      padding: 0 10px;
      border-radius: 4px;
    }
  }

  .weui-cell__bd {
    position: relative;
    input {
      top: 0;
    }
    * {
      transition: .3s all;
    }
    .err {
      font-size: 10px;
      color: #FF5465;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      z-index: 1;
    }
    .weui-input {
      position: relative;
      z-index: 2;
    }
    &.showerr {
      .err {
        opacity: 1;
        top: -6px;
      }
      input {
        top: 6px;
      }
    }
  }

  .weui-select {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .weui-dialog__title {
    font-size: 14px;
    color: #333333;
  }

  .weui-dialog__tip {
    font-size: 12px;
    color: #999999;
  }

  .weui-dialog__btn {
    font-size: 14px;
  }

  .weui-dialog__btn_default {
    color: #999999;
  }

  .weui-dialog__btn_primary{
    color: #ff8800;
  }

  .sur-names {
    display: flex;
    margin-top: 10px;
    flex-wrap: wrap;
    a {
      display: block;
      width: 40%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 12px;
      color: #333333;
      margin-right: 20%;
      margin-bottom: 10px;
      &:nth-child(2n+0) {
        margin-right: 0;
      }
    }
  }

  .dy-line {
    display: flex;
    margin-top: 10px;
    .dy-z {
      line-height: 30px;
    }
    .sur-names {
      flex: 1;
      margin-top: 0;
      margin-left: 10px;
    }
  }

  .wd-bd {
    position: relative;
    &.selected {
      &:after {
        border: 1px solid #ff8800;
      }
      &:before {
        content: "";
        position: absolute;
        bottom: -1px;
        right: -1px;
        background: url("../images/selectDate.png") no-repeat center;
        background-size: 100%;
        width: 13px;
        height: 13px;
      }
    }
  }

  .weui-dialog {
    width: 75%;
  }

  .en-surname, .en-givenname {
    .weui-dialog__bd {
      padding-top: 5px;
    }
  }

  .name-rule {
    .weui-actionsheet {
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
      background-color: #FCFCFD;
      overflow: hidden;
      top: 100px;
      box-sizing: border-box;
      padding: 0 15px;
      font-size: 16px;
      color: #333333;
      line-height: 70px;
      text-align: center;
      display: flex;
      flex-direction: column;
    }
    .rule-content {
      flex: 1;
      /*overflow-y: auto;*/
      text-align: left;
      padding-bottom: 10px;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      p {
        font-size: 12px;
        color: #666666;
        line-height: 20px;
        margin: 10px 0;
      }
      .p-title {
        font-size: 13px;
        color: #333333;
        height: 14px;
        margin-top: 20px;
        display: flex;
        align-items: center;
        i {
          box-sizing: border-box;
          border: 1px solid #35b735;
          display: block;
          width: 14px;
          height: 14px;
          margin-right: 5px;
          font-size: 10px;
          font-style: normal;
          line-height: 14px;
          text-align: center;
          color: #35b735;
        }
      }
      .box-line {
        background: #FFFFFF;
        border: 1px solid #DDDDDD;
        line-height: 22px;
        font-size: 14px;
        .weui-label {
          color: #666666;
        }
        .box-con {
          color: #333333;
        }
      }
    }
    .rule-btn {
      width: 100%;
      box-sizing: border-box;
      padding: 20px 0;
    }
  }

  .edit-wrap {
    .weui-cell_select-before .weui-cell__hd:after {
      transform: none;
      border: none;
    }
  }
</style>
