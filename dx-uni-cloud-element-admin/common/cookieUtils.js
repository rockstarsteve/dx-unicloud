export default class cookieUtils {

	/**
	 * 写Cookie
	 */
	static addCookie(objName, objValue, objHours = 0) {
		console.log("setcookie:", objValue);
		
		if(objValue){
			var str = objName + "=" + escape(JSON.stringify(objValue)); //编码
		}else{
			var str = objName + "=" + escape(objValue); //编码
		}
		
		if (objHours > 0) { //为0时不设定过期时间，浏览器关闭时cookie自动消失
			var date = new Date();
			var ms = objHours * 3600 * 1000;
			date.setTime(date.getTime() + ms);
			str += "; expires=" + date.toGMTString();
		}
		document.cookie = str;
	}

	/**
	 * 读Cookie
	 * @param {Object}
	 */
	static getCookie(objName) { //获取指定名称的cookie的值

		var arrStr = document.cookie.split("; ");
		for (var i = 0; i < arrStr.length; i++) {
			var temp = arrStr[i].split("=");
			if (temp[0] == objName) {
				console.log("getCookie:", unescape(temp[1]));
				return unescape(temp[1]); //解码
			}

		}
		return "";
	}

	/**
	 * 读Cookie
	 * @param {Object} objName
	 */
	static delCookie(objName) { //获取指定名称的cookie的值
		this.addCookie(objName, "", -1);
		return "";
	}

}
