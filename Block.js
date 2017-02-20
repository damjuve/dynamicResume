/*
** Block class
** Represent a div block wich will be added to the app class
*/
class Block {
	constructor(posX, posY, resLabel) {
		this.posX = posX;
		this.posY = posY;
		this.resLabel = resLabel;
		this.content = null;
	}

	build() {
		/* Create divs elements && append to contentDiv */
		this.content = document.createElement('div');
		app.content.appendChild(this.content);

		this.sizeX = app.contentX;
		this.sizeY = 10;

		/* Setup style */
		this.content.style.position = "fixed";

		this.resize();
		this.update_strings();
	}

	resize() {
		this.sizeX = app.contentX;
	}

	update() {

	}

	update_strings() {
		this.content.innerHTML = res.strings[this.resLabel];
	}
}