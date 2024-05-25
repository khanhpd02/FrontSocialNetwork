import moment from "moment"
//import { number } from "react-i18next/icu.macro"

const getTime = {
  currDate: function () {
    return moment(new Date()).format("YYYY-MM-DD")
  },
  currTime: function () {
    return moment(new Date()).format("HH:mm:ss")
  },
  currUnix: function () {
    const strDate = new Date()

    return Math.floor(strDate.getTime() / 1000)
  },

  current: function () {
    return moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
  },
  currentM: function () {
    return moment(new Date()).format("YYYY-MM-DD HH:mm")
  },
  date: function (date: string) {
    return moment(date).format("YYYY-MM-DD")
  },
  time: function (date: string) {
    return moment(date).format("HH:mm:ss")
  },
  Unix2String: function (value: number) {
    return moment.unix(value).format("YYYY-MM-DD HH:mm:ss")
  },
  Unix2StringFormat: function (value: number) {
    return moment.unix(value).format("HH:mm:ss DD/MM/YYYY")
  },
  Unix2StringFormatYYYY: function (value: number) {
    if (!value) return "-"
    return moment.unix(value).format("HH:mm:ss DD/MM")
  },
  Unix2StringT: function (value: number) {
    return moment.unix(value).format("HH:mm:ss")
  },
  String2Unit: function (value: number) {
    const date = new Date(value)
    return Math.floor(date.getTime() / 1000)
  },
  startDateUnix: function () {
    const strDate = new Date(`${this.currDate()} 00:00:00`)

    return Math.floor(strDate.getTime() / 1000)
  },
  endDateUnix: function () {
    const strDate = new Date(`${this.currDate()} 23:59:59`)

    return Math.floor(strDate.getTime() / 1000)
  },
  caculateTime: function (totalseconds: number) {
    const day = 86400
    const hour = 3600
    const minute = 60

    const daysout = Math.floor(totalseconds / day)
    const hoursout = Math.floor((totalseconds - daysout * day) / hour)
    const minutesout = Math.floor(
      (totalseconds - daysout * day - hoursout * hour) / minute,
    )
    const secondsout =
      totalseconds - daysout * day - hoursout * hour - minutesout * minute

    const dayString = daysout ? `${daysout} ngày` : ""
    const hourString = hoursout ? `${hoursout} giờ` : ""
    const minuteString = minutesout ? `${minutesout} phút` : ""
    const secondString = secondsout ? `${secondsout} giây` : ""

    return `${dayString} ${hourString} ${minuteString} ${secondString}`
  },

  caculateTimeFM: function (totalseconds: number) {
    const day = 86400
    const hour = 3600
    const minute = 60

    const daysout = Math.floor(totalseconds / day)
    const hoursout = Math.floor((totalseconds - daysout * day) / hour)
    const minutesout = Math.floor(
      (totalseconds - daysout * day - hoursout * hour) / minute,
    )
    const secondsout =
      totalseconds - daysout * day - hoursout * hour - minutesout * minute

    const dayString = daysout ? `${daysout}:` : ""
    const hourString = hoursout ? `${hoursout}` : ""
    const minuteString = minutesout ? `${minutesout}` : ""
    const secondString = secondsout

    return `${dayString}${hourString}${
      Number(minuteString || 0) < 10 ? `0${minuteString}` : minuteString
    }:${Number(secondString) < 10 ? `0${secondString}` : secondString}`
  },
}

export default getTime
