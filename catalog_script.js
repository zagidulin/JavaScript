'use strict';


const shopCart = [];

const API_URL = 'https://raw.githubusercontent.com/zagidulin/JavaScript/master/responses';

class ProductItem {
	constructor(title, price, link) {
		this.title = title;
		this.price = price;
		this.link = link;
	}

	render() {
		return `<div class="product_preview">
					<div class="preview_image">
						<a href="catalog/${this.link}.html">
							<img src="image/${this.link}.jpg" alt="" width="120" height="120">
						</a>
					</div><br>
					<a href="catalog/${this.link}.html">${this.title}</a>
					<p><span class="price">${this.price}</span> руб.</p>
					<button>buy</button>
				</div>`;
	}
}


class ProductsList {
	constructor() {
		this.products = [];
		this.filteredProducts = [];
	}

	#makeGETRequest(url) {
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

	render() {
		let html = '';
		this.filteredProducts.forEach(({ title, price, link }) => {
			const productItem = new ProductItem(title, price, link);
			html += productItem.render();
		});

		document.querySelector('.catalog').innerHTML = html;
	}

	getCatalog(list) {
		if (list && list.length > 0) {
			this.render();
		} else {
			this.#makeGETRequest(`/catalogData`)
				.then((data) => {
					this.products = JSON.parse(data);
					this.filteredProducts = JSON.parse(data);
					this.render();
				})
				.catch(() => {
					console.log('Error: data not found');
				});
		}
	}

	total() {
		let total = 0;
		this.products.forEach(({ price }) => {
			total += price;
		});

		console.log('Сумма всех цен: ', total);
	}

	filterProducts(value) {
		const regexp = new RegExp(value, 'i');
		this.filteredProducts = this.products.filter(product => regexp.test(product.title));
		this.getCatalog(this.filteredProducts);
	}
}
