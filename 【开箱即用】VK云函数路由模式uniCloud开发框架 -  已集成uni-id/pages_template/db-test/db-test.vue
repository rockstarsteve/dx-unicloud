<template>
	<view class="app">
		<scroll-view :scroll-y="true" style="max-height: 500rpx;">
			<view v-for="(item,index) in data.rows" :key="item._id">
				{{index+1}}: {_id: {{ item._id.substring(20)}}, money: {{ item.money }}}
				距您 {{ item.position | calcLocationStr(myPosition) }} km
			</view>
		</scroll-view>
		<view style="margin-bottom: 20rpx;font-size: 36rpx;">当前共有: {{data.total}} 条记录</view>
		<button style="margin-left: 50rpx;" @click="pageTo('list/list')">查看更多</button>
		<view style="display: flex;">
			<button @click="test('add')">add(添加一条记录)</button>
			<button @click="test('adds')">adds(添加多条记录)</button>
		</view>
		<button @click="test('count')">count(获取集合共有多少条记录)</button>
		<button @click="test('del')">del(删除集合所有数据)</button>
		<button @click="test('findById')">findById(根据id获取一条记录)</button>
		<button @click="test('findByWhereJson')">findByWhereJson(根据条件获取一条记录)</button>
		<view style="display: flex;">
			<button @click="getList1()">select(获取多条数据)</button>
			<button @click="getList2()">select2(连表查询)</button>
		</view>
		<button @click="test('update')">update(修改记录)</button>
		<view style="display: flex;">
			<button @click="test('sum')">sum(取总和值)</button>
			<button @click="test('avg')">avg(取平均值)</button>
		</view>
		<view style="display: flex;">
			<button @click="test('max')">max(取最大值)</button>
			<button @click="test('min')">min(取最小值)</button>
		</view>
		<button @click="getGeoList()">geo(地理位置 搜索4公里内)</button>
		<view>
			{{JSON.stringify(item)}}
		</view>
	</view>
</template>

<script>
	var that;											// 当前页面对象
	var app = getApp();						// 可获取全局配置
	var vk;												// 自定义函数集
	var weixinAuthService;
	export default {
		data() {
			return {
				form1:{
				
				},
				data:{
					
				},
				item:{},
				myPosition:{
					longitude:120.12792,
					latitude:30.228932
				}
			}
		},
		onLoad(options) {
			that = this;
			vk = that.vk;
			that.init(options);
		},
		methods: {
			// 页面数据初始化函数
			init(options){
				that.getList();
			},
			pageTo(url){
				uni.navigateTo({
					url:url
				})
			},
			test(name){
				let data = {};
				if(that.data && that.data.rows[0] && that.data.rows[0]._id){
					data._id = that.data.rows[0]._id;
				}
				vk.callFunction({
					url: 'db_test/pub/'+name,
					title:'请求中...',
					data:data,
					success(data) {
						setTimeout(function(){
							vk.alert(JSON.stringify(data));
						},300); 
						that.item = data;
						that.getList();
					}
				});
			},
			getList(){
				vk.callFunction({
					url: 'db_test/pub/select',
					title:'请求中...',
					data:{},
					success(data) {
						that.data = data;
					}
				});
			},
			getList1(){
				vk.callFunction({
					url: 'db_test/pub/select',
					title:'请求中...',
					data:{},
					success(data) {
						that.data = data;
						setTimeout(function(){
							vk.alert(JSON.stringify(data));
						},300); 
						that.item = data;
					}
				});
			},
			getList2(){
				vk.callFunction({
					url: 'db_test/pub/select2',
					title:'请求中...',
					data:{},
					success(data) {
						that.data = data;
						setTimeout(function(){
							vk.alert(JSON.stringify(data));
						},300); 
						that.item = data;
					}
				});
			},
			getGeoList(name){
				vk.callFunction({
					url: 'db_test/pub/geo',
					title:'请求中...',
					data:{
						
					},
					success(data) {
						that.data = data;
					}
				});
			},
			calcLocation(mbPosition = {}, myPosition = {}){
				if(myPosition.longitude == undefined || myPosition.latitude  == undefined){
					return "";
				}
				console.log(mbPosition,myPosition);
				var res = {};
				var m = 0;  
				var km = 0;  
				var lng1 = myPosition.longitude;
				var lat1 = myPosition.latitude;
				var lng2 = mbPosition.longitude;
				var lat2 = mbPosition.latitude;
				m = Math.sqrt((lng1 - lng2) * (lng1 - lng2) + (lat1 - lat2) * (lat1 - lat2)) / 180 * Math.PI * 6300000; 
				m = m.toFixed(1);
				km = (m / 1000).toFixed(2);
				if(m >= 1000000){
					res.str = "很遥远";
				}else if(m >= 1000){
					res.str = km+" km";
				}else{
					res.str = m+" m";
				}
				res.m = m;
				res.km = km;
				return res;
			},
		},
		filters:{
			calcLocationStr(mbPosition = {}, myPosition = {}){
				return that.calcLocation(mbPosition,myPosition).km;
			}
		}
	}
</script>

<style>
	.app {
		padding: 15px;
	}
	.app input {
		height: 46px;
		border: solid 1px #DDDDDD;
		border-radius: 5px;
		margin-bottom: 15px;
		padding: 0px 15px;
	}
	.app button {
		margin-bottom: 15px;
		font-size: 32rpx;
	}
	.app navigator {
		display: inline-block;
		color: #007AFF;
		border-bottom: solid 1px #007AFF;
		font-size: 16px;
		line-height: 24px;
		margin-bottom: 15px;
	}
</style>
