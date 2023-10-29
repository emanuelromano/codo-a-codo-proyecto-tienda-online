// Carga la lista completa de productos desde el JSON
function mostrarProductos() {
    fetch("https://raw.githubusercontent.com/emanuelromano/codo-a-codo-proyecto-tienda-online/main/json/productos.json")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let longitud = data.length

            let tarjetas = document.getElementsByClassName("tarjetas-productos")

            for (let i = 0; i < longitud; i++) {
                tarjetas[0].innerHTML +=
                    `<div class="tarjeta-producto" onclick="abrirProducto(${data[i].id})">
                        <img class="imagen-tarjeta" src=${data[i].imagen} draggable="false">
                        <h3 class="titulo-tarjeta"> ${data[i].nombre}</h3>
                        <h4 class="precio-tarjeta"><i class="fa-solid fa-money-bill-wave" style="color: #07b032;"></i> $${data[i].precio},00</h4>
                    </div>`
            }
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
}


// Abre la vista de un producto seleccionado
function abrirProducto(id) {
    localStorage.setItem("productoSeleccionado", id-1)
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
    mostrarProductos()
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