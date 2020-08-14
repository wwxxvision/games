<template>
	<div :dir="$direction" class="game-app full_screen box">
		<Connection :message="systemText" v-if="appIsLoading" />
		<component :is="currentGame"></component>
	</div>
</template>

<script>
import Connection from '@/js/views/Connection.vue';
import GameOne from '@/game_one/js/components/GameOne.vue';
import GameTwo from '@/game_two/js/components/GameTwo.vue';
import GameThree from '@/game_three/js/components/GameThree.vue';
import GameFour from '@/game_four/js/components/GameFour.vue';
import { mapState, mapMutations } from 'vuex';

export default {
	components: { Connection, GameOne, GameTwo, GameThree, GameFour },
	data() {
		return {
			currentGame: null,
			systemText: '',
			isDev: process.env.NODE_ENV === 'development'
		};
	},
	computed: {
		...mapState(['appIsLoading']),
	},
	methods: {
		gameInit() {
			if (this.isDev) {
				this.$socket.emit('start-game-render');
			}

			this.$store.commit('updateAppLoading', {
				text: this.$translate.t('system.connecting'),
			});

			this.$socket.emit('game-id', this.getIdByGameName());
			this.$socket.on('start', () => {
				this.$socket.emit('ready');
				this.$store.commit('updateAppLoading', {
					text: this.$translate.t('system.waitingStartGame'),
				});
			});
		},
		getIdByGameName() {
			switch (this.currentGame) {
				case 'game-one':
					return 1;
				case 'game-two':
					return 2;
				case 'game-three':
					return 3;
				case 'game-four':
					return 4;
			}
		},
	},
	watch: {
		appIsLoading(value) {
			if (value) this.systemText = value.text;
		},
		['$root._data.game'](currentGame) {
			this.currentGame = currentGame;
			this.gameInit();
		},
	},
};
</script>
