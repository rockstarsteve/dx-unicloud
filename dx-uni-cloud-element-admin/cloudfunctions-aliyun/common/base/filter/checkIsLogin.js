const uniID = require('uni-id')
module.exports = {
  /**
   * 检测客户端用户是否已登陆
   */
  main: async (event) => {
		let {token} = event;
		let res = {code :-1, msg : '无权限'};
    // 业务逻辑开始----------------------------------------------------------- 
		let payload = await uniID.checkToken(event.uniIdToken);
		if (payload.code && payload.code > 0) {
			return payload;
		}
		// console.log("payload",payload);
		let userInfo = payload.userInfo;
		// 去除token字段和password字段
		delete userInfo.token;
		delete userInfo.password;
		res.uid = payload.uid;
		res.userInfo = userInfo;
		if(payload.token){
			res.token = payload.token;
			res.tokenExpired = payload.tokenExpired;
		}
		res.code = 0;
		res.msg = '调用成功';
    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }

}