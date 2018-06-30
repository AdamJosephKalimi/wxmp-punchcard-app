const TinyDB = require('../../lib/tinyDB.js');
const pageData = TinyDB.getPunchcardByID(4);

// pages/card-view/card-view.js
var app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fakeData: pageData
  },


  scan_qr: function () {
    var that = this;
    var merchant_id;
    wx.scanCode({
      success: (res) => {
        console.log(res)
        this.merchant_id = res.result.split("=")[1];
        that.setData({
          merchant_id: this.merchant_id
        })
        console.log("merchant_id", that.data.merchant_id)
        wx.showToast({
          title: 'success',
          icon: 'success',
          duration: 2000
        })
        wx.navigateTo({
          url: `/pages/card-view/card-view?id=${that.data.merchant_id}`,
        })
      },
      complete: (res) => {
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("card-view-onload", options)
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})