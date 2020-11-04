module.exports = {
  /**
   * 检测客户端用户是否已登陆
   */
  main: async (event) => {
		let {token} = event;
		let res = {code :-1, msg : ''};
    // 业务逻辑开始----------------------------------------------------------- 
		// 在这里可以自己写自己的检测登陆逻辑
		if(token == '123'){
			res.code = 0;
			res.msg = 'ok';
		}else{
			res.code = 503;
			res.msg = 'no login';
		}
    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }

}