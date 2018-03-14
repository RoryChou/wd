<template>
    <div class="page show">
        <div class="page-inner">
            <div class="page-panel">
                <div class="top-menu">
                    <router-link :to="{path:'/editvisitor',query:{memberId:this.memberId}}"><i class="add"></i>新增常用游玩人</router-link>
                </div>
                <transition name="fade">
                    <div class="infos" v-show="!loadingData">
                        <div class="no-records" v-if="visitorInfos.length===0">
                            <div class="bg"></div>
                            <p>暂无常用游玩人，赶快添加吧</p>
                        </div>
                        <info-box v-else v-for="visitor in visitorInfos" :key="visitor.visitorId" :model="visitor" @delete="handleDeleteVisitor" @edit="handleEditVisitor"/>
                    </div>
                </transition>
            </div>
        </div>

        <transition name="fade">
            <div class="loading-toast" v-if="loadingData">
                <div class="weui-mask_transparent"></div>
                <div class="weui-toast">
                    <i class="weui-loading weui-icon_toast"></i>
                    <p class="weui-toast__content">{{loadingTxt}}</p>
                </div>
            </div>
        </transition>

        <transition name="fade">
            <div class="weui-wrap confirm-dialog" v-if="deleteConfirmDlg">
                <div class="weui-mask"></div>
                <div class="weui-dialog">
                    <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示</strong></div>
                    <div class="weui-dialog__bd">您确定要删除 {{targetVisitor.visitorName}} 的信息</div>
                    <div class="weui-dialog__ft">
                        <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_default" @click="handleCancelDelete">取消</a>
                        <a href="javascript:" class="weui-dialog__btn weui-btn_warn" @click="handleDoDelete">删除</a>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
  import axios from 'axios'
  import InfoBox from '../components/visitor-infos/InfoBox'
  import * as utils from '../util/utils'
  import cm from '../cm'

  export default {
    name: 'visitor-infos',
    components: {
      InfoBox
    },
    data () {
      return {
        memberId: sessionStorage.getItem('memberId'),
        loadingData: false,
        loadingTxt: '数据加载中',
        deleteConfirmDlg: false,
        targetVisitor: {},
        visitorInfos: []
      }
    },
    mounted () {
      this.init()
    },

    methods: {
      // 初始化方法
      init: function () {
        let isLogin = sessionStorage.getItem('isLogin')
        if (isLogin === 'true') {
          // do nothing
        } else {
          axios.get(cm.myHome.saveFromRoute, {
            params: {
              fromRoute: '/visitorinfos'
            }
          })
          this.$router.replace('/wxlogin')
        }
        utils.setTitle('常用游玩人信息')

        axios.get(cm.myHome.loadVisitor, {
          params: {
            memberId: sessionStorage.getItem('memberId')
          }
        })
          .then(res => {
            if (res.data.success) {
              this.visitorInfos = res.data.visitorList
              this.loadingData = false
            }
          })
      },
      handleDeleteVisitor (model) {
        this.targetVisitor = model
        this.deleteConfirmDlg = true
      },
      handleEditVisitor (id) {
        console.log('这是游玩人' + id)
        // 跳转到编辑处，回显
        this.$router.push({
          path: '/editvisitor',
          query: {
            visitorId: id
          }
        })
      },
      handleCancelDelete () {
        this.deleteConfirmDlg = false
      },
      handleDoDelete () {
        this.deleteConfirmDlg = false
        this.loadingTxt = '删除信息中'
        this.loadingData = true
        // 假装向服务端请求删数据
        axios.delete(cm.visitor.deleteVisitor, {
          params: {
            visitorId: this.targetVisitor.visitorId
          }
        }).then(res => {
          if (res.data.success) {
            // 数组中删除该用户
            this.visitorInfos.forEach((item, index) => {
              if (item.visitorId === this.targetVisitor.visitorId) {
                this.visitorInfos.splice(index, 1)
              }
            })
            this.loadingData = false
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
    @import "../style/base";

    .page-panel {
        background-color: #f5f5f5;
    }

    .top-menu {
        padding: 10/@rem 10/@rem 0;
        display: flex;
        > a {
            flex: 1;
            display: block;
            font-size: 14px;
            color: #666666;
            line-height: 16px;
            text-align: center;
            padding: 15px 0;
            background: #FFFFFF;
            border-radius: 5px;
            i {
                display: inline-block;
                width: 16px;
                height: 16px;
                vertical-align: top;
                margin-right: 5px;
                &.add {
                    background: url("../images/add-icon-1.png") no-repeat center;
                    background-size: 100%;
                    width: 16px;
                    height: 16px;
                }
            }
        }
    }

    .infos {
        padding: 0 10/@rem 10/@rem;
    }

    .no-records {
        .bg {
            background: url("../images/no-records-bg.png") no-repeat center;
            background-size: 100%;
            width: 158/@rem;
            height: 121/@rem;
            margin: 55/@rem auto 0;
        }
        p {
            font-size: 14px;
            color: #999999;
            text-align: center;
            margin-top: 20px;
        }
    }

    .loading-toast, .confirm-dialog {
        font-size: 15px;
        z-index: 1000;
        position: relative;
    }

    .confirm-dialog {
        .weui-btn_warn {
            color: #ffffff;
            &:after {
                content: none;
            }
        }
    }
</style>
