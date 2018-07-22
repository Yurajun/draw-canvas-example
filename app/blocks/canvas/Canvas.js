/* global $ */
export default class Canvas {
	constructor(canvasEl, videobox) {
		this.canvas = $(canvasEl);
		this.videoBox = $(videobox);
		this.canvas[0].width = this.videoBox.width();
		this.canvas[0].height = this.videoBox.height();
		console.log(this.videoBox.width());
		console.log(this.videoBox.height());
		this.context = this.canvas[0].getContext('2d');
		this.radius = 10;
		this.dragging = false;
		this.context.lineWidth = this.radius * 2;
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

	init() {
		this.canvas.on('mousedown', this.engage.bind(this));
		this.canvas.on('mousemove', this.putPoint.bind(this));
		this.canvas.on('mouseup', this.disengage.bind(this));
	}
}
