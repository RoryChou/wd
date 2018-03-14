class Calendar {

  static getDateArrayByMonth (date) {
    let weekOffset = 0
    let dayOffset = 0

    let dateArray = []
    let year = date.getFullYear()
    let month = date.getMonth()
    let firstDate = new Date(year, month, 1)
    let firstDateDay = firstDate.getDay()
    let index = -firstDateDay + weekOffset
    index = index > 0 ? index - 7 : index
    index += dayOffset

    let row
    let col

    for (row = 0; row < 6; row++) {
      dateArray[row] = []
      for (col = 0; col < 7; col++) {
        index++
        dateArray[row][col] = new Date(firstDate.getFullYear(), firstDate.getMonth(), index)
      }
    }

    return dateArray
  }
}

let DATE_FORMATS_SPLIT = /((?:[^yMdHhmsaZE']+)|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/
let DATE_FORMATS = {
  yyyy: ['FullYear', 4],
  yy: ['FullYear', 2, 0],
  MM: ['Month', 2, 1],
  M: ['Month', 1, 1],
  dd: ['Date', 2],
  d: ['Date', 1],
  HH: ['Hours', 2],
  H: ['Hours', 1],
  hh: ['Hours', 2, -12],
  h: ['Hours', 1, -12],
  mm: ['Minutes', 2],
  m: ['Minutes', 1],
  ss: ['Seconds', 2],
  s: ['Seconds', 1],
  E: ['Day', 1]
}

//获取北京时间1970年1月1日 00:00:00.0000
function getEpochOfCST () {
  let epoch = new Date(1970, 0, 1)
  return epoch
}

function padNumber (num, digits, trim) {
  let neg = ''
  if (num < 0) {
    neg = '-'
    num = -num
  }
  num = '' + num
  while (num.length < digits) {
    num = '0' + num
  }
  if (trim) {
    num = num.substr(num.length - digits)
  }
  return neg + num
}

function dateGetter (name, size, offset, trim) {
  return function (date) {
    let value = date['get' + name]()
    if (offset > 0 || value > -offset) {
      value += offset
    }
    if (value === 0 && offset === -12) {
      value = 12
    }
    return padNumber(value, size, trim)
  }
}

function dateSetter (name, size, offset, trim) {
  return function (date, value) {

    if (offset > 0 || value > -offset) {
      value -= offset
    }
    if (value === 0 && offset === -12) {
      value = 12
    }

    date['set' + name](value)
  }
}

/**
 * 日期格式化
 * https://github.com/RubyLouvre/mass-Framework/blob/1.41/avalon.js#L2147
 * E    星期
 * yyyy-MM-dd hh-mm-ss
 * yyyy 四位年      yy 两位年
 * MM   两位月      M  月
 * dd   两位日      d  日
 * HH   两位时(24)  H  时(24)
 * hh   两位时(12)  h  时(12)
 * mm   两位分      m  分
 * ss   两位秒      s  秒
 * @param date
 * @param format 日期格式
 * @returns {string}
 */
Calendar.dateFormat = function (date, format) {
  let text = ''
  let match
  let parts = []
  let fn
  while (format) {
    match = DATE_FORMATS_SPLIT.exec(format)
    if (match) {
      parts = parts.concat(match.slice(1))
      format = parts.pop()
    } else {
      parts.push(format)
      format = null
    }
  }
  parts.forEach(function (value) {
    let dateGetterParameter = DATE_FORMATS[value]
    if (dateGetterParameter) {
      text += dateGetter.apply(this, dateGetterParameter)(date)
    } else {
      text += value
    }
  })
  return text
}

/**
 * 从格式化字符串获取日期时间
 * @param str 已经被格式化的字符串
 * @param format 格式
 * @returns {Date} 日期对象
 */
Calendar.getDateFromFormattedString = function (str, format) {
  let date = getEpochOfCST()

  let match
  let parts = []
  let strParts = []
  let fn
  while (format) {
    match = DATE_FORMATS_SPLIT.exec(format)
    if (match) {
      parts = parts.concat(match.slice(1))
      format = parts.pop()
      let matchSize = (match[1].length)
      let leftStr = str.substr(0, matchSize)
      str = str.substr(matchSize)
      strParts.push(leftStr)
    } else {
      parts.push(format)
      strParts.push(str)
    }
  }
  for (let i = 0; i < parts.length; i++) {
    let part = parts[i]
    let strPart = strParts[i]
    if (strPart === '') {
      break
    }
    let number = parseInt(strPart, 10)
    let dateSetterParameter = DATE_FORMATS[part]
    if (dateSetterParameter) {
      fn = dateSetter.apply(this, dateSetterParameter)
      if (!isNaN(number)) {
        fn(date, number)
      }
    }
  }
  if (+date === +getEpochOfCST()) {
    date = new Date()
    date.isInvalidDate = true
  }
  return date
}

/**
 * 是否是同一月
 * @param dateA
 * @param dateB
 * @returns {boolean}
 */
Calendar.isSameMonth = function (dateA, dateB) {
  if (dateA.getFullYear() !== dateB.getFullYear()) {
    return false
  }
  return dateA.getMonth() === dateB.getMonth()
}

export default Calendar
