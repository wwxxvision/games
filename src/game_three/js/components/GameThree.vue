<template>
	<div class="game game-three">
		<Modal
			v-if="gameState === 'finished'"
			:title="serverValue"
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
					ref="icon"
					:class="
						`game__third-icon game__third-icon_type-${player.type} relative`
					"
				>
					<div
						:class="{
							'absolute add-score-decor': true,
							'add-score-decor_animate-hide': tap === player.type,
						}"
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
import anime from 'animejs/lib/anime.es.js';
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
		};
	},
	created() {
		this.render();
		// this.fakeAddScoreEnemy();
	},
	methods: {
		tapIcon(ev, playerType) {
			const icon = $('.game__third-icon.game__third-icon_type-player');
			if (playerType === 'player') {
				if (icon.hasClass('animate-back-drop')) {
					icon.removeClass('animate-back-drop');
				}
				this.tap = playerType;
				icon.addClass('animate');
				this.addScore(playerType);
			}
		},
		disableTap() {
			const icon = $('.game__third-icon.game__third-icon_type-player');
			this.tap = false;
			icon.removeClass('animate');
			icon.addClass('animate-back-drop');
		},
		addScore(playerType) {
			this.game.players.find(player => {
				if (player.type === playerType) {
					player.setValue((player.value += 1));
				}
			});
		},
		render() {},

		// addScore(playerType) {
		//    this.game.players.find(player => {
		//     if (player.type === playerType) {
		//       player.setValue(player.value += 1);
		//     }
		//   });

		//   setTimeout(() =>  this.render(), 300);
		// },
		getWinner() {
			// const playerValues = this.game.players.map(player => player.value);
			// const maxValue = Math.max.apply(null, playerValues);
			// this.game.players.find(player => {
			//   if (player.value === maxValue) {
			//     player.state = 'winner';
			//   }
			// });
		},
	},
};
</script>
