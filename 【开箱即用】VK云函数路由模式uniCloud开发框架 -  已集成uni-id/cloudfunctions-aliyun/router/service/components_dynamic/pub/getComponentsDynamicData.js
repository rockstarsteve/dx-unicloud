module.exports = {
	/**
	 * 此函数名称
	 * @url components_dynamic/pub/getComponentsDynamicData 前端调用的url参数地址
	 * @description 此函数描述
	 * @params {Object} data 请求参数
	 * @params {String} uniIdToken 用户token
	 * @params {String} userInfo 当前登录用户信息(同理,是可信任的)(只有kh函数才带此参数)
	 * @params {Object} util 公共工具包
	 * @params {Object} originalParam 原始请求参数(包含了原始event和context)
	 * data 请求参数 说明
	 * @params {String} uid  当前登录用户id,若用户已登录且token有效,则data中会带uid参数
	 * (此参数是后端过滤器通过token获取并添加到data中的,是可信任的)(只有kh函数才带此参数)
	 * @params {Array<String>} ids 需要获取的组件数据 id数组
	 * res 返回参数说明
	 * @params {Number} code 错误码，0表示成功
	 * @params {String} msg 详细信息
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, originalParam } = event;
		let { uniID, config, pubFun, vk , db, _ } = util;
		let { uid, ids } = data;
		let res = { code : 0, msg : '' };
		// 业务逻辑开始----------------------------------------------------------- 
		// 根据ids获取组件动态数据列表
		let res_select = await vk.baseDao.select({
			dbName:"opendb-components-dynamic",
			getCount:false,
			pageSize:100,
			whereJson:{
				data_id : _.in(ids)
			},
		}, event.util);
		// 将数组形式 转换成 组件需要的格式
		res.componentsDynamic = {};
		for(let i in res_select.rows){
			let item = res_select.rows[i];
			res.componentsDynamic[item.data_id] = item.data;
		}
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}