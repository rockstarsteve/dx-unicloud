<template>
	<view class="content">
		<button @click="getSysInfo">获取当前请求对象信息</button>
		<button @click="insertData">保存数据</button>
		<button @click="getData">获取列表数据</button>
		<button @click="findData">查询数据</button>
		<button @click="deleteData">删除数据</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
				
		},
		methods: {
			findData(){
				uniCloud.callFunction({
						name: 'find',
						data: {
							name: 'tom'
						}
					})
					.then(res => {
						console.log("res:", res)
					}, err => {
						console.log("错误了！！！", err)
					});
			},
			/**
			 * 删除数据
			 */
			deleteData() {
				// promise方式
				uniCloud.callFunction({
						name: 'delete',
						data: {}
					})
					.then(res => {
						console.log("res:", res)
					}, err => {
						console.log("错误了！！！", err)
					});
			},
			/**
			 * 获取请求信息
			 */
			getSysInfo() {
				// promise方式
				uniCloud.callFunction({
						name: 'getCurrInfo'
					})
					.then(res => {
						console.log("res:", res)
					}, err => {
						console.log("错误了！！！", err)
					});
			},
			/**
			 * 插入数据
			 */
			insertData() {
				// promise方式
				uniCloud.callFunction({
						name: 'save',
						data: {
							name: 'tom'
						}
					})
					.then(res => {
						console.log("res:", res)
					}, err => {
						console.log("错误了！！！", err)
					});
			},
			/**
			 * 获取数据
			 */
			getData() {
				// promise方式
				uniCloud.callFunction({
						name: 'getList',
						data: {}
					})
					.then(res => {
						console.log("res:", res)
					}, err => {
						console.log("错误了！！！", err)
					});
			}


		}
	}
</script>

<style lang="scss" scoped>
	.content {}
</style>
