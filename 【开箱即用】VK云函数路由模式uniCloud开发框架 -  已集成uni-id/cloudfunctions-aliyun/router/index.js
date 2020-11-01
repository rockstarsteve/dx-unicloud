'use strict';
// 注意：此为云函数路由入口文件，请勿修改此文件代码，你自己的云函数逻辑应写在service目录下
const vk = require('vk-unicloud'); // vk-unicloud 工具包
const pubFun = require(__dirname + '/util/pubFunction'); // __dirname是为了兼容阿里云
const config = require('config'); // 全局配置信息
const uniID = require('uni-id'); // uni-id 公共模块
uniID.init(config["uni"]);
const db = uniCloud.database();
const customFilterService = require(__dirname + '/util/customFilterService'); // 自定义过滤器
vk.init({
	config,
	uniID,
	db,
	pubFun,
	customFilterService,
	// customUtil为 自己需要用到的npm包集合
	customUtil: {
		// mynpm1 : mynpm1
	}
});
exports.main = async (event, context) => {
	return await vk.router({ event, context, vk });
};
