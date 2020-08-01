import { Game } from '@/js/classes/models/';
import { Helpers } from '@/js/classes/core';

export const gameMixin = {
	created() {
		this.game = new Game(
			this.gameInitValue,
			this.bgMusic ? this.bgMusic : false
		);
		this.game.factoryPlayers('player', this.$translate.t('titles.mainPlayer'));
		this.game.factoryPlayers('enemy', this.$translate.t('titles.enemy'));
	},
	mounted() {
		this.$socket.on('play', () => {
			this.$store.commit('updateAppLoading', false);
			this.game.play(this.gameTime);
		});

		this.$socket.on('win', () => {
			this.game.players.find((player) => {
				if (player.type === 'player') {
					player.state = 'winner';
				}
			});
			this.game.finish();
		});

		this.$socket.on('partner-disconnect', () => {
			this.game.players.find((player) => {
				if (player.type === 'enemy') {
					player.state = 'disconnected';
				} else {
					player.state = 'winner';
				}
			});

			this.game.finish();
		});

		this.$socket.on('lose', () => {
			this.game.players.find((player) => {
				if (player.type === 'enemy') {
					player.state = 'winner';
				}
			});
			this.game.finish();
		});

		this.$socket.on('standoff', () => {
			this.game.finish();
		});
	},
	methods: {
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
			this.players.forEach((player) => player.reset());
			this.needReset = !this.needReset;
			this.serverValue = Helpers.randomInteger(1, 1000);
			this.players.forEach((player) => {
				if (player.type === 'enemy') {
					player.value = Helpers.randomInteger(1, 1000);
				}
			});
		},
		getTimerTime(time) {
			this.gameTime = time;
		},
		getMainPlayer() {
			return this.game.players.find((player) => player.type === 'player');
		},
	},
	computed: {
		enemyIsDisconnected() {
			return this.game.players.some(
				(player) => player.state === 'disconnected'
			);
		},
		gameState() {
			return this.game.getGameState;
		},
		isDeadHeat() {
			return this.game.players.every((player) => player.state === 'winner');
		},
		winnerName() {
			const winner = this.game.players.find(
				(player) => player.state === 'winner'
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
