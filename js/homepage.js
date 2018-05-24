 /* ******************* */
/* HOMEPAGE JAVASCRIPT */
/* ******************* */

// Colocar o "selectForm" vazio inicialmente
var selectForm = "";
var myPlaylist=[]=[];
var myPlaylistId = []=[];

$(document).ready(function() {

  // Esconder por predefinição as diversas áreas de conteúdo do catálogo
  $("#navbarResponsive").hide();
  $("#resultados-pesquisa-musica").hide();
  $("#resultados-pesquisa-artista").hide();
  $("#resultados-pesquisa-album").hide();
  $("#resultados-pesquisa-genero").hide();
  $("#musicas-favoritas").hide();
  $("#info-musical").hide();
  $("#dropdown-adicionar").hide();

  // Demonstrar opção predefinida selecionada (Lista das playlists)
  $(".lista-playlists").addClass('active-option');

  // "Toogler" da lista de playlists do utilizador (homepage)
  $(".lista-playlists").click(function() {
    $("#musicas-favoritas").fadeOut();
    $("#resultados-pesquisa-artista").fadeOut();
    $("#resultados-pesquisa-album").fadeOut();
    $("#resultados-pesquisa-musica").hide();
    $("#resultados-pesquisa-genero").hide();
    $("#homepage-principal").fadeIn();
    $(".lista-playlists").addClass('active-option');
    $(".lista-favoritos").removeClass('active-option');
    $("#info-musical").hide();
    $(".resp_playlist").fadeIn();
    $(".area-acao").show();
    $(".area-acao_playlistsFav").hide();

  });

  // Por predefinição é o artista o tema a ser pesquisado

  // Possibilitar a pesquisa utilizando a tecla "Enter" como trigger
  // Por predefinição é o artista o tema a ser pesquisado
  var selection = 'Musica';

  if (selection === 'Musica') {
    console.log(selection);

    $(".pesquisa-personalizada").click(function() {

      $("#homepage-principal").fadeOut();
      $(".pesquisa").hide();
      $("#musicas-favoritas").hide();
      $("#navbarResponsive").fadeIn();
      $("#resultados-pesquisa-musica").fadeIn();
      $("#resultados-pesquisa-artista").hide();
      $("#resultados-pesquisa-album").hide();
      $("#resultados-pesquisa-genero").hide();
      $(".lista-playlists").removeClass('active-option');
      $(".lista-favoritos").removeClass('active-option');

      // Chave API do YouTube
      const youtubeAPIKey = "AIzaSyAvt_YeiVfbMrGKdNFaMuMo760ViQemm0k";

      // Leitura do valor da caixa de texto da pesquisa
      let query = $('#search');

      // Impedir que ocorra uma pesquisa com um campo de texto vazio
      if ($("#search").val() === '') {
        location.reload();
      } else if ($("#search").val() !== '') {

        // Construção do URL com o valor da caixa de texto da pesquisa
        var url = "https://www.googleapis.com/youtube/v3/search?q=" +
          query.val() +
          "&maxResults=10" +
          "&type=video" +
          "&order=viewCount" +
          "&part=snippet" +
          "&key=" + youtubeAPIKey;

        // Função que codifica os espaços e caracteres especiais entre as várias palavras pesquisadas
        url = encodeURI(url);

        selectForm = $("#dropdown-adicionar").html();

        // Pedido HTTP GET ao serviço YouTube
        $.get(url, function(response, status) {
          if (status == 'success') {
            nextPageToken = response.nextPageToken;
            console.log(nextPageToken);

            var i = 0;
            var j = 0;
            if ($("#respostas_musica .wrapper")) {

              $("#respostas_musica").empty();
            }

            for (let resultado of response.items) {
              i++;
              j--

              let video = $("<div class='wrapper'><div class='resposta'><iframe src='https://www.youtube.com/embed/" + resultado.id.videoId + "'></iframe></div><div class='resposta_nome'>" + resultado.snippet.title + "</div><div class='container_button'><div id='sub_container_button'><button class='btn botao-opcao0'>Ouvir faixa</button><button class='btn botao-opcao1' id='" + i + "'>Adicionar faixa</button><form id='dropdown-adicionar'>" + selectForm + "</form><button class='btn botao-opcao2'>Saber mais +</button></div></div></div>");


              if (document.getElementsByClassName('resp_playlist') == '') {
                let video = $("<div class='wrapper'><div class='resposta'><iframe src='https://www.youtube.com/embed/" + resultado.id.videoId + "'></iframe></div><div class='resposta_nome'>" + resultado.snippet.title + "</div><div class='container_button'><div id='sub_container_button'><button class='btn botao-opcao0'>Ouvir faixa</button><button class='btn botao-opcao1' id='" + i + "'>Adicionar faixa</button><button class='btn botao-opcao2'>Saber mais +</button></div></div></div>");
              } else {

                let video = $("<div class='wrapper'><div class='resposta'><iframe src='https://www.youtube.com/embed/" + resultado.id.videoId + "'></iframe></div><div class='resposta_nome'>" + resultado.snippet.title + "</div><div class='container_button'><div id='sub_container_button'><button class='btn botao-opcao0'>Ouvir faixa</button><button class='btn botao-opcao1' id='" + i + "'>Adicionar faixa</button><form id='dropdown-adicionar'>" + selectForm + "</form><button class='btn botao-opcao2'>Saber mais +</button></div></div></div>");

                //o selectForm mostra a variável do form dropdown

                $("#respostas_musica").append("<br>").append(video);

                // var selectDrop = ($('#selectDropdown option:selected').html());


              }

              // Botão que permite ouvir a faixa selecionada
              $(".botao-opcao0").click(function() {
                // $(".carousel-inner").fadeOut();
                // $("#ouvir_faixa").fadeIn(); //$("#ouvir_faixa").append("https://www.youtube.com/embed/"+resultado.id.videoId);
                // console.log(resultado);
                window.open("https://www.youtube.com/embed/" + resultado.id.videoId);
                console.log(resultado);
              });

              // .botao-opcao1 que adicionará a faixa escolhida aos favoritos
              $("#" + i).click(function() {
                $("#resultados-pesquisa-artista").fadeOut();
                $("#musicas-favoritas").fadeIn();
                $(".lista-favoritos").addClass('active-option');
                $(".lista-playlists").removeClass('active-option'); //mostra o resultado selecionado:
                $(".resposta_favoritos").append("<br>").append(video);
                $(".botao-opcao1").fadeOut();
                $(".msgDefaultFavoritos").hide();
              });

              //.botao-addplaylist que adicionará a faixa escolhida aos favoritos:
              $("#" + j).click(function() {
                $("#musicas-favoritas").fadeOut();
                $("#resultados-pesquisa-musica").fadeOut();
                $("#resultados-pesquisa-artista").fadeOut();
                $("#resultados-pesquisa-album").fadeOut();
                $("#resultados-pesquisa-genero").fadeOut();
                $("#homepage-principal").fadeIn();
                $(".lista-playlists").addClass('active-option');
                $(".lista-favoritos").removeClass('active-option');
                $("#info-musical").hide();
                $(".opcao-principal2").show();
                $(".resp_faixa_playlist").append("<br>").append(video);
                $("#sub_container_button").hide();

              });

              // Botão que permitirá saber mais informações acerca da faixa, álbum e artista
              $(".botao-opcao2").click(function() {

                $("#resultados-pesquisa-musica").fadeOut();
                $("#info-musical").fadeIn();
                $(".container_button").fadeOut();

                // Ler o valor da caixa de pesquisa
                let artist = $('#search').val();

                // Construir o url com o valor da caixa de pesquisa
                let url = 'http://musicbrainz.org/ws/2/artist/?query=artist:' + artist + '&fmt=json';
                url = encodeURI(url);

                // Fazer um pedido HTTP GET ao serviço MusicBrainz
                $.get(url, function(response, status) {

                  // Implementar tabela com o header
                  // "Nome", "Score", "Type"
                  let tableElem = $('<table class= "table table-striped"></table>');

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

                  for (let artist of response.artists) {

                    let tr = $('<tr></tr>');
                    tr.append($('<td></td>').text(artist.name));
                    tr.append($('<td></td>').text(artist.score));
                    tr.append($('<td></td>').text(artist.type));
                    tbodyElem.append(tr);

                  }
                  $(".resposta_info").append("<br>").append(tableElem);
                  //console.log(getElementsByClasseName("wrapper", 1));
                });
              });

            }
          }

          //dropdown playlist//
          //selecionar opcao do select para adicionar à playlist
         if (document.getElementById('respostas_musica') != ''){
                                    $('.selectDropdown').on('change', function() {
                                        let selection = $(this).find(":selected").val();
                                            var s =$(this).val();
                                             //alert("You selected: " + s);
                                            //alert($(".resposta_nome").html());
                                            let index = myPlaylist[s].length;
                                        
                                            myPlaylist[s][index]=$(this).parent().parent().parent().parent().find(".resposta_nome").html();
                                            myPlaylistId[s][index]=$(this).parent().parent().parent().parent().find(".resposta").html();
                                           // console.log(myPlaylist[s].length);
                                        
                                          let alert = $("<div class='alert alert-danger' role='alert'><h4 class='alert-heading'>Adicionado!</h4><p2>Adicionaste '" + myPlaylist[s][index] + "' à playlist '" + s + "'</p2></div>");
                                        
                                          $('.area-acao').prepend(alert);
                                        
                                        
                                          //  alert("Adicionaste '" + myPlaylist[s][index] + "' à playlist '" + s + "'");
                                            console.log(myPlaylist);
                                            console.log(myPlaylistId);
                                    });
                                }  

          //console.log('status, response');

          $("#search").val('');

        });

        // Fazer com que os 10 novos resultados apareceram com o scroll do rato
        $(window).scroll(function() {
          var hT = $('footer').offset().top,
            hH = $('footer').outerHeight(),
            wH = $(window).height(),
            wS = $(this).scrollTop();
          if (wS > (hT + hH - wH)) {
            $("#botao-mais").click();
            return false;
          }
        });

        var nextPageToken;

        $("#botao-mais").click(function() {

          var next10 = "https://www.googleapis.com/youtube/v3/search?q=" +
            query.val() +
            "&maxResults=10" +
            "&type=video" +
            "&order=viewCount" +
            "&pageToken=" + nextPageToken +
            "&part=snippet" +
            "&key=" + youtubeAPIKey;

          i = 0;
          $.get(next10, function(response, status) {
            nextPageToken = response.nextPageToken;
            if (status == 'success') {
              for (let resultado of response.items) {
                i++;

                let video = $("<div class='wrapper'><div class='resposta'><iframe src='https://www.youtube.com/embed/" + resultado.id.videoId + "'></iframe></div><div class='resposta_nome'>" + resultado.snippet.title + "</div><div class='container_button'><div id='sub_container_button'><button class='btn botao-opcao0'>Ouvir faixa</button><button class='btn botao-opcao1' id='" + i + "'>Adicionar favoritos</button><form id='dropdown-adicionar'>" + selectForm + "</form><button class='btn botao-opcao2'>Saber mais +</button></div></div></div>");

                $("#respostas_musica").append("<br>").append(video);

                video.click(function() {
                  window.open("https://www.youtube.com/embed/" + resultado.id.videoId);
                  console.log(resultado);
                });

                $("#respostas_musica").append("<br>").append(video);

                // $("#resposta_nome").append("<br>").append(nome);
              }
            }
            //console.log('status, response');

          });

        });

      }
    });
  }

  $("#search").on('keydown', function(e) {
    var key = e.which;
    if (key == 13) {
      $(".pesquisa-personalizada").click();
      return false;
    }
  });

  // select do resultado de pesquisa
  $('#catalogo').on('change', function() {
    let selection = $(this).find(":selected").val();
    $('.pesquisa-personalizada').removeAttr('id');
    $('.pesquisa-personalizada').attr('id', 'search-' + selection);
    $('#search').attr('placeholder', 'Faça a sua pesquisa por ' + selection);
    //seleciona o value escolhido
    //alert("You selected: " + x);

    /////////////////// SELECT MUSICA COMECA AQUI ///////////////////////////////////
    if (selection == "Musica") {
      console.log(selection);

      $("#search-Musica").click(function() {

        $("#").fadeOut();
        $(".pesquisa").hide();
        $("#musicas-favoritas").hide();
        $("#navbarResponsive").fadeIn();
        $("#resultados-pesquisa-musica").fadeIn();
        $("#resultados-pesquisa-artista").hide();
        $("#resultados-pesquisa-album").hide();
        $("#resultados-pesquisa-genero").hide();
        $(".lista-playlists").removeClass('active-option');
        $(".lista-favoritos").removeClass('active-option');

        // Chave API do YouTube
        const youtubeAPIKey = "AIzaSyAvt_YeiVfbMrGKdNFaMuMo760ViQemm0k";

        // Leitura do valor da caixa de texto da pesquisa
        let query = $('#search');

        // Impedir que ocorra uma pesquisa com um campo de texto vazio
        if ($("#search").val() === '') {
          location.reload();
        } else if ($("#search").val() !== '') {

          // Construção do URL com o valor da caixa de texto da pesquisa
          var url = "https://www.googleapis.com/youtube/v3/search?q=" +
            query.val() +
            "&maxResults=10" +
            "&type=video" +
            "&order=viewCount" +
            "&part=snippet" +
            "&key=" + youtubeAPIKey;

          // Função que codifica os espaços e caracteres especiais entre as várias palavras pesquisadas
          url = encodeURI(url);

          selectForm = $("#dropdown-adicionar").html();

          $.get(url, function(response, status) {
          // Pedido HTTP GET ao serviço YouTube
            if (status == 'success') {
              nextPageToken = response.nextPageToken;
              console.log(nextPageToken);

              var i = 0;
              var j = 0;
              if ($("#respostas_musica .wrapper")) {

                $("#respostas_musica").empty();
              }

              for (let resultado of response.items) {
                i++;
                j--

                let video = $("<div class='wrapper'><div class='resposta'><iframe src='https://www.youtube.com/embed/" + resultado.id.videoId + "'></iframe></div><div class='resposta_nome'>" + resultado.snippet.title + "</div><div class='container_button'><div id='sub_container_button'><button class='btn botao-opcao0'>Ouvir faixa</button><button class='btn botao-opcao1' id='" + i + "'>Adicionar faixa</button><form id='dropdown-adicionar'>" + selectForm + "</form><button class='btn botao-opcao2'>Saber mais +</button></div></div></div>");


                if (document.getElementsByClassName('resp_playlist') == '') {
                  let video = $("<div class='wrapper'><div class='resposta'><iframe src='https://www.youtube.com/embed/" + resultado.id.videoId + "'></iframe></div><div class='resposta_nome'>" + resultado.snippet.title + "</div><div class='container_button'><div id='sub_container_button'><button class='btn botao-opcao0'>Ouvir faixa</button><button class='btn botao-opcao1' id='" + i + "'>Adicionar faixa</button><button class='btn botao-opcao2'>Saber mais +</button></div></div></div>");
                } else {

                  let video = $("<div class='wrapper'><div class='resposta'><iframe src='https://www.youtube.com/embed/" + resultado.id.videoId + "'></iframe></div><div class='resposta_nome'>" + resultado.snippet.title + "</div><div class='container_button'><div id='sub_container_button'><button class='btn botao-opcao0'>Ouvir faixa</button><button class='btn botao-opcao1' id='" + i + "'>Adicionar faixa</button><form id='dropdown-adicionar'>" + selectForm + "</form><button class='btn botao-opcao2'>Saber mais +</button></div></div></div>");

                  //o selectForm mostra a variável do form dropdown

                  $("#respostas_musica").append("<br>").append(video);

                  // var selectDrop = ($('#selectDropdown option:selected').html());


                }

                // Botão que permite ouvir a faixa selecionada
                $(".botao-opcao0").click(function() {
                  // $(".carousel-inner").fadeOut();
                  // $("#ouvir_faixa").fadeIn(); //$("#ouvir_faixa").append("https://www.youtube.com/embed/"+resultado.id.videoId);
                  // console.log(resultado);
                  window.open("https://www.youtube.com/embed/" + resultado.id.videoId);
                  console.log(resultado);
                });

                // .botao-opcao1 que adicionará a faixa escolhida aos favoritos
                $("#" + i).click(function() {
                  $("#resultados-pesquisa-artista").fadeOut();
                  $("#musicas-favoritas").fadeIn();
                  $(".lista-favoritos").addClass('active-option');
                  $(".lista-playlists").removeClass('active-option'); //mostra o resultado selecionado:
                  $(".resposta_favoritos").append("<br>").append(video);
                  $(".botao-opcao1").fadeOut();
                });

                //.botao-addplaylist que adicionará a faixa escolhida aos favoritos:
                $("#" + j).click(function() {
                  $("#musicas-favoritas").fadeOut();
                  $("#resultados-pesquisa-artista").fadeOut();
                  $("#resultados-pesquisa-album").fadeOut();
                  $("#resultados-pesquisa-musica").fadeOut();
                  $("#homepage-principal").fadeIn();
                  $(".lista-playlists").addClass('active-option');
                  $(".lista-favoritos").removeClass('active-option');
                  $("#info-musical").hide();
                  $(".opcao-principal2").show();
                  $(".resp_faixa_playlist").append("<br>").append(video);
                  $("#sub_container_button").hide();

                });

                // Botão que permitirá saber mais informações acerca da faixa, álbum e artista
                $(".botao-opcao2").click(function() {

                  $("#resultados-pesquisa-artista").fadeOut();
                  $("#info-musical").fadeIn();
                  $(".container_button").fadeOut();

                  // Ler o valor da caixa de pesquisa
                  let artist = $('#search').val();

                  // Construir o url com o valor da caixa de pesquisa
                  let url = 'http://musicbrainz.org/ws/2/artist/?query=artist:' + artist + '&fmt=json';
                  url = encodeURI(url);

                  // Fazer um pedido HTTP GET ao serviço MusicBrainz
                  $.get(url, function(response, status) {

                    // Implementar tabela com o header
                    // "Nome", "Score", "Type"
                    let tableElem = $('<table class= "table table-striped"></table>');

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

                    for (let artist of response.artists) {

                      let tr = $('<tr></tr>');
                      tr.append($('<td></td>').text(artist.name));
                      tr.append($('<td></td>').text(artist.score));
                      tr.append($('<td></td>').text(artist.type));
                      tbodyElem.append(tr);

                    }
                    $(".resposta_info").append("<br>").append(tableElem);
                    //console.log(getElementsByClasseName("wrapper", 1));
                  });
                });

              }
            }

            //dropdown playlist//
            //selecionar opcao do select para adicionar à playlist
            if (document.getElementById('respostas_musica') != '') {
              $('.selectDropdown').on('change', function() {
                let selection = $(this).find(":selected").val();
                var s = $(this).val();
                //alert("You selected: " + s);
                //alert($(".resposta_nome").html());
                let index = myPlaylist[s].length;
                myPlaylist[s][index] = $(this).parent().parent().parent().parent().find(".resposta_nome").html();
                console.log(myPlaylist[s].length);
                console.log(myPlaylist);
              });
            }

            //console.log('status, response');

            $("#search").val('');

          });

          // Fazer com que os 10 novos resultados apareceram com o scroll do rato
          $(window).scroll(function() {
            var hT = $('footer').offset().top,
              hH = $('footer').outerHeight(),
              wH = $(window).height(),
              wS = $(this).scrollTop();
            if (wS > (hT + hH - wH)) {
              $("#botao-mais").click();
              return false;
            }
          });

          var nextPageToken;

          $("#botao-mais").click(function() {

            var next10 = "https://www.googleapis.com/youtube/v3/search?q=" +
              query.val() +
              "&maxResults=10" +
              "&type=video" +
              "&order=viewCount" +
              "&pageToken=" + nextPageToken +
              "&part=snippet" +
              "&key=" + youtubeAPIKey;

            i = 0;
            $.get(next10, function(response, status) {
              nextPageToken = response.nextPageToken;
              if (status == 'success') {
                for (let resultado of response.items) {
                  i++;

                  let video = $("<div class='wrapper'><div class='resposta'><iframe src='https://www.youtube.com/embed/" + resultado.id.videoId + "'></iframe></div><div class='resposta_nome'>" + resultado.snippet.title + "</div><div class='container_button'><div id='sub_container_button'><button class='btn botao-opcao0'>Ouvir faixa</button><button class='btn botao-opcao1' id='" + i + "'>Adicionar favoritos</button><form id='dropdown-adicionar'>" + selectForm + "</form><button class='btn botao-opcao2'>Saber mais +</button></div></div></div>");

                  $("#respostas_musica").append("<br>").append(video);

                  video.click(function() {
                    window.open("https://www.youtube.com/embed/" + resultado.id.videoId);
                    console.log(resultado);
                  });

                  $("#respostas_musica").append("<br>").append(video);

                  // $("#resposta_nome").append("<br>").append(nome);
                }
              }
              //console.log('status, response');

            });

          });

        }
      });

      /////////////////// SELECT ALBUM COMECA AQUI ///////////////////////////////////
    } else {
      if (selection == "Artista") {
        console.log(selection);

        // "Toogler" dos resultados de pesquisa que o utilizador efetuar
        $(".pesquisa-personalizada").click(function() {
          $("#homepage-principal").fadeOut();
          $(".pesquisa").hide();
          $("#musicas-favoritas").hide();
          $("#navbarResponsive").fadeIn();
          $("#resultados-pesquisa-musica").hide();
          $("#resultados-pesquisa-artista").fadeIn();
          $("#resultados-pesquisa-album").hide();
          $("#resultados-pesquisa-genero").hide();
          $(".lista-playlists").removeClass('active-option');
          $(".lista-favoritos").removeClass('active-option');
          // Ler o valor da caixa de input
          let artist = $('#search').val();

          // Construir o url com o valor da caixa de input
          let url = 'http://musicbrainz.org/ws/2/artist/?query=artist:' + artist + '&limit=1&fmt=json';
          url = encodeURI(url);

          // Fazer um pedido http get ao serviço MusicBrainz
          $.get(url, function(response, status) {

            // Implementar tabela com o header
            // "Nome", "Score", "Type"
            let results_artist = $('#respostas_artista');

            for (let artist of response.artists) {

              let result_box = $('<div class="resultado"></div>');
              results_artist.append(result_box);
              result_box.append($('<div class="nome_artista"></div>').text(artist.name));

              let url_release = 'http://musicbrainz.org/ws/2/release/?query=arid:' + artist.id + '&limit=2&fmt=json';
              url_release = encodeURI(url_release);

              $.get(url_release, function(response_release, status_release) {

                let albuns_container = $('<div class="albuns_container"></div>');
                result_box.append(albuns_container);

                let albuns_artista = $('<div class="albuns_artista"></div>');
                albuns_container.append(albuns_artista);

                /*let albuns_btl = $('<button class="btns_lr albuns_btl">&#10094;</button>');
                albuns_container.append(albuns_btl);

                let albuns_btr = $('<button class="btns_lr albuns_btr">&#10095;</button>');
                albuns_container.append(albuns_btr);*/


                let records_container = $('<div class="records_container"></div>');
                result_box.append(records_container);

                /*let records_btl = $('<button class="btns_lr records_btl">&#10094;</button>');
                records_container.append(records_btl);

                let records_btr = $('<button class="btns_lr records_btr">&#10095;</button>');
                records_container.append(records_btr);*/

                for (let album of response_release.releases) {

                  let thumb_album = $('<div class="thumb_album"></div>');
                  albuns_artista.append(thumb_album);

                  let album_artista = $('<button class="album_artista" data-tab="' + album.id + '"></button>');
                  thumb_album.append(album_artista);

                  thumb_album.append('<button class="add_album">+</button>');

                  let records_album = $('<div class="records_album" id="' + album.id + '"></div>');
                  records_container.append(records_album);

                  $('.album_artista').click(function() {
                    let tab_id = $(this).attr('data-tab');

                    $('.album_artista').removeClass('current');
                    $('.records_album').removeClass('current');

                    $(this).addClass('current');
                    $("#" + tab_id).addClass('current');

                    let url_record = 'http://musicbrainz.org/ws/2/recording/?query=reid:' + album.id + '&fmt=json';
                    url_record = encodeURI(url_record);

                    $.get(url_record, function(response_record, status_record) {
                      for (let record of response_record.recordings) {
                        let record_container = $('<div class="record_container"></div>');
                        records_album.append(record_container);
                        const youtubeAPIKey = "AIzaSyAvt_YeiVfbMrGKdNFaMuMo760ViQemm0k";
                        let url_youtube = "https://www.googleapis.com/youtube/v3/search?q=" + record['artist-credit'][0].artist.name + ' - ' + record.title + "&maxResults=1&type=video&order=viewCount&part=snippet&key=" + youtubeAPIKey;

                        url_youtube = encodeURI(url_youtube);

                        $.get(url_youtube, function(response_youtube, status_youtube) {
                          for (let resultado of response_youtube.items) {
                            let video = $("<iframe width='100%' height='100%' src='https://www.youtube.com/embed/" + resultado.id.videoId + "'></iframe>");
                            record_container.append(video);
                          }
                          let item_record = $('<div item_record></div>');
                          record_container.append(item_record);
                          item_record.append('<p>' + record['artist-credit'][0].artist.name + ' - ' + record.title + '</p>');
                          item_record.append('<button>+</button>');
                        });

                      }
                    });
                  })

                  /*let url_coverart = 'http://coverartarchive.org/release/' + album.id;
                  url_coverart = encodeURI(url_coverart);

                  $.get(url_coverart,function(response_coverart, status_coverart) {
                    let thumb_album = $('<div class="thumb_album"></div>');
                    albuns_artista.append(thumb_album);

                    let album_artista = $('<div class="album_artista"></div>');
                    thumb_album.append(album_artista);

                    let imagem = response_coverart.images[0];
                    album_artista.append('<img class="album_img" src=' + imagem.image + '>');
                    thumb_album.append('<button class="add_album">+</button>');

                  });*/

                }
              });
            }
          });
        });

        /////////////////// SELECT ALBUM COMECA AQUI ///////////////////////////////////
      }
      if (selection == "Album") {
        console.log(selection);

        // "Toogler" dos resultados de pesquisa que o utilizador efetuar
        $(".pesquisa-personalizada").click(function() {
          $("#homepage-principal").fadeOut();
          $(".pesquisa").hide();
          $("#musicas-favoritas").hide();
          $("#navbarResponsive").fadeIn();
          $("#resultados-pesquisa-musica").hide();
          $("#resultados-pesquisa-artista").hide();
          $("#resultados-pesquisa-album").fadeIn();
          $("#resultados-pesquisa-genero").hide();
          $(".lista-playlists").removeClass('active-option');
          $(".lista-favoritos").removeClass('active-option');

          // Ler o valor da caixa de input
          let release = $('#search').val();

          // Construir o url com o valor da caixa de input
          let url = 'http://musicbrainz.org/ws/2/release/?query=title:' + release + '&limit=2&fmt=json';
          url = encodeURI(url);

          // Fazer um pedido http get ao serviço MusicBrainz
          $.get(url, function(response, status) {

            // Implementar tabela com o header
            // "Nome", "Score", "Type"
            let results_release = $('#respostas_album');

            for (let release of response.releases) {

              let result_box = $('<div class="resultado_album"></div>');
              results_release.append(result_box);
              result_box.append($('<div class="nome_album"></div>').text(release['artist-credit'][0].artist.name + ' - '+ release.title));

              let album_artista = $('<div class="album_artista"></div>');
              result_box.append(album_artista);


              album_artista.append('<p>' + release.id + '</p>');
              album_artista.append('<button class="add_album">+</button>');

              let records_album = $('<div class="records_album"></div>');
              result_box.append(records_album);
              let url_record = 'http://musicbrainz.org/ws/2/recording/?query=reid:' + release.id + '&fmt=json';
              url_record = encodeURI(url_record);

              $.get(url_record, function(response_record, status_record) {
                for (let record of response_record.recordings) {
                  let record_container = $('<div class="record_container"></div>');
                  records_album.append(record_container);
                  const youtubeAPIKey = "AIzaSyAvt_YeiVfbMrGKdNFaMuMo760ViQemm0k";
                  let url_youtube = "https://www.googleapis.com/youtube/v3/search?q=" + record['artist-credit'][0].artist.name + ' - ' + record.title + "&maxResults=1&type=video&order=viewCount&part=snippet&key=" + youtubeAPIKey;

                  url_youtube = encodeURI(url_youtube);

                  $.get(url_youtube, function(response_youtube, status_youtube) {
                    for (let resultado of response_youtube.items) {
                      let video = $("<iframe width='100%' height='100%' src='https://www.youtube.com/embed/" + resultado.id.videoId + "'></iframe>");
                      record_container.append(video);
                    }
                    let item_record = $('<div item_record></div>');
                    record_container.append(item_record);
                    item_record.append('<p>' + record['artist-credit'][0].artist.name + ' - ' + record.title + '</p>');
                    item_record.append('<button>+</button>');
                  });

                }
              });
            }
          });
        });

        /////////////////// SELECT GENERO COMECA AQUI ///////////////////////////////////
      }
      if (selection == "Genero") {
        console.log(selection);
        // "Toogler" dos resultados de pesquisa que o utilizador efetuar
        $(".pesquisa-personalizada").click(function() {
          window.alert('nada a mostrar');
        });
      }
    }
  });
  //select das playlists adicionadas
  if (document.getElementById('respostas') != '') {
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
    $("#resultados-pesquisa-artista").fadeOut();
    $("#musicas-favoritas").fadeIn();
    $(".lista-favoritos").addClass('active-option');
    $(".lista-playlists").removeClass('active-option');
    $("#info-musical").hide();
    $(".area-acao").show();
  });

  // "Toogler" do menu lateral
  $(".ion-close-circled").click(function() {
    $(".area-acao").animate({
      width: '100%'
    }, 500);
    $(".sidebar-menu").addClass("hide-menu");
    $(".toogle-menu").addClass("opacity-one").delay(500).show();
  });

  $(".toogle-menu").click(function() {
    $(".sidebar-menu").removeClass("hide-menu");
    $(".toogle-menu").removeClass("opacity-one");
  });

  /* Opção selecionada no menu lateral */
  $(".navigation-item").hover(
    function() {
      $(this).addClass("active-option");
    },
    function() {
      $(this).removeClass("active-option");
    }
  );

  /* Limpeza da caixa de texto de pesquisa após clique no logótipo do catálogo */
  $(".navbar-brand").click(function() {
    $("#search").val('');
  });

  /* Limpeza da caixa de texto de pesquisa após clique no botão de adicionar faixa */
  $(".botao-opcao").click(function() {
    $("#search").val('');
  });



  // Criação das playlists
  var playlists = [];

  // Possibilitar a adição de uma playlist utilizando a tecla "Enter" como trigger
  $("#input_playlist").on('keydown', function(e) {
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
        //alert(h8Dropdown);
        myPlaylist[h8Dropdown]=[];
        myPlaylistId[h8Dropdown]=[];
        //atribui o id ao botao ver playlist
        botao.playlistId = h8Dropdown;
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
            
            $('.resposta_playlists_favoritos').empty();
            let divThisId = $("<div class='thisId'><h3>PLAYLIST: "+h8Dropdown+"</h3></div><div class='msgDefaultPlaylist'><h4>Ainda não adicionaste nenhuma faixa!</h4></div>");
            $(".resposta_playlists_favoritos").prepend(divThisId);
            
            
            console.log(myPlaylistId[this.playlistId]);
            //esvaziar para nao replicar quando sair da seccao
            $('.opcoes-acao-resposta').empty();
        
            //vai buscar o id do video do array myPlaylistId
            for (i=0; i<myPlaylistId[this.playlistId].length; i++){
                //vais buscar o iframe do array myPlaylist
                for (i=0; i<myPlaylist[this.playlistId].length; i++){

                 let containerThis = $("<div class='wrapper2'><div class='resposta'>"+myPlaylistId[this.playlistId][i]+"</div><div class='resposta_nome'>"+myPlaylist[this.playlistId][i]+"</div><div class='container_button'><div id='sub_container_button'><button class='btn botao-opcao0'>Ouvir faixa</button></div></div></div>");

                 $('.opcoes-acao-resposta').append(containerThis);
                 $(".msgDefaultPlaylist").hide(); 
                    
                 $(".botao-opcao0").click(function(){ 
                     //falta código
                    });
              }
            }
            
          /*  if ($('.opcoes-acao-resposta').val() !== ''){
            var nextVideo = myPlaylistId[this.playlistId];
            var curVideo = 0;
            var videoPlayer = document.getElementById('opcoes-acao-resposta');
            videoPlayer.onended = function(){
                    ++curVideo;
                if(curVideo < nextVideo.length){    		
                    videoPlayer.src = nextVideo[curVideo];        
                } 
            }
            }*/
            
          /*  for (i=0; i<myPlaylistId[this.playlistId].length; i++){
                $('.opcoes-acao-resposta').append(myPlaylistId[this.playlistId][i]);
            }
            
            for (i=0; i<myPlaylist[this.playlistId].length; i++){
                $('.opcoes-acao-resposta').append(myPlaylist[this.playlistId][i]);
            }
    */
        		
	});
 };
                             
        
		
		/* Efeito fadeIn e fadeOut do footer */
		/*$(document).scroll(function() {
				var y = $(this).scrollTop();
				if(y > 520) {
						$('footer').fadeIn();
				} else {
						$('footer').fadeOut();
				}
    });*/
  })
});
