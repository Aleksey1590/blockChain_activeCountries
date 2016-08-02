var express = require('express');
var request = require('request');
var app = express();
var WebSocket = require('ws');


var countriesJSON = require('./public/countries.json'); //(with path)
var fs = require('fs');

var requestCounter =0;

app.use('/', express.static('./public'));


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
		//console.log("Incoming IP Address: " + ip);


		if(ip!="127.0.0.1")
		{
			fetchGeoIp(ip, function(body) {

				var countryPLUS = body["country_name"];
				//console.log(countryPLUS);
				if (countryPLUS==null || countryPLUS==undefined){
					console.log("IP: " + ip +  " has unknown country - " + countryPLUS);
				} 
				//else if (countryPLUS==="Netherlands" || countryPLUS==="Hong Kong"){console.log("Spotted Netherlands " + countryPLUS);}
				else if (countryPLUS!=="Netherlands" && countryPLUS!=="Russia" && countryPLUS!=="Hong Kong" && countryPLUS!=="Republic of Korea" &&countryPLUS!=="Republic of Lithuania" && countryPLUS!==undefined && countryPLUS !=="" && countryPLUS!==null)
				{
					fetchPopSize(countryPLUS, function(body){
						if (body===null){
							console.log("Country - " + countryPLUS + " needs to be edited " + ip); 						
						}
						else{
						var popSize = body["total_population"][0]["population"];
						//console.log(countryPLUS+" : "+popSize);
						updateCountryRating(countryPLUS, popSize);
						}
					})	
				}
				else if (countryPLUS==="Netherlands"){
					fetchPopSize("The Netherlands", function(body)
					{
						updateCountryRating(countryPLUS, body["total_population"][0]["population"]);
						//console.log("Population of Netherlands: " + body["total_population"][0]["population"]);
					});
				}
				else if (countryPLUS==="Russia"){
					fetchPopSize("Russian Federation", function(body)
					{
						updateCountryRating(countryPLUS, body["total_population"][0]["population"]);
						//console.log("Population of Russia: " + body["total_population"][0]["population"]);
					});
				}
				else if (countryPLUS==="Hong Kong"){
					fetchPopSize("Hong Kong SAR-China", function(body)
					{
						updateCountryRating(countryPLUS, body["total_population"][0]["population"]);
						//console.log("Population of Hong Kong: " + body["total_population"][0]["population"]);
					});
				}
				else if (countryPLUS==="Republic of Korea"){
					fetchPopSize("Rep of Korea", function(body)
					{
						updateCountryRating(countryPLUS, body["total_population"][0]["population"]);
						//console.log("Population of Hong Kong: " + body["total_population"][0]["population"]);
					});
				}
				
				else if (countryPLUS==="Republic of Lithuania"){
					fetchPopSize("Lithuania", function(body)
					{
						updateCountryRating(countryPLUS, body["total_population"][0]["population"]);
						//console.log("Population of Hong Kong: " + body["total_population"][0]["population"]);
					});
				}
				else {console.log("Neither of the conditions were met: " + countryPLUS + " : " + ip);}
	});
}
	
		else{

			fetchPopSize("World", function(body)
					{
						updateCountryRating("BlockChain.info", body["total_population"][0]["population"]);
					});
		}
}

	
		

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
	} 
	else if (response.statusCode == 200) {
		var txs = JSON.parse(body);
		callback(txs, null);
  	} 
  	else {
  		callback(null, "Something weird happened");
  	}
}


function fetchGeoIp(ip, callback) {
	//console.log("fetching geoip information for " + ip);
	
		//var sendReq = "http://ip-api.com/json/".concat(ip);
		var sendReq = "http://freegeoip.net/json/".concat(ip);
		request(sendReq, handleGeoReply.bind(null, callback));
		requestCounter++;
		console.log(requestCounter);	
}


function handleGeoReply (callback, error, response, body){

  	if (error) {
			callback(null, error)
	} 
	else if (response.statusCode == 200) {
		var geoReply = JSON.parse(body);
		callback(geoReply, null);
  	} 
  	else {
  		callback(null, "Something weird happened");
  	}
}




function fetchPopSize (country, callback){
	var sendReq ="http://api.population.io:80/1.0/population/".concat(country).concat("/today-and-tomorrow/")
	request(sendReq, handleGeoReply.bind(null, callback));	
}


function handlePopReply(callback, error, response, body){
	if (error) {
		callback(null, error)
	} 
	else if (response.statusCode == 200) {
		var popReply = JSON.parse(body);
		callback(popReply, null);

  	} 
  	else {
  		callback(null, "Something weird happened");
  	}
}




function updateCountryRating(country, popSize){

	
		for (let i=0; i<countriesJSON.length; i++){
			//console.log("Checking country - " + i);
			if (countriesJSON[i].name === country){
				countriesJSON[i].counter++;
				countriesJSON[i].absoluteRating++;
				countriesJSON[i].populationSize = popSize;
				countriesJSON[i].relativeRating = (countriesJSON[i].absoluteRating)/(popSize);
				//console.log("Update successfull of country - " + i);
				//console.log("Current counter of country " + countriesJSON[i].name + " is " + countriesJSON[i].counter);
				
				fs.writeFile('./public/countries.json', JSON.stringify(countriesJSON), function (err) {
	  				if (err) return console.log(err);
				});
				
				absoluteSort(countriesJSON);
				//relativeSort(countriesJSON);
				return;
			}
		}
	
}




function absoluteSort(items){
		// var items = {
		// 	countriesJSON
		// }
		// sort by value
		items.sort(function (a, b) {
		  if (a.absoluteRating < b.absoluteRating) {
		    return 1;
		  }
		  if (a.absoluteRating > b.absoluteRating) {
		    return -1;
		  }
		  // a must be equal to b
		  return 0;
		});

		//for (i = 0; i < items.length; i++) {

		  //console.log(items[i]['name'] + ' : ' + items[i]['absoluteRating']);
	//}
}

function relativeSort(items){
		// var items = {
		// 	countriesJSON
		// }
		// sort by value
		items.sort(function (a, b) {
		  if (a.relativeRating < b.relativeRating) {
		    return 1;
		  }
		  if (a.relativeRating > b.relativeRating) {
		    return -1;
		  }
		  // a must be equal to b
		  return 0;
		});

		//for (i = 0; i < items.length; i++) {

		  //console.log(items[i]['name'] + ' : ' + items[i]['relativeRating']);
	//}
}

function showAbsoluteRating(jsonFile){
	console.log("");
	console.log("Absolute rating: ");
	console.log("");
	for (let i = 0; i < jsonFile.length; i++) {
		  console.log(jsonFile[i]['name'] + ' : ' + jsonFile[i]['absoluteRating']);
	}
}

function showRelativeRating(jsonFile){
	console.log("");
	console.log("Relative to Population size rating: ");
	console.log("");
	for (let i = 0; i < jsonFile.length; i++) {
		  console.log(jsonFile[i]['name'] + ' : ' + jsonFile[i]['relativeRating']);
	}
}



//Start receiving online data from BCI
app.get('/getTX', startWebSocket);

//See current rating
// showAbsoluteRating(countriesJSON);
// showRelativeRating(countries)''
// app.get('/getTX', showRating);




app.listen(3000);

console.log('Listening to 3000');
console.log('_____');


