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
					@click="ev => tapIcon(ev, player.type)"
					ref="icon"
					:class="`game__third-icon game__third-icon_type-${player.type}`"
				></div>
			</div>
			<div
				class="game__block game__block_font-bold flex flex_justify_content_center text-align-center"
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
			isTap: false,
			gameTime: 40, // in seconds,
		};
	},
	created() {
		this.render();
		// this.fakeAddScoreEnemy();
	},
	methods: {
		animate() {
			const icon = $('.game__third-icon.game__third-icon_type-player');
			if (icon.hasClass('animate-back-drop')) {
				icon.removeClass('animate-back-drop');
			}
			this.isTap = true;
			icon.addClass('animate');
			icon.on(
				'transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd',
				function() {
					$(this).addClass('animate-back-drop');
					$(this).removeClass('animate');
					this.isTap = false;
				}
			);
		},
		tapIcon(ev, playerType) {
			if (playerType === 'player') {
				this.animate();
			}
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
