'use strict';

window.addEventListener('load', () => {
    const catalogList = new ProductsList();
    const shopingCart = new BasketList();

    catalogList.render();

    let catalog = document.querySelector('.catalog');
    let basket = document.querySelector('.cart-button');
    let closeBasket = document.querySelector('.close');
    

    catalog.addEventListener('click', (event) => {
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

    closeBasket.addEventListener('click', (event) => {
        shopingCart.toggle();
    });

});