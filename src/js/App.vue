<template>
		<div class="full_screen">
			<Connection v-if="appIsLoading" />
			<component  v-else :is="currentGame"></component>
		</div>
</template>

<script>
import Connection from '@/js/views/Connection.vue';
import GameOne from '@/game_one/js/components/GameOne.vue';

export default {
	components: { Connection, GameOne },
	data() {
		return {
			currentGame: null,
			appIsLoading: true
		}
	},
	beforeMount() {
		let self = this;
		window.addEventListener('load', function () {
			self.appIsLoading = false;
		})
	},
	created() {
		this.currentGame = this.$root._data.game;
	},
};
</script>
