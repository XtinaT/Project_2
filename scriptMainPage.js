'use strict'
var W = window.innerWidth;

function setPosition () {
  let menu = document.getElementsByClassName('menu')[0];
  let menuCoords = menu.getBoundingClientRect();

  let virus1 = document.getElementById('virus1');
  virus1.style.left = (menuCoords.left-W/70)+'px';
  virus1.style.top = (menuCoords.bottom-W/15)+'px';

  let virus2 = document.getElementById('virus2');
  virus2.style.left = (menuCoords.left+W/20)+'px';
  virus2.style.top = (menuCoords.bottom-W/10)+'px';

  let cell1 = document.getElementById('cell1');
  cell1.style.left = (menuCoords.left-W/70)+'px';
  cell1.style.top = (menuCoords.top-W/20)+'px';

  let cell2 = document.getElementById('cell2');
  cell2.style.left = (menuCoords.right-W/9)+'px';
  cell2.style.top = (menuCoords.bottom-W/10)+'px';

  let doc = document.getElementById('doc');
  doc.style.left = (menuCoords.right-W/5)+'px';
  doc.style.top = (menuCoords.top-W/6)+'px';
}
setPosition();


window.addEventListener("resize", resize, false);
function resize(e) {
  e = e || window.event;
  e.preventDefault;
  W = window.innerWidth;
  setPosition();
  console.log('here');
  document.getElementById('wrapper').style.width = '100%';
}

function anim1() {
  var div=document.getElementById('rules');
  div.style.visibility="hidden";
  div.style.height="0px";
  playSound(clickSound);
}

function anim2() {
  var div=document.getElementById('rules');
  div.style.height='auto';
  var targetHeight=div.offsetHeight;
  div.style.height='0px';
  setTimeout(function() { div.style.height=targetHeight+"px"; }, 0);
  div.style.visibility="visible";
  playSound(clickSound);
}

var hoverSound = new Audio;
hoverSound.src = "sounds/click.mp3";

var clickSound = new Audio;
clickSound.src = "sounds/click1.mp3";

function playSound(sound) {
  sound.currentTime=0; 
  sound.play();
}

function cancelRotation() {
  var cover = document.getElementsByClassName('cover');
  console.log(cover);
  cover[0].style.display = 'none';
}