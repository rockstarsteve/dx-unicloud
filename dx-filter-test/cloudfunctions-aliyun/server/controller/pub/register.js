const uniID = require('uni-id')
module.exports = {
	main: async (event) => {
		let {
			data = {}, originalParam
		} = event;
		let {
			username,
			password
		} = data;
		let res = {
			code: 0,
			msg: '调用成功'
		};
		// 业务逻辑开始----------------------------------------------------------- 
		res = await uniID.register({
			username,
			password
		});
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}

}
