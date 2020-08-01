<template>
	<div class="range">
		<input v-model="value" @input="updated" :disabled="disabled" :min="1" :step="1" :max="1000" class="range__item" type="range" />
	</div>
</template>

<script>
import $ from 'jquery';

export default {
	data() {
		return {
			value: 1,
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
	methods: {
		updated() {
			this.$emit('updateValues', this.playerType, this.value);
		}
	},
	watch: {
		initValue(value) {
			this.value = value;
		}
	}
};
</script>