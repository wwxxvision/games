class Helpers {
	sec2time(timeInSeconds) {
		const pad = (num, size) => ('000' + num).slice(size * -1);
		const time = parseFloat(timeInSeconds).toFixed(3);
		const hours = Math.floor(time / 60 / 60);
		const minutes = Math.floor(time / 60) % 60;
		const seconds = Math.floor(time - minutes * 60);
		const hour = 60;

		if (timeInSeconds < hour) {
			return pad(minutes, 2) + ':' + pad(seconds, 2);
		}

		return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2);
	}

	randomInteger(min, max) {
		let rand = min + Math.random() * (max + 1 - min);
		return Math.floor(rand);
	}
}

export default new Helpers();
