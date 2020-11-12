
const logDb = uniCloud.database().collection('log')
module.exports = {
	main: async (event) => {
		let { data = {}, util, originalParam } = event;
		let { uniID, config,  base, db, _ } = util;
		let res = { code : 0, msg : 'ok' };
		// 业务逻辑开始----------------------------------------------------------- 
		// 可写与数据库的交互逻辑等等
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