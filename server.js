const express = require('express');
// const bodyParser = require('body-parser');
const fs = require('fs');
// console.log(fs);

const app = express();
const jsonParser = express.json();
// app.use(bodyParser.json());

app.listen(3000, () => {
console.log('server is running on port 3000!');
});

app.use(express.static('.'));

app.get('/catalogData', (req, res) => {
	fs.readFile('catalog.json', 'utf8', (err, data) => {
		res.send(data);
	});
});

app.get('/shopCartData', (req, res) => {
	fs.readFile('cart.json', 'utf8', (err, data) => {
		res.send(data);
	});
});

app.post('/addToCart', jsonParser, (req, res) => {
	fs.readFile('cart.json', 'utf8', (err, data) => {
		const cart = JSON.parse(data);
		const item = req.body;

		// составляем список товаров из корзины
		let productsInCart = [];
		cart.forEach(({ title }) => productsInCart.push(title));
		// если товар уже есть в корзине увеличить количество
		if (productsInCart.includes(item.title)) {
			for (let i = 0; i < cart.length; i++) {
            	if (cart[i].title == item.title) {
            		cart[i].quantity += 1;
            		break;
            	} 
        	}
        // иначе добавить в корзину
        } else {
           	item.quantity = 1;
           	cart.push(item);
        }
		
		fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
			if (err) {
				res.send('{"result": 0}');
			} else {
				res.send('{"result": 1}');
			}
		});
	});
});

app.post('/deleteFromCart', jsonParser, (req, res) => {
	fs.readFile('cart.json', 'utf8', (err, data) => {
		const cart = JSON.parse(data);
		const item = req.body;
		console.log('запрос к серверу');
		// console.log(cart.length);
		for (let i = 0; i < cart.length; i++) {
            if (cart[i].title == item.title) {
            	cart.splice(i, 1);
            	break;
            }
        }

        fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
			if (err) {
				res.send('{"result": 0}');
			} else {
				res.send(JSON.stringify(cart));
			}
		});   
	});
});



app.post('/changeQuantity', jsonParser, (req, res) => {
	fs.readFile('cart.json', 'utf8', (err, data) => {
		const cart = JSON.parse(data);
		const item = req.body;

		for (let i = 0; i < cart.length; i++) {
            if (cart[i].title == item.title) {
            	cart[i].quantity = item.quantity;
            	break;
            }
        }
		
		fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
			if (err) {
				res.send('{"result": 0}');
			} else {
				res.send(JSON.stringify(cart));
			}
		});
	});
});
