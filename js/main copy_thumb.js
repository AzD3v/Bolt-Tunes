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


    //criação da div "resultado pesquisa"
    //var resposta = document.getElementById("resposta");
    //var div = document.createElement('div');
    //class do container pai
    //div.className = "acao-atual-container";
    //resposta.appendChild(div);

    //criação do <h8>
    //var h8 = document.createElement('h8');
    //h8.className = "display-5 title-acao";
    //h8.innerHTML$ = "Resultado da Pesquisa";
   // div.appendChild(h8);

    
    //fazer o pedido HTTP GET ao servico Youtube
    let i = 0;
   $.get(url,function(response,status){
     if (status=='success') {
       for (let resultado of response.items) {
        
         let img = $("<img></img><div style='border-bottom: 1px solid #3D164F;margin-top: 20px;'></div>").attr('src', resultado.snippet.thumbnails.default.url).attr('width', resultado.snippet.thumbnails.default.width).attr('height', resultado.snippet.thumbnails.default.height).attr("id", "id"+i );
   
           
       // let video = $("<iframe></iframe><div style='border-bottom: 1px solid #3D164F;margin-top: 20px;'></div>").attr('src',"https://www.youtube.com/embed/"+resultado.id.videoId);

        let nome = $("<div class='nome' style='border-bottom: 1px solid #3D164F;'></div>").text(resultado.snippet.title);

           img.click(function(){         window.open("https://www.youtube.com/embed/"+resultado.id.videoId);
             console.log(resultado);
           });
           
        //botao adicionar   
        //criação da div "botao" dentro da div "container_resposta"
        var botao = document.getElementById("container_button");
        //criacao button dentro da div "sub_container_button"
        var div = document.createElement('div');
        div.id = "sub_container_button";
        botao.appendChild(div);
           
        var btt = document.createElement('button');
        btt.className = "btn botao-opcao";
        btt.innerHTML = "Adicionar";
        div.appendChild(btt);
           
          // <div class="opcoes-acao-right">
				//		<button class="btn botao-opcao">Ouvir playlist</button>
			//	     </div>
           

           $("#resposta").append("<br>").append(img);
            i++;
           $("#resposta_nome").append("<br>").append(nome);
       }
     }
     //console.log('status, response');
   });
 });
});
