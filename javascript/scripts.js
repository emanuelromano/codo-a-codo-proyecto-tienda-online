// function traerJson() {
//     fetch("../json/productos.json")
//         .then((res) => {
//             return res.json();
//         })
//         .then((data) => console.log(data));
// }

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
                `<img class="imagen-tarjeta" src=${data[num1].imagen}>
                <h3 class="titulo-tarjeta">· ${data[num1].nombre} ·</h3>
                <h4 class="precio-tarjeta">$${data[num1].precio},00</h4>`

            tarjeta2[0].innerHTML =
                `<img class="imagen-tarjeta" src=${data[num2].imagen}>
                <h3 class="titulo-tarjeta">· ${data[num2].nombre} ·</h3>
                <h4 class="precio-tarjeta">$${data[num2].precio},00</h4>`
        });
}

cargarItemsInicio()

// Carga la lista completa de productos desde el JSON
function traerJson() {
    fetch("../json/productos.json")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let longitud = data.length

            let tarjetas = document.getElementsByClassName("tarjetas-productos")

            for (let i = 0; i < longitud; i++) {
                tarjetas[0].innerHTML +=
                    `<div class="tarjeta-producto" onclick="abrirProducto(${data[i].id})">
                        <img class="imagen-tarjeta" src=${data[i].imagen}>
                        <h3 class="titulo-tarjeta">· ${data[i].nombre} ·</h3>
                        <h4 class="precio-tarjeta">$${data[i].precio},00</h4>
                    </div>`
            }
        });
}

traerJson()

// Abre la vista de un producto en particular
function abrirProducto(id) {
    console.log(id)
}

function mostrarProducto() {
    fetch("../json/productos.json")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let id = 0

            let producto = document.getElementsByClassName("mostrar-producto")

            producto[0].innerHTML =
                `<div class="producto">
                    <img class="imagen-producto" src=${data[id].imagen}>

                    <div class="info-producto">
                        <h3 class="titulo-producto">${data[id].nombre}</h3>
                        <h4 class="precio-producto">$${data[id].precio},00</h4>
                        <p class="descripcion-producto"><b>Descripción:</b> ${data[id].descripcion}</p>
                        <p class="porcion-producto"><b>Porciones:</b> ${data[id].porciones}</p>
                        <button class="boton-ver-mas" onclick="">Añadir al carro</button>

                    </div>
                </div>`

        });
}

mostrarProducto()