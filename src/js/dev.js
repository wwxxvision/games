import io from 'socket.io-client';
import { CONFIG } from './config';

export default async function runDevelopment(Core) {
	let lastTouchEnd = 0;
	document.addEventListener(
		'touchend',
		function (event) {
			let now = new Date().getTime();
			if (now - lastTouchEnd <= 250) {
				event.preventDefault();
			}
			lastTouchEnd = now;
		},
		false
	);
	const socket = io(CONFIG.SOCKET_URL);
	const core = new Core(socket, '#root', 'en', 'rtl', {
		onStart: () => null,
		onEnd: () => null,
		onLose: () => null,
		onWin: () => null,
		onStandOff: () => null,
	});

	await core.init();

	core.newGame('game-three');
}
