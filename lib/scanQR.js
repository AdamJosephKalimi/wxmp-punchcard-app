var SQR = function () {
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
}

module.exports = SQR;