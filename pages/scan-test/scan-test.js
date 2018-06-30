// pages/scan-test/scan-test.js
var app = getApp()
Page({
  data: {
    show: "",
  },

  onLoad: function () {
    console.log('onLoad')
  },
  click: function () {
    var that = this;
    var show;
    wx.scanCode({
      success: (res) => {
        console.log(res)
        this.show = res.result;
        that.setData({
          show: this.show
        })
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '失败',
          icon: 'success',
          duration: 2000
        })
      },
      complete: (res) => {
      }
    })
  }
})