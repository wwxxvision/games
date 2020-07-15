<template>
	<div
		:class="{progress: true, 'progress_time-is-running': timeIsRunnigOut && !timeIsFinished, 'progress_time-is-finished': timeIsFinished}"
	>
	<div class="progress__text">{{ formatedTime }}</div>
	</div>
</template>

<script>
import $ from 'jquery';
import Helpers from '@/js/classes/core/Helpers';
import circleProgress from 'jquery-circle-progress';
export default {
	props: {
		needReset: {
			type: Boolean
		}
	},
	data() {
		return {
			indicator: 15,
			step: 1 / 15 ,
			currentDegress: 1,
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
		this.drawProgress();
		let self = this;
		window.addEventListener('resize', () => {
			self.drawProgress();
		});
		$('.progress canvas').css({'background-color': "#FFFFFF", 'border-radius': '50%'});
	},
	methods: {
		drawProgress() {
				$('.progress').circleProgress({
					value: this.currentDegress,
					size: 120,
					fill: {
						color: '#EF4141'
					},
					animation: false,
					emptyFill: '#FFE5D2',
					startAngle: - Math.PI / 2
			});
		},
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
			this.reverseIndicator++;
			if (this.indicator >= 0) {
				this.currentDegress -= this.step;
				this.drawProgress();
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
			this.step = 1  / 15;
			this.currentDegress = 1;
			this.timeIsRunnigOut = false;
			this.timeRunOut = 3;
			this.timeIsFinished = false;
			this.moveTop('.progress__indicator', 'init');
			this.runTimer();
			this.drawProgress();
		}
	},
};
</script>