'use strict';
process.env.TZ = 'Asia/Shanghai'; // 设置时区为东八区(目前无效)
const filterService = require(__dirname + '/filter'); // 全局过滤器

async function router(obj) {
	let { event, context } = obj;
	// 全局过滤器开始	-----------------------------------------------------------
	let res = await filterService.main(event);
	if (res.code !== 0) return res; // code不为0，则直接返回错误信息
	// 全局过滤器结束-----------------------------------------------------------

	// 加载业务函数
	let serviceMain;
	try {
		console.log(__dirname+"/../controller/"+ event.url)
		serviceMain = require(__dirname+"/../controller/"+ event.url);
	} catch (err) {
		if (err && err.code == "MODULE_NOT_FOUND") {
			return {
				code: 404,
				msg: `云函数 ${event.url} 不存在!`,
				err: err
			};
		} else {
			return {
				code: 500,
				msg: `云函数 ${event.url} 编译异常!`,
				err: err
			};
		}
	}
	// 运行业务函数，并返回结果给前端
	return await serviceRun({
		serviceMain,event
	});
	return serviceMain;
}

// 运行业务函数
async function serviceRun(obj = {}) {
	let {serviceMain,event} = obj;
	let returnRes = await serviceMain.main(event);
	return returnRes;
}

module.exports = router;
