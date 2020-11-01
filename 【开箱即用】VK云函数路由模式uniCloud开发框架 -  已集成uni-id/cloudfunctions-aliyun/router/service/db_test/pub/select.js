module.exports = {
	/**
	 * 查询多条记录
	 * @url db_test/pub/select 前端调用的url参数地址
	 * @description 此函数描述
	 * @params {Object} data 请求参数
	 * @params {String} uniIdToken 用户token
	 * @params {Object} util 公共工具包
	 * data 请求参数 说明
	 * res 返回参数说明
	 * @params {Number} code 错误码，0表示成功
	 * @params {String} msg 详细信息
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, originalParam } = event;
		let { uniID, pubFun, vk , db, _ } = util;
		let { uid } = data;
		let res = { code : 0, msg : 'ok' };
		// 业务逻辑开始----------------------------------------------------------- 
		res = await vk.baseDao.select({
			dbName:"vk-test",
			pageIndex:1,
			pageSize:100,
			whereJson:{
				user_id:"001"
			},
		}, event.util);
		// 对应的sql:
		// select * from vk-test where user_id == '001' limit 0,100;
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}