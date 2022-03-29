"use strict";

// #Main - главная
// #Game - игра

//var body = document.getElementsByTagName("body");
//var wrapper = document.getElementById("wrapper");
//H = window.innerHeight;
//W = window.innerWidth;

var isGameOver = true;

// Предупреждение при изменении закладки
window.onhashchange = function () {
  if (location.hash != "#Game") {
    if (!isGameOver) {
      let answer = confirm("Прогресс может быть утерян!");
      if (answer) {
        location.hash = "Main";
        switchToStateFromURLHash();
      } else {
        location.hash = "Game";
        return;
      }
    } else {
      switchToStateFromURLHash();
    }
  }
  if (isGameOver) switchToStateFromURLHash();
};
var SPAState = {};

function switchToStateFromURLHash() {
  var URLHash = window.location.hash;
  var stateStr = URLHash.substr(1);
  if (stateStr != "") {
    var parts = stateStr.split("_");
    SPAState = { pagename: parts[0] };
  } else {
    location.hash = "Main";
    SPAState = { pagename: "Main" };
  }
  var pageHTML = "";
  var preloaderHTML = "";

  switch (SPAState.pagename) {
    case "Main":
      if (!isGameOver) {
        gameOver();
      }
      pageHTML = `<p class="logo">BEAT IT!</p>
    <div class="menu">
      <input type="button" class="menuElem" value="New Game" onmouseover="playSound(hoverSound)" onclick="wantToPlay()"/>
      <input type="button" class="menuElem" value="Rules" onclick="anim2()" onmouseover="playSound(hoverSound)"/>
      <input type="button" class="menuElem" value="Results" onmouseover="playSound(hoverSound)" onclick="showRecordsss()"/>
    </div>
    <img src="img/doctors.png" alt="doctors" id="doc" />
    <img src="img/viruspurple.png" alt="coronavirus"id="virus2"/>
    <img src="img/viruslightblue.png" alt="coronavirus" id="virus1" />
    <img src="img/happy2.png" alt="whitebloodcell" id="cell1" />
    <img src="img/happy.png" alt="whitebloodcell" id="cell2" />
    <div id="rules" style="visibility: hidden" class="hiddenElements">
      <p>
        Пора уже навалять этому коронавирусу! И эта задача ляжет на плечи одного
        маленького, но очень шустрого лимфоцита, которому ты будешь помогать!
        Отстреливай зловредные вирусы, но будь осторожен, они очень опасны при
        столкновении! Также, будь внимателен и не повреди окружающие тебя клетки
        крови! И, конечно же, не забывай подкрепляться!
      </p>
        <h5>УПРАВЛЕНИЕ</h5>
        <p><b>Движение:</b> WASD / &uarr; &larr; &darr; &rarr; / Мышь / Тачскрин</p>
        <p><b>Выстрел:</b> Space / Левая клавиша мыши / Double Tap</p>
      
      <button class="button" onclick="anim1()">OK</button>
    </div>
    <div class="cover">
      <p>Please, rotate your device!</p>
      <input type="button" class="button" value="Do not rotate" onclick="cancelRotation()"/>
    </div>
    <div id="playerName" style="visibility: hidden" class="hiddenElements">
      <input type="text" class="menuElem" id="playerNameField" placeholder="Enter your name" onblur="anim4()"
      /><button class="button" onclick="startGame()">OK</button>
    </div>
    <div id="records" style="visibility: hidden" class="hiddenElements">
      <div></div>
      <br /><button class="button" onclick="anim6()">Close</button><br />
    </div>`;

      preloaderHTML = `<svg class="preloader__image" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path></svg>`;

      break;
    case "Game":
      pageHTML = `<source src='sounds/main.mp3' type='audio/mpeg' id='mainMusic'></audio>
          <div id='header'><svg id='pause' xmlns='http://www.w3.org/2000/svg'></svg>
          <div id='score'></div><div id='life'></div><img id='react1'> <img id='react2'></div>
          <div id='overlay'><div id='game-over'><h1>GAME OVER</h1><button id='play-again'>Play Again</button></div></div>`;
      preloaderHTML = "";
      break;
  }
  document.getElementById("wrapper").innerHTML = pageHTML;
  document.getElementsByClassName("preloader")[0].innerHTML = preloaderHTML;
  if (SPAState.pagename == "Main") {
    setPositions();
  }
  if (SPAState.pagename == "Game") {
    drawGame();
    init();
  }
}

function switchToState(newState) {
  var stateStr = newState.pagename;
  location.hash = stateStr;
}

function switchToGamePage() {
  playSound(clickSound);
  switchToState({ pagename: "Game" });
}

switchToStateFromURLHash();

// Предупреждение при закрытии окна
window.onbeforeunload = function (e) {
  e = e || window.event;
  e.preventDefault();
  if (isGameOver == false) {
    e.returnValue = "Прогресс может быть утерян!";
  }
};

// Запрашивает имя игрока при 
function wantToPlay(e) {
  e = e || window.event;
  e.preventDefault();
  anim3();
}

let playerNameField;

// Если иммя введено - запускает игру
function startGame(e) {
  e = e || window.event;
  e.preventDefault();
  playSound(clickSound);
  playerNameField = document.getElementById("playerNameField");
  if (playerNameField.value) {
    switchToGamePage();
  }
}
 // Отправляет запрос на сервер и показывает таблицу рекордов
function showRecordsss(e) {
  e = e || window.event;
  e.preventDefault();
  refreshRecords();
  playSound(clickSound);
}

// Подстраивает элементы Главной страницы и Игры под размеры окна
window.addEventListener("resize", resize, false);
function resize(e) {
  e = e || window.event;
  e.preventDefault;
  H = window.innerHeight;
  W = window.innerWidth;
  if (SPAState.pagename == "Main") {
    setPositions(W, H);
    document.getElementById("wrapper").style.width = "100%";
  } else if (SPAState.pagename == "Game") {
    standartSize = W / 17;
    W > H ? (standartItemSize = W / 17) : (standartItemSize = H / 17);
    canvas.width = W;
    canvas.height = H;
    if (isGameOver) {
      gameOverDiv.style.width = W * 0.5 + "px";
      gameOverDiv.style.fontSize = "3vw";
      gameOverDiv.style.left = (W - gameOverDiv.offsetWidth) / 2 + "px";
      gameOverDiv.style.top = (H - gameOverDiv.offsetHeight) / 2.5 + "px";
      let viruses = overlay.getElementsByTagName("img");
      coords = [
        [
          gameOverDiv.offsetLeft - standartItemSize * 0.8,
          gameOverDiv.offsetTop,
        ],
        [
          gameOverDiv.offsetLeft + gameOverDiv.offsetWidth,
          gameOverDiv.offsetTop,
        ],
        [
          gameOverDiv.offsetLeft +
            gameOverDiv.offsetWidth -
            standartItemSize * 0.4,
          gameOverDiv.offsetTop +
            gameOverDiv.offsetHeight -
            standartItemSize * 0.4,
        ],
        [
          gameOverDiv.offsetLeft - standartItemSize * 0.4,
          gameOverDiv.offsetTop +
            gameOverDiv.offsetHeight -
            standartItemSize * 0.4,
        ],
      ];
      for (var i = 0; i < 4; i++) {
        var img = viruses[i];
        img.style.width = standartItemSize * 0.8 + "px";
        img.style.left = coords[i][0] + "px";
        img.style.top = coords[i][1] + "px";
      }
    }
    for (let elem of lifes.children) {
      elem.setAttribute("width", standartItemSize / 2);
    }
    svg.setAttribute("width", W / 15);
    svg.setAttribute("height", W / 15);
    player.size = standartItemSize;
    player.posX = 0;
    player.posY = H / 2;
    player.update();
  }
}