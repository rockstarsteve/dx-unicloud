'use strict';

const logDb = uniCloud.database().collection('log')


const base = require('base');
const config = base.configFile;
const uniID = require('uni-id');
uniID.init(config["uni"]);
const db = uniCloud.database();


base.init({
	config,
	uniID,
	db,
});
exports.main = async (event, context) => {
	// 记录请求数据
	await logDb.add({requestData: event})
	
	//处理请求
	return await base.filter({ event, context, base});
}