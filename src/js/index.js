import Socket from '@/js/classes/core/Socket';
import Translator from './classes/core/Translator';

class App {
	async render() {
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
