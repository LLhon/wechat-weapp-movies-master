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
            if (app.debug) {
                console.log('response---------data:' + res);
            }
            if (res.statusCode == 200) {
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

function requestMoviesListData(pageIndex, pageCount, successCallback, failCallback, completeCallback) {
    requestData(api.getMoviesListUrl(), {start: pageIndex, count: pageCount}, successCallback, failCallback, completeCallback);
}

module.exports.requestBannerData = requestBannerData
module.exports.requestMoviesListData = requestMoviesListData