import i18next from 'i18next';
import { en } from '@/translations/index';

class Translator {
	initTranslations() {
		return new Promise((resolve, reject) => {
			i18next
				.init({
					lng: 'en',
					debug: true,
					resources: {
						en: {
							translation: {
								...en,
							},
						},
					},
				})
				.then(() => resolve(i18next))
				.catch(err => reject(err));
		});
	}
}

export default new Translator();
