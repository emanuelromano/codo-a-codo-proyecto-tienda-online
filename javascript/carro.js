// Cargar items del carrito en una lista
let itemsCarro = []
let totalPrecio = 0
let totalPrecioConDesc = 0

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
            totalNum[0].innerText = `$${totalPrecio.toLocaleString()},00`

            itemLista[0].innerHTML +=
                `<tr class="item-carro">
                    <td onclick="volverAProducto(${itemsCarro[i].id})">
                        <img class="imagen-item" src=${itemsCarro[i].imagen} draggable="false">
                    </td>
                    
                    <td class="titulo-precio-item" onclick="volverAProducto(${itemsCarro[i].id})">
                        <div class="titulo-item">${itemsCarro[i].nombre}</div>
                        <div class="precio-item"><i class="fa-solid fa-money-bill-wave" style="color: #07b032;"></i> $${itemsCarro[i].precio.toLocaleString()},00 C/U</div>
                    </td>

                    <td class="cantidad-mas-menos-item">
                        <div class="cantidad-item" id="item${itemsCarro[i].id}"><b>Cantidad: ${itemsCarro[i].cantidadCompra}</b></div>
                        <div class="cantidad-item" id="sub${itemsCarro[i].id}"><b>Subtotal: </b></div>

                        <button class="sumar-item" onclick="sumarItem(${i}, ${itemsCarro[i].id}, ${itemsCarro[i].precio})"><i class="fa-solid fa-plus" style="color: #ffffff;"></i></button>
                        <button class="restar-item" onclick="restarItem(${i}, ${itemsCarro[i].id}, ${itemsCarro[i].precio})"><i class="fa-solid fa-minus" style="color: #ffffff;"></i></button>
                        <button class="eliminar-item" onclick="eliminarItem(${i}, ${itemsCarro[i].precio})"><i class="fa-solid fa-trash" style="color: #ffffff;"></i> Eliminar</button>
                    </td>
                </tr>`

            let subtotal = document.getElementById(`sub${itemsCarro[i].id}`)
            subtotal.innerText = `Subtotal: $${resultado.toLocaleString()}`
        }
    } else {
        let carroDeCompras = []
        localStorage.setItem("carroDeCompras", JSON.stringify(carroDeCompras))
    }
}


// Inicializar contador de carro de compras o recuperar número de productos en el carro
let contadorCarr

function cargarContadorCarro() {
    if (localStorage.getItem("contadorCarrito") === null) {
        localStorage.setItem("contadorCarrito", 0)
        let contadorCarrito = parseInt(localStorage.getItem("contadorCarrito"))

        let botonCarrito = document.getElementsByClassName("boton-carrito-contador-selecc")
        botonCarrito[0].innerText = `Carro (${contadorCarrito})`
        contadorCarr = contadorCarrito
    } else {
        let contadorCarrito = parseInt(localStorage.getItem("contadorCarrito"))

        let botonCarrito = document.getElementsByClassName("boton-carrito-contador-selecc")
        botonCarrito[0].innerText = `Carro (${contadorCarrito})`
        contadorCarr = contadorCarrito
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
    sub.innerText = `Subtotal: $${(sum * precio).toLocaleString()}`

    let contadorCarrito = parseInt(localStorage.getItem("contadorCarrito"))
    let botonCarrito = document.getElementsByClassName("boton-carrito-contador-selecc")

    botonCarrito[0].innerText = `Carro (${contadorCarrito + 1})`
    localStorage.setItem("contadorCarrito", contadorCarrito + 1)
    contadorCarr = contadorCarrito + 1

    totalPrecio = totalPrecio + precio
    let totalNum = document.getElementsByClassName("total-num")
    totalNum[0].innerText = `$${totalPrecio.toLocaleString()},00`

    if (banderaCupon === true) {
        aplicarDescuento()
    }
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
        sub.innerText = `Subtotal: $${(sum * precio).toLocaleString()}`

        let contadorCarrito = parseInt(localStorage.getItem("contadorCarrito"))
        let botonCarrito = document.getElementsByClassName("boton-carrito-contador-selecc")

        botonCarrito[0].innerText = `Carro (${contadorCarrito - 1})`
        localStorage.setItem("contadorCarrito", contadorCarrito - 1)
        contadorCarr = contadorCarrito - 1

        totalPrecio = totalPrecio - precio
        let totalNum = document.getElementsByClassName("total-num")
        totalNum[0].innerText = `$${totalPrecio.toLocaleString()},00`

        if (banderaCupon === true) {
            aplicarDescuento()
        }
    }
}


// Eliminar item del carro
function eliminarItem(id, precio) {
    let cant = itemsCarro[id].cantidadCompra

    totalPrecio = 0

    let totalNum = document.getElementsByClassName("total-num")
    totalNum[0].innerText = `$${totalPrecio.toLocaleString()},00`

    itemsCarro.splice(id, 1)
    localStorage.setItem("carroDeCompras", JSON.stringify(itemsCarro))

    let itemLista = document.getElementsByClassName("items-carro")
    itemLista[0].innerHTML = ""

    cargarItemsCarro()

    let contadorCarrito = parseInt(localStorage.getItem("contadorCarrito"))
    let botonCarrito = document.getElementsByClassName("boton-carrito-contador-selecc")

    botonCarrito[0].innerText = `Carro (${contadorCarrito - cant})`
    localStorage.setItem("contadorCarrito", contadorCarrito - cant)
    contadorCarr = contadorCarrito - cant

    if (banderaCupon === true) {
        aplicarDescuento()
    }

    if (contadorCarr === 0) {
        let descuentoDiv = document.getElementsByClassName("descuento-div")
        descuentoDiv[0].innerHTML = ""

        let infoCupon = document.getElementsByClassName("info-cupon-div")
        infoCupon[0].innerHTML = ""

        banderaCupon = false
        totalPrecioConDesc = 0

        let infoCuponAp = document.getElementsByClassName("info-cupon-aplicado-div")
        infoCuponAp[0].innerHTML = ""
    }
}


// API a utilizar:  TRUE = online / FALSE = local
let apiOnline = false
let api = ''

if (apiOnline == true) {
    api = 'https://emanuel.pythonanywhere.com/cupones'
} else {
    api = "http://127.0.0.1:5000/cupones"
}


// Verificar validez de cupón
let banderaCupon = false
let porcDesc

function verificarCupon() {
    if (banderaCupon === false) {
        let cupon = document.getElementsByClassName("input-cupon")
        let cuponTrim = cupon[0].value.trim()
        cupon[0].value = cuponTrim

        fetch(api)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                for (i = 0; i < data.length; i++) {
                    if (data[i].cupon === cuponTrim && contadorCarr != 0) {

                        porcDesc = data[i].descuento
                        let descuento = totalPrecio * porcDesc

                        let totalDescuento = Math.round(((totalPrecio - descuento) + Number.EPSILON) * 100) / 100  // Redondea los decimales estrictamente a dos dígitos
                        totalPrecioConDesc = totalPrecio - descuento

                        let totalNum = document.getElementsByClassName("total-num")
                        totalNum[0].innerText = `$${totalDescuento.toLocaleString()},00`

                        let descuentoDiv = document.getElementsByClassName("descuento-div")
                        descuentoDiv[0].innerHTML =
                            `<div class="descuento-resta">
                            <b>Antes:
                            <div class="precio-antes-text" style="color: red; text-decoration: line-through;">$${totalPrecio.toLocaleString()},00</div>
                            </br>
                            Ahora:</b>
                        </div>`

                        let infoCupon = document.getElementsByClassName("info-cupon-div")
                        infoCupon[0].innerHTML =
                            `<div class="info-cupon" style="color: green; font-weight: bold">
                            <i class="fa-solid fa-gift" style="color: green;"></i> ${data[i].texto}
                        </div>`

                        banderaCupon = true
                        break;
                    } else if (contadorCarr === 0) {
                        let infoCupon = document.getElementsByClassName("info-cupon-div")
                        infoCupon[0].innerHTML =
                            `<div class="info-cupon" style="color: #8b580a; font-weight: bold">
                            <i class="fa-solid fa-circle-info" style="color: #8b580a;"></i> Debe haber al menos un item en el carro para aplicar un cupón.
                        </div>`
                    } else if (cuponTrim === "") {
                        let infoCupon = document.getElementsByClassName("info-cupon-div")
                        infoCupon[0].innerHTML =
                            `<div class="info-cupon" style="color: #8b580a; font-weight: bold">
                            <i class="fa-solid fa-circle-info" style="color: #8b580a;"></i> Ingrese un cupón.
                        </div>`
                    } else {
                        let infoCupon = document.getElementsByClassName("info-cupon-div")
                        infoCupon[0].innerHTML =
                            `<div class="info-cupon" style="color: red; font-weight: bold">
                            <i class="fa-solid fa-circle-xmark" style="color: red;"></i> Cupón no válido.
                        </div>`
                    }
                }
            });
    } else if (banderaCupon === true) {
        let infoCupon = document.getElementsByClassName("info-cupon-aplicado-div")
        infoCupon[0].innerHTML =
            `<div class="info-cupon-aplicado" style="color: #8b580a; font-weight: bold">
            <i class="fa-solid fa-circle-info" style="color: #8b580a;"></i> Ya se aplicó un cupón de descuento.
        </div>`
    }
}

// Aplica el descuelto al sumar o mermar items
function aplicarDescuento() {
    if (banderaCupon === true) {
        let descuento = totalPrecio * porcDesc
        let totalAPagar = totalPrecio - descuento
        totalPrecioConDesc = totalAPagar

        let precioAntesText = document.getElementsByClassName("precio-antes-text")
        precioAntesText[0].innerText = `$${totalPrecio.toLocaleString()},00`

        let totalNum = document.getElementsByClassName("total-num")
        totalNum[0].innerText = `$${totalAPagar.toLocaleString()},00`
    }
}


// Volver a item
function volverAProducto(id) {
    localStorage.setItem("productoSeleccionado", id-1)
    localStorage.setItem("volverA", true)
    window.open('producto.html', '_self')
}


// Guarda la cantidad de items a comprar y el precio total a pagar
function efectuarCompra() {
    if (parseInt(localStorage.getItem("contadorCarrito")) != 0) {
        let cantidad = parseInt(localStorage.getItem("contadorCarrito"))
        let envio
        let total

        if (totalPrecio >= 15000) {
            envio = 0
        } else {
            envio = 2500
        }

        if (banderaCupon === true) {
            total = totalPrecioConDesc
        } else if (banderaCupon === false) {
            total = totalPrecio
        }

        let compra = [{
            "cantidad": cantidad,
            "total": total,
            "envio": envio
        }]

        localStorage.setItem("compra", JSON.stringify(compra))

        window.open('compra.html', '_self')
    } else {
        let alerta = document.getElementsByClassName("alerta-compra")
        alerta[0].innerHTML = `<div class="alerta-compra-info">
            <i class="fa-solid fa-circle-info" style="color: #000000;"></i> Debe haber al menos un item en el carro para realizar una compra.
        </div>`
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
    localStorage.setItem("volverA", false)
})


// Ocultar elementos del Nav Bar en modo para moviles con Event Listener
function tamañoPantalla() {
    let tamaño = document.documentElement.clientWidth

    if (tamaño > 800) {
        document.getElementById("menu-item-1").style.display = "flex"
        document.getElementById("menu-item-2").style.display = "flex"
        document.getElementById("menu-item-3").style.display = "flex"
        document.getElementById("menu-item-4").style.display = "flex"
    } else if (tamaño <= 800) {
        document.getElementById("menu-item-1").style.display = "none"
        document.getElementById("menu-item-2").style.display = "none"
        document.getElementById("menu-item-3").style.display = "none"
        document.getElementById("menu-item-4").style.display = "none"
    }
}

window.addEventListener('resize', tamañoPantalla)