// import Socket from '@/js/classes/core/Socket';
import Translator from './classes/core/Translator';
import App from '@/js/App.vue';
import Vue from 'vue';

class Core {
	async render(game) {
		// ScreenController.view('connecting');
		// await Socket.connect();

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

		// return {
		// 	translate,
		// };
	}
}

export default new Core();
