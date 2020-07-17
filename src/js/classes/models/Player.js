export default class Player {
	constructor(type, name) {
		this.type = type;
		this.value = null;
		this.state = 'default';
		this.name = name;
	}

	reset(initValue) {
		this.value = initValue;
		this.state = 'default';
	}

	setValue(newValue) {
		this.value = newValue;
	}
}
