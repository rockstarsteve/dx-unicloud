/**
 * 基础云函数框架
 */
var base = {};
// 路由入口函数
base.filter = require(__dirname + '/filter/filter');

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

// 提取请求参数
base.getQueryStringParameters = function(event) {
	let param = {};

	if (event.httpMethod) {
		// url化方式(http、https)请求
		if (event.body) {
			let options = event.body;
			if (event.isBase64Encoded) {
				options = Buffer.from(options, 'base64').toString('utf-8');
			}
			if (typeof options == "string") options = JSON.parse(options);
			param = options;
		} else if (event.queryStringParameters) {
			let options = event.queryStringParameters;
			if (typeof options.data == "string") options.data = JSON.parse(options.data);
			param = options;
		}
	} else {
		// 普通云函数请求
		param = JSON.parse(JSON.stringify(event));
	}
	param.url = param.url || "";
	if (!param.uniIdToken) {
		param.uniIdToken = "";
	}
	// console.log("参数param:", param)
	return param;
}

module.exports = base;
