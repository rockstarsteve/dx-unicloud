'use strict';
const {
	getVersion,
	isLogin
} = require('hello-common')
exports.main = async (event, context) => {
	let login = isLogin(event)
	if(login=='ok'){
		return "ok"
	}else{
		return 'erro'
	}
}
