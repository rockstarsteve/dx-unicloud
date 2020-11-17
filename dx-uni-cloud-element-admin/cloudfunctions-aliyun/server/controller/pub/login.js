const uniID = require('uni-id')
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
		res = await uniID.login({
			...event.data,
			// 不指定queryField的情况下只会查询username
			queryField: ['username', 'email', 'mobile']
		});
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}

}
