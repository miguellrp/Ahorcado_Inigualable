export const cargarSonido = function (fuente) {
    const sonido = document.createElement("audio");
    
    sonido.src = fuente;
    sonido.setAttribute("preload", "auto");
    sonido.setAttribute("controls", "none");
    sonido.style.display = "none";
    document.body.appendChild(sonido);
    
    return sonido;
};