<template>
		<!-- <template v-if="appIsLoading">
			<Connection />
		</template>-->
		<component :is="currentGame"></component>
</template>

<script>
import Connection from '@/js/views/Connection.vue';
import GameOne from '@/game_one/js/components/GameOne.vue';

export default {
	components: { Connection, GameOne },
	data() {
		return {
			currentGame: null,
		}
	},
	beforeCreate() {
		this.currentGame = this.$root._data.game;
	},
	data() {
		return {
			appIsLoading: true,
		};
	},
};
</script>
