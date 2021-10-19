function iniciar() {
    const boton = document.getElementById("open");
    const boton2 = document.getElementById("abrir");
    const agregarCarrito = document.getElementsByClassName("agregarCarrito");
    const peliculas = document.getElementsByClassName("container");
    const botonCategoria = document.getElementById("botonCategoria");
    const comprarb = document.getElementById("comprar");
    comprarb.addEventListener("click",comprar);
    botonCategoria.addEventListener("click",desplegar);
    boton.addEventListener("click", abrir);
    boton2.addEventListener("click", abrir);
    for(let i = 0; i<agregarCarrito.length;i++){
        // agregarCarrito[i].addEventListener("click",function(){agregar(peliculas[i])});
        agregarCarrito[i].addEventListener("click",()=>{
            agregar(peliculas[i]);
        });
    }

}
function comprar(){
    alert("Gracias por realizar su compra");
    sessionStorage.clear();
    recuperar();
}
function desplegar() {
    const lista = document.getElementById("listaCategoria");
    lista.classList.toggle("desplegar");
}

function abrir() {
    const aside = document.getElementById("carrito");
    aside.classList.toggle("open");
    recuperar();
}

function agregar(pelicula) {
    // const pelicula = document.getElementsByClassName("container")[0];
    let Pelicula = {
        nombre: pelicula.children[0].children[0].innerHTML,
        imagen: pelicula.children[1].children[1].src,
        precio: parseInt(pelicula.children[3].children[0].innerHTML.replace("$", "")),
        cantidad: 1
    };
    sessionStorage.setItem(Pelicula.nombre, JSON.stringify(Pelicula));
    // console.log(pelicula.getElementsByClassName("nombrePelicula")[0]);
    // console.log(Pelicula);
    recuperar();
}

function recuperar() {
    const items = document.getElementById("items");
    items.innerHTML='<div id="itemContenedor"></div>';
    const carrito = document.getElementById("itemContenedor");
    const precioTotal = document.getElementById("precioTotal");
    // carrito.innerHTML="";
    let total=0;
    for (let i = 0; i < sessionStorage.length; i++) {
        let clave = sessionStorage.key(i);
        let valor = JSON.parse(sessionStorage.getItem(clave));
        carrito.innerHTML += `<div class="item">\
        <img src="${valor.imagen}">\
        <div>\
            <div class="itemTitulo">\
                <h3>${valor.nombre}</h3>\
                <button type="button" onclick='borrarItem("${valor.nombre}")'>x</button>\
            </div>\
            <div class="itemContent">\
                <div class="cantidadItem">\
                    <button type="button" class="disminuir" onclick='disminuir("${clave}")'>-</button>\
                    <span>${valor.cantidad}</span>\
                    <button type="button" class="aumentar" onclick='aumentar("${clave}")'>+</button>\
                </div>\
                <span class="precioItem">$${parseInt(valor.cantidad)*parseInt(valor.precio)}</span>\
                </div>\
            </div>\
        </div>`
        total+=parseInt(valor.cantidad)*parseInt(valor.precio);
    }
    precioTotal.innerText=`$ ${total}`;
}
function disminuir(clave){
    let pelicula = JSON.parse(sessionStorage.getItem(clave));
    if(pelicula.cantidad>1){

        pelicula.cantidad--;
        sessionStorage.setItem(clave,JSON.stringify(pelicula));
        recuperar();
    }
}
function aumentar(clave){
    let pelicula = JSON.parse(sessionStorage.getItem(clave));
    pelicula.cantidad++;
    sessionStorage.setItem(clave,JSON.stringify(pelicula));
    recuperar();
}
function borrarItem(clave){
    sessionStorage.removeItem(clave);
    recuperar();
}

window.addEventListener("load", iniciar);