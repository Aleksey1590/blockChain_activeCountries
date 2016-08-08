var request = require('request');

module.exports = {fetchPopSize: fetchPopSize}; 

function fetchPopSize(country, callback){
		var sendReq ="http://api.population.io:80/1.0/population/".concat(country).concat("/today-and-tomorrow/")
		request(sendReq, handlePopReply.bind(null, callback));	
	}

function handlePopReply(callback, error, response, body){
		if (error) {
			callback(null, error)
		} 

		else if (response.statusCode == 200) {
			var popReply = JSON.parse(body);
			callback(popReply['total_population'][1]['population'], null);
	  	} 

	  	else {
	  		callback(null, "Something weird happened");
	  	}
}