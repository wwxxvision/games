import { Game } from '@/js/classes/models/';
import { Helpers } from '@/js/classes/core';

export const gameMixin = {
	data() {
		return {
			partnerIsTimeout: false,
			playerIsTimeout: false,
		};
	},
	created() {
		this.game = new Game(
			this.gameInitValue,
			this.bgMusic ? this.bgMusic : false
		);
		this.game.factoryPlayers('player', this.$translate.t('titles.mainPlayer'));
		this.game.factoryPlayers('enemy', this.$translate.t('titles.enemy'));
	},
	mounted() {
		const { onStart, onLose, onWin, onEnd, onStandoff } = this.$callbacks;
		this.$socket.on('play', () => {
			this.$store.commit('updateAppLoading', false);
			if (this.game.getGameState !== 'play') {
				this.game.play(this.gameTime);
				onStart();
			}
		});

		this.$socket.on('win', data => {
			this.game.players.find(player => {
				if (player.type === 'player') {
					player.state = 'winner';
				}
			});

			if (data) {
				Object.keys(data).forEach(type =>
					this.updatePlayerValue(type, data[type])
				);
			}
			if (this.serverValue) {
				onEnd(this.serverValue);
				onWin(this.getMainPlayer().value, this.serverValue);
			} else {
				onEnd();
				onWin(this.getMainPlayer().value);
			}
			this.reseting();
			this.game.finish();
		});

		this.$socket.on('partner-disconnect', () => {
			this.game.pause();
			this.$store.commit('updateAppLoading', {
				text: this.$translate.t('system.connecting'),
			});

			onEnd();
		});

		this.$socket.on('lose', data => {
			this.game.players.find(player => {
				if (player.type === 'enemy') {
					player.state = 'winner';
				}
			});

			if (data) {
				Object.keys(data).forEach(type =>
					this.updatePlayerValue(type, data[type])
				);
			}

			if (this.serverValue) {
				onEnd(this.serverValue);
				onLose(this.getMainPlayer().value, this.serverValue);
			} else {
				onEnd();
				onLose(this.getMainPlayer().value);
			}
			this.game.finish();
			this.reseting();
		});

		this.$socket.on('partner-play-again', () => {
			this.game.updateGameState('acceptGame');
		});

		this.$socket.on('standoff', data => {
			if (data) {
				Object.keys(data).forEach(type =>
					this.updatePlayerValue(type, data[type])
				);
			}
			if (this.serverValue) {
				onEnd(this.serverValue);
				onStandoff(this.getMainPlayer().value, this.serverValue);
			} else {
				onEnd();
				onStandoff(this.getMainPlayer().value);
			}
			this.game.finish();
			this.reseting();
		});
	},
	methods: {
		reseting() {
			if (this.isShowingAllQuestions) {
				this.isShowingAllQuestions = false;
			}
		},
		updatePlayerValue(type, value) {
			this.game.players.find(player => {
				if (player.type === type) {
					player.setValue(value);
				}
			});
		},
		playAgain() {
			this.$store.commit('updateAppLoading', {
				text: this.$translate.t('system.pendingConfirm'),
			});
			this.$socket.emit('play-again');
		},
		acceptGame() {
			this.$socket.emit('accept-play-again');
		},
		getScreenDir(playerType) {
			switch (playerType) {
				case 'player':
					return 'left';
				case 'enemy':
					return 'right';

				default:
					return 'left';
			}
		},
		reset() {
			this.players.forEach(player => player.reset());
			this.needReset = !this.needReset;
			this.serverValue = Helpers.randomInteger(1, 1000);
			this.players.forEach(player => {
				if (player.type === 'enemy') {
					player.value = Helpers.randomInteger(1, 1000);
				}
			});
		},
		getTimerTime(time) {
			this.gameTime = time;
		},
		getMainPlayer() {
			return this.game.players.find(player => player.type === 'player');
		},
	},
	computed: {
		enemyIsDisconnected() {
			return this.game.players.some(player => player.state === 'disconnected');
		},
		gameState() {
			return this.game.getGameState;
		},
		isDeadHeat() {
			return this.game.players.every(player => player.state !== 'winner');
		},
		winnerName() {
			const winner = this.game.players.find(
				player => player.state === 'winner'
			);
			if (winner) {
				return winner.name;
			}
		},
	},
	watch: {
		gameTime(time) {
			this.game.updateGameTime(time);

			if (time === 0 && !this.controllTimer) {
				this.game.finish(this.getWinner);
			}
		},
	},
};
