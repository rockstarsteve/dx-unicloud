const uniID = require('uni-id')
module.exports = {
	main: async (event) => {
		let { data = {}, originalParam } = event;
		let res = { code : 0, msg : '调用成功' };
		// 业务逻辑开始----------------------------------------------------------- 
		let param = {}
		param.permissionID = data.permissionID
		param.permissionName = data.permissionName
		param.comment = data.comment
		res.data = await uniID.addPermission(param)
		
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}