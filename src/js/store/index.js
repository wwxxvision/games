import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		appIsLoading: true,
	},
	mutations: {
		updateAppLoading(state, data) {
			state.appIsLoading = data;
		},
	},
});
