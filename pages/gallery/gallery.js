Page({
  data:{
    // text:"这是一个页面"
    url: '',
    screenHeight: 0,
    isShowActionSheet: true,
    actionSheetItems: ['保存到手机', '预览', '转发'],
    tipText: '',
    modalHidden: true,
    toastHidden: true,
    toastText: ''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({
        url: options.url
    })
    wx.getSystemInfo({
        success: function(res){
            that.setData({
                screenHeight: res.windowHeight
            })    
        }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  actionSheetChange: function() {
      this.setData({
          isShowActionSheet: !this.data.isShowActionSheet
      })
  },
  onImgClick: function(e) {
      //wx.navigateBack();
  },
  onImgLongClick: function(e) {
      this.setData({
          isShowActionSheet: !this.data.isShowActionSheet
      })
  },
  onItemClick: function(e) {
      var that = this;
      var item = e.currentTarget.dataset.item;
      if (item === that.data.actionSheetItems[0]) {
          saveImage(that);
      }else if(item === that.data.actionSheetItems[1]) {
          preview(that);
      }else {
          forward(that);
      }
      
  },
  onClickConfirm: function(e) {
      this.setData({
          modalHidden: !this.data.modalHidden
      })
  },
  toastChange: function(e) {
      this.setData({
          toastHidden: !this.data.toastHidden
      })
  }
}) 

function saveImage(that) {
    wx.downloadFile({
          url: that.data.url,
          type: 'image',
          success: function(res) {
            console.log('保存成功:' + res.tempFilePath);
            that.setData({
                modalHidden: false,
                tipText: '保存成功!',
                isShowActionSheet: true
            })
          },
          fail: function(e) {
            console.log('保存失败!');
            that.setData({
                modalHidden: false,
                tipText: '保存失败!',
                isShowActionSheet: true
            })
          }
      })
}

function preview(that) {
    that.setData({
        toastText: '预览',
        toastHidden: false,
        isShowActionSheet: true
    })
}

function forward(that) {
    that.setData({
        toastText: '转发',
        toastHidden: false,
        isShowActionSheet: true
    })
}