// pages/card-view/card-view.js
const TinyDB = require('../../lib/tinyDB.js');
const SQR = require('../../lib/scanQR.js');
const app = getApp(); 
const user = app.globalData.appUser;
const loadPunchCardData = TinyDB.getPunchcardByID(4);


Page({

  /**
   * 页面的初始数据
   */
  data: {
    punchCardData: loadPunchCardData,
    isComplete: false
  },

  // Scan QR
  scan_qr: SQR,
  
  view_reward: function(e){
    wx.navigateTo({
      url: '/pages/reward/reward',
    })
  },
  
  // use reward
  use_reward: function (e) {

    wx.showModal({
      // title: 'Please Confirm',
      content: 'Do you wanna use your reward now?',
      confirmText: "confirm",
      cancelText: "cancle",
      success: function (res) {
        TinyDB.resetPunchCard(4);
        wx.navigateTo({
          url: '/pages/card-view/card-view',
        })
      }
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
    // If clickthrough from another page, load that id
    if (options.punchCardID){
      let pcId = options.punchCardID;
      var reloadPunchCard = TinyDB.getPunchcardByID(parseInt(pcId));
      this.setData({ punchCardData: reloadPunchCard }) 
     }


    // If QR code scanned, logic
    if(options.id) { 
      var scannedMerchantID = options.id;
      var userID = app.globalData.appUser.id
      var results = TinyDB.getPunchCardsForUserAndMerchant(userID, scannedMerchantID)
      if(results == undefined) { //  if no punchcard, create one
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
        this.setData({punchCardData: newPunchCard});
      } 
      else { // if has punchcard, increment
        TinyDB.incrementPunchCard(results.id); 

        if (TinyDB.getPunchcardByID(results.id).currentPunches ===
          TinyDB.getPunchcardByID(results.id).maxPunches) {
            this.setData({ punchCardData: TinyDB.getPunchcardByID(results.id) })
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