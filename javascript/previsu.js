
function mostrarPrevisualizacion() {
    var urlInput = document.getElementById('urlImagen');
    var url = urlInput.value.trim();

    if (url !== "") {
        var preview = document.getElementById('previsualizacion');
        preview.innerHTML = '<img src="' + url + '" alt="Previsualización">';
    } else {
        alert('Por favor, ingrese una URL de imágen válida.');
    }
}
