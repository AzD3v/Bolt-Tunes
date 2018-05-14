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

        //este 'video2' refere-se à página da lista de favoritos (botoes diferentes do 'video')   
        let video2 = $("<div class='wrapper'><div class='resposta'><iframe src='https://www.youtube.com/embed/"+resultado.id.videoId+"'></iframe></div><div class='resposta_nome'>"+resultado.snippet.title+"</div><div class='container_button'><div id='sub_container_button'><button class='btn botao-opcao0'>Ouvir faixa</button><button class='btn botao-opcao3'>Adicionar playlist</button><button class='btn botao-opcao2'>Saber mais +</button></div></div></div>");
           
        $("#respostas").append("<br>").append(video);
                    
          // Botão que permite ouvir a faixa selecionada 
          $(".botao-opcao0").click(function(){ 
            // $(".carousel-inner").fadeOut();
            // $("#ouvir_faixa").fadeIn(); //$("#ouvir_faixa").append("https://www.youtube.com/embed/"+resultado.id.videoId);
            // console.log(resultado);     
            window.open("https://www.youtube.com/embed/"+resultado.id.videoId);
            console.log(resultado);
        });
           
          // Botão que adicionará a faixa escolhida aos favoritos:
          $(".botao-opcao1").click(function(){                       
            
            $("#resultados-pesquisa").fadeOut();
            $("#musicas-favoritas").fadeIn();
            
            //oculta os botoes do result pesquisa para dar lugar aos da lista de favoritos:
            // $(".container_button").fadeOut(); 
            //mostra os novos botoes:
            // $(".container_button2").fadeIn(); 
            
            $(".lista-favoritos").addClass('active-option');	
            $(".lista-playlists").removeClass('active-option');	//mostra o resultado selecionado:	 
            $(".resposta_favoritos").append("<br>").append(video2);
              console.log(getElementsByClasseName("wrapper", 1));
            
            }); 

            /* ÁREA DE TRABALHO DO CARINA */  

          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          


            
          
            /* ÁREA DE TRABALHO DO PAULO */          
            
            // Botão que permitirá saber mais informações acerca da faixa, álbum e artista 
          $(".botao-opcao2").click(function(){

              $("#resultados-pesquisa").fadeOut();
              $("#info-musical").fadeIn();
              $(".container_button").fadeOut();

              // Ler o valor da caixa de pesquisa
              let artist = $('#search').val();

              // Construir o url com o valor da caixa de pesquisa
              let url = 'http://musicbrainz.org/ws/2/artist/?query=artist:' + artist + '&fmt=json';
              url = encodeURI(url);

              // Fazer um pedido HTTP GET ao serviço MusicBrainz
              $.get(url,function(response, status) {

                // Implementar tabela com o header
                // "Nome", "Score", "Type"
                let tableElem = $('<table></table>');
                $('body').append(tableElem);

                let thead = $('<thead></thead>');
                tableElem.append(thead);

                let tr = $('<tr></tr>');
                thead.append(tr);

                // Array que continha cada um dos headers da tabela
                let labels = ['Nome', 'Score', 'Type'];

                $.each(labels, function(i, label) {

                    let th = $('<th></th>').text(label);
                    tr.append(th);

                });

                let tbodyElem = $('<tbody></tbody>');
                tableElem.append(tbodyElem)

                for(let artist of response.artists) {

                    let tr = $('<tr></tr>');
                    tr.append($('<td></td>').text(artist.name));
                    tr.append($('<td></td>').text(artist.score));
                    tr.append($('<td></td>').text(artist.type));
                    tbodyElem.append(tr);

                }

                $(".resposta_info").append("<br>").append(tableElem);
                  console.log(getElementsByClasseName("wrapper", 1));
            
                });


          });
        
       
       
       
       
       
       
        }
     }






















     /* ÁREA DE TRABALHO DO BOTÃO 3 (CARINA) */

























     
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