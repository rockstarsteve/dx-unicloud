module.exports = {
  /**
   * 检测后台用户是否已登陆,且有对应的权限
   * url  云函数地址
   * data 请求参数
   */
  main: async (event) => {
		let { url, util } = event;
		let { uniID, config, pubFun, vk , db, _ } = util;
    let res = {code :-1, msg : ''};
    // 业务逻辑开始----------------------------------------------------------- 
		// 在这里可以自己写自己的检测后端用户权限逻辑
		// 判断是否登录
		const checkIsLoginService  = require(__dirname+'/checkIsLogin');
		res = await checkIsLoginService.main(event);
		if(res.code !==0){
			return res;
		}
		// 判断是否有后端登录权限
		if(!res.userInfo.allow_login_background){
			 return {
				 code : 403,
				 msg : "您无权限登录后台"
			 };
		}
		// 判断当前登录的用户是否有此接口的请求权限
		// 根据登录用户角色id列表role 查询角色信息
		// let role_req = await vk.baseDao.select({
		// 	dbName : "uni-id-roles",
		// 	whereJson : {
		// 		role_id : _.in(res.userInfo.role),
		// 		status : 1
		// 	},
		// 	fieldJson:{
		// 		permission : true
		// 	}
		// },event.util);
		// 将多个角色内的菜单id数组合并成一个数组
		// let menu_all_ids = [];
		// for(let i in role_req.rows){
		// 	let item = role_req.rows[i].permission;
		// 	if(item && item.length > 0){
		// 		menu_all_ids = menu_all_ids.concat(item);
		// 	}
		// }
		// if(menu_all_ids.length == 0){
		// 	return {
		// 	 code : 403,
		// 	 msg : "权限不足"
		// 	};
		// }
		
		
		// let num = await vk.baseDao.count({
		// 	dbName : "uni-id-permissions",
		// 	whereJson : {
		// 		permission_id : _.in(menu_all_ids),
		// 		status : 1,
		// 		url : url
		// 	}
		// },event.util);
		
		// if(num <= 0){
		// 	return {
		// 	 code : 403,
		// 	 msg : "权限不足"
		// 	};
		// }
		res.code = 0;
		res.msg = "ok";
    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }

}