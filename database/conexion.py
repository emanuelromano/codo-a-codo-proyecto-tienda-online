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

    # Consultar Usuario ---------------------------------------------------------------------------
    def consultar_usuario(self, email):
        self.cursor.execute(f"SELECT * FROM usuarios WHERE email = '{email}'")
        usuario = self.cursor.fetchone()

        if usuario:
            return True
        
        return False
    
    # Consultar Contraseña ------------------------------------------------------------------------
    def consultar_contraseña(self, email, passw):
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


db = Catalogo('localhost', 'server', '1234', 'pasteleria')

print("\033[H\033[j") # Borrado de consola

# db.agregar_producto("Selva Negra", "selva-negra", "https://i.ibb.co/5vwq3XY/1.jpg", "Bizcochuelo de chocolate empapado en kirsch e intercaladas con nata y cerezas.", 8, 5500, False, 0)
# db.modificar_producto(1, "Selva Negra", "selva-negra", "https://i.ibb.co/5vwq3XY/1.jpg", "Bizcochuelo de chocolate empapado en kirsch e intercaladas con nata y cerezas.", 8, 5500, False, 0)
# db.eliminar_producto(11)
# print(db.consultar_producto(1))

# print(db.consultar_producto(5))
