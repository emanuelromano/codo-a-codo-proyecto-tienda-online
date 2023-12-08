// API a utilizar:  TRUE = online / FALSE = local
let apiOnline = false
let api = ''

if (apiOnline == true) {
    api = 'https://emanuel.pythonanywhere.com/usuario'
} else {
    api = "http://127.0.0.1:5000/usuario"
}


// Chequear validez usuario y contraseña
function iniciarSesion() {
    let usuario = document.getElementsByClassName("usuario")[0].value.trim()
    let pass = document.getElementsByClassName("pass")[0].value.trim()

    if (usuario == "" || pass == "") {
        let alerta = document.getElementsByClassName("alerta-inicio-sesion")
        alerta[0].innerHTML = `<div class="alerta-compra-info">
        <i class="fa-solid fa-circle-info" style="color: #000000;"></i> Debe ingresar un usuario y contraseña válidos.
        </div> <br>`
    } else {
        fetch(api + `/${usuario}/${pass}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data.acceso)

                if (data.acceso == 1) {
                    window.open('admin-productos.html', '_self')
                } else {
                    let alerta = document.getElementsByClassName("alerta-inicio-sesion")
                    alerta[0].innerHTML = `<div class="alerta-compra-info">
                    <i class="fa-solid fa-circle-info" style="color: #000000;"></i> Usuario o contraseña incorrectos.
                    </div> <br>`
                }
            });
    }
}

// Funciones a ejecutarse al cargar completamente la página
window.addEventListener('load', function () {

})