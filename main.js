import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'

Vue.config.productionTip = false

App.mpType = 'app'

import store from './store';

const app = new Vue({
	...App,
	store
})
app.$mount()
