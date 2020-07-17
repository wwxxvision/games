import win from '@/assets/sounds/win.mp3';
import bg from '@/assets/sounds/bg.mp3';
import lose from '@/assets/sounds/lose.mp3';
import { Howl, Howler } from 'howler';

class AudioCore {
	constructor() {
		this.sounds = [
			{
				name: 'win',
				audio: new Howl({
					src: win,
					loop: false,
				}),
			},
			{
				name: 'bg',
				audio: new Howl({
					src: bg,
					loop: true,
				}),
			},
			{
				name: 'lose',
				audio: new Howl({
					src: lose,
					loop: false,
				}),
			},
		];
		this.sound = null;
		this.volume = 1;
		this.player = null;
		this.fadeOutDur = 900;
		Howler.volume(this.volume);
	}
	play(name) {
		this.sound = this.sounds.find(sound => sound.name === name);
		this.player = this.sound.audio.play();
	}

	stop() {
		this.sound.audio.fade(this.volume, 0, this.fadeOutDur, this.player);
		setTimeout(() => {
			this.sound.audio.stop(this.player);
		}, this.fadeOutDur);
	}
}

export default new AudioCore();
