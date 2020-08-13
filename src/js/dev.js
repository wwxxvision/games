import io from 'socket.io-client';
import { CONFIG } from './config';

export default async function runDevelopment(Core) {
	const socket = io(CONFIG.SOCKET_URL);
	const core = new Core(socket, '#root', 'en', 'rtl', {
		onStart: () => null,
		onEnd: () => null,
		onLose: () => null,
		onWin: () => null,
		onStandOff: () => null,
	});

	await core.init();

	core.newGame('game-one');
}
