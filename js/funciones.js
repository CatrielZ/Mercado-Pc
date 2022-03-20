function productoGuardado (valor,input){
        if(input == "nombre"){
                nombreInput = valor;
        }
        if(input == "precio"){
                precioInput = valor;
        }
        if(input == "categoria"){
                categoriaInput= valor;
        }

}
//funcion para ocultar menu de AGREGAR PRODUCTO
function mostrarFormulario(){
        document.getElementById('menuAgregar').classList.toggle('oculto');
    }
//mostrar tarjetas de productos
function productoHtml(productos,id){
        let conteinerListado= document.getElementById('conteinerListado')
        conteinerListado.innerHTML= "";
        let listado = document.createElement('div');
        listado.setAttribute("id",'listado');
        conteinerListado.append(listado);
         for (const producto of productos ) {
                let divTarjeta = document.createElement('div');      
                divTarjeta.innerHTML=  `<div class="card mb-3 product-item" style="max-width: 540px"; category="${producto.categoria}">
                                        <div class="row g-0">
                                        <div class="col-md-4">
                                        <img src="${producto.img}" class="img-fluid rounded-start" alt="imagenProducto">
                                        </div>
                                        <div class="col-md-8">
                                        <div class="card-body">
                                                <h5 class="card-title">${producto.nombre}</h5>
                                                <p class="card-text">Precio: $ ${producto.precio}</p>
                                                <p class="card-text"><small class="text-muted">Categoria: ${producto.categoria}</small></p>
                                                <button id='${producto.id}' class = 'btnCompra btn btn-primary'>Comprar</button>
                                        </div>
                                        </div>
                                        </div>
                                        </div>`
                conteinerListado.append(divTarjeta);
        }
        seleccionarProducto();
}
//AGREGAR NUEVO PRODUCTO
formularioPc.onsubmit= (e) =>{
        e.preventDefault();
        productos.push( new Producto((productos.length+1),nombreInput, precioInput, categoriaInput, "../imagenes/noImg.png"));
        e.target.reset();
        localStorage.setItem('Productos',JSON.stringify(productos));
        document.getElementById("listado").remove();
        productoHtml(productos);
}
filtroNombre.addEventListener('input', function () {
        const filtrados= productos.filter(producto => producto.nombre.toUpperCase().includes(this.value.toUpperCase()));
        console.log(this.value);
        productoHtml(filtrados); 
    }) 
//Seleccion del producto boton "COMPRAR"
function seleccionarProducto() {
        let botones = document.getElementsByClassName('btnCompra');
        for (const boton of botones) {
                boton.addEventListener('click', function () {
                        let seleccion = carrito.find(producto => {producto.id == this.id});
                        if (seleccion) {
                                seleccion.addCantidad();
                        } else {
                                seleccion = productos.find(producto => producto.id == this.id);
                                carrito.push(seleccion);
                        }
                        localStorage.setItem('Carrito', JSON.stringify(carrito));
                        carritoHTML(carrito);
                        Toastify({
                                text: `Se ha agregado al carrito`,
                                offset: {
                                  x:500, 
                                  y: 30 
                                },
                                style: {
                                        background: "linear-gradient(to bottom, rgba(73,155,234,1) 0%,rgba(32,124,229,1) 52%,rgba(32,124,229,1) 81%,rgba(32,124,229,1) 81%)"

                                      },
                              }).showToast();
                })
        }
} 
//CREACION DE CARRITO
function carritoHTML(lista){
        cantidadCarrito.innerHTML= lista.length;
        productosCarrito.innerHTML="";
        for (const producto of lista) {
                let prod = document.createElement('div');
                prod.innerHTML=`${producto.nombre}
                                <span class="badge bg-warning text-dark">Precio:  $${producto.precio} </span>
                                <span class="badge bg-primary">Cant:${producto.cantidad} </span>
                                <span class="badge bg-dark">Subtotal: $${producto.subTotal()}</span>
                                <a id="${producto.id}" class="btn btn-info btn-add">+</a>
                                <a id="${producto.id}" class="btn btn-info btn-sub">-</a>
                                <a id="${producto.id}" class="btn btn-info btn-delete">x</a>`
                                productosCarrito.append(prod);
        }
        document.querySelectorAll('.btn-delete').forEach(boton => boton.onclick = eliminarCarrito);
        document.querySelectorAll('.btn-add').forEach(boton => boton.onclick = addCarrito);
        document.querySelectorAll('.btn-sub').forEach(boton => boton.onclick = subCarrito);
        totalCarrito();
} 
function eliminarCarrito(e){
        let posicion = carrito.findIndex(producto => producto.id == e.target.id);
        carrito.splice(posicion,1);
        carritoHTML(carrito);
        localStorage.setitem('Carrito' , JSON.stringify(carrito));

}
function addCarrito (){
        let producto = carrito.find(p => p.id == this.id);
        producto.agregarCantidad(1);
        this.parentNode.children[1].innerHTML = "Cant: "+ producto.cantidad;
        this.parentNode.children[2].innerHTML = "Subtotal: "+ producto.subTotal();
        totalCarrito();
        localStorage.setitem('Carrito' , JSON.stringify(carrito));
        

        

}
function  subCarrito(){
        let producto = carrito.find(p => p.id == this.id);
        if(producto.cantidad > 1){
                producto.agregarCantidad(-1);
                this.parentNode.children[1].innerHTML = "Cant: "+ producto.cantidad;
                this.parentNode.children[2].innerHTML = "Subtotal: "+ producto.subTotal();
                totalCarrito();
                localStorage.setitem('Carrito' , JSON.stringify(carrito)); 
        }
        

}
function totalCarrito() {
        let total = carrito.reduce((totalCompra, actual) => totalCompra += actual.subTotal(), 0);
        totalCarritoInterfaz.innerHTML = "Total: $" + total;
        return total;
}

//Filtro DE CATEGORIAS
$(document).ready(function(){
	// FILTRANDO PRODUCTOS 

	$('.category_item').click(function(){
		const catProduct = $(this).attr('category');
		console.log(catProduct);

		// OCULTANDO PRODUCTOS 
		$('.product-item').css('transform', 'scale(0)');
		function hideProduct(){
			$('.product-item').hide();
		} setTimeout(hideProduct,400);

		// MOSTRANDO PRODUCTOS 
		function showProduct(){
			$('.product-item[category="'+catProduct+'"]').show();
			$('.product-item[category="'+catProduct+'"]').css('transform', 'scale(1)');
		} setTimeout(showProduct,400);
	});

	// MOSTRANDO TODOS LOS PRODUCTOS

	$('.category_item[category="all"]').click(function(){
		function showAll(){
			$('.product-item').show();
			$('.product-item').css('transform', 'scale(1)');
		} setTimeout(showAll,400);
	});
});
