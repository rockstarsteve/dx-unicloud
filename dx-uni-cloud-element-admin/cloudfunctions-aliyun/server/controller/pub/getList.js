const collection = uniCloud.database().collection('uni-id-users');
module.exports = {
	main: async (event) => {
		let {
			data = {}, originalParam
		} = event;
		let res = {
			code: 0,
			msg: '调用成功'
		};
		// 业务逻辑开始----------------------------------------------------------- 
		res.data = await collection.where({
			_id: "001"
		}).get()

		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
