function keyframes(){
  this.objects = [];
  this.keyframes = [];
  
  this.addObject = function(obj){
    this.objects.push(obj);
  };
}

function Keyframe(a, x, y){
  this.active = a;
  this.x = x;
  this.y = y;
}

function Still(mainObject){
  this.mainObject = mainObject;
  this.width;
  this.height;
  this.cWidth;
  this.cHeight;
  this.keyframes = [];
  this.cKeyframes = [];

  //f-frames, a-active, xa-startx, ya-starty, xb-endX, yb-endY
  this.addKeyframe = function(f, x, y){
    this.keyframes[f] = new Keyframe(false, x, y);
  };

  this.setParameters = function(w,h){
    this.width = w;
    this.height = h;
  };
  
  this.updateScale = function(scaleFactor){
    var activeKeyframe = 999;
    this.cKeyframes = [];

    for(j=0; j< this.keyframes.length; j++){
      if(this.keyframes[j]){
        this.cKeyframes[j] = new Keyframe(false, this.keyframes[j].x * scaleFactor,
        this.keyframes[j].y * scaleFactor);
        // this.keyframes[j].x = this.keyframes[j].x * scaleFactor;
        // this.keyframes[j].y = this.keyframes[j].y * scaleFactor;
        if(activeKeyframe == 999){
          activeKeyframe = j;
        }
      }
    }
    
    this.cWidth = this.width * scaleFactor;
    this.cHeight = this.height * scaleFactor;
    
    this.move(this.cKeyframes[activeKeyframe].x, this.cKeyframes[activeKeyframe].y);

    this.mainObject.style.width = this.cWidth + 'px';
    this.mainObject.style.height = this.cHeight + 'px';
  };
  
  this.move = function(x,y){
    this.mainObject.style.left = x + 'px';
    this.mainObject.style.top = y + 'px';
  };
  
  this.moveWithEase = function(k){
    var t = 0.0;
    var dur = 0.5;
    
    var startX = parseInt(this.mainObject.style.left);
    var startY = parseInt(this.mainObject.style.top);
    var distX = this.cKeyframes[k].x - startX;
    var distY = this.cKeyframes[k].y - startY;
    
    function animate(o){
      t+=0.02;
      
      o.style.left = easeInOut(t, startX, distX, dur) + 'px';
      o.style.top = easeInOut(t, startY, distY, dur) + 'px';
      
      if(t <= dur){
        requestAnimFrame(function(){animate(o);});
      }
    }
    animate(this.mainObject);
  };
  
  this.moveToFrame = function(k){
    if(this.cKeyframes[k]){
      this.moveWithEase(k);
    }
  };
}

function Animation(mainObject){
  this.mainObject = mainObject;
  this.left;
  this.top;
  this.width;
  this.height;
  this.cLeft;
  this.cTop;
  this.cWidth;
  this.cHeight;
  this.bgPos = 0;
  this.frames;
  
  this.setParameters = function(x,y,w,h,f){
    this.left = x;
    this.top = y;
    this.width = w;
    this.height = h;
    this.frames = f;
  };
  
  this.updateScale = function(scaleFactor){
    this.cLeft = this.left * scaleFactor;
    this.cTop = this.top * scaleFactor;
    this.cWidth = ((this.width * this.frames)* scaleFactor)/this.frames;
    this.cHeight = this.height * scaleFactor;
    
    this.mainObject.style.left = this.cLeft + 'px';
    this.mainObject.style.top = this.cTop + 'px';
    this.mainObject.style.width = this.cWidth + 'px';
    this.mainObject.style.height = this.cHeight + 'px';
    this.mainObject.style.backgroundSize = this.cWidth * this.frames + 'px ' + this.cHeight + 'px';
  };
  
  this.updateAnimation = function(){
    this.bgPos += this.cWidth;
    if(this.bgPos >= this.cWidth*this.frames){
      this.bgPos = 0;
    }
    this.mainObject.style.backgroundPosition = this.bgPos + 'px ' + '0px';
  };
}