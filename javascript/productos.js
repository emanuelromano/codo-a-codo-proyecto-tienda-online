// Carga la lista completa de productos desde el JSON
function traerJson() {
    fetch("../json/productos.json")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let longitud = data.length

            let tarjetas = document.getElementsByClassName("tarjetas-productos")

            for (let i = 0; i < longitud; i++) {
                tarjetas[0].innerHTML +=
                    `<div class="tarjeta-producto" onclick="abrirProducto(${data[i].id})">
                        <img class="imagen-tarjeta" src=${data[i].imagen}>
                        <h3 class="titulo-tarjeta">· ${data[i].nombre} ·</h3>
                        <h4 class="precio-tarjeta">$${data[i].precio},00</h4>
                    </div>`
            }
        });
}

// Inicializar carro de compras o recuperar número de productos en el carro
function cargarContadorCarrito() {
    if (localStorage.getItem("contadorCarrito") === null) {
        localStorage.setItem("contadorCarrito", 0)
    } else {
        let contadorCarrito = parseInt(localStorage.getItem("contadorCarrito"))
        let botonCarrito = document.getElementsByClassName("boton-carrito-contador")
        botonCarrito[0].innerText = `Carro (${contadorCarrito})`
    }
}

// Abre la vista de un producto seleccionado
function abrirProducto(id) {
    localStorage.setItem("productoSeleccionado", id-1)

    window.open('producto.html', '_self')
}

window.addEventListener('load', function () {
    traerJson()
    cargarContadorCarrito()
})