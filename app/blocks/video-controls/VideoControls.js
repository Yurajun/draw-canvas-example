/* global $ */
import Video from '../video/Video';

export default class VideoControls extends Video {
	constructor(videoEl) {
		super(videoEl);
		this.btnStart = '';
		this.btnStop = '';
	}

	initBehavior() {
		this.btnStart.on('click', () => {
			if (this.videoEl[0].paused){
				this.videoEl[0].play();
			}
		});

		this.btnStop.on('click', () => {
			if (!this.videoEl[0].paused){
				this.videoEl[0].pause();
			}
		});
	}

	init(btnStart, btnStop) {
		this.btnStart = $(btnStart);
		this.btnStop = $(btnStop);

		this.videoEl.on('canplaythrough', e => {
			$(e.currentTarget).removeClass('video_hidden');
		});
		this.initBehavior();
	}
}
