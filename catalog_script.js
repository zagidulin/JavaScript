'use strict';


const products = [
	{ title: 'Rollerblade Twister Edge', price: 150, link: 'twister_edge' },
	{ title: 'K2 Alexis 80 PRO', price: 50, link: 'k2_alexis_80_pro' },
	{ title: 'FRX 80', price: 350, link: 'seba_frx_80' },
	{ title: 'Rollerblade Macroblade', price: 250, link: 'rollerblade_macroblade_84W' },
];

const shopCart = [];

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

	_getProducts() {
		this.products = products;
		this.filteredProducts = this.products;
		console.log('this.filteredProducts', this.filteredProducts)
	}

	render(list) {
		if (list && list.length > 0) {
			console.log(list);
			this.filteredProducts = list;
		} else {
			console.log(list);
			this._getProducts();
		}
				
		let html = '';

		this.filteredProducts.forEach(({ title, price, link }) => {
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

	filterProducts(value) {
		const regexp = new RegExp(value, 'i');
		const filteredProducts = this.products.filter(product => regexp.test(product.title));
		this.render(filteredProducts);
	}
}
