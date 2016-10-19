/**
 * 判断是否为函数
 * @param val
 * @returns {boolean}
 */
function isFunction(val) {
    return typeof val === 'function';
}

module.exports.isFunction = isFunction