<template>
	<div
		:class="{
			progressGame: true,
			'progress_time-is-running': timeIsRunnigOut && !timeIsFinished,
			'progress_time-is-finished': timeIsFinished,
			[gameName]: true,
		}"
	>
		<div class="progress__text">{{ formatedTime }}</div>
	</div>
</template>

<script>
import $ from 'jquery';
import { Helpers } from '@/js/classes/core';
import circleProgress from 'jquery-circle-progress';

export default {
	props: {
		timeInSec: {
			type: Number,
		},
		gameState: {
			type: String,
		},
		gameName: {
			type: String,
		},
	},
	data() {
		return {
			indicator: this.timeInSec,
			step: 1 / this.timeInSec,
			currentDegress: 1,
			timeIsRunnigOut: false,
			timeRunOut: 3,
			timeIsFinished: false,
			interval: null,
			size: 120,
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
	methods: {
		start() {
			this.runTimer();
			this.drawProgress();
			let self = this;
			window.addEventListener('resize', () => self.drawProgress());
			$('.progressGame canvas').css({
				'background-color': '#FFFFFF',
				'border-radius': '50%',
			});
		},
		reset() {
			this.indicator = this.timeInSec;
			this.step = 1 / this.timeInSec;
			this.currentDegress = 1;
			this.timeIsRunnigOut = false;
			this.timeRunOut = 3;
			this.timeIsFinished = false;
			this.moveTop('.progress__indicator', 'init');
		},
		resetWitTime(time) {
			clearInterval(this.interval);
			this.indicator = time;
			this.step = 1 / time;
			this.currentDegress = 1;
			this.timeIsRunnigOut = false;
			this.timeRunOut = 3;
			this.timeIsFinished = false;
			this.moveTop('.progress__indicator', 'init');
		},
		drawProgress() {
			$('.progressGame').circleProgress({
				value: this.currentDegress,
				size: this.size,
				fill: {
					color: '#EF4141',
				},
				animation: false,
				emptyFill: '#FFE5D2',
				startAngle: -Math.PI / 2,
			});
		},
		moveTop(el, isInit) {
			$(el).css({
				top: !isInit ? `${100 / this.indicator}%` : '0%',
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
			}, 1000);
		},
	},
	watch: {
		indicator(value) {
			this.$emit('getTimerTime', value);
			if (value === 0) {
				clearInterval(this.interval);
				this.reset();
				this.indicator = 0;
			}
		},
		gameState(state) {
			switch (state) {
				case 'play':
					this.reset();
					this.start();
					break;
				case 'finished':
					this.reset();
					this.indicator = 0;
					break;
				case 'guess-character':
					this.resetWitTime(20);
					this.start();
					break;
				case 'create-answer':
					this.resetWitTime(20);
					this.start();
					break;
				case 'answer':
					this.resetWitTime(10);
					this.start();
					break;
				case 'guessing':
					this.resetWitTime(20);
					this.start();
					break;
				case 'answer-guessing':
					this.resetWitTime(10);
					this.start();
					break;
				case 'waiting-partner':
					this.reset();
					this.indicator = 0;
					break;
			}
		},
	},
};
</script>