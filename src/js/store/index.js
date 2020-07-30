import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		app: {
			state: 'loading',
		},
	},
	mutations: {
		increment(state) {
			state.count++;
		},
	},
});
