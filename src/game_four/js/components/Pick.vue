<template>
	<div class="pick flex">
		<div @click="picking('player')" :class="getActiveClass('player')">
			<div class="pick__icon pick__icon_type-player"></div>
			<div class="pick__title">{{ $translate.t('titles.mainPlayer') }}</div>
		</div>
		<div @click="picking('enemy')" :class="getActiveClass('enemy')">
			<div class="pick__icon pick__icon_type-enemy"></div>
			<div class="pick__title">{{ $translate.t('titles.enemy') }}</div>
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
		picking(type) {
			if (this.pick === type) {
				this.pick === null;
			} else {
				this.pick = type;
			}
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