import Vue from 'vue'
/* 公共JS文件 */

/* 定义通过键值对对象 */
// 任务运输类型
const tranType = { external: '场外运输', internal: '场内倒运' }
// 任务运输状态
const tranStatus = { wait: '未开始', runing: '进行中', over: '已结束' }
// 审批状态
const approvalStatus = { edit: '编辑中', approving: '审批中', rejected: '驳回', agree: '同意' }
// 报警类型
const alarmType = { speed: '超速报警', offset: '偏离报警', entrance: '非法进入', gather: '非法聚集' }
// 车辆状态
const carStatus = { wait: '待审核', normal: '正常', forbid: '禁运', remove: '移除' }
// 车辆状态
const gpsStatus = { normal: '正常', park: '停车', offline: '离线', abnormal: '异常' }

/** 以字符串形式返回图片ID
  * @param {array} list
  * */
const strImgId = (list) => {
  var temp_str = ''
  list.forEach(item => {
    temp_str = temp_str + item.uid + ','
  })
  return temp_str.slice(0, -1)
}

/** 通过列名为键，查找对应值并返回
 * 需先定义与键名相同的健值对对象
 * 实现是通过表格属性的 formatter ：内容格式化
 * @param {object}  row         行数据信息:formatter固有变量参数
 * @param {object}  column      列数据信息:formatter固有变量参数
 * @param {string}  cellValue   对应数据的字段值:formatter固有变量参数
 * @param {int}     index       行索引:formatter固有变量参数
 * @param {string}  customCol   字段名，当表格返回数据的列名与JS文件中既定的变量名不一致时，可通过传递customCol变量来定义对应JS文件中的变量名,非必传，默认值为：null
 **/
const getTableText = (row, column, cellValue, index, customCol = null) => {
  const _this = typeof (customCol) === 'undefined' || customCol == '' || customCol == null ? eval(column.property) : eval(customCol)
  // let _this = eval(column.property);
  return _this[cellValue]
}


/** 通过列名为键，查找对应值并返回
 * @param {string}  column      数据对象名称
 * @param {string}  cellValue   字段名
 **/
const getTextVal = (column, cellValue) => {
  const _this = eval(column)
  return _this[cellValue]
}

/** 通过日期时间对象，返回日期、时间、日期时间格式的字符串
 * @param {object}  obj      标准时间日期对象
 * @param {string}  type     返回类型：date=>日期（默认：空）；time=>时间 ；dateTime=>日期时间
 **/
const getDateString = (obj, type) => {
  const dateStr = obj.getFullYear() + '-' + (obj.getMonth() + 1) + '-' + obj.getDate()
  const timeStr = obj.getHours() + ':' + (obj.getMinutes()) + ':' + obj.getSeconds()
  if (type === 'time') {
    return timeStr
  } else if (type === 'date') {
    return dateStr
  } else {
    return dateStr + ' ' + timeStr
  }
}

/* 深度拷贝，将新数据与原数据完全隔离 */
const deepClone = (obj) => { //
  const newObj = new obj.constructor()
  if (obj === null) return obj
  if (typeof obj === 'function') return new Function('return ' + obj.toString())()
  if (typeof obj !== 'object') return obj
  if (obj instanceof RegExp) return new RegExp(obj)
  if (obj instanceof Date) return new Date(obj)
  // 运行到这里，基本上只存在数组和对象两种类型了
  for (const index in obj) {
    newObj[index] = deepClone(obj[index]) // 对子项进行递归复制
  }
  return newObj
}

export default function(Vue) {
  // 添加全局API
  Vue.prototype.$selfJs = {
    tranType,
    tranStatus,
    approvalStatus,
    strImgId,
    getTableText,
    getTextVal,
    getDateString,
    deepClone
  }
}
