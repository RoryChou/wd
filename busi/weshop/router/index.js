import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('@/page/Home')
const My = () => import('@/page/My')
const VisitorInfos = () => import('@/page/VisitorInfos')
const WxLogin = () => import('@/page/WxLogin')
const BindMobile = () => import('@/page/BindMobile')
const WeShopAgreement = () => import('@/page/WeShopAgreement')
const EditVisitor = () => import('@/page/EditVisitor')
const SelectRegion = () => import('@/page/SelectRegion')
const MyOrders = () => import('@/page/MyOrders')
const TicketDetail = () => import('@/page/TicketDetail')
const TicketIntroduction = () => import('@/page/TicketIntroduction')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/my',
      name: 'my',
      component: My
    },
    {
      path: '/visitorinfos',
      name: 'visitorinfos',
      component: VisitorInfos
    },
    {
      path: '/wxlogin/',
      name: 'wxlogin',
      component: WxLogin
    },
    {
      path: '/bindmobile',
      name: 'bindmobile',
      component: BindMobile
    },
    {
      path: '/weshopagreement',
      name: 'weshopagreement',
      component: WeShopAgreement
    },
    {
      path: '/editvisitor',
      name: 'editvisitor',
      component: EditVisitor
    },
    {
      path: '/selectregion',
      name: 'selectregion',
      component: SelectRegion
    },
    {
      path: '/myorders',
      name: 'myorders',
      component: MyOrders
    },
    {
      path: '/ticketdetail',
      name: 'ticketdetail',
      component: TicketDetail
    },
    {
      path: '/ticketintroduction',
      name: 'ticketintroduction',
      component: TicketIntroduction
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})
