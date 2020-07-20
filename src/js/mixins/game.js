import { Game } from '@/js/classes/models/';
import { Helpers } from '@/js/classes/core';

export const gameMixin = {
	created() {
		// console.log(this.$root);
		this.game = new Game(this.gameInitValue, this.$sound);
		this.game.factoryPlayers('player', this.$translate.t('names.mainPlayer'));
		this.game.factoryPlayers('enemy', this.$translate.t('names.enemy'));
	},
	mounted() {
		this.game.play(this.gameTime);
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
	},
	watch: {
		gameTime(time) {
			this.game.updateGameTime(time);

			if (time === 0) {
				this.game.finish(this.getWinner);
			}
		},
	},
};
