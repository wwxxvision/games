<template>
	<div
		:class="{progress: true, 'progress_time-is-running': timeIsRunnigOut && !timeIsFinished, 'progress_time-is-finished': timeIsFinished}"
	>
		<div class="progress__bg"></div>
		<div class="progress__text">{{formatedTime}}</div>
		<div class="progress__indicator"></div>
		<div class="progress__overlay"></div>
		<!-- <div class="progress__cursor-wrapper">
			<div class="progress__cursor">
				<div class="circle">
					<div class="circle-red"></div>
				</div>
			</div>
		</div> -->
	</div>
</template>

<script>
import $ from 'jquery';
import Helpers from '@/js/classes/core/Helpers';

export default {
	props: {
		needReset: {
			type: Boolean
		}
	},
	data() {
		return {
			indicator: 15,
			step: -360 / 15 ,
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
		this.runTimer();
	},
	methods: {
		rotate(el) {
			$(el).css({
				transform: 'rotate(' + this.currentDegress + 'deg)',
			});
		},
		moveTop(el, isInit) {
			$(el).css({
				'top': !isInit ? `${(100  / this.indicator)}%` : '0%',
			});
		},
			runTimer() {
			this.interval = setInterval(interval => {
			this.indicator--;
			if (this.indicator >= 0) {
				this.currentDegress += this.step;
				this.moveTop('.progress__indicator');
				return interval;
			}
			}	, 1000);
		}
	},
	watch: {
		indicator(value) {
			if (value === 0) {
				clearInterval(this.interval);
				this.$emit('getTimerTime', 0);
			}
		},
		needReset() {
			this.indicator = 15;
			this.step =-360 / 15;
			this.currentDegress = 0;
			this.timeIsRunnigOut = false;
			this.timeRunOut = 3;
			this.timeIsFinished = false;
			this.moveTop('.progress__indicator', 'init');
			this.runTimer();
		}
	},
};
</script>