button_height = 78;
button_width = 88;
num_buttons = 4;
buttons = new Array();
counts = new Array();
var t;

function setWindowAttributes() {
	width = $( window ).width();
	height = $( window ).height();
}

function moveDiv(div) {
	var top = parseInt(div.style.top);
	if (top > 0) {
		div.style.top = top-10+"px";
	}
	else {
		clearInterval(t);
		console.log("cleared: ");
	}
	console.log("running : " + top);
}

function makeScreen() {
	var ele = $( "html" )[0];
	ele.style.borderTopColor = "#97FA02";
	ele.style.borderTopWidth = width/6 + "px";
	ele.style.borderTopStyle = "solid";
}

function initButtons() {
	var partition = width/(num_buttons+1);
	var button_div = $( "#buttons-div")[0];
	button_div.style.position = "absolute";
	button_div.style.top = "3000px";

	for (var i = 0; i < num_buttons; i++) {
		var button = $( "#button"+i )[0];
		//console.log(button);
		button.style.top = height/2 + (button_height/2);
		button.style.left = (partition*(i+1)) - (button_width/2);
	};
}

function startMoving() {
	var button_div = $( "#buttons-div")[0];
	button_div.style.top = "160px";
	console.log( button_div);
	t = setInterval(function() {moveDiv(button_div);}, 80);
}

window.onload = function() {
	console.log("on load");
	setWindowAttributes();
	makeScreen();
	initButtons();
	startMoving();
};
window.onresize = function() {
	console.log("on resize");
	setWindowAttributes();
	initButtons();
	makeScreen();
};