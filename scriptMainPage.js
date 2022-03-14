'use strict'

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

