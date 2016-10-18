var pageObject = {
    data: {
        moveItems: [],
        isLoading: false,
        bannerUrls: []
    },
    onLoad: function () {
        console.log('Movies onLoad');
        var that = this;
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
        requestData(this, 1, mPageSize);
    },
    loadMoreEvent: function (e) {
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
    wx.request({
        url: Constant.BASE_URL.concat("movie/top250"),
        data: {
            start: 0,
            count: 3
        },
        header: {
            'Content-Type': 'application/json'
        },
        success: function (res) {
            console.log(res.data);
            if (res == null || res.data == null || res.data.subjects.length == 0) {
                console.log(Constant.REQUEST_DATA_NULL);
                return;
            }
            var urls = [];
            for (var i = 0; i < res.data.subjects.length; i++) {
                urls.push({url: res.data.subjects[i].images.large});
            }
            that.setData({
                bannerUrls: urls
            })
        },
        fail: function () {
            console.log('request fail');
        },
        complete: function () {
            console.log('request complete');
        }
    })
}

function requestData(that, pageIndex, pageSize) {
    wx.request({
        url: Constant.BASE_URL.concat("movie/top250"),
        data: {
            start: pageIndex,
            count: pageSize
        },
        header: {
            'Content-Type': 'application/json'
        },
        success: function (res) {
            console.log(res.data);
            if (res == null || res.data == null || res.data.subjects.length == 0) {
                console.log(Constant.REQUEST_DATA_NULL);
                return;
            }
            for (var i = 0; i < res.data.subjects.length; i++) {
                bindData(res.data.subjects[i]);
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
        fail: function () {
            console.log('request fail');
        },
        complete: function () {
            console.log('request complete');
            wx.stopPullDownRefresh();
            that.setData({
                isLoading: true
            })
        }
    })
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
