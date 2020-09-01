'use strict';


function makeGETRequest(url) {
	const promise = new Promise((resolve, reject) => {
		let xhr;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else if (window .ActiveXObject) {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}

		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					resolve(xhr);
				} else {
					reject();
				}
			}
		}

		xhr.open( 'GET' , url, true );
		xhr.send();
	});
	
	promise
		.then((data) => {
			data = JSON.parse(data.responseText);
			console.log(data);
			// return data.responseText;
		})
		.catch(() => {
			console.log('Error: data not found');
		})
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

makeGETRequest(`${API_URL}/catalogData.json`);
makeGETRequest(`${API_URL}/`);
