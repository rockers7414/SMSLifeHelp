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
			displayError(false, {'id':'salary'});
	}
});

$('#addmember').click(function() {
	// validation
	var member = $('#member-value').text();
	if (member == '稱謂') {
		displayError(true, {'msg':'尚未選擇家庭成員！'});
		return false;
	}

	var age = new Date().getFullYear() - (!isNaN($('#birthday-value').val()) && $('#birthday-value').val() != "" ? 1911 + parseInt($('#birthday-value').val()) : new Date().getFullYear());
	if (age == 0) {
		displayError(true, {'id':'birthday', 'msg':'出生年次填寫錯誤！'});
		return false;
	} else {
		displayError(false, {'id':'birthday'});
	}

	var job = $('#job-value').text();
	var salary = parseInt($('#salary-value').val())
	if (job == '職業') {
		displayError(true, {'msg': '尚未選擇職業！'});
		return false;
	} else if (job == '在職' && isNaN(salary)) {
		displayError(true, {'id':'salary', 'msg':'每月薪資填寫錯誤！'});
		return false;
	} else {
		displayError(false, {'id':'salary'});
	}

	// add to table
	

	// clear input area
	clearValue();
});

function clearValue() {
	$('#member-value').text('稱謂').append('<span class="caret"></span>');
	$('#job-value').text('職業').append('<span class="caret"></span>');
	$('#birthday-value').val('');
	$('#salary-value').val('');
	$('#salary-value').attr('disabled', true);
	$('#errormsg').hide();
}

function displayError(b, args) {
	if (b) {
		$('#' + args['id']).addClass('has-error');
		$('#errormsg').text(args['msg']).show();
	} else {
		$('#' + args['id']).removeClass('has-error');
		$('#errormsg').hide();
	}
}