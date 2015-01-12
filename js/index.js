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

$('#other li').click(function() {
	var value = this.children[0].text.length > 20 ? this.children[0].text.substring(0, 30) + '...' : this.children[0].text;
	$('#other-value').text(value).append('<span class="caret"></span>');
});

$('#asset li').click(function() {
	$('#asset-value').text(this.children[0].text).append('<span class="caret"></span>');
});

$('#addmember').click(function() {
	// validation
	var member = $('#member-value').text();
	if (member == '稱謂') {
		displayError(true, {'msg':'尚未選擇家庭成員！'});
		return false;
	}

	var age = new Date().getFullYear() - (!isNaN($('#birthday-value').val()) && $('#birthday-value').val() != "" ? 1911 + parseInt($('#birthday-value').val()) : new Date().getFullYear());
	if (age <= 0) {
		displayError(true, {'id':'birthday', 'msg':'出生年次填寫錯誤！'});
		return false;
	} else {
		displayError(false, {'id':'birthday'});
	}

	var job = $('#job-value').text();
	var salary = parseInt($('#salary-value').val()) * 12;
	if (job == '職業') {
		displayError(true, {'msg': '尚未選擇職業！'});
		return false;
	} else if (job == '在職' && isNaN(salary)) {
		displayError(true, {'id':'salary', 'msg':'每月薪資填寫錯誤！'});
		return false;
	} else {
		displayError(false, {'id':'salary'});
	}

	//var disability = $('#disability').prop('checked');
	var other = $('#other-value').text() == '特殊狀況' ? '' : $('#other-value').text();

	// process comment
	var comment = '';
	if (isNaN(salary)) {
		if (job == '在學') {
			comment = '根據"服兵役役男家屬生活扶助實施辦法 <a href="http://rockers7414.github.io/SMSLifeHelp/lifehelp.html#rule6" target="_blank">第6條</a> 第五款 就讀大學校院博士班、空中大學、空中專科、進修補習學校、遠距教學以外之在學學生，致不能工作。"，不計算其工作收入。';
		} else if (job == '無業') {
			if (age > 55 || age < 16) {
				comment = '根據"服兵役役男家屬生活扶助實施辦法 <a href="http://rockers7414.github.io/SMSLifeHelp/lifehelp.html#rule6" target="_blank">第6條</a> 第一款 五十五歲以上或十六歲以下而無固定收入。"，不計算其工作收入。';
			} else if (other != '') {
				switch (other.substring(0, 4)) {
					case '身心障礙':
						comment = '根據"服兵役役男家屬生活扶助實施辦法 <a href="http://rockers7414.github.io/SMSLifeHelp/lifehelp.html#rule6" target="_blank">第6條</a> 第二款 身心障礙致不能工作。"，不計算其工作收入。';
						break;
					case '罹患嚴重':
						comment = '根據"服兵役役男家屬生活扶助實施辦法 <a href="http://rockers7414.github.io/SMSLifeHelp/lifehelp.html#rule6" target="_blank">第6條</a> 第三款 罹患嚴重傷、病，在三個月內無法痊癒，致不能工作。"，不計算其工作收入。';
						break;
					case '照顧無法':
						comment = '根據"服兵役役男家屬生活扶助實施辦法 <a href="http://rockers7414.github.io/SMSLifeHelp/lifehelp.html#rule6" target="_blank">第6條</a> 第四款 照顧無法自理生活身心障礙者或罹患嚴重傷、病，在三個月內無法痊癒之扶養親屬，致不能工作。"，不計算其工作收入。';
						break;
					case '獨自照顧':
						comment = '根據"服兵役役男家屬生活扶助實施辦法 <a href="http://rockers7414.github.io/SMSLifeHelp/lifehelp.html#rule6" target="_blank">第6條</a> 第六款 獨自照顧六十五歲以上老人或扶養六歲以下直系血親卑親屬，致不能工作。"，不計算其工作收入。';
						break;
					case '婦女懷孕':
						comment = '根據"服兵役役男家屬生活扶助實施辦法 <a href="http://rockers7414.github.io/SMSLifeHelp/lifehelp.html#rule6" target="_blank">第6條</a> 第七款 婦女懷孕致不能工作。"，不計算其工作收入。';
						break;
					case '其他經直':
						comment = '根據"服兵役役男家屬生活扶助實施辦法 <a href="http://rockers7414.github.io/SMSLifeHelp/lifehelp.html#rule6" target="_blank">第6條</a> 第八款 其他經直轄市、縣（市）主管機關依事實認定具有無法工作之特殊情形。"，不計算其工作收入。';
						break;
				}
			} else {
				// TODO: 利用變數取代基本工資
				comment = '根據"服兵役役男家屬生活扶助實施辦法 <a href="http://rockers7414.github.io/SMSLifeHelp/lifehelp.html#rule7" target="_blank">第7條</a> 役男家屬具有工作能力而未就業者，鄉 (鎮、市、區) 公所應列冊送當地公營職業訓練機構或國民就業輔導單位協助就業，使其自行營生。"，應以基本工資每月$19273核算。';
				salary = 19273 * 12;
			}
		}
	} else if (salary < 19273 * 12) { // TODO: 利用變數取代基本工資
		comment = '根據"服兵役役男家屬生活扶助實施辦法 <a href="http://rockers7414.github.io/SMSLifeHelp/lifehelp.html#rule4" target="_blank">第4條</a> 第一款 以當年度各行職業薪資證明之實際所得計算；無薪資證明者，依最近一年度之財稅資料所列工作收入核算。但最近一年之財稅資料低於基本工資時，以基本工資核算。';
		salary = 19273 * 12;
	}

	// append to table
	var row = $('<tr' + (comment == '' ? '' : ' class="info"') + '><td>' + member + '</td>'
					+ '<td>' + age + '</td>'
					+ '<td>' + job + '</td>'
					+ '<td>' + salary + '</td>'
					+ '<td>' + (other != '' ? '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>' : '') + '</td>'
					+ '<td>' + comment + '</td>'
					+ '<td><button type="button" class="btn btn-default btn-xs" aria-label="Left Align" id="removemember"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></td></tr>').hide();
	$('#family tbody').append(row);
	row.fadeIn('slow');

	// clear input area
	clearValue();

	// summary
	totalSalary();
});

$('body').delegate('#removemember', 'click', function() {
	$(this).closest('tr').remove();
	totalSalary();
});

function clearValue() {
	$('#member-value').text('稱謂').append('<span class="caret"></span>');
	$('#job-value').text('職業').append('<span class="caret"></span>');
	$('#birthday-value').val('');
	$('#salary-value').val('');
	$('#salary-value').attr('disabled', true);
	$('#disability').prop('checked', false);
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

function totalSalary() {
	var sum = 0;
	$('#family tbody').find('tr').each(function() {
		if (!isNaN($(this.cells[3]).text())) {
			sum += parseInt($(this.cells[3]).text());
		}
	});
	$('#sumsalary').text(sum);
}