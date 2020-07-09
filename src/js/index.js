import Socket from '@/js/classes/core/Socket';
import Translator from './classes/core/Translator';
import { ScreenController } from '@/js/classes/controllers/index';

class App {
	async render() {
		ScreenController.view('connecting');
		await Socket.connect();
		const translate = await Translator.initTranslations().catch(err =>
			console.log(err)
		);

		return {
			translate,
		};
	}
}

export default new App();
