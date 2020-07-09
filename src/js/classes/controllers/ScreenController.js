import { ConnectingView } from '@/js/classes/views/index';
import $ from 'jquery';

class ScreenController {
	view(connectingState) {
		switch (connectingState) {
			case 'connecting':
				$('.screen').append(ConnectingView.getTemplate());
				break;
			default:
				$('.screen').append(ConnectingView.getTemplate());
		}
	}
}

export default new ScreenController();
