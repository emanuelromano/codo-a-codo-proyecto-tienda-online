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

function mostrarInfoCompra() {
    // console.log(JSON.parse(localStorage.getItem("infoCompra")))

    let infoCompra = JSON.parse(localStorage.getItem("infoCompra"))

    document.getElementById("fecha").innerHTML = `Fecha: <b>${infoCompra[0].fechaCompra}</b>`
    document.getElementById("nroPedido").innerHTML = `Nro. de pedido: <b>${infoCompra[0].nroPedido}</b>`
    document.getElementById("productos").innerHTML = `Productos: <b>${infoCompra[0].productos}</b>`
    document.getElementById("totalProductos").innerHTML = `Total productos: <b>$${infoCompra[0].totalProductos}</b>`
    document.getElementById("envio").innerHTML = `Envío: <b>$${infoCompra[0].envio}</b>`
    document.getElementById("totalAPagar").innerHTML = `Total a pagar: <b style="color: #fa9600;">$${infoCompra[0].totalAPagar}</b>`

    document.getElementById("nombre").innerHTML = `Nombre: <b>${infoCompra[0].nombre}</b>`
    document.getElementById("apellido").innerHTML = `Apellido: <b>${infoCompra[0].apellido}</b>`
    document.getElementById("dni").innerHTML = `D.N.I.: <b>${infoCompra[0].dni}</b>`
    document.getElementById("telefono").innerHTML = `Teléfono: <b>${infoCompra[0].telefono}</b>`
    document.getElementById("email").innerHTML = `E-mail: <b>${infoCompra[0].email}</b>`

    document.getElementById("direccion").innerHTML = `Dirección: <b>${infoCompra[0].direccion}</b>`
    document.getElementById("barrio").innerHTML = `Barrio: <b>${infoCompra[0].barrio}</b>`
    document.getElementById("ciudad").innerHTML = `Ciudad: <b>${infoCompra[0].ciudad}</b>`
    document.getElementById("codpos").innerHTML = `Cód. postal: <b>${infoCompra[0].codpos}</b>`
}

function imprimirTicket() {
    // html2canvas(document.querySelector("#ticket-imprimir"), {
    //     onrendered: function (canvas) {
    //         var imgData = canvas.toDataURL(
    //             'image/png');
    //         var doc = new jsPDF('p', 'mm');
    //         doc.addImage(imgData, 'PNG', 10, 10);
    //         doc.save('sample-file.pdf');
    //     }
    // });



    html2canvas(document.querySelector("#ticket-imprimir"), { scrollY: -window.scrollY })
        .then(canvas => {
            var img = canvas.toDataURL("image/png");
            var doc = new jsPDF('p', 'mm');
            doc.addImage(img, 'PNG', 10, 10);
            doc.save(`Ticket.pdf`);
        });
}

// Funciones a ejecutarse al cargar completamente la página
window.addEventListener('load', function () {
    mostrarInfoCompra()
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