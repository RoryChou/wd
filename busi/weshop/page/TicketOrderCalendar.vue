<template>
  <section class="page" :class="{show:c_PageShow}">
    <lv-header title="选择游玩日期"/>
    <div class="week">
      <div class="sun">日</div>
      <div class="mon">一</div>
      <div class="tue">二</div>
      <div class="wed">三</div>
      <div class="thu">四</div>
      <div class="fri">五</div>
      <div class="sat">六</div>
    </div>
    <article class="board">
      <div v-for="yearMonth in yearMonthList">
        <TicketCalendarMonth
          :title="yearMonth.title"
          :month="yearMonth.data"
          v-on:selectDateCalendar="selectDateCalendar"
        />
      </div>
    </article>
  </section>
</template>

<script>
  import axios from 'axios'
  import Calendar from '../util/calendar'
  import LvHeader from '../components/global/LvHeader'
  import TicketCalendarMonth from '../components/ticket/TicketCalendarMonth'

  class YearMonth {
    constructor (yearMonthStr, data) {
      this.title = yearMonthStr
      this.data = data
    }
  }

  class Day {
    constructor (dateStr, date, price, yearMonthStr) {
      this.title = dateStr
      this.date = date
      this.price = price

      let yearMonth = Calendar.getDateFromFormattedString(yearMonthStr, 'yyyy-MM')
      this.isThisMonth = Calendar.isSameMonth(date, yearMonth)

      let day = this.date.getDay()
      this.isWeekend = (day === 0) || (day === 6)

      this.selected = false
    }
  }

  export default {
    name: 'ticket-order-calendar',
    components: {
      LvHeader,
      TicketCalendarMonth
    },
    data () {
      return {
        c_PageShow: false,
        yearMonthList: [],
        orderinfo: null
      }
    },
    mounted () {
      let self = this

      let active = null
      let activeDateStr = '2018-03-20'

      //获取门票ID
      let orderinfoStr = sessionStorage.getItem('orderinfo')
      if (orderinfoStr) {
        let orderinfo = JSON.parse(orderinfoStr)

        let ticketId = orderinfo.ticketActive.id

        let ticketList = orderinfo.ticketList
        for (let i = 0; i < ticketList.length; i++) {
          let ticket = ticketList[i]
          if (ticket.id === ticketId) {
            //TODO
            active = true
            if (ticket.info.selectedIndex < 3) {
              activeDateStr = ticket.calendar[ticket.info.selectedIndex].date
            } else {
              activeDateStr = ticket.moreCalendar.date
            }

          }
        }

        this.orderinfo = orderinfo

      }

      // 假装拉取数据
      let url = 'https://www.easy-mock.com/mock/5aa6313619bd8f2d97b03024/calendar/date'
      axios.get(url)
        .then(res => {
          let resData = res.data
          if (resData.success) {
            this.c_PageShow = true
            this.renderCalendar(resData)

            if (active) {
              self.selectDateImprovement(Calendar.getDateFromFormattedString(activeDateStr, 'yyyy-MM-dd'))
            }
          }
        })

    },
    methods: {
      renderCalendar: function (resData) {

        let yearMonthList = []

        let data = resData.data

        //将数据存储为hash，提高效率
        let dateHash = {}

        //将月份进行汇总
        let months = {}

        for (let i = 0; i < data.length; i++) {
          let date = data[i]
          dateHash[date.specDate] = date
          let dateStr = date.specDate
          let dateObj = Calendar.getDateFromFormattedString(dateStr, 'yyyy-MM-dd')
          let yearMonthStr = Calendar.dateFormat(dateObj, 'yyyy-MM')
          months[yearMonthStr] = true
        }

        //将月份排序
        let monthArr = []
        for (let month in months) {
          if (months.hasOwnProperty(month)) {
            monthArr.push(month)
          }
        }
        monthArr.sort()

        for (let i = 0; i < monthArr.length; i++) {
          let yearMonthStr = monthArr[i]
          let dateArr = this.renderMonth(yearMonthStr)
          let newArray = []

          for (let i = 0; i < dateArr.length; i++) {
            let row = dateArr[i]
            let newRow = []

            for (let j = 0; j < row.length; j++) {
              let col = row[j]
              let price = null
              let dateStr = Calendar.dateFormat(col, 'yyyy-MM-dd')

              if (dateHash[dateStr] && dateHash[dateStr].sellPrice) {
                price = dateHash[dateStr].sellPrice
              }
              let day = new Day(dateStr, col, price, yearMonthStr)

              if (i > 4 && j === 0 && !day.isThisMonth) {
                break
              }

              newRow.push(day)
            }
            newArray.push(newRow)
          }
          yearMonthList.push(new YearMonth(yearMonthStr, newArray))
        }
        this.yearMonthList = yearMonthList
      },
      renderMonth: function (yearMonthStr) {
        let yearMonth = Calendar.getDateFromFormattedString(yearMonthStr, 'yyyy-MM')
        return Calendar.getDateArrayByMonth(yearMonth)
      },
      selectDateCalendar: function (options) {

        if (!this.orderinfo) {
          return
        }
        let date = options.date
        let price = options.price
        this.selectDateImprovement(date)

        this.setSessionOfTicket(date, price)

        this.$router.back()
      },
      setSessionOfTicket: function (date, price) {
        let dateStr = Calendar.dateFormat(date, 'yyyy-MM-dd')
        let orderinfo = this.orderinfo

        let ticketActive = this.orderinfo.ticketActive
        let ticketActiveId = ticketActive.id

        let ticketList = this.orderinfo.ticketList
        for (let i = 0; i < ticketList.length; i++) {
          let ticket = ticketList[i]

          if (ticket.id === ticketActiveId) {

            let hasOne = false
            let calendar = ticket.calendar
            for (let j = 0; j < calendar.length; j++) {
              let item = calendar[j]

              if (dateStr === item.date) {
                hasOne = true
                ticket.info.selectedIndex = j

                ticket.moreCalendar = null
              }

            }

            if (!hasOne) {

              ticket.moreCalendar = {
                date: dateStr,
                price: price
              }

              ticket.info.selectedIndex = 3

            }
            sessionStorage.setItem('orderinfo', JSON.stringify(this.orderinfo))

          }
        }

      },
      selectDateImprovement: function (date) {
        let dateOfYearMonth = Calendar.dateFormat(date, 'yyyy-MM')

        let yearMonthList = this.yearMonthList

        for (let i = 0; i < yearMonthList.length; i++) {

          let yearMonth = yearMonthList[i]

          if (yearMonth.title === dateOfYearMonth) {
            let selectedHasPrice = true
            this.travelMonth(yearMonth, date, function (day, isSelected) {
              if (!day.price && isSelected) {
                selectedHasPrice = false
              }
            })
            if (!selectedHasPrice) {
              return
            }

          }

        }

        for (let i = 0; i < yearMonthList.length; i++) {

          let yearMonth = yearMonthList[i]

          if (yearMonth.title === dateOfYearMonth) {

            this.travelMonth(yearMonth, date, function (day, isSelected) {
              day.selected = isSelected
            })

          } else {
            this.travelMonth(yearMonth, date, function (day) {
              day.selected = false
            })
          }

        }
      },
      travelMonth: function (yearMonth, date, cb) {

        let dateStr = Calendar.dateFormat(date, 'yyyy-MM-dd')

        let yearMonthData = yearMonth.data

        for (let j = 0; j < yearMonth.data.length; j++) {
          let row = yearMonthData[j]
          for (let k = 0; k < row.length; k++) {
            let col = row[k]
            let isSelected = false
            if (col.title === dateStr) {
              isSelected = true
            }
            cb(col, isSelected)
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/base";

  .week {

    max-width: 540px;
    min-width: 320px;

    background-color: #fff;
    width: 100%;
    line-height: 28px;
    color: #666;
    border-bottom: 1px solid #ddd;
    z-index: 1002;
    height: 28px;
    position: fixed;
    font-size: 12px;
    top: 45px;
    div {
      float: left;
      text-align: center;
      width: 14.2%;
    }
    .sun {
      color: #d30775;
    }
    .sat {
      color: #d30775;
    }
  }

  .board {
    margin-top: 74px;
  }

</style>
