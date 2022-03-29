'use strict'

// Расстановка изображений на главной странице
function setPositions () {
  let menu = document.getElementsByClassName('menu')[0];
  let menuCoords = menu.getBoundingClientRect();

  let virus1 = document.getElementById('virus1');
  if (window.innerWidth<800) {
    console.log(window.innerWidth);
    virus1.style.left = (menuCoords.left)+'px';
    virus1.style.top = (menuCoords.bottom-W/10)+'px';
  } else {
      virus1.style.left = (menuCoords.left-W/70)+'px';
      virus1.style.top = (menuCoords.bottom-W/15)+'px';
  }

  let virus2 = document.getElementById('virus2');
  virus2.style.left = (menuCoords.left+W/20)+'px';
  virus2.style.top = (menuCoords.bottom-W/10)+'px';

  let cell1 = document.getElementById('cell1');
  if (window.innerWidth<800) {
    cell1.style.left = (menuCoords.left)+'px';
    cell1.style.top = (menuCoords.top)+'px';
  } else {
    cell1.style.left = (menuCoords.left-W/70)+'px';
    cell1.style.top = (menuCoords.top-W/20)+'px';
  }
  

  let cell2 = document.getElementById('cell2');
  cell2.style.left = (menuCoords.right-W/9)+'px';
  cell2.style.top = (menuCoords.bottom-W/10)+'px';

  let doc = document.getElementById('doc');
  doc.style.left = (menuCoords.right-W/5)+'px';
  doc.style.top = (menuCoords.top - W/6)+'px';
  wrapper.style.backgroundImage = "url('img/back3.jpg')";
}

// Анимации появления/скрытия элементов меню
function anim1() {
  var div=document.getElementById('rules');
  div.style.transform = "translateZ(0)";
  div.style.visibility="hidden";
  div.style.height="0px";
  playSound(clickSound);
}

function anim2() {
  var div=document.getElementById('rules');
  div.style.transform = "translateZ(0)";
  div.style.height='auto';
  var targetHeight=div.offsetHeight;
  div.style.height='0px';
  setTimeout(function() { div.style.height=targetHeight+"px"; }, 0);
  div.style.visibility="visible";
  playSound(clickSound);
}

function anim3() {
  var div=document.getElementById('playerName');
  div.style.transform = "translateZ(0)";
  div.style.height='auto';
  var targetHeight=div.offsetHeight;
  div.style.height='0px';
  setTimeout(function() { 
    div.style.height=targetHeight+"px"; 
  }, 0);
  div.style.visibility="visible";
  setTimeout(function() { 
    document.getElementById('playerNameField').focus();
  }, 1500);
  playSound(clickSound);
 
}

function anim4() {
  var div=document.getElementById('playerName');
  div.style.transform = "translateZ(0)";
  div.style.visibility="hidden";
  div.style.height="0px";
}

function anim5() {
  var divRecords=document.getElementById('records');
  divRecords.style.transform = "translateZ(0)";
  divRecords.style.height='auto';
  var targetHeight=divRecords.offsetHeight;
  divRecords.style.height='0px';
  setTimeout(function() { 
    divRecords.style.height=targetHeight+"px"; 
  }, 0);
  divRecords.style.visibility="visible";
}

function anim6() {
  var divRecords=document.getElementById('records');
  divRecords.style.transform = "translateZ(0)";
  divRecords.style.visibility="hidden";
  divRecords.style.height="0px";
  playSound(clickSound);
}


// Убирает предложение повернуть экран
function cancelRotation() {
  var cover = document.getElementsByClassName('cover');
  cover[0].style.display = 'none';
}