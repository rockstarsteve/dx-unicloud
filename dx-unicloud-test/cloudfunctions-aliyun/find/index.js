'use strict';

const db = uniCloud.database()
const collection = db.collection('user')
const log = db.collection('log')

exports.main = async (event, context) => {
	//event为客户端上传的参数
	await log.add({
		info: event
	})
	
	let res = await collection.where({
		name: event.name
	}).get()

	//返回数据给客户端
	return res
};
