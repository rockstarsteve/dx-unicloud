module.exports = {
	/**
	 * 检测后台用户是否已登陆，且是不是有登录后台的权限
	 * url  云函数地址
	 * data 请求参数
	 */
	main: async (event) => {
		let {
			url
		} = event;
		let res = {
			code: -1,
			msg: '无权限'
		};
		// 业务逻辑开始----------------------------------------------------------- 
		// 判断是否登录
		const checkIsLoginService = require(__dirname + '/checkIsLogin');
		res = await checkIsLoginService.main(event);
		if (res.code !== 0) {
			return res;
		}
		// 判断是否有后端登录权限
		if (!res.userInfo.allow_login_background) {
			return {
				code: 403,
				msg: "您无权限登录后台"
			};
		}
		res.code = 0;
		res.msg = "调用成功";
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}

}