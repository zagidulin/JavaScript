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
		/* В разборе д/з предложили убрать блок if ниже и всегда рендерить 
		this.filteredProducts. Но в этом блоке, если не было фильтрации и методу render()
		не передан отфильтрованный список, выполняется получение списка товаров (this._getProducts()).
		И render() без аргумента вызывается при загрузке/перезагрузке страницы. Таким образом, если
		убрать блок условия, то вообще не будет получен список товаров и фильтровать тоже будет нечего.
		Можно, кончено, в main.js вызывать _getProducts() отдельно при загрузке странице, но предполагается,
		что это приватный метод (передалаю в #).
		При фильтрации в render() можно было бы передавать true, например, тогда при отсутствии соответствия
		поиску выводилась бы пустая страница, но в момент выполнения задания решил, что если нет удовлетворяющих
		условиям поиска товаров, то будет выводиться весь каталог. 
		*/
		if (list && list.length > 0) {
			console.log(list);
		} else {
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
		this.filteredProducts = this.products.filter(product => regexp.test(product.title));
		this.render(this.filteredProducts);
	}
}
