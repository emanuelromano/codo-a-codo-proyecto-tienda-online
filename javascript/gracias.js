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

// Llena el ticket con la información de la compra
let nroPedidoTicket

function mostrarInfoCompra() {
    localStorage.setItem("carroDeCompras", JSON.stringify([]))
    localStorage.setItem("contadorCarrito", 0)

    let contadorCarrito = parseInt(localStorage.getItem("contadorCarrito"))
    let botonCarrito = document.getElementsByClassName("boton-carrito-contador-selecc")
    botonCarrito[0].innerText = `Carro (${contadorCarrito})`

    let infoCompra = JSON.parse(localStorage.getItem("infoCompra"))

    nroPedidoTicket = infoCompra[0].nroPedido 

    document.getElementById("nroPedido").innerHTML = `Nro. de pedido: <b>${infoCompra[0].nroPedido}</b>`
    document.getElementById("fechaCompra").innerHTML = `Fecha: <b>${infoCompra[0].fechaCompra}</b>`
    document.getElementById("fechaEntrega").innerHTML = `Fecha entrega (aprox.): <b>${infoCompra[0].fechaEntrega}</b>`
    document.getElementById("productos").innerHTML = `Productos: <b>${infoCompra[0].productos}</b>`
    document.getElementById("totalProductos").innerHTML = `Total productos: <b>$${infoCompra[0].totalProductos}</b>`
    document.getElementById("envio").innerHTML = `Envío: <b>$${infoCompra[0].envio}</b>`
    document.getElementById("totalAPagar").innerHTML = `Total a pagar: <b style="color: #fa9600;">$${infoCompra[0].totalAPagar}</b>`

    document.getElementById("nombre").innerHTML = `Nombre: <b>${infoCompra[0].nombre}</b>`
    document.getElementById("apellido").innerHTML = `Apellido: <b>${infoCompra[0].apellido}</b>`
    document.getElementById("dni").innerHTML = `D.N.I.: <b>${infoCompra[0].dni}</b>`
    document.getElementById("telefono").innerHTML = `Teléfono: <b>${infoCompra[0].telefono}</b>`
    document.getElementById("email").innerHTML = `E-mail: <b>${infoCompra[0].email}</b>`

    if (infoCompra[0].retiroLocal === false) {
        document.getElementById("direccion").innerHTML = `Dirección: <b>${infoCompra[0].direccion}</b>`
        document.getElementById("barrio").innerHTML = `Barrio: <b>${infoCompra[0].barrio}</b>`
        document.getElementById("ciudad").innerHTML = `Ciudad: <b>${infoCompra[0].ciudad}</b>`
        document.getElementById("codpos").innerHTML = `Cód. postal: <b>${infoCompra[0].codpos}</b>`

        document.getElementById("pedido-info-datos-y").style.display = "none"
    } else if (infoCompra[0].retiroLocal === true){
        document.getElementById("pedido-info-datos-x").style.display = "none"
        document.getElementById("pedido-info-datos-y").style.display = "block"
    }
}

function imprimirTicket() {
    let w = document.getElementById("ticket-imprimir").style.width;
    let h = document.getElementById("ticket-imprimir").style.height;
    let f = document.getElementById("ticket-imprimir").style.fontSize;

    document.getElementById("ticket-imprimir").style.height = "1000px";
    document.getElementById("ticket-imprimir").style.width = "692px";
    document.getElementById("ticket-imprimir").style.fontSize = "100px";

    html2canvas(document.querySelector("#ticket-imprimir"), { scrollY: -window.scrollY })
        .then(canvas => {
            var img = canvas.toDataURL("image/png");
            var doc = new jsPDF('p', 'mm');
            doc.addImage(img, 'PNG', 10, 10);
            doc.save(`Ticket-pedido-${nroPedidoTicket}.pdf`);
        });

    document.getElementById("ticket-imprimir").style.width = w;
    document.getElementById("ticket-imprimir").style.height = h;
    document.getElementById("ticket-imprimir").style.fontSize = f;
}

// Funciones a ejecutarse al cargar completamente la página
window.addEventListener('load', function () {
    mostrarInfoCompra()
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