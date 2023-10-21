// Mostrar la cantidad de items a comprar y el precio total a pagar
let compra

function mostrarCompra() {
    compra = JSON.parse(localStorage.getItem("compra"))

    let productos = document.getElementsByClassName("productos-div")
    let totalProd = document.getElementsByClassName("total-div")
    let envio = document.getElementsByClassName("envio-div")

    productos[0].innerHTML = `Productos: <b>${compra[0].cantidad}</b>`
    totalProd[0].innerHTML = `Total productos: <b>$${compra[0].total},00</b>`

    if (compra[0].envio === 0) {
        envio[0].innerHTML = `Envío: <b style="color: green;">GRATIS</b>`
    } else {
        envio[0].innerHTML = `Envío: <b>$${compra[0].envio},00</b>`
    }

    let total = compra[0].total + compra[0].envio

    let totalAPagarNum = document.getElementsByClassName("total-a-pagar-num")
    totalAPagarNum[0].innerHTML = `<b>$${total},00</b>`

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

        let envio = document.getElementsByClassName("envio-div")
        envio[0].innerHTML = `<div>Envío: <b style="color: green;">Retiro en local GRATIS</b></div>`

        let totalAPagarNum = document.getElementsByClassName("total-a-pagar-num")
        totalAPagarNum[0].innerHTML = `<b>$${compra[0].total},00</b>`
    } else {
        datosEnvio[0].style.display = "block";
        datosRetiro[0].style.display = "none";
        banderaRetiro = false

        let envio = document.getElementsByClassName("envio-div")

        if (compra[0].envio === 0) {
            envio[0].innerHTML = `Envío: <b style="color: green;">GRATIS</b>`
        } else {
            envio[0].innerHTML = `Envío: <b>$${compra[0].envio},00</b>`
        }

        let totalAPagarNum = document.getElementsByClassName("total-a-pagar-num")
        totalAPagarNum[0].innerHTML = `<b>$${compra[0].total + compra[0].envio},00</b>`
    }
}

// Funciones a ejecutarse al cargar completamente la página
window.addEventListener('load', function () {
    mostrarCompra()
    cargarContadorCarro()
})