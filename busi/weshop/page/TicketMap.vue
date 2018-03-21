<template>

  <section class="page" :class="{show:c_PageShow}" :style="{minHeight:clientHeight+'px'}">

    <lv-header title="地图"/>
    <div id="allmap" :style="{height: clientHeight+'px'}">
    </div>
  </section>


</template>

<script>
  import LvHeader from '../components/global/LvHeader'

  export default {
    name: 'ticket-map',
    components: {
      LvHeader
    },
    data () {
      return {

        c_PageShow: false,
        clientHeight: document.documentElement.clientHeight
      }
    },
    mounted: function () {
      this.c_PageShow = true
      this.init()
    },
    methods: {
      init: function () {



        // 百度地图API功能
        var map = new BMap.Map('allmap')    // 创建Map实例
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11)  // 初始化地图,设置中心点坐标和地图级别
        //添加地图类型控件
        map.addControl(new BMap.MapTypeControl({
          mapTypes: [
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
          ]
        }))
        map.setCurrentCity('北京')          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true)     //开启鼠标滚轮缩放
      }
    }
  }
</script>

<style lang="less" scoped>
  #allmap {
    width: 100%;
  }
</style>
