// Cargar items del carrito en una lista
let itemsCarro = []
let totalPrecio = 0

function cargarItemsCarro() {
    if (localStorage.getItem("carroDeCompras") != null) {
        itemsCarro = JSON.parse(localStorage.getItem("carroDeCompras"))

        let long = itemsCarro.length
        let itemLista = document.getElementsByClassName("items-carro")

        if (long === 0) {
            itemLista[0].innerHTML +=
                `<div class="carro-vacio">
                    <i id="carro-icono" class="fa-solid fa-cart-shopping" style="color: #9d4a07;"></i>
                    <br>
                    <div class="nada-div">Aquí no hay nada...</div>
                    <br>
                    <div class="texto-vacio">Te invitamos a ver nuestros productos <br> y llenar tu carrito de compras.</div>
                    <br>
                    <button class="boton-ver-mas" onclick="verProductos()">Ver productos...</button>
                </div>`
        }

        for (let i = 0; i < long; i++) {

            let cant = itemsCarro[i].cantidadCompra
            let prec = itemsCarro[i].precio

            let resultado = prec * cant

            totalPrecio = totalPrecio + resultado
            let totalNum = document.getElementsByClassName("total-num")
            totalNum[0].innerText = `$${totalPrecio},00`

            itemLista[0].innerHTML +=
                `<tr class="item-carro">
                <td>
                    <img class="imagen-item" src=${itemsCarro[i].imagen}>
                </td>
                
                <td class="titulo-precio-item">
                    <div class="titulo-item">${itemsCarro[i].nombre}</div>
                    <div class="precio-item">$${itemsCarro[i].precio},00 C/U</div>
                </td>

                <td class="cantidad-mas-menos-item">
                    <div class="cantidad-item" id="item${itemsCarro[i].id}"><b>Cantidad: ${itemsCarro[i].cantidadCompra}</b></div>
                    <div class="cantidad-item" id="sub${itemsCarro[i].id}"><b>Subtotal: </b></div>
                    <button class="sumar-item" onclick="sumarItem(${i}, ${itemsCarro[i].id}, ${itemsCarro[i].precio})">+</button>
                    <button class="restar-item" onclick="restarItem(${i}, ${itemsCarro[i].id}, ${itemsCarro[i].precio})">-</button>
                    <button class="eliminar-item" onclick="eliminarItem(${i}, ${itemsCarro[i].precio})">Eliminar</button>
                </td>
            </tr>`

            let subtotal = document.getElementById(`sub${itemsCarro[i].id}`)
            subtotal.innerText = `Subtotal: $${resultado}`
        }
    } else {
        let carroDeCompras = []
        localStorage.setItem("carroDeCompras", JSON.stringify(carroDeCompras))
    }
}

// Inicializar contador de carro de compras o recuperar número de productos en el carro
function cargarContadorCarro() {
    if (localStorage.getItem("contadorCarrito") === null) {
        localStorage.setItem("contadorCarrito", 0)
        let contadorCarrito = parseInt(localStorage.getItem("contadorCarrito"))

        let botonCarrito = document.getElementsByClassName("boton-carrito-contador-selecc")
        botonCarrito[0].innerText = `Carro (${contadorCarrito})`
    } else {
        let contadorCarrito = parseInt(localStorage.getItem("contadorCarrito"))

        let botonCarrito = document.getElementsByClassName("boton-carrito-contador-selecc")
        botonCarrito[0].innerText = `Carro (${contadorCarrito})`
    }
}

// Sumar 1 item al carro
function sumarItem(i, id, precio) {
    let sum = itemsCarro[i].cantidadCompra + 1
    itemsCarro[i].cantidadCompra = sum

    localStorage.setItem("carroDeCompras", JSON.stringify(itemsCarro))

    let cant = document.getElementById(`item${id}`)
    cant.innerHTML = `<b>Cantidad: ${sum}</b>`

    let sub = document.getElementById(`sub${id}`)
    sub.innerText = `Subtotal: $${sum * precio}`

    let contadorCarrito = parseInt(localStorage.getItem("contadorCarrito"))
    let botonCarrito = document.getElementsByClassName("boton-carrito-contador-selecc")

    botonCarrito[0].innerText = `Carro (${contadorCarrito + 1})`
    localStorage.setItem("contadorCarrito", contadorCarrito + 1)

    totalPrecio = totalPrecio + precio
    let totalNum = document.getElementsByClassName("total-num")
    totalNum[0].innerText = `$${totalPrecio},00`
}

// Restar 1 item del carro
function restarItem(i, id, precio) {
    if (itemsCarro[i].cantidadCompra > 1) {
        let sum = itemsCarro[i].cantidadCompra - 1
        itemsCarro[i].cantidadCompra = sum

        localStorage.setItem("carroDeCompras", JSON.stringify(itemsCarro))

        let cant = document.getElementById(`item${id}`)
        cant.innerHTML = `<b>Cantidad: ${sum}</b>`

        let sub = document.getElementById(`sub${id}`)
        sub.innerText = `Subtotal: $${sum * precio}`

        let contadorCarrito = parseInt(localStorage.getItem("contadorCarrito"))
        let botonCarrito = document.getElementsByClassName("boton-carrito-contador-selecc")

        botonCarrito[0].innerText = `Carro (${contadorCarrito - 1})`
        localStorage.setItem("contadorCarrito", contadorCarrito - 1)

        totalPrecio = totalPrecio - precio
        let totalNum = document.getElementsByClassName("total-num")
        totalNum[0].innerText = `$${totalPrecio},00`
    }
}

// Eliminar item del carro
function eliminarItem(id, precio) {
    let cant = itemsCarro[id].cantidadCompra

    totalPrecio = 0

    let totalNum = document.getElementsByClassName("total-num")
    totalNum[0].innerText = `$${totalPrecio},00`

    itemsCarro.splice(id, 1)
    localStorage.setItem("carroDeCompras", JSON.stringify(itemsCarro))

    let itemLista = document.getElementsByClassName("items-carro")
    itemLista[0].innerHTML = ""

    cargarItemsCarro()

    let contadorCarrito = parseInt(localStorage.getItem("contadorCarrito"))
    let botonCarrito = document.getElementsByClassName("boton-carrito-contador-selecc")

    botonCarrito[0].innerText = `Carro (${contadorCarrito - cant})`
    localStorage.setItem("contadorCarrito", contadorCarrito - cant)
}

// Verificar validez de cupón
let banderaCupon = false

function verificarCupon() {
    if (banderaCupon === false) {
        let cupon = document.getElementsByClassName("input-cupon")
        let cuponMod = cupon[0].value.trim()
        cupon[0].value = cuponMod

        fetch("https://raw.githubusercontent.com/emanuelromano/codo-a-codo-proyecto-tienda-online/main/json/cupones.json")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                for (i = 0; i < data.length; i++) {
                    if (data[i].cupon === cuponMod) {

                        let descuento = totalPrecio * data[i].descuento
                        let totalDescuento = Math.round(((totalPrecio - descuento) + Number.EPSILON) * 100) / 100  // Redondea los decimales

                        let totalNum = document.getElementsByClassName("total-num")
                        totalNum[0].innerText = `$${totalDescuento},00`

                        let descuentoDiv = document.getElementsByClassName("descuento-div")
                        descuentoDiv[0].innerHTML =
                            `<div class="descuento-resta">
                            <b>Antes:
                            <div style="color: red; text-decoration: line-through;">$${totalPrecio},00</div>
                            </br>
                            Ahora:</b>
                        </div>`

                        totalPrecio = totalDescuento

                        let infoCupon = document.getElementsByClassName("info-cupon-div")
                        infoCupon[0].innerHTML =
                            `<div class="info-cupon" style="color: green; font-weight: bold">
                            ${data[i].texto}
                        </div>`

                        banderaCupon = true
                        break;
                    } else if (cuponMod === "") {
                        let infoCupon = document.getElementsByClassName("info-cupon-div")
                        infoCupon[0].innerHTML =
                            `<div class="info-cupon" style="color: #8b580a; font-weight: bold">
                            Ingrese un cupón.
                        </div>`
                    } else {
                        let infoCupon = document.getElementsByClassName("info-cupon-div")
                        infoCupon[0].innerHTML =
                            `<div class="info-cupon" style="color: red; font-weight: bold">
                            Cupón no válido.
                        </div>`
                    }
                }
            });
    } else {
        let infoCupon = document.getElementsByClassName("info-cupon-aplicado-div")
        infoCupon[0].innerHTML =
            `<div class="info-cupon-aplicado" style="color: red; font-weight: bold">
            Ya se aplicó un cupón de descuento.
        </div>`
    }
}

// Guarda la cantidad de items a comprar y el precio total a pagar
function efectuarCompra() {
    if (parseInt(localStorage.getItem("contadorCarrito")) != 0) {
        let cantidad = parseInt(localStorage.getItem("contadorCarrito"))
        let envio

        if (totalPrecio >= 15000) {
            envio = 0
        } else {
            envio = 2500
        }

        let compra = [{
            "cantidad": cantidad,
            "total": totalPrecio,
            "envio": envio
        }]

        localStorage.setItem("compra", JSON.stringify(compra))

        window.open('compra.html', '_self')
    } else {
        let alerta = document.getElementsByClassName("alerta-compra")
        alerta[0].innerHTML = `<div class="alerta-compra-info"><i class="fa-solid fa-circle-info" style="color: #000000;"></i> Debe haber al menos un item en el carro para realizar una compra.</div>`
    }
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

// Ver Productos
function verProductos() {
    window.open('productos.html', '_self')
}

// Funciones a ejecutarse al cargar completamente la página
window.addEventListener('load', function () {
    cargarContadorCarro()
    cargarItemsCarro()
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