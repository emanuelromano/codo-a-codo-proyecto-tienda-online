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