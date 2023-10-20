// Mostrar la cantidad de items a comprar y el precio total a pagar
function mostrarCompra() {
    let compra = JSON.parse(localStorage.getItem("compra"))

    let productos = document.getElementsByClassName("productos-div")
    let total = document.getElementsByClassName("total-div")

    productos[0].innerHTML = `Productos: <b>${compra[0].cantidad}</b>`
    total[0].innerHTML = `Total a pagar: <b>$${compra[0].total},00</b>`
}

// Inicializar contador de carro de compras o recuperar número de productos en el carro
function cargarContadorCarro() {
    if (localStorage.getItem("contadorCarrito") === null) {
        localStorage.setItem("contadorCarrito", 0)
    } else {
        let contadorCarrito = parseInt(localStorage.getItem("contadorCarrito"))
        let botonCarrito = document.getElementsByClassName("boton-carrito-contador-selecc")
        botonCarrito[0].innerText = `Carro (${contadorCarrito})`
    }
}

// Funciones a ejecutarse al cargar completamente la página
window.addEventListener('load', function () {
    mostrarCompra()
    cargarContadorCarro()
})