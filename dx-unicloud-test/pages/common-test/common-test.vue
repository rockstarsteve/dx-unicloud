<template>
	<view>
		<view class="content">
			方法：
		</view>
		<button @click="getCommonMethod">调用公共的函数</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			getCommonMethod(){
				uniCloud.callFunction({
						name: 'use-common',
						// data: {}
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
