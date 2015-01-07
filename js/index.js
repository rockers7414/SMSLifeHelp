$('#member li').click(function() {
	$('#member-value').text(this.children[0].text).append('<span class="caret"></span>');
});

$('#job li').click(function() {
	$('#job-value').text(this.children[0].text).append('<span class="caret"></span>');
	switch(this.children[0].text) {
		case '在職':
			$('#salary-value').attr('disabled', false);
			break;
		default:
			$('#salary-value').attr('disabled', true);
	}
});

$('#addmember').click(function() {
	var age = new Date().getFullYear() - (validateDigit($('#birthday-value').val()) ? 1911 + parseInt($('#birthday-value').val()) : new Date().getFullYear());
	if (age == 0) {
		$('#birthday').addClass('has-error');
		$('#errormsg').text('出生年次填寫錯誤！').show();
		return false;
	}
});

function validateDigit(value) {
	var re = /[0-9]+/;
	return re.test(value);
}