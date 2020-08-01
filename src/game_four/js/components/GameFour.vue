<template>
	<div class="game game-four">
		<!-- <Modal
			v-if="gameState === 'finished'"
			:title="!isDeadHeat ? winnerName : $translate.t('titles.standoff')"
			:titleTheme="'blue'"
		>
			<Winner :isDeadHeat="isDeadHeat" :players="game.players" />
			<template v-slot:footer>
				<Button
					@clicked="game.play(gameTime)"
					:title="$translate.t('button.playAgain')"
				/>
			</template>
		</Modal>
		<Modal
			v-if="game.getGameState === 'vote'"
			:title="$translate.t('titles.vote')"
			:titleTheme="'blue'"
		>
			<template v-slot:footer>
				<Button
					@clicked="game.play(gameTime)"
					:title="$translate.t('button.playAgain')"
				/>
			</template>
		</Modal> -->
		<!-- <Modal
			v-if="game.getGameState === 'guess-person'"
			:title="$translate.t('titles.guessPerson')"
			:titleTheme="'blue'"
		>
			<InputCustom
				type="text"
				initValue=""
				:placeholder="$translate.t('placeholders.writeCharacter')"
			/>
			<template v-slot:footer>
				<Button
					@clicked="game.play(gameTime)"
					:title="$translate.t('button.playAgain')"
				/>
			</template>
		</Modal> -->
			<Modal
				v-if="gameState === 'finished'"
				:title="!isDeadHeat ? winnerName : $translate.t('titles.standoff')"
				:titleTheme="'blue'"
			>
			<Winner :isDeadHeat="isDeadHeat" :players="game.players" />
			<template v-slot:footer>
				<Button
					@clicked="game.play(gameTime)"
					:title="$translate.t('button.playAgain')"
				/>
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
			<Pick />
		</div>

		<div v-if="game.getGameState === 'guessing' " class="flex flex_justify_content_center flex_align-center flex_direction_column  full_screen">
			<div class="game__message">"Title"</div>
			<div class="game__block">
				<InputCustom  :maxlength="40" type="text" :placeholder="$translate.t('placeholders.enter')" initValue="" />
			</div>
			<div class="game__block">
				<Button theme="red" :title="$translate.t('button.confirm')" />
			</div>
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
			pick: false
		};
	},
	computed: {
	},
	methods: {
		hardResetProgress() {
			this.$refs.progress.hardReset();
		},
		emitEventAfterTimeLeft() {
			switch(this.game.getGameState) {
				case 'play':
					this.$socket.emit('pick', { id: 'Test id', pick: this.pick });

					this.getMainPlayer.state = 'interviewer' || 'guessing';
					if (this.getMainPlayer.state === 'interviewer') {
						this.game.updateGameState('guessing');
					}
					else {
						this.game.updateGameState('waiting');
					}
					break;
				case 'guessing':
					if (this.getMainPlayer.state === 'interviewer') {
						this.game.updateGameState('waiting');
					}
					else {
						this.game.updateGameState('guessing');
					}

					break;
			}
		},
		initEventListiners() {

		}
	},
	watch: {
		gameTime(time) {
			const timeIsLeft = time === 0;

			if (timeIsLeft) {
				this.emitEventAfterTimeLeft();
			}
			// switch (this.game.getGameState) {
			// 	case 'vote':
			// 		if (timeIsLeft) {
			// 			if (!this.interviewer) {
			// 				this.vote('player', 'enemy');
			// 				this.updateTimeByGameState();
			// 				this.hardResetProgress();
			// 			}
			// 		}
			// 		break;
			// 	case 'guess-person':
			// 	case 'waiting-person':
			// 		if (timeIsLeft) {
			// 			if (!this.guessPerson) {
			// 				this.game.finish(this.getWinner);
			// 			} else {
			// 				this.game.updateGameState(this.getGameStateAfterGuessPerson());
			// 				this.updateTimeByGameState();
			// 				this.hardResetProgress();
			// 			}
			// 		}
			// 		break;
			// 	case 'create-question':
			// 	case 'waiting-question':
			// 		if (timeIsLeft) {
			// 			const questionsAreNotOver = this.countQuestions > 0;

			// 			if (questionsAreNotOver) {
			// 				this.countQuestions -= 1;
			// 				this.updateTimeByGameState();
			// 				this.hardResetProgress();
			// 			}
			// 		}
			// 		break;
			// }
		},
	},
};
</script>
