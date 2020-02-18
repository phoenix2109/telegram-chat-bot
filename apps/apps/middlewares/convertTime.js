const moment = require('moment')
const momentDurationFormatSetup = require('moment-duration-format')
momentDurationFormatSetup(moment)

global.diffTime = (time1, time2) => {
  const timeConvert1 = convertTime(time1)
  const timeConvert2 = convertTime(time2)
  // console.log(timeConvert1, timeConvert2);
  const timeDifference = moment(timeConvert2, 'DD/MM/YYYY HH:mm').diff(moment(timeConvert1, 'DD/MM/YYYY HH:mm'))
  const formatM = moment.duration(timeDifference).format('mm', { trim: false, useGrouping: false })
  const formatH = moment.duration(timeDifference).format('HH', { trim: false, useGrouping: false })
  if (formatM < 60) {
    return moment.duration(timeDifference).format('mm[m]', { trim: false, useGrouping: false })
  } else if (formatM > 60 && formatH < 24) {
    return moment.duration(timeDifference).format('HH[h] mm[m]', { trim: false, useGrouping: false })
  }
  return moment.duration(timeDifference).format('DD[d] HH[h] mm[m]', { trim: false, useGrouping: false })
}

global.convertTime = time => moment(time).utcOffset(0, true).format('DD/MM/YYYY HH:mm')
