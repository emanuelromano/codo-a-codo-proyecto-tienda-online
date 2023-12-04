// Carga la lista completa de productos desde el JSON
function mostrarProductos() {
    fetch("http://127.0.0.1:5000/productos")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let longitud = data.length

            let items = document.getElementsByClassName("items-productos-admin")

            for (let i = 0; i < longitud; i++) {
                items[0].innerHTML +=
                    `<tr class="item-carro">
                    <td>
                        <img class="imagen-item" src=${data[i].imagen} draggable="false">
                    </td>
                    
                    <td class="titulo-precio-item">
                        <div class="titulo-item">${data[i].nombre}</div>
                        <div class="precio-item"><i class="fa-solid fa-money-bill-wave" style="color: #07b032;"></i> $${data[i].precio.toLocaleString()},00 - ID: ${data[i].id}</div>
                    </td>

                    <td class="cantidad-mas-menos-item">
                        <button class="eliminar-item" onclick="eliminarItem(${data[i].id},)"><i class="fa-solid fa-trash" style="color: #ffffff;"></i> Eliminar</button>
                    </td>
                </tr>`
            }
        });
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
    mostrarProductos()
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