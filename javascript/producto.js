// Muestra los detalles del producto seleccionado
function mostrarProducto() {
    fetch("../json/productos.json")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let id = localStorage.getItem("productoSeleccionado")

            let producto = document.getElementsByClassName("mostrar-producto")

            producto[0].innerHTML =
                `<div class="producto">
                    <img class="imagen-producto" src=${data[id].imagen}>

                    <div class="info-producto">
                        <h3 class="titulo-producto">${data[id].nombre}</h3>
                        <h4 class="precio-producto">$${data[id].precio},00</h4>
                        <p class="descripcion-producto"><b>Descripción:</b> ${data[id].descripcion}</p>
                        <p class="porcion-producto"><b>Porciones:</b> ${data[id].porciones}</p>
                        <p class="atencion-producto"><b>Importante:</b> Una vez efectuado el pedido, el mismo estará disponible a partir de los próximos <b>cuatro días hábiles</b>.</p>
                        <button class="boton-ver-mas" onclick="addCarro()">Añadir al carro</button>
                        <div class="popup-div"></div>
                    </div>
                </div>`

            let contadorCarrito = parseInt(localStorage.getItem("contadorCarrito"))
            let botonCarrito = document.getElementsByClassName("boton-carrito-contador")
            botonCarrito[0].innerText = `Carro (${contadorCarrito})`
        });
}

mostrarProducto()

// Añade el producto al carro
let contador = 0

function addCarro() {
    localStorage.setItem("contadorProducto", contador)
    let cont = parseInt(localStorage.getItem("contadorProducto"))
    contador = cont + 1
    localStorage.setItem("contadorProducto", contador)

    let contadorCarrito = parseInt(localStorage.getItem("contadorCarrito"))
    let botonCarrito = document.getElementsByClassName("boton-carrito-contador")
    contadorCarrito = contadorCarrito + 1
    console.log(contadorCarrito)
    localStorage.setItem("contadorCarrito", contadorCarrito)
    botonCarrito[0].innerText = `Carro (${contadorCarrito})`

    let popup = document.getElementsByClassName("popup-div")
    popup[0].innerHTML =
        `<p class="popup-add-carro">Se han añadido ${contador} unidades de este producto al carro.
        </p>`
}