<template>
	<div class="screen">
		<!-- <template v-if="appIsLoading">
			<Connection />
		</template>-->

		<Progress />
	</div>
</template>

<script>
import Connection from '@/js/views/Connection.vue';
import Progress from '@/js/components/Progress.vue';

export default {
	components: { Connection, Progress },
	data() {
		return {
			appIsLoading: true,
		};
	},
};
</script>
