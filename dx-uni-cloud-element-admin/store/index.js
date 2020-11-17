import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import cookieUtils from '../common/cookieUtils.js'

let uniIdToken = sessionStorage.getItem("uniIdToken")
const store = new Vuex.Store({
	state: {
		uniIdToken: uniIdToken,
		isCollapse: false
	},
	mutations: {
		login(state, uniIdToken) {
			state.uniIdToken = uniIdToken
			sessionStorage.setItem('uniIdToken',uniIdToken)
		},
		logout(state) {
			state.uniIdToken = {}
			sessionStorage.removeItem('uniIdToken')
		},
		changeCollapse(state) {
			state.isCollapse = !state.isCollapse
		}
	}
})

export default store
