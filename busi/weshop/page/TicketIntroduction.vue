<template>
  <section class="page">
    <lv-loading :show="!c_PageShow"/>
    <div class="page-panel" :class="{show:c_PageShow}" @scroll="handleScroll">
      <lv-header title="东方明珠" :shadow="false"/>
      <nav class="navFixed">
        <span :class="{active:!c_IntroInView}">预订须知</span>
        <span :class="{active:c_IntroInView}">景区介绍</span>
      </nav>
      <article class="tabChange viewspot-introduction">
        <div class="play-project scenicSpots" ref="floor1">
          <div class="project-title">预订须知</div>
          <div>
            <p class="spotName">开放时间</p>
            <p>8:30-22:00 （21:30停止取票）</p>
          </div>
          <div>
            <p class="spotName">免票政策</p>
            <p>景区规定统一售价，暂无其他免票政策。</p>
          </div>
          <div>
            <p class="spotName">优惠人群</p>
            <p>a. 1.0米（不含）～1.4米（含）的儿童享儿童票。（须至上海之巅观光厅售票处购买）<br>nb. 60周岁（含）以上的老人（凭身份证、护照等有效证件）享优惠票。（须至上海之巅观光厅售票处购买）<br>c. 军人、军残及残疾人票（凭有效证件）享优惠票。（须至上海之巅观光厅售票处购买）<br>d. 学生票（凭注册有效的学生证或能够证明其学生身份的在校学生及外籍学生，且年龄须为23周岁以下）享优惠票。（须至上海之巅观光厅售票处购买）<br>* 以上信息仅供参考，具体以景区当日信息为准。</p>
          </div>
          <div>
            <p class="spotName">设施包含</p>
            <div class="ss-list">
              <div>
                <b class="canting"></b>
                <p>餐厅</p>
              </div>
              <div>
                <b class="jiudian"></b>
                <p>酒店</p>
              </div>
              <div>
                <b class="shangdian"></b>
                <p>商店</p>
              </div>
              <div>
                <b class="tingche"></b>
                <p>免费停车场</p>
              </div>
              <div>
                <b class="canting"></b>
                <p>餐厅</p>
              </div>
            </div>
          </div>
          <div>
            <p class="spotName">开具发票</p>
            <p>1. 请致电10106060，告知客服专员发票抬头和邮寄地址，我司在收到完整信息后向您寄送发票。为避免因发生不可抗力或意外事项致实际消费额与发票开具的相应数额不符，建议您在游玩归来后两个月内索领取发票。（在线支付）</p>
          </div>
          <div>
            <p class="spotName">温馨提示</p>
            <p>1.在不能满足设备安全运行的恶劣天气，无法抗拒的自然灾害情况下（如雷电、雨雪、冰雹、大雾、暴雨、台风等），景区部分项目将临时关闭或部分关闭，表演会取消或部分取消。<br>2.严禁倒票，一经发现，相关电子门票作废，入园现场将不予承认，驴妈妈旅游网将不予退费并将相关账号、手机号列入黑名单。请广大用户选择驴妈妈官方网站或官方合作渠道购买，维护自身权益不被侵犯。<br>3.景区活动内容如有变动，以当日公告为准。景区所有项目均会定期进行日检、周检、月检和年度检修，相关检修工作可能会造成部分项目运行时间的延迟或暂停对游客开放，详情以景区现场公告为准。<br>4.为保障您的出游安全，驴妈妈建议您订购在线支付产品时选购相关旅游保险。</p>
          </div>
          <div>
            <p class="spotName">交通信息</p>
            <i>公交车</i>
            <p class="mgb5">乘坐隧道6线在世纪大道浦东南路站下车；乘坐455路在陆家嘴东路浦东南路(东方医院)站下车。</p>
            <i>轨道交通</i>
            <p class="mgb5">乘坐地铁2号线在陆家嘴站下车6号口出可达到。</p>
          </div>
        </div>
        <div class="play-project" ref="floor2">
          <div class="project-title">景区介绍</div>
          <p class="spotName">上海中心大厦“上海之巅观光厅”简介</p>
          <p>“上海的上海中心”分为上海的韵味、上海的高度、上海的上海中心三个主题，运用动静结合、虚实结合展示方式，将动态影像穿插在静态的照片中，从不同的视角向人们展示了不同时期不同风格的海派建筑，随着时间的变迁，逐步地展示了上海这个国际化大都市在发展的过程中的代表性建筑。这些建筑，既富有建筑美感又蕴藏着深厚的历史文化底蕴，富上海韵味的城市内涵，是传承。</p>
          <p class="spotName">生长的天际线</p>
          <p>生长的天际线”展项位于地下1层的上海之巅展示厅的序厅。用100秒时长的实景还原动画影片，浓缩演绎了自1840年上海开埠以来170余年外滩、浦东陆家嘴天际线生长的发展史，以影像与声音合成动态的形式，直观展现了上海城市日新月异的变化，一幢幢高楼拔地而起，一个个高度被不断刷新，直至上海中心成为了上海的新高度，新地标。</p>
          <img src="http://pic.lvmama.com//uploads/pc/place2/2017-02-28/a3db1411-d3d5-44b8-afa2-7877078012bf_720_.jpg" alt="">
          <img src="http://pic.lvmama.com//uploads/pc/place2/2017-02-28/742d8291-06a5-4e73-8340-58138f68e61b_720_.jpg" alt="">
          <p class="spotName">上海的上海中心</p>
          <p>“上海的上海中心”分为上海的韵味、上海的高度、上海的上海中心三个主题，运用动静结合、虚实结合展示方式，将动态影像穿插在静态的照片中，从不同的视角向人们展示了不同时期不同风格的海派建筑，随着时间的变迁，逐步地展示了上海这个国际化大都市在发展的过程中的代表性建筑。这些建筑，既富有建筑美感又蕴藏着深厚的历史文化底蕴，是极富上海韵味的城市内涵，是传承也是超越。</p>
          <img src="http://pic.lvmama.com//uploads/pc/place2/2017-03-06/febea4e1-a872-4c87-9a72-9f7370236c81_720_.jpg" alt="">
          <p class="spotName">摩天梦</p>
          <p>运用目前国内运动自发光透明屏技术和透明水晶模型结合的模式，全方位地展示了摩天大楼的奥秘 。展现了从1885年开始，高度被不断刷新高楼的演变历程，也展现了人类在不断追寻的“摩天梦”。展示了世界高层建筑与都市人居学会(CTBUH)专业提供的截止2020年世界高楼排名情况，是纵览世界高层建筑的窗口。</p>
          <img src="http://pic.lvmama.com//uploads/pc/place2/2017-02-28/293f1468-462e-4e83-b227-7f4d947f0103_720_.jpg" alt="">
          <p class="spotName">基因库</p>
          <p>“基因库”揭示了上海中心这座垂直城市规划、诞生、建设的整个过程。模拟展示了空中花园、阻尼器等10余项世界之创举，揭密了诸多大楼不为人知的基因构造。</p>
          <img src="http://pic.lvmama.com//uploads/pc/place2/2017-02-28/1817b599-e97c-4cf8-8959-b6b72c5532b7_720_.jpg" alt="">
          <p class="spotName">垂直城市</p>
          <p>“垂直城市”展区运用世界前沿的3D打印技术，以大楼1:350尼龙材料整体打印地模型，以主屏加分屏，声、光、电一体的新媒体技术展示方式，展示了上海中心的雨水收集器、双层玻璃幕墙、BIM建造技术、上海少女、鱼乐图等各项绿色、智慧、人文的丰富内涵，表达出垂直城市的理念。</p>
          <img src="http://pic.lvmama.com//uploads/pc/place2/2017-02-28/e98db80d-9be4-4425-82a2-35f0a099110a_720_.jpg" alt="">
          <p class="spotName">最快的电梯</p>
          <p>海之巅观光厅拥有三部高速电梯，速度可达每秒18米，55秒即可到达位于上海中心118层的上海之巅观光厅，乘坐电梯时可通过屏幕看到电梯实时运行速度、高度和方位，每位体验者对电梯速度的震撼之余，也将对它的舒适和稳定印象深刻。</p>
          <img src="http://pic.lvmama.com//uploads/pc/place2/2017-02-24/df78721b-5463-467a-a28f-d71d27cb517e_720_.jpg" alt="">
          <p class="spotName">巅峰景象</p>
          <p>在上海之巅360度全视角观光厅，近看东方明珠、金茂大厦、环球金融中心身居足下，远眺世博园区、城隍庙、八万人体育场、虹桥机场尽收眼底，一览苏州河与黄浦江蜿蜒同奔长江共入东海。身处此处，时而蓝天白云俯瞰海天一线，时而云雾缭绕宛若如来仙境、时而凌驾云端置身魔幻世界……。上海之巅可以尽享气象万千、可以看尽世间繁华、可以饱览众山的巅峰奇景。</p>
          <img src="http://pic.lvmama.com//uploads/pc/place2/2017-02-24/a88247a8-c64f-4b15-8193-c6db8a4cfb57_720_.jpg" alt="">
          <p class="spotName">巅峰视角</p>
          <p>巅峰之旅可领略上海中心垂直社区、绿色标杆、科技智造、文化创新独特内涵；可细数云端全球著名城市的方位；可浏览高层建筑的城市美景；可透过上海中心放眼世界，以更博大的胸怀，以巅峰视角继续探索世界。</p>
          <img src="http://pic.lvmama.com//uploads/pc/place2/2017-02-24/f7b1249b-1172-4e68-8cc3-16fb43438028_720_.jpg" alt="">
          <img src="http://pic.lvmama.com//uploads/pc/place2/2017-02-24/9a538cc7-1cf9-4633-b32b-e6e3971533a8_720_.jpg" alt="">
          <img src="http://pic.lvmama.com//uploads/pc/place2/2017-02-24/1d6973f5-819d-4fd8-89d6-565ec8594b2f_720_.jpg" alt="">
          <p class="spotName">空中邮局</p>
          <p>位于118层的上海之巅空中邮局，每一张明信片都记载着上海之巅的美景，为自己或亲朋好友挑选一张，呼应此刻的心情和意境，此处寄出的来自上海之巅的寄语，是值得珍藏、永恒的礼物。</p>
          <img src="http://pic.lvmama.com//uploads/pc/place2/2017-02-20/e8a7e768-4651-4d82-bdd6-f94b7c508196_720_.jpg" alt="">
          <p class="spotName">许愿树</p>
          <p>在上海之巅观光厅，有一棵充满生机和希望的绿色“许愿树”，它迎接东方的第一缕阳光，见证璀璨繁华它依托三柱合力之势，托举出一片申城之巅的绿阴，也寓意开创绿色、智慧、人文的未来生活，三人为众、三木为森，期待更多的人们在上海之巅许下高高美美的心愿，合力滋养更加绿色美好生活！在此写下一张许愿卡，用红绳系在巅峰许愿树上，将会成为期许未来的记忆时刻。</p>
          <img src="http://pic.lvmama.com//uploads/pc/place2/2017-02-28/7820588c-b5c3-47e9-b443-be164469bb1d_720_.jpg" alt="">
          <p class="spotName">踏破天际</p>
          <p>“踏破天际”互动项目，运用先进的AV装置，感受多媒体与物理高度给予的真实体验。当您身处118层上海之巅，置身于地幕投影的陆家嘴摩天群楼真实场景，配合先进体感热点控制系统，虚拟氛围营造出踏破天际的“裂纹”，一场刺激心跳的巅峰挑战即将开始。</p>
        </div>
        <div class="notice-footer">
          <div @click="handleBuyClick">立即预订</div>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'
  import LvHeader from '../components/global/LvHeader'
  import LvLoading from '../components/global/LvLoading'

  export default {
    name: 'ticket-introduction',
    components: {
      LvHeader,
      LvLoading
    },
    data () {
      return {
        c_PageShow: false,
        c_IntroInView: false
      }
    },
    mounted () {
      // 假装拉取数据
      axios.get('https://www.easy-mock.com/mock/59f965c69692cb0660e7d4d1/example/myvisitors')
        .then(res => {
          if (res.data.success) {
            this.c_PageShow = true
          }
        })
      window.addEventListener('scroll', this.handleScroll)
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
      handleScroll: function (e) {
        let scrollTop = e.currentTarget.scrollY
        this.c_IntroInView = (this.$refs.floor2.offsetTop - scrollTop - document.documentElement.clientHeight / 3 * 2) <= 0
      },
      handleBuyClick: function () {
        sessionStorage.setItem('detailtobuy', '1')
        this.$router.back()
      },
      handleBackClick: function () {
        this.$router.back()
      }
    }
  }
</script>

<style lang="less" scoped>
  .page-panel {
    opacity: 0;
    transition: opacity .5s;
    background-color: #EEEEF5;
    &.show {
      opacity: 1;
    }
  }

  .navFixed {
    overflow: hidden;
    line-height: 35px;
    height: 35px;
    text-align: center;
    background: #fff;
    position: fixed;
    width: 100%;
    top: 44px;
    z-index: 2;
    box-shadow: 0 0 10px #ddd;
    display: flex;
    span {
      font-size: 15px;
      flex: 1;
      &.active {
        font-weight: 700;
        display: inline-block;
        background: url(../images/tab_active.png) no-repeat;
        background-size: 50px 4px;
        background-position-y: 32px;
        background-position-x: center;
      }
    }
  }

  .viewspot-introduction {
    padding-top: 79px;
    padding-bottom: 90px;
  }

  .play-project {
    margin-top: 10px;
    background: #fff;
    font-size: 14px;
    color: #666;
    padding: 0 15px 15px;
    .project-title {
      height: 45px;
      line-height: 45px;
      font-size: 16px;
      color: #333;
      font-weight: 700;
      -webkit-border-image: url(data:image/gif;base64,R0lGODlhBQAFAPABANra2v///yH5BAUHAAEALAAAAAAFAAUAAAIHhB9pGatnCgA7) 2 stretch;
      border-style: solid;
      border-width: 0 0 1px
    }
    p {
      font-size: 12px;
      color: #666666;
      white-space: pre-wrap;
      line-height: 18px;
      text-align: justify;
      padding-bottom: 2px;
      padding-left: 9px;
      &.spotName {
        color: #333;
        padding-left: 9px;
        padding-top: 12px;
        padding-bottom: 2px;
        font-size: 14px;
        font-weight: 600;
        position: relative;
        &:before {
          content: '';
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 100%;
          background-color: #666;
          top: 18px;
          left: 0;
        }
      }
    }
    &.scenicSpots {
      p {
        padding-left: 15px;
        &:before {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          background: url(../images/notice_icon.png);
          background-size: 100%;
          -webkit-background-size: 100%;
          top: 16px;
          left: 0;
          border-radius: 0;
        }
        &:last-child {
          padding-bottom: 0;
          margin-bottom: 0;
        }
      }
    }
    i {
      padding-left: 14px;
      font-weight: 700;
      font-style: normal;
    }
    img {
      width: 100%;
      margin-top: 5px;
      border-radius: 4px;
      border: 0;
      height: auto;
    }
  }

  .notice-footer {
    padding: 50px 15px 10px;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0, #FFF 52%);
    box-sizing: border-box;
    > div {
      width: 100%;
      height: 50px;
      line-height: 50px;
      color: #fff;
      font-size: 18px;
      text-align: center;
      background-image: linear-gradient(90deg, #FF7F6A 0%, #FD3C71 62%);
      border-radius: 100px;
    }
  }

  .ss-list {
    display: flex;
    > div {
      width: 20%;
      margin-top: 10px;
      b {
        display: block;
        width: 20px;
        height: 20px;
        margin: 0 auto;
        &.canting {
          background: url("../images/sheshi/canting-icon.png") no-repeat center;
          background-size: 100%;
        }
        &.jiudian {
          background: url("../images/sheshi/jiudian-icon.png") no-repeat center;
          background-size: 100%;
        }
        &.shangdian {
          background: url("../images/sheshi/shangdian-icon.png") no-repeat center;
          background-size: 100%;
        }
        &.tingche {
          background: url("../images/sheshi/tingche-icon.png") no-repeat center;
          background-size: 100%;
        }
      }
    }
    p {
      font-size: 10px;
      text-align: center;
      padding: 0 !important;
    }
  }
</style>
