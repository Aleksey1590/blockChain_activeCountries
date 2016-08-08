console.log('Listening to 3000');
console.log('_____');

var express = require('express');
var app = express();

var BciWebSocket = require('./webSocket.js'); //import webSocket code

//var bciAPI = require('./API/bciAPI_handler.js'); 

var geoIP = require('./API/geoIP_handler.js'); 
var popAPI = require('./API/population_handler.js'); 

var sortFile = require('./Results/sort.js');
//var updateStats=require('');



app.use('/', express.static('./public'));



function start (){
	var ws = new BciWebSocket();
	ws.registerCallback(function(ipAddress){
 		if (ipAddress=="127.0.0.1"){
 			//update BlockChain counter
 		}
 		else{
 			geoIP.fetchGeoIP(ipAddress, function(countryInfo, error){
 				if (error != null){
 					console.log(error);
 				}
	 			else {
	 				var country = countryInfo["country_name"];
	 				popAPI.fetchPopSize(country, function(popSize){
						if (popSize==null || popSize==undefined || popSize==""){
							// do not update its relative rating
						}
						else{
							// updateStatsAbsoluteCountry();
							// updateStatsRelativeCountry();
						} 
						
					})}
 			})
 		}

 		
 	});
 }



// app.get('/getTX', start);


start()
app.listen(3000);




