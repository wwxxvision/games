import Player from './Player';

export default class Game {
	constructor(initGameValue) {
		this.players = [];
		this.initGameValue = initGameValue;
		this.gameState = 'pause';
		this.gameTime = 0;
	}

	factoryPlayers(type, name) {
		this.players.push(new Player(type, name));
		this.players.forEach(player => player.setValue(this.initGameValue));
	}

	get getGameTime() {
		return this.gameTime;
	}

	get getGameState() {
		return this.gameState;
	}

	updateGameTime(time) {
		this.gameTime = time;
	}

	updateGameState(state) {
		this.gameState = state;
	}

	play(time) {
		this.gameTime = time;
		this.players.forEach(player => player.reset(this.initGameValue));
		this.updateGameState('play');
	}

	finish(setWinner) {
		this.updateGameState('finished');
		setWinner(this.players);
	}
}
