module.exports = {
  /**
   * 修改数据
   * @url db_test/pub/update 前端调用的url参数地址
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
		res.num = await vk.baseDao.update({
			dbName:"vk-test",
			whereJson:{
				_id:"5f3a14823d11c6000106ff5c",
				money:_.gt(0)
			},
			dataJson:{
				money:_.inc(-1)
			}
		},event.util);
		// 对应的sql:
		// update vk-test set money = money-1 where _id="5f3a14823d11c6000106ff5c" and money > 0
		// 业务逻辑结束-----------------------------------------------------------
    return res;
  }

}