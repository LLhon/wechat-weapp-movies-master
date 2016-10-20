/**
 * Created by LLhon on 2016/10/20.
 */
var app = getApp();
var request = require('../../request/request.js');
var mImg = '';
var mSummary = '';

Page({
    data: {
        id: '',
        screenHeight: 0,
        tabTextColor: 'white',
        img: '',
        detailData: {},
        isLoading: false,
        toastHidden: true
    },
    onLoad: function (options) {
        console.log(options);
        var _this = this;
        this.setData({
            id: options.id
        })
        wx.getSystemInfo({
            success: function (res) {
                _this.setData({
                    screenHeight: res.windowHeight
                })
            }
        })
        initData(_this);
    },
    onReady: function () {
        wx.setNavigationBarTitle({
            title: '详情'
        });
        this.setData({
            isLoading: true
        })
    },
    onShow: function () {
        console.log('Detail onShow');
    },
    onHide: function () {
        
    },
    onUnload: function () {
        
    },
    toastChange: function (e) {
        console.log(e);
    },
    onClickSummary: function () {
        this.setData({
            toastHidden: false
        })
    },
    onClickPhotos: function () {
        this.setData({
            toastHidden: false
        })
    },
    onClickRelated: function () {
        this.setData({
            toastHidden: false
        })
    }
})

function initData(_this) {
    request.requestMovieDetailData(_this.data.id,
        function (data) {
            var tempData = {};
            bindData(data, tempData);
            _this.setData({
                detailData: tempData,
                img: tempData['img']
            })
        },
        function () {
            console.log('request fail');
        },
        function () {
            console.log('request complete');
        }
    );
}
function bindData(data, tempData) {
    var img_value = data.images.large;
    var summary_value = data.summary;
    var year_value = data.year;
    var shareUrl_value = data.share_url;
    tempData = {img: img_value, summary: summary_value, year: year_value, share: shareUrl_value};
}