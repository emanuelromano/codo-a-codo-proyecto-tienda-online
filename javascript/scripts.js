// function traerJson() {
//     fetch("../json/productos.json")
//         .then((res) => {
//             return res.json();
//         })
//         .then((data) => console.log(data));
// }

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
                `<img class="imagentarjeta" src=${data[num1].imagen}>
                <h3 class="titulotarjeta">· ${data[num1].nombre} ·</h3>
                <h4 class="preciotarjeta">$${data[num1].precio},00</h4>`

            tarjeta2[0].innerHTML =
                `<img class="imagentarjeta" src=${data[num2].imagen}>
                <h3 class="titulotarjeta">· ${data[num2].nombre} ·</h3>
                <h4 class="preciotarjeta">$${data[num2].precio},00</h4>`
        });
}

cargarItemsInicio()

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
                    `<div class="tarjeta-producto" key="${data[i].id}">
                        <img class="imagentarjeta" src=${data[i].imagen}>
                        <h3 class="titulotarjeta">· ${data[i].nombre} ·</h3>
                        <h4 class="preciotarjeta">$${data[i].precio},00</h4>
                    </div>`
            }
        });
}

traerJson()