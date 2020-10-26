import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import { getCartByUserId } from '@/api/index.js';
const store = new Vuex.Store({
	state: {
		user: "",
		cartData: []
	},
	mutations: {
		saveUser(state, user) {
			state.user = user;
		}
	},
	actions: {
		async asyncGetCartData(context) {
			if (context.state.user) {
				let userId = context.state.user.id;
				let {
					data
				} = await getCartByUserId(userId)
				// 有购物车再赋值
				if (data.length != 0) {
					context.state.cartData = data;
				}
				console.log(context.state.user,context.state.cartData)
			}

		}
	},
	getters: {
		getUser(state) {
			return state.user;
		}
	}
});
export default store;
