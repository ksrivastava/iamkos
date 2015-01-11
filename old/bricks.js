var ctx;
var x, y, dx, dy, radius;
var width, height, loop;
var paddlex, paddle_width, paddle_height;
var opt_paddlex;
var rightDown, leftDown;
var canvasMinX, canvasMaxX;
var paused;
var _background = "black";

function init() {
	canvas = $("#canvas")[0];
	ctx = canvas.getContext("2d");
	setDimensions();
	paused = false;
	init_paddle();
	init_ball();
	init_mouse();
	if (loop != undefined) clearInterval(loop);
	loop = setInterval(paint, 10);
};

function restart() {
	clearInterval(loop);
	init_paddle_size();
	init_ball();
	setTimeout(function(){
		loop = setInterval(paint, 10);
	}, 500);
}

function pause_continue() {
	paused = !paused;
}

function init_paddle() {
	paddle_width = 100;
	paddle_height = 20;
	paddlex = width/2 - paddle_width/2;
	opt_paddlex = paddlex;
}

function init_paddle_size() {
	paddle_width = 100;
}

function init_ball() {
	x = 150;
	y = 150;
	dx = 2;
	dy = 4;
	radius = 10;
}

function init_mouse() {
  canvasMinX = $("#canvas").offset().left;
  canvasMaxX = canvasMinX + width;
  console.log(canvasMinX + ", "+ canvasMaxX);
}

function setDimensions() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	width = canvas.width;
	height = canvas.height;
}

function clear() {
	ctx.clearRect(0, 0, width, height);
};

function circle(startx, starty, radius) {
	ctx.beginPath();
	ctx.arc(startx, starty, radius, 0, Math.PI*2);
	ctx.closePath();
	ctx.fillStyle = "white";
	ctx.fill();
}

function rect(startx, starty, width, height) {
	ctx.beginPath();
	ctx.rect(startx, starty, width,height);
	ctx.closePath();
	ctx.fillStyle = "white";
	ctx.fill();
}

function paint() {
	clear();
	// Background
	ctx.fillStyle = _background;
	ctx.fillRect(0, 0, width, height);

	if (x + paddle_width/2 >= width) opt_paddlex = width - paddle_width;
	else if (x - paddle_width/2 <= 0) opt_paddlex = 0;
	else opt_paddlex = x - paddle_width/2;
	// Objects
	circle(x, y, radius);
	rect(paddlex, height-paddle_height, paddle_width, paddle_height);
	rect(opt_paddlex, 0, paddle_width, paddle_height);

	// Update position with keyboard
	if (paused) return;

	if (rightDown && paddlex + paddle_width + 5 <= width) paddlex += 5;
	else if (leftDown && paddlex - 5 >= 0) paddlex -= 5;

	if (x + dx > width || x + dx < 0) dx = -dx;
	if (y + dy < 0) dy = -dy;
	else if (y + dy > height - paddle_height && 
		(x + radius >= paddlex && x - radius <= paddlex + paddle_width)) dy = -dy;
	else if (y + dy > height) restart();
	else if (y + dy < paddle_height && 
		(x + radius >= opt_paddlex && x - radius <= opt_paddlex + paddle_width)) dy = -dy;
	else if (y + dy < 0) restart();

	x += dx;
	y += dy;
}


$( document ).keydown( function(evt) {
	if (evt.keyCode == 32) pause_continue();
	else if (evt.keyCode == 39) rightDown = true;
  	else if (evt.keyCode == 37) leftDown = true;
});

$( document ).keyup( function(evt) {
	if (evt.keyCode == 39) rightDown = false;
  	else if (evt.keyCode == 37) leftDown = false;
});

$( document ).mousemove(function(evt) {
	if (!paused && evt.pageX >= canvasMinX + paddle_width/2
		&& evt.pageX  + paddle_width/2 <= canvasMaxX) {
		// Update position with mouse
    	paddlex = evt.pageX - canvasMinX - paddle_width/2;
  }
});

document.addEventListener('touchmove', function(e) {
    e.preventDefault();
    var touch = e.touches[0];
    paddlex = touch.pageX - canvasMinX - paddle_width/2;
}, false);

$( window ).resize( function() {
	if (_background == "blue") _background = "black";
	else _background = "blue";
});

$( document ).ready( function() {
	init();
});