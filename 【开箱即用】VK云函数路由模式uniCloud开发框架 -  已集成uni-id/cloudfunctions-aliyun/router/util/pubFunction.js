/**
 * 自定义公共函数包
 * 这里可以写你自己的公共函数
 */
var util = {};
// require封装，用于兼容阿里云和腾讯云
util.require = function(path){
	return require(__dirname+"/../"+path);
}
// 判断类型集合
util.checkStr = function (str, type){
	switch (type) {
		case 'mobile': //手机号码
			return new RegExp(/^1[3|4|5|6|7|8|9][0-9]{9}$/).test(str);
		case 'tel': //座机
			return new RegExp(/^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/).test(str);
		case 'card': //身份证
			return new RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(str);
		case 'mobileCode': //6位数字验证码
			return new RegExp(/^[0-9]{6}$/).test(str);
		case 'username': //账号以字母开头，长度在6~18之间，只能包含字母、数字和下划线
			return new RegExp(/^[a-zA-Z]([-_a-zA-Z0-9]{5,17})$/).test(str)
		case 'pwd': //密码长度在6~18之间，只能包含字母、数字和下划线
			return new RegExp(/^([a-zA-Z0-9_]){6,18}$/).test(str)
		case 'payPwd': //支付密码 6位纯数字
			return new RegExp(/^[0-9]{6}$/).test(str)
		case 'postal': //邮政编码
			return new RegExp(/[1-9]\d{5}(?!\d)/).test(str);
		case 'QQ': //QQ号
			return new RegExp(/^[1-9][0-9]{4,9}$/).test(str);
		case 'email': //邮箱
			return new RegExp(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/).test(str);
		case 'money': //金额(小数点2位)
			return new RegExp(/^\d*(?:\.\d{0,2})?$/).test(str);
		case 'URL': //网址
			return new RegExp(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/).test(str);
		case 'IP': //IP
			return new RegExp(/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/).test(str);
		case 'date': //日期 2014-01-01
			return new RegExp(/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/).test(str);
		case 'time': //时间 12:00:00
			return new RegExp(/^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/).test(str);
		case 'dateTime': //日期+时间 2014-01-01 12:00:00
			return new RegExp(/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/).test(str);
		case 'number': //数字
			return new RegExp(/^[0-9]*$/).test(str);
		case 'english': //英文
			return new RegExp(/^[a-zA-Z]+$/).test(str);
		case 'chinese': //中文
			return new RegExp(/^[\\u4E00-\\u9FA5]+$/).test(str);
		case 'lower': //小写
			return new RegExp(/^[a-z]+$/).test(str);
		case 'upper': //大写
			return new RegExp(/^[A-Z]+$/).test(str);
		case 'HTML': //HTML标记
			return new RegExp(/<("[^"]*"|'[^']*'|[^'">])*>/).test(str);
		default:
			return true;
	}
}
	
module.exports = util;
