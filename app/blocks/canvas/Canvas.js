/* global $ */
export default class Canvas {
	constructor(canvasEl, videobEl) {
		this.canvas = $(canvasEl);
		this.videoEl = $(videobEl);
		this.canvas[0].width = this.videoEl.width();
		this.canvas[0].height = this.videoEl.height();
		// console.log(this.videoEl.width());
		// console.log(this.videoEl.height());
		this.context = this.canvas[0].getContext('2d');
		this.radius = 10;
		this.dragging = false;
		this.context.lineWidth = this.radius * 2;

		this.btnStart = '';
		this.btnStop = '';
		this.btnSave = '';
		this.timerId = '';
	}

	putPoint(e) {
		if (this.dragging){
			this.context.lineTo(e.originalEvent.offsetX, e.originalEvent.offsetY);
			this.context.stroke();
			this.context.beginPath();
			this.context.arc(e.originalEvent.offsetX, e.originalEvent.offsetY, this.radius, 0, Math.PI * 2);
			this.context.fill();
			this.context.beginPath();
			this.context.moveTo(e.originalEvent.offsetX, e.originalEvent.offsetY);
		}
	}

	engage(e){
		this.dragging = true;
		this.putPoint(e);
	}

	disengage(){
		this.dragging = false;
		this.context.beginPath();
	}

	initBehavior() {
		this.btnStart.on('click', () => {
			if (this.videoEl[0].paused){
				this.videoEl[0].play();
				this.draw(this.videoEl[0], this.context, this.videoEl.width(), this.videoEl.height());
			}
		});

		this.btnStop.on('click', () => {
			if (!this.videoEl[0].paused){
				this.videoEl[0].pause();
				clearTimeout(this.timerId);
				this.timerId = null;
			}
		});

		this.btnSave.on('click', () => {
			const dataURL = $(this.canvas)[0].toDataURL();
			document.querySelector('.sketcher__screenshot').src = dataURL;
		});
	}

	draw(v, c, w, h) {
		c.drawImage(v, 0, 0, w, h);
		this.timerId = setTimeout(this.draw.bind(this), 20, v, c, w, h);
		// const idata = c.getImageData(0, 0, w, h);
		// const data = idata.data;
		// console.log(data);
	}

	init(btnStart, btnStop, btnSave) {
		// this.draw(this.videoEl[0], this.context, this.videoEl.width(), this.videoEl.height());
		this.btnStart = $(btnStart);
		this.btnStop = $(btnStop);
		this.btnSave = $(btnSave);

		this.videoEl.on('canplaythrough', e => {
			$(e.currentTarget).removeClass('video_hidden');
		});
		this.initBehavior();

		this.canvas.on('mousedown', this.engage.bind(this));
		this.canvas.on('mousemove', this.putPoint.bind(this));
		this.canvas.on('mouseup', this.disengage.bind(this));
	}
}
