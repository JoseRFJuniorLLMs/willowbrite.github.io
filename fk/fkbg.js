var background;                           //background div
var dogStartAnim;
var container;
var containerBg;
var doAnimation = false;                  //enable/disable background animation
var bezierData = [];                      //array of bezier cordinates
var bezierPointCount = 250;               //resolution of bezier
var fkLogo;
var stills = [];
var activeKeyframe = 0;
var keyframes = [
                  {"from":-1,"to":10},   //frame 1
                  {"from":11,"to":44},
                  {"from":45,"to":65},   //frame 2
                  {"from":66,"to":152},
                  {"from":153,"to":163}, //frame 3
                  {"from":164,"to":232},
                  {"from":233,"to":251}  //frame 4
                ];


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
  
  requestAnimFrame(loop);
}

function setKeyframeActive(k){
  
  for(i=0; i< stills.length; i++){
    stills[i].moveToFrame(k);
  }
  
}

function scroll(){
  
  // keep scrolling within the limits
  if(animation.increment > 0 && viewbox.offsetX < bezierPointCount ||
                                animation.increment < 0 && viewbox.offsetX > 0)
  {
    viewbox.offsetX+= animation.increment;
    if(keyframes[activeKeyframe].from <= viewbox.offsetX && keyframes[activeKeyframe].to >= viewbox.offsetX){
      
    } else {
      console.log("was here man");
      if(keyframes[activeKeyframe-1]){
      if(keyframes[activeKeyframe-1].from <= viewbox.offsetX && keyframes[activeKeyframe-1].to >= viewbox.offsetX){
          activeKeyframe-=1;
          setKeyframeActive(activeKeyframe);
      }}
      if(keyframes[activeKeyframe+1]){
      if(keyframes[activeKeyframe+1].from <= viewbox.offsetX && keyframes[activeKeyframe+1].to >=- viewbox.offsetX){
          activeKeyframe+=1;
          setKeyframeActive(activeKeyframe);
      }}
    }
    
    // for(i=0; i<keyframes.length; i++){
    //   // check if we are in frames or between frames
    //   if(keyframes[i].from < viewbox.offsetX && keyframes[i].to > viewbox.offsetX){
    //     setKeyframeActive(i);
    //   }
    // }
  }
  
  updateOffset();
}

function updateOffset(){
  var x = bezierData[viewbox.offsetX].x + 'px';
  var y = bezierData[viewbox.offsetX].y + 'px';
  
  container.style.left = containerBg.style.left = x;
  container.style.top = containerBg.style.top = y;
  
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
  console.log("resize called");
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
  
  updateOffset();
}

window.onresize = function(){
  resize();
};

window.onload = function(){
  background = document.getElementById('background');
  container = document.getElementById('container-fg');
  containerBg = document.getElementById('container-bg');
  
  var n = 0;
  
//-------------------------------------------------------------------
//                      FRAME 0
//-------------------------------------------------------------------
  
  stills.push(new Still(document.getElementById('fk-logo')));
  stills[n].setParameters(342, 174);
  stills[n].addKeyframe(0, 82, 7);
  stills[n++].addKeyframe(1, 82, -100);
  
  stills.push(new Still(document.getElementById('dog-start')));
  stills[n].setParameters(154, 125);
  stills[n].addKeyframe(0, 175, 295);
  stills[n++].addKeyframe(1, 175, -127);
  
  stills.push(new Still(document.getElementById('btn-screens')));
  stills[n].setParameters(110, 141);
  stills[n].addKeyframe(0, 82, 650);
  stills[n++].addKeyframe(1, -200, 650);

  stills.push(new Still(document.getElementById('btn-video')));
  stills[n].setParameters(110, 141);
  stills[n].addKeyframe(0, 204, 650);
  stills[n++].addKeyframe(1, -200, 650);

  stills.push(new Still(document.getElementById('btn-download')));
  stills[n].setParameters(110, 141);
  stills[n].addKeyframe(0, 326, 650);
  stills[n++].addKeyframe(1, -200, 650);

  stills.push(new Still(document.getElementById('sun-svg')));
  stills[n].setParameters(1246, 912);
  stills[n].addKeyframe(0, 220, -350);
  stills[n].addKeyframe(2, 500, -50);
  stills[n].addKeyframe(4, 1400, 250);
  stills[n++].addKeyframe(6, 2380, 780);
  
  stills.push(new Still(document.getElementById('cloud-01')));
  stills[n].setParameters(226, 81);
  stills[n].addKeyframe(0, 700, 200);  
  stills[n++].addKeyframe(1, -310, 200);
  
  stills.push(new Still(document.getElementById('cloud-03')));
  stills[n].setParameters(226, 81);
  stills[n].addKeyframe(0, -20, -10);  
  stills[n++].addKeyframe(1, -310, -10);
  
  stills.push(new Still(document.getElementById('cloud-04')));
  stills[n].setParameters(103, 35);
  stills[n].addKeyframe(0, 420, 280);  
  stills[n++].addKeyframe(1, -150, 280);
  
  stills.push(new Still(document.getElementById('promotional-txt')));
  stills[n].setParameters(500, 109);
  stills[n].addKeyframe(0, 350, 380);  
  stills[n++].addKeyframe(1, -405, 380);
  
//-------------------------------------------------------------------
//                      FRAME 1
//-------------------------------------------------------------------
  
  stills.push(new Still(document.getElementById('cloud-02')));
  stills[n].setParameters(226, 81);
  stills[n].addKeyframe(1, 0, 500);
  stills[n].addKeyframe(2, 500, 500);
  stills[n++].addKeyframe(3, 1200, 500);
  
  stills.push(new Still(document.getElementById('promotional-txt-3')));
  stills[n].setParameters(400, 109);
  stills[n].addKeyframe(1, 560, -200);
  stills[n].addKeyframe(2, 560, 340);  
  stills[n++].addKeyframe(3, 560, -200);
  
  stills.push(new Still(document.getElementById('arrow-down')));
  stills[n].setParameters(68, 134);
  stills[n].addKeyframe(1, 730, -200);
  stills[n].addKeyframe(2, 730, 450);  
  stills[n++].addKeyframe(3, 730, -200);
//-------------------------------------------------------------------
//                      FRAME 2
//-------------------------------------------------------------------


//-------------------------------------------------------------------
//                      FRAME 3
//-------------------------------------------------------------------
  stills.push(new Still(document.getElementById('dog-chill')));
  stills[n].setParameters(180, 136);
  stills[n].addKeyframe(6, 2826, 1276);  
  stills[n++].addKeyframe(5, 2826, 1500);
  
  stills.push(new Still(document.getElementById('kart-chill')));
  stills[n].setParameters(182, 85);
  stills[n].addKeyframe(6, 3036, 1306);  
  stills[n++].addKeyframe(5, 3036, 1500);
  
  stills.push(new Still(document.getElementById('chest-chill')));
  stills[n].setParameters(121, 56);
  stills[n].addKeyframe(6, 3000, 1432);  
  stills[n++].addKeyframe(5, 3000, 1500);
  
  stills.push(new Still(document.getElementById('slot-1')));
  stills[n].setParameters(204, 120);
  stills[n].addKeyframe(6, 2650, 750);  
  stills[n++].addKeyframe(5, 2650, 300);
  
  stills.push(new Still(document.getElementById('slot-2')));
  stills[n].setParameters(204, 120);
  stills[n].addKeyframe(6, 2874, 750);  
  stills[n++].addKeyframe(5, 2874, 400);
  
  stills.push(new Still(document.getElementById('slot-3')));
  stills[n].setParameters(204, 120);
  stills[n].addKeyframe(6, 3094, 750);  
  stills[n++].addKeyframe(5, 3094, 500);
  
  stills.push(new Still(document.getElementById('promotional-txt-2')));
  stills[n].setParameters(500, 300);
  stills[n].addKeyframe(6, 2450, 1250);  
  stills[n++].addKeyframe(5, 3500, 1250);
  
  stills.push(new Still(document.getElementById('cloud-2')));
  stills[n].setParameters(260, 73);
  stills[n].addKeyframe(6, 2994, 1020);  
  stills[n++].addKeyframe(5, 3500, 1020);
  
  stills.push(new Still(document.getElementById('cloud-3')));
  stills[n].setParameters(103, 35);
  stills[n].addKeyframe(6, 2720, 1100);  
  stills[n++].addKeyframe(5, 3500, 1100);
  
  
  resize();
  loop();
};