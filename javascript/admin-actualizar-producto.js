function actualizarProducto() {
    var formData = new FormData();

    url = document.getElementById('nombre').value.trim().toLowerCase().replace(/ /g, "-")

    formData.append('id', document.getElementById('bottbuscar').value.trim())
    formData.append('nombre', document.getElementById('nombre').value.trim())
    formData.append('url', url)
    formData.append('imagen', document.getElementById('urlImagen').value.trim())
    formData.append('descripcion', document.getElementById('descripcion').value.trim())
    formData.append('porciones', document.getElementById('porciones').value.trim())
    formData.append('precio', document.getElementById('precio').value.trim())
    formData.append('enCarro', false)
    formData.append('cantidadCompra', 0)

    let api = `http://127.0.0.1:5000/productos/${document.getElementById('bottbuscar').value.trim()}`

    fetch(api, {
        method: 'PUT',
        body: formData // Aquí enviamos formData en lugar de JSON
    })
        .then(function (response) {
            if (response.ok) { return response.json(); }
        })
        .then(function (data) {
            alert('Producto actualizado correctamente.');
            // Limpiar el formulario para el proximo producto
            document.getElementById('bottbuscar').value = "";
            document.getElementById('nombre').value = "";
            document.getElementById('urlImagen').value = "";
            document.getElementById('descripcion').value = "";
            document.getElementById('porciones').value = "";
            document.getElementById('precio').value = "";

            var preview = document.getElementById('previsualizacion');
            preview.innerHTML = '';
        })
        .catch(function (error) {
            // Mostramos el error, y no limpiamos el form.
            alert('Error al actualizar el producto.');
        });
}

function buscarProducto() {
    fetch(`http://127.0.0.1:5000/productos/${document.getElementById('bottbuscar').value.trim()}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            document.getElementById('nombre').value = data.nombre;
            document.getElementById('urlImagen').value = data.imagen;
            document.getElementById('descripcion').value = data.descripcion;
            document.getElementById('porciones').value = data.porciones;
            document.getElementById('precio').value = data.precio;

            var preview = document.getElementById('previsualizacion');
            preview.innerHTML = '<img src="' + data.imagen + '" alt="Previsualización">';
        });
}

window.addEventListener('load', function () {

})