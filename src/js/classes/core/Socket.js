import io from 'socket.io-client';

class Socket {
	constructor() {
		this.socket = io('http://localhost');
	}

	connect() {
		this.socket.on('connect', () => {
			return Promise.resolve(true);
		});

		this.socket.on('connect', () => {
			return Promise.resolve();
		});
	}
}

export default new Socket();
