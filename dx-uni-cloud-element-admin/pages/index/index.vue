<template>
	<el-container class="index-box">
		<el-aside width="asideWidth">
			<view class="sidebar-logo-container">
				<img :src="logo" class="sidebar-logo-img">
				<view v-if="!isCollapse" class="sidebar-logo-container-title">
					后管平台
				</view>
			</view>
			<menus @openPage="openPage" :isCollapse="isCollapse" />
		</el-aside>
		<el-container>
			<el-header>
				<headers :user="user" :isCollapse="isCollapse" />
			</el-header>
			<el-main>
				<Index v-if="currentPage === 'index'" />
				<Article v-if="currentPage === 'articleList'" />
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import Menus from '@/components/menus/menus'
	import Headers from '@/components/header/header'
	import Index from '@/components/page/index'
	import Article from '@/components/page/article'
	import cookieUtils from '@/common/cookieUtils.js'
	export default {
		data() {
			return {
				isRouterAlive: true,
				currentPage: 'index',
				logo: require('../../static/common/sys_logo.jpg')
			}
		},
		computed: {
			...mapState(['user', 'isCollapse'])
		},
		components: {
			Menus,
			Headers,
			Index,
			Article
		},
		onLoad() {
			const userJson = cookieUtils.getCookie("user")
			if(!(userJson && JSON.parse(userJson)._id)){
				uni.redirectTo({
					url: '../login/login'
				})
			}
		},
		methods: {
			openPage(page) {
				this.currentPage = page
			}
		}
	}
</script>

<style lang="less" scoped>
	.index-box {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		height: 100%;

		.el-container {
			height: 100%;

			.el-main {
				height: 100%;
			}
		}

		.el-aside {
			background-color: #20222A;
			height: 100vh;
			min-height: 100%;
		}

		.el-header {
			border-bottom: 1px solid #f6f6f6;
			box-sizing: border-box;
			background-color: #fff;
			line-height: 60px;
		}

		.sidebar-logo-container {
			position: relative;
			width: 100%;
			height: 50px;
			line-height: 50px;
			background: #2b2f3a;
			text-align: center;
			overflow: hidden;

			.sidebar-logo-container-title {
				display: inline-block;
				margin: 0;
				color: #fff;
				font-weight: 600;
				line-height: 50px;
				font-size: 14px;
				font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
				vertical-align: middle;
				margin-left: 12px;
			}
			.sidebar-logo-img{
				width: 32px;
				height: 32px;
				vertical-align: middle;
			}
		}
	}
</style>
