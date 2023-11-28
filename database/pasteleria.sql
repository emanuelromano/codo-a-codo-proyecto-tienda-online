create database pasteleria;

use pasteleria;

create table productos (
id INT auto_increment NOT NULL,
nombre varchar(100) NOT NULL,
url varchar(255),
imagen varchar(255),
descripcion varchar(255),
porciones int,
precio double,
enCarro bool,
cantidadCompra int,

PRIMARY KEY (`id`)
);

insert into productos
values (1, "Selva Negra", "selva-negra", "https://i.ibb.co/5vwq3XY/1.jpg", "Bizcochuelo de chocolate empapado en kirsch e intercaladas con nata y cerezas.", 8, 5500, false, 0),
(2, "Lemon Pie", "lemon-pie", "https://i.ibb.co/vv4gQFF/2.jpg", "Tarta formada por una base de masa quebrada u hojaldre rellena con crema de limón.", 8, 2600, false, 0),
(3, "Torta Rogel", "torta-rogel", "https://i.ibb.co/HNGQR7y/3.jpg", "Capas de discos de masa Rogel crocante, relleno de dulce de leche con chips de chocolate y terminado con merengue italiano.", 8, 3500, false, 0),
(4, "Red Velvet", "red-velvet", "https://i.ibb.co/8D5CnJw/4.jpg", "Bizcocho de color rojo en capas, relleno con crema y con un glaseado de crema de queso.", 8, 6000, false, 0),
(5, "Carrot Cake", "carrot-cake", "https://i.ibb.co/vHDYBBV/5.jpg", "Budín de zanahoria, con una pizca de canela, cubierto con un frosting de queso crema dulce y topping de almendras tostadas.", 8, 4800, false, 0),
(6, "Cheese Cake", "cheese-cake", "https://i.ibb.co/xMH7rXv/6.jpg", "Base crocante de galletas y manteca, crema de queso y limón combinada con una perfecta confitura casera de frambuesa.", 8, 5000, false, 0),
(7, "Chocotorta", "chocotorta", "https://i.ibb.co/jzsFLFr/7.jpg", "Siete capas de Chocolinas intercaladas con crema de dulce de leche repostero.", 8, 4700, false, 0),
(8, "Torta Matcha", "torta-matcha", "https://i.ibb.co/yQhrhPW/8.jpg", "Una suave y delicada torta de té verde (matcha) y un mousse de chocolate blanco.", 8, 6600, false, 0),
(9, "Torta de Chocolate y Licor", "torta-de-chocolate-y-licor", "https://i.ibb.co/c1jKHqB/9.jpg", "Tres capas de bizcocho de chocolate unidas por de un delicioso merengue de licor de whisky.", 8, 7000, false, 0);

create table cupones (
id int auto_increment not null,
cupon varchar(100),
descuento double,
texto varchar(255),

primary key (`id`)
);

insert into cupones
values (1, "PRIMAVERA", 0.20, "¡Se aplicó un 20% de descuento a tu compra!"),
(2, "GRATIS", 1.00, "Tuki. ¡Se aplicó un 100% de descuento a tu compra!");

