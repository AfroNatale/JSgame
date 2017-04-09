//funkcja odpowiedzialna za wykrywanie "uderzenia" pocisku w statek
var hittest = function (a, b) {
	if ((a.x < (b.x + b.w)) && ((a.x + a.w) > b.x) && (a.y < (b.y + b.h)) && ((a.y + a.h) > b.y)){
		playExplosion();
		return true;
	} else {
		return false;
	}
};

//funkcja sprawdzająca czy są aktywne statki wrogów na ekranie
var areVisibleEnemies = function () {
 	var enemiesStillAlive = false; 	
	for(var k = 0; k < enemies.length; k++){
 		if (enemies[k].visible){
  			enemiesStillAlive = true;
 			break;
		}
	}
 	return enemiesStillAlive;
};

//funkcja inicjująca statki wroga
var initEnemies = function () {
	var k = 0;
	for (var j = 0; j < 4; j++) {
		for (var i = 0; i < 5; i++) {
			enemies[k++] = {visible: true, image: enemyImage, x : i * 75, y : (j + 1) * 50, w : 75, h : 50};
		}
	}
};

//funkcja inicjująca pocisk wroga
var initEnemyBullet = function (k) {
	var check = false;
	while(!check){
		var enemy = Math.floor(Math.random() * enemies.length);
		if (enemies[enemy].visible){
			enemiesBullet[k] = {visible : true, image: enemybulletImage, x: enemies[enemy].x + 30, y : enemies[enemy].y, w : 16, h : 16};
			check = true;
		}
	}
};

//funkcja inicjująca pociski wroga
var initEnemiesBullet = function () {
	var k = 0;
	while (k < enemy_bullets){
		initEnemyBullet(k++);
	}
};

//funkcja "rysująca" wrogów na ekranie
var drawEnemies = function () {
	
	for (var i = 0; i < enemies.length; i++) {
		if (enemies[i].visible){
			context.drawImage(enemies[i].image, enemies[i].x, enemies[i].y, 38, 28);
		}
	}
	var dropdown = false;
	for (var j = 0; j < enemies.length; j++) {
		if(enemies[j].visible) {
			enemies[j].x += enemy_speed;
			if ((enemies[j].x > (600-38)) || (enemies[j].x < 0)) {
				dropdown = true;
			}
			if (hittest(enemies[j], rightbullet)){
				enemies[j].visible = false;
				rightbullet.visible = false;
				rightbullet.x = hero.x + 30;
				rightbullet.y = 450;
				score += 10;
			}
			if (hittest(enemies[j], leftbullet)){
				enemies[j].visible = false;
				leftbullet.visible = false;
				leftbullet.x = hero.x + 30;
				leftbullet.y = 450;
				score += 10;
			}
		}
	}
	if (dropdown) {
		enemy_speed = -enemy_speed;
		for (var k = 0; k < enemies.length; k++) {
			enemies[k].y += 10;
		}
	}
};

//funkcja "rysująca" pocisk
var drawBullet = function () {
	if (rightbullet.visible){
		context.drawImage(rightbullet.image, rightbullet.x, rightbullet.y);
		rightbullet.y -= rightbullet.speed;
		if (rightbullet.y < 0) {
			rightbullet.visible = false;
		}
	}
	if (leftbullet.visible){
		context.drawImage(leftbullet.image, leftbullet.x, leftbullet.y);
		leftbullet.y -= leftbullet.speed;
		if (leftbullet.y < 0) {
			leftbullet.visible = false;
		}
	}
};

//funkcja "rysująca" wszystkie pociski wroga
var drawEnemyBullets = function () {
	for (var i = 0; i < enemiesBullet.length; i++){
		context.drawImage(enemiesBullet[i].image, enemiesBullet[i].x, enemiesBullet[i].y);
		enemiesBullet[i].y += bullet_speed;
		if (enemiesBullet[i].y > 600) {
			initEnemyBullet(i);
		}
		if (hittest(enemiesBullet[i], hero)){
			initEnemyBullet(i);
			life--;
		}
		if (life === 0) {
			playDestroy();
			gameOver = 1;
		}
	}
};

//wypisywanie aktualnego wyniku oraz zycia
var drawScore = function () {
	context.fillStyle = "rgb(250, 250, 250)";
	context.font = "24px Helvetica";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillText("Wynik: " + score, 5, 5);
	context.fillText("Życia: " + + life, 505, 5);
};


//glowna funkcja renderujaca
var render = function () {
	moveBackground();
	if (gameOver === 0) {
		context.drawImage(hero.image, hero.x, hero.y, 40, 26);
		drawBullet();
		drawScore();
		if (areVisibleEnemies()) {
			drawEnemies();
			drawEnemyBullets();
		} else {
			context.fillStyle = "rgb(250,250,250)";
			context.font = "38px Helvetica";
			context.fillText("Wygrałeś!", 180, 200);
			context.fillText("Twój wynik: "+ score, 170, 250);
			
			context.fillRect((600 / 2) - 100, (600 / 2) + 10,160,40);
			context.fillStyle = '#000';
			context.font = "22px Helvetica";
			context.fillText('Od nowa?', 225, (600 / 2) + 15);
			canvas.addEventListener('click', continueButton, false);
		}
	} else {
		context.fillStyle = "rgb(250,250,250)";
		context.font = "38px Helvetica";
		context.fillText("Koniec gry!", 200, 200);
		context.fillText("Twój wynik: "+ score, 170, 250);
		
		context.fillRect((600 / 2) - 100, (600 / 2) + 10,160,40);
		context.fillStyle = '#000';
		context.font = "22px Helvetica";
		context.fillText('Od nowa?', 225, (600 / 2) + 15);
		canvas.addEventListener('click', continueButton, false);
	}
};

//rysuje oraz porusza tłem gry
function moveBackground() {
  context.drawImage(bgImage,starX,starY);
  context.drawImage(bgImage,starX,starY2);
  if (starY > 600) {
    starY = -599;
  }
  if (starY2 > 600) {
    starY2 = -599;
  }
  starY += 0.75;
  starY2 += 0.75;
};

//funkcja czyszcząca
function clearCanvas() {
 context.clearRect(0,0,600,600);
};

//przechowuje pozycję kursora myszy
function cursorPosition(x,y) {
  this.x = x;
  this.y = y;
};

//znajduje punkt klikniecia myszy
function getCursorPos(e) {
  var x;
  var y;
  if (e.pageX || e.pageY) {
    x = e.pageX;
    y = e.pageY;
  } else {
    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;
  var cursorPos = new cursorPosition(x, y);
  return cursorPos;
};

//rozpoczecie gry od nowa, pprzez odswiezenie zawartosci strony
function reset() {
	location.reload();
};

//po kliknieciu na przycisk, wywolujemy reset gry
function continueButton(e) {
 var cursorPos = getCursorPos(e);
 if (cursorPos.x > (600 / 2) - 60 && cursorPos.x < (600 / 2) + 60 && cursorPos.y > (600 / 2) + 10 && cursorPos.y < (600 / 2) + 50) {
    reset();
    canvas.removeEventListener('click', continueButton, false);
  }
};

//dzwiek muzyki w tle
function playMusic(){
	var audio = new Audio('Assets/Sounds/akira.mp3');
	audio.loop = true;
	audio.volume = .02;
	audio.play();
};

//dzwiek eksplozji, po trafieniu
function playExplosion(){
	var explosion = new Audio("Assets/Sounds/explosion.wav");
	explosion.volume = 0.8;
	explosion.play();
};

//dzwiek eksplozji, po zniszczeniu statku gracza
function playDestroy(){
	var explosion = new Audio("Assets/Sounds/explosion2.wav");
	explosion.volume = 0.8;
	explosion.play();
};

//game loop
var main = function () {
	clearCanvas();
	keysUpdate();
	render();
	requestAnimationFrame(main);
};