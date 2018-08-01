// pages/card-view/card-view.js
const TinyDB = require('../../lib/tinyDB.js');
let Markers = require('../../utils/markers');
const SQR = require('../../lib/scanQR.js');
const app = getApp(); 
const user = app.globalData.appUser;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    punchCardData: {},
    isComplete: false,
    markers: Markers,
    latitude: wx.getStorageSync('latitude'),
    longitude: wx.getStorageSync('longitude'),
    controls: [{
      id: 4,
      iconPath: 'map.png',
      position: {
        left: 10,
        top: 500 - 50,
        width: 30,
        height: 2000
      },
      clickable: true
    }]
  },

  // Scan QR
  scan_qr: SQR,
  
  
  // use reward
  use_reward: function (e) {

    wx.showModal({
      // title: 'Please Confirm',
      content: 'Do you wanna use your reward now?',
      confirmText: "confirm",
      cancelText: "cancel",
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

    wx.showLoading({
      title: 'Loading',
    })

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

    // Code for map
    console.log("latitude", this.data.markers[0].latitude)
    // console.log("longitude", this.data.markers[0].longitude)
    console.log("Markers", this.data.markers)

    let that = this;
    wx.getStorage({
      key: 'latitude',
      success: function (res) {
        that.setData({
          latitude: res.data,
        })
      }
    })
    wx.getStorage({
      key: 'longitude',
      success: function (res) {
        that.setData({
          latitude: res.data,
        })
      }
    })
    wx.showLoading({
      title: 'Loading',
    })

    // console.log("latitude", this.data.markers[0].latitude)
    // console.log("longitude", this.data.markers[0].longitude)
    console.log("Markers", this.data.markers)

    // let that = this;
    wx.getStorage({
      key: 'latitude',
      success: function (res) {
        that.setData({
          latitude: res.data,
        })
      }
    })
    wx.getStorage({
      key: 'longitude',
      success: function (res) {
        that.setData({
          latitude: res.data,
        })
      }
    })
    wx.hideLoading()
  },
  //add card to wallet
  add_card: function () {
    console.log("hi, add a card")

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('map');
    wx.getLocation();
    this.mapCtx.moveToLocation({
    });
  },

  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },

  regionchange(e) {
    
  },

  markertap(e) {
    console.log(e.markerId)

  },

  controltap(e) {
   
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