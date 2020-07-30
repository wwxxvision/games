<template>
	<div class="game game-three">
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
			:gameName="'game-one'"
			:gameState="game.getGameState"
			:timeInSec="20"
			@getTimerTime="getTimerTime"
		/>
		<GameScreen
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
		</GameScreen>
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
			tap: false,
			gameTime: 40, // in seconds,
			bgMusic: 'bg_2',
		};
	},
	methods: {
		mounted() {
			window.addEventListener('load', function() {
				setTimeout(function() {
					window.scrollTo(0, 1);
				}, 0);
			});
			setTimeout(timer => {
				this.addScore('enemy');
				this.iconSelect = {
					type: 'enemy',
				};
			}, 2000);
		},
		tapIcon(ev, playerType) {
			const icon = $('.game__third-icon_type-player');
			if (icon.hasClass('animate-back-drop')) {
				icon.removeClass('animate-back-drop');
			}
			if (playerType === 'player') {
				icon.addClass('animate');
				this.tap = playerType;
				this.addScore(playerType);
			}
		},
		disableTap() {
			const icon = $('.game__third-icon_type-player');
			icon.removeClass('animate');
			icon.addClass('animate-back-drop');
			this.tap = false;
		},
		addScore(playerType) {
			this.game.players.find(player => {
				if (player.type === playerType) {
					player.setValue((player.value += 1));
				}
			});
		},
		getWinner() {
			const playerValues = this.game.players.map(player => player.value);
			const maxValue = Math.max.apply(null, playerValues);
			this.game.players.find(player => {
				if (player.value === maxValue) {
					player.state = 'winner';
				}
			});
		},
	},
};
</script>
