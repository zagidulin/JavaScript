'use strict'


const goods = [
	{title: 'Rollerblade Twister Edge', price: 150, link: 'twister_edge'},
	{title: 'K2 Alexis 80 PRO', price: 50, link: 'k2_alexis_80_pro'},
	{title: 'FRX 80', price: 350, link: 'seba_frx_80'},
	{title: 'Rollerblade Macroblade', price: 250, link: 'rollerblade_macroblade_84W'},
];


const emptyList = [{title: 'no products found', price: '-'}];


const renderGoodsItem = item => 
	`<div class="product_preview">
		<div class="preview_image">
			<a href="catalog/${item.link}.html">
				<img src="image/${item.link}.jpg" alt="" width="120" height="120">
			</a>
		</div><br>
		<a href="catalog/${item.link}.html">${item.title}</a>
		<p>${item.price} руб.</p>
	</div>`;


const renderGoodsList = (list=emptyList) =>
	document.querySelector('.catalog').innerHTML = list.map(item => renderGoodsItem(item)).join('');


renderGoodsList(goods);
