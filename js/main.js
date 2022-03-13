//productos del json
fetch("../data/productos.json")
.then(respuesta => respuesta.json())
.then (data => {
        console.log(data);
        for (const literal of data) {
                productos.push(new Producto(literal.id, literal.nombre, literal.precio, literal.categoria, literal.img, literal.cantidad))
                
        }
        console.log(productos);
        productoHtml(productos,'conteinerListado');
})


//local storage
if("Productos" in localStorage){
        const guardados = JSON.parse(localStorage.getItem('Productos'));
        console.log(guardados);
        for (const generado of guardados){
                productos.push(new Producto(generado.nombre, generado.precio, generado.categoria));

        }
}
productoHtml(productos,'conteinerListado');
carritoHTML(carrito);







