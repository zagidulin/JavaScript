'use strict';

function makeGETRequest (url, callback) {
	let xhr;
	if (window .XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else if ( window .ActiveXObject) {
		xhr = new ActiveXObject( "Microsoft.XMLHTTP" );
	}
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 ) {
			callback(xhr.responseText);
		}
	}
	xhr.open( 'GET' , url, true );
	xhr.send();
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// const goods = [
//   { title: 'Shirt', price: 150 },
//   { title: 'Socks', price: 50 },
//   { title: 'Jacket', price: 350 },
//   { title: 'Shoes', price: 250 },
// ];

class GoodsItem {
	constructor(title, price) {
		this.title = title;
		this.price = price;
	}

	render() {
		return `
			<div class="goods-item">
				<h3>${this.title}</h3>
				<p>${this.price} руб.</p>
			</div>
			`;
	}
}

class GoodsList {
	constructor() {
		this.goods = [];
	}

	fetchGoods(cb) {
		makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
			

			this.goods = JSON.parse(goods);
			console.log(this.goods)
			cb();
		});
	}

	render() {

		console.log('hey');
	    let html = '';
		this.goods.forEach(({ product_name, price }) => {
			console.log(product_name);
			const goodItem = new GoodsItem( product_name, price);
			html += goodItem.render();
		});

		document.querySelector('.goods-list').innerHTML = html;
  }
}

const list = new GoodsList();
// console.log(list);
list.fetchGoods(() => list.render());
