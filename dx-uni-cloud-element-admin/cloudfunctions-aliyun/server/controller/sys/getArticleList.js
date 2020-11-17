'use strict'
const db = uniCloud.database()
const dbCmd = db.command
module.exports = {
	main: async (event) => {
		let { data = {}, originalParam } = event;
		let rest = { code : 0, msg : '调用成功' };
		// 业务逻辑开始----------------------------------------------------------- 
		const collection = db.collection('article')
		let total = await collection.where({
			delete_date: dbCmd.eq('0')
		}).count()
		let res = await collection.where({
			delete_date: dbCmd.eq('0')
		}).field({
			'content': false
		}).orderBy('create_date', 'desc').skip((data.page - 1) * data.limit).limit(data.limit).get()
		let restData = {}
		restData.total = total.total
		restData.data = res.data
		rest.data = restData
		
		// 业务逻辑结束-----------------------------------------------------------
		return rest;
	}
}