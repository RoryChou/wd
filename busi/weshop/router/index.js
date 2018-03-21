import Vue from 'vue'
import Router from 'vue-router'
import { getUserInfo } from '@/api/user'

Vue.use(Router)

// import weui from 'weui.js'
const Home = () => import('@/page/Home')
const My = () => import('@/page/My')
const VisitorInfos = () => import('@/page/VisitorInfos')
const TicketVisitor = () => import('@/page/TicketVisitor')
const WxLogin = () => import('@/page/WxLogin')
const BindMobile = () => import('@/page/BindMobile')
const WeShopAgreement = () => import('@/page/WeShopAgreement')
const EditVisitor = () => import('@/page/EditVisitor')
const SelectRegion = () => import('@/page/SelectRegion')
const MyOrders = () => import('@/page/MyOrders')
const TicketDetail = () => import('@/page/TicketDetail')
const TicketIntroduction = () => import('@/page/TicketIntroduction')
const TicketOrderCalendar = () => import('@/page/TicketOrderCalendar')
const Pay = () => import('@/page/Pay')
const TicketMap = () => import('@/page/TicketMap')
const TicketOrder = () => import('@/page/TicketOrder')
const OrderDetail = () => import('@/page/OrderDetail')
const ShopClose = () => import('@/page/error/ShopClose')
const ServerError = () => import('@/page/error/ServerError')

const router = new Router({
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
      component: VisitorInfos,
      meta: {needLogin: true}
    },
    {
      path: '/ticket/visitor',
      name: 'ticketvisitor',
      component: TicketVisitor,
      meta: {needLogin: false}
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
      component: EditVisitor,
      meta: {needLogin: true}
    },
    {
      path: '/selectregion',
      name: 'selectregion',
      component: SelectRegion
    },
    {
      path: '/myorders',
      name: 'myorders',
      component: MyOrders,
      meta: {needLogin: true}
    },
    {
      path: '/ticket/detail',
      name: 'ticketdetail',
      component: TicketDetail
    },
    {
      path: '/ticket/introduction',
      name: 'ticketintroduction',
      component: TicketIntroduction
    },
    {
      path: '/error/shopclose',
      name: 'shopclose',
      component: ShopClose
    },
    {
      path: '/error/500',
      name: 'servererror',
      component: ServerError
    },
    {
      path: '/ticket/order',
      name: 'ticketorder',
      component: TicketOrder
    },
    {
      path: '/ticket/ordercalendar',
      name: 'ticketordercalendar',
      component: TicketOrderCalendar
    },
    {
      path: '/ticket/pay',
      name: 'pay',
      component: Pay
    },
    {
      path: '/ticket/map',
      name: 'ticketmap',
      component: TicketMap
    },
    {
      path: '/ticket/orderdetail',
      name: 'orderdetail',
      component: OrderDetail
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

router.beforeEach((to, from, next) => {
  // 暂时解决weui且换路由不关闭问题，后续全部换成组件
  let weuiWrap = document.querySelectorAll('.weui-mask')
  weuiWrap.forEach(item => {
    item.click()
  })
  // 登录状态检测，这里不能完全判断用户的登录状态，还依赖服务端的session过期
  let user = localStorage.getItem('user')
  if (!user && to.meta.needLogin) {
    sessionStorage.setItem('cburl', to.path)
    next({path: '/wxlogin'})
  } else {
    next()
  }
})

export default router
