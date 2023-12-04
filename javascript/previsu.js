
function mostrarPrevisualizacion() {
    var urlInput = document.getElementById('urlImagen');
    var url = urlInput.value.trim();

    if (url !== "") {
        var preview = document.getElementById('previsualizacion');
        preview.innerHTML = '<img src="' + url + '" alt="Previsualización">';
    } else {
<<<<<<< HEAD
        alert('Por favor, ingrese una URL de imágen válida.');
=======
        alert('Link invalido, intente nuevamente con otro link');
>>>>>>> e2a4af2b2b1ca288d2cd4400126b3da6e2d41013
    }
}
