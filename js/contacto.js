function iniciar(){
    let enviar = document.getElementById("enviar");
    enviar.addEventListener("click",limpiar);
}
function limpiar(){
    alert("El mensaje se envio con exito")
    document.getElementById("nombre").value = "";
    document.getElementById("email").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("mensaje").value = "";
}
window.addEventListener("load",iniciar);