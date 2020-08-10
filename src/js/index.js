import { Translator } from '@/js/classes/core';
import App from '@/js/App.vue';
import Vue from 'vue';
import './plugins';
import '@/scss/index.scss';
import { store } from './store';

class Core {
	constructor() {
		this.vueInstance = null;
	}
	async render(
		game,
		socket,
		selector,
		lang,
		direction = 'ltr',
		onStart = () => null,
		onLose = () => null,
		onWin = () => null,
		onEnd = () => null
	) {
		Vue.prototype.$translate = await Translator.initTranslations(
			lang
		).catch(err => console.log(err));
		Vue.prototype.$socket = socket;
		Vue.prototype.$direction = direction;
		Vue.prototype.$callbacks = {
			onStart,
			onLose,
			onWin,
			onEnd,
		};

		this.vueInstance = new Vue({
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
	close() {
		this.vueInstance.$destroy();
		let app = (document.querySelector('.game-app').innerHTML = '');
		app.remove();
	}
}

window.gameCore = new Core();
