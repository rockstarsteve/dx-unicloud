module.exports = {
  /**
   * 获取接受邀请的用户清单
   * @url user/kh/getInvitedUser 前端调用的url参数地址
   * @description 此接口用于在其他接口不满足需求时使用
   * @params {Object} data 请求参数
   * @params {String} uniIdToken 用户token
   * @params {Object} util 公共工具包
	 * data 请求参数 说明
	 * @params {String} uid  当前登录用户id,若用户已登录且token有效,则data中会带uid参数
   * (此参数是后端过滤器通过token获取并添加到data中的,是可信任的)
	 * @params {Number} level 指定获取第几级邀请用户，默认1
	 * @params {Number} limit 指定返回列表长度，默认20
	 * @params {Number} offset 指定列表偏移量，默认0
	 * @params {Number} needTotal 是否需要返回总数，默认false
	 * res 返回参数说明
	 * @params {Number} code 错误码，0表示成功
	 * @params {String} msg 详细信息
	 * @params {Array} invitedUser 邀请的用户列表
	 * invitedUser每项结构
	 * @params {String} username 被邀请者用户名
	 * @params {String} mobile 被邀请者手机号
	 * @params {String} invite_time 被邀请者注册时间，以时间戳形式返回
	 * 
	 */
	main: async (event) => {
		let { data = {}, util, originalParam } = event;
		let { uniID } = util;
		let { uid, limit, offset, needTotal } = data;
		let res = {};
		// 业务逻辑开始----------------------------------------------------------- 
		res = await uniID.getInvitedUser({
			uid:uid,
			limit:limit,
			offset:offset,
			needTotal:needTotal
		});
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}