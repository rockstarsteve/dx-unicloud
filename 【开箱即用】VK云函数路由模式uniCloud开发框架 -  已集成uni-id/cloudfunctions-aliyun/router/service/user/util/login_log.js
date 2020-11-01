module.exports = {
	/**
	 * 登录日志
	 */
	 add: async (event,util) => {
		let { uniID, config, pubFun, vk , db, _ } = util;
		let res = { code : 0, msg : '' };
		// 业务逻辑开始----------------------------------------------------------- 
		if(vk.pubfn.getData(config, "vk.service.log.login.status")){
			// 增加登录日志
			try {
				await vk.baseDao.add({
					dbName:"uni-id-log",
					dataJson:{
						"type":  event.type,
						"login_type": event.login_type,
						"user_id": event.uid,
						"ip": event.ip,
						"ua": event.ua,
						"os": event.os,
						"platform": event.platform
					}
				},util);
			}catch(err){
				console.log("日志写入错误");
			}
		}else{
			console.log("已关闭登录日志");
		}
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}