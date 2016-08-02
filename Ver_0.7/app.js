var express = require('express');
var request = require('request');
var app = express();
var WebSocket = require('ws');


var countriesJSON = require('./public/countries.json'); //(with path)
var fs = require('fs');



app.use('/', express.static('./public'));




//API testing 
// function getTXs (req, response) {
// 	console.log("getTXs starts to work.  ");
// 	console.log(" ");

// 	fetchTx(function(body) {
// 		var ip = body["txs"][0]["relayed_by"];
// 		fetchGeoIp(ip, function(body) {
// 			console.log(body);
// 			response.send("done!");
// 		})
// 	});
// }

function startWebSocket(){
	//Websocketing
	//var bciSocket = new WebSocket("ws://echo.websocket.org/");

	var bciSocket = new WebSocket("wss://ws.blockchain.info/inv");
	
//	console.log("Websocket created successfully");


	bciSocket.onopen = function() {
		// console.log("Connected successfully");
		// console.log("");
		bciSocket.send('{"op": "unconfirmed_sub"}');
	};




	bciSocket.onmessage = function(event) {
		var msgJSON = JSON.parse(event.data);
		var ip = msgJSON['x']['relayed_by'];
		console.log("Incoming IP Address: " + ip);

		if(ip!="127.0.0.1"){
			fetchGeoIp(ip, function(body) {
				var countryPLUS = body["country_name"]
				console.log(countryPLUS);
				updateCountryRating(countryPLUS);
				//console.log(countriesJSON);
				//response.send("done!");
				});
			}
			else{
				updateCountryRating("BlockChain.info");
			}
		};

	
		

	bciSocket.onerror = function(error) {
	  console.log("Error: " + error.message);
	};	

	bciSocket.onclose = function(event) {
	  if (event.wasClean) {
	    console.log('Connection closed successfully');
	  } 
	  else {
	    console.log('Connection abrupted'); // 
	  }
	  console.log('Event code: ' + event.code + ' ; Reason: ' + event.reason);
	};

}

function fetchTx(callback) {
	request('https://blockchain.info/unconfirmed-transactions?format=json', handleTXsResponse.bind(null, callback));	
}




function handleTXsResponse (callback, error, response, body) {
		
	if (error) {
			callback(null, error)
	} else if (response.statusCode == 200) {
		var txs = JSON.parse(body);
		callback(txs, null);
  	} else {
  		callback(null, "Something weird happened");
  	}
}


function fetchGeoIp(ip, callback) {
	//console.log("fetching geoip information for " + ip);
	
		//var sendReq = "http://ip-api.com/json/".concat(ip);
		var sendReq = "http://freegeoip.net/json/".concat(ip);
		request(sendReq, handleGeoReply.bind(null, callback));	
		
	
	
}


function handleGeoReply (callback, error, response, body){
	// console.log("handleGeoReply starts to work. ");
	// console.log(" ");
	if (error) {
		callback(null, error)
	} else if (response.statusCode == 200) {
		var geoReply = JSON.parse(body);
		callback(geoReply, null);
		//console.log(geoReply);

  	} else {
  		callback(null, "Something weird happened");
  	}
}

function xCountry(){

}






function updateCountryRating(country){
	//console.log("Starting Updating");
	for (let i=0; i<countriesJSON.length; i++){
		//console.log("Checking country - " + i);
		if (countriesJSON[i].name === country){
			countriesJSON[i].counter++;
//			console.log("Update successfull of country - " + i);
//			console.log("Current counter of country " + countriesJSON[i].name + " is " + countriesJSON[i].counter);
			//var file = require(countriesJSON);
			fs.writeFile('./public/countries.json', JSON.stringify(countriesJSON), function (err) {
  				if (err) return console.log(err);
			});
			
			sortObj2(countriesJSON);
			return;
		}
	}
}
function sortObj2(items){
		// var items = {
		// 	countriesJSON
		// }
		// sort by value
		items.sort(function (a, b) {
		  if (a.counter < b.counter) {
		    return 1;
		  }
		  if (a.counter > b.counter) {
		    return -1;
		  }
		  // a must be equal to b
		  return 0;
		});

		for (i = 0; i < items.length; i++) {

		  //console.log(items[i]['name'] + ' : ' + items[i]['counter']);
	}
}

function showRating(jsonFile){
	for (let i = 0; i < jsonFile.length; i++) {
		  console.log(jsonFile[i]['name'] + ' : ' + jsonFile[i]['counter']);
	}
}
//showRating(countriesJSON);

function myFunction() {
    var table = document.getElementById("myTable");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = "NEW CELL1";
    cell2.innerHTML = "NEW CELL2";
}

//app.get('/getTX', startWebSocket);
//app.get('/getTX', showRating);




app.listen(3000);

console.log('Listening to 3000');
console.log('_____');


