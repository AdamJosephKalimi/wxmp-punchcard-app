const TinyDB = require('../../lib/tinyDB.js');
const pageData = TinyDB.getPunchcardByID(4);
var app = getApp(); 

// pages/card-view/card-view.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fakeData: pageData,
    isComplete: false
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
  
  view_reward: function(e){
    wx.navigateTo({
      url: '/pages/reward/reward',
    })
  },

  //* Navabar Function*//

  goWallet: function (e) {
    wx.reLaunch({
      url: '/pages/wallet/wallet'
    })
  },
  goList: function (e) {
    wx.reLaunch({
      url: '/pages/card-list/card-list'
    })
  },
  

  //* Navabar Function*//

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id) { // QR code scanned
      var scannedMerchantID = options.id;
      var userID = app.globalData.appUser.id
      var results = TinyDB.getPunchCardsForUserAndMerchant(userID, scannedMerchantID)
      if(results == undefined) { //  if no punchard, creat one
        var newPunchCard = TinyDB.makeNewPunchCard(
          {
            "id": 6,
            "merchant": 1,
            "user": 1,
            "logo": "http://www.farmhousejuice.cn/wp-content/uploads/2015/10/pumpkin-corner-314x600.jpg",
            "name": "buyonegetonefree",
            "expirationDate": "2018-06-12",
            "reward": "one free coffee",
            "maxPunches": 8,
            "currentPunches": 4,
            "finePrint": "only valid if you know the password"
          }          
        )
        this.setData({fakeData: newPunchCard})
      } else { // if has punchard, increment
        TinyDB.incrementPunchCard(results.id); 
        this.setData({ fakeData: TinyDB.getPunchcardByID(results.id) })
        if (TinyDB.getPunchcardByID(results.id).currentPunches ===
          TinyDB.getPunchcardByID(results.id).maxPunches) {
            this.setData({isComplete: true});
          }
      }
    }

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