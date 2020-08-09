import { Translator } from '@/js/classes/core';
import App from '@/js/App.vue';
import Vue from 'vue';
import './plugins';
import '@/scss/index.scss';
import { store } from './store';

class Core {
	async render(game, socket, selector, lang) {
		Vue.prototype.$translate = await Translator.initTranslations(
			lang
		).catch(err => console.log(err));
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

window.gameCore = new Core();
