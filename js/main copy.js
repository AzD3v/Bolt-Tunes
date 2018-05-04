$(function(){

  //alinea 3

  const youtubeAPIKey ="AIzaSyAvt_YeiVfbMrGKdNFaMuMo760ViQemm0k";

  //ao clicar no botao:    
  $("button").click(function(){
      
    //ler o valor da caixa de input      
   let query =$('#search');
      
    //construir o URL com o valor da caixa de input  
   let url ="https://www.googleapis.com/youtube/v3/search?q="+query.val()+"&maxResults=5&part=snippet&key="+youtubeAPIKey;
      
    //funcao para codificar os espacos e caracteres especiais entre palavras pesquisadas
   url=encodeURI(url);
      
    //fazer o pedido HTTP GET ao servico Youtube
   let i = 0;
   $.get(url,function(response,status){
     if (status=='success') {
       for (let resultado of response.items) {
         //video em id > videoId  
           
         //let img = $("<iframe>").attr('src',"https://www.youtube.com/embed/"+resultado.id.videoId );

           //img.click(function(){
         //   window.open("https://www.youtube.com/embed/"+resultado.id.videoId);
            // console.log(resultado);
           //});
           
           $("#resposta").html("<div style='border-bottom: 1px solid #3D164F;'><iframe src='https://www.youtube.com/embed/"+resultado.id.videoId+"'></iframe></div>");

            $("#resposta").append("<br>");

           //$("#resposta").append("<br>").append(img);
           i++;
       }
     }
     //console.log('status, response');
   });
 });
});
