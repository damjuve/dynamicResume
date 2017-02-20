/*
** Player class.
** Instance should be in App
** Build, update and draw function inherits from App.
**
*/
class Player {
	constructor() {
		this.posX = 50;
		this.posY = 50;
		this.sizeX = 0;
		this.sizeY = 0;
		this.content = null;
		this.image = null;
		this.vectX = 0;
		this.vectY = 1;
		this.dir = "right";
		this.frame = 0;
		this.framecount = 0;
	}

	build() {
		/* Create divs elements && append to contentDiv */
		this.content = document.createElement('div');
		this.image = document.createElement('img');
		this.content.appendChild(this.image);
		app.content.appendChild(this.content);

		/* Setup image */
		this.image.src = res.images["playerright0"];

		/* Setup style */
		this.content.style.position = "fixed";

		this.resize();
	}

	resize() {
		/* Setup width && height */
		this.sizeX = 40 * app.contentX / 800; /* Relative for sizeX = 800 */ 
		this.sizeY = 80; /* fixed, whatever sizeX. */
		this.content.style.width = this.sizeX + "px";
		this.content.style.height = this.sizeY + "px";
		this.image.style.width = this.sizeX + "px";
		this.image.style.height = this.sizeY + "px";
	}

	update() {
		if (this.vectX != 0 && app.checkMoveX(this.posX + this.vectX, this.sizeX)) {
			if (this.framecount >= 4) {
				this.frame = this.frame == 8 ? 1 : this.frame + 1;
				this.framecount = 0;
			}
			else
				this.framecount++;
			this.posX += this.vectX;
		}
		else {
			this.framecount = 0;
			this.frame = 0;
			this.vectX = 0;
		}

		if (this.vectY < 0)
			this.vectY += 0.3;
		else if (this.vectY < 5)
			this.vectY += 0.5;

		if (this.vectY != 0 && app.checkMoveY(this.posY + this.vectY, this.sizeY)) {
			this.posY += this.vectY;
		}
		else
			this.vectY = 5;

		if (this.vectY >= 5)
			this.image.src = res.images["player" + this.dir.toString() + this.frame.toString()];
		else if (this.vectY > 0)
			this.image.src = res.images["player" + this.dir.toString() + "down"];
		else
			this.image.src = res.images["player" + this.dir.toString() + "up"];
	}

	move(dir) {
		if (dir == "jump" && this.vectY == 5) {
			this.vectY = -7;
		}

		if (dir == "none") {
			this.vectX = 0;
			this.frame = 0;
		}
		else if (dir == "left") {
			this.dir = "left";
			this.vectX = -5;
		}
		else if (dir == "right") {
			this.dir = "right";
			this.vectX = 5;
		}
	}
}