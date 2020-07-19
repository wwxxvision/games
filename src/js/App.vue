<template>
		<div class="full_screen">
			<Connection v-if="appIsLoading" />
			<component  v-else :is="currentGame"></component>
		</div>
</template>

<script>
import Connection from '@/js/views/Connection.vue';
import GameOne from '@/game_one/js/components/GameOne.vue';
import GameTwo from '@/game_two/js/components/GameTwo.vue';

export default {
	components: { Connection, GameOne, GameTwo },
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
