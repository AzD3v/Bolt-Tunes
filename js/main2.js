$(function(){

  //alinea 3

  const youtubeAPIKey ="AIzaSyAvt_YeiVfbMrGKdNFaMuMo760ViQemm0k";

  //ao clicar no botao:    
  $("button").click(function(){
      
    //ler o valor da caixa de input         
   let query =$('#search').val();
        console.log(query);
 
    //construir o URL com o valor da caixa de input  
   let url ="https://www.googleapis.com/youtube/v3/search?q="+query+"&maxResults=5&part=snippet&key="+youtubeAPIKey;
      
    //funcao para codificar os espacos e caracteres especiais entre palavras pesquisadas
   url=encodeURI(url);
      
    //fazer o pedido HTTP GET ao servico Youtube
$.get(url, function(response, status){
      if(status == 'success'){
        //implementar tabela com o header "nome","score","type"

        //criar table
        let table = $('<table></table').attr('id', 'tabela');
        $("#resposta").append(table);

        //o thead
        let thead = $('<thead></thead>');
        table.append(thead);

        //os tr
        let tr = $('<tr></tr>');
        thead.append(tr);

        //os th
        let labels = ['nome','descricao'];
        $.each(labels, function(indice,label){
          let th = $('<th></th>').text(label);
          tr.append(th);
        });
          
        let tbody = $('<tbody></tbody>');
        table.append(tbody);
        //interar sobre o array artistas
        for (let resultado of response.items) {
            let tr = $('<tr></tr>');
            tr.append($('<td></td>').text(resultado.snippet.title));
            tr.append($('<td></td>').text(resultadp.snippet.description));
      
            tbody.append(tr);
        }
          
      }
    });
  });
});

