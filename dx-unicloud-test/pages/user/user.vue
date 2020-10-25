<template>
	<view>
		uni-id测试
		<button @click="regist"> 注册用户</button>
		<button @click="login">用户登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			login(){
				uniCloud.callFunction({
						name: 'user-login',
						data: {
							username: 'tom',
							password: '123456'
						}
					})
					.then(res => {
						console.log("res:", res)
					}, err => {
						console.log("错误了！！！", err)
					});
			},
			regist() {
				uniCloud.callFunction({
						name: 'user-register',
						data: {
							username: 'tom',
							password: '123456'
						}
					})
					.then(res => {
						console.log("res:", res)
					}, err => {
						console.log("错误了！！！", err)
					});
			},
		}
	}
</script>

<style scoped>

</style>
