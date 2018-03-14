<template>
    <div class="page edit-wrap show">
        <div class="page-inner" :style="{minHeight:clientHeight+'px'}">
            <div class="top-tip">
                <i @click="handleShowNameRule"></i>
                <h3> 游玩人姓名</h3>
                <label>为顺利出行，请填写真实信息</label>
            </div>
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell weui-cell_vcode">
                    <div class="weui-cell__hd required">
                        <label class="weui-label">中文姓名</label>
                    </div>
                    <!--<div class="weui-cell__bd" :class="{showerr:zhNameErrShow}">-->
                    <!--<input class="weui-input" placeholder="请输入中文姓名" pattern="/^[\u0391-\uFFE5A-Za-z]+$/" v-model="zhName">-->
                    <!--<label class="err">请输入中文或字母</label>-->
                    <!--</div>-->
                    <cell-input placeholder="请输入中文姓名" ref="zhName" v-model="zhName" :validator="validateChineseName"/>
                    <div class="weui-cell__ft">
                        <button class="weui-btn weui-btn_plain-primary to-english" @click="handleTrans2En">转英文</button>
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd">
                        <label class="weui-label" style="line-height: 12px;">英文姓</label>
                        <i class="e-name-i">Surname</i>
                    </div>
                    <div class="weui-cell__bd">
                        <!--<input class="weui-input" v-model="surName" placeholder='如张三填写为"ZHANG"'>-->
                        <cell-input placeholder='如张三填写为"ZHANG"' ref="surName" v-model="surName" :validator="validateEnName"/>
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd">
                        <label class="weui-label" style="line-height: 12px;">英文名</label>
                        <i class="e-name-i">Given names</i>
                    </div>
                    <div class="weui-cell__bd">
                        <!--<input class="weui-input" placeholder='如张三填写为"SAN"' v-model="givenNames">-->
                        <cell-input placeholder='如张三填写为"SAN"' ref="givenNames" v-model="givenNames" :validator="validateEnName"/>
                    </div>
                </div>
            </div>
            <div class="top-tip">
                <h3>个人信息</h3>
            </div>
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__hd required">
                        <label class="weui-label">性别</label>
                    </div>
                    <div class="weui-cell__bd">
                        <a class="check-radio" :class="{checked:gender===1}" @click="handleChooseGender(1)"><i></i>男</a>
                        <a class="check-radio" :class="{checked:gender===2}" @click="handleChooseGender(2)"><i></i>女</a>
                    </div>
                </div>
                <div class="weui-cell weui-cell_select weui-cell_access" @click="handleChooseBirthday">
                    <div class="weui-cell__hd ">
                        <div class="weui-select">出生日期</div>
                    </div>
                    <div class="weui-cell__bd">
                        <label style="font-size: 14px;color: #CCCCCC;margin-left: 15px">{{birthDayTxt}}</label>
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd required">
                        <label class="weui-label">人群</label>
                    </div>
                    <div class="weui-cell__bd">
                        <a class="check-radio" :class="{checked:humanStep==='ADULT'}" @click="handleHumanStepGender('ADULT')"><i></i>成人</a>
                        <a class="check-radio" :class="{checked:humanStep==='CHILD'}" @click="handleHumanStepGender('CHILD')"><i></i>儿童</a>
                    </div>
                </div>
                <div v-for="(item,index) in certificates" :key="index" class="weui-cell weui-cell_select weui-cell_select-before">
                    <div class="weui-cell__hd">
                        <div class="weui-select" @click="handleChooseCaType(index,item.cardType)">{{item.type}}</div>
                    </div>
                    <!--<div class="weui-cell__bd">-->
                    <!--<input class="weui-input" type="text" placeholder="与证件保持一致" v-model="item.cardNumber">-->
                    <!--<label class="err" v-show="cardNumErrShow && item.cardType==='ID_CARD'">请输入正确的身份证号</label>-->
                    <!--</div>-->
                    <cell-input placeholder='与证件保持一致' :ref="'cardNumber'+index" v-model="item.cardNumber" :validator="item.cardType==='ID_CARD'?validateIdCard:validateOtherCard"/>
                    <div v-if="index>0" class="weui-cell__fd" @click="handleDeleteCertificate(index)">
                        <div class="delete-icon"></div>
                    </div>
                </div>
                <div @click="handleAddCertificate" class="weui-cell weui-cell_access add-zj" v-show="certificates.length<7">
                    <i></i>
                    <label>添加证件类型</label>
                </div>
            </div>
            <div class="top-tip">
                <h3>联系电话</h3>
            </div>
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell weui-cell_select weui-cell_select-before">
                    <div class="weui-cell__hd required" @click="handleRegionClick">
                        <div class="weui-select">+{{regionNum}}</div>
                    </div>
                    <!--<div class="weui-cell__bd">-->
                    <!--<input class="weui-input" type="number" pattern="[0-9]*" v-model="mobileNum" placeholder="请输入手机号码">-->
                    <!--<label class="err" v-show="mobileErrShow">请输入正确的手机号码</label>-->
                    <!--</div>-->
                    <cell-input ref="mobileNum" type="number" pattern="[0-9]*" placeholder="请输入手机号码" v-model="mobileNum" :validator="regionNum=='86'?validate86Mobile:validateMobile"/>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd">
                        <label class="weui-label">邮箱</label>
                    </div>
                    <!--<div class="weui-cell__bd" :class="{showerr:emailErrShow}">-->
                    <!--<input class="weui-input" v-model="visitorEmail" type="email" placeholder="选填">-->
                    <!--<label class="err">请输入正确的邮箱</label>-->
                    <!--</div>-->
                    <cell-input type="email" ref="visitorEmail" placeholder="选填" v-model="visitorEmail" :validator="validateEmail"/>
                </div>
            </div>
            <a @click="handleSave" class="weui-btn weui-btn_primary btn-save">保存</a>
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
                            <a v-for="(item,index) in selSurNames.items" :key="index" class="wd-bd" :class="{selected:index===selSurNames.index}" @click="handleChooseSurName(index)">{{item.zh+' '+item.en}}</a>
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
                                <a class="wd-bd" v-for="(item1,index1) in item.en" :key="index1" :class="{selected:index1===item.index}" @click="handleChooseGivenName(index,index1)">{{item1}}</a>
                            </div>
                        </div>
                    </div>
                    <div class="weui-dialog__ft">
                        <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_default" @click="handleCloseGivenName">手动填写</a>
                        <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_primary" @click="handleConfirmGivenName">确定</a>
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
                                    <!--<i class="e-name-i">Surname</i>-->
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
                                    <!--<i class="e-name-i">Surname</i>-->
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
    </div>
</template>

<script>
  import axios from 'axios'
  import weui from 'weui.js'
  import pinyin from '../util/pinyin'
  import CellInput from '../components/visitor-infos/CellInput'
  import * as utils from '../util/utils'

  import cm from '../cm'

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

  export default {
    name: 'edit-visitor',
    components: {
      CellInput
    },
    data () {
      return {
        clientHeight: document.documentElement.clientHeight,
        visitorId: '',
        memberId: sessionStorage.getItem('memberId'),
        // 中文名
        zhName: '',
        // 英文姓
        surName: '',
        // 英文名
        givenNames: '',
        // 出生日期
        birthday: '',
        // 性别 1:男 2:女
        gender: 1,
        // 人群 'ADULT':成人 'CHILD':儿童
        humanStep: 'ADULT',
        // 证件数组
        certificates: [
          {
            type: '身份证',
            cardType: 'ID_CARD',
            cardNumber: ''
          }
        ],
        // 国际区号
        regionNum: '86',
        // 手机号
        mobileNum: '',
        // 邮箱
        visitorEmail: '',
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
    mounted () {
      let visitorIdTemp = this.$route.query.visitorId
      let title
      console.log(JSON.parse(sessionStorage.getItem('visitorinfo')))
      let self = this
      let visitorinfo = sessionStorage.getItem('visitorinfo')
      if (visitorinfo) {
        visitorinfo = JSON.parse(visitorinfo)
        console.log(visitorinfo.regionNum)
        visitorinfo.visitorId && (self.visitorId = visitorinfo.visitorId)
        visitorinfo.memberId && (self.memberId = visitorinfo.memberId)
        visitorinfo.zhName && (self.zhName = visitorinfo.zhName)
        visitorinfo.surName && (self.surName = visitorinfo.surName)
        visitorinfo.givenNames && (self.givenNames = visitorinfo.givenNames)
        visitorinfo.regionNum && (self.regionNum = visitorinfo.regionNum)
        console.log('regionNum:' + self.regionNum)
        visitorinfo.visitorName && (self.visitorName = visitorinfo.visitorName)
        visitorinfo.visitorType && (self.visitorType = visitorinfo.visitorType)
        visitorinfo.gender && (self.gender = visitorinfo.gender)
        visitorinfo.birthday && (self.birthday = visitorinfo.birthday)
        visitorinfo.mobileNum && (self.mobileNum = visitorinfo.mobileNum)
        visitorinfo.visitorEmail && (self.visitorEmail = visitorinfo.visitorEmail)
        visitorinfo.certificates && (self.certificates = visitorinfo.certificates)
        console.log(visitorinfo)

        // TODO 以下依次类推
        sessionStorage.removeItem('visitorinfo')
      } else {
        console.log('wu游玩人信息')
      }
      if (!visitorIdTemp) {
        title = '新增常用游玩人'
      } else {
        // 初始化数据
        visitorinfo || this.init()
        title = '编辑常用游玩人'
      }
      utils.setTitle(title)
    },
    methods: {
      init: function () {
        let visitorIdTemp = this.$route.query.visitorId
        console.log('visitorIdTemp:' + visitorIdTemp)
        if (!visitorIdTemp) {
          return
        }

        this.visitorId = visitorIdTemp
        // this代表该vue对象
        let self = this
        // 如果id存在就回显
        axios.get(cm.visitor.getVisitor, {
          params: {
            visitorId: this.visitorId
          }
        }).then(function (response) {
          if (response.data.success) {
            // 绑定数据
            let visitor = response.data.visitor
            self.visitorId = visitor.visitorId
            self.memberId = visitor.memberId
            self.zhName = visitor.visitorName
            self.humanStep = visitor.visitorType
            self.surName = visitor.lastName
            self.givenNames = visitor.firstName
            self.gender = visitor.sex
            self.birthday = visitor.birthday
            self.mobileNum = visitor.mobileNum
            self.regionNum = visitor.regionNum
            self.visitorEmail = visitor.visitorEmail
            if (visitor.visitorCardRelation == null) {
              return
            }
            let relation = visitor.visitorCardRelation
            for (let i = 0; i < relation.length; i++) {
              if (i === 0) {
                console.log('cardType' + relation[i].cardType)
                self.certificates[i].type = relation[i].type
                self.certificates[i].cardType = relation[i].cardType
                self.certificates[i].cardNumber = relation[i].cardNumber
              } else {
                self.certificates.push(relation[i])
              }
            }
          } else if (response.data.status === 'FAIL') {
            console.log(response.data.message)
          } else {
            console.log(response.data.message)
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      // 点击选择出生日期事件
      handleChooseBirthday: function () {
        weui.datePicker({
          start: 1920,
          end: 2020,
          defaultValue: [1980, 9, 18],
          onConfirm: (result) => {
            this.birthday = result[0].value + '-' + (result[1].value < 10 ? ('0' + result[1].value) : result[1].value) + '-' + (result[2].value < 10 ? ('0' + result[2].value) : result[2].value)
          }
        })
      },
      // 点击选择性别事件
      handleChooseGender: function (i) {
        this.gender = i
      },
      // 点击选择人群事件
      handleHumanStepGender: function (i) {
        this.humanStep = i
      },
      // 点击删除证件事件
      handleDeleteCertificate: function (i) {
        this.certificates.splice(i, 1)
      },
      // 点击添加证件事件
      handleAddCertificate: function () {
        let selectedValues = []
        this.certificates.forEach(item => {
          selectedValues.push(item.type)
        })
        let unSelectedCas = []
        CaTypes.forEach(item => {
          if (selectedValues.indexOf(item.label) < 0) {
            unSelectedCas.push(item)
          }
        })
        weui.picker(unSelectedCas, {
          container: 'body',
          defaultValue: [0],
          onConfirm: (result) => {
            this.certificates.push({
              type: result[0].label,
              cardType: result[0].value,
              cardNumber: ''
            })
          }
        })
      },
      // 点击修改证件类型事件
      handleChooseCaType: function (i, value) {
        let selectedValues = []
        this.certificates.forEach(item => {
          selectedValues.push(item.type)
        })
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
            this.certificates[i].type = result[0].label
            this.certificates[i].cardType = result[0].value
            // this.certificates[i].cardNumber = ''
          }
        })
      },
      // 点击保存事件
      handleSave: function () {
        let allValidate = true;
        ['zhName', 'surName', 'givenNames', 'mobileNum', 'visitorEmail'].forEach(item => {
          !this.$refs[item].validate() && (allValidate = false)
        })
        this.certificates.forEach((item, index) => {
          !this.$refs['cardNumber' + index][0].validate() && (allValidate = false)
        })
        if (!allValidate) {
          return
        }

        const that = this

        let relation = that.certificates
        if (that.certificates.length === 1 && that.certificates[0].cardNumber === '') {
          relation = null
        }
        let visitorMobile = that.regionNum + '-' + that.mobileNum

        for (let i = 0; i < that.certificates.length; i++) {
          console.log('当前项' + i)
          console.log(that.certificates[i].cardNumber + '--' + that.certificates[i].cardType)
        }

        const loading = weui.loading('保存中...', {
          className: 'weui-wrap'
        })
        // 保存游玩人信息
        axios.post(cm.visitor.postVisitor, {
          visitorId: that.visitorId,
          memberId: that.memberId,
          visitorName: that.zhName,
          visitorType: that.humanStep,
          visitorMobile: visitorMobile,
          visitorEmail: that.visitorEmail,
          lastName: that.surName.toString(),
          firstName: that.givenNames,
          sex: that.gender,
          birthday: that.birthday,
          visitorCardRelation: relation
        })
          .then(function (response) {
            if (response.data.success) {
              loading.hide(function () {
                console.log('`loading` has been hidden')
              })
              // 跳转到游玩人列表
              that.$router.push({path: '/visitorInfos'})
            } else {

            }
          })
          .catch(function (error) {
            console.log(error)
          })

        // setTimeout(function () {
        //   loading.hide(function () {
        //     console.log('`loading` has been hidden')
        //   })
        // }, 3000)
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
        let cName = this.zhName
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
        this.trans2En()
      },
      // 点击手机号码 区号事件
      handleRegionClick: function () {
        this.$router.push('/selectregion')
        sessionStorage.setItem('visitorinfo', JSON.stringify({
          zhName: this.zhName,
          surName: this.surName,
          givenNames: this.givenNames,
          visitorId: this.visitorId,
          memberId: this.memberId,
          humanStep: this.humanStep,
          gender: this.gender,
          birthday: this.birthday,
          mobileNum: this.mobileNum,
          regionNum: this.regionNum,
          visitorEmail: this.visitorEmail,
          certificates: this.certificates
          // TODO 以下依次类推
        }))
      },
      // 显示姓名填写说明
      handleShowNameRule: function () {
        this.nameRuleShow = true
        setTimeout(() => {
          this.nameRuleAniShow = true
        }, 100)
      },
      // 关闭姓名填写说明
      handleCloseNameRule: function () {
        this.nameRuleAniShow = false
        setTimeout(() => {
          this.nameRuleShow = false
        }, 400)
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

        this.surName = this.enNames[0].surName.en[0]

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
          this.givenNames = bbb
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
        if (/[^a-zA-Z]/.test(value)) {
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
      }
    },
    computed: {
      birthDayTxt: function () {
        return this.birthday ? this.birthday : '与证件保持一致'
      },
      mobileErrShow: function () {
        if (this.regionNum === 86) {
          return this.mobileNum && !utils.isValidMobile(this.mobileNum)
        }
      },
      zhNameErrShow: function () {
        return this.zhName && (!/^[\u0391-\uFFE5A-Za-z]+$/.test(this.zhName))
      },
      emailErrShow: function () {
        return this.visitorEmail && !utils.isValidEmail(this.visitorEmail)
      },
      cardNumErrShow: function () {
        for (var i = 0; i < this.certificates.length; i++) {
          console.log('i:' + i + '-----' + this.certificates[i].cardType)
          if (this.certificates[i].cardType === 'ID_CARD') {
            return this.certificates[i].cardNumber && !utils.isValidID(this.certificates[i].cardNumber)
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
    .page-inner {
        background-color: #f5f5f5;
    }

    .edit-wrap {
        .weui-cells_form {
            font-size: 14px;
            .e-name-i {
                font-size: 10px;
                color: #666666;
                line-height: 10px;
            }
        }
    }

    .top-tip {
        height: 36px;
        /*line-height: 36px;*/
        padding: 0 15px;
        display: flex;
        align-items: center;
        i {
            background: url("../images/attention-icon-1.png") no-repeat center;
            background-size: 100%;
            display: block;
            width: 16px;
            height: 16px;
            margin-right: 10px;
        }
        h3 {
            font-size: 13px;
            color: #888888;
            margin-right: 10px;
        }
        label {
            font-size: 10px;
            color: #999999;
        }
    }

    .weui-cells {
        .weui-cell {
            height: 45px;
            box-sizing: border-box;
        }
        margin-top: 0;
    }

    .weui-cell__hd {
        &.required {
            position: relative;
            &:after {
                content: "*";
                position: absolute;
                color: red;
                top: 3px;
                left: -10px;
            }
        }
    }

    .weui-cell_select {
        .required {
            position: relative;
            &:after {
                content: "*";
                position: absolute;
                color: red;
                top: 15px;
                left: 5px;
            }
        }
    }

    .to-english {
        width: 55px;
        height: 24px;
        line-height: 24px;
        padding: 0 8px;
        box-sizing: border-box;
        font-size: 12px;
        margin-right: 15px;
        border-radius: 3px;
    }

    .weui-cell__fd {
        height: 100%;
    }

    .delete-icon {
        background: url("../images/delete-icon-1.png") no-repeat center;
        background-size: 12px;
        width: 30px;
        height: 100%;
        display: block;
        &:active {
            background-color: #f5f5f5;
        }
    }

    .check-radio {
        line-height: 19px;
        width: 80px;
        display: inline-block;
        i {
            display: inline-block;
            background: url("../images/radio-1-icon.png") no-repeat center;
            width: 18px;
            height: 18px;
            background-size: 100%;
            margin-right: 10px;
            position: relative;
            top: 4px;
        }
        &.checked {
            i {
                background-image: url("../images/radio-1-checked-icon.png");
                background-size: 100%;
            }
        }
    }

    .add-zj {
        display: flex;
        justify-content: center;
        i {
            display: block;
            background: url("../images/add-icon-1.png") no-repeat center;
            width: 16px;
            height: 16px;
            background-size: 100%;
            margin-right: 5px;
        }
        label {
            font-size: 14px;
            color: #666666;
        }
    }

    .btn-save {
        width: 90%;
        margin: 30px auto;
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
                border: 1px solid #1AAD19;
            }
            &:before {
                content: "";
                position: absolute;
                bottom: -1px;
                right: -1px;
                background: url("../images/gou-icon-1.png") no-repeat center;
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
