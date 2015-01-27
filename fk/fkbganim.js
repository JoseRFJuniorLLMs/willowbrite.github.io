var time = 0.0;
var fps = 60;
var timePerSecond = 1/fps;

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / fps);
          };
})();

function setDoAnimation(play, value){
  value = typeof value !== 'undefined' ? value : 0;
  animation.play = play;
  animation.increment = value;
}

// t: current time, b: begInnIng value, c: how far to move, d: duration
function easeInOut(t, b, c, d) {
 return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
}