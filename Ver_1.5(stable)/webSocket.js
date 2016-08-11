var WebSocket = require('ws');

//console.log("Successfully found ws");

var BCI_WS_ENDPOINT = "wss://ws.blockchain.info/inv";
module.exports = BciWebSocket;

function BciWebSocket() {
	this.socket = new WebSocket(BCI_WS_ENDPOINT);
	this.socket.onopen = onOpen.bind(this);
	this.socket.onmessage = onMessage.bind(this);
	this.socket.onerror = onError.bind(this);
	this.socket.onclose = onClose.bind(this);
	this.callbacks = [];
}

BciWebSocket.prototype.registerCallback = function(cb) {
	if(!this.callbacks.includes(cb)) {
		this.callbacks.push(cb);
	}
}

function onOpen(event) {
	this.socket.send('{"op": "unconfirmed_sub"}');
}

function onMessage(event) {
			//console.log("Started receiving data");	
			 
			var ipAddress = JSON.parse(event.data);
			var ip = ipAddress['x']['relayed_by'];
			// if (ip!=null && ip!=undefined){callback(ip);}
			// else {callback(null);}
			for (var cb in this.callbacks) {
				try {
					// cb.call(registerCallback,null,ip);
					this.callbacks[cb](ip);
				} catch (e) {
					console.log(e);
				}
			}
}

function onError(error){
	console.log("Error: " + error.message);
}

function onClose(closeMessage){
	  if (closeMessage.wasClean) {
	    console.log('Connection closed successfully');
	  } 
	  else {
	    console.log('Connection abrupted'); // 
	  }
	  console.log('Event code: ' + closeMessage.code + ' ; Reason: ' + closeMessage.reason);
}

