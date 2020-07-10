export default class Game {
	constructor() {
		this.timeInMs = 0;
		this.timeInS = this.timeInMs / 1000;
		this.ticks = this.timeInS;
		this.interval = null;
		this.timer = null;
		this.timerInstance = null;
	}

	setTimer(TimerInstance) {
		this.timerInstance = new TimerInstance();
	}

	setGameTimeInMs(timeInMs) {
		this.timeInMs = timeInMs;
	}

	reset() {}

	finish() {
		this.interval = clearInterval(this.interval);
		this.timer = clearTimeout(this.timer);
		this.ticks = 0;
	}

	run() {
		this.interval = setInterval(interval => {
			this.ticks -= 1;

			this.timerInstance.showTime(this.ticks);
			return interval;
		}, 1000);

		this.timer = setTimeout(timer => {
			this.finish();

			return timer;
		}, this.timeInMs);
	}
}
