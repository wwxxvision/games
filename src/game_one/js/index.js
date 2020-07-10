// Imported global scss
import '@/scss/index.scss';
import Core from '@/js/index';
import { GameController } from '@/js/classes/controllers';
import { gameConfig } from './gameConfig';

Core.render().then(render => {
	console.log(render);
	GameController.run(gameConfig);
});
