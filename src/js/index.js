import { Translator } from '@/js/classes/core';
import App from '@/js/App.vue';
import Vue from 'vue';
import './plugins';
import '@/scss/index.scss';
import { store } from './store';
import { Howler } from 'howler';
import runDevelopment from './dev';

class Core {
	constructor(socket, selector, lang, direction, callbacks) {
		this.socket = socket;
		this.selector = selector;
		this.lang = lang;
		this.direction = direction;
		this.callbacks = callbacks;
		this.vueInstance = null;
	}
	init() {
		return new Promise((resolve) => {
			const { socket, lang, direction, selector, callbacks } = this;
			const { onStart, onLose, onWin, onEnd, onStandoff } = callbacks;

			Translator.initTranslations(lang)
				.then((translate) => {
					Vue.prototype.$translate = translate;
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
						created() {
							resolve();
						},
						methods: {
							updateGame(newGame) {
								this.game = newGame;
							},
						},
						render: (h) => h(App),
					});
				})
				.catch((err) => console.log(err));
		});
	}

	newGame(gameName) {
		// Howler.unload();
		if (document.querySelector('.game-app')) {
			this.__showRootDomElement('.game-app');
		}

		this.vueInstance.updateGame(gameName);
	}

	__hideRootDomElement(selector) {
		document.querySelector(selector).style.visibility = 'none';
	}

	__showRootDomElement(selector) {
		document.querySelector(selector).style.display = 'block';
	}

	close() {
		this.__hideRootDomElement('.game-app');
	}
}

window.gameCore = Core;

if (process.env.NODE_ENV === 'development') {
	runDevelopment(Core);
}
