/**
 * 基础云函数框架
 */
var base = {};
// 路由入口函数
base.configFile = require(__dirname + '/config');
// 路由入口函数
base.filter = require(__dirname + '/filter/filter');
// 数据库baseDao API
base.baseDao = require(__dirname+'/util/vk-base-dao');

// 用于存放require缓存
base.requireCache = {};
// require封装，用于兼容阿里云和腾讯云(且带缓存功能)
base.require = function(path){
	console.log("路径path是：",path);
	if(base.requireCache && base.requireCache[path]){
		console.log("base.requireCache[path]是：",base.requireCache[path]);
		return base.requireCache[path];
	}else{
		console.log("requireItem路径是是：",__dirname+"/../../"+path);
		const requireItem = require(__dirname+"/../../"+path);
		base.requireCache[path] = requireItem;
		console.log("requireItem是：",requireItem);
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
	// param.url = param.$url || "";
	return param;
}

module.exports = base;
