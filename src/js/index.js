import { Translator } from '@/js/classes/core';
import App from '@/js/App.vue';
import Vue from 'vue';
import './plugins';
import io from 'socket.io-client';
import { CONFIG } from '@/js/config.js';
import { store } from './store';

class Core {
	async render(game) {
		Vue.prototype.$translate = await Translator.initTranslations().catch(err =>
			console.log(err)
		);
		Vue.prototype.$socket = io(CONFIG.SOCKET_URL);

		new Vue({
			el: '#root',
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
