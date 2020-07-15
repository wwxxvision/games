<template>
	<div class="range">
		<input v-model="value" :disabled="disabled" :min="1" :step="1" :max="1000" class="range__item" type="range" />
	</div>
</template>

<script>
import $ from 'jquery';

export default {
	data() {
		return {
			value: 0,
		};
	},
	props: {
		disabled: {
			type: Boolean
		},
		initValue: {
			type: Number
		},
		playerType: {
			type: String
		}
	},
	watch: {
		value(value) {
			this.$emit('updateValues', this.playerType, value);
		},
		initValue(value) {
			this.value = value;
		}
	}
};
</script>