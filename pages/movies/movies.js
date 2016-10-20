var pageObject = {
    data: {
        moveItems: [],
        isLoading: false,
        bannerUrls: [],
        screenHeight: 0,
        animationData: {},
        isLoadMore: false
    },
    onLoad: function () {
        //一个页面只调用一次.
        console.log('Movies onLoad');
        var that = this;
        //wx.showNavigationBarLoading();
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
        initData(that);
    },
    onReady: function () {
        //一个页面只调用一次, 代表页面可以与视图层进行交互.
        console.log('Movies onReady');
        var animation = wx.createAnimation({
            duration: 400,
            timingFunction: 'ease'
        })
        animation.rotate(45).step()
        this.setData({
            animationData: animation.export()
        })
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
        wx.navigateTo({
            url: '../detail/detail?id=' + e.currentTarget.dataset.id
        });
    },
    onClickBannerListener: function (e) {
        console.log(e);
        wx.navigateTo({
            url: '../detail/detail?id=' + e.target.dataset.id
        })
    },
    onPullDownRefresh: function () {
        //do something when pull down
        console.log('refresh.....');
        requestData(this, 1, mPageSize);
    },
    loadMoreEvent: function (e) {
        console.log('loadMore.....');
        console.log(e);
        this.setData({
            isLoadMore: true
        })
        requestData(this, mPageIndex, mPageSize);
    }
}

var mPageIndex = 1;
var mPageSize = 10;
var mImgs = [];
var mTitles = [];
var mCasts = [];
var mCollects = [];
var mIds = [];

function initData(that) {
    requestBannerData(that);
    requestData(that, mPageIndex, mPageSize);
}

function requestBannerData(that) {
    request.requestBannerData(
        function (data) {
            var urls = [];
            for (var i = 0; i < data.subjects.length; i++) {
                urls.push({id: data.subjects[i].id, url: data.subjects[i].images.large});
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
    request.requestInTheatersData(
        pageIndex, pageSize,
        function (data) {
            for (var i = 0; i < data.subjects.length; i++) {
                bindData(data.subjects[i]);
            }
            var itemList = new Array();
            for (var i = 0; i < mTitles.length; i++) {
                itemList.push({id: mIds[i], title: mTitles[i], img: mImgs[i], cast: mCasts[i], collect: mCollects[i]});
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
                isLoading: true,
                isLoadMore: false
            })
        }
    );
}

/**
 * push() 向Array数组的末尾添加若干元素. eg: array.push('a', 'b') //返回array新的长度
 * unshift() 向Array数组的头部添加若干元素. eg: array.unshift('a', 'b') //array长度会发生改变
 * array.splice(2, 3, 'Google', 'Facebook') //从索引2开始删除3个元素,再从该位置添加'Google,Facebook'元素
 * concat() 把当前的Array与另一个Array连接起来,并返回一个新的Array. eg: array.concat([1, 2, 3]);
 * join() 把当前Array的每个元素都用指定的字符串连接起来,再返回连接后的字符串. eg: array.join('-'); //A-B-C-1-2-3
 *
 */

function bindData(itemData) {
    var temp = [];
    for (var j = 0; j < itemData.casts.length; j++) {
        temp.push(itemData.casts[j].name); //['刘青云', '谢霆锋', '巩俐']
    }
    temp.join('-'); //刘青云-谢霆锋-巩俐
    mCasts.push(temp);
    mImgs.push(itemData.images.medium);
    mTitles.push(itemData.title);
    mCollects.push(itemData.collect_count);
    mIds.push(itemData.id);
}

Page(pageObject);
var Constant = require('../../common/constant.js');
var request = require('../../request/request.js');
