'use strict';

const db = uniCloud.database()
const collection = db.collection('user') // 获取表'unicloud-test'的集合对象

exports.main = async (event, context) => {
	let ramdon = Math.random()
	let res = await collection.add({
		name: event.name
	})
	return res
};
