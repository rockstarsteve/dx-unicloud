import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import cookieUtils from '../common/cookieUtils.js'

// let user = uni.getStorageSync('user') || {}
let user = cookieUtils.getCookie('user') || {}
const store = new Vuex.Store({
	state: {
		user: user,
		isCollapse: false
	},
	mutations: {
		login(state, user) {
			state.user = user
			// uni.setStorageSync('user', user)
			cookieUtils.addCookie('user',user)
		},
		logout(state) {
			state.user = {}
			// uni.removeStorageSync('user')
			cookieUtils.delCookie('user')
		},
		changeCollapse(state) {
			state.isCollapse = !state.isCollapse
		}
	}
})

export default store
