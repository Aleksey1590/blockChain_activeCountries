$.ajax({url: "/getTX", dataType:'json' }).done(
	function(imARandomName){
		$('#id1').text(imARandomName["a"]);
})

