<template>
	<div class="screen">
		<!-- <template v-if="appIsLoading">
			<Connection />
		</template>-->

		<Progress />
		<Slider :data="[[1, 2, 3 ,4,5,6 ,7,],[ 8, 9, 10, 11, 12 ,13 ,14]]" />
	</div>
</template>

<script>
import Connection from '@/js/views/Connection.vue';
import Progress from '@/js/components/Progress.vue';
import Slider from '@/js/components/Slider.vue';

export default {
	components: { Connection, Progress, Slider },
	data() {
		return {
			appIsLoading: true,
		};
	},
};
</script>
