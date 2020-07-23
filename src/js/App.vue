<template>
		<div class="full_screen">
			<Connection v-if="appIsLoading" />
			<component v-else :is="currentGame"></component>
		</div>
</template>

<script>
import Connection from '@/js/views/Connection.vue';
import GameOne from '@/game_one/js/components/GameOne.vue';
import GameTwo from '@/game_two/js/components/GameTwo.vue';
import GameThree from '@/game_three/js/components/GameThree.vue';

export default {
	components: { Connection, GameOne, GameTwo, GameThree },
	data() {
		return {
			currentGame: null,
			appIsLoading: true
		}
	},
	mounted() {
		window.addEventListener('load', () => this.appIsLoading = false)
	},
	created() {
		this.currentGame = this.$root._data.game;
	},
};
</script>
