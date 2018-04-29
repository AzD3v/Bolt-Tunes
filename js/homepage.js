/* HOMEPAGE JAVASCRIPT */
$(document).ready(function () {

	$(".ion-close-circled").click(function () {
		$(".sidebar-menu").addClass("hide-menu");
		$(".toogle-menu").addClass("opacity-one");
	});

	$(".toogle-menu").click(function () {
		$(".sidebar-menu").removeClass("hide-menu");
		$(".toogle-menu").removeClass("opacity-one");
	});

});