import $ from 'jquery';

class Game {
	createScreen(template) {
		$('.screen').append(template);
	}
}

export default new Game();
