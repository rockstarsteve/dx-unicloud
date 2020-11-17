/**
 * VK框架默认过滤器
 */
const checkIsLoginService = require(__dirname + '/checkIsLogin');
const checkAdminService = require(__dirname + '/checkAdmin');
const checkSysnService = require(__dirname + '/checkSysn');

module.exports = [{
		id: "pub",
		regExp: "/pub/",
		description: "pub函数为所有人都可以访问的函数",
		index: 100,
		main: async function(event) {
			let res = {};
			// if (event.data.need_user_info) {
			// 	// 需要登录用户信息
			// 	res = await checkIsLoginService.main(event);
			// }
			// 不管是否能拿到用户用户信息，均通过。
			res.code = 0;
			res.msg = 'ok';
			return res;
		}
	},
	{
		id: "login",
		regExp: "/login/",
		description: "login函数为必须登录后才能访问的函数(客户端用户)",
		index: 200,
		main: checkIsLoginService.main
	},
	{
		id: "sys",
		regExp: "/sys/",
		description: "sys函数为后端管理人员才能访问的函数",
		index: 300,
		main: checkSysnService.main
	},
	{
		id: "admin",
		regExp: "/admin/",
		description: "admin函数为后端管理人员且存在对应权限才能访问的函数",
		index: 400,
		main: checkAdminService.main
	},
]
