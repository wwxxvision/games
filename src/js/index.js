import { Translator } from '@/js/classes/core';
import App from '@/js/App.vue';
import Vue from 'vue';
import './plugins';
import { store } from './store';

class Core {
	async render(game, socket, selector) {
		Vue.prototype.$translate = await Translator.initTranslations().catch(err =>
			console.log(err)
		);
		Vue.prototype.$socket = socket;

		new Vue({
			el: selector,
			store: store,
			data() {
				return {
					game,
				};
			},
			render: h => h(App),
		});
	}
}

export default new Core();
