/* ******************* */
/* HOMEPAGE JAVASCRIPT */
/* ******************* */
 
// Colocar o "selectForm" vazio inicialmente 
var selectForm = "";


$(document).ready(function(){

		// Esconder por predefinição as diversas áreas de conteúdo do catálogo
		$("#navbarResponsive").hide();
		$("#resultados-pesquisa").hide();
		$("#musicas-favoritas").hide();
		$("#info-musical").hide();
    $(".opcao-principal2").hide();
		//$("#dropdown-adicionar").hide();

		// Demonstrar opção predefinida selecionada (Lista das playlists)
		$(".lista-playlists").addClass('active-option');

		// "Toogler" da lista de playlists do utilizador (homepage)
		$(".lista-playlists").click(function(){
			$("#musicas-favoritas").fadeOut();
			$("#resultados-pesquisa").fadeOut();
			$("#homepage-principal").fadeIn();
			$(".lista-playlists").addClass('active-option');
			$(".lista-favoritos").removeClass('active-option');
			$("#info-musical").hide();	
            $(".resp_playlist").fadeIn();
        
         
		});
  
        // select do resultado de pesquisa
        $('#catalogo').on('change', function() {
            let selection = $(this).find(":selected").val();
                $('.pesquisa-personalizada').removeAttr('id');
                $('.pesquisa-personalizada').attr('id', 'search-' + selection);
                $('#search').attr('placeholder', 'Faça a sua pesquisa por ' + selection);
                //seleciona o value escolhido
                var x = document.getElementById("catalogo").value;
                //alert("You selected: " + x); 
                if(x == "Artista"){
                    console.log(x);
                    // "Toogler" dos resultados de pesquisa que o utilizador efetuar
                    $(".pesquisa-personalizada").click(function(){
                        $("#homepage-principal").fadeOut();
                        $(".pesquisa").hide();
                        $("#musicas-favoritas").hide();
                        $("#navbarResponsive").fadeIn();
                        $("#resultados-pesquisa").fadeIn();
                        $(".lista-playlists").removeClass('active-option');	
                        $(".lista-favoritos").removeClass('active-option');
                    });
                } else {
                    if(x == "Album"){
                     alert ("nada a mostrar");
                    } if(x == "Musica"){
                     alert ("nada a mostrar");
                    } if(x == "Genero"){
                     alert ("nada a mostrar");
                    }
                }
            
               //document.getElementById("catalogo").value = "musica") 
                //<p id="demo"></p>
                //document.getElementById("demo").innerHTML = "You selected: " + x;
        });
    
        //select das playlists adicionadas
        if (document.getElementById('respostas') != ''){
            $('#selectDropdown').on('change', function() {
                let selection = $(this).find(":selected").val();
                    //$('.pesquisa-personalizada').removeAttr('id');
                   // $('.pesquisa-personalizada').attr('id', 'search-' + selection);
                    //$('#search').attr('placeholder', 'Faça a sua pesquisa por ' + selection);
                    //seleciona o value escolhido
                    var s = document.getElementById("selectDropdown").value;
                    alert("You selected: " + s); 
            });
        }
    
		// "Toogler" da secção de músicas favoritas do utilizador
		$(".lista-favoritos").click(function() {
			$("#homepage-principal").fadeOut();
			$("#resultados-pesquisa").fadeOut();
			$("#musicas-favoritas").fadeIn();
			$(".lista-favoritos").addClass('active-option');	
			$(".lista-playlists").removeClass('active-option');	
			$("#info-musical").hide();		
		});
		
		// "Toogler" do menu lateral
		$(".ion-close-circled").click(function(){
                    $(".area-acao").animate({width:'100%'}, 500);
					$(".sidebar-menu").addClass("hide-menu");
					$(".toogle-menu").addClass("opacity-one").delay(500).show();
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

		/* Limpeza da caixa de texto de pesquisa após clique no logótipo do catálogo */ 
		$(".navbar-brand").click(function(){	
				$("#search").val('');
		});

		/* Limpeza da caixa de texto de pesquisa após clique no botão de adicionar faixa */
		$(".botao-opcao").click(function(){
				$("#search").val('');
		});
        
        
    
	// Criação das playlists
	var playlists = [];

	// Possibilitar a adição de uma playlist utilizando a tecla "Enter" como trigger
	$("#input_playlist").on('keydown', function (e) {
		var key = e.which;
		if (key == 13) {
			$(".botao-playlist").click();
			return false;
		}
	});

	$(".botao-playlist").click(function() {
		if ($("#input_playlist").val() === '') {
			location.reload();
		} else if ($("#input_playlist").val() !== '') {

		// console.log("teste");
		//buscar div de resposta
		var div = document.getElementsByClassName("resp_playlist");
		//criar div container
		var container = document.createElement("div");
		container.className = "opcoes-acao";
		$(".resp_playlist").append(container);
		//criar div esquerda
		var subdivleft = document.createElement("div");
		subdivleft.className = "opcoes-acao-left";
		container.appendChild(subdivleft);
		//criar div direita
		var subdivright = document.createElement("div");
		subdivright.className = "opcoes-acao-right";
		container.appendChild(subdivright);
		//criar div dentro div esquerda
		var sub_subdivleft = document.createElement("div");
		sub_subdivleft.className = "row-music";
		subdivleft.appendChild(sub_subdivleft);
		//criar img icone dentro subdiv esquerda
		var img = document.createElement("img");
		img.src = "img/icon_01.png";
		sub_subdivleft.appendChild(img);
		//criar h8 id dentro opcoes-acao-left
		var h8 = document.createElement("h8");
		subdivleft.appendChild(h8);
		//criar botao dentro div direita
		var botao = document.createElement("button");
		botao.className = "btn botao-opcao4";
		botao.innerHTML = "Ver playlist";
		subdivright.appendChild(botao);
		//buscar valor do input para inserir h8 (#name_playlist)
		h8.textContent = document.getElementById('input_playlist').value;
 
		h8Dropdown = document.getElementById('input_playlist').value;
		playlists.push(h8Dropdown);

		//adicionar options ao dropdown myselect
		var select = document.getElementById('selectDropdown');
		$("#selectDropdown").empty();
		$("#selectDropdown").html("<option selected disabled>Adicionar playlist</option>");
		for (let i = 0; i < playlists.length; i++) {
			var option = document.createElement("option");
			option.value = playlists[i];
			option.innerHTML = playlists[i];
           // option.className = "value";
			select.appendChild(option);
			//insere o html form dropdown numa variável
			//selectForm = $("#dropdown-adicionar").html();
			//alert(playlists[i]);
		}
            
        selectForm = $("#dropdown-adicionar").html();
		$("#input_playlist").val('');
       
        $(".botao-opcao4").click(function(){ 
            //alert("teste");
            $(".area-acao").hide(); 
            $(".area-acao_playlistsFav").show();
            divPlaylist = document.getElementsByClassName("opcoes-acao");
            $(".opcoes-acao-resposta").append("<br>").append(divPlaylist);
           });
            
        
		
	}});
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

