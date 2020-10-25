'use strict';

// const db = uniCloud.database()
// const log = db.collection('log')

exports.main = async (event, context) => {
	const uniID = require('uni-id')
	const {
		username,
		password
	} = event
	// log.add(event)
	// username、password验证是否合法的逻辑
	const res = await uniID.register({
		username,
		password
	})
	return uniID
};
