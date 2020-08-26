'use strict'


const products = [
	{ title: 'Rollerblade Twister Edge', price: 150, link: 'twister_edge' },
	{ title: 'K2 Alexis 80 PRO', price: 50, link: 'k2_alexis_80_pro' },
	{ title: 'FRX 80', price: 350, link: 'seba_frx_80' },
	{ title: 'Rollerblade Macroblade', price: 250, link: 'rollerblade_macroblade_84W' },
];


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
					<p>${this.price} руб.</p>
				</div>`;
	}
}


class ProductsList {
	constructor() {
		this.products = [];
	}

	_getProducts() {
		this.products = products;
	}

	render() {
		this._getProducts();		
		let html = '';

		this.products.forEach(({ title, price, link }) => {
			const productItem = new ProductItem(title, price, link);
			html += productItem.render();
		});

		document.querySelector('.catalog').innerHTML = html;
	}

	total() {
		let total = 0;
		this.products.forEach(({ price }) => {
			total += price;
		});

		console.log('Сумма всех цен: ', total);
	}
}


const list = new ProductsList();

list.render();
list.total();
