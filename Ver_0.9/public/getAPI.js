$.ajax({url: "/getTX", dataType:'json' }).done(
	function(imARandomName){
		$('#relayIP').text(imARandomName['txJS']['txs'][0]['relayed_by']);
})

