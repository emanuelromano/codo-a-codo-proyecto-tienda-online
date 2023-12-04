'''
Codo a Codo 2023
Trabajo Práctico Obligatorio
"La Pastelería"
'''
# -------------------------------------------------------------------------------------------------
# Importación de módulos --------------------------------------------------------------------------
# -------------------------------------------------------------------------------------------------

from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from werkzeug.utils import secure_filename

import mysql.connector
import os
import time

app = Flask(__name__)
CORS(app)

# -------------------------------------------------------------------------------------------------
# Definición de clase y métodos -------------------------------------------------------------------
# -------------------------------------------------------------------------------------------------

class Conexion:
    # Conexión a la BD ----------------------------------------------------------------------------
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host = host,
            user = user,
            password = password,
            database = database,
            auth_plugin = 'mysql_native_password' # Plugin de contraseñas
        )

        self.cursor = self.conn.cursor(dictionary=True)

        #self.conn.cursor(dictionary=True)

    # Consultar Usuario ---------------------------------------------------------------------------
    def consultar_usuario(self, email):
        self.cursor.execute(f"SELECT * FROM usuarios WHERE email = '{email}'")
        usuario = self.cursor.fetchone()

        if usuario:
            return jsonify({"existe": 1})
        
        return jsonify({"existe": 0})
    
    # Consultar Contraseña ------------------------------------------------------------------------
    def consultar_email_passw(self, email, passw):
        self.cursor.execute(f"SELECT * FROM usuarios WHERE email = '{email}' AND passw = '{passw}'")
        usuario = self.cursor.fetchone()

        if usuario:
            return True
        
        return False

    # Ver todos los productos ---------------------------------------------------------------------
    def ver_productos(self):
        self.cursor.execute("SELECT * FROM productos")
        productos = self.cursor.fetchall()
        return productos

    # Ver todos los cupones ---------------------------------------------------------------------
    def ver_cupones(self):
        self.cursor.execute("SELECT * FROM cupones")
        productos = self.cursor.fetchall()
        return productos

    # Consultar productos por ID ------------------------------------------------------------------
    def consultar_producto(self, id):
        self.cursor.execute(f"SELECT * FROM productos WHERE id = {id}")
        producto = self.cursor.fetchone()

        if producto:
            return producto
        
        return False

    # Agregar productos ---------------------------------------------------------------------------
    def agregar_producto(self, nombre, url, imagen, descripcion, porciones, precio, enCarro, cantidadCompra):
        # self.cursor.execute(f"SELECT * FROM productos WHERE id = {id}")
        # producto = self.cursor.fetchone()

        # if producto:
        #     return False
        
        sql = f"INSERT INTO productos (nombre, url, imagen, descripcion, porciones, precio, enCarro, cantidadCompra)\
                VALUES ('{nombre}', '{url}', '{imagen}', '{descripcion}', {porciones}, {precio}, {enCarro}, {cantidadCompra});"        
        self.cursor.execute(sql)
        self.conn.commit()
        return True

    # Modificar un producto -----------------------------------------------------------------------
    def modificar_producto(self, id, nombre, url, imagen, descripcion, porciones, precio, enCarro, cantidadCompra):
        sql = f"UPDATE productos SET nombre = '{nombre}', url = '{url}', imagen = '{imagen}', descripcion = '{descripcion}', porciones = {porciones}, precio = {precio}, enCarro = {enCarro}, cantidadCompra = {cantidadCompra} WHERE id = {id};"        
        self.cursor.execute(sql)
        self.conn.commit()
        return True
    
    # Eliminar un producto ------------------------------------------------------------------------
    def eliminar_producto(self, id):
        sql = f"DELETE FROM productos WHERE id = {id}"
        self.cursor.execute(sql)
        self.conn.commit()
        return self.cursor.rowcount > 0 #Si se borró una línea, rowcount() será mayor que 0 y devolverá True. Si no se borró nada por algun error, rowcount() no será mayor a 0 y devolverá False
    
# -------------------------------------------------------------------------------------------------
# Cuerpo del programa -----------------------------------------------------------------------------
# -------------------------------------------------------------------------------------------------

db = Conexion('localhost', 'server', '1234', 'pasteleria')

# db.agregar_producto("Selva Negra", "selva-negra", "https://i.ibb.co/5vwq3XY/1.jpg", "Bizcochuelo de chocolate empapado en kirsch e intercaladas con nata y cerezas.", 8, 5500, False, 0)
# db.modificar_producto(1, "Selva Negra", "selva-negra", "https://i.ibb.co/5vwq3XY/1.jpg", "Bizcochuelo de chocolate empapado en kirsch e intercaladas con nata y cerezas.", 8, 5500, False, 0)
# db.eliminar_producto(11)
# print(db.consultar_producto(1))
# print(db.ver_productos())

# Ruta inicial ------------------------------------------------------------------------------------
@app.route("/")
def inicio():
    # return render_template("inicio.html") - Se puede crear un archivo HTML para mostrar en una ruta determinada usando este método
    return "<h1>Servidor</h1> \
            <p> \
            Codo a Codo 2023 <br> \
            Trabajo Práctico Obligatorio <br> \
            'La Pastelería' <br> \
            </p>"

# Ruta chequear usuario -------------------------------------------------------------------------
@app.route("/usuario/<string:email>/<string:passw>")
def consultar_email_passw(email, passw):
    usuario = db.consultar_email_passw(email, passw)
    if usuario:
        return jsonify({"acceso": 1})
    else:
        return jsonify({"acceso": 0})

# Ruta mostrar cupones --------------------------------------------------------------------------
@app.route("/cupones", methods=["GET"])
def ver_cupones():
    cupones = db.ver_cupones()
    return jsonify(cupones)

# Ruta mostrar productos --------------------------------------------------------------------------
@app.route("/productos", methods=["GET"])
def ver_productos():
    productos = db.ver_productos()
    return jsonify(productos)

# Ruta mostrar un producto por ID -----------------------------------------------------------------
@app.route("/productos/<int:id>")
def consultar_producto(id):
    producto = db.consultar_producto(id)
    if producto:
        return jsonify(producto)
    else:
        return jsonify("404")

# Carpeta para guardar las imágenes ---------------------------------------------------------------
ruta_destino = './static/imagenes/'

# Ruta agregar producto ---------------------------------------------------------------------------
@app.route("/productos", methods=["POST"])
def agregar_producto():

    # Datos del producto
    nombre = request.form['nombre']
    url = request.form['url']
    imagen = request.form['imagen']
    descripcion = request.form['descripcion']
    porciones = request.form['porciones']
    precio = request.form['precio']
    enCarro = request.form['enCarro']
    cantidadCompra = request.form['cantidadCompra']

    # imagen = request.files['imagen']
    # nombre_imagen = secure_filename(imagen.filename)
    # print("*"*20)
    # print(nombre_imagen)
    # print("*"*20)
    # nombre_base, extension = os.path.splitext(nombre_imagen)
    # nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
    # imagen.save(os.path.join(ruta_destino, nombre_imagen))

    # Agregando producto
    if db.agregar_producto(nombre, url, imagen, descripcion, porciones, precio, enCarro, cantidadCompra):
        return jsonify({"mensaje": "Producto agregado"})
    else:
        return jsonify({"mensaje": "Error agregando producto"})

# Ruta actualizar producto ------------------------------------------------------------------------
@app.route("/productos/<int:id>", methods=["PUT"])
def modificar_producto(id):

    # Datos del producto
    data = request.form
    id = data.get("id")
    nuevo_nombre = data.get("nombre")
    nueva_url = data.get("url")
    nueva_imagen = data.get("imagen")
    nueva_descripcion = data.get("descripcion")
    nuevo_porciones = data.get("porciones")
    nuevo_precio = data.get("precio")
    enCarro = data.get("enCarro")
    cantidadCompra = data.get("cantidadCompra")

    # Actualización del producto
    if db.modificar_producto(id, nuevo_nombre, nueva_url, nueva_imagen, nueva_descripcion, nuevo_porciones, nuevo_precio, enCarro, cantidadCompra):
        return jsonify({"mensaje": "Producto modificado"})
    else:
        return jsonify({"mensaje": "Producto no encontrado"})

# Ruta eliminar producto --------------------------------------------------------------------------
@app.route("/productos/<int:id>", methods=["DELETE"])
def eliminar_producto(id):
    # Primero, obtén la información del producto para encontrar la imagen
    eliminar = db.consultar_producto(id)
    if eliminar:
        return jsonify({"mensaje": "Producto eliminado"})
    else:
        return jsonify({"mensaje": "Error al eliminar el producto"})
    
# -------------------------------------------------------------------------------------------------
# Iniciar servidor --------------------------------------------------------------------------------
# -------------------------------------------------------------------------------------------------

print("\033[H\033[j") # Borrado de consola

if __name__ == "__main__":
    app.run(debug=True)