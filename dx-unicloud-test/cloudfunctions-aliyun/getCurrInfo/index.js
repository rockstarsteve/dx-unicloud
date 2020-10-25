'use strict';
exports.main = async (event, context) => {
	let res = {}
	//context中可获取客户端调用的上下文
	let os = context.OS //客户端操作系统，返回值：android、ios    等
	let platform = context.PLATFORM //运行平台，返回值为 mp-weixin、app-plus等
	let appid = context.APPID // manifest.json中配置的appid
	let clientIP = context.CLIENTIP // 客户端ip信息
	let clientUA = context.CLIENTUA // 客户端user-agent

	res.os = os
	res.platform = platform
	res.appid = appid
	res.clientIP = clientIP
	res.clientUA = clientUA
	
	return res
};
