module.exports = {
  /**
   * sum求和
   * @url db_test/pub/sum 前端调用的url参数地址
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
		res.sum = await vk.baseDao.sum({
			dbName:"vk-test",
			fieldName:"money",
			whereJson:{
				
			}
		},event.util);
		// 对应的sql:
		// select sum(money) from vk-test
    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }

}