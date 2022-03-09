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
var W = window.innerWidth;
var H = window.innerHeight;
var gameOverDiv = document.getElementById("game-over");
var overlay = document.getElementById("overlay");
var lifes = document.getElementById('life');
var lifesChildren;
var i;

window.addEventListener("resize", resize, false);
function resize(e) {
  e = e || window.event;
  e.preventDefault;
  H = window.innerHeight;
  W = window.innerWidth;
  canvas.width = W;
  canvas.height = H;
  player.update();
}

var canvas = document.createElement("canvas");
canvas.id = "canvas";
var ctx = canvas.getContext("2d");
canvas.width = W;
canvas.height = H;
body[0].appendChild(canvas);

var pause = document.getElementById('pause');
var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
circle.setAttribute("cx", 50);
circle.setAttribute("cy", 50);
circle.setAttribute("r", 40);
circle.setAttribute("fill", "white");
circle.setAttribute("stroke", "orange");
circle.setAttribute("stroke-width", 5);
pause.appendChild(circle);

var stroke1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
stroke1.setAttribute("x", 35);
stroke1.setAttribute("y", 30);
stroke1.setAttribute("width", 10);
stroke1.setAttribute("height", 40);
stroke1.setAttribute('stroke-width', 5);
stroke1.setAttribute('stroke', 'orange');
stroke1.setAttribute('stroke-linejoin', 'round');
stroke1.setAttribute("fill", "orange");
pause.appendChild(stroke1);

var stroke2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
stroke2.setAttribute("x", 55);
stroke2.setAttribute("y", 30);
stroke2.setAttribute("width", 10);
stroke2.setAttribute("height", 40);
stroke2.setAttribute('stroke-width', 5);
stroke2.setAttribute('stroke', 'orange');
stroke2.setAttribute('stroke-linejoin', 'round');
stroke2.setAttribute("fill", "orange");
pause.appendChild(stroke2);

var triangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
triangle.setAttribute('points', '35,30 75,50 35,70');
triangle.setAttribute('stroke-width', 5);
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
    isclicked = true;
  } else {
    pause.appendChild(stroke1);
    pause.appendChild(stroke2);
    pause.removeChild(triangle);
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

PreloadImage("img/back4.jpg");
PreloadImage("img/happy5.png");
PreloadImage("img/shoot.png");
PreloadImage("img/sprite.png");
PreloadImage("img/virusgreen.png");
PreloadImage("img/viruslightblue.png");
PreloadImage("img/viruspurple.png");
PreloadImage("img/virusred.png");

var player = document.createElement("img");
player.id = "player";
player.setAttribute("src", "img/happy4.png");
player.style.position = "absolute";
player.style.width = 100 + "px";
player.style.height = 100 + "px";
body[0].appendChild(player);
player = {
  posX: W/2,
  posY: H/2,
  size: 100,
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
  init();
};
function init() {
  player.update();
  
  body[0].style.backgroundImage = "url('img/back4.jpg')";
  body[0].style.backgroundSize = "cover";
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

let newFire = new Fire();

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

function movePlayer(e) {
  e = e || window.event;
  e.preventDefault();
  if (e.keyCode == 37||e.keyCode == 65) player.speedX = -8;
  if (e.keyCode == 39||e.keyCode == 68) player.speedX = 8;
  if (e.keyCode == 38||e.keyCode == 87) player.speedY = -8;
  if (e.keyCode == 40||e.keyCode == 83) player.speedY = 8;
  if (e.keyCode == 32) {
      newFire.addFire(player.posX + player.size, player.posY + player.size / 2);
  }
}

function stopPlayer(e) {
  e = e || window.event;
  e.preventDefault();
  if (e.keyCode == 37 || e.keyCode == 39||e.keyCode == 65||e.keyCode == 68) player.speedX = 0;
  if (e.keyCode == 38 || e.keyCode == 40||e.keyCode == 87||e.keyCode == 83) player.speedY = 0;
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
    posX : W+10, 
    posY:randomDiap(0,H-80),
    speed:randomDiap(1, 4),
    size:80,
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
    posX : W+10, 
    posY:randomDiap(0,H-80),
    speed:randomDiap(3, 4),
    size:80,
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
    posX : W+10, 
    posY:randomDiap(0,H-80),
    speed:randomDiap(3, 4),
    size:60,
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
            player.life++;
            healItems.splice(i, 1);
            i--;
            img2.setAttribute('src','img/happydoc.png');
            img2.style.animation = 'showReact 1.5s 1 linear';
            if (lifesChildren.length<4) {
            var image = document.createElement('img');
            image.setAttribute('src', 'img/life2.png');
            image.setAttribute('width', 50);
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
    overlay.style.zIndex = 10;
    overlay.style.display = 'block';
    gameOverDiv.style.display = 'block';
    gameOverDiv.style.left = (W  - gameOverDiv.offsetWidth) / 2 + "px";
    gameOverDiv.style.top = (H  - gameOverDiv.offsetHeight) / 2 + "px";
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
  player.posX = (W-player.size)/2;
  player.posY= (H-player.size)/2;
  player.life = 4;
    player.update();
  drawLifes ();
};

function drawLifes () {
  for (var i=0;i<player.life;i++) {
    var image = document.createElement('img');
    image.setAttribute('src', 'img/life2.png');
    image.setAttribute('width', 50);
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
    size:80,
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
      console.log('here');

    for (let i = 0; i < explosions.length; i++) {
         
ctx.drawImage(explosionI, 200 * Math.floor(explosions[i].animX), 200 * Math.floor(explosions[i].animY), 200, 200, explosions[i].posX,explosions[i].posY, explosions[i].size, explosions[i].size);
    }
  }
}