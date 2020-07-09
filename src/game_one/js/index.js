// Imported global scss
import '@/scss/index.scss';
import App from '@/js/index';
import { GameController } from '@/js/classes/controllers';
import { gameConfig } from './gameConfig';

App.render().then(render => {
	console.log(render);
	GameController.run(gameConfig);
});
