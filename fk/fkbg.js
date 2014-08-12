var background;                           //background div
var dogStartAnim;
var container;
var doAnimation = false;                  //enable/disable background animation
var bezierData = [];                      //array of bezier cordinates
var bezierPointCount = 250;               //resolution of bezier
var fkLogo;
var dog01;
var stills = [];
var sun;

//play - play/stop animation, increment - speed of animation 
var animation = {"play":false, "increment":1};

var viewbox = {
  "maxWidth":3350, "maxHeight":1540, "originalMaxWidth":3350, "originalMaxHeight":1540,
  "width":0, "height":0, "originalWidth":0, "originalHeight":0,
  "offsetX":0, "aspectratio":0};

function loop(){
     time += timePerSecond;
  // scroll whole page
  if(animation.play){
    scroll();
  }
  
  dog01.updateAnimation();
  requestAnimFrame(loop);
}

function scroll(){
  
  if(animation.increment > 0 && viewbox.offsetX < bezierPointCount){
    viewbox.offsetX+= animation.increment;
    for(i = 0; i < stills.length; i++){
      if(stills[i].visible === true && stills[i].endOffset == viewbox.offsetX){
        stills[i].visible = false;
        moveObject(stills[i], stills[i].cLeftOffset, stills[i].cTopOffset, 0.5);
        console.log("move out 1");
        return;
      } 
      if(stills[i].visible === false && stills[i].beginOffset == viewbox.offsetX){
        stills[i].visible = true;
        moveObject(stills[i], stills[i].cLeft, stills[i].cTop, 0.5);
        console.log("move in 1");
      }
    }
  }

  if(animation.increment < 0 && viewbox.offsetX > 0){
    viewbox.offsetX+= animation.increment;
    for(i = 0; i < stills.length; i++){
      if(stills[i].visible === true && stills[i].beginOffset == viewbox.offsetX){
        stills[i].visible = false;
        moveObject(stills[i], stills[i].cLeftOffset, stills[i].cTopOffset, 0.5);
        console.log("move out 2");
        return;
      } 
      if(stills[i].visible === false && stills[i].endOffset == viewbox.offsetX){
        stills[i].visible = true;
        console.log('move in 2');
        moveObject(stills[i], stills[i].cLeft, stills[i].cTop, 0.5);  
      }
    }
  }
  
  updateOffset();
}

function updateOffset(){
  var x = bezierData[viewbox.offsetX].x + 'px';
  var y = bezierData[viewbox.offsetX].y + 'px';
  
  container.style.left = x;
  container.style.top = y;
  
  background.style.backgroundPosition = x + ' ' + y;
}

function cubicBezier(x1,y1,x3,y3,direction,stepVariable,dataArray){
  var step = 1/stepVariable;
  var x2 = x1+(x3-x1)*0.2;
  var y2 = y3 * direction;
  
  function bezier(val1, val2, timeStep){
    return val1+((val2-val1)*timeStep);
  }
  
  for(i = 0; i<=1; i+=step){
    dataArray.push({"x":bezier(bezier(x1, x2, i), bezier(x2, x3, i), i),
        "y":bezier(bezier(y1, y2, i), bezier(y2, y3, i), i)});
  }
  dataArray.push({"x":x3, "y":y3});
}

function resize(){
  //get window size
  viewbox.originalWidth = viewportSize.getWidth();
  viewbox.originalHeight = viewportSize.getHeight();
  
  //get correct aspect ratio
  viewbox.aspectratio = (viewbox.originalHeight * 1.9)/viewbox.originalMaxHeight;
  
  viewbox.maxWidth = viewbox.aspectratio*viewbox.originalMaxWidth;
  viewbox.maxHeight = viewbox.aspectratio*viewbox.originalMaxHeight;
  
  // update scale
  background.style.backgroundSize = viewbox.maxWidth + "px " + viewbox.maxHeight + "px";

  viewbox.width = viewbox.originalWidth*viewbox.aspectratio;
  viewbox.height = viewbox.originalHeight*viewbox.aspectratio;
  
  var leftLeft = 0;
  var leftTop = 0;
  var rightLeft = viewbox.maxWidth*(-1) + viewbox.originalWidth;
  var rightBottom = viewbox.maxHeight*(-1) + viewbox.originalHeight;

  bezierData = [];
  //cubicBezierCalc
  cubicBezier(leftLeft,leftTop, rightLeft, rightBottom, 1, bezierPointCount, bezierData);
  
  for(i = 0; i < stills.length; i++){
    stills[i].updateScale(viewbox.aspectratio);
  }
  
  dog01.updateScale(viewbox.aspectratio);
  updateOffset();
}

window.onresize = function(){
  resize();
};

window.onload = function(){
  background = document.getElementById('background');
  container = document.getElementById('container');

  dog01 = new Animation(document.getElementById('dog-start-animation'));
  dog01.setParameters(175,294,154,126,20);
  
  stills.push(new Still(document.getElementById('fk-logo')));
  stills[0].setParameters(114, 14, 274, 140);
  stills[0].setAnimation(-1, 2, 0, 200);

  stills.push(new Still(document.getElementById('sun-svg')));
  stills[1].setParameters(0, -400, 1246, 912);
  stills[1].setAnimation(-1, 10, -400, -400);
  
  stills.push(new Still(document.getElementById('cloud-01')));
  stills[2].setParameters(350, 150, 305, 109);
  stills[2].setAnimation(-1, 20, 600, 0);
  
  stills.push(new Still(document.getElementById('cloud-02')));
  stills[3].setParameters(1250, 500, 305, 109);
  stills[3].setAnimation(70, 150, 0, 400);
  
  stills.push(new Still(document.getElementById('cloud-03')));
  stills[4].setParameters(2700, 900, 305, 109);
  stills[4].setAnimation(230, 251, 0, 300);
  
  // stills.push(new Still(document.getElementById('cloud-02')));
  // stills[4].setParameters(350, 150, 305, 109);
  // stills[4].setAnimation(-1, 35, 400, 0);
  
  resize();
  loop();
};