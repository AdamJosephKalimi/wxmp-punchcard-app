// pages/card-view/card-view.js
var app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fakeData: {
      "id": 3,
      "merchant": 1,
      "user": 1,
      "logo": "https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1530352443&di=7467f86f3c4bb968556783fe622256dd&src=http://img.sj33.cn/uploads/allimg/201401/7-1401231U30J57.jpg",
      "name": "Statbucks",
      "expirationDate": "2018-06-12",
      "reward": "one free coffee",
      "maxPunches": 8,
      "currentPunches": 4,
      "location": "naked hub, Shanghai",
      "finePrint": "only valid if you know the password"
    }
  },


  scan_qr: function () {
    var that = this;
    var merchant_id;
    wx.scanCode({
      success: (res) => {
        console.log(res)
        this.merchant_id = res.result;
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
          url: `/pages/card-view/card-view?id=${merchant_id}`,
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