import { Translator } from '@/js/classes/core';
import App from '@/js/App.vue';
import Vue from 'vue';
import './plugins';
import '@/scss/index.scss';
import { store } from './store';
import { Howler } from 'howler';

class Core {
	constructor(socket, selector, lang, direction, callbacks) {
		this.socket = socket;
		this.selector = selector;
		this.lang = lang;
		this.direction = direction;
		this.callbacks = callbacks;
		this.vueInstance = null;
	}
	async init() {
		const { socket, lang, direction, selector, callbacks } = this;
		const { onStart, onLose, onWin, onEnd, onStandoff } = callbacks;

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
			onStandoff,
		};

		this.vueInstance = new Vue({
			el: selector,
			store: store,
			data() {
				return {
					game: '',
				};
			},
			methods: {
				updateGame(newGame) {
					this.game = newGame;
				},
			},
			render: h => h(App),
		});
	}

	newGame(gameName) {
		if (document.querySelector('.game-app')) {
			this.__showRootDomElement('.game-app');
		}
		this.vueInstance.updateGame(gameName);
	}

	__hideRootDomElement(selector) {
		document.querySelector(selector).style.display = 'none';
	}

	__showRootDomElement(selector) {
		document.querySelector(selector).style.display = 'block';
	}

	close() {
		this.__hideRootDomElement('.game-app');
		Howler.unload();
	}
}

window.gameCore = Core;
