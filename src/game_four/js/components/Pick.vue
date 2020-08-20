<template>
	<div class="pick flex">
		<div @click="makePick('character')" :class="getActiveClass('character')">
			<div class="pick__icon pick__icon_type-player"></div>
			<div class="pick__title">{{ $translate.t('picks.character') }}</div>
		</div>
		<div @click="makePick('guess')" :class="getActiveClass('guess')">
			<div class="pick__icon pick__icon_type-enemy"></div>
			<div class="pick__title">{{ $translate.t('picks.guess') }}</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			pick: null,
		};
	},
	methods: {
		makePick(type) {
			this.pick = type;

			this.$emit('picking', this.pick);
		},

		getActiveClass(type) {
			return {
				pick__item: true,
				'pick__item_state-active': type === this.pick,
			};
		},
	},
};
</script>