<template>
	<div class="game game-four">
		<Modal
			v-if="gameState === 'finished'"
			:title="!isDeadHeat ? winnerName : $translate.t('titles.standoff')"
			:titleTheme="'blue'"
		>
			<Winner :isDeadHeat="isDeadHeat" :players="game.players" />
			<template v-if="!enemyIsDisconnected" v-slot:footer>
				<Button
					@clicked="playAgain"
					:title="$translate.t('button.playAgain')"
				/>
			</template>
		</Modal>

		<Modal v-if="gameState === 'acceptGame'" :title="$translate.t('system.acceptGame')" :titleTheme="'blue'">
			<template v-slot:footer>
				<Button @clicked="acceptGame" :title="$translate.t('button.yes')" />
			</template>
		</Modal>

		<Progress
			ref="progress"
			:gameName="'game-four'"
			:gameState="game.getGameState"
			:timeInSec="gameTime"
			@getTimerTime="getTimerTime"
		/>
		<div
			v-if="game.getGameState === 'play'"
			class="flex flex_justify_content_center flex_align-center  full_screen"
		>
			<Pick @picking="picking" />
		</div>

		<div v-if="writer" class="flex flex_justify_content_center flex_align-center flex_direction_column  full_screen">
			<div class="game__message">{{ $translate.t('titles.guessPerson') }}</div>
			<div class="game__block">
				<InputCustom @updateValues="updateInputData" :maxlength="40" type="text" :placeholder="$translate.t('placeholders.enter')" initValue="" />
			</div>
			<div @click="submit" class="game__block">
				<Button theme="red" :title="$translate.t('button.confirm')" />
			</div>
		</div>

		<div v-if="waiter" class="flex flex_justify_content_center flex_direction_column flex_align-center  full_screen">
			<div class="waiter-preloader"></div>
			<div class="waiter-title"> {{ waitingTitle }} </div>
		</div>

<!--
		<div class="game__choose-answer flex flex_justify_content_center flex_align-center flex_direction_column  full_screen">
			<div class="game__message">{{ message }}</div>
				<div class="game__block flex flex_wrap">
					<div class="game__button">
						<Button theme="red" :title="$translate.t('button.yes')" />
					</div>
					<div  class="game__button">
						<Button theme="red" :title="$translate.t('button.no')" />
					</div>
				</div>
		</div> -->

	</div>
</template>;

<script>
import GameScreen from '@/js/components/GameScreen.vue';
import Progress from '@/js/components/Progress.vue';
import InputCustom from '@/js/components/InputCustom.vue';
import Player from '@/js/classes/models/Player';
import Modal from '@/js/components/Modal.vue';
import Winner from '@/js/components/Winner.vue';
import Button from '@/js/components/Button.vue';
import { Game } from '@/js/classes/models/';
import { gameMixin } from '@/js/mixins/index';
import { Helpers } from '@/js/classes/core';
import $ from 'jquery';
import GameLogic from '../classes/GameLogic';
import Pick from './Pick.vue';

export default {
	name: 'game-four',
	mixins: [gameMixin],
	components: {
		GameScreen,
		Progress,
		Range,
		InputCustom,
		Modal,
		Winner,
		Button,
		Pick,
	},
	data() {
		return {
			game: null,
			gameInitValue: 0,
			gameTime: 10,
			bgMusic: 'bg',
			controllTimer: true,
			pick: 'none',
			role: null,
			waitingTitle: 'test',
			inputData: ''
		};
	},
	mounted() {
		this.$socket.on('result-role', (role) => {
			this.role = role;

			if (this.role === 'character') {
				this.gameTime = 20;
				this.hardResetProgress();
				this.game.updateGameState('guess-character');
			}
			else {
				this.game.updateGameState('waiting-partner');
				this.waitingTitle = this.$translate.t('waitings.waitChooseCharacter');
			}

			this.$socket.emit('result-role', this.role);
		});

		this.$socket.on('сharacter-chosen', () => {
			if (this.role === 'character') {
				this.game.updateGameState('waiting-partner');
				this.waitingTitle = this.$translate.t('waitings.waitChooseCharacter');
			}
			else {
				this.gameTime = 20;
				this.hardResetProgress();
				this.game.updateGameState('create-answer');
			}
		})
	},
	computed: {
		waiter() {
			const stateGame = this.game.getGameState;
			return stateGame === 'waiting-partner';
		},
		writer() {
			const stateGame = this.game.getGameState;
			return stateGame === 'guess-character' || stateGame === 'create-answer';
		}
	},
	methods: {
		updateInputData(_, value) {
			this.inputData = value;
		},
 		picking(pick) {
			this.pick = pick;
		},
		submit() {
			console.log(true)
			switch(this.game.getGameState) {
				case 'guess-character':
					this.$socket.emit('сharacter-chose', this.inputData);
					break;
			}
		},
		hardResetProgress() {
			this.$refs.progress.hardReset();
		},
		getTimerTime(time) {
			const timeIsLeft = time === 0;
			const playerValue  = this.game.players.find(player => player.type === 'player').value;
			if (timeIsLeft) {
				switch(this.game.getGameState) {
					case 'play':
						this.$socket.emit('pick-finish', this.pick);
						break;
					case 'guess-character':
						this.$socket.emit('сharacter-chose', this.inputData);
						break;
					}
			}
		}
	},
};
</script>
