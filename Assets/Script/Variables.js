var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;
document.body.appendChild(canvas);
var bgImage = new Image();
bgImage.src = 'Assets/Images/background_starfield.jpg';
var heroImage = new Image();
heroImage.src = 'Assets/Images/player_ship.png';
var hero = {image : heroImage, x : 260, y : 565, w : 75, h: 50, speed : 3};
var enemyImage = new Image();
enemyImage.src = 'Assets/Images/enemy_ship.png';
var enemies = [];

//prawy pocisk naszego statku
var rightbulletImage = new Image();
rightbulletImage.src = 'Assets/Images/player_bullet.png';
var rightbullet = {visible : false, image : rightbulletImage, x : 0, y : 0, w: 16, h: 16, speed : 3}

//lewy pocisk naszego statku
var leftbulletImage = new Image();
leftbulletImage.src = 'Assets/Images/player_bullet.png';
var leftbullet = {visible : false, image : leftbulletImage, x : 0, y : 0, w: 16, h: 16, speed : 3}

//pocisk wroga
var enemybulletImage = new Image();
enemybulletImage.src = 'Assets/Images/enemy_bullet.png';
var enemybullet = {visible : false, image : enemybulletImage, x : 0, y : 0, w: 16, h: 16, speed : 3}
var enemiesBullet = [];
var bgScroll = new Image();
bgScroll.src = 'Assets/Images/background_starfield.jpg';

//zmienne potrzebne do poruszającego się tła
var starX = 0;
var starY = 0;
var starY2 = -600;
var gameStarted = false;