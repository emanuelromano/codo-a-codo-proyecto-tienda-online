// Carga dos productos aleatorios en la página de inicio
let carroDeCompras = []

function cargarItemsInicio() {
    fetch("http://127.0.0.1:5000/productos")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            function obtenerAleatorio(max) {
                return Math.floor(Math.random() * max);
            }

            let num1 = obtenerAleatorio(9) // Salida: 0 a 8
            let num2 = obtenerAleatorio(9)

            while (num2 == num1) {
                num2 = obtenerAleatorio(8)
            }

            let tarjeta1 = document.getElementsByClassName("tarjeta1")
            let tarjeta2 = document.getElementsByClassName("tarjeta2")

            tarjeta1[0].innerHTML =
                `<div onclick="abrirProducto(${data[num1].id})">
                    <img class="imagen-tarjeta" src=${data[num1].imagen} draggable="false">
                    <h3 class="titulo-tarjeta">${data[num1].nombre}</h3>
                    <h4 class="precio-tarjeta"><i class="fa-solid fa-money-bill-wave" style="color: #07b032;"></i> $${data[num1].precio},00</h4>
                </div>`

            tarjeta2[0].innerHTML =
                `<div onclick="abrirProducto(${data[num2].id})">
                    <img class="imagen-tarjeta" src=${data[num2].imagen} draggable="false">
                    <h3 class="titulo-tarjeta">${data[num2].nombre}</h3>
                    <h4 class="precio-tarjeta"><i class="fa-solid fa-money-bill-wave" style="color: #07b032;"></i> $${data[num2].precio},00</h4>
                </div>`
        });
}


// Inicializar contador de carro de compras o recuperar número de productos en el carro
function cargarContadorCarrito() {
    if (localStorage.getItem("contadorCarrito") === null) {
        localStorage.setItem("contadorCarrito", 0)
    } else {
        let contadorCarrito = parseInt(localStorage.getItem("contadorCarrito"))
        let botonCarrito = document.getElementsByClassName("boton-carrito-contador")
        botonCarrito[0].innerText = `Carro (${contadorCarrito})`
    }

    if (localStorage.getItem("carroDeCompras") === null) {
        localStorage.setItem("carroDeCompras", JSON.stringify(carroDeCompras))
    }
}


// Abre la vista de un producto seleccionado
function abrirProducto(id) {
    localStorage.setItem("productoSeleccionado", id - 1)
    window.open('producto.html', '_self')
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
    cargarItemsInicio()
    cargarContadorCarrito()
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


// DEBUG - Reinicia contador de carro, carro de compras, compra final e info de compras
function debug() {
    localStorage.setItem("contadorCarrito", 0)
    localStorage.setItem("carroDeCompras", JSON.stringify([]))
    localStorage.removeItem("compra")
    localStorage.removeItem("infoCompra")
    let botonCarrito = document.getElementsByClassName("boton-carrito-contador")
    botonCarrito[0].innerText = `Carro (0)`
}