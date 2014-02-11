/*
*
* iPhoneAutoScroll, used in conjunction with Pure CSS iPhone5 to auto scroll an image.
* by Daniel J. Henderson - hendeweb@gmail.com @HendersonDesign
* Requires the latest jQuery
* Version 1.0.0
* Created January 2014
*
*/
$(function() {
	var $doc = $(document);
	$doc.on( "click", '.screen', function(){
		//declare vars
		var iPhoneH = $('.thescreen img').height(),
			to = "",
			self = $(this),
			theScreen = self.find(".thescreen"),
			thisScreenid = self.find(".thescreen").attr('id'),
			isAnimating = theScreen.is(':animated'),
			thisPlayOverlay = self.find(".screen-click-btn");
		thisPlayOverlay.fadeOut();
		if(thisScreenid == null){
			//if no id, set the ids. Adds support for multiple iPhones on the same page.
			var c = 0;
			$('.thescreen').each(function() {
				c++;
				$(this).attr('id','screen'+c);
			});
			var newid = $(this).find(".thescreen").attr('id');
			//trigger iPhoneScroll Animation
				iPhoneScroll(newid);
		}
		else{
			//ids are set
			var newid = $(this).find(".thescreen").attr('id');
			if(isAnimating == true){
			//Currently Animating Clear the Animation
				clearAnimation(newid);
				thisPlayOverlay.fadeIn();
			}
			else{
			//trigger iPhoneScroll Animation
				iPhoneScroll(newid);
			}	
		}
		//iPhoneScroll Function
		function iPhoneScroll (a){
			var a = $('#'+a);
			animateCheck(a)
			//Que up animations based on scroll height of image
			for(i = 0;i<=3;i++){
				to = (iPhoneH / 4)*i+'px';
					a.animate({scrollTop: to},1500, 'swing');
				if (i >= 3){
					a.animate({scrollTop: "0px"},1300, 'swing');
				}
			}
		}
		//Clear Animation Que. Up to 10 ques.
		function clearAnimation(n){
			var n = $('#'+n);
			var clearAnimate = setInterval(function(){
				n.stop();
			},100);
			setTimeout(function() {
				clearInterval(clearAnimate);
			},1000);
		}
		//check for 10 seconds every second if animation is running. Fade in play button if not.
		function animateCheck(b){
			var animateCheck = setInterval(function(){
				var isAnimating = b.is(':animated');
				if(isAnimating == false){
					thisPlayOverlay.fadeIn();
				}
				else{
					thisPlayOverlay.hide();
				}
			},1000);
			setTimeout(function() {
				clearInterval(isAnimating);
			},10000);	
		}
	});
	//Glare hover function
	$('.iphone5').mouseenter(function() {
		$('.glare').fadeOut();
	}).mouseleave(function() {
		$('.glare').fadeIn();
	});
});