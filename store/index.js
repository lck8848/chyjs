import Vue from 'vue';
import Vuex from 'vuex';
import { getCartList, updateCart } from '../api/index.js';
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		user: "",
		cart: []
	},
	mutations: {
		saveUser (state, user) {
			state.user = user;
		},
		updPhone(state, phone){
			state.user.phone = phone;
		},
		saveCart (state, {data}) {
			state.cart = data;
		}
	},
	actions: {
		async getCartList({commit, state}){
			if(!state.user) return;
			this.commit("saveCart", await getCartList(state.user.id));
		},
		async updateCart({dispatch, state}, cart){
			let { status } = await updateCart(cart);
			if(!status){
				dispatch('getCartList');
			}
		}
	},
	getters: {
		getUser(state){
			return state.user;
		},
		getCarts(state){
			return state.cart;
		}
	}
});
export default store;