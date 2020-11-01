/**
 * 自定义过滤器
 * 框架内置3个默认过滤器 id分别为 pub kh sys  ，自定义过滤器id跟默认过滤器id一样，可覆盖默认过滤器
 * 更多自定义过滤器的配置规则，请加Q群 22466457 如有问题或建议可以在群内讨论。
 */

module.exports = [{
		id: "xxxx1",
		regExp: "^xxx1/kh", // 正则匹配规则，这个是以^xxx1/kh/开头的云函数会被拦截
		description: "这里是你过滤器1号的描述",
		index: 210, // 由于kh（检测token）过滤器的执行顺序是200，如果需要在检测登录的过滤后执行，则需要填写 > 200 的值
		main: async function(event) {
			// 这里是拦截规则，可以查数据库，最终code:0 代表通过，其他均为未通过，msg是被拦截的原因
			return {
				code: -1,
				msg: "被自定义过滤器拦截了"
			}
		}
	},
	{
		id: "xxxx2",
		regExp: "^xxx2/kh", // 正则匹配规则，这个是以^xxx2/kh/开头的云函数会被拦截
		description: "这里是你过滤器2号的描述",
		index: 210, // 由于kh（检测token）过滤器的执行顺序是200，如果需要在检测登录的过滤后执行，则需要填写 > 200 的值
		main: async function(event) {
			// 这里是拦截规则，可以查数据库，最终code:0 代表通过，其他均为未通过，msg是被拦截的原因
			return {
				code: -1,
				msg: "被自定义过滤器拦截了"
			}
		}
	}
]
