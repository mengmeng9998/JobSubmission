module.exports = {
 bar: {
  colors:['#79bacd','#3a3a4f'],
  chart: {
    type: 'column'
  },
  credits:{
    enabled:false 
  },
  title: {
    text: '高一(3)班作业提交情况统计表'
  },
  xAxis: {
    categories: [
      '周一','周二','周三','周四','周五'
    ],
    crosshair: true
  },
  yAxis: {
    min: 0,
    title: {
      text: '作业完成情况 (人数)'
    }
  },
  series: [{
    name: '作业提交人数',
    data: [49.9, 71.5, 106.4, 129.2, 144.04]
  }, {
    name: '作业未提交',
    data: [83.6, 78.8, 98.5, 93.4, 106]
  }]
 }
}