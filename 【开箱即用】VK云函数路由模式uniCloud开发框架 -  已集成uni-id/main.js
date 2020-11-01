import Vue from 'vue'
import App from './App'
import store from './store'

import uView from 'uview-ui';
Vue.use(uView);

import vk from 'vk-unicloud-page';
Vue.use(vk);

// 引入vk实例提供的对vuex的简写法文件
import mixin from './store/mixin/mixin.js'
Vue.mixin(mixin);

// 自定义云函数路由配置
Vue.prototype.vk.callFunctionUtil.setConfig({
	debug:true,
	loginPagePath:"/pages_template/uni-id/login/index/index",
	functionNameToUrl:{
		// 云函数路由（主函数url化地址）
		"router":"https://bbdf976b-a6a6-42b2-9429-db232ee80f13.bspapp.com/http/router",
		// 云函数路由（开发测试函数url化地址）
		"router-test":"https://bbdf976b-a6a6-42b2-9429-db232ee80f13.bspapp.com/http/router-test"
	}
});

// 自定义token拦截器
// Vue.prototype.vk.callFunctionUtil.interceptor.login = (obj = {}) =>{
//   let { params, res } = obj;
// 	if(!params.noAlert){
// 		Vue.prototype.vk.alert(res.result.msg);
// 	}
//   console.log("跳自己的登录页面");
//   // 上方代码可自己修改，写成你自己的逻辑处理。
// };

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
  ...App
})
app.$mount()
