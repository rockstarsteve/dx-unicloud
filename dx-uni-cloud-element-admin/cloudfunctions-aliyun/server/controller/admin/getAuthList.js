module.exports = {
	main: async (event) => {
		let res = { code : 0, msg : '调用成功' };
		// 业务逻辑开始----------------------------------------------------------- 
		res.data = "这个是数据是auth通过的数据"
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}