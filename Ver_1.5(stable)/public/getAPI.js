$.ajax({url: "/calcShare", dataType:'json' }).done(
	function(imARandomName){
		$('#id1').text(imARandomName.a);
		$('#id2').text(imARandomName.b);
		$('#id3').text(imARandomName.c);
})

