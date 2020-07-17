import { Translator } from '@/js/classes/core';
import App from '@/js/App.vue';
import Vue from 'vue';
import './plugins';

class Core {
	async render(game) {
		Vue.prototype.$translate = await Translator.initTranslations().catch(err =>
			console.log(err)
		);

		new Vue({
			el: '#root',
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
