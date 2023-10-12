// Muestra los detalles del producto seleccionado
function mostrarProducto() {
    fetch("../json/productos.json")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let id = 4

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
                        <button class="boton-ver-mas" onclick="">Añadir al carro</button>

                    </div>
                </div>`

        });
}

mostrarProducto()