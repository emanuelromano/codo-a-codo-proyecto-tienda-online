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

window.addEventListener('load', function () {
    cargarContadorCarrito()
})