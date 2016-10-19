var pageObject = {
    data: {
        moveItems: [],
        isLoading: false,
        bannerUrls: [],
        screenHeight: ''
    },
    onLoad: function () {
        console.log('Movies onLoad');
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                console.log('手机型号:' + res.model);
                console.log('screenWidth:' + res.windowWidth);
                console.log('screenHeight:' + res.windowHeight);
                that.setData({
                    screenHeight: res.windowHeight
                })
            }
        })
        requestBannerData(that);
        requestData(that, mPageIndex, mPageSize);
    },
    onReady: function () {
        console.log('Movies onReady');
    },
    onShow: function () {
        console.log("Movies onShow");
    },
    onHide: function () {
        console.log('Movies onHide');
    },
    onUnload: function () {
        console.log('Movies onUnload');
    },
    onItemClick: function (e) {
        console.log(e);
    },
    onPullDownRefresh: function () {
        //do something when pull down
        console.log('refresh.....');
        requestData(this, 1, mPageSize);
    },
    loadMoreEvent: function (e) {
        console.log('loadMore.....');
        console.log(e);
        requestData(this, mPageIndex, mPageSize);
    }
}

var mPageIndex = 1;
var mPageSize = 10;
var mImgs = [];
var mTitles = [];
var mCasts = [];
var mCollects = [];

function requestBannerData(that) {
    request.requestBannerData(
        function (data) {
            var urls = [];
            for (var i = 0; i < data.subjects.length; i++) {
                urls.push({url: data.subjects[i].images.large});
            }
            that.setData({
                bannerUrls: urls
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

function requestData(that, pageIndex, pageSize) {
    request.requestMoviesListData(
        pageIndex, pageSize,
        function (data) {
            for (var i = 0; i < data.subjects.length; i++) {
                bindData(data.subjects[i]);
            }
            var itemList = new Array();
            for (var i = 0; i < mTitles.length; i++) {
                itemList.push({title: mTitles[i], img: mImgs[i], cast: mCasts, collect: mCollects[i]});
            }
            that.setData({
                moveItems: itemList
            })
            mPageIndex++;
        },
        function () {
            console.log('request fail');
        },
        function () {
            console.log('request complete');
            wx.stopPullDownRefresh();
            that.setData({
                isLoading: true
            })
        }
    );
}

/**
 * push() 向Array数组的末尾添加若干元素. eg: array.push('a', 'b') //返回array新的长度
 * unshift() 向Array数组的头部添加若干元素. eg: array.unshift('a', 'b') //array长度会发生改变
 * array.splice(2, 3, 'Google', 'Facebook') //从索引2开始删除3个元素,再从该位置添加'Google,Facebook'元素
 * concat() 把当前的Array与另一个Array连接起来,并返回一个新的Array. eg: array.concat([1, 2, 3]);
 *
 */

function bindData(itemData) {
    for (var j = 0; j < itemData.casts.length; j++) {
        mCasts.push(itemData.casts[j].name);
    }
    mImgs.push(itemData.images.medium);
    mTitles.push(itemData.title);
    mCollects.push(itemData.collect_count);
}

Page(pageObject);
var Constant = require('../../common/constant.js');
var request = require('../../request/request.js');
