// API a utilizar:  TRUE = online / FALSE = local
let apiOnline = false
let api = ''

if (apiOnline == true) {
    api = 'https://emanuel.pythonanywhere.com/productos'
} else {
    api = "http://127.0.0.1:5000/productos"
}


// Muestra los detalles del producto seleccionado
function mostrarProducto() {
    fetch(api)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let id = localStorage.getItem("productoSeleccionado")

            let producto = document.getElementsByClassName("mostrar-producto")
            arrayProducto = data[id]

            producto[0].innerHTML =
                `<div class="producto">
                    <img class="imagen-producto" src=${data[id].imagen} draggable="false">

                    <div class="info-producto">
                        <h3 class="titulo-producto">${data[id].nombre}</h3>
                        <h4 class="precio-producto"><i class="fa-solid fa-money-bill-wave" style="color: #07b032;"></i> $${data[id].precio},00</h4>
                        <p class="descripcion-producto"><b>Descripción:</b> ${data[id].descripcion}</p>
                        <p class="porcion-producto"><b>Porciones:</b> ${data[id].porciones}</p>
                        <button class="boton-ver-mas" onclick="addCarro()">Añadir al carro</button>
                        <div class="popup-div"></div>
                        <p class="atencion-producto"><i class="fa-solid fa-circle-info" style="color: #000000;"></i> <b>Importante:</b> Una vez efectuado el pedido, el mismo estará disponible a partir de los próximos <b>cuatro días hábiles</b> como mínimo. Se le notificará por teléfono / mail el estado de su pedido.</p>
                    </div>
                </div>`
        });
}


// Inicializar contador de carro de compras o recuperar número de productos en el carro
let carroDeCompras = []

function cargarCarro() {
    if (localStorage.getItem("contadorCarrito") === null) {
        localStorage.setItem("contadorCarrito", 0)
    } else {
        let contadorCarrito = parseInt(localStorage.getItem("contadorCarrito"))
        let botonCarrito = document.getElementsByClassName("boton-carrito-contador")
        botonCarrito[0].innerText = `Carro (${contadorCarrito})`
    }

    if (localStorage.getItem("carroDeCompras") === null) {
        localStorage.setItem("carroDeCompras", JSON.stringify(carroDeCompras))
    } else {
        carroDeCompras = JSON.parse(localStorage.getItem("carroDeCompras"))
    }
}


// Añade el producto al carro
let contador = 0
let bandera = false

function addCarro() {
    // Incrementar contador en página de producto y carro de compras
    contador = contador + 1
    localStorage.setItem("contadorProducto", contador)

    let contadorCarrito = parseInt(localStorage.getItem("contadorCarrito"))
    let botonCarrito = document.getElementsByClassName("boton-carrito-contador")
    contadorCarrito = contadorCarrito + 1
    localStorage.setItem("contadorCarrito", contadorCarrito)
    botonCarrito[0].innerText = `Carro (${contadorCarrito})`

    let popup = document.getElementsByClassName("popup-div")
    popup[0].innerHTML =
        `<p class="popup-add-carro">
            <i class="fa-solid fa-cart-plus" style="color: #000000;"></i> Se han añadido <b>${contador} unidades</b> de este producto al carro de compras.
            </br>
            <button class="boton-ver-carro" onclick="verCarro()"><b>Ver carro</b></button>
            <button class="boton-seguir-comprando" onclick="seguirComprando()"><b>Seguir comprando</b></button>
        </p>`

    // Añadir producto a carro de compras en un arreglo
    let long = carroDeCompras.length

    // Bandera para verificar si existe el producto seleccionado en el carro
    for (var i = 0; i < long; i++) {
        if (carroDeCompras[i].id === arrayProducto.id) {
            bandera = true
        }
    }

    // Si no existe aún, lo agrega
    if (bandera === false) {
        arrayProducto.cantidadCompra = contador
        carroDeCompras[long++] = arrayProducto
        localStorage.setItem("carroDeCompras", JSON.stringify(carroDeCompras))
    } else if (bandera === true) {
        for (var i = 0; i < long; i++) {
            // Si ya existe un item con la ID de este producto, se actualiza la cantidad en el carro
            if (carroDeCompras[i].id === arrayProducto.id) {
                carroDeCompras[i].cantidadCompra = carroDeCompras[i].cantidadCompra + 1
                localStorage.setItem("carroDeCompras", JSON.stringify(carroDeCompras))
                break;
            }
        }
    }
}


// Funciones de botones al presionar botón Añadir al carro
function verCarro() {
    window.open('carro.html', '_self')
}

function seguirComprando() {
    window.open('productos.html', '_self')
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


// Volver a Productos o Carro
function volver() {
    console.log(localStorage.getItem("volverA"))
    if (localStorage.getItem("volverA") === "true") {
        window.open('carro.html', '_self')
    } else {
        window.open('productos.html', '_self')
    }
}


// Funciones a ejecutarse al cargar completamente la página
window.addEventListener('load', function () {
    mostrarProducto()
    cargarCarro()
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