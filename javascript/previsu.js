
function mostrarPrevisualizacion() {
    var urlInput = document.getElementById('urlImagen');
    var url = urlInput.value.trim();

    if (url !== "") {
        var preview = document.getElementById('previsualizacion');
        preview.innerHTML = '<img src="' + url + '" alt="Previsualización">';
    } else {
        alert('Link invalido, intente nuevamente con otro link');
    }
}
