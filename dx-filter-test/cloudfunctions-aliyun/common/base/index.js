/**
 * 基础云函数框架
 */
var base = {};
// 路由入口函数
base.configFile = require(__dirname + '/config');
// 路由入口函数
base.filter = require(__dirname + '/filter/filter');
// 数据库baseDao API
base.baseDao = require(__dirname + '/util/vk-base-dao');

// 用于存放require缓存
base.requireCache = {};
// require封装，用于兼容阿里云和腾讯云(且带缓存功能)
base.require = function(path) {
	if (base.requireCache && base.requireCache[path]) {
		return base.requireCache[path];
	} else {
		const requireItem = require(__dirname + "/../../" + path);
		base.requireCache[path] = requireItem;
		return requireItem;
	}
}

// 配置
base.config = {};
base.init = function(obj) {
	base.config.config = obj.config;
	base.config.uniID = obj.uniID;
	base.config.db = obj.db;
};

// 提取请求参数
base.getQueryStringParameters = function(event) {
	let param = {};
	param = JSON.parse(JSON.stringify(event));
	param.url = param.url || "";
	if (!param.uniIdToken) {
		param.uniIdToken = "";
	}
	// console.log("参数param:", param)
	return param;
}

// 初始化
const config = base.configFile;
const uniID = require('uni-id');
uniID.init(config["uni"]);
const db = uniCloud.database();

base.init({
	config,
	uniID,
	db,
});

module.exports = base;
