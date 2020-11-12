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
		<button @click="getLoginCommonMethod">测试登录后带token访问的函数</button>
		<button @click="getAuthCommonMethod">测试后台登录后带token访问的函数</button>
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
						sessionStorage.setItem("uniIdToken",res.result.token)
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
						sessionStorage.setItem("uniIdToken",res.result.token)
						uni.showToast({
							title: JSON.stringify(res.result),
							duration: 5000
						});
					}, err => {
						console.log("错误了！！！", err)
					});
			},
			getLoginCommonMethod() {
				let _this = this
				uniCloud.callFunction({
						name: 'server',
						data: {
							uniIdToken: sessionStorage.getItem("uniIdToken"),
							url: '/login/getLogList',
							input1: _this.input1
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
			getAuthCommonMethod() {
				let _this = this
				uniCloud.callFunction({
						name: 'server',
						data: {
							uniIdToken: sessionStorage.getItem("uniIdToken"),
							url: '/sys/getAuthList',
							input1: _this.input1
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
