$(document).ready(function() {
	
	var windowWidth = $(window).width();	
	$('#close').click(function() {			
		$(this).css('display','none');
				
		$('#menu-ul-tablet').fadeOut();
	});	
	
	// Top menu
	if (windowWidth > 1300) {
		$('#top-menu').html('<ul id="menu"> <li> <a id="toMap"> КАРТА МО </a> </li> <li> <a id="toVideo"> ВИДЕО </a> </li> <li> <a id="toFaq"> ЭКООБРАЗОВАНИЕ </a> </li></ul>');
	}

	else if (windowWidth < 1300 && windowWidth > 1000) {
		$('#menu').css('display','none');
		$('#menu-mini').css('display','block');
		$('#top-menu').html('<div id="menu-mini"> </div> <ul id="menu-ul-tablet">  <li> <a id="toMap"> КАРТА МО </a> </li> <li> <a id="toVideo"> ВИДЕО </a> </li> <li> <a id="toFaq"> ЭКООБРАЗОВАНИЕ </a> </li> </ul>');
		$('#menu-mini').click(function() {
				$('#menu-ul-tablet').fadeToggle();
		});
	}
	
	else if (windowWidth < 1000 && windowWidth > 770&& windowWidth > 770) {
		var mHeight = windowWidth - 100 + 'px';
		var mHeight2 = windowWidth - 200 + 'px';
		$('#menu').css('display','none');
		$('#top-menu').html('<div id="menu-mini"> </div> <ul id="menu-ul-tablet">  <li> <a id="toMap"> КАРТА МО </a> </li> <li> <a id="toVideo"> ВИДЕО </a> </li> <li> <a id="toFaq"> ЭКООБРАЗОВАНИЕ </a> </li> </ul>');
		$('#menu-mini').css({'display':'block', 'position':'absolute', 'top':'-130px', 'left': mHeight,  'height':'230px;'});			
		$('#menu-ul-tablet').css({'top':'-100px','left':mHeight2});
		$('#menu-mini').click(function() {
			$('#menu-ul-tablet').fadeToggle();
		});		
	}

	else if (windowWidth < 770 && windowWidth > 400) {	
		$('#nineimage').attr('src', 'img/nineimage-mobile.jpg');		
		$('#nineimage').css('margin','0 auto');		
		$('#menu').css('display','none');
		$('#top-menu').html('<div id="menu-mini"> </div> <ul id="menu-ul-tablet">  <li> <a id="toMap"> КАРТА МО </a> </li> <li> <a id="toVideo"> ВИДЕО </a> </li> <li> <a id="toFaq"> ЭКООБРАЗОВАНИЕ </a> </li> </ul> ');
		$('#menu-mini').css({'display':'block', 'position':'absolute', 'top':'-200px', 'right':'10px',  'height':'220px;'});
		$('#menu-mini').click(function() {
			$('#menu-ul-tablet').css({'position':'absolute','width':'110%', 'height':'220px', 'top':' -200px', 'z-index':'1000', 'text-align': 'center', 'margin-left':'-40px','margin-top':'-30px'});
			$('#menu-ul-tablet').fadeIn();
			$('#close').css({'display':'block', 'top':'-220px'});
		});
	}
	
	else if (windowWidth < 400) {	
		$('#nineimage').attr('src', 'img/nineimage-mobile.jpg');		
		$('#nineimage').css('margin','0 auto');	
		$('#menu').css('display','none');
		$('#top-menu').html('<div id="menu-mini"> </div> <ul id="menu-ul-tablet"> <li> <a id="toMap"> КАРТА МО </a> </li> <li> <a id="toVideo"> ВИДЕО </a> </li> <li> <a id="toFaq"> ЭКООБРАЗОВАНИЕ </a> </li> </ul>');
		$('#menu-mini').css({'display':'block', 'position':'absolute', 'top':'-200px', 'right':'10px',  'height':'220px;'});
		$('#menu-mini').click(function() {
			$('#menu-ul-tablet').css({'position':'absolute','width':'115%', 'height':'220px', 'top':'-200px', 'z-index':'1000', 'text-align': 'center', 'margin-left':'-30px','margin-top':'-30px'});
			$('#menu-ul-tablet').fadeIn();
			$('#close').css({'display':'block', 'top':'-220px'});
		});
	}

	else {
		console.log('Something else');
	}	

	$(window).resize(function() {
		windowWidth = $(window).width();
		if (windowWidth > 1300) {
			$('#top-menu').html('<ul id="menu">  <li> <a id="toMap"> КАРТА МО </a> </li> <li> <a id="toVideo"> ВИДЕО </a> </li> <li> <a id="toFaq"> ЭКООБРАЗОВАНИЕ </a> </li> </ul>');
		}

		if (windowWidth < 1300 && windowWidth > 770) {
			$('#close').css('display','none');
			$('#menu').css('display','none');
			$('#menu-mini').css('display','block');
			$('#top-menu').html('<div id="menu-mini"> </div> <ul id="menu-ul-tablet">  <li> <a id="toMap"> КАРТА МО </a> </li> <li> <a id="toVideo"> ВИДЕО </a> </li> <li> <a id="toFaq"> ЭКООБРАЗОВАНИЕ </a> </li> </ul>');
			$('#menu-mini').click(function() {
					$('#menu-ul-tablet').fadeToggle();
			});
		}
		
		if (windowWidth < 1000 && windowWidth > 770) {		
			$('#nineimage').attr('src', 'img/nineimage.jpg');	
			$('#nineimage').css('margin','0 auto');		
			var mHeight = windowWidth - 100 + 'px';
			var mHeight2 = windowWidth - 200 + 'px';
			$('#menu').css('display','none');
			$('#top-menu').html('<div id="menu-mini"> </div> <ul id="menu-ul-tablet">  <li> <a id="toMap"> КАРТА МО </a> </li> <li> <a id="toVideo"> ВИДЕО </a> </li> <li> <a id="toFaq"> ЭКООБРАЗОВАНИЕ </a> </li> </ul>');
			$('#menu-mini').css({'display':'block', 'position':'absolute', 'top':'-130px', 'left': mHeight,  'height':'230px;'});			
			$('#menu-ul-tablet').css({'top':'-100px','left':mHeight2});
			$('#menu-mini').click(function() {
				$('#menu-ul-tablet').fadeToggle();
			});		
		}
		
		if (windowWidth > 950 ) {
			$('.musor-year').css('display','none');
			$('.separator').css('display','none');
			$('.musor-text').css('display','none');
		}

		if (windowWidth < 770 && windowWidth > 400) {
			if ($('#menu-ul-tablet').attr('class') !== 'active') {			
				$('#nineimage').attr('src', 'img/nineimage-mobile.jpg');		
				$('#nineimage').css('margin','0 auto');
				$('#menu').css('display','none');
				$('#top-menu').html('<div id="menu-mini"> </div> <ul id="menu-ul-tablet">  <li> <a id="toMap"> КАРТА МО </a> </li> <li> <a id="toVideo"> ВИДЕО </a> </li> <li> <a id="toFaq"> ЭКООБРАЗОВАНИЕ </a> </li>  </ul>');
				$('#menu-mini').css({'display':'block', 'position':'absolute', 'top':'-200px', 'right':'10px'});				
				$('#close').css({'display':'none'});
				$('#menu-mini').click(function() {
					$('#menu-ul-tablet').css({'position':'absolute','width':'110%', 'height':'220px', 'top':'-200px', 'z-index':'1000', 'text-align': 'center', 'margin-left':'-40px','margin-top':'-30px'});
					$('#menu-ul-tablet').attr('class', 'active');
					$('#menu-ul-tablet').fadeIn();
					$('#close').css({'display':'block', 'top':'-220px'});
				});
			}			
		}
		
		if (windowWidth < 400) {
			if ($('#menu-ul-tablet').attr('class') !== 'active') {			
				$('#nineimage').attr('src', 'img/nineimage-mobile.jpg');		
				$('#nineimage').css('margin','0 auto');
				$('#menu').css('display','none');
				$('#top-menu').html('<div id="menu-mini"> </div> <ul id="menu-ul-tablet">  <li> <a id="toMap"> КАРТА МО </a> </li> <li> <a id="toVideo"> ВИДЕО </a> </li> <li> <a id="toFaq"> ЭКООБРАЗОВАНИЕ </a> </li>  </ul>');
				$('#menu-mini').css({'display':'block', 'position':'absolute', 'top':'-200px', 'right':'10px'});				
				$('#close').css({'display':'none'});
				$('#menu-mini').click(function() {
					$('#menu-ul-tablet').css({'position':'absolute','width':'110%', 'height':'220px', 'top':'-200px', 'z-index':'1000', 'text-align': 'center', 'margin-left':'-20px','margin-top':'-30px'});
					$('#menu-ul-tablet').attr('class', 'active');
					$('#menu-ul-tablet').fadeIn();
					$('#close').css({'display':'block', 'top':'-220px'});
					});
			}			
		}

		// Hover orange block resize		
		if (windowWidth > 1500) {			
			$('.musor-block:eq(0)').css({'background':'url(img/orange-big.png) no-repeat', 'position':'absolute', 'z-index':'1000'});		
			$('.separator:eq(0)').css('display','block');		
			$('.musor-text:eq(0)').css('display','block');
		
		$('.musor-block').hover(function() {		
			$('.musor-block:eq(0)').css({'background':'none', 'position':'relative'});		
			$('.separator:eq(0)').css('display','none');		
			$('.musor-text:eq(0)').css('display','none');
			$(this).css({'background':'url(img/orange-big.png) no-repeat', 'position':'absolute', 'z-index':'1000'});
			$(this).find('.separator').css('display','block');
			$(this).find('.musor-text').css('display','block');
		},

		function() {			
			$('.musor-block:eq(0)').css({'background':'none', 'position':'relative'});
			$('.separator:eq(0)').css('display','none');		
			$('.musor-text:eq(0)').css('display','none');
			$(this).css({'background':'none', 'position':'relative'});
			$(this).find('.separator').css('display','none');
			$(this).find('.musor-text').css('display','none');			
			$('.musor-block:eq(0)').css({'background':'url(img/orange-big.png) no-repeat', 'position':'absolute', 'z-index':'1000'});		
			$('.separator:eq(0)').css('display','block');		
			$('.musor-text:eq(0)').css('display','block');
		});
		}

		else if (windowWidth > 1300 && windowWidth < 1500) {							
			$('.musor-block:eq(0)').css({'background':'url(img/orange-mid.png) no-repeat', 'position':'absolute', 'z-index':'1000'});		
			$('.separator:eq(0)').css('display','block');		
			$('.musor-text:eq(0)').css('display','block');	
			$('.musor-block').hover(function() {			
				$('.musor-block:eq(0)').css({'background':'none', 'position':'relative'});		
				$('.separator:eq(0)').css('display','none');	
				$('.musor-text:eq(0)').css('display','none');
				$(this).css({'background':'url(img/orange-mid.png) no-repeat', 'position':'absolute', 'z-index':'1000'});
				$(this).find('.separator').css('display','block');
				$(this).find('.musor-text').css('display','block');
			},

		function() {
			$(this).css({'background':'none', 'position':'relative'});
			$(this).find('.separator').css('display','none');
			$(this).find('.musor-text').css('display','none');
			$('.musor-block:eq(0)').css({'background':'url(img/orange-mid.png) no-repeat', 'position':'absolute', 'z-index':'1000'});		
			$('.separator:eq(0)').css('display','block');
			$('.musor-text:eq(0)').css('display','block');
		});
		}
		
		else if (windowWidth < 1300 && windowWidth > 1000) {		
			$('.separator').css('display','none');
			$('.musor-year').css('display','none');
			$('.musor-text').css('display','none');				
			$('.musor-block:eq(0)').css({'background':'url(img/orange-mid.png) no-repeat', 'position':'absolute', 'z-index':'1000'});		
			$('.separator:eq(0)').css('display','block');		
			$('.musor-text:eq(0)').css('display','block');		
			$('.musor-block').hover(function() {			
				$('.musor-block:eq(0)').css({'background':'none', 'position':'relative'});		
				$('.separator:eq(0)').css('display','none');		
				$('.musor-text:eq(0)').css('display','none');
				$(this).css({'background':'url(img/orange-mid.png) no-repeat',  'position':'absolute', 'z-index':'1000'});
				$(this).find('.separator').css('display','block');
				$(this).find('.musor-text').css('display','block');
			},

		function() {
			$(this).css({'background':'none', 'position':'relative'});
			$(this).find('.separator').css('display','none');
			$(this).find('.musor-text').css('display','none');	
			$('.separator').css('display','none');
			$('.musor-year').css('display','none');
			$('.musor-text').css('display','none');				
			$('.musor-block:eq(0)').css({'background':'url(img/orange-mid.png) no-repeat', 'position':'absolute', 'z-index':'1000'});		
			$('.separator:eq(0)').css('display','block');		
			$('.musor-text:eq(0)').css('display','block');
		});
	}

		else if (windowWidth < 1000) {			
		$('.musor-block:eq(0)').css({'background':'none', 'position':'relative'});
		$('.musor-block').hover(function() {
			$(this).css({'background':'none', 'position':'relative'});
			$(this).find('.musor-text').css('display','block');
			$(this).find('.separator').css('display','block');
			$(this).find('.musor-text').css('display','block');	
		},
		function() {		
			$('.musor-block:eq(0)').css({'background':'none', 'position':'relative'});
			$('.separator').css('display','block');
			$('.musor-year').css('display','block');
			$('.musor-text').css('display','block');
		});		
		$('.musor-block:eq(0)').css({'background':'none', 'position':'relative'});
		$('.separator').css('display','block');
		$('.musor-year').css('display','block');
		$('.musor-text').css('display','block');
		}			
		else {

		}		
	});	

	// Hover orange block
	if (windowWidth > 1500) {		
		$('.musor-block:eq(0)').css({'background':'url(img/orange-big.png) no-repeat', 'position':'absolute', 'z-index':'1000'});		
		$('.separator:eq(0)').css('display','block');		
		$('.musor-text:eq(0)').css('display','block');
		$('.musor-block').hover(function() {			
			$('.musor-block:eq(0)').css({'background':'none', 'position':'relative'});			
			$('.separator:eq(0)').css('display','none');		
			$('.musor-text:eq(0)').css('display','none');
			$(this).css({'background':'url(img/orange-big.png) no-repeat', 'position':'absolute', 'z-index':'1000'});
			$(this).find('.separator').css('display','block');
			$(this).find('.musor-text').css('display','block');
		},

		function() {
			$(this).css({'background':'none', 'position':'relative'});
			$(this).find('.separator').css('display','none');
			$(this).find('.musor-text').css('display','none');			
			$('.musor-block:eq(0)').css({'background':'url(img/orange-big.png) no-repeat', 'position':'absolute', 'z-index':'1000'});	
			$('.separator:eq(0)').css('display','block');		
			$('.musor-text:eq(0)').css('display','block');
		});
	}
	
	else if (windowWidth < 1500 && windowWidth > 1300) {		
		$('.musor-block:eq(0)').css({'background':'url(img/orange-mid.png) no-repeat', 'position':'absolute', 'z-index':'1000'});		
		$('.separator:eq(0)').css('display','block');		
		$('.musor-text:eq(0)').css('display','block');		
		$('.musor-block').hover(function() {		
			$('.musor-block:eq(0)').css({'background':'none', 'position':'relative'});		
			$('.separator:eq(0)').css('display','none');	
			$('.musor-text:eq(0)').css('display','none');
			$(this).css({'background':'url(img/orange-mid.png) no-repeat',  'position':'absolute', 'z-index':'1000'});
			$(this).find('.separator').css('display','block');
			$(this).find('.musor-text').css('display','block');
		},

		function() {
			$(this).css({'background':'none', 'position': 'relative'});
			$(this).find('.separator').css('display','none');
			$(this).find('.musor-text').css('display','none');			
			$('.musor-block:eq(0)').css({'background':'url(img/orange-mid.png) no-repeat', 'position':'absolute', 'z-index':'1000'});		
			$('.separator:eq(0)').css('display','block');		
			$('.musor-text:eq(0)').css('display','block');
		});
	}
	
		else if (windowWidth < 1300 && windowWidth > 1000) {		
			$('.musor-block:eq(0)').css({'background':'url(img/orange-mid.png) no-repeat', 'position':'absolute', 'z-index':'1000'});		
			$('.separator:eq(0)').css('display','block');		
			$('.musor-text:eq(0)').css('display','block');		
			$('.musor-block').hover(function() {			
				$('.musor-block:eq(0)').css({'background':'none', 'position':'relative'});			
				$('.separator:eq(0)').css('display','none');		
				$('.musor-text:eq(0)').css('display','none');
				$(this).css({'background':'url(img/orange-mid.png) no-repeat',  'position':'absolute', 'z-index':'1000'});
				$(this).find('.separator').css('display','block');
				$(this).find('.musor-text').css('display','block');
			},

		function() {
			$(this).css({'background':'none', 'position': 'relative'});
			$(this).find('.separator').css('display','none');
			$(this).find('.musor-text').css('display','none');			
			$('.musor-block:eq(0)').css({'background':'url(img/orange-mid.png) no-repeat', 'position':'absolute', 'z-index':'1000'});		
			$('.separator:eq(0)').css('display','block');		
			$('.musor-text:eq(0)').css('display','block');
		});
	}

	else if (windowWidth < 1000) {		
		$('.musor-block:eq(0)').css({'background':'none', 'position':'relative'});
		$('.musor-img').hover(function() {
			$(this).css('background','none');
			$(this).find('.musor-text').css('display','block');
			$(this).find('.separator').css('display','block');
			$(this).find('.musor-text').css('display','block');	
		});
		$('.separator').css('display','block');
		$('.musor-year').css('display','block');
		$('.musor-text').css('display','block');
	}

	else {
		console.log('Something else');
	}	


	// Footer
	if (windowWidth < 1000) {
		$('#sixteenth-block').html('<div class="container"> <div class="row"><div id="social"> <a href="#"><i class="fa fa-facebook-square fa-2x" aria-hidden="true"></i></a> <a href="#"><i class="fa fa-youtube fa-2x" aria-hidden="true"></i></a> <a href="#"><i class="fa fa-instagram fa-2x" aria-hidden="true"></i></a> </div>  </div> <div id="copywrite"> © Все права защищены </div> </div> </div>');
	}
});