<template>
  <section class="month">
    <p>{{title}}</p>
    <div class="grid">
      <template class="weekend" v-for="row in month">
        <span
          v-for="col in row"
          v-bind:class="{weekend: col.isWeekend, usable: col.price, selected: col.selected}"
          v-on:click="selectDate($event, col.date, col.price)">
          <template v-if="col.isThisMonth">
          {{col.date.getDate()}}
          <i class="price">
            {{col.price}}
          </i>
          </template>
        </span>
      </template>
    </div>
  </section>
</template>

<script>
  import Calendar from '../../util/calendar'

  export default {
    name: 'ticket-calendar-month',
    props: [
      'title',
      'month'
    ],
    methods: {
      selectDate: function (e, date, price) {
        if (!price) {
          return
        }
        this.$emit('selectDateCalendar', {
          date: date,
          price: price
        })
      }
    }
  }
</script>

<style lang="less" scoped>

  .grid {
    overflow: hidden;
    span {
      color: #aaa;
      line-height: 15px;
      padding-top: 10px;
      height: 40px;
      float: left;
      text-align: center;
      width: 14.2%;
      font-size: 14px;
      i {
        margin-top: 3px;
        display: block;
        font-size: 12px;
        color: #666;
      }
    }
    .usable {
      color: #000;
      &.weekend {
        color: #d30775;
      }
    }
    .selected {
      border-radius: 5px;
      color: #fff;
      &.weekend {
        color: #fff;
      }
      background-color: #d30775;
      i {
        color: #fff;
      }
    }
  }

  .price {

  }

  .month {
    text-align: center;
    border-bottom: 1px solid #ddd;
    padding: 0 3px 10px 3px;
    overflow: hidden;

    p {
      font-size: 14px;
      line-height: 15px;
      padding: 15px;
    }
  }

</style>
