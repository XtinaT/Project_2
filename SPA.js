
  "use strict";

  // в закладке УРЛа будем хранить разделённые подчёркиваниями слова
  // #Main - главная
  // #Game - игра

  // отслеживаем изменение закладки в УРЛе
  // оно происходит при любом виде навигации
  // в т.ч. при нажатии кнопок браузера ВПЕРЁД/НАЗАД
  window.onhashchange=switchToStateFromURLHash;

  // текущее состояние приложения
  // это Model из MVC
  var SPAState={};
  function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
  }
var body = document.getElementsByTagName("body");
var wrapper = document.getElementById('wrapper');
var W = window.innerWidth;
var H = window.innerHeight;
var isGameOver = true;
///////////all media

var background = new Image();
background.src = "img/back5.webp";

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
var images = ['/img/deadvirus1.png','/img/deadvirus2.png', '/img/deadvirus3.png', '/img/deadvirus4.png'];



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


var hoverSound = new Audio;
hoverSound.src = "sounds/click.mp3";

var clickSound = new Audio;
clickSound.src = "sounds/click1.mp3";

var mainMusic = new Audio; 
mainMusic.src = "sounds/main.ogg";
////////////////////////////////////////////////////////
function playSound(sound) {
  sound.currentTime=0; 
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

window.addEventListener("resize", resize, false);
function resize(e) {
  e = e || window.event;
  e.preventDefault;
  H = window.innerHeight;
  W = window.innerWidth;
  if (SPAState.pagename=='Main') {
    setPosition();
  document.getElementById('wrapper').style.width = '100%';
  } else if (SPAState.pagename=='Game') {
    standartSize = W/17;
  W>H?standartItemSize=W/17:standartItemSize=H/17;
  canvas.width = W;
  canvas.height = H;
  fireButton.style.left = (W-fireButton.offsetWidth)/2+'px';
  fireButton.style.top = 0.8*H+'px';
  player.update();
  }
  
}


  // вызывается при изменении закладки УРЛа
  // а также при первом открытии страницы
  // читает новое состояние приложения из закладки УРЛа
  // и обновляет ВСЮ вариабельную часть веб-страницы
  // соответственно этому состоянию
  // это упрощённая реализация РОУТИНГА - автоматического выполнения нужных
  // частей кода в зависимости от формы URLа
  // "роутинг" и есть "контроллер" из MVC - управление приложением через URL
  function switchToStateFromURLHash() {
    var URLHash=window.location.hash;

    // убираем из закладки УРЛа решётку
    // (по-хорошему надо ещё убирать восклицательный знак, если есть)
    var stateStr=URLHash.substr(1);

    if ( stateStr!="" ) { // если закладка непустая, читаем из неё состояние и отображаем
      var parts=stateStr.split("_")
      SPAState={ pagename: parts[0] }; // первая часть закладки - номер страницы
    } else
      SPAState={pagename:'Main'}; // иначе показываем главную страницу

    console.log('Новое состояние приложения:');
    console.log(SPAState);

    // обновляем вариабельную часть страницы под текущее состояние
    // это реализация View из MVC - отображение состояния модели в HTML-код
    var pageHTML="";
    var preloaderHTML="";
    
    switch ( SPAState.pagename ) {
      case 'Main':
        if (!isGameOver) {
              gameOver();
        }
        pageHTML+="<p class='logo'>BEAT IT!</p><div class='menu'>";
        pageHTML+="<input type='button' class='menuElem' value='New Game' onmouseover='playSound(hoverSound)'  onclick='switchToGamePage()'/>";
        pageHTML+="<input type='button' class='menuElem' value='Rules' onclick='anim2()' onmouseover='playSound(hoverSound)'/>";
        pageHTML+="<input type='button' class='menuElem' value='Results' onmouseover='playSound(hoverSound)' onclick='playSound(clickSound)'/></div>";
        pageHTML+="<img src='img/doctors.png' alt='doctors' id = 'doc'><img src='img/viruspurple.png' alt='coronavirus' id = 'virus2'>";
        pageHTML+="<img src='img/viruslightblue.png' alt='coronavirus' id = 'virus1'>";
        pageHTML+="<img src='img/happy2.png' alt='whitebloodcell' id = 'cell1'>";
        pageHTML+="<img src='img/happy.png' alt='whitebloodcell' id = 'cell2'>";
        pageHTML+="<div id='rules' style = 'visibility:hidden'>";
        pageHTML+="<p>Пора уже навалять этому коронавирусу! И эта задача ляжет на плечи одного маленького, но очень шустрого лимфоцита, которому ты будешь помогать! Отстреливай зловредные вирусы, но будь осторожен, они очень опасны при столкновении! Также, будь внимателен и не повреди окружающие тебя клетки крови! И, конечно же, не забывай подкрепляться!</p>";
      pageHTML+="<button class='button' onclick='anim1()'>OK</button></div><div class='cover'><p>Please, rotate your device!</p>";
        pageHTML+="<input type='button' class='button' value='Do not rotate' onclick='cancelRotation()''/></div>";
        preloaderHTML+='<svg class="preloader__image" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">';
        preloaderHTML+='<path fill="currentColor"';
        preloaderHTML+='d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path></svg>';
        //include("scriptMainPage.js");
        break;
      case 'Game':
        //pageHTML+="<audio autoplay loop id='mainMusic'><source src='sounds/main.ogg' type='audio/ogg; codecs=vorbis'>";
        pageHTML+="<source src='sounds/main.mp3' type='audio/mpeg' id='mainMusic'></audio>";
        pageHTML+="<div id='header'><svg id='pause' xmlns='http://www.w3.org/2000/svg'></svg>";
        pageHTML+="<div id='score'></div><div id='life'></div><img id='react1'> <img id='react2'></div>";
        pageHTML+="<div id='overlay'><div id='game-over'><h1>GAME OVER</h1><button id='play-again'>Play Again</button></div></div>";
        pageHTML+="<input type='button' id='fireButton' value='Fire' onclick='touchFire()'/>";
        preloaderHTML="";
   
        //include("script.js");
        break;
    }
    document.getElementById('wrapper').innerHTML=pageHTML;
    document.getElementsByClassName('preloader')[0].innerHTML=preloaderHTML;
    if (SPAState.pagename=='Game') {
      drawGame();
      init();
    }
  }

  // устанавливает в закладке УРЛа новое состояние приложения
  // и затем устанавливает+отображает это состояние
  function switchToState(newState) {
    // устанавливаем закладку УРЛа
    // нужно для правильной работы кнопок навигации браузера
    // (т.к. записывается новый элемент истории просмотренных страниц)
    // и для возможности передачи УРЛа другим лицам
    var stateStr=newState.pagename;
    location.hash=stateStr;
    // АВТОМАТИЧЕСКИ вызовется switchToStateFromURLHash()
    // т.к. закладка УРЛа изменилась (ЕСЛИ она действительно изменилась)
  }




  function switchToGamePage() {
    switchToState( { pagename:'Game' } );
  }

  // переключаемся в состояние, которое сейчас прописано в закладке УРЛ
  switchToStateFromURLHash();

