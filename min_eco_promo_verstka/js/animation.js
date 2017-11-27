$(document).ready(function() {
	var windowWidthNew = $('body').width();
	var thisBlock;
		
	// White line
	var resizeTechno = $('#technologies').width();
	$('#title-line').css('width', resizeTechno + 'px');
	
	// Scroll menu
	$(window).load(function() {
	$('#toMap').click(function() {
		$('html, body').animate({ scrollTop: $('#seventh-block').offset().top }, 1000); 
	});
	$('#toVideo').click(function() {
		$('html, body').animate({ scrollTop: $('#eleventh-block').offset().top }, 1000); 
	});
	$('#toFaq').click(function() {
		$('html, body').animate({ scrollTop: $('#twelth-block').offset().top }, 1000); 
	});
	
	$(window).resize(function() {
	$('#toMap').click(function() {
		$('html, body').animate({ scrollTop: $('#seventh-block').offset().top }, 1000); 
	});
	$('#toVideo').click(function() {
		$('html, body').animate({ scrollTop: $('#eleventh-block').offset().top }, 1000); 
	});
	$('#toFaq').click(function() {
		$('html, body').animate({ scrollTop: $('#twelth-block').offset().top }, 1000); 
	});
	});	
	
	});
	
	// Scroll up
	$('#up').click(function() {
		$('html, body').animate({ scrollTop: $('#first-block').offset().top  }, 1000); 
	});
	if (windowWidthNew > 770) { 
		$(window).scroll(function() {
			var windowScroll = $(window).scrollTop();
			if (windowScroll > 1000) { 
				$('#up').css('display','block');
			}
			else {
				$('#up').css('display','none');
			}
		});
	}
	
	$('#six-button').click(function() {
		$('html, body').animate({ scrollTop: $('#nineth-block').offset().top }, 1000); 
	});
		
	if (windowWidthNew < 1000) {
		$('#six-button').html('ЧТО НАС ЖДЁТ<br/>В НЕДАЛЁКОМ БУДУЩЕМ? ');
	}
	
	// First block animation
	var firstBlockWidth = $('#first-block').width();
	var firstBlockHeight = $('#first-block').height();
    $('#first-black').css({'width':firstBlockWidth + 'px', 'height': firstBlockHeight + 'px'});
	setTimeout(function() { 
		$('#first-black').animate({opacity: '0'}, 3000);
		}, 3000);
		// Butterflies
		var view = 'left';	
			function butterfly(min, max) {
			function firstButterfly() {
				var thisWidth = $('#first-block').width();
				var thisHeight = $('#first-block').height();
				if (view == 'left') {
					$('#butterfly-new').css({'margin-left' : '-200px', 'margin-top' : '-600px', 'transform':'scaleX(1)'});
				}
				else {
					$('#butterfly-new').css({'margin-left' : '-200px', 'margin-top' : '-600px', 'transform':'scaleX(1)'});
				}
				view = 'left';
				setTimeout(function() { 
				$('#butterfly-new').animate({marginTop: '+=' + $('#first-block').height() + 'px', marginLeft:'+=' + $('#first-block').width() /2 + 'px'},7000);
				$('#butterfly-new').animate({marginTop:'-=500px', marginLeft:'+=' + $('#first-block').width() / 1.5 + 'px'},6000);
				}, 1000);
			}
			function secondButterfly() {
				var thisWidth = $('#first-block').width() - 300;
				if (view == 'right') {
					$('#butterfly-new').css({'margin-left':'-200px','margin-top':'50px', 'transform':'scaleX(1)'});
				}
				else {
					$('#butterfly-new').css({'margin-left':'-200px','margin-top':'50px', 'transform':'scaleX(1)'});
				}
				view = 'left';
				setTimeout(function() { $('#butterfly-new').animate({marginTop:'-=700px', marginLeft: '+=' + thisWidth + 'px'},13000) }, 1000);
			}
			function thirdButterfly() {
				var thisWidth = $('#first-block').width();
				var thisWidthBig = $('#first-block').width() + 200;
				if (view == 'left') {
					$('#butterfly-new').css({'margin-left' : thisWidth, 'margin-top' : '-500px','transform':'scaleX(-1)'});
				}
				else {
					$('#butterfly-new').css({'margin-left' : thisWidth, 'margin-top' : '-500px'});
				}
				view = 'right';
				setTimeout(function() { $('#butterfly-new').animate({marginTop:'+=700px', marginLeft: '-=' + thisWidthBig + 'px'},13000) }, 1000);
			}
			function fourthButterfly() {
				var thisWidth = $('#first-block').width();
				var thisWidthBig = $('#first-block').width() + 200;
				var thisHeight = $('#first-block').height() - 200;
				if (view == 'left') {
					$('#butterfly-new').css({'margin-left' : thisWidth + 'px', 'margin-top' : '50px','transform':'scaleX(-1)'});
				}
				else {
					$('#butterfly-new').css({'margin-top': '50px', 'margin-left' : thisWidth + 'px'});
				}
				view = 'right';
				setTimeout(function() { $('#butterfly-new').animate({marginTop:'-=700px', marginLeft: '-=' + thisWidthBig + 'px'},13000) }, 1000);
				
			}						
			var p = Math.floor(Math.random() * (max - min) + min);
			if (p == 0) {
				firstButterfly();
			}
			else if (p == 1) {
				secondButterfly();
			}
			else if (p == 2) {
				thirdButterfly();
			}
			else if (p == 3) {
				fourthButterfly();
			}
			else {
				console.log('Something else');
			}
			}
			butterfly(0, 3);
			setInterval(function() { butterfly(0, 3) }, 15000);	
	
	// White line resize
	$(window).resize(function() {
		var windowResizeNew = $('body').width();
		if (windowResizeNew < 1000) {
			$('#let110').css('display','none');
			$('#six-button').html('ЧТО НАС ЖДЁТ<br/>В НЕДАЛЁКОМ БУДУЩЕМ? ');		
		}
		if (windowResizeNew > 1000) {
			$('#let110').css('display','block');
			$('#six-button').html('ЧТО НАС ЖДЁТ В НЕДАЛЁКОМ БУДУЩЕМ? ');			
		}
		var resizeTechno = $('#technologies').width();
		$('#title-line').css('width', resizeTechno + 'px');
			// Анимация на ховер-блоке
		if (windowResizeNew > 1000) {
		$('.musor-block').hover(function() {
			var hoverSvg = $(this).find('svg').parent();
			thisBlock = $(hoverSvg).html();
			var hoverStyle = $(this).find('style');
			var hoverClassOld = $(hoverStyle).text();
			var hoverClass = hoverClassOld.substring(0,2);
			var hoverStyleNew = hoverClass + '{fill:#424242;}';
			$(hoverStyle).html(hoverStyleNew);
			$(hoverSvg).stop().animate({width: '135px', height: '135px'}, 'fast');
			if (hoverClass == '.a') {
				$('#leta').css('display','none');
				$('#leta').text('1 МЕСЯЦ');
				$('#leta').fadeIn(500);
			}
			if (hoverClass == '.b') {
				$('#leta').css('display','none');
				$('#leta').text('2 ГОДА');
				$('#leta').fadeIn(500);
			}
			if (hoverClass == '.c') {
				$('#leta').css('display','none');
				$('#leta').text('10 ЛЕТ');
				$('#leta').fadeIn(500);
			}
			if (hoverClass == '.s') {
				$('#leta').css('display','none');
				$('#leta').text('110 ЛЕТ');
				$('#leta').fadeIn(500);
			}
			if (hoverClass == '.e') {
				$('#leta').css('display','none');
				$('#leta').text('200 ЛЕТ');
				$('#leta').fadeIn(500);
			}
			if (hoverClass == '.f') {
				$('#leta').css('display','none');
				$('#leta').text('500 ЛЕТ');
				$('#leta').fadeIn(500);
			}
		},
		function() {
			var hoverSvg = $(this).find('svg').parent();
			var hoverHtml = $(hoverSvg).html();
			$(hoverSvg).html(thisBlock);
			$('#leta').text('1 МЕСЯЦ');
			$(hoverSvg).stop().animate({width: '125px', height: '125px'}, 'fast');
		});
	}					
	});
	
	// Hover block animation
	if (windowWidthNew > 1000) {
		$('.musor-block').hover(function() {
			var hoverSvg = $(this).find('svg').parent();
			thisBlock = $(hoverSvg).html();
			var hoverStyle = $(this).find('style');
			var hoverClassOld = $(hoverStyle).text();
			var hoverClass = hoverClassOld.substring(0,2);
			var hoverStyleNew = hoverClass + '{fill:#424242;}';
			$(hoverStyle).html(hoverStyleNew);
			$(hoverSvg).stop().animate({width: '135px', height: '135px'}, 'fast');
			if (hoverClass == '.a') {
				$('#leta').css('display','none');
				$('#leta').text('1 МЕСЯЦ');
				$('#leta').fadeIn(500);
			}
			if (hoverClass == '.b') {
				$('#leta').css('display','none');
				$('#leta').text('2 ГОДА');
				$('#leta').fadeIn(500);
			}
			if (hoverClass == '.c') {
				$('#leta').css('display','none');
				$('#leta').text('10 ЛЕТ');
				$('#leta').fadeIn(500);
			}
			if (hoverClass == '.s') {
				$('#leta').css('display','none');
				$('#leta').text('110 ЛЕТ');
				$('#leta').fadeIn(500);
			}
			if (hoverClass == '.e') {
				$('#leta').css('display','none');
				$('#leta').text('200 ЛЕТ');
				$('#leta').fadeIn(500);
			}
			if (hoverClass == '.f') {
				$('#leta').css('display','none');
				$('#leta').text('500 ЛЕТ');
				$('#leta').fadeIn(500);
			}
		},
		function() {
			var hoverSvg = $(this).find('svg').parent();
			var hoverHtml = $(hoverSvg).html();
			$(hoverSvg).html(thisBlock);
			$('#leta').text('1 МЕСЯЦ');
			$(hoverSvg).stop().animate({width: '125px', height: '125px'}, 'fast');
		});
	}
	
	// Cars
	$(window).load(function() {
	var moscowWidth = 0;
	var podmoscovieWidth = 0;
	function moscowCars() {
		moscowWidth += 1000;
		$('#moscow-cars-image').css({'width': moscowWidth + 300 + 'px'});	
		var moscowLeft = $('#moscow-cars').offset().left;
		$('#moscow-cars-left').css('left', moscowLeft + 'px');
		$('#moscow-cars-left').css('display', 'block');
		$('#moscow-cars-right').css('left', moscowLeft + 230 + 'px');
		$('#moscow-cars-right').css('display', 'block');
		$('#moscow-cars-image').animate({marginLeft: '-' + moscowWidth + 'px' }, 15000);
	}
	moscowCars();
	setInterval(function() { moscowCars() }, 15000);	
	function podmoscovieCars() {
			podmoscovieWidth += 1000;
			if (podmoscovieWidth > 3000) {
			$('#podmoscovie-cars-image').css({'width': podmoscovieWidth + 100 + 'px'});
			var podmoscovieLeft = $('#podmoscovie-cars').offset().left;
			$('#podmoscovie-cars-left').css('left', podmoscovieLeft);
			$('#podmoscovie-cars-left').css('display','block');
			$('#podmoscovie-cars-right').css('left', podmoscovieLeft + 110 + 'px');
			$('#podmoscovie-cars-right').css('display','block');
			$('#podmoscovie-cars-image').stop().animate({marginLeft: '-' + podmoscovieWidth + 'px'}, 15000);
			}			
		/*else {
		$('#podmoscovie-cars-image').css({'width': podmoscovieWidth + 100 + 'px'});	
		var podmoscovieLeft = $('#podmoscovie-cars').offset().left;
		$('#podmoscovie-cars-left').css('left', podmoscovieLeft);
		$('#podmoscovie-cars-left').css('display','block');
		$('#podmoscovie-cars-right').css('left', podmoscovieLeft + 110 + 'px');
		$('#podmoscovie-cars-right').css('display','block');
		$('#podmoscovie-cars-image').animate({marginLeft: '-' + podmoscovieWidth + 'px'}, 15000);
		}*/
	}
	podmoscovieCars();
	setInterval(function() { podmoscovieCars() }, 15000);	
	$(window).resize(function() {
		var moscowLeft = $('#moscow-cars').offset().left;
		var podmoscovieLeft = $('#podmoscovie-cars').offset().left;
		$('#moscow-cars-left').css('left', moscowLeft + 'px');
		$('#moscow-cars-left').css('display', 'block');
		$('#moscow-cars-right').css('left', moscowLeft + 230 + 'px');
		$('#moscow-cars-right').css('display', 'block');
		$('#podmoscovie-cars-left').css('left', podmoscovieLeft);
		$('#podmoscovie-cars-left').css('display','block');
		$('#podmoscovie-cars-right').css('left', podmoscovieLeft + 110 + 'px');
		$('#podmoscovie-cars-right').css('display','block');
	});	
	});

		var podmoscovieLeft = $('#podmoscovie-cars').offset().left;
		$('#podmoscovie-cars-left').css('left', podmoscovieLeft);
		$('#podmoscovie-cars-left').css('display','block');
		$('#podmoscovie-cars-right').css('left', podmoscovieLeft + 110 + 'px');
		$('#podmoscovie-cars-right').css('display','block');
		$('#podmoscovie-cars-image').animate({marginLeft: '-1000px'}, 15000).animate({marginLeft: '-2000px'}, 15000).animate({marginLeft: '-2900px'}, 15000);
	
	// Questions and answers
	$(".question-text").click(function() {
		if ($(this).find('.fade-box').is(':hidden')) {
			$(this).find('.fade-box').fadeIn();
			$(this).css('color','#424242');
			$(this).find('.gal').html('<img src="img/minigal.png" />');
		}
		else if ($(this).find('.fade-box').is(":visible")) {
			$(this).find('.fade-box').fadeOut();
			$(this).css('color','#2dc44a');
			$(this).find('.gal').html('>');
		}
		else {
			
		}
	});
	
	// Modal boxes
	$('.image-popup-vertical-fit').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-img-mobile',
		image: {
			verticalFit: true
		}		
	});

	$('.image-popup-fit-width').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		image: {
			verticalFit: false
		}
	});

	$('.image-popup-no-margins').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		}
	});
	
});	