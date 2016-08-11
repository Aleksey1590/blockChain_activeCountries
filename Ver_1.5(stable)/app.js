console.log('Listening to 3000');
console.log('_____');

var http = require('http');
var express = require('express');
var app = express();

var BciWebSocket = require('./webSocket.js'); //import webSocket code

var geoIP = require('./API/geoIP_handler.js');
var popAPI = require('./API/population_handler.js');

var updateStats = require('./Results/generateResults.js');

app.use('/', express.static('./public'));



var update = new updateStats();
var counter = 0;


function start() {
	var ws = new BciWebSocket();

	ws.registerCallback(function (ipAddress) {
		if (ipAddress == "127.0.0.1") {
			//update BlockChain counter
			//update.updateResults("BlockChain", 1);

		}
		else {
			geoIP.fetchGeoIP(ipAddress, function (countryInfo, error) {
				if (error != null) {
					console.log(error);
				}
				else {
					var country = countryInfo["country_name"];
					popAPI.fetchPopSize(country, function (popSize) {
						if (popSize == null || popSize == undefined || popSize == "") {
							// do not update its relative rating
							
							//????
							//update.updateResults("Unknown", 1);
						}
						else {

							update.updateResults(country, popSize);

							counter++;
							console.log(counter);

							//if (counter%10==0) {
								// update.getShare(counter);
								// console.log(update.getShare(counter));
								//update.getTopShare(counter);
								//console.log(update.getTopShare(counter));
								//console.log(update.getBCI());
							//}
							//if (counter===5){update.updateList();}
						}

					})
				}
			})
		}


	});
}


start();



app.get('/calcShare', function (req, res) {
	res.send(JSON.stringify(update.getTopShare(counter)));
});

app.listen(3000);

// var server = http.createServer(app);

// server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function (req, res) {
// 	var addr = server.address();

// 	console.log("Web server listening at", addr.address + ":" + addr.port);
// });
