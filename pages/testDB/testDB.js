const TinyDB = require('../../lib/tinyDB.js');
const AV = require('../../utils/av-weapp-min.js');
const Form = require('../../models/form.js');


const log = console.log

// pages/testDB/testDB.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    forms: {}
  },
  onReady: function () {
    new AV.Query('Form')
      .descending('createdAt')
      .find()
      .then(forms => this.setData({ forms }))
      .catch(console.error);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  bindFormSubmit: function (e) {
    // Local storage
    console.log(e)
    console.error("sup dawg")
    var review = e.detail.value.review
    // ...

    // Leancloud permissions
    var acl = new AV.ACL();
    acl.setPublicReadAccess(true);
    acl.setPublicWriteAccess(true);

    // Leancloud storage
    setTimeout(function () {
      new Form({
        review: review
        // ...
      }).setACL(acl)
      .save()
      .then(console.log("callback from form save - only saved after data saved"))
      .catch(console.error);

      // new AV.Query('Form')
      //   .descending('createdAt')
      //   .find()
      //   .then(forms => this.setData({ forms }))
      //   .catch(console.error);

      // Redirect user
      // wx.reLaunch({
      //   url: '../../pages/card-view/card-view'
      // });
    }, 2000);
  },

  testRead() {
    let data = TinyDB.resetPunchCard(4)
    console.log(data)

  },

  testIncrement() {
    let data = TinyDB.incrementPunchCard(1)
    console.log(data)
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