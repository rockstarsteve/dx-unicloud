'use strict';
process.env.TZ = 'Asia/Shanghai'; // 设置时区为东八区(目前无效)
const filterService = require(__dirname + '/filterService');
const logDb = uniCloud.database().collection('log')

async function filter(content) {
	let {
		event,
		context,
		base
	} = content;
	let originalParam = {
		event,
		context
	};
	let param = base.getQueryStringParameters(event);
	let {
		url,
		uniIdToken
	} = param;
	let serviceParam = {
		url,
		data: param,
		uniIdToken,
		originalParam
	};
	//记录日志========================================================================
	await logDb.add({
		param
	})
	
	// 全局过滤器开始  start	-----------------------------------------------------------
	let res = {
		code: 403,
		msg: 'access denied',
		filterStack: []
	};
	// 需要测试 匹配获取对应的过滤器 业务逻辑开始-----------------------------------------------------------
	for (let i in filterService) {
		let filterItem = filterService[i];
		let regExp = new RegExp(filterItem.regExp);
		if (regExp.test(url)) {
			serviceParam.filterResponse = res;
			let filterRes = await filterItem.main(serviceParam);
			filterRes.filterId = filterItem.id;
			res.filterStack.push(filterRes);
			if (filterRes.code !== 0) {
				res = filterRes;
				break;
			} else {
				res = Object.assign(res, filterRes);
			}
		}
	}
	// 匹配获取对应的过滤器 业务逻辑结束-----------------------------------------------------------
	if (res.code !== 0) return res; // code不为0，则直接返回错误信息
	// if (res.uid) param.uid = res.uid; // 如果存在uid，则参数自动加上uid参数
	serviceParam.filterResponse = res; // 过滤器返回的数据 过滤器返回的数据
	// 全局过滤器结束 end -----------------------------------------------------------

	// 加载业务函数
	let serviceMain;
	try {
		serviceMain = base.require('controller/' + url);
	} catch (err) {
		if (err && err.code == "MODULE_NOT_FOUND") {
			return {
				code: 404,
				msg: `云函数 ${url} 不存在!`,
				err: err
			};
		} else {
			return {
				code: 500,
				msg: `云函数 ${url} 编译异常!`,
				err: err
			};
		}
	}
	// 运行业务函数，并返回结果给前端
	return await serviceRun({
		res,
		serviceParam,
		serviceMain
	});
	return serviceMain;
}

// 运行业务函数
async function serviceRun(obj = {}) {
	let {
		res,
		serviceParam,
		serviceMain
	} = obj;
	// if (res.uid) {
	// 	serviceParam.uid = res.uid;
	// }
	// if (res.userInfo) {
	// 	serviceParam.userInfo = res.userInfo;
	// }
	let returnRes = await serviceMain.main(serviceParam);
	if (res.token && typeof returnRes == "object") {
		returnRes.base_uni_token = {
			token: res.token,
			tokenExpired: res.tokenExpired
		};
	}
	return returnRes;
}

module.exports = filter;
