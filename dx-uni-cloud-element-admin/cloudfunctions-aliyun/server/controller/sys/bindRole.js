const uniID = require('uni-id')
module.exports = {
	main: async (event) => {
		let { data = {}, originalParam } = event;
		let res = { code : 0, msg : '调用成功' };
		// 业务逻辑开始----------------------------------------------------------- 
		let param = {}
		param.uid = data.uid
		param.roleList = data.roleList
		param.reset = false
		res.data = await uniID.bindRole(param)
		
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}