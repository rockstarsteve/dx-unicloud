<template>
	<view>
		<view class="content">
			方法：
		</view>
		 <input type="text" focus v-model="input1" />
		<button @click="getCommonMethod">调用公共的函数</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				input1: '123'
			}
		},
		methods: {
			getCommonMethod(){
				let _this = this
				uniCloud.callFunction({
						name: 'server',
						data: {
							url: '/login/getList',
							token: _this.input1
						}
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

<style>

</style>
