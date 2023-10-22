// Mostrar la cantidad de items a comprar y el precio total a pagar
let compra
let totalFinal

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

    totalFinal = compra[0].total + compra[0].envio

    let totalAPagarNum = document.getElementsByClassName("total-a-pagar-num")
    totalAPagarNum[0].innerHTML = `<b>$${totalFinal},00</b>`

    // Ocultar o mostrar el panel de retiro por local
    if (document.getElementById("retirar").checked === true) {
        let datosEnvio = document.getElementsByClassName("datos-envio-info")
        datosEnvio[0].style.display = "none";

        document.getElementById("direccion").value = ""
        document.getElementById("barrio").value = ""
        document.getElementById("ciudad").value = ""
        document.getElementById("codpos").value = ""

        document.getElementById("direccion").required = false
        document.getElementById("ciudad").required = false
        document.getElementById("codpos").required = false

        banderaRetiro = true
    } else {
        let datosRetiro = document.getElementsByClassName("datos-retiro")
        datosRetiro[0].style.display = "none";

        document.getElementById("direccion").required = true
        document.getElementById("ciudad").required = true
        document.getElementById("codpos").required = true

        banderaRetiro = false
    }
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

        document.getElementById("direccion").value = ""
        document.getElementById("barrio").value = ""
        document.getElementById("ciudad").value = ""
        document.getElementById("codpos").value = ""

        document.getElementById("direccion").required = false
        document.getElementById("ciudad").required = false
        document.getElementById("codpos").required = false
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

        document.getElementById("direccion").required = true
        document.getElementById("ciudad").required = true
        document.getElementById("codpos").required = true
    }
}

// Botón Pagar: validaciones y confirmación de compra
function botonPagar() {
    document.getElementById("nombre").value = document.getElementById("nombre").value.trim()
    document.getElementById("apellido").value = document.getElementById("apellido").value.trim()
    document.getElementById("email").value = document.getElementById("email").value.trim()

    document.getElementById("direccion").value = document.getElementById("direccion").value.trim()
    document.getElementById("barrio").value = document.getElementById("barrio").value.trim()
    document.getElementById("ciudad").value = document.getElementById("ciudad").value.trim()

    document.getElementById("nombretitular").value = document.getElementById("nombretitular").value.trim()

    let nombre = document.getElementById("nombre").value.trim()
    let apellido = document.getElementById("apellido").value.trim()
    let dni = document.getElementById("dni").value.trim()
    let telefono = document.getElementById("telefono").value.trim()
    let email = document.getElementById("email").value.trim()

    let direccion = document.getElementById("direccion").value.trim()

    let barrio
    if (document.getElementById("barrio").value.trim() === "") {
        barrio = "-"
    } else {
        barrio = document.getElementById("barrio").value.trim()
    }

    let ciudad = document.getElementById("ciudad").value.trim()
    let codpos = document.getElementById("codpos").value.trim()

    let nrotarj = document.getElementById("nrotarj").value.trim()
    let mesvenc = document.getElementById("mesvenc").value.trim()
    let añovenc = document.getElementById("añovenc").value.trim()
    let nombretitular = document.getElementById("nombretitular").value.trim()
    let dnititular = document.getElementById("dnititular").value.trim()
    let codseg = document.getElementById("codseg").value.trim()

    let nroPedido = Math.floor(Math.random() * 999999)

    const date = new Date();

    let dia = date.getDate();
    let mes = date.getMonth() + 1;
    let año = date.getFullYear();

    let infoCompra = [{
        "fechaCompra": dia + "-" + mes + "-" + año,
        "productos": compra[0].cantidad,
        "totalProductos": compra[0].total,
        "envio": compra[0].envio,
        "totalAPagar": totalFinal,

        "nroPedido": nroPedido,
        "nombre": nombre,
        "apellido": apellido,
        "dni": dni,
        "telefono": telefono,
        "email": email,

        "retiroLocal": banderaRetiro,
        "direccion": direccion,
        "barrio": barrio,
        "ciudad": ciudad,
        "codpos": codpos,

        "nrotarj": nrotarj,
        "mesvenc": mesvenc,
        "añovenc": añovenc,
        "nombretitular": nombretitular,
        "dnititular": dnititular,
        "codseg": codseg
    }]

    localStorage.setItem("infoCompra", JSON.stringify(infoCompra))
}

// Ocultar elementos del Nav Bar en modo para moviles
function menuHamburguesa() {
    let menuItemDisplay = window.getComputedStyle(document.querySelector('#menu-item-1')).display

    if (menuItemDisplay === "flex") {
        document.getElementById("menu-item-1").style.display = "none"
        document.getElementById("menu-item-2").style.display = "none"
        document.getElementById("menu-item-3").style.display = "none"
        document.getElementById("menu-item-4").style.display = "none"
    } else if (menuItemDisplay === "none") {
        document.getElementById("menu-item-1").style.display = "flex"
        document.getElementById("menu-item-2").style.display = "flex"
        document.getElementById("menu-item-3").style.display = "flex"
        document.getElementById("menu-item-4").style.display = "flex"
    }
}

// Funciones a ejecutarse al cargar completamente la página
window.addEventListener('load', function () {
    mostrarCompra()
    cargarContadorCarro()
})

// Ocultar elementos del Nav Bar en modo para moviles con Event Listener
function tamañoPantalla() {
    let tamaño = document.documentElement.clientWidth

    if (tamaño > 783) {
        document.getElementById("menu-item-1").style.display = "flex"
        document.getElementById("menu-item-2").style.display = "flex"
        document.getElementById("menu-item-3").style.display = "flex"
        document.getElementById("menu-item-4").style.display = "flex"
    } else if (tamaño <= 783) {
        document.getElementById("menu-item-1").style.display = "none"
        document.getElementById("menu-item-2").style.display = "none"
        document.getElementById("menu-item-3").style.display = "none"
        document.getElementById("menu-item-4").style.display = "none"
    }
}

window.addEventListener('resize', tamañoPantalla)