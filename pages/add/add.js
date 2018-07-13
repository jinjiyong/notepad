// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: ''
  },
  onLoad: function (options) {
    var id = options.id;
    //  根据有无参数判断新增或编辑
    if (id){
      getData(id, this);
    }else{
      this.setData({
        id: new Date() 
      });
    }
  },
  /**
   * 输入监听
   */
  change(e){
    var val = e.detail.value;
    this.setData({
      content: val
    });
  },
  /**
   * 取消
   */
  cancel(){
    wx.navigateBack()
  },
  /**
   * 确定
   */
  sure(){
    var re = /^\s*$/g;
    if (this.data.content == ''){
      return;
    }
    this.setData({
      time: new Date()
    });
    setValue(this);
    wx.navigateBack()
  }
})

/**
 * 回显编辑数据
 */
function getData(id, page){
  var arr = wx.getStorageSync('txt');
  if(arr.length){
    arr.forEach((item) => {
      if(item.id == id){
        page.setData({
          id: item.id,
          content: item.content
        })
      }
    })
  }
}

/**
 * 保存内容
 */
function setValue(page){
  var arr = wx.getStorageSync('txt');
  var data = [], flag = true;
  if(arr.length){
    arr.forEach((item) => {
      if(item.id == page.data.id){
        item.time = new Date();
        item.content = page.data.content;
        flag = false;
      } 
      data.push(item);
    });
  }
  if (flag){
    data.push(page.data);
  }
  wx.setStorageSync('txt', data);
}