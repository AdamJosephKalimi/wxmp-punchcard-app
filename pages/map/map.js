// // map.js
let Markers = require('../../utils/markers')
// // let nearestPlace = 'Nearest Place';

Page({
  data: {
    markers: Markers,
    latitude: wx.getStorageSync('latitude'),
    // latitude: {},
    longitude: wx.getStorageSync('longitude'),
    // longitude: {},
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
  onLoad: function(e) {
    wx.showLoading({
      title: 'Loading',
    })

    // console.log("latitude", this.data.markers[0].latitude)
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
  //   wx.getStorage({
  //     key: 'nearestPlace',
  //     success: function (res) {
  //       that.setData({
  //         nearestPlace: res.data,
  //       })
  //     }
  //   })
  //   wx.getStorage({
  //     key: 'nearestDistance1',
  //     success: function (res) {
  //       that.setData({
  //         nearestDistance1: res.data,
  //       })
  //     }
  //   })
  //   wx.getStorage({
  //     key: 'nearestAdd',
  //     success: function (res) {
  //       that.setData({
  //         nearestAdd: res.data,
  //       })
  //     }
  //   })
  //   place 2
  //   wx.getStorage({
  //     key: 'nearestPlace2',
  //     success: function (res) {
  //       that.setData({
  //         nearestPlace2: res.data,
  //       })
  //     }
  //   })
  //   wx.getStorage({
  //     key: 'nearestDistance2',
  //     success: function (res) {
  //       that.setData({
  //         nearestDistance2: res.data,
  //       })
  //     }
  //   })
  //   wx.getStorage({
  //     key: 'nearestAdd2',
  //     success: function (res) {
  //       that.setData({
  //         nearestAdd2: res.data,
  //       })
  //     }
  //   })
  wx.hideLoading()
 
  },
  onReady: function (e) { 
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
   
  }
 
})