<template>
	<div class="range">
		<!-- <input  class="range__item" v-model="value" @input="updated" :disabled="disabled" :min="1" :step="1" :max="1000" type="range" /> -->
		  <vue-slider
			:disabled="disabled"
			:direction="$direction"
			:processStyle="{
				height: '4px',
				borderRadius: 2,
				backgroundColor: '#EF4141'
			}" :dotStyle="{
				borderRadius: '50%',
				height: '15px',
				width: '15px',
				backgroundColor: '#EF4141',
				border: 'none',
				active: {
					border: 'none'
				}
			}" @change="updated" :dotSize="15" :min="1" :max="1000" tooltip="none" v-model="value" />
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