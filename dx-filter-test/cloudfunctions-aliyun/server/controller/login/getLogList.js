
const logDb = uniCloud.database().collection('log')
module.exports = {
	
	main: async (event) => {
		let res = { code : 0, msg : '' };
		// 业务逻辑开始----------------------------------------------------------- 
		// 可写与数据库的交互逻辑等等
		res.msg = '调用成功'
		// 记录请求数据
		const rest = await logDb.limit(8).get()
		res.data = rest.data
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}