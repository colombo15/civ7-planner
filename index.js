var selected = "bg-blue";

init();

function init() {
	let hexes = document.getElementsByClassName('hex');
	for (let item of hexes) {
		item.addEventListener("click", () => hexClick(item));
		item.oncontextmenu = function(event) {
			event.preventDefault();
		};
	}

	let options = document.getElementsByClassName("option");
	for (let item of options) {
		if (item.tagName == "INPUT") {
			let value = item.attributes["value"].value;
			item.addEventListener("click", () => setSelected(value))
		}
	}
}

function hexClick(hex) {
	if (selected.startsWith("bg")) {
		changeTile(hex);
	}
	else if (selected.startsWith("ft")) {
		changeFeature(hex);
	}
	else {
		addDistrict(hex);
	}
}

function addDistrict(hex) {
	if (hex.id !== "hex-center" && hex.childElementCount < 2) {
		let node = document.createElement("img");
		node.classList.add("district-img");
		node.src = "./" + selected.substring(5) + ".png"
		
		node.onmouseup = function(event) {
			if (event.button == 2) {
				node.remove();
			}
		};
		
		hex.appendChild(node)
	}
}

function changeTile(hex) {
	let skip = false;
	if (hex.id !== "hex-center") {
		hex.classList.forEach(element => {
			if (element == selected) {
				hex.classList.remove(element);
				skip = true;
			}
			else if (element.startsWith("bg-")) {
				hex.classList.remove(element);
			}
		});
		if (!skip){
			hex.classList.add(selected);
		}
	}
}

function changeFeature(hex) {
	let skip = false;
	if (hex.id !== "hex-center") {
		hex.classList.forEach(element => {
			if (element == selected) {
				hex.classList.remove(element);
				skip = true;
			}
			else if (element.startsWith("ft-")) {
				hex.classList.remove(element);
			}
		});
		if (!skip){
			hex.classList.add(selected);
		}
	}
}

function setSelected(value) {
	selected = value;
}
