var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

var keysUpdate = function () {
	if (32 in keysDown){
		if (!rightbullet.visible){
			rightbullet.visible = true;
			rightbullet.x = hero.x + 30;
			rightbullet.y = 550;
		}
		if (!leftbullet.visible){
			leftbullet.visible = true;
			leftbullet.x = hero.x + 5;
			leftbullet.y = 550;
		}
	}
	if (37 in keysDown) {
		if (hero.x > 0) {
			hero.x -= hero.speed;
		}
	}
	if (39 in keysDown) {
		if (hero.x < (600 - 38) ) {
			hero.x += hero.speed;
		}
	}
};