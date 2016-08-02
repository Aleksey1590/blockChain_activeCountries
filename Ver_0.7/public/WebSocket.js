// function startWebSocket(){
// 	//Websocketing
// 	//var bciSocket = new WebSocket("ws://echo.websocket.org/");

// 	var bciSocket = new WebSocket("wss://ws.blockchain.info/inv");
	
// 	console.log("Websocket created successfully");
// 	console.log(" ");




// 	bciSocket.onopen = function() {
// 	  console.log("Connected successfully");
// 	  console.log("");
// 	  bciSocket.send('{"op": "unconfirmed_sub"}');
// 	};

// 	console.log("Successfully opened a channel ");
// 	console.log(" ");

// 	bciSocket.onclose = function(event) {
// 	  if (event.wasClean) {
// 	    console.log('Connection closed successfully');
// 	  } else {
// 	    console.log('Connection abrupted'); // 
// 	  }
// 	  console.log('Event code: ' + event.code + ' ; Reason: ' + event.reason);
// 	};



// 	console.log("Trying to receive a message");
// 	console.log(" ");

// 	bciSocket.onmessage = function(event) {
// 		var msgJSON = JSON.parse(event.data);
// 	  console.log("Received data: " + msgJSON['x']['relayed_by']);


// 	};
// 	console.log("Finished");

// 	bciSocket.onerror = function(error) {
// 	  console.log("Error: " + error.message);
// 	};	

// 	//for(var i=1; i<10000; i++){console.log(i+" ;");}

// }

// startWebSocket();
