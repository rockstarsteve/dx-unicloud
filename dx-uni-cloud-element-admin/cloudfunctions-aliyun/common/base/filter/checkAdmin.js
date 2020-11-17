const db = uniCloud.database()
const uniID = require('uni-id')
const uniRoleDb = db.collection('uni-id-roles')
const uniPermissionsDb = db.collection('uni-id-permissions')
const dbCmd = db.command
module.exports = {
	/**
	 * 检测后台用户是否已登陆,且有对应的权限
	 * url  云函数地址
	 * data 请求参数
	 */
	main: async (event) => {
		let {
			url
		} = event;
		let res = {
			code: -1,
			msg: '您无权限访问后台'
		};
		// 业务逻辑开始----------------------------------------------------------- 
		// 判断是否登录
		const checkIsLoginService = require(__dirname + '/checkIsLogin');
		res = await checkIsLoginService.main(event);
		if (res.code !== 0) {
			return res;
		}
		// 判断是否有后端登录权限
		if (!res.userInfo.allow_login_background) {
			return {
				code: 403,
				msg: "您无权限登录后台"
			};
		}
		// 判断当前登录的用户是否有此接口的请求权限
		// 根据登录用户角色id列表role 查询角色信息
		let role_req = await uniRoleDb.where({
			role_id: dbCmd.in(res.userInfo.role)
		}).field({ 'permission': true }).get()

		// 将多个角色内的菜单id数组合并成一个数组
		let menu_all_ids = [];
		for (let i in role_req.data) {
			let item = role_req.data[i].permission;
			if (item && item.length > 0) {
				menu_all_ids = menu_all_ids.concat(item);
			}
		}
		if (menu_all_ids.length == 0) {
			return {
				code: 403,
				msg: "权限（角色）不足"
			};
		}
		
		let num = uniRoleDb.where({
			permission_id: dbCmd.in(menu_all_ids),
			url: url
		}).count()

		if (num <= 0) {
			return {
				code: 403,
				msg: "权限（权限）不足"
			};
		}
		res.code = 0;
		res.msg = "调用成功";
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
