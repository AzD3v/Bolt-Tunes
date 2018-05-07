/* ******************* */
/* HOMEPAGE JAVASCRIPT */
/* ******************* */

$(document).ready(function(){

		// Esconder por predefinição as diversas áreas de conteúdo do catálogo
		$("#navbarResponsive").hide();
		$("#resultados-pesquisa").hide();
		$("#musicas-favoritas").hide();

		// "Toogler" da lista de playlists do utilizador (homepage)
		$(".lista-playlists").click(function(){
			$("#musicas-favoritas").fadeOut();
			$("#resultados-pesquisa").fadeOut();
			$("#homepage-principal").fadeIn();
		});

		// "Toogler" dos resultados de pesquisa que o utilizador efetuar
		$(".pesquisa-personalizada").click(function(){
			$("#homepage-principal").fadeOut();
			$(".pesquisa").hide();
			$("#musicas-favoritas").hide();
			$("#navbarResponsive").fadeIn();
			$("#resultados-pesquisa").fadeIn();
		});

		// "Toogler" da secção de músicas favoritas do utilizador
		$(".lista-favoritos").click(function() {
			$("#homepage-principal").fadeOut();
			$("#resultados-pesquisa").fadeOut();
			$("#musicas-favoritas").fadeIn();
		});

		// "Toogler" do menu lateral
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

		/* Efeito fadeIn e fadeOut do footer */
		/*$(document).scroll(function() {
				var y = $(this).scrollTop();
				if(y > 520) {
						$('footer').fadeIn();
				} else {
						$('footer').fadeOut();
				}
		});*/

});
