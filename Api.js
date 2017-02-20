/*
** Api class.
** Contains all element of the application
** Html must contain empty div with id "contents".
** Html can contain div with id "headBar" or "footBar"
** 
** Build -> create all html elements. Must be call before all other methods.
** Update -> dont create elements but update size and contents of them.
** Draw -> update position of elements.
*/
class App {
	constructor() {
		/* Inner var */
		this.winX = 0;
		this.winY = 0;
		this.offsetTop = 0;
		this.offsetLeft = 0;
		this.contentX = 0;
		this.contentY = 0;

		this.renderY = 0;

		this.content = null;	
		/* App Content */
		this.player = new Player();
		this.blocks = [];
	}

	update_window_size() {
		this.winX = window.innerWidth;
		this.winY = window.innerHeight;

		this.contentX = this.winX;
		this.contentY = this.winY;

		let headBar = document.getElementById("headBar");
		if (headBar != undefined) {
			this.offsetTop = headBar.offsetHeight;
			this.contentY -= headBar.offsetHeight;
		}

		let footBar = document.getElementById("footBar");
		if (footBar != undefined)
			this.contentY -= footBar.offsetHeight;

		this.content.style.width = this.contentX + "px";
		this.content.style.height = this.contentY + "px";
	}

	build() {
		this.content = document.getElementById("content");
		if (content === undefined)
			throw "Cannot find 'content' div in html document";

		this.update_window_size();
		this.update_strings();

		/* TEST TMP */
		this.blocks.push(new Block(25, 250, "label1"));

		for (let i = 0; i < this.blocks.length; i++)
			this.blocks[i].build();

		this.player.build();
	}

	update_strings() {

		for (let i = 0; i < this.blocks.length; i++)
			this.blocks[i].update_strings();

		let headBarTitle = document.getElementById("headBarTitle");
		if (headBarTitle != undefined)
			headBarTitle.innerHTML = res.strings["headbartitle"];

		let footBarTitle = document.getElementById("footBarTitle");
		if (footBarTitle != undefined)
			footBarTitle.innerHTML = res.strings["footbartitle"];

		document.title = res.strings["headtitle"];
	}

	resize() {
		this.update_window_size();

		this.player.resize();

		for (let i = 0; i < this.blocks.length; i++)
			this.blocks[i].resize();
	}

	checkMoveX(posX, sizeX) {
		if (posX < 0 || posX + sizeX > this.contentX - this.offsetLeft)
			return false;

/*		for (let i = 0; i < this.blocks.length; i++) {
			if ((posX > this.blocks[i].posX && posX < this.blocks[i].posX + this.blocks[i].sizeX) ||
				(posX + sizeX > this.blocks[i].posX && posX + sizeX < this.blocks[i].posX + this.blocks[i].sizeX))
				return false;
		}
*/
		return true;
	}

	checkMoveY(posY, sizeY) {
		if (posY < this.renderY || posY + sizeY > 600)
			return false;

		for (let i = 0; i < this.blocks.length; i++) {
			if ((posY > this.blocks[i].posY && posY < this.blocks[i].posY + this.blocks[i].sizeY) ||
				(posY + sizeY > this.blocks[i].posY && posY + sizeY < this.blocks[i].posY + this.blocks[i].sizeY))
				return false;
		}
		return true;
	}

	update() {
		this.player.update();

		for (let i = 0; i < this.blocks.length; i++)
			this.blocks[i].update();
	}

	/* Setup obj.content position on screen */
	/* Obj must have posX, posY, sizeX, sizeY variable */
	setup_content_coord(obj) {
		if (obj.posY + obj.sizeY >= this.renderY && obj.posY < this.renderY + this.contentY) {
			obj.content.style.display = "block";
			obj.content.style.top = (obj.posY - this.renderY + this.offsetTop) + "px";
			obj.content.style.left = (obj.posX + this.offsetLeft) + "px";
		}
		else
			obj.content.style.display = "none";
	}


	draw() {
		this.setup_content_coord(this.player);

		for (let i = 0; i < this.blocks.length; i++)
			this.setup_content_coord(this.blocks[i]);
	}
}
