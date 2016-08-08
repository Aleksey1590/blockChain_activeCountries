var request = require('request');

module.exports = {fetchGeoIP: fetchGeoIP}; 

function fetchGeoIP (ip, callback){
		var sendReq = "http://freegeoip.net/json/".concat(ip);
		
		request(sendReq, handleGeoReply.bind(null, callback));
}


function handleGeoReply(callback, error, response, body) {
		if (error) {
			callback(null, error)
		} 
		else if (response.statusCode == 200) {
			var geoReply = JSON.parse(body);
			var country = geoReply['country_name'];
			if (country==null || country==undefined || country=="") {
				callback(null, "Country lookup failed");
			} else {
				callback(geoReply, null);
			}
	  	} 
	  	else {
	  		callback(null, "Something weird happened");
	  	}
}