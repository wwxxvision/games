<template>
	<div class="full_screen">
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
			systemText: ''
		};
	},
	computed: {
		...mapState(['appIsLoading']),
	},
	mounted() {
		this.systemText = this.$translate.t('system.connecting');
		this.$socket.on('start', () => {
			this.$socket.emit('ready');
			this.$store.commit('updateAppLoading', {
				text: this.$translate.t('system.waitingStartGame'),
			});
		});
	},
	created() {
		this.currentGame = this.$root._data.game;
	},
	watch: {
		appIsLoading(value) {
			if (value)
			this.systemText = value.text;
		}
	}
};
</script>
