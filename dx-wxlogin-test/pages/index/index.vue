<template>
	<view class="content">
		手机号:<input type="text" placeholder="手机号" v-model="mobile" />
		用户名:<input type="text" placeholder="用户名" v-model="username" />
		密码:<input type="text" placeholder="密码" v-model="password" />
		登录info：{{info}}
		<button @tap="register">注册</button>
		<button @tap="loginByWeixin">微信登录</button>
		<button @tap="loginByPassword">用户名密码登录</button>
		<button @tap="bindWeixin">用户名密码后再次微信绑定</button>
		<button @tap="checkToken">校验token</button>
		<button @tap="bindPhone">绑定手机号码</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				mobile: '',
				hasWeixinAuth: false,
				info: ''
			}
		},
		onLoad() {},
		methods: {
			/**
			 * 绑定微信
			 */
			bindWeixin() {
				const _this = this
				this.getWeixinCode().then((code) => {
					console.log("开始调用云函数。。。。 。");
					uniCloud.callFunction({
							name: 'user-center',
							data: {
								action: 'bindWeixin',
								params: {
									uniIdToken: uni.getStorageSync('uniIdToken'),
									code: code
								}
							}
						})
						.then(res => {
							console.log("用户名密码登录结果 res:", res)
							if (res.result.code == 0) {
								uni.showToast({
									title: '绑定成功',
									icon: 'none'
								})
							} else {
								uni.showToast({
									title: '绑定失败',
									icon: 'none'
								})
							}
						}, err => {
							console.log("未知错误", err)
							uni.showToast({
								title: '未知错误',
								icon: 'none'
							})
						})

				}, (error) => {
					console.log("获取code错误: ", error)
					uni.showModal({
						showCancel: false,
						content: '微信获取code，请稍后再试'
					})
				})
			},
			/**
			 * 用户名密码登录
			 */
			loginByPassword() {
				const _this = this
				uniCloud.callFunction({
						name: 'user-center',
						data: {
							action: 'login',
							params: {
								username: _this.username,
								password: _this.password
							}
						}
					})
					.then(res => {
						console.log("用户名密码登录结果 res:", res)
						if (res.result.code == 0) {
							uni.setStorageSync('uniIdToken', res.result.token)
							uni.showToast({
								title: '用户名密码登录成功',
								icon: 'none'
							})
						} else {
							uni.showToast({
								title: '用户名密码登录失败',
								icon: 'none'
							})
						}
					}, err => {
						console.log("用户名密码登录错误", err)
						uni.showToast({
							title: '用户名密码登录错误',
							icon: 'none'
						})
					})
			},
			/**
			 * 注册用户
			 */
			register() {
				const _this = this
				uniCloud.callFunction({
						name: 'user-center',
						data: {
							action: 'register',
							params: {
								username: _this.username,
								password: _this.password
							}
						}
					})
					.then(res => {
						console.log("注册结果 res:", res)
						if (res.result.code == 0) {
							uni.showToast({
								title: '注册成功',
								icon: 'none'
							})
						} else {
							uni.showToast({
								title: '注册失败',
								icon: 'none'
							})
						}
					}, err => {
						console.log("系统错误", err)
						uni.showToast({
							title: '系统错误',
							icon: 'none'
						})
					})
			},
			/**
			 * 绑定手机号码
			 */
			bindPhone() {
				const _this = this
				uniCloud.callFunction({
						name: 'user-center',
						data: {
							action: 'bindMobile',
							mobile: _this.mobile,
							uid: uni.getStorageSync('uniIdToken')
						}
					})
					.then(res => {
						console.log("绑定手机号码 res:", res)
					}, err => {
						console.log("绑定手机号码错误了！！！", err)
					});
			},
			/**
			 * 校验token
			 */
			checkToken() {
				uniCloud.callFunction({
						name: 'user-center',
						data: {
							action: 'checkToken',
							token: uni.getStorageSync('uniIdToken')
						}
					})
					.then(res => {
						console.log("checkToken res:", res)
					}, err => {
						console.log("checkToken错误了！！！", err)
					});
			},
			/**
			 * 获取微信code
			 */
			getWeixinCode() {
				return new Promise((resolve, reject) => {
					uni.login({
						provider: 'weixin',
						success(res) {
							console.log('微信login sucess：', res)
							resolve(res.code)
						},
						fail(err) {
							console.log('微信login err：', err)
							reject(new Error('微信登录失败'))
						}
					})
				})
			},
			/**
			 * 获取微信的openid
			 */
			code2SessionWeixin() {
				this.getWeixinCode().then((code) => {
					console.log("开始调用云函数。。。。。");
					//获取openid
					return uniCloud.callFunction({
						name: 'user-center',
						data: {
							action: 'code2SessionWeixin',
							params: {
								code,
							}
						}
					}).then(res => {
						console.log("res:", res)
					}, err => {
						console.log("错误了！！！", err)
					});
				}, (error) => {
					console.log("后台openid错误:", e)
					uni.showModal({
						showCancel: false,
						content: '微信openid错误，请稍后再试'
					})
				})
			},
			/**
			 * 登录微信
			 */
			loginByWeixin() {
				const _this = this
				this.getWeixinCode().then((code) => {
					//登录
					return uniCloud.callFunction({
						name: 'user-center',
						data: {
							action: 'loginByWeixin',
							params: {
								code,
							}
						}
					})
				}).then((res) => {
					console.log("登录成功 :", res)
					_this.info = res.result.message
					if (res.result.code === 0) {
						uni.setStorageSync('uniIdToken', res.result.token)
					}
				}).catch((e) => {
					console.log("后台登录微信错误:", e)
					uni.showModal({
						showCancel: false,
						content: '微信登录失败，请稍后再试'
					})
				})
			}

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
