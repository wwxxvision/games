<template>
	<div class="range">
		  <vue-slider
			:disabled="disabled"
			:direction="$direction"
			:processStyle="{
				height: '9px',
				borderRadius: 2,
				backgroundColor: '#EF4141'
			}"
			@change="updated" :min="1" :max="1000" tooltip="none" v-model="value" />
	</div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
	data() {
		return {
			value: 1,
		};
	},
	components: {
		VueSlider
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
			if (!this.disabled) {
				this.$emit('updateValues', this.playerType, this.value);
			}
		}
	},
	watch: {
		initValue(value) {
			this.value = value;
		}
	}
};
</script>