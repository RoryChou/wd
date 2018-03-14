<template>
    <section>
        <div class="page edit-wrap show">
            <div class="search-wrap">
                <input v-model="searchKey" placeholder="请输入国家中文名、全拼或国家代码"/>
                <a class="search-cancel" v-show="searchKey" @click="searchKey=''">取消</a>
            </div>
            <div class="letter-list" v-show="!searchKey" @touchmove="handleTouchMove" ref="letters">
                <a v-for="(item,index) in letters" :key="index" @click="naver(item)">{{item==='HOT'?'热门':item}}</a>
            </div>
            <div class="letter-tip letter-tip-hide" :class="{'letter-tip-hide':!letterTipShow,'letter-tip-show':letterTipShow}">{{letterTip}}</div>
            <div class="page-panel" ref="pagePanel" :style="{height:clientHeight+'px'}">
                <!--下面为初始化列表-->
                <div class="country-list" v-show="!searchKey">
                    <h4 id="HOT">热门国家或地区</h4>
                    <div class="country-group">
                        <div class="country-item" @click="handleRegionClick(86)">
                            <div class="region-name">中国大陆</div>
                            <div class="region-no">+86</div>
                        </div>
                        <div class="country-item" @click="handleRegionClick(852)">
                            <div class="region-name">中国香港</div>
                            <div class="region-no">+852</div>
                        </div>
                        <div class="country-item" @click="handleRegionClick(886)">
                            <div class="region-name">中国澳门</div>
                            <div class="region-no">+886</div>
                        </div>
                        <div class="country-item" @click="handleRegionClick(853)">
                            <div class="region-name">中国台湾</div>
                            <div class="region-no">+853</div>
                        </div>
                        <div class="country-item" @click="handleRegionClick(1)">
                            <div class="region-name">加拿大</div>
                            <div class="region-no">+1</div>
                        </div>
                        <div class="country-item" @click="handleRegionClick(1)">
                            <div class="region-name">美国</div>
                            <div class="region-no">+1</div>
                        </div>
                    </div>
                    <div v-for="(item,index) in countries" :key="index">
                        <h4 :id="item.letter">{{item.letter}}</h4>
                        <div class="country-group">
                            <div class="country-item" v-for="(item1,index1) in item.regions" :key="index1" @click="handleRegionClick(item1.code)">
                                <div class="region-name">{{item1.name_cn}}</div>
                                <div class="region-no">+{{item1.code}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--下面为搜索结果列表-->
                <div class="country-list" v-show="searchKey">
                    <!--有结果的列表-->
                    <div class="country-group" v-if="searchResult.length>0">
                        <div class="country-item" v-for="(item1,index1) in searchResult" :key="index1" @click="handleRegionClick(item1.code)">
                            <div class="region-name">{{item1.name_cn}}</div>
                            <div class="region-no">+{{item1.code}}</div>
                        </div>
                    </div>
                    <!--无结果的情况-->
                    <div class="country-item-nodata wd-bd-bottom" v-if="searchResult.length===0">无结果</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
  const countries = [
    {
      letter: 'A',
      regions: [
        {'id': 2, 'name_en': 'Australia', 'name_cn': '澳大利亚', py: 'aodaliya', 'code': '61'},
        {'id': 3, 'name_en': 'Argentina', 'name_cn': '阿根廷', py: 'agenting', 'code': '54'},
        {'id': 10, 'name_en': 'Egypt', 'name_cn': '埃及', py: 'aiji', 'code': '20'},
        {'id': 24, 'name_en': 'Estonia', 'name_cn': '爱沙尼亚', py: 'aishaniya', 'code': '372'},
        {'id': 29, 'name_en': 'Ireland', 'name_cn': '爱尔兰', py: 'aierlan', 'code': '353'}
      ]
    },
    {
      letter: 'B',
      regions: [
        {'id': 4, 'name_en': 'Brazil', 'name_cn': '巴西', py: 'baxi', 'code': '55'},
        {'id': 36, 'name_en': 'Pakistan', 'name_cn': '巴基斯坦', py: 'bajisitan', 'code': '92'},
        {'id': 37, 'name_en': 'Poland', 'name_cn': '波兰', py: 'bolan', 'code': '48'}
      ]
    },
    {
      letter: 'D',
      regions: [
        {'id': 23, 'name_en': 'Denmark', 'name_cn': '丹麦', py: 'danmai', 'code': '45'},
        {'id': 26, 'name_en': 'Germany', 'name_cn': '德国', py: 'deguo', 'code': '49'}
      ]
    },
    {
      letter: 'E',
      regions: [
        {'id': 40, 'name_en': 'Russia', 'name_cn': '俄罗斯', py: 'eluosi', 'code': '7'}
      ]
    },
    {
      letter: 'F',
      regions: [
        {'id': 7, 'name_en': 'France', 'name_cn': '法国', py: 'faguo', 'code': '33'},
        {'id': 16, 'name_en': 'Philippines', 'name_cn': '菲律宾', py: 'feilvbin', 'code': '63'},
        {'id': 25, 'name_en': 'Finland', 'name_cn': '芬兰', py: 'fenlan', 'code': '358'}
      ]
    },
    {
      letter: 'G',
      regions: [
        {'id': 48, 'name_en': 'Colombia', 'name_cn': '哥伦比亚', py: 'gelunbiya', 'code': '57'}
      ]
    },
    {
      letter: 'H',
      regions: [
        {'id': 18, 'name_en': 'South Korea', 'name_cn': '韩国', py: 'hanguo', 'code': '82'},
        {'id': 34, 'name_en': 'Netherlands', 'name_cn': '荷兰', py: 'helan', 'code': '31'}
      ]
    },
    {
      letter: 'J',
      regions: [
        {'id': 6, 'name_en': 'Canada', 'name_cn': '加拿大', py: 'jianada', 'code': '1'},
        {'id': 47, 'name_en': 'Cambodia', 'name_cn': '柬埔寨', py: 'jianpuzhai', 'code': '855'}
      ]
    },
    {
      letter: 'L',
      regions: [
        {'id': 32, 'name_en': 'Latvia', 'name_cn': '拉脱维亚', py: 'latuoweiya', 'code': '371'},
        {'id': 33, 'name_en': 'Lithuania', 'name_cn': '立陶宛', py: 'litaowan', 'code': '370'},
        {'id': 39, 'name_en': 'Portugal', 'name_cn': '罗马尼亚', py: 'luomaniya', 'code': '40'}
      ]
    },
    {
      letter: 'M',
      regions: [
        {'id': 61, 'name_en': 'USA', 'name_cn': '美国', py: 'meiguo', 'code': '1'},
        {'id': 12, 'name_en': 'Mexico', 'name_cn': '墨西哥', py: 'moxige', 'code': '52'},
        {'id': 14, 'name_en': 'Malaysia', 'name_cn': '马来西亚', py: 'malaixiya', 'code': '60'},
        {'id': 49, 'name_en': 'Mongolia', 'name_cn': '蒙古', py: 'menggu', 'code': '976'}
      ]
    },
    {
      letter: 'N',
      regions: [
        {'id': 35, 'name_en': 'Norway', 'name_cn': '挪威', py: 'nuowei', 'code': '47'}
      ]
    },
    {
      letter: 'P',
      regions: [
        {'id': 38, 'name_en': 'Portugal', 'name_cn': '葡萄牙', py: 'putaoya', 'code': '351'}
      ]
    },
    {
      letter: 'R',
      regions: [
        {'id': 13, 'name_en': 'Japan', 'name_cn': '日本', py: 'riben', 'code': '81'},
        {'id': 42, 'name_en': 'Sweden', 'name_cn': '瑞典', py: 'ruidian', 'code': '46'},
        {'id': 43, 'name_en': 'Switzerland', 'name_cn': '瑞士', py: 'ruishi', 'code': '41'}
      ]
    },
    {
      letter: 'S',
      regions: [
        {'id': 19, 'name_en': 'Sri Lanka', 'name_cn': '斯里兰卡', py: 'sililanka', 'code': '94'}
      ]
    },
    {
      letter: 'T',
      regions: [
        {'id': 21, 'name_en': 'Thailand', 'name_cn': '泰国', py: 'taiguo', 'code': '66'},
        {'id': 44, 'name_en': 'Turkey', 'name_cn': '土耳其', py: 'tuerqi', 'code': '90'}
      ]
    },
    {
      letter: 'W',
      regions: [
        {'id': 5, 'name_en': 'Brunei', 'name_cn': '文莱', py: 'wenlai', 'code': '673'}
      ]
    },
    {
      letter: 'X',
      regions: [
        {'id': 15, 'name_en': 'New Zealand', 'name_cn': '新西兰', py: 'xinxilan', 'code': '64'},
        {'id': 17, 'name_en': 'Singapore', 'name_cn': '新加坡', py: 'xinjiapo', 'code': '65'},
        {'id': 27, 'name_en': 'Greece', 'name_cn': '希腊', py: 'xila', 'code': '30'},
        {'id': 28, 'name_en': 'Hungary', 'name_cn': '匈牙利', py: 'xiongyali', 'code': '36'},
        {'id': 41, 'name_en': 'Spain', 'name_cn': '西班牙', py: 'xibanya', 'code': '34'}
      ]
    },
    {
      letter: 'Y',
      regions: [
        {'id': 9, 'name_en': 'India', 'name_cn': '印度', py: 'yindu', 'code': '91'},
        {'id': 11, 'name_en': 'Indonesia', 'name_cn': '印尼', py: 'yinni', 'code': '62'},
        {'id': 22, 'name_en': 'Vietnam', 'name_cn': '越南', py: 'yuenan', 'code': '84'},
        {'id': 30, 'name_en': 'Israel', 'name_cn': '以色列', py: 'yiselie', 'code': '972'},
        {'id': 31, 'name_en': 'Italy', 'name_cn': '意大利', py: 'yidali', 'code': '39'},
        {'id': 46, 'name_en': 'United Kindom', 'name_cn': '英国', py: 'yingguo', 'code': '44'}
      ]
    },
    {
      letter: 'Z',
      regions: [
        {'id': 1, 'name_en': 'China', 'name_cn': '中国大陆', py: 'zhongguodalu', 'code': '86'},
        {'id': 8, 'name_en': 'Hong Kong', 'name_cn': '中国香港', py: 'zhongguoxianggang', 'code': '852'},
        {'id': 20, 'name_en': 'Taiwan', 'name_cn': '中国台湾', py: 'zhongguotaiwan', 'code': '886'},
        {'id': 45, 'name_en': 'Macao', 'name_cn': '中国澳门', py: 'zhongguoaomen', 'code': '853'}
      ]
    }
  ]

  export default {
    name: 'select-region',
    data () {
      return {
        letterTipShow: false,
        letterTip: '',
        clientHeight: document.documentElement.clientHeight,
        searchKey: '',
        countries: countries,
        letters: ['HOT', 'A', 'B', 'D', 'E', 'F', 'G', 'H', 'J', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'],
        searchResult: [],
        letterTimeObj: null
      }
    },
    methods: {
      naver: function (letter) {
        let obj = document.getElementById(letter)
        this.$refs.pagePanel.scrollTop = obj.offsetTop - 44
        this.letterTip = letter
        this.letterTipShow = true
        clearTimeout(this.letterTimeObj)
        this.letterTimeObj = setTimeout(() => {
          this.letterTipShow = false
        }, 500)
      },
      handleRegionClick: function (code) {
        let visitorinfo = sessionStorage.getItem('visitorinfo')
        visitorinfo = visitorinfo ? JSON.parse(visitorinfo) : {}
        visitorinfo.regionNum = code
        console.log('nihao:' + visitorinfo.regionNum)
        sessionStorage.setItem('visitorinfo', JSON.stringify(visitorinfo))
        console.log(JSON.parse(sessionStorage.getItem('visitorinfo')))
        this.$router.back()
      },
      handleTouchMove: function (e) {
        e.preventDefault()
        let index = ((e.touches[0].clientY - 100) / this.$refs.letters.clientHeight * 20).toFixed(0)
        if (index > 0 && index < 20) {
          this.naver(this.letters[index])
        }
      }
    },
    watch: {
      searchKey: function (newValue, oldValue) {
        let tempSearchResult = []
        countries.forEach(item => {
          item.regions.forEach(item1 => {
            newValue = newValue.toLowerCase()
            console.log('newValue:' + newValue)
            if (item1.name_cn.indexOf(newValue) > -1 || item1.py.indexOf(newValue) > -1 || item1.code.indexOf(newValue) > -1) {
              tempSearchResult.push(item1)
            }
          })
        })
        this.searchResult = tempSearchResult
      }
    }
  }
</script>

<style lang="less" scoped>
    @import "../style/base";

    .search-wrap {
        width: 100%;
        height: 44px;
        background: #3E3F43;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        display: flex;
        input {
            height: 30px;
            line-height: 16px;
            background-color: #ffffff;
            border-radius: 100px;
            font-size: 14px;
            outline: none;
            border: none;
            box-sizing: border-box;
            padding: 8px 20px;
            display: block;
            flex: 1;
            margin-top: 7px;
            margin-left: 10px;
            margin-right: 10px;
        }
    }

    .page-panel {
        padding-top: 44px;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }

    .country-list {
        h4 {
            height: 36px;
            line-height: 36px;
            padding-left: 15px;
            font-size: 13px;
            color: #888888;
        }
    }

    .country-group {
        background-color: #ffffff;
        padding: 0 15px;
        .country-item {
            height: 44px;
            line-height: 44px;
            font-size: 14px;
            color: #333333;
            position: relative;
            padding-right: 35px;
            &:active {
                background-color: #f5f5f5;
            }
            &.selected {
                color: #1AAD19;
            }
            &:after {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                border-top: 1px solid #e5e5e5;
                width: 100%;
                transform: scaleY(0.5);
                transform-origin: 0 0;
                -webkit-transform: scaleY(0.5);
                -webkit-transform-origin: 0 0;
            }
            &:first-child {
                &:after {
                    content: none;
                }
            }
        }
        .region-name {
            float: left;
        }
        .region-no {
            float: right;
        }
    }

    .country-item-nodata {
        background: #FFFFFF;
        height: 44px;
        line-height: 44px;
        font-size: 14px;
        color: #999999;
        text-align: center;
    }

    .search-cancel {
        font-size: 14px;
        color: #FFFFFF;
        display: block;
        padding: 0 10px;
        line-height: 44px;
    }

    .letter-list {
        position: fixed;
        right: 0;
        top: 100px;
        font-size: 12px;
        color: #999999;
        z-index: 1;
        overflow: hidden;
        a {
            width: 40px;
            display: block;
            text-align: center;
        }
    }

    .letter-tip {
        position: fixed;
        top: 50%;
        left: 50%;
        margin-left: -42px;
        margin-top: -42px;
        color: #fff;
        text-align: center;
        border-radius: 50%;
        z-index: 4;
        background: #1AAD19;
        opacity: 0;
        display: none;
        width: 84px;
        height: 84px;
        line-height: 84px;
        font-size: 32px;
        box-sizing: border-box;
        -webkit-text-size-adjust: 100%;
        text-size-adjust: 100%;
        transition: .5s all;
    }

    .letter-tip-show {
        display: block !important;
        opacity: 1 !important
    }
</style>
