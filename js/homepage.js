/* HOMEPAGE JAVASCRIPT */

$(document).ready(function(){

		/* Toogler do menu lateral */
		$(".ion-close-circled").click(function(){
					$(".sidebar-menu").addClass("hide-menu");
					$(".toogle-menu").addClass("opacity-one");
		});

		$(".toogle-menu").click(function(){
					$(".sidebar-menu").removeClass("hide-menu");
					$(".toogle-menu").removeClass("opacity-one");
		});

		/* Opção selecionada no menu lateral */
		$(".navigation-item").hover(
				function() {
					$(this).addClass("active-option");
				}, function() {
					$(this).removeClass("active-option");
				}
		);

		$(".navigation-item").click(function(){
				$(this).addClass("active-option");
		});

		$(document).scroll(function() {
				var y = $(this).scrollTop();
				if(y > 500) {
						$('footer').fadeIn();
				} else {
						$('footer').fadeOut();
				}
		});

});