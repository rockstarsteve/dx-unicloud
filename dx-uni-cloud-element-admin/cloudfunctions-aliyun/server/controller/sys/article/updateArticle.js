'use strict'
const db = uniCloud.database()
module.exports = {
	main: async (event) => {
		let { data = {}, originalParam } = event;
		let rest = { code : 0, msg : '调用成功' };
		// 业务逻辑开始----------------------------------------------------------- 
		const collection = db.collection('article')
		if (data.id instanceof Array) {
			for (let i = 0; i < data.id.length; i++) {
				await collection.doc(data.id[i]).update({
					delete_date: data.delete_date
				})
			}
		} else {
			await collection.doc(data.id).update(data)
		}
		
		// 业务逻辑结束-----------------------------------------------------------
		return rest;
	}
}