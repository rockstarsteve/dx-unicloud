const uniID = require('uni-id')
module.exports = {
	main: async (event) => {
		let { data = {}, originalParam } = event;
		let res = { code : 0, msg : '调用成功' };
		// 业务逻辑开始----------------------------------------------------------- 
		let param = {}
		param.roleID = data.roleID
		param.roleName = data.roleName
		param.comment = data.comment
		param.permission = data.permission
		res.data = await uniID.addRole(param)
		
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}