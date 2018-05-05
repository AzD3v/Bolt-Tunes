$(function(){

  //alinea 3

  const youtubeAPIKey ="AIzaSyAvt_YeiVfbMrGKdNFaMuMo760ViQemm0k";

  //ao clicar no botao:
  $("button").click(function(){

    //ler o valor da caixa de input
   let query =$('#search');

    //construir o URL com o valor da caixa de input
   let url ="https://www.googleapis.com/youtube/v3/search?q="+query.val()+ "&part=snippet&key="+youtubeAPIKey;

    //funcao para codificar os espacos e caracteres especiais entre palavras pesquisadas
   url=encodeURI(url);


    //criação da div "resultado pesquisa"
    var resposta = document.getElementById("resposta");
    var div = document.createElement('div');
    //class do container pai
    div.className = "acao-atual-container";
    resposta.appendChild(div);

    //criação do <h8>
    var h8 = document.createElement('h8');
    h8.className = "display-5 title-acao";
    h8.innerHTML$ = "Resultado da Pesquisa";
    div.appendChild(h8);

    //criacao da div "container_row)
   // let videobase = document.createElement('div');
  //  videobase.id = "sub_resposta";
   // resposta.appendChild(videobase);

    //fazer o pedido HTTP GET ao servico Youtube

   $.get(url,function(response,status){
     if (status=='success') {
       for (let resultado of response.items) {

        let video = $("<iframe></iframe><div style='border-bottom: 1px solid #3D164F;margin-top: 20px;'></div>").attr('src',"https://www.youtube.com/embed/"+resultado.id.videoId);

        let nome = $("<div class='nome'></div>").text(resultado.snippet.title);




           video.click(function(){
            window.open("https://www.youtube.com/embed/"+resultado.id.videoId);
             console.log(resultado);
           });

        //nome video



           $("#resposta").append("<br>").append(video);
           $("#resposta_nome").append("<br>").append(nome);
       }
     }
     //console.log('status, response');
   });
 });
});
