var WebSocket = require('ws');

console.log("Successfully found ws");

module.exports = {
  startWebSocket: startWebSocket	
}	


function startWebSocket(socketAddress){
	console.log("Attempt to connect");
	
	
	var socket = new WebSocket(socketAddress);
	
		
		socket.onopen = function(event){
			//console.log("Connection established");
			socket.send('{"op": "unconfirmed_sub"}');
		}
		socket.onmessage = function(event) {
			console.log("Started receiving data");	
			//hadnleIncomingData(event);
		}
		socket.onerror = function(error){
			console.log("Error: " + error.message);
		}
		socket.onclose = function (closeMessage){
			  if (closeMessage.wasClean) {
			    console.log('Connection closed successfully');
			  } 
			  else {
			    console.log('Connection abrupted'); // 
			  }
			  console.log('Event code: ' + closeMessage.code + ' ; Reason: ' + closeMessage.reason);
		}

		
}
		// function startWebSocket(){
			
		// 	var bciSocket = new WebSocket("wss://ws.blockchain.info/inv");

		// 	bciSocket.onopen = function() {

		// 		bciSocket.send('{"op": "unconfirmed_sub"}');
		// 	};

			// bciSocket.onmessage = function(event) {

			// 	//handleIncomingData(event);

			// }


		// 	bciSocket.onerror = function(error) {
		// 	  console.log("Error: " + error.message);
		// 	};	

		// 	bciSocket.onclose = function(event) {
		// 	  if (event.wasClean) {
		// 	    console.log('Connection closed successfully');
		// 	  } 
		// 	  else {
		// 	    console.log('Connection abrupted'); // 
		// 	  }
		// 	  console.log('Event code: ' + event.code + ' ; Reason: ' + event.reason);
		// 	  outputResults();
		// 	};

		// }


