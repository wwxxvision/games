import $ from 'jquery';

export default class Timer {
	constructor() {
		this.domLink = $('.game__timer');
	}

	showTime(currentTick) {
		this.domLink.text(currentTick);
	}
}
