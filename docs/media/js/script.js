$(document).ready(function() {

	valid=0;
	$('#mobile-menu button').click(function(){
		$('#menu').slideToggle();
	});
	
	Searchbox();
	
	$('#donate').click(function(){
		var value = $('#slide').val();
		console.log(value);
		if(value>0)
		{
			$('#personal-data').slideDown();
		}
		else{
			console.log('you didn\'t pick amount');
		}
	});
	
	$('.form-el input').blur(function() {
		Checkinputs();
	});
	
	Checkcreditcard();
	ChangeSlider();
	
	$('#slide').on('input change',function() {
		var current = $(this).val();
		meter=current-3;
		console.log(current+'%');
		$('#volume').text('$'+current).css('left',meter+'%');
		$('#progress-bar').css('width',current+'%');
	});
	
});

function Checkinputs() {
	$('.form-el input').each(function(el,i) {
		if ( $(this).val() === '') {
			$(this).parent().find('p').css('visibility','visible');
			$(this).addClass('error');
			return false;
		}
		else if( $(this).attr('id') == 'email-address'){
			CheckEmailinput();
		}
		else if( $(this).attr('id') == 'city'){
			CheckCityStateinput();
		}
		else {
			$(this).removeClass('error');
			$(this).parent().find('p').css('visibility','hidden');
			return true;
		}
		if(!$(this).hasClass('error'))
		{
			valid=valid+1;
			console.log(valid);
		}
		if(valid==4)
		{
			$('#credit-card').slideDown();
		}
	});
}

function Checkcreditcard(){
	$('#credit-card input').on('change',function(){
	var value=$(this).val();
	var patt= new RegExp(/^[0-9]{16}$/);
	if($(this).attr('id')=='initial' && value.match(patt))
	{
		$('#filled').text('7820');
		$(this).css('padding-left',174);
		$(this).attr('maxlength',5);
		$(this).attr('placeholder','MM/YY CVV ZIP').css('background-image', 'url("media/images/card-step2.jpg")');
		$(this).parent().find('p').html('Please enter your\'s card expiration month and year');
		$(this).attr('id','step2');
		$(this).addClass('step-finish');
		$(this).val('');
		return true;
	}
		patt=new RegExp(/^(0[1-9]|1[012])\/\d{2}$/);
		$(this).attr('pattern','/^(0[1-9]|1[012])\/\d{2}$/');
	if($(this).attr('id') =='step2' && value.match(patt))
	{
		$('#filled').text('0000 05/20 |');
		$(this).css('padding-left',434);
		$('#filled').css('width',392);
		$('#filled').css('word-spacing',98);
		$(this).attr('maxlength',3);
		$(this).attr('placeholder','ZIP').css('background-image', 'url("media/images/card-step3.jpg")');;
		$(this).parent().find('p').html('Please enter the three-digit CVV number found on the back of your card');
		$(this).attr('id','step3');
		$(this).val('');
		return true;
	}
		patt= new RegExp(/^[0-9]{3}$/);
		$(this).attr('pattern','/^[0-9]{3}$/');
	if($(this).attr('id') =='step3' && value.match(patt))
	{
		$('#filled').text('0000 05/20 234 09876');
		$('#filled').css('width',450);
		$('#filled').css('word-spacing',96);
		$(this).attr('placeholder','').css('background-image', 'url("media/images/card-step2.jpg")');
		$(this).addClass('success');
		$(this).parent().find('p').html('Hooray! You\'ve successfully filled out your credit card information');
		$(this).parent().find('p').addClass('success');
		$(this).attr('id','step4');
		$(this).val('');
		return true;
	}	
});
}

function ChangeSlider() {
	$('#meter input').on('input change',function() { /*change event was needed for ie only to update input range control */
		var value = $(this).val();
		
		if(value<=20)
		{
			$('#content p.first').html('<span class="dolar">$'+value+'</span> will let us to add a few new modules');
		}
		if((value>=21) && (value<=50))
		{
			$('#content p.first').html('<span class="dolar">$'+value+'</span> can help us improve this product');
		}
		if((value>=51) && (value<=80))
		{
			$('#content p.first').html('<span class="dolar">$'+value+'</span> can help us expand this product to other platforms');
		}
		if((value>=81) && (value<=100))
		{
			$('#content p.first').html('<span class="dolar">$'+value+'</span> goes a long way. If you \'d like to consider becoming a sponsor, please contact us');
		}	
	});
}

function CheckEmailinput(){
var patt = new RegExp(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$/);
var value = $('#email-address').val();
		if(value !='' && value.match(patt))
		{
			console.log('correct email');
			$('#email-address').removeClass('error');
			$('#email-address').parent().find('p').css('visibility','hidden');
		}
		else{
			console.log('error pattern input email');
			$('#email-address').addClass('error');
			$('#email-address').parent().find('p').css('visibility','visible');
		}
}
	
function CheckCityStateinput(){
var patt = new RegExp(/([\w\s]+),\s(\w+)/);
var value = $('#city').val();
		if(value !='' && value.match(patt))
		{
			console.log('correct City, state');
			$('#city').removeClass('error');
			$('#city').parent().find('p').css('visibility','hidden');
		}
		else{
			console.log('error pattern input City, state');
			$('#city').addClass('error');
			$('#city').parent().find('p').css('visibility','visible');
		}
}

function Searchbox() {
$("#search button").click(function() {
	$('#search-form').css('display','inline-block');
	$('#search-form input').focus();
	if($('#search-form input').val()=='')
	{
		$('#search-form').mouseout(function(){
			$('#search-form').css('display','none');
		});
	}
	else
	{
		$("#search button").click(function() {
			$('#searchform').submit();
		});
	}
});
}
