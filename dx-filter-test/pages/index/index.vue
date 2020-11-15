<template>
	<view>
		用户名 <input type="text" focus v-model="username" />
		密码 <input type="text" focus v-model="password" />
		<button @click="register">注册</button>
		<button @click="login">登录</button>
		参数： <input type="text" focus v-model="input1" />
		<button @click="getCommonMethod">普通访问函数</button>
		<button @click="getLoginCommonMethod">测试登录后带token访问的函数</button>
		<button @click="getAuthCommonMethod">测试后台登录后带token访问的函数</button>
		
		角色Id，唯一标识 <input type="text" focus v-model="roleID" />
		角色名称，展示用  <input type="text" focus v-model="roleName" />
		备注 <input type="text" focus v-model="comment" />
		权限Id（permission_id）列表  <input type="text" focus v-model="permission[0]" />
		<button @click="addRole">新增角色</button>
		
		权限Id，唯一标识 <input type="text" focus v-model="permissionID" />
		权限名称，展示用  <input type="text" focus v-model="permissionName" />
		备注 <input type="text" focus v-model="comment" />
		<button @click="addPermission">新增权限</button>
		
		绑定用户的id <input type="text" focus v-model="userId" />
		角色  <input type="text" focus v-model="roleList[0]" />
		<button @click="bindRole">为用户绑定角色</button>
		
		用户Id <input type="text" focus v-model="roleID" />
		权限Id（permission_id）列表  <input type="text" focus v-model="permissionList[0]" />
		<button @click="bindPermission">为角色绑定权限</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				input1: '123',
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
			bindPermission(){
				let _this = this
				uniCloud.callFunction({
						name: 'server',
						data: {
							uniIdToken: sessionStorage.getItem("uniIdToken"),
							url: '/login/bindPermission',
							roleID:  _this.roleID,
							permissionList: _this.permissionList
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
			bindRole(){
				let _this = this
				uniCloud.callFunction({
						name: 'server',
						data: {
							uniIdToken: sessionStorage.getItem("uniIdToken"),
							url: '/login/bindRole',
							userId:  _this.userId,
							roleList: _this.roleList
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
			addPermission(){
				let _this = this
				uniCloud.callFunction({
						name: 'server',
						data: {
							uniIdToken: sessionStorage.getItem("uniIdToken"),
							url: '/login/addPermission',
							permissionID: _this.permissionID,
							permissionName: _this.permissionName,
							comment:  _this.comment,
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
			addRole(){
				let _this = this
				uniCloud.callFunction({
						name: 'server',
						data: {
							uniIdToken: sessionStorage.getItem("uniIdToken"),
							url: '/login/addRole',
							roleID:  _this.roleID,
							roleName: _this.roleName,
							comment:  _this.comment,
							permission: _this.permission
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
			getCommonMethod() {
				let _this = this
				uniCloud.callFunction({
						name: 'server',
						data: {
							url: '/pub/getList',
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
