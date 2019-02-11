/**
 * 公用方法
 */

 export function distinct(array) {
  return Array.from(new Set(array))
 } 

 export function getNowFormatDate() {
  let date = new Date();
  let seperator1 = "-";
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  let currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}

export function formatDateTime() {    
  var date = new Date();  
  var y = date.getFullYear();    
  var m = date.getMonth() + 1;    
  m = m < 10 ? ('0' + m) : m;    
  var d = date.getDate();    
  d = d < 10 ? ('0' + d) : d;    
  var h = date.getHours();  
  h = h < 10 ? ('0' + h) : h;  
  var minute = date.getMinutes();  
  var second = date.getSeconds();  
  minute = minute < 10 ? ('0' + minute) : minute;    
  second = second < 10 ? ('0' + second) : second;   
  return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;    
}

export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if (('' + time).length === 10) time = parseInt(time) * 1000
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return time_str
  }
  