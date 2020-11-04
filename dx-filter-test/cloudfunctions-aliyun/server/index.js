'use strict';

const logDb = uniCloud.database().collection('log')
const router = require(__dirname + '/router/index');

exports.main = async (event, context) => {
	
	// 记录请求数据
	await logDb.add({requestData: event})
	
	//处理请求
	return await router({ event, context });
}