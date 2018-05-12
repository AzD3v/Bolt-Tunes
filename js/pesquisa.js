$(document).ready(function(){

  // Funcionalidade de pesquisa utilizando a tecla "Enter"

  // Funcionalidade de pesquisa utilizando o clique do rato 
  $(function() {

  // Chave API do YouTube
  const youtubeAPIKey ="AIzaSyAvt_YeiVfbMrGKdNFaMuMo760ViQemm0k";
  
  // O que sucede ao clicar no botão de pesquisa
  $("#search-button").click(function(){
    
    // Impedir que ocorra uma pesquisa com um campo de texto vazio
    if($("#search").val() === '') {
        location.reload();
    } else if($("#search").val() !== '') {
      
    // Leitura do valor da caixa de texto da pesquisa 
    let query = $('#search');

    // Construção do URL com o valor da caixa de texto da pesquisa
    let url = "https://www.googleapis.com/youtube/v3/search?q="
      + query.val() 
      + "&maxResults=10"
      + "&type=video" 
      + "&order=viewCount"
      + "&part=snippet"
      + "&key=" + youtubeAPIKey;

      // Query que irá conter os próximos 10 resultados da pesquisa 
      let next10 = "https://www.googleapis.com/youtube/v3/search?q="
      + query.val() 
      + "&maxResults=10"
      + "&type=video" 
      + "&order=viewCount"
      + "&part=snippet"
      + "&key=" + youtubeAPIKey; 

    // Função que codifica os espaços e caracteres especiais entre as várias palavras pesquisadas
    url=encodeURI(url);
    
    // Pedido HTTP GET ao serviço YouTube
    $.get(url, function(response,status){
     if (status=='success') {
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
  }
  
  });

  });

});