'use strict';

const base = require('base');
exports.main = async (event, context) => {
	//处理请求
	return await base.filter({ event, context, base});
}