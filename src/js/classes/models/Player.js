export default class Player {
	constructor(type) {
		this.type = type;
		this.value = null;
		this.state = 'default';
	}

	reset() {
		this.value = 1;
		this.state = 'default';
	}

	getType() {
		return this.type;
	}

	setValue(newValue) {
		this.value = newValue;
	}
}
