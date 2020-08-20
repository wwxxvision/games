<template>
	<div class="game game-three">
		<Modal
			v-if="gameState === 'finished'"
			:title="title"
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
			:gameName="'game-one'"
			:gameState="game.getGameState"
			:timeInSec="gameTime"
			@getTimerTime="getTimerTime"
		/>

		<GameScreen
			:gameName="'game-one'"
			v-for="(player, index) in game.players"
			:key="index"
			:dir="getScreenDir(player.type)"
		>
			<div
				class="game__block game__block_auto flex flex_justify_content_center flex_align_items_center"
			>
				<div
					@mousedown="ev => tapIcon(ev, player.type)"
					@mouseup="disableTap(player.type)"
					@touchend="disableTap(player.type)"
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
				class="game__block game__block_font-bold block flex flex_justify_content_center text-align-center"
			>
				<div class="game__block">
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
			gameTime: 20, // in seconds,
			bgMusic: 'bg_2',
		};
	},
	computed: {
		title() {
			if (this.enemyIsDisconnected) {
				return this.$translate.t('system.disconnected');
			}
			else {
				return !this.isDeadHeat ? this.winnerName : this.$translate.t('titles.standoff')
			}
		}
	},
	mounted() {
		this.$socket.on('partner-click', () => {
			this.addScore('enemy');
			this.animateIcon('enemy');
			setTimeout(() => this.disableTap('enemy'), 300);
		});
	},
	methods: {
		tapIcon(ev, playerType) {
			if (playerType === 'player') {
				this.addScore('player')
				this.animateIcon('player');
				this.$socket.emit('player-click');
			}
		},
		animateIcon(playerType) {
			const icon = $(`.game__third-icon_type-${playerType}`);
			if (icon.hasClass('animate-back-drop')) {
				icon.removeClass('animate-back-drop');
			}

			icon.addClass('animate');
			this.tap = playerType;
		},
		disableTap(playerType) {
			const icon = $(`.game__third-icon_type-${playerType}`);
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
