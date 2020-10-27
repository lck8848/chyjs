import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		user: ""
	},
	mutations: {
		saveUser (state, user) {
			state.user = user;
		},
		updPhone(state, phone){
			state.user.phone = phone;
		},
		delUser(state){
			state.user = ""
		}
	},
	getters: {
		getUser(state){
			return state.user;
		}
	}
});
export default store;