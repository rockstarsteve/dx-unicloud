<template>
	<view>
		<view class="" style="color: red;">
			没有做管理员的判断，任意用户都能注册用户，请不要随意使用！
		</view>
		<view class="input-line">用户名： <input type="text" focus v-model="username" /></view>
		<view class="input-line">密码： <input type="text" focus v-model="password" /></view>
		<button @click="register">注册</button>
		<button @click="login">模拟看是否能登录</button>
		<view class="input-line">请求参数： <input type="text" focus v-model="requestData" /></view>
		<button @click="getCommonMethod">普通访问函数</button>
		<button @click="getLoginCommonMethod">测试登录后带token访问的函数</button>
		<button @click="getAuthCommonMethod">测试后台登录后带token访问的函数</button>

		<view class="input-line">角色Id，唯一标识： <input type="text" focus v-model="roleID" /></view>
		<view class="input-line">角色名称，展示用 ：<input type="text" focus v-model="roleName" /></view>
		<view class="input-line">备注： <input type="text" focus v-model="comment" /></view>
		<view class="input-line">权限Id（permission_id）列表： <input type="text" focus v-model="permission[0]" /></view>
		<button @click="addRole">新增角色</button>

		<view class="input-line">权限Id，唯一标识： <input type="text" focus v-model="permissionID" /></view>
		<view class="input-line">权限名称，展示用： <input type="text" focus v-model="permissionName" /></view>
		<view class="input-line">备注： <input type="text" focus v-model="comment" /></view>
		<button @click="addPermission">新增权限</button>

		<view class="input-line">绑定用户的id： <input type="text" focus v-model="userId" /></view>
		<view class="input-line">角色： <input type="text" focus v-model="roleList[0]" /></view>
		<button @click="bindRole">为用户绑定角色</button>

		<view class="input-line">用户Id： <input type="text" focus v-model="roleID" /></view>
		<view class="input-line">权限Id（permission_id）列表： <input type="text" focus v-model="permissionList[0]" /></view>
		<button @click="bindPermission">为角色绑定权限</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				requestData: '',
				username: '',
				password: '',
				roleID: '',
				roleName: '',
				comment: '',
				permission: [],
				permissionID: '',
				permissionName: '',
				permissionList: [],
				userId: '',
				roleList: []
			}
		},
		methods: {
			bindPermission() {
				let _this = this
				uniCloud.callFunction({
						name: 'server',
						data: {
							uniIdToken: sessionStorage.getItem("uniIdToken"),
							url: '/sys/bindPermission',
							roleID: _this.roleID,
							permissionList: _this.permissionList
						}
					})
					.then(res => {
						console.log("res:", res)
						uni.showToast({
							title: JSON.stringify(res.result.msg),
							duration: 5000
						});
					}, err => {
						console.log("错误了！！！", err)
					});
			},
			bindRole() {
				let _this = this
				uniCloud.callFunction({
						name: 'server',
						data: {
							uniIdToken: sessionStorage.getItem("uniIdToken"),
							url: '/sys/bindRole',
							userId: _this.userId,
							roleList: _this.roleList
						}
					})
					.then(res => {
						console.log("res:", res)
						uni.showToast({
							title: JSON.stringify(res.result.msg),
							duration: 5000
						});
					}, err => {
						console.log("错误了！！！", err)
					});
			},
			addPermission() {
				let _this = this
				uniCloud.callFunction({
						name: 'server',
						data: {
							uniIdToken: sessionStorage.getItem("uniIdToken"),
							url: '/sys/addPermission',
							permissionID: _this.permissionID,
							permissionName: _this.permissionName,
							comment: _this.comment,
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
			addRole() {
				let _this = this
				uniCloud.callFunction({
						name: 'server',
						data: {
							uniIdToken: sessionStorage.getItem("uniIdToken"),
							url: '/sys/addRole',
							roleID: _this.roleID,
							roleName: _this.roleName,
							comment: _this.comment,
							permission: _this.permission
						}
					})
					.then(res => {
						console.log("res:", res)
						uni.showToast({
							title: JSON.stringify(res.result.msg),
							duration: 5000
						});
					}, err => {
						console.log("错误了！！！", err)
					});
			},
			register() {
				let _this = this
				uniCloud.callFunction({
						name: 'server',
						data: {
							url: '/pub/register',
							username: _this.username,
							password: _this.password
						}
					})
					.then(res => {
						console.log("res:", res)
						sessionStorage.setItem("uniIdToken", res.result.token)
						uni.showToast({
							title: JSON.stringify(res.result.msg),
							duration: 5000
						});
					}, err => {
						console.log("错误了！！！", err)
					});
			},
			login() {
				let _this = this
				uniCloud.callFunction({
						name: 'server',
						data: {
							url: '/pub/login',
							username: _this.username,
							password: _this.password
						}
					})
					.then(res => {
						console.log("res:", res)
						// sessionStorage.setItem("uniIdToken", res.result.token)
						uni.showToast({
							title: JSON.stringify(res.result.msg),
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
							url: '/sys/getLogList'
						}
					})
					.then(res => {
						console.log("res:", res)
						uni.showToast({
							title: JSON.stringify(res.result.msg),
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
							url: '/pub/getList'
						}
					})
					.then(res => {
						console.log("res:", res)
						uni.showToast({
							title: JSON.stringify(res.result.msg),
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
							url: '/sys/getAuthList'
						}
					})
					.then(res => {
						console.log("res:", res)
						uni.showToast({
							title: JSON.stringify(res.result.msg),
							duration: 5000
						});
					}, err => {
						console.log("错误了！！！", err)
					});
			}

		}
	}
</script>


<style lang="less" scoped>
	.console {}

	.input-line {
		display: flex;
	}
</style>
