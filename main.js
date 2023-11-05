//librerias 
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'  

//archivos propios
import './css/style.css'
import './css/styleNav.css'
import './css/styleContacto.css'
import './css/styleProductos.css'
import './css/footer.css'
import './css/styleNosotros.css'
import { comprarProducto, leerLocalStorage,
        eliminarProducto, procesarCompra, 
        vaciarCarrito, 
        leerLocalStorageCompra,
        eliminarProductoCompra,
        obtenerEvento,
        calcularTotal
    } from './src/carrito'

//codigo js
//seleccion de elementos 
const productos = document.querySelector('#listaProductos');
const carrito = document.querySelector('#carrito');
const carritoCompra = document.querySelector('#listaCompras');

//Funciones ejecutadas


const ruta = String(location.href)

if(!ruta.includes('carroshop.html')){
    
    const vaciarCarritoBtn = carrito.querySelector('#vaciarCarrito');
    const procesarCompraBtn = carrito.querySelector('#procesarCompra');
    cargarEventos()
    //Funciones de eventos
    function cargarEventos(){
        productos.addEventListener('click',(e) => comprarProducto(e));

        document.addEventListener('DOMContentLoaded',leerLocalStorage());
        //evento para eliminar un producto del carrito 
        carrito.addEventListener('click',e => eliminarProducto(e));
        // vaciar carrito 
        vaciarCarritoBtn.addEventListener('click',e=> vaciarCarrito(e));
        procesarCompraBtn.addEventListener('click',e => procesarCompra(e));
    }
}else{
    esCarrito()

}


function esCarrito(){
    document.addEventListener('DOMContentLoaded',leerLocalStorageCompra())
    carritoCompra.addEventListener('click',e=> eliminarProductoCompra(e))
    calcularTotal()
    carritoCompra.addEventListener('change',e =>obtenerEvento(e))
    carritoCompra.addEventListener('keyup',e =>obtenerEvento(e))
}