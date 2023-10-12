// Carga dos productos aleatorios en la página de inicio
function cargarItemsInicio() {
    fetch("../json/productos.json")
        .then((res) => {
            return res.json();
        })
        .then((data) => {

            function obtenerAleatorio(max) {
                return Math.floor(Math.random() * max);
            }

            let num1 = obtenerAleatorio(8) // Salida: 0 a 7
            let num2 = obtenerAleatorio(8)

            while (num2 == num1) {
                num2 = obtenerAleatorio(8)
            }

            let tarjeta1 = document.getElementsByClassName("tarjeta1")
            let tarjeta2 = document.getElementsByClassName("tarjeta2")

            tarjeta1[0].innerHTML =
                `<div onclick="abrirProducto(${data[num1].id})">
                    <img class="imagen-tarjeta" src=${data[num1].imagen}>
                    <h3 class="titulo-tarjeta">· ${data[num1].nombre} ·</h3>
                    <h4 class="precio-tarjeta">$${data[num1].precio},00</h4>
                </div>`

            tarjeta2[0].innerHTML =
                `<div onclick="abrirProducto(${data[num2].id})">
                    <img class="imagen-tarjeta" src=${data[num2].imagen}>
                    <h3 class="titulo-tarjeta">· ${data[num2].nombre} ·</h3>
                    <h4 class="precio-tarjeta">$${data[num2].precio},00</h4>
                </div>`
        });
}

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

// Abre la vista de un producto seleccionado
function abrirProducto(id) {
    localStorage.setItem("productoSeleccionado", id - 1)

    window.open('producto.html', '_self')
}

function resetCarrito() {
    localStorage.setItem("contadorCarrito", 0)
    let botonCarrito = document.getElementsByClassName("boton-carrito-contador")
    botonCarrito[0].innerText = `Carro (0)`
}

window.addEventListener('load', function () {
    cargarItemsInicio()
    cargarContadorCarrito()
})