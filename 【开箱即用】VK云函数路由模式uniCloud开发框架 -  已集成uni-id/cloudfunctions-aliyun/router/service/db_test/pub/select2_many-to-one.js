module.exports = {
	/**
	 * 连表查询(仅限两表查询)(VK版本)
	 * @url db_test/pub/select2_many-to-one 前端调用的url参数地址
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
		res = await vk.baseDao.select2({
			dbName:"vk-test",                 // 主表名
			dbName2:"uni-id-users",           // 副表名
			foreignKeyType:"many-to-one",     // one-to-many 一对多 many-to-one 多对一
			foreignKey:"user_id",              // 主表外键字段名
			foreignKey2:"_id",                // 副表外键字段名
			as:"userInfo",                    // 副表数据插入到主表的字段名
			getCount:false,                   // 是否同时返回总数(会执行count)
			pageIndex:1,                      // 当前第几页
			pageSize:10,                      // 每页显示数据
			whereJson:{                       // 主表where条件
				
			},
			whereJson2:{                      // 副表where条件
				
			},
			fieldJson:{                       // 主表字段显示规则
				
			},
			fieldJson2:{										  // 副表字段显示规则
				token : false,
				password : false
			},
			sortArr:[                         // 主表排序规则(多对一,副表无排序规则)
				{
					"name":"money",
					"type":"desc"
				}
			]
		}, event.util);
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}