<template>
    <div class="weui-tab">
        <slot name="tab_panel"/>
        <div class="weui-tabbar">
            <router-link to="/" class="weui-tabbar__item">
                <div class="home-tab weui-tabbar__icon"></div>
                <p class="weui-tabbar__label">首页</p>
            </router-link>
            <a :href="contactMobile" class="weui-tabbar__item">
                <div class="kf-tab weui-tabbar__icon"></div>
                <p class="weui-tabbar__label">客服</p>
            </a>
            <router-link to="/my" class="weui-tabbar__item">
                <div class="my-tab weui-tabbar__icon"></div>
                <p class="weui-tabbar__label">我的</p>
            </router-link>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'tab-bar',
    props: [
      'currentTab',
      'contactMobile'
    ]
  }
</script>

<style lang="less" scoped>
    .home-tab {
        background: url("../../images/home-icon-1.png");
        background-size: 100%;
    }

    .my-tab {
        background: url("../../images/my-icon-1.png");
        background-size: 100%;
    }

    .kf-tab {
        background: url("../../images/phone-icon-1.png");
        background-size: 100%;
    }

    .router-link-exact-active {
        .weui-tabbar__label {
            color: #09BB07;
        }
        .home-tab {
            background: url("../../images/home-icon-1-active.png");
            background-size: 100%;
        }
        .my-tab {
            background: url("../../images/my-icon-1-active.png");
            background-size: 100%;
        }
        .kf-tab {
            background: url("../../images/phone-icon-1-active.png");
            background-size: 100%;
        }
    }

    .weui-tabbar {
        position: fixed;
    }

    .weui-tabbar {
        background: #FFFFFF;
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.10);
        &:before {
            display: none;
        }
        .weui-tabbar__icon {
            width: 22px;
            height: 22px;
        }
        .weui-tabbar__label {
            line-height: 20px;
        }
        .weui-tabbar__item {
            padding: 6px 0 0;
        }
    }

    .weui-tab__panel {
        padding-bottom: 48px;
        background-color: #f5f5f5;
        position: relative;
    }
</style>
