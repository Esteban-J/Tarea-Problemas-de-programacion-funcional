const fs = require('fs');

class Producto {
    constructor(clave, descripcion, precio, clasificacion, cantidad, existenciaMinima, existenciaMaxima) {
        this.clave = clave;
        this.descripcion = descripcion;
        this.precio = precio;
        this.clasificacion = clasificacion;
        this.cantidad = cantidad;
        this.existenciaMinima = existenciaMinima;
        this.existenciaMaxima = existenciaMaxima;
    }
}

class DAOProductos {
    constructor() {
        this.productos = {};
    }

    agregarProducto(producto) {
        this.productos[producto.clave] = producto;
    }

    eliminarProducto(clave) {
        if (clave in this.productos) {
            delete this.productos[clave];
        } else {
            console.log("La clave del producto no existe.");
        }
    }

    obtenerProducto(clave) {
        if (clave in this.productos) {
            return this.productos[clave];
        } else {
            console.log("La clave del producto no existe.");
            return null;
        }
    }

    actualizarProducto(clave, campo, nuevoValor) {
        if (clave in this.productos) {
            if (this.productos[clave][campo] !== undefined) {
                this.productos[clave][campo] = nuevoValor;
            } else {
                console.log("El campo especificado no existe.");
            }
        } else {
            console.log("La clave del producto no existe.");
        }
    }
}

function cargarProductosDesdeArchivo(archivo, dao) {
    const productos = JSON.parse(fs.readFileSync(archivo, 'utf-8'));
    productos.forEach(producto => {
        dao.agregarProducto(new Producto(producto.clave, producto.descripcion, producto.precio, producto.clasificacion, producto.cantidad, producto.existenciaMinima, producto.existenciaMaxima));
    });
}

const dao = new DAOProductos();
cargarProductosDesdeArchivo('productos.json', dao);
let contador = 0;
const productos = JSON.parse(fs.readFileSync('productos.json', 'utf-8'));

// consultar productos con existencia mayor a 20----------------------------------------------------------
productos.forEach(producto => {
    if (producto.cantidad > 20){
        contador++;
    }
});
console.log(`La cantidad de productos con existencia mayor a 20 es: ${contador}`);
contador = 0;

// consultar productos con existencia menor a 15-------------------------------------------------------
productos.forEach(producto => {
    if (producto.cantidad < 15){
        contador++;
    }
});
console.log(`La cantidad de productos con existencia menor a 15 es: ${contador}`);
contador = 0;

// Lista de productos con la misma clasificación y precio mayor 15.50---------------------------------------

let consulta3 = productos.filter(producto => producto.precio > 15.50 && producto.clasificacion === "Granos");

let textoSalida = JSON.stringify(consulta3, null, 2);

fs.writeFile('consulta3.txt', textoSalida, (err) => {
    if (err) throw err;
});

// Lista de productos con precio mayor a 20.30 y menor a 45.00-----------------------------------------
let consulta4 = productos.filter(producto => producto.precio > 20.30 && producto.precio < 45.00);

textoSalida = JSON.stringify(consulta4, null, 2);

fs.writeFile('consulta4.txt', textoSalida, (err) => {
    if (err) throw err;
});

// Número de productos agrupados por su clasificación------------------------------------------------

const consulta5 = {};
productos.forEach(producto => {
    if (productosClasif[producto.clasificacion]) {
        productosClasif[producto.clasificacion]++;
    } else {
        productosClasif[producto.clasificacion] = 1;
    }
});

textoSalida = JSON.stringify(consulta5, null, 2);

fs.writeFile('consulta5.txt', textoSalida, (err) => {
    if (err) throw err;
});