function Still(mainObject){
  this.mainObject = mainObject;
  this.left;
  this.top;
  this.width;
  this.height;
  this.cLeft;
  this.cTop;
  this.cWidth;
  this.cHeight;
  this.beginOffset = 0;
  this.endOffset = 0;
  this.visible = true;
  this.leftOffset = 0;
  this.topOffset = 0;
  this.cLeftOffset;
  this.cTopOffset;
  
  this.setParameters = function(x,y,w,h){
    this.left = x;
    this.top = y;
    this.width = w;
    this.height = h;
    this.endOffset = bezierPointCount;
  };
  
  this.setAnimation = function(start, end, offsetX, offsetY){
    this.beginOffset = start;
    this.endOffset = end;
    this.leftOffset = offsetX;
    this.topOffset = offsetY;
    if(this.beginOffset > 0){
      this.visible = false;
    } else {this.visible = true;}
  };
  
  this.updateScale = function(scaleFactor){
    this.cLeft = this.left * scaleFactor;
    this.cTop = this.top * scaleFactor;
    this.cWidth = this.width * scaleFactor;
    this.cHeight = this.height * scaleFactor;
    this.cLeftOffset = this.cLeft - (this.leftOffset * scaleFactor);
    this.cTopOffset = this.cTop - (this.topOffset * scaleFactor);
    
    console.log("left.:"+this.cLeft+"   top.:"+this.cTop);
    console.log("leftOffset.:"+this.cLeftOffset+"    topOffset.:"+this.cTopOffset);
    
    if(!this.visible){
      this.move(this.cLeftOffset, this.cTopOffset);
    } else {
      this.move(this.cLeft, this.cTop); 
    }
    this.mainObject.style.width = this.cWidth + 'px';
    this.mainObject.style.height = this.cHeight + 'px';
  };
  
  this.move = function(x,y){
    this.mainObject.style.left = x + 'px';
    this.mainObject.style.top = y + 'px';
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