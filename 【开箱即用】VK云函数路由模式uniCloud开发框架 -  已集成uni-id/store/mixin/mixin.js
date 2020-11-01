import { mapState, mapGetters } from 'vuex'
import store from "@/store"

// 尝试将用户在根目录中的store/index.js的vuex的state变量，全部加载到全局变量中
let mapStateKey = store.state ? Object.keys(store.state) : [];
let mapGettersArr = store.getters ? Object.keys(store.getters) : [];

let mapGettersKey = {};
for(let index in mapGettersArr){
	let key = mapGettersArr[index].replace('/', '_');
	mapGettersKey[key] = mapGettersArr[index];
}

module.exports = {
	beforeCreate() {
		// 将vuex方法挂在到vk实例中
		// 使用方法为：如果要修改vuex的state中的user.name变量为"史诗" => this.vk.vuex('user.name', '史诗')
		// 如果要修改vuex的state的version变量为1.0.1 => this.vk.vuex('version', '1.0.1')
		this.vk.vuex = (name, value) => {
			this.$store.commit('updateStore', {
				name,
				value
			})
		};
		this.vk.state = (name) => {
			let value = this.$store.state[name];
			return JSON.parse(JSON.stringify(value));
		};
		this.mapGetters = mapGetters;
	},
	computed: {
		// 将vuex的state中的所有变量，解构到全局混入的mixin中
		...mapState(mapStateKey),
		// 将vuex的getters中的所有函数，解构到全局混入的mixin中
		...mapGetters(mapGettersKey)
	}
}