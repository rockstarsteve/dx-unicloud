<template>
	<view>
		<view class="content">
			测试：
		</view>
		<input type="text" focus v-model="username" />
		<input type="text" focus v-model="password" />
		<button @click="register">注册</button>
		<button @click="login">登录</button>
		<input type="text" focus v-model="input1" />
		<button @click="getCommonMethod">测试函数</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				input1: '123',
				username: '',
				password: ''
			}
		},
		methods: {
			register(){
				let _this = this
				uniCloud.callFunction({
						name: 'server',
						data: {
							url: '/pub/register',
							username:  _this.username,
							password: _this.password
						}
					})
					.then(res => {
						console.log("res:", res)
						uni.showToast({
							title: JSON.stringify(res.result),
							duration: 5000
						});
					}, err => {
						console.log("错误了！！！", err)
					});
			},
			login(){
				let _this = this
				uniCloud.callFunction({
						name: 'server',
						data: {
							url: '/pub/login',
							username:  _this.username,
							password: _this.password
						}
					})
					.then(res => {
						console.log("res:", res)
						uni.showToast({
							title: JSON.stringify(res.result),
							duration: 5000
						});
					}, err => {
						console.log("错误了！！！", err)
					});
			},
			getCommonMethod() {
				let _this = this
				uniCloud.callFunction({
						name: 'server',
						data: {
							url: '/login/getLogList',
							token: _this.input1
						}
					})
					.then(res => {
						console.log("res:", res)
						uni.showToast({
							title: JSON.stringify(res.result),
							duration: 5000
						});
					}, err => {
						console.log("错误了！！！", err)
					});
			}
		}
	}
</script>

<style>

</style>
