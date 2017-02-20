/* Global Ressource definition */
var res = new Res("fr");

/* Global app definition */
var app = new App();

/*
** Initial setup
*/
window.onload = function(e) {
	try {
		res.loadRessources();
		app.build();

		let frbutton = document.getElementById("frbutton");
		if (frbutton != undefined)
			frbutton.onclick = function (e) {
				res.loadRessources("fr");
				app.update_strings();
			}

		let enbutton = document.getElementById("enbutton");
		if (enbutton != undefined)
			enbutton.onclick = function (e) {
				res.loadRessources("en");
				app.update_strings();
			}

	} catch (e) {
		console.log("Fatal error catch : ", e);
		alert("Ooops ... A fatal error just occured. See logs for more informations.");
	}
}

/*
** Catch resize to be reactive
*/
window.onresize = function (e) {
	app.resize();
}

/*
** Register KeyEvent
*/
document.onkeyup = function(e) {
	e = e || window.event;

	if (e.keyCode == '37' || e.keyCode == '39') {
		app.player.move("none");
	}
}

document.onkeydown = function(e) {
	/* Manage key inputs */
	e = e || window.event;

	if (e.keyCode == '32')
		app.player.move("jump");

	/* Key up */
	if (e.keyCode == '38')
		console.log("Key : Up");
	
	/* Key down */
	if (e.keyCode == '40')
		console.log("Key : Down");

	/* Key left */
	if (e.keyCode == '37') {
		app.player.move("left");
	}
	
	/* Key right */
	if (e.keyCode == '39') {
		app.player.move("right");
	}
}

/* Register app draw */
setInterval(function () {
		app.update();
		app.draw()
	}, 20);