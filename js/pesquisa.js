$(document).ready(function(){

  // Funcionalidade de pesquisa utilizando a tecla "Enter"

  // Funcionalidade de pesquisa utilizando o clique do rato 
  $(function() {

  // Chave API do YouTube
  const youtubeAPIKey ="AIzaSyAvt_YeiVfbMrGKdNFaMuMo760ViQemm0k";
  
  // Leitura do valor da caixa de texto da pesquisa   
  let query = $('#search');
  
  // Possibilitar a pesquisa utilizando a tecla "Enter" como trigger
  $("#search").on('keydown', function(e){
      var key = e.which;
      if(key == 13) {
        $("#search-button").click();
        return false;
      }
  });

  // O que sucede ao clicar no botão de pesquisa
  $("#search-button").click(function(){
    
    // Impedir que ocorra uma pesquisa com um campo de texto vazio
    if($("#search").val() === '') {
        location.reload();
    } else if($("#search").val() !== '') {
      
    // Construção do URL com o valor da caixa de texto da pesquisa
    let url = "https://www.googleapis.com/youtube/v3/search?q="
      + query.val() 
      + "&maxResults=10"
      + "&type=video" 
      + "&order=viewCount"
      + "&part=snippet"
      + "&key=" + youtubeAPIKey;

    // Função que codifica os espaços e caracteres especiais entre as várias palavras pesquisadas
    url = encodeURI(url);
    
    // Pedido HTTP GET ao serviço YouTube
    $.get(url, function(response, status){
     if (status == 'success') {
       for (let resultado of response.items) {

        let video = $("<div class='wrapper'><div class='resposta'><iframe src='https://www.youtube.com/embed/"+resultado.id.videoId+"'></iframe></div><div class='resposta_nome'>"+resultado.snippet.title+"</div><div class='container_button'><div id='sub_container_button'><button class='btn botao-opcao0'>Ouvir faixa</button><button class='btn botao-opcao1'>Adicionar faixa</button><button class='btn botao-opcao2'>Saber mais +</button></div></div></div>");
           
          $("#respostas").append("<br>").append(video);
          
          // Botão que permite ouvir a faixa selecionada 
          $(".botao-opcao0").click(function(){ 
          // $(".carousel-inner").fadeOut();
          // $("#ouvir_faixa").fadeIn();
          //$("#ouvir_faixa").append("https://www.youtube.com/embed/"+resultado.id.videoId);
          // console.log(resultado);
          window.open("https://www.youtube.com/embed/"+resultado.id.videoId);
          console.log(resultado);
          });
           
          // Botão que adicionará a faixa escolhida aos favoritos
          $(".botao-opcao1").click(function(){                          
          //$("#repostas").fadeOut();
          //$("#homepage-principal").fadeOut();
          $("#resultados-pesquisa").fadeOut();
          $("#musicas-favoritas").fadeIn();
          $(".container_button").fadeOut();
          $(".lista-favoritos").addClass('active-option');	
          $(".lista-playlists").removeClass('active-option');		

         // resp = document.getElementsByClassName ("wrapper")[0];
 
            $(".resposta_favoritos").append("<br>").append(video);
             console.log(getElementsByClasseName("wrapper", 1));
           });   

          // Botão que permitirá saber mais informações acerca da faixa, álbum e artista 
          $(".botao-opcao2").click(function(){

              $("#resultados-pesquisa").fadeOut();
              $("#info-musical").fadeIn();
              $(".container_button").fadeOut();

          });
        
       }
     }

     //console.log('status, response');
    
    });
  };

  $(url, function(response, status) {
      var nextPageToken = response.nextPageToken;
  });
    
    $("#botao-mais").click(function(){
      
      var next10 = "https://www.googleapis.com/youtube/v3/search?q="
    + query.val() 
    + "&maxResults=10"
    + "&type=video" 
    + "&order=viewCount"
    + "&pageToken=" + nextPageToken   
    + "&part=snippet"
    + "&key=" + youtubeAPIKey;
      
    $.get(next10, function(response, status){
        if (status == 'success') {
          for (let resultado of response.items) {
   
           let video = $("<div class='wrapper'><div class='resposta'><iframe src='https://www.youtube.com/embed/"+resultado.id.videoId+"'></iframe></div><div class='resposta_nome'>"+resultado.snippet.title+"</div><div class='container_button'><div id='sub_container_button'><button class='btn botao-opcao1'>Adicionar faixa</button><button class='btn botao-opcao2'>Saber mais +</button></div></div></div>");
   
          // let nome = $("<div class='nome'></div>").text(resultado.snippet.title);
         
              video.click(function(){         
                window.open("https://www.youtube.com/embed/"+resultado.id.videoId);
                console.log(resultado);
              });
              
              $("#respostas").append("<br>").append(video);
              
             // $("#resposta_nome").append("<br>").append(nome);
          }
        }
        //console.log('status, response');
            
      });    
    
    });
  
  }
  
)});

});