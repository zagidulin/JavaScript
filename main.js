'use strict';

window.addEventListener('load', () => {
    const catalogList = new ProductsList();
    const shopingCart = new BasketList();

    Vue.component('cart', {
            template: `
                <div class="cart">
                    <a href="#" class = "cart-button" v-on:click="showCart()">Корзина</a>
                </div>
            `,
            methods: {
                showCart() {
                    shopingCart.getShopCartList();
                    shopingCart.toggle();
                }
            }
        });

    Vue.component('search-field', {
        props: ['searchName'],
        template: `
            <div class="search clearfix">
                Поиск по каталогу:
                <input
                    type="text" size="20" class="products_filter"
                    v-model="searchName"
                >
                <button @click="save" class="search-button">Искать</button>
            </div>
        `,
        methods: {
            save() {
                this.$emit("change", this.searchName);
            }
        }
    });

    Vue.component('catalog-list', {
        props: ['products'],
        template: `
            <div class="catalog">
                <products-item v-for="product in products" :product="product"></products-item>
            </div>
            `
    });

    Vue.component('products-item', {
        props: ['product'],
        template: `
            <div class="product_preview">
                <div class="preview_image">
                    <a href="#">
                        <img :src="product.image" alt="" width="120" height="120">
                    </a>
                </div><br>
                <a href="#">{{ product.title }}</a>
                <p><span class="price">{{ product.price }}</span> руб.</p>
                <button v-on:click="addToCart($event)" class="buy-button">в корзину</button>
            </div>
            `,
        methods: {
            addToCart(event) {
                let name = event.target.parentNode.childNodes[3].innerText;
                let price = +event.target.parentNode.childNodes[5].childNodes[0].innerText;
                let image = event.target.parentNode.childNodes[0].childNodes[0].childNodes[0].outerHTML;
                let item = {"title": name, "price": price, "picture": image};

                shopingCart.add(JSON.stringify(item));
            }
        }
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
        el: '.wraper',
        data: {
            products: [],
            filteredProducts: [],
            productName: '',
        },
        methods: {
            getProducts(list) {
                catalogList.makeGETRequest(`/catalogData`)
                    .then((data) => {
                        this.products = JSON.parse(data);
                        this.filteredProducts = JSON.parse(data);
                    })
                    .catch(() => {
                        console.log('Error: data not found');
                });
            },
            filter(name) {
                this.productName = name;
                console.log(this.productName);
                const regexp = new RegExp(this.productName, 'i');
                this.filteredProducts = this.products.filter(product => regexp.test(product.title));
            }
        },
        mounted() {
            this.getProducts();
        }
    });

});