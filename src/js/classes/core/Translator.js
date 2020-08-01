import i18next from 'i18next';

class Translator {
	initTranslations() {
		return new Promise((resolve, reject) => {
			i18next
				.init({
					lng: 'en',
					debug: true,
					preload: ['en'],
					saveMissing: true,
					fallbackLng: 'en',
					resources: {
						en: {
							translation: {
								system: {
									connecting: 'Waiting partner',
									waitingStartGame: 'Waiting start game',
									disconnected: 'Disconnected',
									pendingConfirm: 'Pending confirmation',
									acceptGame: 'Accept the game?',
								},
								button: {
									playAgain: 'PLAY AGAIN',
									confirm: 'CONFIRM',
									yes: 'Yes',
									no: 'No',
								},
								titles: {
									mainPlayer: 'You',
									enemy: 'Partner',
									standoff: 'Standoff',
									vote: 'Vote',
									guessPerson: 'Choose character',
								},
								placeholders: {
									enter: 'Enter',
								},
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
