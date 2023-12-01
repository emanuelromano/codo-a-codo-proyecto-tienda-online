'''
Codo a Codo 2023
Trabajo Práctico Obligatorio
"La Pastelería"
'''

import mysql.connector

class Catalogo:
    # Conexión a la BD ----------------------------------------------------------------------------
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host = host,
            user = user,
            password = password,
            database = database,
            auth_plugin = 'mysql_native_password' # Plugin de contraseñas
        )
        self.cursor = self.conn.cursor()
        self.conn.cursor(dictionary=True)

    # Ver productos -------------------------------------------------------------------------------
    def ver_productos(self):
        self.cursor.execute("SELECT * FROM productos")
        productos = self.cursor.fetchall()
        print(productos)

    # Consultar productos -------------------------------------------------------------------------
    def consultar_producto(self, id):
        self.cursor.execute(f"SELECT * FROM productos WHERE id = {id}")
        producto = self.cursor.fetchone()

        if producto:
            return producto
        
        return False

    # Agregar productos ---------------------------------------------------------------------------
    def agregar_producto(self, id, nombre, url, imagen, descripcion, porciones, precio, enCarro, cantidadCompra):
        self.cursor.execute(f"SELECT * FROM productos WHERE id = {id}")
        producto = self.cursor.fetchone()

        if producto:
            return False
        
        sql = f"INSERT INTO productos (id, nombre, url, imagen, descripcion, porciones, precio, enCarro, cantidadCompra) VALUES ({id}, '{nombre}', '{url}', '{imagen}', '{descripcion}', {porciones}, {precio}, {enCarro}, {cantidadCompra});"        
        self.cursor.execute(sql)
        self.conn.commit()
        return True



productos = Catalogo('localhost', 'server', '1234', 'pasteleria')

print("\033[H\033[j")

#print(productos.consultar_producto(1))

productos.ver_productos()