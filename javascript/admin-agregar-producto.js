function agregarProducto() {
    var formData = new FormData();

    url = document.getElementById('nombre').value.trim().toLowerCase().replace(/ /g, "-")

    formData.append('nombre', document.getElementById('nombre').value.trim())
    formData.append('url', url)
    formData.append('imagen', document.getElementById('urlImagen').value.trim())
    formData.append('descripcion', document.getElementById('descripcion').value.trim())
    formData.append('porciones', document.getElementById('porciones').value.trim())
    formData.append('precio', document.getElementById('precio').value.trim())
    formData.append('enCarro', false)
    formData.append('cantidadCompra', 0)

    // let api = "http://127.0.0.1:5000/productos"
    let api = 'https://emanuel.pythonanywhere.com/productos'

    fetch(api, {
        method: 'POST',
        body: formData // Aquí enviamos formData en lugar de JSON
    })
        .then(function (response) {
            if (response.ok) { return response.json(); }
        })
        .then(function (data) {
            alert('Producto agregado correctamente.');
            // Limpiar el formulario para el proximo producto
            document.getElementById('nombre').value = "";
            document.getElementById('urlImagen').value = "";
            document.getElementById('descripcion').value = "";
            document.getElementById('porciones').value = "";
            document.getElementById('precio').value = "";
        })
        .catch(function (error) {
            // Mostramos el error, y no limpiamos el form.
            alert('Error al agregar el producto.');
        });
}

window.addEventListener('load', function () {

})