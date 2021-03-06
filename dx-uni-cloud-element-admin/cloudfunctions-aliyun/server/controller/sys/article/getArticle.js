'use strict'
const db = uniCloud.database()
module.exports = {
	main: async (event) => {
		let { data = {}, originalParam } = event;
		let rest = { code : 0, msg : '调用成功' };
		// 业务逻辑开始----------------------------------------------------------- 
		const collection = db.collection('article')
		const res = await collection.doc(data.id).get()
		rest.data = res
		
		// 业务逻辑结束-----------------------------------------------------------
		return rest;
	}
}