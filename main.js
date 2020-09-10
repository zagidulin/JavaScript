'use strict';

window.addEventListener('load', () => {
    const catalogList = new ProductsList();
    const shopingCart = new BasketList();

    catalogList.getCatalog();

    let catalog = document.querySelector('.catalog');
    let basket = document.querySelector('.cart-button');

    let findValue = document.querySelector('.products_filter');
    // let findButton = document.getElementById('find');
    

    catalog.addEventListener('click', (event) => {
        console.log(event.target.innerText);
        if (event.target.innerText == 'buy') {
            let name = event.target.parentNode.childNodes[4].innerText;
            let price = +event.target.parentNode.childNodes[6].childNodes[0].innerText;
            let image = event.target.parentNode.childNodes[1].childNodes[1].childNodes[1].outerHTML;
            shopingCart.add(name, price, image);
        }
    });

    basket.addEventListener('click', (event) => {
        shopingCart.render();
        shopingCart.toggle();
    });

    Vue.component('search-field', {
            template: `
                <div class="search clearfix">
                    Поиск по каталогу:
                    <input
                        type="text" size="20" class="products_filter"
                        v-bind:value="productName"
                        v-on:input="filter($event)"
                    >
                </div>
            `,
            data() {
                return {
                    productName: '',
                }
            },
            methods: {
                    filter(event) {
                        this.productName = event.target.value;
                        catalogList.filterProducts(this.productName);
                    }
            }
        });

    new Vue({
        el: '.searchapp',
    });

    Vue.component('basket-list', {
            template: `
                <div class="basket_container hidden">
                    <div class="basket_summary">
                        <div class="close" v-on:click="closeBasket()">
                            <span style="vertical-align: middle">X</span>
                        </div>
                        <h2>Корзина</h2>
                        <p>
                            Всего товаров: <span class="total_quantity"></span><br>
                            Общая стоимость: <span class="total_price"></span> руб.
                        </p>
                    </div>
                    <div class="basket_list">
                        
                    </div>
                    <a href="#" class="make_order">Перейти к оформлению</a>
            </div>
            `,
            methods: {
                closeBasket() {
                    shopingCart.toggle();
                }
            }
        });

    new Vue({
            el: '.basketapp',
        });

});