<template>
	<div class="game game-one">
		<Modal v-if="gameState === 'finished'" :title="serverValue" :titleTheme="'blue'">
			<Winner v-if="!enemyIsDisconnected" :enemyIsDisconnected="enemyIsDisconnected" :isDeadHeat="isDeadHeat" :players="game.players" />
			<template v-if="!enemyIsDisconnected" v-slot:footer>
				<Button @clicked="game.play(gameTime)" :title="$translate.t('button.playAgain')" />
			</template>
		</Modal>
		<Progress
			:gameName="'game-one'"
			:gameState="game.getGameState"
			:timeInSec="15"
			@getTimerTime="getTimerTime"
		/>
		<GameScreen
			:gameName="'game-one'"
			v-for="(player) in game.players"
			:key="player.type"
			:dir="getScreenDir(player.type)"
		>
			<div class="game__block game__block_size-full_screen">
				<div :class="`game__decor game__decor_type-${player.type}`"></div>
			</div>
			<div class="game__block flex flex_space-between flex_wrap">
				<InputCustom type="text" :readonly="true" :text-centered="true" :initValue="player.value" />
				<InputCustom type="text" :readonly="true" :text-centered="true" :initValue="player.name" />
			</div>
			<div class="game__block">
				<Range
					@updateValues="addScore"
					:disabled="player.type === 'enemy' || gameState === 'finished'"
					:initValue="player.value"
					:playerType="player.type"
				/>
			</div>
		</GameScreen>
	</div>
</template>;

<script>
import GameScreen from '@/js/components/GameScreen.vue';
import Progress from '@/js/components/Progress.vue';
import Range from '@/js/components/Range.vue';
import InputCustom from '@/js/components/InputCustom.vue';
import Player from '@/js/classes/models/Player';
import Modal from '@/js/components/Modal.vue';
import Winner from '@/js/components/Winner.vue';
import Button from '@/js/components/Button.vue';
import { Game } from '@/js/classes/models/';
import { gameMixin } from '@/js/mixins/index';
import { Helpers } from '@/js/classes/core';

export default {
	name: 'game-one',
	mixins: [gameMixin],
	components: {
		GameScreen,
		Progress,
		Range,
		InputCustom,
		Modal,
		Winner,
		Button,
	},
	data() {
		return {
			players: [],
			value: 1,
			serverValue: Helpers.randomInteger(1, 1000),
			game: null,
			gameInitValue: 1,
			gameTime: 15, // in seconds
		};
	},
	mounted() {
		this.$socket.on('partner-change', (value) => {
			this.game.players = this.game.players.map(player => {
				if (player.type === 'enemy') {
					player.value = Number(value);
				}

				return player;
			})
		});

		this.$socket.on('server-number', (value) => this.serverValue = value);
	},
	methods: {
		__validateValue(value) {
			if (value > 1000) {
				value = 1000;
			}

			if (value < 0) {
				value = -value;
			}

			if (value === 0) {
				value = 1;
			}

			return value;
		},
		addScore(playerType, value) {
			this.game.players = this.game.players.map(player => {
				if (player.type === 'player') {
					player.value = Number(value);
				}

				return player;
			})
			this.$socket.emit('number-change', Number(value));
		},
		getTimerTime(time) {
			const timeIsLeft = time === 0;
			const playerValue  = this.game.players.find(player => player.type === 'player').value;
			if (timeIsLeft) {
				this.$socket.emit('finish', playerValue);
			}
		}
	},
};
</script>
