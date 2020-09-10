'use strict';


// класс товара в корзине
class BasketItem {
	constructor(title, price, quantity, picture) {
		this.title = title;
		this.price = price;
		this.picture = picture;
		this.quantity = quantity;
	}

	render() {
		return `<div class="basket_record">
					${this.picture}
					<span class="product_name">${this.title}</span>
					<span class="product_price">${this.price}&nbspруб</span>
					<input type="number" name="quantity" min="0" value="${this.quantity}" class="change_quantity">
					<span class="product_cost">${this.quantity*this.price}&nbspруб</span>
					<div class="basket_delete">
					    <a href="#" class="product_delete">удалить</a>
					</div>
		        </div>`;
	}
}

// класс Корзины товаров
class BasketList {
	constructor() {
		this.shopCartList = [];
	}

	#getShopCartList() {
		this.shopCartList = shopCart;
	}

	toggle() {
		document.querySelector('.basket_container').classList.toggle('hidden');
	}

	showSummary() {
		let totalPrice = 0;
		let totalQuantity = 0;

		this.shopCartList.forEach(({ price, quantity }) => {
			totalPrice += price*quantity;
			totalQuantity += quantity;
		});
		
		document.querySelector('.total_quantity').innerHTML = `<i>${totalQuantity}</i>`;
		document.querySelector('.total_price').innerHTML = `<i>${totalPrice}</i>`;
	}

	render() {
		this.#getShopCartList(this.shopCartList);
		let html = '';
		
		this.shopCartList.forEach(({ title, price, quantity, picture }) => {
			const basketItem = new BasketItem(title, price, quantity, picture);
			html += basketItem.render();
		});

		document.querySelector('.basket_list').innerHTML = html;

		this.showSummary();

		// для инициализации возможности удаления изменения количесвта товара при "раскрытии" корзины
		if (this.shopCartList.length > 0) {
			let changeShopCart = document.querySelector('.basket_container');
			changeShopCart.addEventListener('click', (event) => {
				
				if (event.target.className == 'product_delete') {
					let name = event.target.parentNode.parentNode.childNodes[3].innerText;
					this.delete(name, this.shopCartList);
				} else if (event.target.className == 'change_quantity') {
					let newQuantity = +event.target.value;
					let name = event.target.parentNode.childNodes[3].innerText;
					this.change(name, newQuantity, this.shopCartList);
				}
			});
		}
	}

	// добавление товара
	add(name, price, image) {
		this.#getShopCartList();
		let productsToBuy = [];
		this.shopCartList.forEach(({ title }) => productsToBuy.push(title));
		
		if (productsToBuy.includes(name)) {
			for (let i = 0; i < this.shopCartList.length; i++) {
            	if (this.shopCartList[i].title == name) {
            		this.shopCartList[i].quantity += 1;
            		break;
            	}
        	}
		} else {
			let productToBuy = { title: name, price: price,	quantity: 1, picture: image };
			this.shopCartList.push(productToBuy);
		}
	}

	// удаление товара
	delete(name, shopCartList) {
		for (let i = 0; i < shopCartList.length; i++) {
            if (shopCartList[i].title == name) {
            	this.shopCartList.splice(i, 1);
            	// вывести корзину без удаленного товара
            	this.render();
            	break;
            }
        }        
	}

	// изменение количества товара внутри корзины
	change(name, newQuantity, shopCartList) {
			if (newQuantity == 0) {
				this.delete(name, shopCartList);
			}

		for (let i = 0; i < this.shopCartList.length; i++) {
            if (shopCartList[i].title == name) {
            	this.shopCartList[i].quantity = newQuantity;
            	this.render();
            	break;
            }
        }
	}
}
