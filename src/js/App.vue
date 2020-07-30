<template>
	<div class="full_screen">
		<Connection message="Connection" v-if="appIsLoading" />
		<component v-else :is="currentGame"></component>
	</div>
</template>

<script>
import Connection from '@/js/views/Connection.vue';
import GameOne from '@/game_one/js/components/GameOne.vue';
import GameTwo from '@/game_two/js/components/GameTwo.vue';
import GameThree from '@/game_three/js/components/GameThree.vue';
import GameFour from '@/game_four/js/components/GameFour.vue';
import { mapState } from 'vuex';

export default {
	components: { Connection, GameOne, GameTwo, GameThree, GameFour },
	data() {
		return {
			currentGame: null,
			appIsLoading: true,
		};
	},
	computed: {
		...mapState(state => {}),
	},
	mounted() {
		this.appIsLoading = false;
		this.$socket.on('connect', () => {
			// this.appIsLoading = false;
			// this.$socket.emit('ready');
			// this.$socket.emit('ready', 'connected');
		});

		// this.$socket.on('user-data"', ev => {
		// 	console.log(ev);
		// 	// this.appIsLoading = false;
		// });

		// this.$socket.on('waiting-connection-partner', () => {
		// 	this.$socket.emit('ready', 'connected');
		// });

		// this.$socket.on('connected', () => {
		// 	this.$socket.emit('getState');
		// 	this.appIsLoading = false;
		// });
	},
	created() {
		this.currentGame = this.$root._data.game;
	},
};
</script>
