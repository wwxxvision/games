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
		<Progress
			ref="progress"
			:gameName="'game-four'"
			:gameState="game.getGameState"
			:timeInSec="gameTime"
			@getTimerTime="getTimerTime"
		/>
		<div
			class="flex flex_justify_content_center flex_align-center  full_screen"
		>
			<Pick />
		</div>
		<!-- <GameScreen
			:gameName="'game-one'"
			v-for="(player, index) in game.players"
			:key="index"
			:dir="getScreenDir(player.type)"
		>
			<div
				class="game__block game__block_size-full_screen flex flex_justify_content_center flex_align_items_center"
			>
				<div
					@mousedown="ev => tapIcon(ev, player.type)"
					@mouseup="disableTap"
					@touchstart="ev => tapIcon(ev, player.type)"
					@touchend="disableTap"
					ref="icon"
					:class="
						`game__third-icon game__third-icon_type-${player.type} relative`
					"
				>
					<div
						v-if="tap === player.type"
						class="absolute add-score-decor add-score-decor_animate-hide"
					>
						<div>
							+ 1
						</div>
					</div>
				</div>
			</div>
			<div
				class="game__block game__block_font-bold flex flex_justify_content_center text-align-center"
			>
				<div class="game__block relative">
					<div>{{ player.name }}</div>
					<InputCustom
						type="text"
						:readonly="true"
						:text-centered="true"
						:initValue="player.value"
						placeholder="0"
						:theme="'input__element_theme-biege-red'"
					/>
				</div>
			</div>
		</GameScreen> -->
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
			gameTime: 10, // in seconds,
			time: {
				vote: 10,
				guess: 20,
				createQuestion: 40,
			},
			bgMusic: 'bg',
			gameLogic: null,
			state: 'vote',
			controllTimer: true,
			choose: null,
			chooseEnemy: 'player',
			interviewer: null,
			guessPerson: 'Jhon Cena',
			countQuestions: 7,
		};
	},
	created() {
		// this.$nextTick(() => this.game.updateGameState('vote')); //running after call from mixin
	},
	mounted() {},
	methods: {
		getWinner(players) {
			players.find(player => {
				if (player.type !== this.interviewer) player.state = 'winner';
			});
		},
		setChoose(playerType) {
			this.choose = playerType;

			if (chooseEnemy) {
				this.vote(this.choose, this.chooseEnemy);
			}
		},
		getGameStateAfterVote() {
			if (this.interviewer === 'player') {
				return 'guess-person';
			}

			return 'waiting-person';
		},
		getGameStateAfterGuessPerson() {
			if (this.interviewer === 'player') {
				return 'create-question';
			}

			return 'waiting-question';
		},
		vote(choosePlayer, chooseEnemy) {
			const chosesIsNotEmpty = choosePlayer && chooseEnemy;
			const choosesIsEqual = chooseEnemy === choosePlayer;
			const getRandomChoose = [choosePlayer, chooseEnemy][
				Helpers.randomInteger(0, 1)
			];

			if (choosesIsEqual && chosesIsNotEmpty) {
				this.interviewer = choosePlayer;
				this.game.updateGameState(this.getGameStateAfterVote());
				return;
			}

			//Fake choose server
			this.interviewer = getRandomChoose;
			this.game.updateGameState(this.getGameStateAfterVote());
		},
		updateTimeByGameState() {
			switch (this.game.getGameState) {
				case 'vote':
					this.gameTime = this.time.vote;
					break;
				case 'guess-person':
				case 'waiting-person':
					this.gameTime = this.time.guess;
					break;
				case 'create-question':
				case 'waiting-question':
					this.gameTime = this.time.createQuestion;
					break;
			}
		},
		hardResetProgress() {
			this.$refs.progress.hardReset();
		},
	},
	watch: {
		chooseEnemy(chooseEnemy) {
			if (this.choose) {
				this.vote(this.choose, chooseEnemy);
			}
		},
		gameTime(time) {
			const timeIsLeft = time === 0;
			switch (this.game.getGameState) {
				case 'vote':
					if (timeIsLeft) {
						if (!this.interviewer) {
							this.vote('player', 'enemy');
							this.updateTimeByGameState();
							this.hardResetProgress();
						}
					}
					break;
				case 'guess-person':
				case 'waiting-person':
					if (timeIsLeft) {
						if (!this.guessPerson) {
							this.game.finish(this.getWinner);
						} else {
							this.game.updateGameState(this.getGameStateAfterGuessPerson());
							this.updateTimeByGameState();
							this.hardResetProgress();
						}
					}
					break;
				case 'create-question':
				case 'waiting-question':
					if (timeIsLeft) {
						const questionsAreNotOver = this.countQuestions > 0;

						if (questionsAreNotOver) {
							this.countQuestions -= 1;
							this.updateTimeByGameState();
							this.hardResetProgress();
						}
					}
					break;
			}
		},
	},
};
</script>
