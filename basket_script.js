'use strict'


const buyings = [
	{ title: 'Rollerblade Twister Edge', price: 150, quantity: 2, link: 'twister_edge' },
	{ title: 'K2 Alexis 80 PRO', price: 50, quantity: 1, link: 'k2_alexis_80_pro' },
];


// класс Элемента корзины
class BasketItem {
	constructor(title, price, quantity, link) {
		this.title = title;
		this.price = price;
		this.link = link;
		this.quantity = quantity;
	}

	render() {
		return `<div class="basket_record">
					<img src="image/${this.link}.jpg" alt="product" height="130px" width="120px">
					<span class="product_name">${this.title}</span>
					<span class="product_price">${this.price}&nbspруб</span>
					<input type="number" name="quantity" min="0" value="${this.quantity}">
					<span class="product_cost">${this.quantity*this.price}&nbspруб</span>
					<div class="basket_delete">
					    <a href="#">
					        удалить
					    </a>
					</div>
		        </div>`;
	}
}


// класс Корзины товаров
class BasketList {
	constructor() {
		this.buyings = [];
	}

	_getBuyings() {
		this.buyings = buyings;
	}

	showSummary() {
		let totalPrice = 0;
		let totalQuantity = 0;

		this.buyings.forEach(({ price, quantity }) => {
			totalPrice += price*quantity;
			totalQuantity += quantity;
		});
		
		document.querySelector('.total_quantity').innerHTML = `<i>${totalQuantity}</i>`;
		document.querySelector('.total_price').innerHTML = `<i>${totalPrice}</i>`;
	}

	render() {
		this._getBuyings();		
		let html = '';
		
		this.buyings.forEach(({ title, price, quantity, link }) => {
			const basketItem = new BasketItem(title, price, quantity, link);
			html += basketItem.render();
		});

		document.querySelector('.basket_list').innerHTML = html;

		this.showSummary();
	}

	// добавление товара
	add() {

	}

	// удаление товара
	delete() {

	}

	// изменение количества товара внутри корзины
	change() {

	}
}

const list = new BasketList();

list.render();
