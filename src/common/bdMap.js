import Vue from 'vue'
/* 百度地图公共JS文件 */

/* 定义通过键值对对象 */




/** 在百度地图上绘制多边形
 * @param {object}          map         百度地图的实例化对象
 * @param {array}           points      多边形经纬度坐标点位，示例：[{lat: 32.6303571772588, lng: 116.99851670051117}]
 * @param {string/number}   typeColor   多边形边线颜色，1 =》'#409EFF'，2 =》'#F56C6C'，或传字符串：色值代码，默认值：1
 * @param {boolen}          enClear     是否在调用clearOverlays清除此覆盖物，默认值：false
 * 当边线颜色传参有误时，返回错误提示
 * @return {object}   返回多边形overlay对象
 **/
const drawPolygon = (map, points, typeColor = 1, enClear = false) => {
  let objArr = [];
  points.forEach((item, index) => {
    objArr.push(new BMapGL.Point(item.lng, item.lat))
  })

  let colors = '#409EFF';
  if (typeColor == 1){
    colors = '#409EFF'
  } else if(typeColor == 2){
    colors = '#F56C6C'
  } else if(typeof typeColor === 'string' && typeColor.substring(0, 1) == "#") {
    colors = typeColor
  } else {
    return {code: 201, msg: '边线颜色参数有误'}
  }
  var polygon = new BMapGL.Polygon(objArr, {
      strokeColor: colors,          // 边线颜色
      strokeWeight: 2,              // 边线的宽度
      strokeOpacity: 0.5,           // 边线透明度
      fillColor: colors,            // 填充颜色
      fillOpacity: 0.7,             // 填充透明度
      enableMassClear: enClear,     //是否在调用clearOverlays清除此覆盖物，默认为true
  });
  map.addOverlay(polygon);

  return polygon
}

/** 在百度地图上绘制线型
 * @param {object}     map         百度地图的实例化对象
 * @param {array}      points      线形经纬度坐标点位，示例：[{lat: 32.6303571772588, lng: 116.99851670051117}]
 * @param {string}     bgColor     线条背景颜色代码
 * @param {string}     beColor     线条前景颜色代码
 * @return {array}     返回线形overlay对象数组
 **/
const drawPolyline = (map, points, bgColor = '#fff', beColor = '#67C23A') => {
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
    drawPolygon,
    drawPolyline,
  }
}
