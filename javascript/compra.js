// Mostrar la cantidad de items a comprar y el precio total a pagar
function mostrarCompra() {
    let compra = JSON.parse(localStorage.getItem("compra"))

    let productos = document.getElementsByClassName("productos-div")
    let total = document.getElementsByClassName("total-div")

    productos[0].innerHTML = `Productos: <b>${compra[0].cantidad}</b>`
    total[0].innerHTML = `Total a pagar: <b>$${compra[0].total},00</b>`

    // Ocultar el panel de retiro por local
    let datosRetiro = document.getElementsByClassName("datos-retiro")
    datosRetiro[0].style.display = "none";
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

// Mostrar la opcion de retirar el pedido en el local
let banderaRetiro = false

function retirarEnLocal() {
    let datosEnvio = document.getElementsByClassName("datos-envio-info")
    let datosRetiro = document.getElementsByClassName("datos-retiro")

    if (banderaRetiro === false) {
        datosEnvio[0].style.display = "none";
        datosRetiro[0].style.display = "block";
        banderaRetiro = true
    } else {
        datosEnvio[0].style.display = "block";
        datosRetiro[0].style.display = "none";
        banderaRetiro = false
    }
}

// Funciones a ejecutarse al cargar completamente la página
window.addEventListener('load', function () {
    mostrarCompra()
    cargarContadorCarro()
})