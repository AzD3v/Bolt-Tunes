$(function() {

	setInterval(function(){
			$('#clock').text(new Date());
	}, 1000)

  // Exercício 3 e 4
  const youtubeAPIKey = "AIzaSyAvt_YeiVfbMrGKdNFaMuMo760ViQemm0k";

  $("#button").click(function() {

    const query = $('#search').val();

		let url = "https://www.googleapis.com/youtube/v3/search?q=" + query + "&maxResults=5&part=snippet&key=" + youtubeAPIKey;
		url = encodeURI(url);

		let table = $('<table></table>');
		table.attr('id', 'resultados');

		$('body').append(table);

		$.get(url, function(response) {
				for (let item of response.items) {

						if(!item.id.videoId) {
								continue;
						}

						let tr = $('<tr></tr>');
						table.append(tr);

						let td = $('<td></td>');
						tr.append(td);

						/* Processo de aceder às imagens
						let img = $('<img></img>');
						img.attr('src', item.snippet.thumbnails.default.url);

						td.append(img);

						td = $('<td></td>');
						tr.append(td);
						td.text(item.snippet.description);
						// td.css('background-color', 'yellow');

						img.click(function() {

								window.open('https://www.youtube.com/embed/item.id.videoId');

						});

						*/

						let iframe = $('<iframe></iframe>');
						iframe.attr('width', '320');
						iframe.attr('height', '195');
						iframe.attr('fameborder', '0');
						iframe.attr('allowfullscreen', '');
						iframe.attr('allow', 'autoplay; encrypted-media');
						iframe.attr('src', 'https://www.youtube.com/embed/' + item.id. videoId);
						td.append(iframe);
				}

		});

	});

});