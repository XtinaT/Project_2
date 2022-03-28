"use strict";
var body = document.getElementsByTagName("body");
var wrapper = document.getElementById("wrapper");
function getWindowClientSize() {
  var uaB=navigator.userAgent.toLowerCase();
  var isOperaB = (uaB.indexOf('opera')  > -1);
  var isIEB=(!isOperaB && uaB.indexOf('msie') > -1);

  var clientWidth=((document.compatMode||isIEB)&&!isOperaB)?
    (document.compatMode=='CSS1Compat')?
    document.documentElement.clientWidth:
    document.body.clientWidth:
    (document.parentWindow||document.defaultView).innerWidth;

  var clientHeight=((document.compatMode||isIEB)&&!isOperaB)?
    (document.compatMode=='CSS1Compat')?
    document.documentElement.clientHeight:
    document.body.clientHeight:
    (document.parentWindow||document.defaultView).innerHeight;

  return {width:clientWidth, height:clientHeight};
}
var sizes = getWindowClientSize();
var W = sizes.width;
var H = sizes.height;
var isGameOver;
var RAF =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

var standartSize = W / 17;
var standartItemSize;
W > H ? (standartItemSize = W / 17) : (standartItemSize = H / 17);
var gameOverDiv;
var overlay;

var canvas = document.createElement("canvas");
canvas.id = "canvas";
var ctx = canvas.getContext("2d");

var scoreEl;
var lifes;
var lifesChildren;
var fireButton;
var img2;

/////////////////////////DRAWGAME////////////////////////////////////
function drawGame() {
  overlay = document.getElementById("overlay");
  gameOverDiv = document.getElementById("game-over");
  fireButton = document.getElementById("fireButton");
  fireButton.style.left = (W - fireButton.offsetWidth) / 2 + "px";
  fireButton.style.top = 0.8 * H + "px";
  scoreEl = document.getElementById("score");
  lifes = document.getElementById("life");
  img2 = document.getElementById("react2");
  var svg = document.getElementById("pause");
  svg.setAttribute("width", W / 15);
  svg.setAttribute("height", W / 15);

  canvas.width = W;
  canvas.height = H;
  wrapper.appendChild(canvas);

  var pause = document.getElementById("pause");
  var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", standartSize / 2);
  circle.setAttribute("cy", standartSize / 1.7);
  circle.setAttribute("r", standartSize / 2.1);
  circle.setAttribute("fill", "white");
  circle.setAttribute("stroke", "orange");
  circle.setAttribute("stroke-width", standartSize / 20);
  pause.appendChild(circle);

  var stroke1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  stroke1.setAttribute("x", standartSize / 2.9);
  stroke1.setAttribute("y", standartSize / 2.7);
  stroke1.setAttribute("width", standartSize / 10);
  stroke1.setAttribute("height", standartSize / 2.3);
  stroke1.setAttribute("stroke-width", standartSize / 20);
  stroke1.setAttribute("stroke", "orange");
  stroke1.setAttribute("stroke-linejoin", "round");
  stroke1.setAttribute("fill", "orange");
  pause.appendChild(stroke1);

  var stroke2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  stroke2.setAttribute("x", standartSize / 1.8);
  stroke2.setAttribute("y", standartSize / 2.7);
  stroke2.setAttribute("width", standartSize / 10);
  stroke2.setAttribute("height", standartSize / 2.3);
  stroke2.setAttribute("stroke-width", standartSize / 20);
  stroke2.setAttribute("stroke", "orange");
  stroke2.setAttribute("stroke-linejoin", "round");
  stroke2.setAttribute("fill", "orange");
  pause.appendChild(stroke2);

  var triangle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polygon"
  );
  triangle.setAttribute(
    "points",
    `${standartSize / 2.8}, ${standartSize / 2.9} ${standartSize / 1.3}, ${
      standartSize / 1.7
    } ${standartSize / 2.8}, ${standartSize / 1.2}`
  );
  triangle.setAttribute("stroke-width", standartSize / 20);
  triangle.setAttribute("stroke", "orange");
  triangle.setAttribute("stroke-linejoin", "round");
  triangle.setAttribute("fill", "orange");

  pause.addEventListener("click", click, false);
  var isclicked = false;

  function click(e) {
    e = e || window.event;
    e.preventDefault;
    if (!isclicked) {
      pause.removeChild(stroke1);
      pause.removeChild(stroke2);
      pause.appendChild(triangle);
      RAF = null;
      isclicked = true;
      playSound(clickSound);
      canvas.style.cursor = "default";
    } else {
      pause.appendChild(stroke1);
      pause.appendChild(stroke2);
      pause.removeChild(triangle);
      RAF =
        window.requestAnimationFrame ||
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
}
/////////////////////////DRAWGAME END////////////////////////////////////
function drawLifes() {
  for (var i = 0; i < player.life; i++) {
    var image = document.createElement("img");
    image.setAttribute("src", "img/h4.png");
    image.setAttribute("width", standartItemSize / 2);
    lifes.appendChild(image);
  }
}



var lastTime;

var player;
player = {
  posX: 0,
  posY: H / 2,
  size: standartItemSize,
  speedX: 0,
  speedY: 0,
  life: 4,
  score: 0,
  create: function () {
    var playerEl = document.createElement("img");
    playerEl.id = "player";
    playerEl.setAttribute("src", "img/happy4.png");
    playerEl.style.position = "absolute";
    playerEl.style.width = standartItemSize + "px";
    playerEl.style.height = standartItemSize + "px";
    wrapper.appendChild(playerEl);
  },
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
    if (player.posY <= W / 15 && player.posX <= W / 15) player.posY = W / 15;
    if (player.posX + player.size > W) {
      player.posX = W - player.size;
    }
    if (player.posY + player.size > H) player.posY = H - player.size;
    if (player.posY < 0) player.posY = 0;
  },
  damage: function (sound) {
    this.life--;
    lifesChildren = lifes.children;
    let i = lifesChildren.length;
    lifes.removeChild(lifesChildren[i - 1]);
    playSound(sound);
    if (navigator.vibrate) window.navigator.vibrate(100);
  },
  heal: function (sound) {
    this.life++;
    playSound(sound);
    if (lifesChildren.length < 4) {
      var image = document.createElement("img");
      image.setAttribute("src", "img/h4.png");
      image.setAttribute("width", standartItemSize / 2);
      lifes.appendChild(image);
      img2.setAttribute("src", "img/happydoc.png");
      img2.style.animation = "showReact 1.5s 1 linear";
      setTimeout(function() { 
        img2.style.animation = "none";
  },  1500);
    }
  },
  addScore: function () {
    this.score += 100;
  },
};

var newEnemy = new Enemy();
var newHealItem = new HealItem();
var newCell = new Cell();
var newExplosion = new Explosion();
var newFire = new Fire();

var fire = [];
var enemies = [];
var explosions = [];
var cells = [];
var healItems = [];
var explosions = [];
var coords;

var gameTime = 0;
var play;
/////////////////////////  INIT  ////////////////////////////////////
function init() {
  RAF =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  isGameOver = false;
  if (!document.getElementById("player")) {
    player.create();
    player.update();
    play = document.getElementById("player");
    play.addEventListener("touchstart", playerTouchStart, { passive: false });
    play.addEventListener("touchmove", movePlayerTouch, { passive: false });
    play.addEventListener("touchend", playerTouchEnd, { passive: false });
  }

  window.addEventListener("keydown", movePlayer, false);
  window.addEventListener("keyup", stopPlayer, false);
  window.addEventListener("mousemove", movePlayerMouse, false);
  window.addEventListener("click", mouseFire, false);
  wrapper.style.backgroundImage = "url('img/back5.webp')";
  wrapper.style.backgroundSize = "cover";
  document.getElementById("play-again").addEventListener("click", init, false);
  reset();
  lastTime = Date.now();
  mainLoop();
}
/////////////////////////  INIT  END   ////////////////////////////////////

/////////////////////////  MAINLOOP  ////////////////////////////////////
function mainLoop() {
  var now = Date.now();
  var dt = (now - lastTime) / 1000.0;
  update(dt);
  lastTime = now;
  RAF(mainLoop);
}
/////////////////////////  MAINLOOP  END////////////////////////////////////

/////////////////////////  GAMEOVER  ////////////////////////////////////
function gameOver() {
  RAF = null;
  playSound(gameOverSound);
  stopSound(mainMusic);
  overlay.style.zIndex = 10;
  overlay.style.display = "block";
  gameOverDiv.style.display = "block";
  gameOverDiv.style.left = (W - gameOverDiv.offsetWidth) / 2 + "px";
  gameOverDiv.style.top = (H - gameOverDiv.offsetHeight) / 2 + "px";

  coords = [
    [gameOverDiv.offsetLeft - standartItemSize * 0.8, gameOverDiv.offsetTop],
    [gameOverDiv.offsetLeft + gameOverDiv.offsetWidth, gameOverDiv.offsetTop],
    [
      gameOverDiv.offsetLeft + gameOverDiv.offsetWidth - standartItemSize * 0.4,
      gameOverDiv.offsetTop + gameOverDiv.offsetHeight - standartItemSize * 0.4,
    ],
    [
      gameOverDiv.offsetLeft - standartItemSize * 0.4,
      gameOverDiv.offsetTop + gameOverDiv.offsetHeight - standartItemSize * 0.4,
    ],
  ];

  for (var i = 0; i < 4; i++) {
    var img = document.createElement("img");
    img.setAttribute("src", images[i]);
    img.style.width = standartItemSize * 0.8 + "px";
    img.style.position = "absolute";
    img.style.left = coords[i][0] + "px";
    img.style.top = coords[i][1] + "px";
    overlay.appendChild(img);
  }

  isGameOver = true;
  gameTime = 0;
  fire = [];
  enemies = [];
  cells = [];
  healItems = [];

  sendRecord();

  window.removeEventListener("keydown", movePlayer, false);
  window.removeEventListener("keyup", stopPlayer, false);
  window.removeEventListener("mousemove", movePlayerMouse, false);
  window.removeEventListener("click", mouseFire, false);
}

/////////////////////////  GAMEOVER END ////////////////////////////////////

/////////////////////////  RESET ////////////////////////////////////
function reset() {
  document.getElementById("overlay").style.display = "none";
  gameTime = 0;
  player.score = 0;
  player.posX = 0;
  player.posY = (H - player.size) / 2;
  player.life = 4;
  player.update();
  drawLifes();
  playSound(mainMusic);
}

/////////////////////////  RESET END ////////////////////////////////////

function randomDiap(n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}
function toRadians(angle) {
  return angle * (Math.PI / 180);
}

/////////////////////////  UPDATE ////////////////////////////////////
function update(dt) {
  gameTime += dt;
  ctx.clearRect(0, 0, W, H);
  if (player.life == 0) gameOver();
  if (!isGameOver) {
    player.move();
    player.update();
  }
  if (!isGameOver) {
    newFire.firePaint();
    newFire.fireMove();
    if (Math.random() < 1 - Math.pow(0.996, gameTime) && enemies.length <= 7) {
      newEnemy.addEnemy();
    }
    newEnemy.enemyPaint();
    newEnemy.enemyMove();

    if (healItems.length == 0 && player.life < 4) {
      newHealItem.addHealItem();
    }
    newHealItem.healItemPaint();
    newHealItem.healItemMove();

    if (Math.random() < 1 - Math.pow(0.996, gameTime) && cells.length <= 5) {
      newCell.addCell();
    }
    newCell.cellPaint();
    newCell.cellMove();

    checkCollisionsEnemies();
    checkCollisionsCells();
    checkCollisionsHealItems();
  }
  if (explosions.length > 0) {
    newExplosion.explosionAnimate();
    newExplosion.explosionPaint();
  }
  scoreEl.innerHTML = player.score;
}

/////////////////////////  UPDATE END////////////////////////////////////

/////////////////////////  CONTROLLERS  ////////////////////////////////////



var touchShiftX = 0;
var touchShiftY = 0;

function movePlayer(e) {
  e = e || window.event;
  e.preventDefault();
  if (e.keyCode == 37 || e.keyCode == 65) player.speedX = -8;
  if (e.keyCode == 39 || e.keyCode == 68) player.speedX = 8;
  if (e.keyCode == 38 || e.keyCode == 87) player.speedY = -8;
  if (e.keyCode == 40 || e.keyCode == 83) player.speedY = 8;
  if (e.keyCode == 32 && !isGameOver) {
    newFire.addFire(player.posX + player.size, player.posY + player.size / 2);
    playSound(shootSound);
  }
}

function stopPlayer(e) {
  e = e || window.event;
  e.preventDefault();
  if (e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 65 || e.keyCode == 68)
    player.speedX = 0;
  if (e.keyCode == 38 || e.keyCode == 40 || e.keyCode == 87 || e.keyCode == 83)
    player.speedY = 0;
}

function mouseFire(e) {
  e = e || window.event;
  e.preventDefault();
  if (e.pageY > W / 15 || (e.pageX > W / 15 && !isGameOver)) {
    newFire.addFire(player.posX + player.size, player.posY + player.size / 2);
    playSound(shootSound);
  }
}

function movePlayerMouse(e) {
  e = e || window.event;
  e.preventDefault();
  player.posX = Math.round(e.pageX - player.size / 2);
  player.posY = Math.round(e.pageY - player.size / 2);
}

function playerTouchStart(e) {
  var self = this;
  e = e || window.event;
  e.preventDefault();
  window.removeEventListener("click", mouseFire, false);
  window.removeEventListener("mousemove", movePlayerMouse, false);
 
  self.style.cursor = "none";
  var touchInfo = e.targetTouches[0];
  touchShiftX = touchInfo.pageX - player.posX;
  touchShiftY = touchInfo.pageY - player.posY;
  fireButton.style.visibility = "visible";
  fireButton.style.zIndex = 100;
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

function touchFire(e) {
  e = e || window.event;
  e.preventDefault();
  newFire.addFire(player.posX + player.size, player.posY);
  playSound(shootSound);
}


$(".wrapper").bind("doubleTap", function () {
  newFire.addFire(player.posX + player.size, player.posY + player.size / 2);
});



/////////////////////////  CONTROLLERS END ////////////////////////////////////

/////////////////////////  ВЫСТРЕЛЫ  ////////////////////////////////////
function Fire() {
  let self = this;
  self.speedFire = 11;
  self.fireSize = player.size / 4;
  self.addFire = function (x, y) {
    let fireItem = {};
    fireItem.size = self.fireSize;
    fireItem.posX = x - self.fireSize / 4;
    fireItem.posY = y - self.fireSize / 3;
    fireItem.speedX = self.speedFire;
    fire.push(fireItem);
  };
  self.removeFire = function (i) {
    fire.splice(i, 1);
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

/////////////////////////  ВРАГИ  ////////////////////////////////////
function Enemy() {
  var self = this;
  var enemyImg;

  self.addEnemy = function () {
    var enemy = {
      posX: W + standartItemSize / 10,
      posY: randomDiap(0, H - standartItemSize * 0.8),
      speed: randomDiap(1, 4),
      size: standartItemSize * 0.8,
      dell: false,
      node: true,
      randomImg: randomDiap(1, 4),
      angle: randomDiap(35, 155),
    };
    enemies.push(enemy);
  };
  self.removeEnemy = function (i) {
    enemies.splice(i, 1);
  };
  self.enemyMove = function () {
    for (var i = 0; i < enemies.length; i++) {
      enemies[i].posX = Math.round(enemies[i].posX - enemies[i].speed);

      if (enemies[i].posX + enemies[i].size <= 0) {
        enemies[i].dell = true;
      }
      if (enemies[i].dell) {
        enemies.splice(i, 1);
      }
    }
  };
  self.enemyPaint = function () {
    for (let i = 0; i < enemies.length; i++) {
      switch (enemies[i].randomImg) {
        case 1:
          enemyImg = enemy1;
          ctx.drawImage(
            enemyImg,
            enemies[i].posX,
            enemies[i].posY,
            enemies[i].size,
            enemies[i].size
          );
          break;

        case 2:
          enemyImg = enemy2;
          ctx.drawImage(
            enemyImg,
            enemies[i].posX,
            enemies[i].posY,
            enemies[i].size,
            enemies[i].size
          );
          break;

        case 3:
          enemyImg = enemy3;
          ctx.drawImage(
            enemyImg,
            enemies[i].posX,
            enemies[i].posY,
            enemies[i].size,
            enemies[i].size
          );
          break;

        case 4:
          enemyImg = enemy4;
          ctx.drawImage(
            enemyImg,
            enemies[i].posX,
            enemies[i].posY,
            enemies[i].size,
            enemies[i].size
          );
          break;
      }
    }
  };
}
/////////////////////////  ХИЛЕРЫ ////////////////////////////////////
function HealItem() {
  var self = this;
  var healItemImg;

  self.addHealItem = function () {
    var item = {
      posX: W + standartItemSize / 10,
      posY: randomDiap(0, H - standartItemSize * 0.8),
      speed: randomDiap(3, 4),
      size: standartItemSize * 0.8,
      dell: false,
      node: true,
      randomImg: randomDiap(1, 4),
      angle: randomDiap(35, 155),
    };
    healItems.push(item);
  };
  self.removeHealItem = function (i) {
    healItems.splice(i, 1);
  };
  self.healItemMove = function () {
    for (var i = 0; i < healItems.length; i++) {
      healItems[i].posX = Math.round(healItems[i].posX - healItems[i].speed);

      if (healItems[i].posX + healItems[i].size <= 0) {
        healItems[i].dell = true;
      }

      if (healItems[i].dell) {
        healItems.splice(i, 1);
      }
    }
  };
  self.healItemPaint = function () {
    for (let i = 0; i < healItems.length; i++) {
      switch (healItems[i].randomImg) {
        case 1:
          healItemImg = healItem1;
          ctx.drawImage(
            healItemImg,
            healItems[i].posX,
            healItems[i].posY,
            healItems[i].size,
            healItems[i].size
          );
          break;

        case 2:
          healItemImg = healItem2;
          ctx.drawImage(
            healItemImg,
            healItems[i].posX,
            healItems[i].posY,
            healItems[i].size,
            healItems[i].size
          );
          break;

        case 3:
          healItemImg = healItem3;
          ctx.drawImage(
            healItemImg,
            healItems[i].posX,
            healItems[i].posY,
            healItems[i].size,
            healItems[i].size
          );
          break;

        case 4:
          healItemImg = healItem4;
          ctx.drawImage(
            healItemImg,
            healItems[i].posX,
            healItems[i].posY,
            healItems[i].size,
            healItems[i].size
          );
          break;
      }
    }
  };
}
/////////////////////////  КЛЕТКИ  ////////////////////////////////////
function Cell() {
  var self = this;
  var cellImg;

  self.addCell = function () {
    var item = {
      posX: W + standartItemSize / 10,
      posY: randomDiap(0, H - standartItemSize * 0.6),
      speed: randomDiap(3, 4),
      size: standartItemSize * 0.6,
      dell: false,
      node: true,
      randomImg: randomDiap(1, 3),
      angle: randomDiap(35, 155),
    };
    cells.push(item);
  };
  self.removeCell = function (i) {
    cells.splice(i, 1);
  };
  self.cellMove = function () {
    for (var i = 0; i < cells.length; i++) {
      cells[i].posX = Math.round(cells[i].posX - cells[i].speed);

      if (cells[i].posX + cells[i].size <= 0) {
        cells[i].dell = true;
      }
      if (cells[i].dell) {
        cells.splice(i, 1);
      }
    }
  };
  self.cellPaint = function () {
    for (let i = 0; i < cells.length; i++) {
      switch (cells[i].randomImg) {
        case 1:
          cellImg = cell1;
          ctx.drawImage(cellImg, cells[i].posX, cells[i].posY, cells[i].size, cells[i].size);
          break;

        case 2:
          cellImg = cell2;
          ctx.drawImage(cellImg, cells[i].posX, cells[i].posY, cells[i].size, cells[i].size);
          break;

        case 3:
          cellImg = cell3;
          ctx.drawImage(cellImg, cells[i].posX, cells[i].posY, cells[i].size, cells[i].size);
          break;
      }
    }
  };
}

/////////////////////////  СТОЛКНОВЕНИЯ  ////////////////////////////////////
function checkCollisionsEnemies() {
  for (var i = 0; i < enemies.length; i++) {
    var posX1 = enemies[i].posX;
    var posY1 = enemies[i].posY;
    var size1 = enemies[i].size;

    for (var j = 0; j < fire.length; j++) {
      var posX2 = fire[j].posX;
      var posY2 = fire[j].posY;
      var size2 = fire[j].size;

      if (posCollides(posX1, posY1, size1, posX2, posY2, size2)) {
        newEnemy.removeEnemy(i);
        i--;
        newExplosion.addExplosion(posX1, posY1);
        player.addScore();
        newFire.removeFire(j);
        break;
      }
    }

    if (
      posCollides(posX1, posY1, size1, player.posX, player.posY, player.size)
    ) {
      player.damage(collisionSound);
      newEnemy.removeEnemy(i);
      i--;
      newExplosion.addExplosion(posX1, posY1);
    }
  }
}

function checkCollisionsCells() {
  var img1 = document.getElementById("react1");
  for (var i = 0; i < cells.length; i++) {
    var posX1 = cells[i].posX;
    var posY1 = cells[i].posY;
    var size1 = cells[i].size;
    for (var j = 0; j < fire.length; j++) {
      var posX2 = fire[j].posX;
      var posY2 = fire[j].posY;
      var size2 = fire[j].size;
      img1.style.animation = "none";
      if (posCollides(posX1, posY1, size1, posX2, posY2, size2)) {
        player.damage(cellSound);
        newCell.removeCell(i);
        i--;
        newFire.removeFire(j);
        img1.setAttribute("src", "img/sad.png");
        if (isGameOver == false) {
          img1.style.animation = "showReact 1.5s 1 linear";
        }
        break;
      }
    }
  }
}

function checkCollisionsHealItems() {
  for (var i = 0; i < healItems.length; i++) {
    var posX1 = healItems[i].posX;
    var posY1 = healItems[i].posY;
    var size1 = healItems[i].size;
    
    if (
      posCollides(posX1, posY1, size1, player.posX, player.posY, player.size)
    ) {
      player.heal(lifeSound);
      newHealItem.removeHealItem(i);
      i--;
    }
  }
}

function collides(left1, top1, right1, bottom1, left2, top2, right2, bottom2) {
  return !(
    right1 <= left2 ||
    left1 > right2 ||
    bottom1 <= top2 ||
    top1 > bottom2
  );
}

function posCollides(posX1, posY1, size1, posX2, posY2, size2) {
  return collides(posX1, posY1, posX1 + size1, posY1 + size1, posX2, posY2, posX2 + size2, posY2 + size2);
}

/////////////////////////  ВЗРЫВЫ ////////////////////////////////////
function Explosion() {
  var self = this;

  self.addExplosion = function (x, y) {
    var explosion = {
      posX: x,
      posY: y,
      animX: 0,
      animY: 0,
      speed: 0,
      size: standartItemSize * 0.8,
      accel: 0.2,
    };
    explosions.push(explosion);
    playSound(bangSound);
  };
  self.explosionAnimate = function () {
    for (let i = 0; i < explosions.length; i++) {
      explosions[i].animX = explosions[i].animX + explosions[i].accel;

      if (explosions[i].animX > 8) {
        explosions[i].animY++;
        explosions[i].animX = 0;
      }

      if (explosions[i].animY > 0) explosions.splice(i, 1);
    }
  };
  self.explosionPaint = function () {
    for (let i = 0; i < explosions.length; i++) {
      ctx.drawImage(
        explosionI,
        200 * Math.floor(explosions[i].animX),
        200 * Math.floor(explosions[i].animY),
        200,
        200,
        explosions[i].posX,
        explosions[i].posY,
        explosions[i].size,
        explosions[i].size
      );
    }
  };
}

/////////////////////////  UNLOAD ////////////////////////////////////
/*window.onbeforeunload = function(e) {
  e = e || window.event;
  e.preventDefault(); 
  if (isGameOver == false) {
    e.returnValue = 'Прогресс может быть утерян!';
    console.log('here');
  }
}; */

