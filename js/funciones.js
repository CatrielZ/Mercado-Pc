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
//funcio para mostrar menu
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
                                        <img src="../imagenes/noImg.png" class="img-fluid rounded-start" alt="imagenProducto">
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
formularioPc.onsubmit= (e) =>{
        e.preventDefault();
        productos.push( new Producto((productos.length+1),nombreInput, precioInput, categoriaInput));
        e.target.reset();
        localStorage.setItem('Productos',JSON.stringify(productos));
        document.getElementById("listado").remove();
        productoHtml(productos);
}
/*function crearListaCategorias (categorias){
        let categoriaClick = document.createElement('div');
        categoriaClick.setAttribute('id', 'categoriasMostradas');
        categoriaClick.innerHTML =  `<ul>
                                        <ol><a>${productos.categoria[0]}</a></ol>
                                        <ol><a>${productos.categoria[1]}</a></ol>
                                        <ol><a>${productos.categoria[2]}</a></ol>
                                        <ol><a>${productos.categoria[3]}</a></ol>
                                        </ul>`;
        document.getElementsByClassName("categoriasMostradas").append(categoriaClick);
}
crearListaCategorias(categoria);*/  
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
                        //Llamo a la funcion para generar la interfaz de carrito
                        console.log(carrito);
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

function carritoHTML(lista){
        cantidadCarrito.innerHTML= lista.length;
        productosCarrito.innerHTML="";
        for (const producto of lista) {
                let prod = document.createElement('div');
                prod.innerHTML=`${producto.nombre}
                                <span class="badge bg-warning text-dark">Precio:  $${producto.precio} </span>
                                <span class="badge bg-primary">Cantidad:${producto.cantidad} </span>
                                <span class="badge bg-dark">Subtotal: $${producto.subTotal()}</span>`
                                productosCarrito.append(prod);
        }
}

$(document).ready(function(){
	// FILTRANDO PRODUCTOS  ============================================

	$('.category_item').click(function(){
		const catProduct = $(this).attr('category');
		console.log(catProduct);

		// OCULTANDO PRODUCTOS =========================
		$('.product-item').css('transform', 'scale(0)');
		function hideProduct(){
			$('.product-item').hide();
		} setTimeout(hideProduct,400);

		// MOSTRANDO PRODUCTOS =========================
		function showProduct(){
			$('.product-item[category="'+catProduct+'"]').show();
			$('.product-item[category="'+catProduct+'"]').css('transform', 'scale(1)');
		} setTimeout(showProduct,400);
	});

	// MOSTRANDO TODOS LOS PRODUCTOS =======================

	$('.category_item[category="all"]').click(function(){
		function showAll(){
			$('.product-item').show();
			$('.product-item').css('transform', 'scale(1)');
		} setTimeout(showAll,400);
	});
});
