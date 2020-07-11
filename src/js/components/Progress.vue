<template>
	<div
		:class="{progress: true, 'progress_time-is-running': timeIsRunnigOut && !timeIsFinished, 'progress_time-is-finished': timeIsFinished}"
	>
		<div class="progress__bg"></div>
		<div class="progress__text">{{formatedTime}}</div>
		<div data-progress="50" class="progress__indicator"></div>
		<div class="progress__overlay"></div>
		<div class="progress__cursor-wrapper">
			<div class="progress__cursor">
				<div class="circle">
					<div class="circle-red"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import $ from 'jquery';
import Helpers from '@/js/classes/core/Helpers';

export default {
	data() {
		return {
			indicator: 20,
			step: -180 / 20,
			currentDegress: 0,
			timeIsRunnigOut: false,
			timeRunOut: 3,
			timeIsFinished: false,
			interval: null,
		};
	},
	computed: {
		formatedTime() {
			if (this.indicator > this.timeRunOut) {
				return Helpers.sec2time(this.indicator);
			}

			if (this.indicator === 0) {
				this.timeIsFinished = true;
			}

			this.timeIsRunnigOut = true;
			return this.indicator;
		},
	},
	mounted() {
		this.interval = setInterval(interval => {
			this.indicator--;
			if (this.indicator >= 0) {
				this.currentDegress += this.step;
				this.rotate('.progress__overlay');
				this.rotate('.progress__cursor-wrapper');

				return interval;
			}
		}, 1000);
	},
	methods: {
		rotate(el) {
			$(el).css({
				transform: 'rotate(' + this.currentDegress + 'deg)',
			});
		},
	},
	watch: {
		indicator(value) {
			if (value === 0) {
				clearInterval(this.interval);
			}
		},
	},
};
</script>