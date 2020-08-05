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
									connecting: 'Waiting for partner',
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
									guessCharacter: 'Choose character',
									writeAnswer: 'Write question',
									writeCharacter: 'Write character',
									missedQuestion: 'You have missed the question',
									viewAllQuestions: 'View all questions',
									ramdomDecideComputes:
										'The computer decides you should guess the charactrer because you both choosed same option.',
									playerTimeIsOver: 'Your time is over',
									partnerTimeIsOver: 'Your partner time is over',
								},
								picks: {
									character: `I'm Character`,
									guess: `I'm Guess`,
								},
								placeholders: {
									enter: 'Enter',
									enterQuestion: 'Please write Yes / No question',
								},
								waitings: {
									waitChooseCharacter:
										'Your partner is choosing a character, please wait',
									waitQuestion: 'You partner is writing question , please wait',
									waitAnswer: 'You partner is choosing answer, please wait',
									waitGuessing:
										'You partner is guessing character, please wait',
									gameResult: 'Waiting game result',
									pickPartner: 'Waiting pick partner',
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
