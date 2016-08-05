console.log('Listening to 3000');
console.log('_____');

var express = require('express');
var app = express();
app.listen(3000);


// var countriesAbsolute = require('./public/originAbsolute.json');
// var countriesRelative = require('./public/originRelative.json');

// var fs = require('fs');

// var requestCounter = 0;

// var currentState = {
// 	absolute: {},
// 	relative: {}
// }


app.use('/', express.static('./public'));


//var ws = require('./webSocket.js'); //import webSocket code
var replyHandler = require('./replyHandlers.js'); // import replyHandler code

function testWebSocket (){ 
 	console.log("Trying to start a socket");
 	//ws.startWebSocket("wss://ws.blockchain.info/inv");
 }

 function testReplyHandler(){
 	console.log("Testing Reply handler");
 	replyHandler.handlerCollection.fetchTx(1);

 }

app.get('/getTX', testReplyHandler);







// function sendData(request, response){
// 	var a = "hello world";
// 	var b = "Im doing great";
// 	var c = "Its a nice day";

// 	var dataSet = require('./public/data.json');

// 	response.send(JSON.stringify(dataSet));

// }



//Start receiving online data from BCI
// app.get('/getTX', startWebSocket);


// app.get('/absolute', function(req,res){
// 	res.send(currentState.absolute);
// });
//See ratings
//outputResults();

//app.get('/getTX', sendData);








