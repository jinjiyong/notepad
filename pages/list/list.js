var formatTime = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  onShow(){
    initData(this);
  },
  /**
   * 新增内容
   */
  add(){
    wx.navigateTo({
      url: '../add/add',
    })
  },
  /**
   * 编辑内容
   */
  edit(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../add/add?id=' + id,
    })
  }
  
})

/**
 * 数据初始化
 */
function initData(page){
  var arr = wx.getStorageSync('txt');
  if (arr.length){
    arr.forEach((item, i) => {
      var time = new Date(item.time);
      item.time = formatTime.formatTime(time);
    })
    page.setData({
      list: arr
    })
  }
}