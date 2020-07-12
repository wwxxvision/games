<template>
		<!-- <template v-if="appIsLoading">
			<Connection />
		</template>-->
		<component v-bind:is="currentGame"></component>
</template>

<script>
import Connection from '@/js/views/Connection.vue';
import Progress from '@/js/components/Progress.vue';
import Slider from '@/js/components/Slider.vue';
import Input from '@/js/components/Input.vue';
import GameOne from '@/game_one/js/components/GameOne.vue';

export default {
	components: { Connection, Progress, Slider, Input, GameOne },
	data() {
		return {
			currentGame: null
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
