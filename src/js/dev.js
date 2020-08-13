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

// IP Адрес  188.227.85.89
// Логин  root
// Пароль  ZJk47X4FPe
