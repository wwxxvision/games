import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '~/locales/en.ini';
import br from '~/locales/br.ini';
import cn from '~/locales/cn.ini';
import de from '~/locales/de.ini';
import es from '~/locales/es.ini';
import fr from '~/locales/fr.ini';
import il from '~/locales/il.ini';
import it from '~/locales/it.ini';
import ru from '~/locales/ru.ini';
import sa from '~/locales/sa.ini';

class Translator {
	initTranslations() {
		return new Promise((resolve, reject) => {
			i18next
				.use(LanguageDetector)
				.init({
					debug: true,
					saveMissing: true,
					fallbackLng: 'en',
					resources: {
						en: {
							translation: {
								...en,
							},
						},
						br: {
							translation: {
								...br,
							},
						},
						cn: {
							translation: {
								...cn,
							},
						},
						de: {
							translation: {
								...de,
							},
						},
						es: {
							translation: {
								...es,
							},
						},
						fr: {
							translation: {
								...fr,
							},
						},
						il: {
							translation: {
								...il,
							},
						},
						it: {
							translation: {
								...it,
							},
						},
						ru: {
							translation: {
								...ru,
							},
						},
						sa: {
							translation: {
								...sa,
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
