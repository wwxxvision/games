<template>
	<div @click="click" :class="`button-game button_theme-${theme}`">
		<div>{{ title }}</div>
	</div>
</template>

<script>
export default {
	props: {
		theme: {
			type: String,
			default: 'red',
		},
		title: {
			type: String,
		},
		disabled: {
			type: Boolean,
		},
	},
	methods: {
		click() {
			if (!this.disabled) this.$emit('clicked');
		},
	},
};
</script>