'use strict';
/**
 * 数据库baseDao API
 * author VK
 */
var baseDao = {};
/**
 * insert(单条记录)
 * @description insert into dbName (列1, 列2,...) values (值1, 值2,....)
 * 注意:使用此函数添加的数据会自动加上_add_time(添加当前时间戳) 和 _add_time_str(当前时间字符串格式)
 * @params {Object} event 请求参数
 * @params {Object} util 公共工具包
 * event 请求参数 说明
 * @params {String} dbName  	表名
 * @params {String} dataJson  需要添加的数据(json格式)
 * res 返回值为添加数据的id,添加失败,则返回null
 * 调用示例:
	res.id = await vk.baseDao.add({
		dbName:dbName,
		dataJson:{
			"money": 1,
			"user_id": "001"
		}
	},event.util);
*/
baseDao.add = async function(event, util) {
	let {
		db,
		_
	} = util;
	// 数据库API开始----------------------------------------------------------
	let {
		dbName,
		dataJson
	} = event;
	if (!dataJson._add_time) {
		let date = new Date();
		dataJson._add_time = date.getTime();
		let options = {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		};
		dataJson._add_time_str = date.toLocaleString("zh-CN", options);
	}
	let res = await db.collection(dbName).add(dataJson);
	// 数据库API结束----------------------------------------------------------
	return res.id ? res.id : null;
}
/**
 * insert(多条记录)
 * @params {Object} event 请求参数
 * @params {Object} util 公共工具包
 * event 请求参数 说明
 * @params {String} dbName  	表名
 * @params {String} dataJson  需要添加的数据(json数组格式)
 * res 返回值为添加数据的id,添加失败,则返回null
 * 调用示例:
	res.id = await vk.baseDao.adds({
		dbName:dbName,
		dataJson:[]
	},event.util);
*/
baseDao.adds = async function(event, util) {
	let {
		db,
		_
	} = util;
	// 数据库API开始----------------------------------------------------------
	let {
		dbName,
		dataJson
	} = event;
	let date = new Date();
	let _add_time = date.getTime();
	let options = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	};
	let _add_time_str = date.toLocaleString("zh-CN", options);
	for (let i in dataJson) {
		if (!dataJson[i]._add_time) {
			dataJson[i]._add_time = _add_time;
			dataJson[i]._add_time_str = _add_time_str;
		}
	}
	let res = await db.collection(dbName).add(dataJson);
	// 数据库API结束----------------------------------------------------------
	return res.id ? res.id : null;
}
/**
 * delete(根据条件删除记录)
 * @params {Object} event 请求参数
 * @params {Object} util 公共工具包
 * event 请求参数 说明
 * @params {String} dbName  	表名
 * @params {String} whereJson 条件
 * res 返回值为删除的记录数量
 * 调用示例:
	res.num = await vk.baseDao.del({
		dbName:dbName,
		whereJson:{
			
		}
	},event.util);
*/
baseDao.del = async function(event, util) {
	let {
		db,
		_
	} = util;
	let {
		dbName,
		whereJson
	} = event;
	// 数据库API开始----------------------------------------------------------
	let num = 0;
	if (whereJson && JSON.stringify(whereJson) !== "{}") {
		let res = await db.collection(dbName).where(whereJson).remove();
		if (res) {
			num = res.deleted;
		} else {
			console.error(res.errMsg);
			num = -1;
		}
	} else {
		console.error("whereJson条件不能为空");
	}
	return num;
	// 数据库API结束----------------------------------------------------------
}
/**
 * update(根据条件修改记录)
 * @params {Object} event 请求参数
 * @params {Object} util 公共工具包
 * event 请求参数 说明
 * @params {String} dbName  	表名
 * @params {String} whereJson 条件
 * res 返回值为受影响的行数
 * 调用示例:
	res.num = await vk.baseDao.update({
		dbName:dbName,
		whereJson:{
			_add_time: _.gte(time).lte(time + 1000),
		},
		dataJson:{
			user_id:"001"
		}
	},event.util);
*/
baseDao.update = async function(event, util) {
	let {
		db,
		_
	} = util;
	let {
		dbName,
		whereJson,
		dataJson
	} = event;
	// 数据库API开始----------------------------------------------------------
	let num = 0;
	if (whereJson && JSON.stringify(whereJson) !== "{}") {
		let res = await db.collection(dbName).where(whereJson).update(dataJson);
		if (res) {
			num = res.updated;
		} else {
			console.error(res.errMsg);
			num = -1;
		}
	} else {
		console.error("whereJson条件不能为空");
	}
	return num;
	// 数据库API结束----------------------------------------------------------
}
/**
	* select(根据条件查询记录)
	* @params {Object} event 请求参数
	* @params {Object} util 公共工具包
	* event 请求参数 说明
	* @params {String} dbName  	表名
	* @params {String} whereJson 条件
	* @params {Number} pageIndex 第几页
	* @params {Number} pageSize  每页显示数量
	* res 返回值
	* @params {Array(Object)} rows 列表
	* @params {Boolean} hasMore 分页需要 true 还有下一页 false 无下一页
	* @params {Number} pageIndex 当前所在页数
	* @params {Number} pageSize  每页显示数量
	* 调用示例:
	res = await vk.baseDao.select({
		dbName:dbName,
		getCount:true,
		pageIndex:1,
		pageSize:100,
		whereJson:{
			_add_time: _.gte(time).lte(time+1000),
		},
	}, event.util);
*/
baseDao.select = async function(event, util) {
	let {
		db,
		_
	} = util;
	let {
		dbName,
		whereJson,
		pageSize = 10 // 默认10条数据
	} = event;
	if (!whereJson || JSON.stringify(whereJson) === "{}") {
		whereJson = {
			_id: _.neq("___")
		};
	}
	// 数据库API开始----------------------------------------------------------
	if (pageSize <= 0) pageSize = 999999999;
	if (pageSize > 100) {
		// 若查询大于100记录,则使用selectAll
		return await baseDao.selectAll(event, util);
	}
	// 获取select对象开始-----------------------------------------------------------
	let selectDataObj = await baseDao.getSelectData(event, util);
	let {
		result, // 结果集
		hasMore, // 是否还有数据
		total, // 总记录数
		getCount, // 是否同时返回总数(会执行count)
		pageIndex // 当前页码
	} = selectDataObj;
	// 获取select对象结束-----------------------------------------------------------
	result = result.skip((pageIndex - 1) * pageSize).limit(pageSize);
	return result.get()
		.then(res => {
			let json = {};
			json.rows = res.data;
			if (getCount) {
				json.hasMore = hasMore;
				json.total = total;
			} else {
				json.total = res.data ? res.data.length : 0;
				json.hasMore = (json.total >= pageSize) ? true : false;
			}
			json.key = 1;
			json.code = 0;
			json.pageIndex = pageIndex;
			json.pageSize = pageSize;
			return json;
		});
	// 数据库API结束----------------------------------------------------------
}
/**
 * 根据 _id 查询记录
 * @params {Object} event 请求参数
 * @params {Object} util 公共工具包
 * event 请求参数 说明
 * @params {String} dbName  	表名
 * @params {String} id   			id
 * res 返回值为单行记录
 * 调用示例:
	res = await vk.baseDao.findById({
		dbName:dbName,
		id:id
	},event.util);
*/
baseDao.findById = async function(event, util) {
	let {
		db,
		_
	} = util;
	let {
		dbName,
		id,
		fieldJson
	} = event;
	//数据库API开始----------------------------------------------------------
	try {
		let result = db.collection(dbName).doc(id);
		if (fieldJson) {
			result = result.field(fieldJson);
		}
		let res = await result.get();
		return res.data[0];
	} catch (e) {
		console.error(e);
		return null;
	}
	//数据库API结束-----------------------------------------------------------
}
/**
 * 根据whereJson查询对象
 * @params {Object} event 请求参数
 * @params {Object} util 公共工具包
 * event 请求参数 说明
 * @params {String} dbName  	表名
 * @params {String} fieldJson 字段显示规则
 * @params {String} whereJson 查询条件
 * res 返回值为单行记录
 * 调用示例:
	res = await vk.baseDao.findByWhereJson({
		dbName:"uni-id-users",
		fieldJson:{
			token:false,
			password:false,
		},
		whereJson:{
			nickname:"VK"
		}
	},event.util);
*/
baseDao.findByWhereJson = async function(event, util) {
	let {
		db,
		_
	} = util;
	let {
		dbName,
		whereJson,
		fieldJson
	} = event;
	//数据库API开始----------------------------------------------------------
	try {
		if (whereJson && JSON.stringify(whereJson) !== "{}") {
			let result = db.collection(dbName).where(whereJson);
			if (fieldJson) {
				result = result.field(fieldJson);
			}
			let res = await result.limit(1).get();
			if (res.data && res.data.length > 0) {
				return res.data[0];
			}
		} else {
			console.error("whereJson条件不能为空");
		}
	} catch (e) {
		console.error(e);
	}
	return null;
	//数据库API结束-----------------------------------------------------------
}
/**
 * count(根据条件查询记录数量)
 * @params {Object} event 请求参数
 * @params {Object} util 公共工具包
 * event 请求参数 说明
 * @params {String} dbName  	表名
 * @params {String} whereJson 查询条件
 * res 返回值为单行记录
 * 调用示例:
	let num = await vk.baseDao.count({
		dbName:dbName,
		whereJson:{
			
		}
	});
*/
baseDao.count = async function(event, util) {
	let {
		db,
		_
	} = util;
	let {
		dbName,
		whereJson
	} = event;
	if (!whereJson || JSON.stringify(whereJson) === "{}") {
		whereJson = {
			_id: _.neq("___")
		};
	}
	// 数据库API开始----------------------------------------------------------
	try {
		let res = await db.collection(dbName).where(whereJson).count(); // 集合总数
		return res.total; //总记录数
	} catch (e) {
		console.error(e);
		return null;
	}
	// 数据库API结束----------------------------------------------------------
}
/**
	* select-连表(暂只支持两表连接)(想要多表连接,请使用selects)
	* 调用示例:
	res = await vk.baseDao.select2({
		dbName:"vk-test",
		dbName2:"uni-id-users",
		foreignKeyType:"many-to-one",					// one-to-many 一对多 many-to-one 多对一
		foreignKey:"user_id",
		foreignKey2:"_id",
		as:"userInfo",
		getCount:true,
		pageIndex:1,
		pageSize:2,
		whereJson:{
			user_id:"001"
		},
		fieldJson2:{
			token:false,
			password:false,
		}
	}, event.util);
*/
baseDao.select2 = async function(event, util) {
	let {
		db,
		_,
		vk
	} = util;
	let {
		foreignKeyType = "many-to-one", // 外键类型 默认 多对一
	} = event;
	if (foreignKeyType === "many-to-one") {
		// 多对一
		return await baseDao.select2_ManyToOne(event, util);
	} else if (foreignKeyType === "one-to-many") {
		// 一对多
		return await baseDao.select2_OneToMany(event, util);
	} else {
		console.error("不支持的foreignKeyType");
		return {};
	}
}

baseDao.count2_ManyToOne = async function(event, util) {
	let {
		db,
		_,
		vk
	} = util;
	let {
		dbName, // 主表名
		dbName2, // 副表名
		foreignKey = "_id", // 主表用于和副表连接的外键字段名(该字段应为主表的外键,默认为主表的主键_id)
		foreignKey2 = "_id", // 副表用于和主表连接的外键字段名(默认为副表的主键_id)
		whereJson = {}, // 主表筛选条件,json格式
		whereJson2 = {}, // 副表筛选条件,json格式 对_id字段无效
		pageIndex = 1, // 默认第一页开始
		pageSize = 10, // 默认每页加载10条数据
		getCount = false, // 是否同时返回总数(会执行count)
		sortArr = {}, // 排序数组
		fieldJson = {}, // 主表字段显示规则,若field不传,则默认返回全部字段
		fieldJson2 = {}, // 副表字段显示规则,若field不传,则默认返回全部字段
		as, // 副表信息插入到主表里的字段名称,如果输入记录中本来就已有该字段，则该字段会被覆写
	} = event;
	// 数据库API开始----------------------------------------------------------
	if (!as) as = dbName2;
	if (JSON.stringify(whereJson) === "{}") {
		whereJson = {
			_id: _.neq("___")
		};
	}
	let res = {};
	const $ = _.aggregate
	let result = db.collection(dbName).aggregate();
	// 主表where条件
	if (whereJson && JSON.stringify(whereJson) !== "{}") {
		result = result.match(whereJson);
	}
	// 主表字段显示规则
	if (fieldJson && JSON.stringify(fieldJson) !== "{}") {
		result = result.project(fieldJson);
	}
	// 主表排序规则
	if (sortArr && JSON.stringify(sortArr) !== "{}") {
		let sortJson = {};
		for (let i in sortArr) {
			let g = sortArr[i];
			let name = g.name;
			let type = g.type;
			if (type == undefined || type == "" || type == "asc") {
				type = 1;
			} else {
				type = -1;
			}
			sortJson[name] = type;
		}
		result = result.sort(sortJson);
	}
	// 分页数据
	// 连表开始-----------------------------------------------------------
	let lookupJson = {
		from: dbName2,
		localField: foreignKey,
		foreignField: foreignKey2,
		as: as,
	};
	result = result.lookup(lookupJson);
	// 副表字段显示规则
	if (fieldJson2 && JSON.stringify(fieldJson2) !== "{}") {
		let fieldJson2_obj = {};
		for (let keyName in fieldJson2) {
			fieldJson2_obj[as + "." + keyName] = fieldJson2[keyName];
		}
		result = result.project(fieldJson2_obj);
	}
	// 副表where条件
	if (whereJson2 && JSON.stringify(whereJson2) !== "{}") {
		let whereJson2_obj = {};
		for (let keyName in whereJson2) {
			whereJson2_obj[as + "." + keyName] = whereJson2[keyName];
		}
		result = result.match(whereJson2_obj);
	}
	// 连表结束-----------------------------------------------------------
	// 获取结果
	let totalResult = await result.count('total').end();
	try {
		return totalResult.data[0].total;
	} catch (err) {
		console.log(err);
		return 0;
	}
}
// 双表连接(多对一)
baseDao.select2_ManyToOne = async function(event, util) {
	let {
		db,
		_,
		vk
	} = util;
	let {
		dbName, // 主表名
		dbName2, // 副表名
		foreignKey = "_id", // 主表用于和副表连接的外键字段名(该字段应为主表的外键,默认为主表的主键_id)
		foreignKey2 = "_id", // 副表用于和主表连接的外键字段名(默认为副表的主键_id)
		whereJson = {}, // 主表筛选条件,json格式
		whereJson2 = {}, // 副表筛选条件,json格式 对_id字段无效
		pageIndex = 1, // 默认第一页开始
		pageSize = 10, // 默认每页加载10条数据
		getCount = false, // 是否同时返回总数(会执行count)
		sortArr = [], // 主表排序数组
		fieldJson = {}, // 主表字段显示规则,若field不传,则默认返回全部字段
		fieldJson2 = {}, // 副表字段显示规则,若field不传,则默认返回全部字段
		as, // 副表信息插入到主表里的字段名称,如果输入记录中本来就已有该字段，则该字段会被覆写
	} = event;
	// 数据库API开始----------------------------------------------------------
	if (!as) as = dbName2;
	if (JSON.stringify(whereJson) === "{}") {
		whereJson = {
			_id: _.neq("___")
		};
	}
	if (pageSize == -1) {
		pageIndex = 1;
		pageSize = 999999999;
		getCount = false;
	}
	let total = 0;
	let hasMore = false; // 提示前端是否还有数据

	if (getCount) {
		let countResult = await db.collection(dbName).where(whereJson).count(); // 集合总数
		total = countResult.total; // 总记录数
		let totalPage = Math.ceil(total / pageSize);
		if (pageIndex < totalPage) {
			hasMore = true;
		}
	}
	let res = {};
	const $ = _.aggregate
	let result = db.collection(dbName).aggregate();
	// 主表where条件
	if (whereJson && JSON.stringify(whereJson) !== "{}") {
		result = result.match(whereJson);
	}
	// 主表字段显示规则
	if (fieldJson && JSON.stringify(fieldJson) !== "{}") {
		result = result.project(fieldJson);
	}
	// 主表排序规则
	if (sortArr && JSON.stringify(sortArr) !== "[]") {
		let sortJson = {};
		for (let i in sortArr) {
			let g = sortArr[i];
			let name = g.name;
			let type = g.type;
			if (type == undefined || type == "" || type == "asc") {
				type = 1;
			} else {
				type = -1;
			}
			sortJson[name] = type;
		}
		result = result.sort(sortJson);
	}
	// 分页数据
	result = result.skip((pageIndex - 1) * pageSize).limit(pageSize);
	// 连表开始-----------------------------------------------------------
	let pipelineJson = $.pipeline()
		.match(_.expr($.and([
			$.eq(['$' + foreignKey2, '$$foreignKey' + foreignKey])
		])));
	// 副表where条件
	if (whereJson2 && JSON.stringify(whereJson2) !== "{}") {
		pipelineJson = pipelineJson.match(whereJson2);
	}
	// 副表字段显示规则
	if (fieldJson2 && JSON.stringify(fieldJson2) !== "{}") {
		pipelineJson = pipelineJson.project(fieldJson2);
	}
	pipelineJson = pipelineJson.done();
	let letJson = {};
	letJson['foreignKey' + foreignKey] = '$' + foreignKey;
	let lookupJson = {
		from: dbName2,
		let: letJson,
		pipeline: pipelineJson,
		as: as,
	};
	result = result.lookup(lookupJson);
	// 连表结束-----------------------------------------------------------
	// 获取结果
	result = await result.end();
	let rows = result.data;
	for (let i in rows) {
		if (rows[i][as] && rows[i][as].length > 0) {
			rows[i][as] = rows[i][as][0];
		} else {
			rows[i][as] = {};
		}
	}
	res.rows = rows; // 两表连接合并后的数据
	res.hasMore = hasMore; // 为true,代表还可下一页
	res.total = total; // 主表的总记录数
	res.key = 1;
	res.code = 0;
	return res;
	// 数据库API结束----------------------------------------------------------
}
// 双表连接(一对多)
baseDao.select2_OneToMany = async function(event, util) {
	let {
		db,
		_,
		vk
	} = util;
	let {
		dbName, // 主表名
		dbName2, // 副表名
		foreignKey = "_id", // 主表用于和副表连接的外键字段名(该字段应为主表的外键,默认为主表的主键_id)
		foreignKey2 = "_id", // 副表用于和主表连接的外键字段名(默认为副表的主键_id)
		whereJson = {}, // 主表筛选条件,json格式
		whereJson2 = {}, // 副表筛选条件,json格式 对_id字段无效
		pageIndex = 1, // 默认第一页开始
		pageSize = 10, // 默认每页加载10条数据
		getCount = false, // 是否同时返回总数(会执行count)
		sortArr = [], // 主表排序数组
		sortArr2 = [], // 副表排序数组
		fieldJson = {}, // 主表字段显示规则,若field不传,则默认返回全部字段
		fieldJson2 = {}, // 副表字段显示规则,若field不传,则默认返回全部字段
		as, // 副表信息插入到主表里的字段名称,如果输入记录中本来就已有该字段，则该字段会被覆写
	} = event;
	// 数据库API开始----------------------------------------------------------
	if (!as) as = dbName2;
	if (JSON.stringify(whereJson) === "{}") {
		whereJson = {
			_id: _.neq("___")
		};
	}
	if (pageSize == -1) {
		pageIndex = 1;
		pageSize = 999999999;
		getCount = false;
	}
	let total = 0;
	let hasMore = false; // 提示前端是否还有数据

	if (getCount) {
		let countResult = await db.collection(dbName).where(whereJson).count(); // 集合总数
		total = countResult.total; // 总记录数
		let totalPage = Math.ceil(total / pageSize);
		if (pageIndex < totalPage) {
			hasMore = true;
		}
	}
	let res = {};
	const $ = _.aggregate
	let result = db.collection(dbName).aggregate();
	// 主表where条件
	if (whereJson && JSON.stringify(whereJson) !== "{}") {
		result = result.match(whereJson);
	}
	// 主表字段显示规则
	if (fieldJson && JSON.stringify(fieldJson) !== "{}") {
		result = result.project(fieldJson);
	}
	// 主表排序规则
	if (sortArr && JSON.stringify(sortArr) !== "[]") {
		let sortJson = {};
		for (let i in sortArr) {
			let g = sortArr[i];
			let name = g.name;
			let type = g.type;
			if (type == undefined || type == "" || type == "asc") {
				type = 1;
			} else {
				type = -1;
			}
			sortJson[name] = type;
		}
		result = result.sort(sortJson);
	}
	// 分页数据
	result = result.skip((pageIndex - 1) * pageSize).limit(pageSize);
	// 连表开始-----------------------------------------------------------
	let pipelineJson = $.pipeline()
		.match(_.expr($.and([
			$.eq(['$' + foreignKey2, '$$foreignKey' + foreignKey])
		])));
	// 副表where条件
	if (whereJson2 && JSON.stringify(whereJson2) !== "{}") {
		pipelineJson = pipelineJson.match(whereJson2);
	}
	// 副表字段显示规则
	if (fieldJson2 && JSON.stringify(fieldJson2) !== "{}") {
		pipelineJson = pipelineJson.project(fieldJson2);
	}
	// 副表排序规则
	if (sortArr2 && JSON.stringify(sortArr2) !== "[]") {
		let sortJson = {};
		for (let i in sortArr2) {
			let sortItem = sortArr2[i];
			let name = sortItem.name;
			let type = sortItem.type;
			if (type == undefined || type == "" || type == "asc") {
				type = 1; // 升序
			} else {
				type = -1; // 降序
			}
			sortJson[name] = type;
		}
		pipelineJson = pipelineJson.sort(sortJson);
	}

	pipelineJson = pipelineJson.done();
	let letJson = {};
	letJson['foreignKey' + foreignKey] = '$' + foreignKey;
	let lookupJson = {
		from: dbName2,
		let: letJson,
		pipeline: pipelineJson,
		as: as,
	};
	result = result.lookup(lookupJson);
	// 连表结束-----------------------------------------------------------
	// 获取结果
	result = await result.end();
	res.rows = result.data; // 两表连接合并后的数据
	res.hasMore = hasMore; // 为true,代表还可下一页
	res.total = total; // 主表的总记录数
	res.key = 1;
	res.code = 0;
	return res;
	// 数据库API结束----------------------------------------------------------
}
// 获取select需要的参数
baseDao.getSelectData = async function(event, util) {
	let {
		db,
		_
	} = util;
	let {
		dbName,
		whereJson,
		pageIndex = 1,
		pageSize = 10,
		getCount = false
	} = event;
	if (!whereJson || JSON.stringify(whereJson) === "{}") {
		whereJson = {
			_id: _.neq("___")
		};
	}
	// 封装数据参数开始----------------------------------------------------------
	if (pageSize == -1) {
		pageIndex = 1;
		pageSize = 999999999;
		getCount = true;
	}
	let sortArr = event.sortArr; // 排序数组
	let fieldJson = event.fieldJson; // 需要返回的字段,若field不传,则默认返回全部字段
	let total = 0;
	let hasMore = false; //提示前端是否还有数据
	if (getCount) {
		let countResult = await db.collection(dbName).where(whereJson).count(); // 集合总数
		total = countResult.total; //总记录数
		let totalPage = Math.ceil(total / pageSize);
		if (pageIndex < totalPage) {
			hasMore = true;
		}
	}
	let result = db.collection(dbName);
	if (fieldJson) {
		result = result.field(fieldJson);
	}
	if (whereJson) {
		result = result.where(whereJson);
	}
	if (sortArr) {
		// 这里用数组形式是为了有序
		for (let i in sortArr) {
			let g = sortArr[i];
			let name = g.name;
			let type = g.type;
			if (type == undefined || type == "") {
				type = "asc";
			}
			result = result.orderBy(name, type);
		}
	}
	return {
		result: result, // 结果集
		dbName: dbName, // 数据库表名
		whereJson: whereJson, // 判断条件
		pageIndex: pageIndex, // 当前页码
		pageSize: pageSize, // 每页大小
		getCount: getCount, // 是否需要分页
		sortArr: sortArr, // 需要排序对象
		fieldJson: fieldJson, // 参数选择对象
		total: total, // 总记录数
		hasMore: hasMore, // 是否还有数据
	}
	// 封装数据参数结束----------------------------------------------------------
}

baseDao.selectAll = async function(event, util) {
	let {
		db,
		_,
		vk,
		config
	} = util;
	let dbName = event.dbName; // 表名
	let json = {};
	// 数据库API开始----------------------------------------------------------
	let MAX_LIMIT = 500; // 最大一次获取500条数据(云服务商限制)
	if(vk.pubfn.getData(config, "vk.db.unicloud")){
		MAX_LIMIT = vk.pubfn.getData(config, "vk.db.unicloud.max_limit");
	}
	let pageSize = event.pageSize ? event.pageSize : 10; // 默认10条数据
	pageSize = pageSize > 0 ? pageSize : 999999999;
	
	//event.getCount = true;
	
	// 获取select对象开始-----------------------------------------------------------
	let selectDataObj = await baseDao.getSelectData(event, util);
	let {
		result, // 结果集
		hasMore, // 是否还有数据
		total, // 总记录数
		getCount, // 是否同时返回总数(会执行count)
		pageIndex // 当前页码
	} = selectDataObj;
	if(pageSize > 0 && !total){
		total = pageSize;
	}
	// 获取select对象结束-----------------------------------------------------------
	// 计算需分几次获取数据
	let t1 = total;
	if (pageSize < total) {
		t1 = pageSize;
	}
	let batchTimes = Math.ceil(t1 / MAX_LIMIT);
	// 承载所有读操作的 promise 的数组
	let tasks = [];
	let n0 = (pageIndex - 1) * pageSize; // 数据起始值
	let n0_2 = n0 + pageSize;
	for (let i = 0; i < batchTimes; i++) {
		let n1 = n0 + i * MAX_LIMIT;
		let n2 = MAX_LIMIT;
		let n2_2 = n1 + MAX_LIMIT;
		if (n2_2 > n0_2) {
			n2 = n0_2 - n1;
		}
		let promise = result.skip(n1).limit(n2).get();
		tasks.push(promise);
	}
	// 等待所有
	let res = {};
	try {
		res = (await Promise.all(tasks)).reduce((acc, cur) => ({
			data: acc.data.concat(cur.data),
			errMsg: acc.errMsg,
		}));
	} catch (e) {
		console.error("selectAll-异常", event, e);
		res = {
			data: []
		};
	}

	json.rows = res.data; // 总结果集
	json.key = 1; // 请求成功
	json.code = 0; // 请求成功
	json.hasMore = hasMore; // 是否还有数据
	json.pageIndex = pageIndex;
	json.pageSize = pageSize;
	if (getCount) {
		json.total = total;
	} else {
		json.total = res.data ? res.data.length : 0;
	}
	return json;
	//数据库API结束----------------------------------------------------------
}
/**
 * sum(根据条件求和) 
 * 若数据条数大于10万以上,可能会有问题
 * @params {Object} event 请求参数
 * @params {Object} util 公共工具包
 * event 请求参数 说明
 * @params {String} dbName  	表名
 * @params {String} whereJson 查询条件
 * @params {String} fieldName   需求求和的字段名(比如是数值类型的字段)
 * res 返回值为单行记录
 * 调用示例:
	res = await vk.baseDao.sum({
		dbName:dbName,
		fieldName:"money",
		whereJson:{
			
		}
	}, event.util);
 */
baseDao.sum = async function(event, util) {
	let {
		db,
		_
	} = util;
	let {
		dbName,
		fieldName,
		whereJson
	} = event;
	if (!whereJson || JSON.stringify(whereJson) === "{}") {
		whereJson = {
			_id: _.neq("___")
		};
	}
	const $ = db.command.aggregate;
	// 数据库API开始----------------------------------------------------------
	try {
		let res = await db.collection(dbName).aggregate()
			.match(whereJson)
			.group({
				_id: null,
				num: $.sum('$' + fieldName)
			})
			.end();
		return res.data[0].num;
	} catch (e) {
		console.error(e);
		return null;
	}
	// 数据库API结束----------------------------------------------------------
}
/**
 * avg(根据条件求平均值) 
 */
baseDao.avg = async function(event, util) {
	let {
		db,
		_
	} = util;
	let {
		dbName,
		fieldName,
		whereJson
	} = event;
	if (!whereJson || JSON.stringify(whereJson) === "{}") {
		whereJson = {
			_id: _.neq("___")
		};
	}
	const $ = db.command.aggregate;
	// 数据库API开始----------------------------------------------------------
	try {
		let res = await db.collection(dbName).aggregate()
			.match(whereJson)
			.group({
				_id: null,
				num: $.avg('$' + fieldName)
			})
			.end();
		return res.data[0].num;
	} catch (e) {
		console.error(e);
		return null;
	}
	// 数据库API结束----------------------------------------------------------
}
/**
 * max(根据条件求最大值) 
 */
baseDao.max = async function(event, util) {
	let {
		db,
		_
	} = util;
	let {
		dbName,
		fieldName,
		whereJson
	} = event;
	if (!whereJson || JSON.stringify(whereJson) === "{}") {
		whereJson = {
			_id: _.neq("___")
		};
	}
	const $ = db.command.aggregate;
	// 数据库API开始----------------------------------------------------------
	try {
		let res = await db.collection(dbName).aggregate()
			.match(whereJson)
			.group({
				_id: null,
				num: $.max('$' + fieldName)
			})
			.end();
		return res.data[0].num;
	} catch (e) {
		console.error(e);
		return null;
	}
	// 数据库API结束----------------------------------------------------------
}
/**
 * min(根据条件求最小值) 
 */
baseDao.min = async function(event, util) {
	let {
		db,
		_
	} = util;
	let {
		dbName,
		fieldName,
		whereJson
	} = event;
	if (!whereJson || JSON.stringify(whereJson) === "{}") {
		whereJson = {
			_id: _.neq("___")
		};
	}
	const $ = db.command.aggregate;
	// 数据库API开始----------------------------------------------------------
	try {
		let res = await db.collection(dbName).aggregate()
			.match(whereJson)
			.group({
				_id: null,
				num: $.min('$' + fieldName)
			})
			.end();
		return res.data[0].num;
	} catch (e) {
		console.error(e);
		return null;
	}
	// 数据库API结束----------------------------------------------------------
}
/**
 * 多表查询(支持多张表连接查询)(理论上不限连表数量)
 * 具体使用请前往 https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/%E5%A4%9A%E8%A1%A8%E8%BF%9E%E6%8E%A5%20selects%20?sort_id=3028633
 */
baseDao.selects = async function(event, util) {
	let {
		db,
		_,
		vk
	} = util;
	let {
		dbName, // 主表名
		foreignKey = "_id", // 主表用于和副表连接的外键字段名(该字段应为主表的外键,默认为主表的主键_id)
		whereJson = {}, // 主表筛选条件,json格式
		pageIndex = 1, // 默认第一页开始
		pageSize = 10, // 默认每页加载10条数据
		getCount = false, // 是否同时返回总数(会执行count)
		sortArr = [], // 主表排序数组
		fieldJson = {}, // 主表字段显示规则,若field不传,则默认返回全部字段
		foreignDB = []
	} = event;
	// 数据库API开始----------------------------------------------------------
	if (JSON.stringify(whereJson) === "{}") {
		whereJson = {
			_id: _.neq("___")
		};
	}
	if (pageSize == -1) {
		pageIndex = 1;
		pageSize = 999999999;
		getCount = false;
	}
	let total = 0;
	let hasMore = false; // 提示前端是否还有数据

	if (getCount) {
		let countResult = await db.collection(dbName).where(whereJson).count(); // 集合总数
		total = countResult.total; // 总记录数
		let totalPage = Math.ceil(total / pageSize);
		if (pageIndex < totalPage) {
			hasMore = true;
		}
	}
	let res = {};
	const $ = _.aggregate
	let result = db.collection(dbName).aggregate();
	// 主表where条件
	if (whereJson && JSON.stringify(whereJson) !== "{}") {
		result = result.match(whereJson);
	}
	// 主表字段显示规则
	if (fieldJson && JSON.stringify(fieldJson) !== "{}") {
		result = result.project(fieldJson);
	}
	// 主表排序规则
	if (sortArr && JSON.stringify(sortArr) !== "[]") {
		let sortJson = {};
		for (let i in sortArr) {
			let g = sortArr[i];
			let name = g.name;
			let type = g.type;
			if (type == undefined || type == "" || type == "asc") {
				type = 1;
			} else {
				type = -1;
			}
			sortJson[name] = type;
		}
		result = result.sort(sortJson);
	}
	// 分页数据
	result = result.skip((pageIndex - 1) * pageSize).limit(pageSize);
	// 连表开始-----------------------------------------------------------
	for (let i in foreignDB) {
		let {
			dbName: dbName2,
			foreignKey: foreignKey2,
			as,
			limit: limit2,
			whereJson: whereJson2,
			fieldJson: fieldJson2,
			sortArr: sortArr2,
		} = foreignDB[i];
		if (!as) as = dbName2;
		let pipelineJson = $.pipeline()
			.match(_.expr($.and([
				$.eq(['$' + foreignKey2, '$$foreignKey' + foreignKey])
			])));
		// 副表where条件
		if (whereJson2 && JSON.stringify(whereJson2) !== "{}") {
			pipelineJson = pipelineJson.match(whereJson2);
		}
		// 副表限制查询条数,若值为1,则返回的是对象,否则返回的是数组
		if (limit2) {
			pipelineJson = pipelineJson.limit(limit2);
		}
		// 副表字段显示规则
		if (fieldJson2 && JSON.stringify(fieldJson2) !== "{}") {
			pipelineJson = pipelineJson.project(fieldJson2);
		}
		// 副表排序规则
		if (sortArr2 && JSON.stringify(sortArr2) !== "[]") {
			let sortJson = {};
			for (let i in sortArr2) {
				let sortItem = sortArr2[i];
				let name = sortItem.name;
				let type = sortItem.type;
				if (type == undefined || type == "" || type == "asc") {
					type = 1; // 升序
				} else {
					type = -1; // 降序
				}
				sortJson[name] = type;
			}
			pipelineJson = pipelineJson.sort(sortJson);
		}
		pipelineJson = pipelineJson.done();
		let letJson = {};
		letJson['foreignKey' + foreignKey] = '$' + foreignKey;
		let lookupJson = {
			from: dbName2,
			let: letJson,
			pipeline: pipelineJson,
			as: as,
		};
		result = result.lookup(lookupJson);
	}
	// 连表结束-----------------------------------------------------------
	// 获取结果
	result = await result.end();
	let rows = result.data;
	for (let i in rows) {
		for (let j in foreignDB) {
			let {
				as,
				limit,
			} = foreignDB[j];
			if (limit === 1) {
				if (rows[i][as] && rows[i][as].length > 0) {
					rows[i][as] = rows[i][as][0];
				} else {
					rows[i][as] = {};
				}
			}
		}
	}
	res.rows = rows; // 两表连接合并后的数据
	res.hasMore = hasMore; // 为true,代表还可下一页
	res.total = total; // 主表的总记录数
	res.key = 1;
	res.code = 0;
	return res;
	// 数据库API结束----------------------------------------------------------


}

module.exports = baseDao
