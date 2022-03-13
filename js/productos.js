class Producto {
    constructor(id, nombre, precio,categoria,img,cantidad) {
            this.id = parseInt(id);
            this.nombre = nombre;
            this.precio = parseFloat(precio);
            this.categoria = categoria;
            this.img= img;
            this.cantidad = cantidad || 1;
    }

    addCantidad(){
        this.cantidad++;                
    }
    subTotal(){
        return this.precio * this.cantidad;                
    }
}