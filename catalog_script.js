'use strict';

class ProductsList {
	constructor() {
		this.products = [];
		this.filteredProducts = [];
	}

	makeGETRequest(url) {
		return new Promise((resolve, reject) => {
			let xhr;
			if (window.XMLHttpRequest) {
				xhr = new XMLHttpRequest();
			} else if (window .ActiveXObject) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}

			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						console.log('католог получен')
						resolve(xhr.response);
					} else {
						reject();
					}
				}
			}

			xhr.open( 'GET' , url, true );
			xhr.send();
		});
	}
}
