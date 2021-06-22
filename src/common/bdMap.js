import Vue from 'vue'
/* 百度地图公共JS文件 */

/* 定义通过键值对对象 */
const defaultPoints = {
  el: 'allmap', // 地图容器
  lat: 32.637563, // 中心坐标经纬度
  lng: 117.026724,
  tier: 16, // 地图缩放层级
  icon: require('/src/assets/point-default.png'), // 标注物图标
  width: 30, // 标注物宽度
  height: 36, // 标注物高度
  enClear: true, // 是否在调用map.clearOverlays清除此覆盖物
  zoom: true, // 是否开启滚轮缩放
  isStyle: true, // 是否开启自定义地图样式
  style: require('@/assets/map-json/base_map_config.json') // 自定义地图样式文件

}

const initBPGL = (Options) => {
  /* 初始化参数*/
  const opt = defaultPoints

  if (Options.el) { opt.el = Options.el }

  // 标注物坐标经纬度
  if (Options.lat && Options.lng) {
    opt.lat = Options.lat
    opt.lng = Options.lng
  }
  if (Options.tier) { opt.tier = Options.tier }

  if (Options.zoom) { opt.style = Options.zoom }

  if (Options.isStyle) { opt.isStyle = Options.isStyle }

  if (Options.style) { opt.style = Options.style }

  const map = new BMapGL.Map(opt.el)
  var points = new BMapGL.Point(opt.lng, opt.lat)
  map.centerAndZoom(points, opt.tier) // 创建中心点坐标及地图层级
  map.enableScrollWheelZoom(opt.zoom)
  if (opt.isStyle) {
    map.setMapStyleV2({ // 加载自定义地图样式
      styleJson: opt.style
    })
  }

  return map
}

/** 在百度地图上添加标注物
 * @param {object}          map         百度地图的实例化对象
 * @param {Object}          Options     参数对象
 *   opt:lat                标注点坐标经度
 *   opt:lng                标注点坐标纬度
 *   opt:widht              标注点图标宽度
 *   opt:height             标注点图标高度
 *   opt:icon               标注点图标地址
 *   opt:enClear            标注点图标是否在调用map.clearOverlays清除此覆盖物
 * @return {object}         返回标注点的overlay对象
 **/
const markerPoint = (map, Options) => {
  /* 初始化参数*/
  const opt = defaultPoints

  // 标注物坐标经纬度
  if (Options.lat && Options.lng) {
    opt.lat = Options.lat
    opt.lng = Options.lng
  }
  // 标注物宽高
  if (Options.width && Options.height) {
    opt.widht = Options.width
    opt.height = Options.height
  }
  // 标注物图标
  if (Options.icon) {
    opt.icon = Options.icon
  }
  // 是否在调用map.clearOverlays清除此覆盖物
  if (typeof (Options.enClear) !== 'undefined' && Options.enClear == false) {
    opt.enClear = false
  } else {
    opt.enClear = true
  }

  /* 进行地图标注*/
  var pointIcon = new BMapGL.Icon(opt.icon, new BMapGL.Size(opt.width, opt.height))
  var markers = new BMapGL.Marker(new BMapGL.Point(opt.lng, opt.lat), {
    icon: pointIcon,
    enableMassClear: opt.enClear
  })
  map.addOverlay(markers)

  return markers
}

/** 在百度地图上绘制多边形
 * @param {object}          map         百度地图的实例化对象
 * @param {array}           points      多边形经纬度坐标点位，示例：[{lat: 32.6303571772588, lng: 116.99851670051117}]
 * @param {string/number}   typeColor   多边形边线颜色，1 =》'#409EFF'，2 =》'#F56C6C'，或传字符串：色值代码，默认值：1
 * @param {boolen}          enClear     是否在调用clearOverlays清除此覆盖物，默认值：false
 * 当边线颜色传参有误时，返回错误提示
 * @return {object}   返回多边形overlay对象
 **/
const markerPolygon = (map, points, typeColor = 1, enClear = false) => {
  const objArr = []
  points.forEach((item, index) => {
    objArr.push(new BMapGL.Point(item.lng, item.lat))
  })

  let colors = '#409EFF'
  if (typeColor == 1) {
    colors = '#409EFF'
  } else if (typeColor == 2) {
    colors = '#F56C6C'
  } else if (typeof typeColor === 'string' && typeColor.substring(0, 1) == '#') {
    colors = typeColor
  } else {
    return { code: 201, msg: '边线颜色参数有误' }
  }
  var polygon = new BMapGL.Polygon(objArr, {
    strokeColor: colors, // 边线颜色
    strokeWeight: 2, // 边线的宽度
    strokeOpacity: 0.5, // 边线透明度
    fillColor: colors, // 填充颜色
    fillOpacity: 0.7, // 填充透明度
    enableMassClear: enClear // 是否在调用clearOverlays清除此覆盖物，默认为true
  })
  map.addOverlay(polygon)

  return polygon
}

/** 在百度地图上绘制线型
 * @param {object}     map         百度地图的实例化对象
 * @param {array}      points      线形经纬度坐标点位，示例：[{lat: 32.6303571772588, lng: 116.99851670051117}]
 * @param {string}     bgColor     线条背景颜色代码
 * @param {string}     beColor     线条前景颜色代码
 * @return {array}     返回线形overlay对象数组
 **/
const markerPolyline = (map, points, bgColor = '#fff', beColor = '#67C23A') => {
  var objArr = []
  points.forEach((item, index) => {
    objArr.push(new BMapGL.Point(item.lng, item.lat))
  })
  var polylineBg = new BMapGL.Polyline(objArr, { strokeColor: bgColor, strokeWeight: 8, strokeOpacity: 0.8 })
  var polyline = new BMapGL.Polyline(objArr, { strokeColor: beColor, strokeWeight: 4, strokeOpacity: 0.8 })
  map.addOverlay(polylineBg)
  map.addOverlay(polyline)

  return [polylineBg, polyline]
}

export default function(Vue) {
  // 添加全局API
  Vue.prototype.$bdMap = {
    initBPGL,
    markerPoint,
    markerPolygon,
    markerPolyline
  }
}
