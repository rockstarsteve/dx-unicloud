const filterService = require(__dirname + '/filterService');
module.exports = {
	/**
	 * 全局过滤器
	 * author VK
	 */
	main: async (event) => {
		let res = {
			code: 403,
			msg: 'access denied',
			filterStack: []
		};
		let {url} = event;
		// 业务逻辑开始----------------------------------------------------------- 
		console.log("开始");
		for (let i in filterService) {
			let filterItem = filterService[i];
			let regExp = new RegExp(filterItem.regExp);
			if (regExp.test(url)) {
				let filterRes = await filterItem.main(event);
				if (filterRes.code !== 0) {
					res = filterRes;
					break;
				} else {
					res = Object.assign(res, filterRes);
				}
			}
		}
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
