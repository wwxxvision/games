<template>
	<div class="slider">
		<div class="slider__wrapper">
			<div
				@click="changeSlide('prev')"
				class="slider__button slider__button_dir-left slider__button_box-grey"
			>
				<div class="slider__icon"></div>
			</div>
			<div
				v-for="(slide, index) of data"
				:key="index"
				:class="{'slider__slide': true, 'slider__slide_state-visibility': index === step}"
			>
				<div
					v-for="(value, index) of slide"
					:key="index"
					:class="{'slider__value': true, 'slider__value_box-grey': true, 'slider__value_active':  selectedItem === value}"
					@click="select(value)"
				>
					<span>{{value}}</span>
				</div>
			</div>
			<div
				@click="changeSlide('next')"
				class="slider__button slider__button_dir-right slider__button_box-grey"
			>
				<div class="slider__icon"></div>
			</div>
		</div>
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
	mounted() {},
};
</script>