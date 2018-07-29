// pages/wallet/wallet.js
const TinyDB = require('../../lib/tinyDB.js');
const SQR = require('../../lib/scanQR.js');
const app = getApp();
const user = app.globalData.appUser;
const loadPunchcards = TinyDB.getPunchcardsForUser(user.id);


Page({

   // 页面的初始数据
  data: {
    id: user.id,
    name: user.name,
    punchCards: loadPunchcards
  },

  scan_qr: SQR,

  // Navabar Function
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

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    const reLoadPunchcards = TinyDB.getPunchcardsForUser(user.id);
    this.setData({ punchCards: reLoadPunchcards})
  },

  // Navigate to card detail page 
  onClickCard: function (tap) {
    var targetPunchCardID = tap.target.dataset.prop
    wx.navigateTo({
      url: '/pages/card-view/card-view?punchCardID=' + targetPunchCardID
    })
  },

  // 生命周期函数--监听页面初次渲染完成
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