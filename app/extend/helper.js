'use strict'
const crypto = require('crypto')

module.exports = {
  getChinatraceMac: ({signString = null, secretKey = null})=> {
    var session_key = new Buffer(secretKey, 'base64')
    const hmac = crypto.createHmac('sha256', session_key)
    hmac.update("/api/getProductData?productCode=" + signString, 'utf8')
    return hmac.digest('hex')
  },
  getHmacSha256: ({signString = null, secretKey = null})=> {
    const hmac = crypto.createHmac('sha256', secretKey)
    hmac.update(signString, 'utf8')
    return hmac.digest('hex')
  },
  getMD5: ({signString = null})=> {
    const hash = crypto.createHash('md5')
    hash.update(signString, 'utf8')
    return hash.digest('hex')
  },
  success: ({ ctx, res = null,code = 0, msg = 'success'})=> {
    ctx.body = {
      code,
      data: res,
      msg
    }
    ctx.status = 200
  },
  error: ({ ctx, err = null,code = 0, msg = 'error'})=> {
    ctx.body = {
      code,
      data: err,
      msg
    }
    ctx.status = 500
  },
  toTree: (data) => {
    for(const v of data){
      delete v.children
    }
    let map = {}
    for(const v of data){
      map[v.id] = v
    }
    let val = []
    for(const v of data){
      let parent = map[v.parent_id]
      if (parent) {
        (parent.children || ( parent.children = [] )).push(v)
      } else {
        val.push(v)
      }
    }
    return val
  },
  getTime: ()=> {
    const dt = new Date()
    const year = dt.getFullYear()
    let month = dt.getMonth() + 1
    let day = dt.getDate()
    let hour = dt.getHours()
    let minutes = dt.getMinutes()
    let seconds = dt.getSeconds()
    let milliseconds = dt.getMilliseconds()
    if (month < 10) { month = '0' + month }
    if (day < 10) { day = '0' + day }
    if (hour < 10) { hour = '0' + hour }
    if (minutes < 10) { minutes = '0' + minutes }
    if (seconds < 10) { seconds = '0' + seconds }
    if (milliseconds < 10) { milliseconds = '00' + milliseconds } 
    else if (9 < milliseconds &&  milliseconds < 99) { 
      milliseconds = '0' + milliseconds
    }
    return year + '' + month + '' + day + '' + hour + '' + minutes + '' + seconds + '' + milliseconds
  },
  getDay: ()=> {
    const dt = new Date()
    const year = dt.getFullYear()
    let month = dt.getMonth() + 1
    let day = dt.getDate()
    if (month < 10) { month = '0' + month }
    if (day < 10) { day = '0' + day }
    return year + '' + month + '' + day + ''
  }
}