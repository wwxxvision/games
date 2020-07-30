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
		this.$socket.on('gameUpdated', data => {
			const { state } = data;

			switch (state) {
				case 'play':
					this.game.play(this.gameTime);
					break;
				case 'finished':
					this.game.finish();
					break;
			}
			this.game.updateGameState(state);
		});
		// this.game.play(this.gameTime);
		// this.$socket.on('on-game', state => {
		// 	this.game.finish(players => {
		// 		const winner = players.find(player => player.type === 'player');
		// 		winner.state = 'winner';
		// 	});
		// 	console.log(state);
		// 	this.game.updateGameState(state);
		// 	switch (state) {
		// 		case 'play':
		// 			this.game.play(this.gameTime);
		// 			break;
		// 		case 'finish':
		// 			this.game.finish(() => null);
		// 	}
		// });
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
	},
	computed: {
		gameState() {
			return this.game.getGameState;
		},
		isDeadHeat() {
			return this.game.players.every(player => player.state === 'winner');
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
