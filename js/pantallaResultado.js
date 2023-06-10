import { palabra, generarNuevaPartida } from "./main.js";

export function mostrarPantallaResultado(resultado) {
    const pantallaResultado = document.getElementById("pantalla_resultado");
    const header = pantallaResultado.querySelector("header");
    header.style.justifyContent = "center";
    pantallaResultado.className = "visible";
    document.getElementById("pantalla_home").className = "oculta";

    if (pantallaResultado.querySelector("#container_resultado"))
        document.getElementById("container_resultado").remove();

    if (resultado.toLowerCase() == "victoria") 
        inicializarPantallaVictoria();

    else if (resultado.toLowerCase() == "derrota") 
        inicializarPantallaDerrota();
}


function inicializarPantallaVictoria() {
    const pantallaResultado = document.getElementById("pantalla_resultado");

    let containerFelicitacion = document.createElement("div");
    let titulo = document.createElement("h1");
    let mensaje = document.createElement("span");
    let posdata = document.createElement("span");

    let containerFlipAhorcado = document.createElement("div");
    let imgAhorcadoFrontal = document.createElement("img");
    let imgAhorcadoTrasero = document.createElement("img");

    containerFlipAhorcado.className = "flip_ahorcado";
    containerFlipAhorcado.addEventListener("click", generarNuevaPartida);
    containerFlipAhorcado.style.cursor = "pointer";

    imgAhorcadoFrontal.id = "ahorcado_frontal";
    imgAhorcadoFrontal.setAttribute("src", "img/ahorcado_frontal.png");
    imgAhorcadoFrontal.setAttribute("alt", "Ahorcado (frontal)");

    imgAhorcadoTrasero.id = "ahorcado_trasero";
    imgAhorcadoTrasero.setAttribute("src", "img/ahorcado_trasero_victoria.png");
    imgAhorcadoTrasero.setAttribute("alt", "Ahorcado (trasero - victoria)");
    
    containerFlipAhorcado.append(imgAhorcadoFrontal, imgAhorcadoTrasero);


    containerFelicitacion.id = "container_resultado";
    titulo.innerText = "🏅   VICTORIA   🏅";
    titulo.style.color = "var(--rosadoMasOscurado)";
    mensaje.innerText = "¡Salvaste a la persona a punto de ahorcarse gracias a tu tremenda capacidad deductiva para adivinar palabras!";
    posdata.innerText = "Si sientes que hoy es tu día, adelante: pincha en la persona salvada de arriba y ve a rescatar a alguien más."
    posdata.style.fontSize = "10px";
    posdata.style.color = "var(--rosadoMasOscurado)";
    posdata.style.marginTop = "15px";

    containerFelicitacion.append(titulo, containerFlipAhorcado, mensaje, posdata);

    pantallaResultado.appendChild(containerFelicitacion)
}


function inicializarPantallaDerrota() {
    const pantallaResultado = document.getElementById("pantalla_resultado");

    let containerPesame = document.createElement("div");
    let titulo = document.createElement("h1");
    let mensaje = document.createElement("span");
    let palabraNoAdivinada = document.createElement("span");
    let posdata = document.createElement("span");

    let containerFlipAhorcado = document.createElement("div");
    let imgAhorcadoFrontal = document.createElement("img");
    let imgAhorcadoTrasero = document.createElement("img");

    containerFlipAhorcado.className = "flip_ahorcado";
    containerFlipAhorcado.addEventListener("click", generarNuevaPartida);
    containerFlipAhorcado.style.cursor = "pointer";

    imgAhorcadoFrontal.id = "ahorcado_frontal";
    imgAhorcadoFrontal.setAttribute("src", "img/ahorcado_frontal.png");
    imgAhorcadoFrontal.setAttribute("alt", "Ahorcado (frontal)");

    imgAhorcadoTrasero.id = "ahorcado_trasero";
    imgAhorcadoTrasero.setAttribute("src", "img/ahorcado_trasero_derrota.png");
    imgAhorcadoTrasero.setAttribute("alt", "Ahorcado (trasero - derrota)");
    
    containerFlipAhorcado.append(imgAhorcadoFrontal, imgAhorcadoTrasero);


    containerPesame.id = "container_resultado";
    titulo.innerText = "💀   DERROTA   💀";
    titulo.style.color = "var(--rosadoMasOscurado)";
    mensaje.innerText = "Tus capacidades deductivas no son lo suficientemente buenas " +
                            "todavía como para salvar a una persona de ahorcarse... " + 
                            "Por cierto, la palabra era: ";

    palabraNoAdivinada.innerText = palabra;
    palabraNoAdivinada.style.backgroundColor = "var(--rosadoOscurado)"
    palabraNoAdivinada.style.padding = "3%";
    palabraNoAdivinada.style.borderRadius = "2rem";
    palabraNoAdivinada.style.margin = "15px auto";
    palabraNoAdivinada.style.fontSize = "28px";
    palabraNoAdivinada.style.color = "white";

    posdata.innerText = "Si quieres tratar de arreglar lo ocurrido... pincha en la persona ahorcada de arriba " +
                            "e intenta salvar a alguien, anda.";
    posdata.style.color = "var(--rosadoMasOscurado)";
    posdata.style.fontSize = "10px";


    containerPesame.append(titulo, containerFlipAhorcado, mensaje, palabraNoAdivinada, posdata);

    pantallaResultado.appendChild(containerPesame)
}