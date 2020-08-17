import Player from './Player';
import { AudioCore } from '@/js/classes/core';

export default class Game {
	constructor(initGameValue, backgroundMusic) {
		this.players = [];
		this.initGameValue = initGameValue;
		this.gameState = 'pause';
		this.gameTime = 0;
		this.AudioCore = AudioCore;
		this.backgroundMusic = backgroundMusic ? backgroundMusic : 'bg';
	}

	factoryPlayers(type, name) {
		this.players.push(new Player(type, name));
		this.players.forEach((player) => player.setValue(this.initGameValue));
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
		this.players.forEach((player) => player.reset(this.initGameValue));
		this.updateGameState('play');
		this.AudioCore.play(this.backgroundMusic);
	}

	checkIsWinnerMainPlayer() {
		const mainPlayer = this.players.find((player) => player.type === 'player');
		return mainPlayer.state === 'winner';
	}

	isDeadHeat() {
		return this.players.every((player) => player.state === 'winner');
	}

	finish() {
		this.AudioCore.stop();
		this.updateGameState('finished');

		const mainPlayerIsWinner = this.checkIsWinnerMainPlayer();

		if (!this.isDeadHeat()) {
			if (mainPlayerIsWinner) {
				this.AudioCore.play('win');
			} else {
				this.AudioCore.play('lose');
			}
		} else {
			this.AudioCore.play('win');
		}
	}

	pause() {
		this.AudioCore.stop();
		this.updateGameState('pause');
	}
}
