<template>
	<div class="game game-two">
		<Modal
			v-if="gameState === 'finished'"
			:title="title"
			:titleTheme="'blue'"
		>
			<Winner :isDeadHeat="isDeadHeat" :players="game.players" />
			<template  v-if="!enemyIsDisconnected" v-slot:footer>
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

		<div
			v-if="gameState === 'play' && iconsIsRender"
			@click="playerTap"
			:class="{
				'game__item-chat-icon': true,
				'game__item-chat-icon_state-winner':
					iconSelect && iconSelect.type === 'player',
				'game__item-chat-icon_state-lose':
					iconSelect && iconSelect.type === 'enemy',
			}"
		>
			<div class="check-icon"></div>
			<div :class="{ icon: true, rotate: iconSelect }"></div>
		</div>
		<Progress
			:gameName="'game-two'"
			:gameState="game.getGameState"
			:timeInSec="gameTime"
			@getTimerTime="getTimerTime"
		/>
		<GameScreen
			:gameName="'game-two'"
			:withoutBorders="true"
			v-for="(player, index) in game.players"
			:key="index"
			:dir="getScreenDir(player.type)"
		>
			<div class="game__block game__block_size-full_screen relative"></div>
			<div
				class="game__block game__block_font-bold  flex flex_justify_content_center text-align-center"
			>
				<div class="game__block relative">
					<div>{{ player.name }}</div>
					<div
						v-if="iconSelect && iconSelect.type === player.type"
						:class="{
							'absolute add-score-decor': true,
							'add-score-decor_animate-hide': iconSelect,
						}"
					>
						+ 1
					</div>
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
import $ from 'jquery';

export default {
	name: 'game-two',
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
			game: null,
			gameInitValue: 0,
			gameTime: 40, // in seconds,
			iconsIsRender: false,
			iconSelect: false,
			chatIcon: '.game__item-chat-icon',
		};
	},
	mounted() {
		this.$socket.on('new-icon', ({x, y}) => {
			this.iconSelect = false;
			this.iconsIsRender = true;
			this.setIconPos(x, y);
		});

		this.$socket.on('partner-click', () => {
			this.addScore('enemy');
		});
	},
	computed: {
		winnerName() {
			const winner = this.game.players.find(
				player => player.state === 'winner'
			);
			if (winner) {
				return winner.name;
			}
		},
		title() {
			if (this.enemyIsDisconnected) {
				return this.$translate.t('system.disconnected');
			}
			else {
				return !this.isDeadHeat ? this.winnerName : this.$translate.t('titles.standoff')
			}
		}
	},
	methods: {
		setIconPos(x, y) {
			$(this.chatIcon).css({
				top: x + '%',
				left: y + '%',
			});
		},
		selectIcon(type) {
			this.iconSelect = {
				type,
			};
		},
		playerTap() {
			if (!this.iconSelect)
			this.addScore('player');
			this.$socket.emit('player-click');
		},
		addScore(playerType) {
			this.game.players.find(player => {
				if (player.type === playerType) {
					player.setValue((player.value += 1));
				}
			});

			this.selectIcon(playerType);
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
