import { ConnectingView } from '@/js/classes/views/index';
import { Game } from '@/js/classes/models/index';

class ScreenController {
	view(connectingState) {
		switch (connectingState) {
			case 'connecting':
				Game.createScreen(ConnectingView.getTemplate());
				break;
			default:
				Game.createScreen(ConnectingView.getTemplate());
		}
	}
}

export default new ScreenController();
