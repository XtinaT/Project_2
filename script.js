'use strict'

var RAF =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
var body = document.getElementsByTagName("body");
var wrapper = document.getElementById('wrapper');
var W = window.innerWidth;
var H = window.innerHeight;
var standartSize = W/17; 
var gameOverDiv = document.getElementById("game-over");
var overlay = document.getElementById("overlay");
var lifes = document.getElementById('life');
var lifesChildren;
var i;
var svg = document.getElementById('pause');
svg.setAttribute('width',W/15);
svg.setAttribute('height',W/15);

window.addEventListener("resize", resize, false);
function resize(e) {
  e = e || window.event;
  e.preventDefault;
  H = document.body.offsetHeight;
  W = document.body.offsetWidth;
  canvas.width = W;
  canvas.height = H;
  player.update();
}

var canvas = document.createElement("canvas");
canvas.id = "canvas";
var ctx = canvas.getContext("2d");
canvas.width = W;
canvas.height = H;
wrapper.appendChild(canvas);

var pause = document.getElementById('pause');
var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
circle.setAttribute("cx", standartSize/2);
circle.setAttribute("cy", standartSize/1.7);
circle.setAttribute("r", standartSize/2.1);
circle.setAttribute("fill", "white");
circle.setAttribute("stroke", "orange");
circle.setAttribute("stroke-width", standartSize/20);
pause.appendChild(circle);

var stroke1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
stroke1.setAttribute("x", standartSize/2.9);
stroke1.setAttribute("y", standartSize/2.7);
stroke1.setAttribute("width", standartSize/10);
stroke1.setAttribute("height", standartSize/2.3);
stroke1.setAttribute('stroke-width', standartSize/20);
stroke1.setAttribute('stroke', 'orange');
stroke1.setAttribute('stroke-linejoin', 'round');
stroke1.setAttribute("fill", "orange");
pause.appendChild(stroke1);

var stroke2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
stroke2.setAttribute("x", standartSize/1.8);
stroke2.setAttribute("y", standartSize/2.7);
stroke2.setAttribute("width", standartSize/10);
stroke2.setAttribute("height", standartSize/2.3);
stroke2.setAttribute('stroke-width', standartSize/20);
stroke2.setAttribute('stroke', 'orange');
stroke2.setAttribute('stroke-linejoin', 'round');
stroke2.setAttribute("fill", "orange");
pause.appendChild(stroke2);

var triangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
triangle.setAttribute('points', `${standartSize/2.8}, ${standartSize/2.9} ${standartSize/1.3}, ${standartSize/1.7} ${standartSize/2.8}, ${standartSize/1.2}`);
triangle.setAttribute('stroke-width', standartSize/20);
triangle.setAttribute('stroke', 'orange');
triangle.setAttribute('stroke-linejoin', 'round');
triangle.setAttribute("fill", 'orange');

pause.addEventListener('click',click,false);
var isclicked = false;

function click (e) {
  e=e||window.event;
  e.preventDefault;
  if (!isclicked) {
    pause.removeChild(stroke1);
    pause.removeChild(stroke2);
    pause.appendChild(triangle);
    RAF=null;
    isclicked = true;
    playSound(clickSound);
    canvas.style.cursor = "default";
  } else {
    pause.appendChild(stroke1);
    pause.appendChild(stroke2);
    pause.removeChild(triangle);
    RAF = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
    mainLoop();
    playSound(clickSound);
    canvas.style.cursor = "none";
    isclicked = false;
  }
  
}

var lastTime;

var PreloadedImagesH = {};
////////////////////////////////////////////////////////////////////////////////////////переписать!
function PreloadImage(img) {
  if (img in PreloadedImagesH) {
    return;
  }
  var Img = new Image();
  Img.src = img;
  PreloadedImagesH[img] = true;
}

PreloadImage("img/back5.webp");
PreloadImage("img/happy5.png");
PreloadImage("img/virusgreen.png");
PreloadImage("img/viruslightblue.png");
PreloadImage("img/viruspurple.png");
PreloadImage("img/virusred.png");

var player = document.createElement("img");
player.id = "player";
player.setAttribute("src", "img/happy4.png");
player.style.position = "absolute";
player.style.width = standartSize + "px";
player.style.height = standartSize + "px";
wrapper.appendChild(player);
player = {
  posX: 0,
  posY: H/2,
  size: standartSize,
  speedX: 0,
  speedY: 0,
  life: 4,
  update: function () {
    var playerEl = document.getElementById("player");
    playerEl.style.left = this.posX + "px";
    playerEl.style.top = this.posY + "px";
    playerEl.life = this.life;
  },
  move: function () {
    this.posX += this.speedX;
    this.posY += this.speedY;
    if (player.posX <= 0) player.posX = 0;
    if (player.posY <= W/15&&player.posX <= W/15) player.posY = W/15;
    if (player.posX + player.size > W) {
      player.posX = W - player.size;
    }
    if (player.posY + player.size > H) player.posY = H - player.size;
    if (player.posY < 0) player.posY = 0;

  },
};

window.onload = function (e) {
  e = e || window.event;
  e.preventDefault();
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
  document.body.classList.add('loaded');
  document.body.classList.remove('loaded_hiding');
  }, 500);
  init();
};
function init() {
  player.update();
  wrapper.style.backgroundImage = "url('img/back5.webp')";
  wrapper.style.backgroundSize = "cover";
  document.getElementById("play-again").addEventListener("click", function () {
    reset();
  });
  reset();
  lastTime = Date.now();
  mainLoop();
}
function mainLoop() {
  var now = Date.now();
  var dt = (now - lastTime) / 1000.0;
  update(dt);
  lastTime = now;
  RAF(mainLoop);
}

/////////////////////////////////////////////////////////////////////////////////каша-упорядочить
var newEnemy = new Enemy(); 
var newHealItem = new HealItem();
var newCell = new Cell();
var newExplosion = new Explosion;

var enemy1 = new Image();
enemy1.src = "img/virusgreen.png";

var enemy2 = new Image();
enemy2.src = "img/viruslightblue.png";

var enemy3 = new Image();
enemy3.src = "img/viruspurple.png";

var enemy4 = new Image();
enemy4.src = "img/virusred.png";

var cell1 = new Image();
cell1.src = "img/plate.png";

var cell2 = new Image();
cell2.src = "img/redcell1.png";

var cell3 = new Image();
cell3.src = "img/whitecell.png";

var healItem1 = new Image();
healItem1.src = "img/pills.png";

var healItem2 = new Image();
healItem2.src = "img/sanitizer.png";

var healItem3 = new Image();
healItem3.src = "img/suringe5.png";

var healItem4 = new Image();
healItem4.src = "img/vaccine.png";

var shoot = new Image();
shoot.src = "img/shoot1.png";

var explosionI = new Image();
explosionI.src = "img/bangspr.png";

var newFire = new Fire();

var clickSound = new Audio;
clickSound.src = "sounds/click1.mp3";

var bangSound = new Audio;
bangSound.src="sounds/bang5.mp3";

var collisionSound = new Audio;
collisionSound.src="sounds/collision1.mp3";

var cellSound = new Audio;
cellSound.src="sounds/cell1.mp3";

var lifeSound = new Audio;
lifeSound.src="sounds/life4.mp3";

var shootSound = new Audio;
shootSound.src="sounds/shoot3.mp3";
shootSound.volume = 0.6;

var gameOverSound = new Audio;
gameOverSound.src="sounds/gameover3.mp3";

var mainMusic = document.getElementById('mainMusic');

function playSound(sound) {
  sound.currentTime=0; 
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

var fire = [];
var enemies = [];
var explosions = [];
var cells = [];
var healItems = [];
var explosions = [];

var lastFire = Date.now();
var gameTime = 0;
var isGameOver = false;

var score = 0;
var scoreEl = document.getElementById("score");

function randomDiap(n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}
function toRadians(angle) {
  return angle * (Math.PI / 180);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function update(dt) {
  gameTime += dt;
  ctx.clearRect(0, 0, W, H);
  player.move();
  player.update();
  if (!isGameOver) {
    newFire.firePaint();
  newFire.fireMove();
  if((Math.random() < 1 - Math.pow(.999, gameTime))&&enemies.length<=7) {
    newEnemy.addEnemy();
  }
  newEnemy.enemyPaint();
  newEnemy.enemyMove();
  
  if((Math.random() < 1 - Math.pow(.999, gameTime))&&healItems.length==0&&player.life<4) {
    newHealItem.addHealItem();
  }
  newHealItem.healItemPaint();
  newHealItem.healItemMove();

  if((Math.random() < 1 - Math.pow(.999, gameTime))&&cells.length<=5) {
    newCell.addCell();
  }
  newCell.cellPaint();
  newCell.cellMove();

  checkCollisionsEnemies();
  checkCollisionsCells();
  checkCollisionsHealItems();
  }
  if (explosions.length>0) {
    newExplosion.explosionAnimate();
    newExplosion.explosionPaint();
  }
  scoreEl.innerHTML = score;
}

addEventListener("keydown", movePlayer, false);
addEventListener("keyup", stopPlayer, false);
addEventListener("mousemove", movePlayerMouse, false);
addEventListener("click", mouseFire, false);

var play = document.getElementById('player');
play.addEventListener("touchstart", playerTouchStart, {passive:false});
play.addEventListener('touchmove',movePlayerTouch,{passive:false});
play.addEventListener("touchend", playerTouchEnd, {passive:false});
 
$('document').bind('tap',function () {
  newFire.addFire(player.posX + player.size, player.posY + player.size / 2);
    })



var touchShiftX=0;
var touchShiftY=0;

function movePlayer(e) {
  e = e || window.event;
  e.preventDefault();
  if (e.keyCode == 37||e.keyCode == 65) player.speedX = -8;
  if (e.keyCode == 39||e.keyCode == 68) player.speedX = 8;
  if (e.keyCode == 38||e.keyCode == 87) player.speedY = -8;
  if (e.keyCode == 40||e.keyCode == 83) player.speedY = 8;
  if (e.keyCode == 32) {
      newFire.addFire(player.posX + player.size, player.posY + player.size / 2);
      playSound(shootSound);
  }
}

function stopPlayer(e) {
  e = e || window.event;
  e.preventDefault();
  if (e.keyCode == 37 || e.keyCode == 39||e.keyCode == 65||e.keyCode == 68) player.speedX = 0;
  if (e.keyCode == 38 || e.keyCode == 40||e.keyCode == 87||e.keyCode == 83) player.speedY = 0;
}

function mouseFire (e) {
  e = e || window.event;
  e.preventDefault();
  if (e.pageY  > W/15||e.pageX > W/15) {
    newFire.addFire(player.posX + player.size, player.posY + player.size / 2);
    playSound(shootSound);
  }
  
}

function movePlayerMouse(e) {
  e = e || window.event;
  e.preventDefault();
  player.posX = Math.round(e.pageX - player.size/2);
  player.posY = Math.round(e.pageY - player.size/2);
}

function playerTouchStart(e) {
  var self = this;
  e = e || window.event;
  e.preventDefault();
  self.style.cursor = 'none';
  var touchInfo = e.targetTouches[0];
  touchShiftX = touchInfo.pageX-player.posX;
  touchShiftY = touchInfo.pageY-player.posY;
  newFire.addFire(player.posX + player.size, player.posY + player.size / 2);
  playSound(shootSound);
}

function playerTouchEnd(e) {
  var self = this;
  e = e || window.event;
  e.preventDefault(); //document.removeEventListener('touchmove',movePlayerTouch,false);
}

function movePlayerTouch(e) {
    e = e || window.event;
    e.preventDefault();
    var touchInfo = e.targetTouches[0];
    player.posX = touchInfo.pageX - touchShiftX;
    player.posY = touchInfo.pageY - touchShiftY;
  }


function Fire() {
  let self = this;
  self.speedFire = 11;
  self.fireSize = player.size / 4;
  self.addFire = function (x, y) {
    let fireItem = {};
    fireItem.size = self.fireSize;
    fireItem.posX = x - self.fireSize/4;
    fireItem.posY = y - self.fireSize / 3;
    fireItem.speedX = self.speedFire;
    fire.push(fireItem);
    
  };

  self.fireMove = function () {
    for (let i = 0; i < fire.length; i++) {
      fire[i].posX += fire[i].speedX;
      if (fire[i].posX >= W) fire.splice(i, 1);
    }
  };

  self.firePaint = function () {
    for (let i = 0; i < fire.length; i++) {
      ctx.drawImage(
        shoot,
        fire[i].posX,
        fire[i].posY,
        fire[i].size,
        fire[i].size
      );
    }
  };
}

function Enemy () {
  var self = this;
  var enemyImg;
  
  self.addEnemy = function () {
    var enemy = {
    posX : W+standartSize/10, 
    posY:randomDiap(0,H-standartSize*0.8),
    speed:randomDiap(1, 4),
    size:standartSize*0.8,
    dell:false,
    node:true,
    randomImg : randomDiap(1, 4),
    angle : randomDiap(35, 155),
  }
  enemies.push(enemy);
}
  self.enemyMove = function() {
    for (var i=0;i<enemies.length;i++) {
   
      enemies[i].posX = Math.round(enemies[i].posX - enemies[i].speed);

      if (enemies[i].posX + enemies[i].size <= 0) {
        enemies[i].dell = true;
      }
      if (enemies[i].dell) {
        enemies.splice(i, 1);
      }
    }
  }
  self.enemyPaint = function () {

    for (let i = 0; i < enemies.length; i++) {
         
      switch (enemies[i].randomImg) {
        case 1:
          enemyImg = enemy1;
          ctx.drawImage(enemyImg, enemies[i].posX, enemies[i].posY, enemies[i].size, enemies[i].size);
          break;

        case 2:
          enemyImg = enemy2;
          ctx.drawImage(enemyImg, enemies[i].posX, enemies[i].posY, enemies[i].size,enemies[i].size);
          break;

        case 3:
          enemyImg = enemy3;
          ctx.drawImage(enemyImg, enemies[i].posX, enemies[i].posY,enemies[i].size, enemies[i].size);
          break;

        case 4:
          enemyImg = enemy4;
          ctx.drawImage(enemyImg, enemies[i].posX, enemies[i].posY, enemies[i].size, enemies[i].size);
          break;

      }
    }
  }
}

function HealItem () {
  var self = this;
  var healItemImg;
  
  self.addHealItem = function () {
    var item = {
    posX : W+standartSize/10, 
    posY:randomDiap(0,H-standartSize*0.8),
    speed:randomDiap(3, 4),
    size:standartSize*0.8,
    dell:false,
    node:true,
    randomImg : randomDiap(1, 4),
    angle : randomDiap(35, 155),
  }
  healItems.push(item);
}
  self.healItemMove = function() {
    for (var i=0;i<healItems.length;i++) {
   
      healItems[i].posX = Math.round(healItems[i].posX - healItems[i].speed);

      if (healItems[i].posX + healItems[i].size <= 0) {
        healItems[i].dell = true;
      }

      if (healItems[i].dell) {
        healItems.splice(i, 1);
      }
    }
  }
  self.healItemPaint = function () {

    for (let i = 0; i < healItems.length; i++) {
         
      switch (healItems[i].randomImg) {
        case 1:
          healItemImg = healItem1;
          ctx.drawImage(healItemImg,healItems[i].posX, healItems[i].posY, healItems[i].size, healItems[i].size);
          break;

        case 2:
          healItemImg= healItem2;
          ctx.drawImage(healItemImg, healItems[i].posX, healItems[i].posY, healItems[i].size,healItems[i].size);
          break;

        case 3:
         healItemImg = healItem3;
          ctx.drawImage(healItemImg, healItems[i].posX, healItems[i].posY,healItems[i].size, healItems[i].size);
          break;

        case 4:
          healItemImg = healItem4;
          ctx.drawImage(healItemImg, healItems[i].posX, healItems[i].posY, healItems[i].size, healItems[i].size);
          break;

      }
    }
  }
}

function Cell () {
  var self = this;
  var cellImg;
  
  self.addCell = function () {
    var item = {
    posX : W+standartSize/10, 
    posY:randomDiap(0,H-standartSize*0.6),
    speed:randomDiap(3, 4),
    size:standartSize*0.6,
    dell:false,
    node:true,
    randomImg : randomDiap(1, 3),
    angle : randomDiap(35, 155),
  }
  cells.push(item);
}
  self.cellMove = function() {
    for (var i=0;i<cells.length;i++) {
   
      cells[i].posX = Math.round(cells[i].posX - cells[i].speed);

      if (cells[i].posX + cells[i].size <= 0) {
        cells[i].dell = true;
      }
      if (cells[i].dell) {
        cells.splice(i, 1);
      }
    }
  }
  self.cellPaint = function () {

    for (let i = 0; i < cells.length; i++) {
      switch (cells[i].randomImg) {
        case 1:
          cellImg = cell1;
          ctx.drawImage(cellImg,cells[i].posX, cells[i].posY, cells[i].size, cells[i].size);
          break;

        case 2:
          cellImg= cell2;
          ctx.drawImage(cellImg, cells[i].posX, cells[i].posY, cells[i].size,cells[i].size);
          break;

        case 3:
         cellImg = cell3;
          ctx.drawImage(cellImg, cells[i].posX, cells[i].posY,cells[i].size, cells[i].size);
          break;

      }
    }
  }
}

function checkCollisionsEnemies() {
    for(var i=0; i<enemies.length; i++) {
        var posX1 = enemies[i].posX;
        var posY1 = enemies[i].posY;
        var size1 = enemies[i].size;

        for(var j=0; j<fire.length; j++) {
            var posX2 = fire[j].posX;
            var posY2 = fire[j].posY;
            var size2 = fire[j].size;

            if(boxCollides(posX1, posY1, size1, posX2, posY2, size2)) {
                enemies.splice(i, 1);
                i--;
                newExplosion.addExplosion(posX1,posY1);
                playSound(bangSound);
                score += 100;
                fire.splice(j, 1);
                break;
            }
        }

        if(boxCollides(posX1, posY1, size1, player.posX, player.posY, player.size)) {
            player.life--;
            enemies.splice(i, 1);
            i--;
            newExplosion.addExplosion(posX1,posY1);
            playSound(collisionSound);
            if ( navigator.vibrate ) window.navigator.vibrate(100); 
            lifesChildren = lifes.children;
            i = lifesChildren.length;
            lifes.removeChild(lifesChildren[i-1]);
            if (player.life==0) gameOver();
        }
    }

}

    function checkCollisionsCells() {
      var img1 = document.getElementById('react1');
    for(var i=0; i<cells.length; i++) {
        var posX1 =cells[i].posX;
        var posY1 = cells[i].posY;
        var size1 = cells[i].size;
        for(var j=0; j<fire.length; j++) {
            var posX2 = fire[j].posX;
            var posY2 = fire[j].posY;
            var size2 = fire[j].size;
            img1.style.animation = 'none';
            if(boxCollides(posX1, posY1, size1, posX2, posY2, size2)) {
                playSound(cellSound);
                if ( navigator.vibrate ) window.navigator.vibrate(100); 
                player.life--;
                cells.splice(i, 1);
                i--;
                lifesChildren = lifes.children;
                i = lifesChildren.length;
                lifes.removeChild(lifesChildren[i-1]);
                if (player.life==0) gameOver();
                fire.splice(j, 1);
                img1.setAttribute('src','img/sad.png');
                if (isGameOver!=true) {img1.style.animation = 'showReact 1.5s 1 linear';}
                break;
            }
        }
    }

}

function checkCollisionsHealItems() {
  var img2 = document.getElementById('react2');
    for(var i=0; i<healItems.length; i++) {
        var posX1 = healItems[i].posX;
        var posY1 = healItems[i].posY;
        var size1 = healItems[i].size;
        
        img2.style.animation = 'none';
        if(boxCollides(posX1, posY1, size1, player.posX, player.posY, player.size)) {
            playSound(lifeSound);
            player.life++;
            healItems.splice(i, 1);
            i--;
            img2.setAttribute('src','img/happydoc.png');
            img2.style.animation = 'showReact 1.5s 1 linear';
            if (lifesChildren.length<4) {
            var image = document.createElement('img');
            image.setAttribute('src', 'img/h4.png');
            image.setAttribute('width', standartSize/2);
            lifes.appendChild(image);
            }
        }
        }
    }


  function collides(left1, top1, right1, bottom1, left2, top2, right2, bottom2) {
    return !(right1 <= left2 || left1 > right2 ||
             bottom1<= top2 || top1 > bottom2);
}
   
  function boxCollides(posX1, posY1, size1, posX2, posY2, size2) {
    return collides(posX1, posY1,
                    posX1 + size1, posY1 + size1,
                    posX2, posY2,
                    posX2 + size2, posY2 + size2);
}
function gameOver() {
    playSound(gameOverSound);
    stopSound(mainMusic);
    overlay.style.zIndex = 10;
    overlay.style.display = 'block';
    gameOverDiv.style.display = 'block';
    gameOverDiv.style.left = (W  - gameOverDiv.offsetWidth) / 2 + "px";
    gameOverDiv.style.top = (H  - gameOverDiv.offsetHeight) / 2 + "px";

    var coords = [
      [gameOverDiv.offsetLeft - standartSize*0.8, gameOverDiv.offsetTop],
      [gameOverDiv.offsetLeft + gameOverDiv.offsetWidth, gameOverDiv.offsetTop],
      [gameOverDiv.offsetLeft + gameOverDiv.offsetWidth - standartSize*0.4, gameOverDiv.offsetTop + gameOverDiv.offsetHeight - standartSize*0.4],
      [gameOverDiv.offsetLeft - standartSize*0.4, gameOverDiv.offsetTop + gameOverDiv.offsetHeight - standartSize*0.4],
    ];
    var images = ['/img/deadvirus1.png','/img/deadvirus2.png', '/img/deadvirus3.png', '/img/deadvirus4.png'];

    for (var i=0;i<4;i++) {
      var img = document.createElement('img');
      img.setAttribute('src',images[i]);
      img.style.width = standartSize*0.8 +'px';
      img.style.position = 'absolute';
      img.style.left = coords[i][0]+'px' ;
      img.style.top = coords[i][1]+'px' ;
      overlay.appendChild(img);
    }
    
  
    isGameOver = true;
    fire = [];
    enemies = [];
    cells = [];
    healItems = [];
}

function reset() {
    document.getElementById('overlay').style.display = 'none';
    isGameOver = false;
    gameTime = 0;
    score = 0;
  player.posX = 0;
  player.posY= (H-player.size)/2;
  player.life = 4;
    player.update();
  drawLifes ();
   playSound(mainMusic);
};

function drawLifes () {
  for (var i=0;i<player.life;i++) {
    var image = document.createElement('img');
    image.setAttribute('src', 'img/h4.png');
    image.setAttribute('width', standartSize/2);
    lifes.appendChild(image);
  }
}

function Explosion () {
  var self = this;

  self.addExplosion = function (x,y) {
    var explosion = {
    posX: x, 
    posY: y,
    animX:0,
    animY:0,
    speed:0,
    size:standartSize*0.8,
    accel:0.2,
  }
  explosions.push(explosion);
}
  self.explosionAnimate = function() {
    for (let i = 0; i < explosions.length; i++) {
    explosions[i].animX = explosions[i].animX + explosions[i].accel;

    if (explosions[i].animX > 8) { explosions[i].animY++; explosions[i].animX = 0 };

    if (explosions[i].animY > 0) explosions.splice(i, 1);
  }
  }
  self.explosionPaint = function () {
    for (let i = 0; i < explosions.length; i++) {
         
ctx.drawImage(explosionI, 200 * Math.floor(explosions[i].animX), 200 * Math.floor(explosions[i].animY), 200, 200, explosions[i].posX,explosions[i].posY, explosions[i].size, explosions[i].size);
    }
  }
}