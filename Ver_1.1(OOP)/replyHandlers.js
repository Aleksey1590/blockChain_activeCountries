var request = require('request');

module.exports = {
  handlerCollection: handlerCollection	
}	


function handlerCollection(){
	console.log("Succeffully accessed the collection");

	this.fetchTx = function(callback){
		//request('https://blockchain.info/unconfirmed-transactions?format=json', handleTXsResponse.bind(null, callback));	
		console.log("hello world");
	}

	this.handleTXsResponse = function(callback, error, response, body){
		if (error) {
			callback(null, error)
		} 
		else if (response.statusCode == 200) {
			var txs = JSON.parse(body);
			callback(txs, null);
			console.log(txs);
	  	} 
	  	else {
	  		callback(null, "Something weird happened");
	  	}
	}
}























// function fetchTx(callback) {
// 	request('https://blockchain.info/unconfirmed-transactions?format=json', handleTXsResponse.bind(null, callback));	
// }

// function handleTXsResponse (callback, error, response, body) {
		
// 	if (error) {
// 			callback(null, error)
// 	} 
// 	else if (response.statusCode == 200) {
// 		var txs = JSON.parse(body);
// 		callback(txs, null);
//   	} 
//   	else {
//   		callback(null, "Something weird happened");
//   	}
// }


// function fetchGeoIp(ip, callback) {	
// 		//var sendReq = "http://ip-api.com/json/".concat(ip);
// 		var sendReq = "http://freegeoip.net/json/".concat(ip);
// 		request(sendReq, handleGeoReply.bind(null, callback));
// 		requestCounter++;

// 		console.log(requestCounter);	
// 		//if (requestCounter==100){bciSocket.close();}
// }


// function handleGeoReply (callback, error, response, body){
//   	if (error) {
// 			callback(null, error)
// 	} 
// 	else if (response.statusCode == 200) {
// 		var geoReply = JSON.parse(body);
// 		callback(geoReply, null);
//   	} 
//   	else {
//   		callback(null, "Something weird happened");
//   	}
// }

// function findCountry(country, absolute){

// 	for (let i=0; i<countriesAbsolute.length; i++){
// 		if (absolute){
// 			if (countriesAbsolute[i].name == undefined){
// 				//console.log("Found undefined country: " + country + " : " + i);
// 				//return null;
// 			}

// 			else if (countriesAbsolute[i].name === country){
// 				return i;
// 			}
// 		}
// 		else if (!absolute){
// 				if (countriesRelative[i].name == undefined){
// 					//console.log("Found undefined country: " + country + " : " + i);
// 					//return null;
// 				}
// 				else if (countriesRelative[i].name === country){
// 					return i;
// 				}
// 		}
// 		else {console.log("Error in findCountry - " + country + " : " + absolute);}
// 	}
// }



// function fetchPopSize (country, callback){
// 	var sendReq ="http://api.population.io:80/1.0/population/".concat(country).concat("/today-and-tomorrow/")
// 	request(sendReq, handleGeoReply.bind(null, callback));	
// }


// function handlePopReply(callback, error, response, body){
// 	if (error) {
// 		callback(null, error)
// 	} 
// 	else if (response.statusCode == 200) {
// 		var popReply = JSON.parse(body);
// 		callback(popReply, null);
//   	} 
//   	else {
//   		callback(null, "Something weird happened");
//   	}
// }




// if (requestCounter==20){
		// 	bciSocket.close();
		// 	currentState.relative = countriesRelative;
		// 	currentState.absolute = countriesAbsolute;
			
		// 	requestCounter=0;
		// }
		
		// var msgJSON = JSON.parse(event.data);
		// var ip = msgJSON['x']['relayed_by'];

		// fetchGeoIp(ip, function(body) {

		// 		if (body==null){
		// 			console.log("This ip" + ip + " has brought a null country name ");
		// 			return;
		// 		}
		// 		var countryPLUS = body["country_name"];
		// 		//console.log(countryPLUS);
		// 		if (countryPLUS==null || countryPLUS==undefined || ip=="0.0.0.0"){
		// 			//console.log("IP: " + ip +  " has unknown country - " + countryPLUS);
		// 			updateCountryRating("Country Unknown or broken TX", "xCountry");

		// 		} 
		// 		//else if (countryPLUS==="Netherlands" || countryPLUS==="Hong Kong"){console.log("Spotted Netherlands " + countryPLUS);}
		// 		else if (ip !=="127.0.0.1" && countryPLUS!=="Netherlands" && countryPLUS!=="Russia" && countryPLUS!=="Hong Kong" && countryPLUS!=="Republic of Korea" &&countryPLUS!=="Republic of Lithuania" && countryPLUS!==undefined && countryPLUS !=="" && countryPLUS!==null && body!==null)
		// 		{
		// 			fetchPopSize(countryPLUS, function(body){
		// 				if (body===null){
		// 					console.log("Country - " + countryPLUS + " needs to be edited " + ip); 						
		// 				}
		// 				else{
		// 				var popSize = body["total_population"][0]["population"];
		// 				//console.log(countryPLUS+" : "+popSize);
		// 				updateCountryRating(countryPLUS, popSize);
		// 				}
		// 			})	
		// 		}
		// 		else if (countryPLUS==="Netherlands"){
		// 			fetchPopSize("The Netherlands", function(body)
		// 			{
		// 				updateCountryRating(countryPLUS, body["total_population"][0]["population"]);
		// 				//console.log("Population of Netherlands: " + body["total_population"][0]["population"]);
		// 			});
		// 		}
		// 		else if (countryPLUS==="Russian Federation"){
		// 			fetchPopSize("Russian Federation", function(body)
		// 			{
		// 				updateCountryRating(countryPLUS, body["total_population"][0]["population"]);
		// 				//console.log("Population of Russia: " + body["total_population"][0]["population"]);
		// 			});
		// 		}
		// 		else if (countryPLUS==="Hong Kong"){
		// 			fetchPopSize("Hong Kong SAR-China", function(body)
		// 			{
		// 				updateCountryRating(countryPLUS, body["total_population"][0]["population"]);
		// 				//console.log("Population of Hong Kong: " + body["total_population"][0]["population"]);
		// 			});
		// 		}
		// 		else if (countryPLUS==="South Korea"){
		// 			fetchPopSize("Rep of Korea", function(body)
		// 			{
		// 				updateCountryRating(countryPLUS, body["total_population"][0]["population"]);
		// 				//console.log("Population of Hong Kong: " + body["total_population"][0]["population"]);
		// 			});
		// 		}
				
		// 		else if (countryPLUS==="Lithuania"){
		// 			fetchPopSize("Lithuania", function(body)
		// 			{
		// 				updateCountryRating(countryPLUS, body["total_population"][0]["population"]);
		// 				//console.log("Population of Hong Kong: " + body["total_population"][0]["population"]);
		// 			});
		// 		}
		// 		else if (ip="127.0.0.1"){
		// 			fetchPopSize("World", function(body)
		// 			{
		// 				updateCountryRating("BlockChain.info", "BlockChain.info");
		// 				//console.log("Population of Hong Kong: " + body["total_population"][0]["population"]);
		// 			});
		// 		}
				
		// 		else {
		// 			 //console.log("Neither of the conditions were met: " + countryPLUS + " : " + ip);
		// 			 fetchPopSize("Country Unknown or broken TX", function(body)
		// 			{
		// 				updateCountryRating("Country Unknown or broken TX", "xCountry");
		// 				//console.log("Population of Hong Kong: " + body["total_population"][0]["population"]);
		// 			});
		// 			}
		// });
		// 