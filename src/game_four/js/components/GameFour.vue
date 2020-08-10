<template>
	<div class="game game-four">
		<Modal v-if="gameState === 'finished'" :title="title" :titleTheme="'blue'">
			<Winner
				:hideValues="true"
				:isDeadHeat="isDeadHeat"
				:players="game.players"
			/>
			<template v-if="!enemyIsDisconnected" v-slot:footer>
				<Button
					@clicked="playAgain"
					:title="$translate.t('button.playAgain')"
				/>
			</template>
		</Modal>

		<Modal
			v-if="gameState === 'acceptGame'"
			:title="$translate.t('system.acceptGame')"
			:titleTheme="'blue'"
		>
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

		<div v-if="isShowingAllQuestions" class="overlay">
			<div class="overlay__bg"></div>
			<div class="overlay__body">
				<div class="overlay__wrapper">
					<div class="overlay__close">
						<div @click="hideAllQestions" class="icon"></div>
					</div>
					<div v-for="question in questions" :key="question.id">
						<div class="text">
							{{ question.question }} -
							<span> {{ getAnswer(question.answer) }} </span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-if="animatingShowAnswer" class="overlay overlay-animate">
			<div class="overlay__bg_color-white"></div>
			<div
				class="overlay__body flex flex_justify_content_center flex_align-center  full_screen"
			>
				<div class="answer">{{ getAnswer(answer) }}</div>
			</div>
		</div>

		<div v-if="animateRandomRoles" class="overlay overlay-animate">
			<div class="overlay__bg_color-white"></div>
			<div
				class="overlay__body flex flex_justify_content_center flex_align-center  full_screen"
			>
				<div class="title">
					{{ $translate.t('titles.ramdomDecideComputes') }}
				</div>
			</div>
		</div>

		<div
			v-if="game.getGameState === 'play'"
			class="flex flex_justify_content_center flex_align-center  full_screen"
		>
			<Pick @picking="picking" />
		</div>

		<div
			v-if="writer"
			class="flex flex_justify_content_center flex_align-center flex_direction_column  full_screen"
		>
			<Notify v-if="isShowNotify" :title="getNotifyTitle" />
			<div
				v-if="game.getGameState === 'create-answer' && !animateRandomRoles"
				class="game__message"
			>
				{{ currentQuestion }} / {{ countQestions }}
			</div>

			<div class="game__message">{{ getWriterTitle }}</div>
			<div class="game__block">
				<InputCustom
					@updateValues="updateInputData"
					:maxlength="miniumLength ? 40 : 200"
					type="text"
					:placeholder="placeholder"
					initValue=""
				/>
			</div>
			<div @click="submit" class="game__block">
				<Button
					:disabled="inputData === false"
					:theme="inputData ? 'red' : 'red_disabled'"
					:title="$translate.t('button.confirm')"
				/>
			</div>

			<div
				@click="showAllQuestions"
				v-if="isShowButtonViewAllQuestions"
				class="game__block"
			>
				<div class="link__text">
					{{ $translate.t('titles.viewAllQuestions') }}
				</div>
			</div>
		</div>

		<div
			v-if="waiter"
			class="flex flex_justify_content_center flex_direction_column flex_align-center  full_screen"
		>
			<div class="waiter-preloader"></div>
			<div
				v-if="
					role === 'character' &&
						showCountQuestionWhenWaiting &&
						currentQuestion &&
						!animateRandomRoles
				"
				class="game__message"
			>
				{{ currentQuestion }} / {{ countQestions }}
			</div>
			<div class="waiter-title">{{ waitingTitle }}</div>
		</div>

		<div
			v-if="
				game.getGameState === 'answer' ||
					game.getGameState === 'answer-guessing'
			"
			class="game__choose-answer flex flex_justify_content_center flex_align-center flex_direction_column  full_screen"
		>
			<div v-if="game.getGameState === 'answer'" class="game__message">
				{{ currentQuestion }} / {{ countQestions }}
			</div>
			<div class="game__message">{{ question }} ?</div>
			<div class="game__block flex flex_wrap">
				<div @click="makeAnswer(true)" class="game__button">
					<Button theme="red" :title="$translate.t('button.yes')" />
				</div>
				<div @click="makeAnswer(false)" class="game__button">
					<Button theme="red" :title="$translate.t('button.no')" />
				</div>
			</div>
		</div>
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
import $ from 'jquery';
import Pick from './Pick.vue';
import Notify from '@/js/components/Notify.vue';

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
		Notify,
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
			answer: '',
			question: '',
			character: '',
			inputData: '',
			submitDisable: true,
			isMissedQestion: false,
			countQestions: 7,
			currentQuestion: 0,
			questions: [],
			isShowingAllQuestions: false,
			showCountQuestionWhenWaiting: true,
			animatingShowAnswer: false,
			rolesIsRandom: false,
			animateRandomRoles: false,
			isLastQuestion: false,
		};
	},
	mounted() {
		const { onStart, onLose, onWin, onEnd } = this.$callbacks;

		this.$socket.on('win', reason => {
			this.game.players.find(player => {
				if (player.type === 'player') {
					player.state = 'winner';
				}
			});

			onWin(this.getMainPlayer().value);

			this.reseting();
			this.game.finish();

			if (reason === 'timeout') {
				this.partnerIsTimeout = true;
			}
		});

		this.$socket.on('lose', reason => {
			this.game.players.find(player => {
				if (player.type === 'enemy') {
					player.state = 'winner';
				}
			});

			if (reason === 'timeout') {
				this.playerIsTimeout = true;
			}

			onLose(this.getMainPlayer().value);

			this.game.finish();
			this.reseting();
		});

		this.$socket.on(
			'questions-left',
			countQuestions => (this.currentQuestion = countQuestions)
		);

		this.$socket.on('result-role', role => {
			this.role = role;
			this.question = '';
			this.isShowingAllQuestions = false;
			this.questions = [];
			this.showCountQuestionWhenWaiting = true;
			this.partnerIsTimeout = false;
			this.playerIsTimeout = false;

			if (this.role === 'character') {
				if (this.rolesIsRandom) {
					this.animateRandomRoles = true;
					this.game.updateGameState('waiting-partner');
					this.waitingTitle = this.$translate.t('system.waitingStartGame');
					setTimeout(() => {
						this.game.updateGameState('guess-character');
						this.$socket.emit('result-role', this.role);
						this.animateRandomRoles = false;
						this.rolesIsRandom = false;
					}, 3000);
				} else {
					this.game.updateGameState('guess-character');
					this.$socket.emit('result-role', this.role);
				}
			} else {
				if (this.rolesIsRandom) {
					this.animateRandomRoles = true;
					this.game.updateGameState('waiting-partner');
					this.waitingTitle = this.$translate.t('system.waitingStartGame');
					setTimeout(() => {
						this.game.updateGameState('waiting-partner');
						this.waitingTitle = this.$translate.t(
							'waitings.waitChooseCharacter'
						);
						this.animateRandomRoles = false;
						this.$socket.emit('result-role', this.role);
						this.rolesIsRandom = false;
					}, 3000);
				} else {
					this.game.updateGameState('waiting-partner');
					this.waitingTitle = this.$translate.t('waitings.waitChooseCharacter');
					this.$socket.emit('result-role', this.role);
				}
			}
		});

		this.$socket.on('character-chosen', () => {
			if (this.role === 'character') {
				this.game.updateGameState('waiting-partner');
				this.waitingTitle = this.$translate.t('waitings.waitQuestion');
			} else {
				this.game.updateGameState('create-answer');
			}
		});

		this.$socket.on('random-roles', () => (this.rolesIsRandom = true));

		this.$socket.on('question', question => {
			if (this.role === 'character') {
				this.game.updateGameState('answer');
				this.question = question;
			} else {
				this.question = question;
				this.game.updateGameState('waiting-partner');
				this.waitingTitle = this.$translate.t('waitings.waitAnswer');
			}
		});

		this.$socket.on('question-skip', answer => {
			if (this.role === 'character') {
				if (this.currentQuestion === 1) {
					this.currentQuestion = 0;
					this.game.updateGameState('waiting-partner');
					this.waitingTitle = this.$translate.t('waitings.waitGuessing');
				} else {
					this.game.updateGameState('waiting-partner');
					this.waitingTitle = this.$translate.t('waitings.waitQuestion');
				}
			} else {
				this.game.updateGameState('create-answer');
			}
		});

		this.$socket.on('next-question', answer => {
			this.answer = null;
			this.question = null;
			if (this.role === 'guess') {
				if (answer && answer.question) {
					this.answer = answer.answer;
					this.question = answer.question;
					this.questions = [...this.questions, answer];
					this.animatingShowAnswer = true;

					setTimeout(() => {
						this.game.updateGameState('create-answer');
						this.animatingShowAnswer = false;
					}, 3000);
				} else {
					this.game.updateGameState('create-answer');
				}
			} else {
				if (answer.question) {
					this.answer = answer.answer;
					this.question = answer.question;
				}
			}
		});

		this.$socket.on('name', answer => {
			this.currentQuestion = 0;
			if (this.role === 'character') {
				this.game.updateGameState('waiting-partner');
				this.waitingTitle = this.$translate.t('waitings.waitGuessing');
			} else {
				if (answer && answer.length) {
					this.questions = answer
						.filter(_answer => {
							if (_answer.question) {
								return answer;
							}

							return false;
						})
						.filter(_answer => _answer);
					if (this.isLastQuestion) {
						this.answer = answer[answer.length - 1].answer;
						this.animatingShowAnswer = true;

						setTimeout(() => {
							this.game.updateGameState('guessing');
							this.animatingShowAnswer = false;
						}, 3000);
					} else {
						this.game.updateGameState('guessing');
					}
				} else {
					this.game.updateGameState('guessing');
				}
			}
		});

		this.$socket.on('answer-guessing', question => {
			this.question = question;
			this.game.updateGameState('answer-guessing');
		});

		this.$socket.on('character', character => {
			this.character = character;
			this.game.updateGameState('waiting-partner');
			this.waitingTitle = this.$translate.t('waitings.gameResult');
			this.showCountQuestionWhenWaiting = false;
		});
	},
	computed: {
		placeholder() {
			if (this.game.getGameState !== 'create-answer') {
				return this.$translate.t('placeholders.enter');
			} else {
				return this.$translate.t('placeholders.enterQuestion');
			}
		},
		isShowButtonViewAllQuestions() {
			return (
				(this.questions.length && this.game.getGameState === 'create-answer') ||
				this.game.getGameState === 'guessing'
			);
		},
		isShowNotify() {
			return Boolean(this.isMissedQestion);
		},
		getNotifyTitle() {
			if (this.isMissedQestion) {
				return this.$translate.t('titles.missedQuestion');
			}
		},
		title() {
			if (this.enemyIsDisconnected) {
				return this.$translate.t('system.disconnected');
			}

			if (this.partnerIsTimeout) {
				return this.$translate.t('titles.partnerTimeIsOver');
			}

			if (this.playerIsTimeout) {
				return this.$translate.t('titles.playerTimeIsOver');
			}

			if (!this.character) {
				return !this.isDeadHeat
					? this.winnerName
					: this.$translate.t('titles.standoff');
			}

			if (this.character) {
				return this.character;
			}
		},
		waiter() {
			const stateGame = this.game.getGameState;
			return stateGame === 'waiting-partner';
		},
		writer() {
			const stateGame = this.game.getGameState;
			return (
				stateGame === 'guess-character' ||
				stateGame === 'create-answer' ||
				stateGame === 'guessing'
			);
		},
		miniumLength() {
			const stateGame = this.game.getGameState;
			return stateGame === 'guess-character' || stateGame === 'guessing';
		},
		getWriterTitle() {
			const translate = this.$translate;
			switch (this.game.getGameState) {
				case 'guess-character':
					return translate.t('titles.guessCharacter');
				case 'create-answer':
					return translate.t('titles.writeAnswer');
				case 'guessing':
					return translate.t('titles.writeCharacter');
			}
		},
		answerText() {
			const answer = this.answer
				? this.$translate.t('button.yes')
				: this.$translate.t('button.no');
			return `${this.question} - ${answer} `;
		},
	},
	methods: {
		hideAllQestions() {
			this.isShowingAllQuestions = false;
		},
		getAnswer(bool) {
			if (bool) {
				return this.$translate.t('button.yes');
			} else {
				return this.$translate.t('button.no');
			}
		},
		showAllQuestions() {
			this.isShowingAllQuestions = true;
		},
		makeAnswer(answer) {
			switch (this.game.getGameState) {
				case 'answer':
					this.$socket.emit('answer', answer);
					if (this.role === 'character') {
						this.game.updateGameState('waiting-partner');
						this.waitingTitle = this.$translate.t('waitings.waitQuestion');
					}
					break;

				case 'answer-guessing':
					this.$socket.emit('finish', answer);
					break;
			}

			if (this.currentQuestion === 1) {
				this.currentQuestion = 0;
				this.game.updateGameState('waiting-partner');
				this.waitingTitle = this.$translate.t('waitings.waitGuessing');
			}
		},
		updateInputData(_, value) {
			this.inputData = value;
		},
		picking(pick) {
			this.pick = pick;
			this.$socket.emit('pick-finish', this.pick);
			this.game.updateGameState('waiting-partner');
			this.waitingTitle = this.$translate.t('waitings.pickPartner');
		},
		submit() {
			if (this.inputData) {
				if (this.currentQuestion === 1) {
					this.isLastQuestion = true;
				}
				this.isMissedQestion = false;
				switch (this.game.getGameState) {
					case 'guess-character':
						this.$socket.emit('character-chosen', this.inputData);
						this.inputData = '';
						break;
					case 'create-answer':
						this.$socket.emit('question', this.inputData);
						this.game.updateGameState('waiting-partner');
						this.waitingTitle = this.$translate.t('waitings.waitAnswer');
						this.inputData = '';
						break;
					case 'guessing':
						this.$socket.emit('name', this.inputData);
						this.game.updateGameState('waiting-partner');
						this.waitingTitle = this.$translate.t('waitings.waitAnswer');
						this.inputData = '';
						break;
				}
			}
		},
		getTimerTime(time) {
			const timeIsLeft = time === 0;
			const playerValue = this.game.players.find(
				player => player.type === 'player'
			).value;
			if (timeIsLeft) {
				switch (this.game.getGameState) {
					case 'play':
						this.$socket.emit('pick-finish', this.pick);
						break;
					case 'guess-character':
						this.$socket.emit('character-chosen', null);
						break;
					case 'create-answer':
						this.isMissedQestion = true;
						this.game.updateGameState('lose-answer');
						this.$socket.emit('question', null);
						break;
					case 'answer':
						this.$socket.emit('answer', null);
						break;
					case 'guessing':
						this.$socket.emit('name', null);
						break;
					case 'answer-guessing':
						this.$socket.emit('finish', null);
						break;
				}
			}
		},
	},
};
</script>
