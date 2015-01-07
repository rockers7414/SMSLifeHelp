$('#member li').click(function(){
	$('#member-value').text(this.children[0].text).append('<span class="caret"></span>');
});

$('#job li').click(function(){
	$('#job-value').text(this.children[0].text).append('<span class="caret"></span>');
});