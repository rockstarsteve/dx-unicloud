module.exports = {
	main: async (event) => {
		console.log("evnt:",event);
		let { data = {}, util, originalParam } = event;
		let { uniID, config,  base, db, _ } = util;
		let res = { code : 0, msg : 'ok' };
		// 业务逻辑开始----------------------------------------------------------- 
		// 可写与数据库的交互逻辑等等
		res.item = await base.baseDao.findById({
			dbName:"uni-id-users",
			id:data._id || "5fab81482e34dd0001f517cc",
			fieldJson:{
				
			}
		},event.util);
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}