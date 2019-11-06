//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('code------------'+res.code);
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://mall.petoffice.tech/mryw/login/getOpenId',
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/json' //默认值
            },
            success: (res) => {
              console.log(res.data);
              wx.setStorage({
                key: "openId",
                data: res.data.openid
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})