import { Helpers } from '@/js/classes/core';

export default class GameLogic {
	constructor() {
		this.person = null;
		this.state = 'vote';
	}

	vote(choosePlayer, chooseEnemy) {
		const choosesIsEqual = chooseEnemy === choosePlayer;

		if (choosesIsEqual) {
			return choosePlayer;
		}

		//Fake choose server
		return [choosePlayer, chooseEnemy][Helpers.randomInteger(0, 1)];
	}

	setPerson(person) {
		this.person = person;
	}

	// checkState() {
	// 			if (Player	}
}
