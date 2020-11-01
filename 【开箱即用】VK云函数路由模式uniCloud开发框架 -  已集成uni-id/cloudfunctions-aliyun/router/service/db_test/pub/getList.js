module.exports = {
  /**
   * 查询多条记录 分页
   * @url db_test/pub/getList 前端调用的url参数地址
   * @description 用于分页获取数据,通常用于长列表形式的分页
   * @params {Object} data 请求参数
   * @params {String} uniIdToken 用户token
   * @params {Object} util 公共工具包
   * data 请求参数 说明
	 * @params {String} tableName 	表名
   * @params {String} addTime 		搜索开始时间
   * @params {String} endTime 		搜索截止时间
	 * @params {String} searchvalue 搜索指定内容
	 * @params {Number} pageNum 		当前页码
	 * @params {Number} pageSize 		每页显示数量
   * res 返回参数说明
   * @params {Number} code 错误码，0表示成功
   * @params {String} msg 详细信息
   */
  main: async (event) => {
		let { data = {}, util, originalParam } = event;
		let { uniID, pubFun, vk , db, _ } = util;
		let { uid } = data;
		let res = {code : 0, msg : ''};
    // 业务逻辑开始----------------------------------------------------------- 
		// 可写与数据库的交互逻辑等等
		let { pageNum, pageSize, addTimeLong ,endTimeLong, searchvalue } = data;
		let dbName = "vk-test";
		let fieldJson = {};
		let whereJson = {};
		let sortArr = [];
		// 指定返回字段开始-----------------------------------------------------------
		fieldJson["_add_time"] = false; // 代表不返回_addTime字段
		// 指定返回字段开始-----------------------------------------------------------
		// 排序规则开始-----------------------------------------------------------
		sortArr.push({
			"name":"_add_time",
			"type":"desc"
		});
		// 排序规则结束-----------------------------------------------------------
		// 查询条件开始-----------------------------------------------------------
		if(searchvalue){
			// 查询searchvalue开头的数据
			// whereJson["title"] = new RegExp('^'+searchvalue);
			whereJson["money"] = parseFloat(searchvalue);
		}
		if(addTimeLong && endTimeLong){
			whereJson["_add_time"] =  _.gte(addTimeLong).lte(endTimeLong);
		}else if(addTimeLong && !endTimeLong){
			whereJson["_add_time"] =  _.gte(addTimeLong);
		}else if(!addTimeLong && endTimeLong){
			whereJson["_add_time"] =  _.lte(endTimeLong);
		}
		// 查询条件结束-----------------------------------------------------------
		res = await vk.baseDao.select({
			dbName:dbName,
			pageIndex:pageNum,
			pageSize:pageSize,
			fieldJson:fieldJson,
			whereJson:whereJson,
			sortArr:sortArr
		}, util);
    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }

}