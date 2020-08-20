import i18next from 'i18next';
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
import beta from '~/locales/beta.ini';

class Translator {
	initTranslations(initLang) {
		return new Promise((resolve, reject) => {
			i18next
				.init({
					debug: true,
					saveMissing: true,
					fallbackLng: 'en',
					lng: initLang ? initLang : null,
					resources: {
						en: {
							translation: {
								...en,
							},
						},
						beta: {
							translation: {
								...beta,
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
				.catch((err) => reject(err));
		});
	}
}

export default new Translator();
