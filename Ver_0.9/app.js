var express = require('express');
var request = require('request');
var app = express();
var WebSocket = require('ws');


//var countriesJSON = require('./public/countries.json');

var countriesAbsolute = require('./public/countriesAbsolute.json');
var countriesRelative = require('./public/countriesRelative.json');

var fs = require('fs');

var requestCounter =0;

app.use('/', express.static('./public'));


function startWebSocket(){
	//Websocketing
	//var bciSocket = new WebSocket("ws://echo.websocket.org/");

	var bciSocket = new WebSocket("wss://ws.blockchain.info/inv");

	bciSocket.onopen = function() {

		bciSocket.send('{"op": "unconfirmed_sub"}');
	};

	bciSocket.onmessage = function(event) {

		//if (counter==5000){generateResults();}
		
		var msgJSON = JSON.parse(event.data);
		var ip = msgJSON['x']['relayed_by'];

		fetchGeoIp(ip, function(body) {

				if (body==null){
					console.log("This ip" + ip + " has brought a null country name ");
					return;
				}
				var countryPLUS = body["country_name"];
				//console.log(countryPLUS);
				if (countryPLUS==null || countryPLUS==undefined || ip=="0.0.0.0"){
					//console.log("IP: " + ip +  " has unknown country - " + countryPLUS);
					updateCountryRating("Country Unknown or broken TX", "xCountry");

				} 
				//else if (countryPLUS==="Netherlands" || countryPLUS==="Hong Kong"){console.log("Spotted Netherlands " + countryPLUS);}
				else if (ip !=="127.0.0.1" && countryPLUS!=="Netherlands" && countryPLUS!=="Russia" && countryPLUS!=="Hong Kong" && countryPLUS!=="Republic of Korea" &&countryPLUS!=="Republic of Lithuania" && countryPLUS!==undefined && countryPLUS !=="" && countryPLUS!==null && body!==null)
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
				else if (countryPLUS==="Russian Federation"){
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
				else if (countryPLUS==="South Korea"){
					fetchPopSize("Rep of Korea", function(body)
					{
						updateCountryRating(countryPLUS, body["total_population"][0]["population"]);
						//console.log("Population of Hong Kong: " + body["total_population"][0]["population"]);
					});
				}
				
				else if (countryPLUS==="Lithuania"){
					fetchPopSize("Lithuania", function(body)
					{
						updateCountryRating(countryPLUS, body["total_population"][0]["population"]);
						//console.log("Population of Hong Kong: " + body["total_population"][0]["population"]);
					});
				}
				else if (ip="127.0.0.1"){
					fetchPopSize("World", function(body)
					{
						updateCountryRating("BlockChain.info", "BlockChain.info");
						//console.log("Population of Hong Kong: " + body["total_population"][0]["population"]);
					});
				}
				
				else {
					 //console.log("Neither of the conditions were met: " + countryPLUS + " : " + ip);
					 fetchPopSize("Country Unknown or broken TX", function(body)
					{
						updateCountryRating("Country Unknown or broken TX", "xCountry");
						//console.log("Population of Hong Kong: " + body["total_population"][0]["population"]);
					});
					}
		});
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
	updateAbsoluteRating(country, popSize);
	updateRelativeRating(country, popSize);
}

function updateAbsoluteRating(country, popSize){

	if (popSize=="xCountry"){
		countriesAbsolute[findCountry("Country Unknown or broken TX", true)].counter++;
		return;
	}
	else if (popSize=="BlockChain.info"){
		countriesAbsolute[findCountry("BlockChain.info", true)].counter++;
		return;
	}
	else{
				//console.log(country + " : " + popSize);
				countriesAbsolute[findCountry(country, true)].counter++;
				countriesAbsolute[findCountry(country, true)].absoluteRating++;
				countriesAbsolute[findCountry(country, true)].populationSize = popSize;
				fs.writeFile('./public/countriesAbsolute.json', JSON.stringify(countriesAbsolute), function (err) {
	  				if (err) return console.log("Error when updating Absolute file " + country + " : " +err);
				});
				absoluteSort(countriesAbsolute);
				return;
		}
}

function updateRelativeRating(country, popSize){

	if (popSize=="xCountry"){
		countriesRelative[findCountry("Country Unknown or broken TX", false)].counter++;
		return;
	}
	else if (popSize=="BlockChain.info"){
		countriesRelative[findCountry("BlockChain.info", false)].counter++;
		return;
	}
	else{
				countriesRelative[findCountry(country, false)].counter++;
				countriesRelative[findCountry(country, false)].populationSize = popSize;
				countriesRelative[findCountry(country, false)].relativeRating = (countriesRelative[findCountry(country, false)].counter)/((popSize/1000000));
				fs.writeFile('./public/countriesRelative.json', JSON.stringify(countriesRelative), function (err) {
	  				if (err) return console.log("Error when updating Relative file " + country + " : " +err);
				});
				
				relativeSort(countriesRelative);
				return;
		}
}

function findCountry(country, absolute){

	for (let i=0; i<countriesAbsolute.length; i++){
		if (absolute){
			if (countriesAbsolute[i].name == undefined){
				//console.log("Found undefined country: " + country + " : " + i);
				//return null;
			}

			else if (countriesAbsolute[i].name === country){
				return i;
			}
		}
		else if (!absolute){
				if (countriesRelative[i].name == undefined){
					//console.log("Found undefined country: " + country + " : " + i);
					//return null;
				}
				else if (countriesRelative[i].name === country){
					return i;
				}
		}
		else {console.log("Error in findCountry - " + country + " : " + absolute);}
	}

	
}



function absoluteSort(items){

		items.sort(function (a, b) {
		  if (a.absoluteRating < b.absoluteRating) {
		    return 1;
		  }
		  if (a.absoluteRating > b.absoluteRating) {
		    return -1;
		  }
		  return 0;
		});

}

function relativeSort(items){

		items.sort(function (a, b) {
		  if (a.relativeRating < b.relativeRating) {
		    return 1;
		  }
		  if (a.relativeRating > b.relativeRating) {
		    return -1;
		  }
		  return 0;
		});

}

function showTopResults(absolute){
	var totalAbsolute = 0;
	var totalRelative = 0;

	for (let i = 0; i<6; i++){
		if (absolute){

			console.log(countriesAbsolute[i]); 
			//totalAbsolute = totalAbsolute + countriesAbsolute[i].counter;

		}
		else if (!absolute){
			console.log(countriesRelative[i]);
			//totalRelative = totalRelative + countriesRelative[i].counter;

		}
		console.log("");
	}
	for (let i = 0; i<countriesAbsolute.length; i++){
		totalAbsolute = totalAbsolute + countriesAbsolute[i].counter;
	}
	for (let i = 0; i<countriesRelative.length; i++){
		totalRelative = totalRelative + countriesRelative[i].counter;
	}
	console.log("Total Absolute TXs - " + totalAbsolute);
	console.log("Total Relative TXs - " + totalRelative);
}

function generateResults(){


//Math.round(new Date().getTime()/1000)


}





function giveRandomText(request, response){
			

	var a = "Hello Wolrd";
	response.send("Hello world");
	
}


//Start receiving online data from BCI
//app.get('/getTX', startWebSocket);

//See ratings
console.log("Absolute Rating: ");
showTopResults(true);
console.log("");
console.log("____________________________________________________________");
console.log("");
console.log("Relative Rating: ");
showTopResults(false);
console.log("");
//app.get("/getTX", giveRandomText);




app.listen(3000);

console.log('Listening to 3000');
console.log('_____');


