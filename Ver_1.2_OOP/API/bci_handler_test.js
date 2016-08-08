var request = require('request');

module.exports = {fetchTx: fetchTx}; 

function fetchTx(callback, error) {
		console.log("Starting to fetch TXs");
		request('https://blockchain.info/unconfirmed-transactions?format=json', handleTXsResponse.bind(null, callback));	
}

function handleTXsResponse(callback, error, response, body) {
		console.log("Handling the tx response");
		
		if (error) {
			callback(null, error);
		} 
		else if (response.statusCode == 200) {
			var txs = JSON.parse(body);
			callback(txs, null);
	  	}
	  	else {
	  		callback(null, "Something weird happened");
	  	}
}
