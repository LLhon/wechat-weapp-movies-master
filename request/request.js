/**
 * Created by LLhon on 2016/10/19.
 */
var util = require('../common/utils.js');
var constant = require('../common/constant.js');
var api = require('api.js');
var app = getApp();

function requestData(url, params, successCallback, failCallback, completeCallback) {
    if (app.debug) {
        console.log('request---------url:' + url);
    }
    wx.request({
        url: url,
        method: "GET",
        data: params,
        header: {'Content-Type': 'application/json'},
        success: function (res) {
            console.log('request success');
            if (app.debug) {
                console.log('response---------data:' + res);
            }
            if (res == null) {
                return;
            }
            if (res.statusCode == 200) {
                if (res.data == null) {
                    console.log('request data == null');
                    return;
                }
                util.isFunction(successCallback) && successCallback(res.data);
            }else {
                util.isFunction(successCallback) && failCallback();
            }
        },
        fail: function () {
            util.isFunction(failCallback) && failCallback();
        },
        complete: function () {
            util.isFunction(completeCallback) && completeCallback();
        }
    })
}

/**
 * 获取轮播图数据
 * @param successCallback
 * @param failCallback
 * @param completeCallback
 */
function requestBannerData(successCallback, failCallback, completeCallback) {
    requestData(api.getMoviesListUrl(), {start: 0, count: 3}, successCallback, failCallback, completeCallback);
}
/**
 * 获取影视列表
 * @param pageIndex
 * @param pageSize
 * @param successCallback
 * @param failCallback
 * @param completeCallback
 */
function requestMoviesListData(pageIndex, pageSize, successCallback, failCallback, completeCallback) {
    requestData(api.getMoviesListUrl(), {start: pageIndex, count: pageSize}, successCallback, failCallback, completeCallback);
}
function requestMovieDetailData(id, successCallback, failCallback, completeCallback) {
    requestData(api.getMovieDetailUrl(id), {}, successCallback, failCallback, completeCallback);
}



module.exports.requestBannerData = requestBannerData
module.exports.requestMoviesListData = requestMoviesListData
module.exports.requestMovieDetailData = requestMovieDetailData