<template>
	<div class="range">
		<input  class="range__item" v-model="value" @input="updated" :disabled="disabled" :min="1" :step="1" :max="1000" type="range" />
	</div>
</template>

<script>
import $ from 'jquery';
import rangeslider from 'rangeslider.js';

export default {
	data() {
		return {
			value: 1,
		};
	},
	mounted() {
 		$('.range__item').rangeslider();
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