/**
 * Created by LLhon on 2016/10/19.
 */
const BASE_URL = "https://api.douban.com/v2/";

/**
 * 获取电影列表URL
 * @returns {string}
 */
function getMoviesListUrl() {
    return BASE_URL.concat("movie/top250");
}
function getMovieDetailUrl(id) {
    return BASE_URL.concat("movie/subject/" + id);
}

module.exports.BASE_URL = BASE_URL
module.exports.getMoviesListUrl = getMoviesListUrl
module.exports.getMovieDetailUrl = getMovieDetailUrl