// import Socket from '@/js/classes/core/Socket';
import Translator from './classes/core/Translator';
import App from '@/js/App.vue';
import Vue from 'vue';

class Core {
	async render() {
		// ScreenController.view('connecting');
		// await Socket.connect();
		new Vue({
			el: '#root',
			render: h => h(App),
		});
		const translate = await Translator.initTranslations().catch(err =>
			console.log(err)
		);

		return {
			translate,
		};
	}
}

export default new Core();
