import { ConnectingView } from '@/js/classes/views/index';

class ScreenController {
	view(connectingState) {
		switch (connectingState) {
			case 'connecting':
				ConnectingView.show();
				break;
			default:
				ConnectingView.show();
		}
	}
}

export default new ScreenController();
