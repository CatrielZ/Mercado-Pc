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



productoHtml(productos,'conteinerListado');

//CONFIMARCION DE COMPRA SWA
localStorage.clear();
carrito.splice(0,carrito.length);
carritoHTML(carrito);
confirmar.onclick=()=> {
        Swal.fire(
            'Compra realizada',
            'Se ha realizado la compra',
            'success'
          )
    
    }









