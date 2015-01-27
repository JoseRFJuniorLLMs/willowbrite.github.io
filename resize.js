var cover;
var spacer;
var winWidth = window.innerWidth;
var htmlBody;
var aspectRatio = 550/980;
var spacerRatio = 400/980;
var pageHasLoaded = false;

window.onload = function(){
  cover = document.getElementById('background-image');
  spacer = document.getElementById('spacer');
  pageHasLoaded = true;
  resize();
};

window.onresize = function(){
  winWidth = window.innerWidth;
  resize();
};


function resize(){
  //if page havent loaded don't resize
  if(!pageHasLoaded){
    return;
  }

  if(winWidth <= 980){
    cover.style.height = (winWidth * aspectRatio) + 'px';
    spacer.style.height = (winWidth * spacerRatio) + 'px';
  } else {
    cover.style.height = 550 + 'px';
    spacer.style.height = 400 + 'px';
  }
  
  if(winWidth <= 460){
    goTo = "contact_info";
  } else {
    goTo = "about";
  }
  console.log(goTo);
}

var isWebkit = (window.webkitURL !== null);
var goTo = "about";

function jumpTo(){
  if (isWebkit) {
      window.location.hash = 'someHashThatDoesntExist';
      window.location.hash = goTo;
  } else {
      window.location.hash = 'someHashThatDoesntExist';
      window.location.href = goTo;
//      window.location.href = goTo;
  }
}