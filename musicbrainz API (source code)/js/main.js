$(document).ready(function() {

		$("#search").click(function() {

			// Ler o valor da caixa de input
      let artist = $('#artist').val();
      console.log(artist);

			// Construir o url com o valor da caixa de input
      let url = 'http://musicbrainz.org/ws/2/artist/?query=artist:' + artist + '&fmt=json';
      url = encodeURI(url);

			// Fazer um pedido http get ao serviço MusicBrainz
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

					$('#filter').on('keyup',function(){

						 var value = $(this).val().toLowerCase();

						 $('#tableElem tbodyElem trElem').filter(

								 function(i, row) {
									$(row).toggle($(row).text().toLowerCase().indexOf(value) > -1);

							}

						 );

				 });


      });
    });
});
