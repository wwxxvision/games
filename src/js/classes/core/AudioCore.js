import win from '@/assets/sounds/win.mp3';
import bg from '@/assets/sounds/bg.mp3';
import lose from '@/assets/sounds/lose.mp3';
import { Howl, Howler } from 'howler';
import $ from 'jquery';

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

	watchVolume() {
		const volumeDom = $('.volume');
		const observ = new MutationObserver(mutations => {
			console.log(mutations);
			mutations.forEach(function(mutation) {
				console.log(mutation);
				if (mutation.type == 'attributes') {
					console.log(mutation);
				}
			});
		});

		observ.observe =
			(document.querySelector('.volume'),
			{
				attributes: true, //configure it to listen to attribute changes
			});
		setInterval(() => {
			volumeDom.attr('data-volume', Math.random());
		});
	}

	play(name) {
		this.sound = this.sounds.find(sound => sound.name === name);
		this.player = this.sound.audio.play();
		this.watchVolume();
	}

	stop() {
		this.sound.audio.fade(this.volume, 0, this.fadeOutDur, this.player);
		const timer = setTimeout(() => {
			this.sound.audio.stop(this.player);
			clearTimeout(timer);
		}, this.fadeOutDur);
	}
}

export default new AudioCore();
