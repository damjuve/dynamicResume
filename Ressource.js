/*
** Ressource class, wrapper to use ressources from html document
** Html have ton contain div with id "Ressources"
** Avaible ressources :
** - strings/language/value
** - images/value
*/
class Res {
	constructor(lan) {
		if (lan === undefined)
			this.lan = "default";
		else
			this.lan = lan; /* language to load */

		this.strings = [];
		this.images = [];
	}

	loadRessources(lan) {
		if (lan != undefined)
			this.lan = lan;

		function getChild(parent, childName) {
			for (let i = 0; i < parent.childNodes.length; i++) {
				if (parent.childNodes[i].localName == childName)
					return parent.childNodes[i];
			}
			return undefined;
		}

		function loadStrings(div) {

		}

		let div = document.getElementById("Ressources");
		if (div === undefined)
			throw "Cannot find 'Ressources' on html document";

		/*
		** Load STRINGS ressources
		*/
		let strings = getChild(div, "strings");
		if (strings === undefined)
			throw "Cannot find 'strings' section on html document";
		
		for (let i = 0; i < strings.childNodes.length; i++) {
			let label = strings.childNodes[i];
			let labelName = strings.childNodes[i].localName;
			if (labelName != undefined && labelName != "") {
				let lan = getChild(label, this.lan);
				if (lan === undefined) {
					console.log("[WARN]: Cannot find language '" + this.lan + "' for string '" + labelName + "'");
					lan = getChild(label, "default");
					if (lan === undefined)
						throw "Cannot find default for string '" + labelName + "' on html document";
				}
				this.strings[labelName] = lan.innerHTML;
			}
		}

		/*
		** Load IMAGES ressources
		*/
		let images = getChild(div, "images");
		if (images === undefined)
			throw "Cannot find 'images' section on html document";

		for (let i = 0; i < images.childNodes.length; i++) {
			let label = images.childNodes[i];
			let labelName = images.childNodes[i].localName;
			if (labelName != undefined && labelName != "") {
				this.images[labelName] = label.innerHTML;
			}
		}


	}
}