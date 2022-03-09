'use strict'

function anim1() {
  var div=document.getElementById('rules');
  div.style.visibility="hidden";
  div.style.height="0px";
}

function anim2() {
  var div=document.getElementById('rules');
  div.style.height="35vw";
  div.style.visibility="visible";
}
