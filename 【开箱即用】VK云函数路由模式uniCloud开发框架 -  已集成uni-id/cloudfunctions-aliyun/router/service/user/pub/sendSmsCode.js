module.exports = {
  /**
   * 发送短信的验证码
   * @url user/pub/sendSmsCode 前端调用的url参数地址
   * @description 发送验证码
   * @params {Object} data 请求参数
   * @params {String} uniIdToken 用户token
   * @params {Object} util 公共工具包
	 * data 请求参数 说明
	 * @params {String} mobile 手机号  
	 * @params {String} type  验证码类型
	 * res 返回参数说明
	 * @params {Number} code 错误码，0表示成功
	 * @params {String} msg 详细信息
	 * @params {String} mobile 手机号  
	 * @params {String} verifyCode 验证码
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, originalParam } = event;
		let { uniID, config, pubFun, vk , db, _ } = util;
		let { uid } = data;
		let res = { code : 0, msg : '' };
		// 业务逻辑开始----------------------------------------------------------- 
		let { mobile, type } = data;
		const randomStr = '00000' + Math.floor(Math.random() * 1000000);
		let code = randomStr.substring(randomStr.length - 6);
		let param = {
			code,
			type,
			mobile
		};
		if(vk.pubfn.getData(config, "vk.service.sms.aliyun.accessKeyId")){
			// 使用阿里云-短信
			let result = await vk.smsUtil.sendSmsVerifyCode({
				provider : "aliyun",
				mobile : mobile,
				code : code,
			}, event.util);
			if(result.code != 0){
				return {
					code : -1,
					msg : result.Message
				};
			}
			// 发送验证码成功后,设置验证码
			await uniID.setVerifyCode(param);
		}else{
			// 使用uni-短信
			res = await uniID.sendSmsCode(param);
		}
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
