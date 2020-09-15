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

	#makeGETRequest(url) {
		console.log('Направляю запрос корзины')
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
						console.log('корзина получена')
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

	#makePOSTRequest(url, data) {
		return new Promise((resolve, reject) => {
			let xhr;
			if (window.XMLHttpRequest) {
				xhr = new XMLHttpRequest();
			} else if (window.ActiveXObject) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						resolve(xhr.response);
					} else {
						reject();
					}
				}
			}
			xhr.open('POST', `/${url}`, true);
			xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
			xhr.send(data);
		});
	}

	getShopCartList() {
		this.#makeGETRequest(`/shopCartData`)
			.then((data) => {
				this.shopCartList = JSON.parse(data);
				this.render();
			})
			.catch(() => {
				console.log('Error: data not found');
			});
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
				// console.log('click');
				event.stopImmediatePropagation(); //для предотвращения повторных запросов при ререндеринге корзины

				if (event.target.className == 'product_delete') {
					let name = event.target.parentNode.parentNode.childNodes[3].innerText;
					const productToDelete = {"title": name};
					this.delete(JSON.stringify(productToDelete));
				} else if (event.target.className == 'change_quantity') {
					let newQuantity = +event.target.value;
					let name = event.target.parentNode.childNodes[3].innerText;
					const productToChange = {"title": name, "quantity": newQuantity};

					if (newQuantity < 1) {
						this.delete(JSON.stringify(productToChange));
					} else {
						this.changeQuantity(JSON.stringify(productToChange));
					}
				}
			});
		}
	}

	// добавление товара
	add(item) {
		this.#makePOSTRequest('addToCart', item)
			.then((data) => {
				console.log('товар добавлен');
			})
			.catch(() => {
				console.log('Error: data not found');
			});
	}

	// удаление товара
	delete(item) {
		this.#makePOSTRequest('deleteFromCart', item)
			.then((data) => {
				this.shopCartList = JSON.parse(data);
				if (this.shopCartList.length == 0) {
					this.shopCartList = [];
				}
				this.render();
			})
			.catch(() => {
				console.log('Error: data not found');
			});       
	}

	// изменение количества товара внутри корзины
	changeQuantity(item) {
		this.#makePOSTRequest('changeQuantity', item)
			.then((data) => {
				this.shopCartList = JSON.parse(data);
				this.render();
			})
			.catch(() => {
				console.log('Error: data not found');
			});
	}
}
