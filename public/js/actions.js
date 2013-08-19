$(function() {
	var projectWidth = $('.span3').width();
	var step = projectWidth;
	var trigger;

	$('#right').click(function() {
		if (trigger == left) {
			step += (projectWidth*2);
		}
		console.log(step);
		$('.project-holder').animate({left: -step});
		step += projectWidth;
		trigger = right;
	});

	$('#left').click(function() {
		if (trigger == right) {
			step -= (projectWidth*2);
		}
		$('.project-holder').animate({left: -step});
		step -= projectWidth;
		trigger = left;
	});
});