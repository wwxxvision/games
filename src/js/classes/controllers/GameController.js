import { Game, Timer } from '@/js/classes/models';

class GameController {
	run(gameConfig) {
		const game = new Game();
		game.setGameTimeInMs(gameConfig.duration);
		game.setTimer(Timer);
		game.run();
	}
}

export default new GameController();
