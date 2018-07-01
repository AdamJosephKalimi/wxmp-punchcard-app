//index.js
//获取应用实例

const app = getApp();
const TinyDB = require('../../lib/tinyDB.js');
const SQR = require('../../lib/scanQR.js');
const user = app.globalData.appUser;
const loadPunchCardData = TinyDB.getPunchcardByID();

Page({
  data: {
    user: user,
    punchCardsArray: loadPunchCardData
  },

  onClick: function (tap) {
    var targetPunchCardID = tap.target.dataset.prop
    wx.navigateTo({
      url: '/pages/card-view/card-view?punchCardID=' + targetPunchCardID
    })
  },

  // //事件处理函数
  // bindViewTap: function () {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // onLoad: function () {
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse) {
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  // getUserInfo: function (e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },

  // scan QR
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
  }

})
