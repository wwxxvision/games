<template>
	<div class="range">
		<input @input="updated" v-model="value" class="range__item" type="range" :disabled="disabled" :max="1000" :min="1" :step="1" />
	</div>
</template>

<script>

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
		updated(value) {
			if (!this.disabled) {
				this.$emit('updateValues', this.playerType, value);
			}
		},
	},
	watch: {
		initValue(value) {
			this.value = value;
		},
	}
};
</script>