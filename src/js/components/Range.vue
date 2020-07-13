<template>
	<div class="range">
		<input min="1" max="1000" class="range__item" type="range" />
	</div>
</template>

<script>
import $ from 'jquery';

export default {
	data() {
		return {
			slider: null,
			step: 0,
			selectedItem: null,
		};
	},
	methods: {
		changeSlide(dir) {
			const stepIsLessDataLength = this.step + 1 < this.data.length;
			const stepIsPossitive = this.step > 0;
			switch (dir) {
				case 'next':
					if (stepIsLessDataLength) this.step += 1;
					break;
				case 'prev':
					if (stepIsPossitive) this.step -= 1;
					break;
			}
		},
		select(value) {
			this.selectedItem = value;
		},
	},
	props: {
		data: {
			type: Array,
		},
	},
	mounted() {

	},
};
</script>