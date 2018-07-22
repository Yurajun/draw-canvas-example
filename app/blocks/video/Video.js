/* global $ */
export default class Video {
	constructor(videoEl){
		console.log('Video ', videoEl);
		this.videoEl = $(videoEl);
		console.log('video', this.videoEl);
		console.log('video', $('.video'));
	}
}
