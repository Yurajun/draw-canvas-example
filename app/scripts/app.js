import svg4everybody from 'svg4everybody';
import $ from 'jquery';

$(() => {
	svg4everybody();
});

// import VideoControls from '../blocks/video-controls/VideoControls';
import Canvas from '../blocks/canvas/Canvas';
// console.log('w ', $('.sketcher__draw-block').width());
// console.log('h ', $('.sketcher__draw-block').outerHeight());
// setTimeout(() => {
// 	console.log('h ', $('.sketcher__draw-block').outerHeight());
// }, 1000);
// console.log(document.querySelector('.video').videoHeight);
// new VideoControls('.video').init('.js-btn__v-start', '.js-btn__v-stop');
new Canvas('.canvas', '.video').init('.js-btn__v-start', '.js-btn__v-stop', '.js-btn__v-save');
