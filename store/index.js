import Vue from 'vue';
import Vuex from 'vuex';
import { getCartList, updateCart, delCart, addCart, updateAllCart } from '../api/index.js';
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
		updateBalance(state, balance){
			state.user.balance = balance;
		},
		updateGoodsIds(state, goodsIds){
			state.user.goods_ids = goodsIds;
		},
		saveCart (state, {data}) {
			state.cart = data;
		},
		delUser(state){
			state.user = ""
		},
		isCartAllCheck(state){
			let allCheck = true;
			state.cart.map(v => {
				if(!v.checked){
					allCheck = false;
				}
			});
			return allCheck;
		}
	},
	actions: {
		async getCartList({commit, state}){
			if(!state.user) return;
			this.commit("saveCart", await getCartList(state.user.id));
		},
		async updateCart({dispatch}, cart){
			let { status } = await updateCart(cart);
			if(!status){
				dispatch('getCartList');
			}
		},
		async delCart({dispatch}, ids){
			let { status } = await delCart(ids);
			if(!status){
				dispatch('getCartList');
			}
		},
		async addCart({dispatch}, cart){
			let { status } = await addCart(cart);
			if(!status){
				dispatch('getCartList');
			}
		},
		async updateAllCart({dispatch,state}, checked){
			let { status } = await updateAllCart({userId:state.user.id, checked});
			if(!status){
				dispatch('getCartList');
			}
		},
		getCheckGoods({state}){
			let arr = [];
			state.cart.map(v => {
				if(v.checked){
					arr.push(v);
				}
			});
			return arr;
		},
		delUser(state){
			state.user = "";
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