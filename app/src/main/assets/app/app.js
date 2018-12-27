function setFormatNumber (integerNumber) {
	return parseInt(integerNumber).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

$('.data').html(localStorage.getItem('book progress'))

$(document).on('click', '.top', function(){
	$('html, body').animate({
		scrollTop: 0
	}, 700)
})

$('.ubah-halaman').slideUp()

progress = function(){
	$('.item').each(function(){
		persen = Math.round(parseInt($(this).find('.sekarang').html()) / parseInt($(this).find('.jumlah').html()) * 100)	
		$(this).find('.progress-bar').attr('aria-valuenow', persen).css('width', persen + '%')

		sekarang = $(this).find('.sekarang').html()
		jumlah = $(this).find('.jumlah').html()
		if (sekarang == jumlah){
			$(this).find('p').addClass('coret')
			$(this).find('.progress').slideUp()
		} else {
			$(this).find('p').removeClass('coret')
			$(this).find('.progress').slideDown()
		}
	})

	read = 0
	$('.sekarang').each(function(){
		read += parseInt($(this).html())
	})
	read /= 2
	read = setFormatNumber(read)
	$('.read').html(read)
}
progress()

$(document).on('click', '.edit', function(){
	$(this).parent().parent().find('.ubah-halaman').slideDown()
	$(this).parent().parent().find('.ubah-halaman').find('.form-control').focus()
})

$('.ubah-halaman').each(function(){
	halaman = parseInt($(this).parent().find('.sekarang').html())
	$(this).find('.form-control').val(halaman)
})
$(document).on('submit', '.ubah-halaman', function(){
	event.preventDefault()
	nilai = $(this).find('.form-control').val()
	$(this).parent().find('.sekarang').html(nilai)
	$(this).slideUp()
	progress()
	localStorage.setItem('book progress', $('.data').html())
})

$('.add-new').submit(function(){
	event.preventDefault()
	new_title = $('.new-title').val()
	new_author = $('.new-author').val()
	new_page = $('.new-page').val()
	if (new_title){
		$('.data').append('<tr class="item"><td class="edit-container"><div class="btn btn-warning edit"><div class="glyphicon glyphicon-pencil"></div></div></td><td><p><strong>' + new_title + '</strong> (<span class="sekarang">0</span> of <span class="jumlah">' + new_page + '</span>)<br>' + new_author + '</p><div class="sembunyi"><div class="sekarang">0</div><div class="jumlah">' + new_page + '</div></div><div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><form action="" class="form ubah-halaman"><div class="form-group"><input value="0" type="number" placeholder="Now page?" class="form-control"></div><input type="submit" value="Change" class="btn btn-success"></form></td><td class="hapus-container"><div class="hapus btn btn-danger"><div class="glyphicon glyphicon-remove"></div></div></td></tr>')
		progress()
		localStorage.setItem('book progress', $('.data').html())
		$('.ubah-halaman').slideUp()
		$('.new-title').val('')
		$('.new-author').val('')
		$('.new-page').val('')
	}
})

$(document).on('click', '.cek', function(){
	$(this).toggleClass('btn-default').toggleClass('btn-success').toggleClass('cek-oke')
	$(this).parent().parent().find('.isi').toggleClass('selesai')
	localStorage.setItem('book progress', $('.data').html())
})

$(document).on('click', '.hapus', function(){
	$(this).parent().parent().remove()
	progress()
	localStorage.setItem('book progress', $('.data').html())
})