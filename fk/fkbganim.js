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

function moveObject(o, x2, y2, duration){
  var t = 0.0;   // time
  var x1 = parseInt(o.mainObject.style.left);
  var y1 = parseInt(o.mainObject.style.top);
  
  x2 = x2 - x1;
  y2 = y2 - y1;
  
  function animate(){
    o.move(easeInOut(t, x1, x2, duration), easeInOut(t, y1, y2, duration));
    
    t += timePerSecond;
    if(t < duration){
      requestAnimFrame(animate);
    }
  }
  animate();
}

// t: current time, b: begInnIng value, c: change In value, d: duration
function easeInOut(t, b, c, d) {
 return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
}