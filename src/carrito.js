const listaProductos = document.querySelector('#listaCarrito tbody');
const listaCompras = document.querySelector('#listaCompras')
//Añade un producto al carrito
export function comprarProducto(e){
    e.preventDefault(); // detener el comportamiento por defecto 
    //console.log(e.target) <= nos dara la informacion del elemento que hagamos click
    if(e.target.classList.contains('agregarCarrito')){// condicion para solo tomar al elemento que queramos
        const producto = e.target.parentElement.parentElement;
        console.log(producto);
        leerDatosProductos(producto);
    }

};

// funcion para leer datos del producto 

function leerDatosProductos(producto){
    const infoProducto = {
        imagen : producto.querySelector('img').src,
        titulo : producto.querySelector('h5').textContent,
        precio : parseFloat(producto.querySelector('.precio').textContent.replace('$', '')),
        id : producto.querySelector('a').getAttribute('data-id'),
        cantidad : 1
        
    }
    //console.log(infoProducto);
    let productosLs;

    productosLs = obtenerProductoLs(); 
    productosLs.forEach((productoLs)=>{
        if(productoLs.id === infoProducto.id){
            productosLs = productoLs.id;
        }
    })
    if( productosLs === infoProducto.id){
        console.warn('el producto ya esta Agregado en el carrito');
    }else{
        insertarCarrito(infoProducto);
    }   
};

// Funcion que comprueba si hay productos en el localStorage

function obtenerProductoLs(){
    let productosLs
    //comprobacion si hay productos en el localStorage
    if(localStorage.getItem('productos') === null){
        productosLs = []
    }else{
        productosLs = JSON.parse(localStorage.getItem('productos'));
    }
    return productosLs;
}

// Funcion que muestra los productos seleccionados en el carrito 

function insertarCarrito(producto){
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
        <img src="${producto.imagen}" alt="${producto.titulo}" width="100">
    </td>
    <td>
        ${producto.titulo}
    </td>
    <td>
        ${producto.precio}
    </td>
    <td>
        <a href="#" class="borrarProducto fas fa-times-circle" data-id="${producto.id}"></a>
    </td>
    `
    listaProductos.appendChild(row); //agrega el producto
    guardarProductoLs(producto);
};

//funcion para guardar el producto en el Local Storage

function guardarProductoLs(producto){
    let productos;

    productos = obtenerProductoLs();
    //agrega el producto al carrito
    productos.push(producto);
    //agrega el producto al local storage
    localStorage.setItem('productos',JSON.stringify(productos));

}

//funcion para leer productos en el localStorage

export function leerLocalStorage(){
    let productosLs =  obtenerProductoLs();
    productosLs.forEach(function(producto){
        const row = document.createElement('tr');
        row.innerHTML =`
        <td>
        <img src="${producto.imagen}" alt="${producto.titulo}" width="100">
        </td>
        <td>
            ${producto.titulo}
        </td>
        <td>
            ${producto.precio}
        </td>
        <td>
            <a href="#" class="borrarProducto fas fa-times-circle" data-id="${producto.id}"></a>
        </td>
        
        `
    listaProductos.appendChild(row);
    }

    )
}

//funcion para eliminar producto del carrito

export function eliminarProducto(e){
    e.preventDefault();
    let producto;
    let productoID;

    if(e.target.classList.contains('borrarProducto')){
        producto = e.target.parentElement.parentElement;
        productoID = producto.querySelector('a').getAttribute('data-id');
        producto.remove();
        eliminarProductoLs(productoID);
        }
}

//funcion para eliminar productos de LS a travez de id

function eliminarProductoLs(productoID){
    //obtenemos el arreglo de productos
    let productosLs = obtenerProductoLs();
    //comparamos el id del producto en el carrito con el id guardado en el LS
    productosLs.forEach((productoLs, index) => {
        if(productoLs.id === productoID) {
            productosLs.splice(index, 1);
        }
    })
    //agregamos el arreglo al LS

    localStorage.setItem('productos',JSON.stringify(productosLs));
};

export function vaciarCarrito(){
    //e.preventDefault();
    while(listaProductos.firstChild){
        listaProductos.removeChild(listaProductos.firstChild)
    }
    vaciarLs()
    //return false
}
function vaciarLs(){
    window.localStorage.clear();
}

export function procesarCompra(){
    let productosGuardados = obtenerProductoLs();
    if(productosGuardados.length === 0){
        console.warn('el carrito esta vacio, agregue un producto para procesar la compra')
    }else{
        location.href = 'pages/carroshop.html'
    }
}

export function leerLocalStorageCompra(){
    let productosLs = obtenerProductoLs();
    productosLs.forEach(function(producto){
        const div = document.createElement('div');
        div.classList.add('row', 'border-bottom', 'py-4', 'mb-3')
        div.innerHTML =`
        <div class="col-4 mb-1">
            <div class="bg-image rounded">
                <img class="w-100" src="${producto.imagen}" alt="${producto.titulo}">
            </div>
        </div>
            <div class="col-5">
            <h5>${producto.titulo}</h5>
            <p>${producto.precio}</p>
            <button data-id="${producto.id}" type="button" class="btn btn-sm me-1 mb-2 borrar_producto_compra"><i class="fa-regular fa-trash-can borrar_producto_compra_i"></i></button>
            
            </div>
            <div class="col-3">
                <input type="number" min= "1" max="3" class="form-control text-end cantidad" placeholder="Cantidad" value="${producto.cantidad}">
                <p class="text-center mt-1">
                    <strong class="precio">${producto.precio * producto.cantidad}</strong>
                </p>
            </div>
        
        `
        listaCompras.appendChild(div)


    })
}

// funcion para eliminar el producto desde carrito.html

export const eliminarProductoCompra= (e)=>{
    e.preventDefault()
    let productoID
    console.log('hicieron click',e.target)
    if(e.target.classList.contains('borrar_producto_compra')){
        e.target.parentElement.parentElement.remove()
        let producto = e.target.parentElement.parentElement
        productoID = producto.querySelector('button').getAttribute('data-id')
    }
    else if(e.target.classList.contains('borrar_producto_compra_i')){
        e.target.parentElement.parentElement.parentElement.remove()
    }
    eliminarProductoLs(productoID)
}

export const obtenerEvento = (e)=>{
    e.preventDefault()
    let id, productoLs, cantidad, producto
    if(e.target.classList.contains('cantidad')){
        producto = e.target.parentElement.parentElement 
        console.log('hiciste click en ',producto)
        id = producto.querySelector('button').getAttribute('data-id')
        cantidad = producto.querySelector('input').value 
        let precio = producto.querySelector('.precio')

        productoLs = obtenerProductoLs();
        
        productoLs.forEach((productoLs,index)=>{
            if(productoLs.id === id){
                productoLs.cantidad = cantidad
                console.log(productoLs.precio, productoLs.cantidad)
                precio.textContent = productoLs.cantidad * productoLs.precio
                
            }
        })
        localStorage.setItem('productos',JSON.stringify(productoLs));
        calcularTotal()
    }
}

// funcion para calcular el total del precio de todos los productos seleccionados
export function calcularTotal(){
    let productosLs;
    let total = 0;
    productosLs = obtenerProductoLs();
    productosLs.forEach(productoLs =>{
        let totalProducto = Number(productoLs.cantidad * productoLs.precio)
        total = total + totalProducto;

    })
    console.log(total)
    document.querySelector('.total').textContent = total
    document.querySelector('#total').textContent = total

}