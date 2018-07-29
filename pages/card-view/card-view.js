// pages/card-view/card-view.js
const TinyDB = require('../../lib/tinyDB.js');
const SQR = require('../../lib/scanQR.js');
const app = getApp(); 
const user = app.globalData.appUser;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    punchCardData: {},
    isComplete: false
  },

  // Scan QR
  scan_qr: SQR,
  
  
  // use reward
  use_reward: function (e) {

    wx.showModal({
      // title: 'Please Confirm',
      content: 'Do you wanna use your reward now?',
      confirmText: "confirm",
      cancelText: "cancle",
      success: function (res) {
        // debugger
        TinyDB.resetPunchCard(4);
        console.log(res)
        wx.navigateTo({
          url: '/pages/card-view/card-view?resetPunchCardID=4',
        })
      }
    })
  },

  //* Navabar Function*//

  goWallet: function (e) {
    wx.navigateTo({
      url: '/pages/wallet/wallet'
    })
  },
  goList: function (e) {
    wx.navigateTo({
      url: '/pages/card-list/card-list'
    })
  },
  

  //* Navabar Function*//

  /**
   * 生命周期函数--监听页面加载
   */


  onLoad: function (options) { 
    // debugger 

    if (options.resetPunchCardID) {
      let pcId = options.resetPunchCardID;
      var reloadPunchCard = TinyDB.getPunchcardByID(parseInt(pcId));
      this.setData({ punchCardData: reloadPunchCard })
    }

    // If clickthrough from another page, load that id
    if (options.punchCardID){
      let pcId = options.punchCardID;
      if (TinyDB.getPunchcardByID(parseInt(pcId)).currentPunches ===
        TinyDB.getPunchcardByID(parseInt(pcId)).maxPunches) {      
          this.setData({ isComplete: true });
        }
      var reloadPunchCard = TinyDB.getPunchcardByID(parseInt(pcId));
      this.setData({ punchCardData: reloadPunchCard })         
      }

    // If QR code scanned, logic
    if(options.id) { 
      var scannedMerchantID = options.id;
      var userID = app.globalData.appUser.id
      var results = TinyDB.getPunchCardsForUserAndMerchant(userID, scannedMerchantID)
      if(results == undefined) { //  if no punchcard, create one
        var newPunchCard = TinyDB.makeNewPunchCard()
        this.setData({punchCardData: newPunchCard});
      } 
      else { // if has punchcard, increment
        TinyDB.incrementPunchCard(results.id);
        this.setData({ punchCardData: TinyDB.getPunchcardByID(results.id) })
      }
    }
  },
  //add card to wallet
  add_card: function () {
    console.log("hi, add a card")

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