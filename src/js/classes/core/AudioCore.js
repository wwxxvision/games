import win from '@/assets/sounds/win.mp3';
import bg from '@/assets/sounds/bg.mp3';
import bg_2 from '@/assets/sounds/bg_2.mp3';
import lose from '@/assets/sounds/lose.mp3';
import { Howl, Howler } from 'howler';

class AudioCore {
	constructor() {
		Howler.autoSuspend = false;
		this.sounds = [
			{
				name: 'win',
				audio: new Howl({
					src: win,
					loop: false,
					preload: true,
				}),
			},
			{
				name: 'bg',
				audio: new Howl({
					src: bg,
					loop: true,
					preload: true,
					autoplay: false,
				}),
			},
			{
				name: 'bg_2',
				audio: new Howl({
					src: bg_2,
					loop: true,
					preload: true,
					autoplay: false,
				}),
			},
			{
				name: 'lose',
				audio: new Howl({
					src: lose,
					loop: false,
					preload: true,
				}),
			},
		];
		this.sound = null;
		this.volume = localStorage.getItem('volume')
			? localStorage.getItem('volume')
			: 1;
		this.player = null;
		this.fadeOutDur = 300;
		Howler.volume(this.volume);
	}

	watchVolume() {
		setInterval(() => {
			Howler.volume(localStorage.getItem('volume'));
		}, 500);
	}

	play(name) {
		this.stop();

		this.sound = this.sounds.find((sound) => sound.name === name);
		this.player = this.sound.audio.play();
		this.sound.audio.once('play');
		this.watchVolume();
	}

	stop() {
		if (this.sound) {
			this.sound.audio.fade(this.volume, 0, 1500, this.player, () =>
				this.sound.audio.stop(this.player)
			);
		}
	}
}

export default new AudioCore();
