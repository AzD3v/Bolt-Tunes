$(function(){

  //alinea 3

  const youtubeAPIKey ="AIzaSyAvt_YeiVfbMrGKdNFaMuMo760ViQemm0k";

  //ao clicar no botao:
  $("button").click(function(){

    //ler o valor da caixa de input
   let query =$('#search');

    //construir o URL com o valor da caixa de input
   let url ="https://www.googleapis.com/youtube/v3/search?q="+query.val()+ "&maxResults=50&part=snippet&key="+youtubeAPIKey;

    //funcao para codificar os espacos e caracteres especiais entre palavras pesquisadas
   url=encodeURI(url);


   

    
    //fazer o pedido HTTP GET ao servico Youtube
   $.get(url,function(response,status){
     if (status=='success') {
       for (let resultado of response.items) {

        let video = $("<div class='wrapper'><div class='resposta'><iframe src='https://www.youtube.com/embed/"+resultado.id.videoId+"'></iframe></div><div class='resposta_nome'>"+resultado.snippet.title+"</div><div class='container_button'><div id='sub_container_button'><button class='btn botao-opcao'>Adicionar faixa</button></div></div></div>");

       // let nome = $("<div class='nome'></div>").text(resultado.snippet.title);
      
           video.click(function(){         window.open("https://www.youtube.com/embed/"+resultado.id.videoId);
             console.log(resultado);
           });
           
           $("#respostas").append("<br>").append(video);
          // $("#resposta_nome").append("<br>").append(nome);
       }
     }
     //console.log('status, response');
   });
 });
});
