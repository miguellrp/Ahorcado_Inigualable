import { cargarSonido } from './sounds.js';
import { mostrarPantallaResultado } from './pantallaResultado.js';

const tiempoCargaPantallaResultado = 1800;
let juegoTerminado = false;
let partidaGanada = false;
let numIntentos = 6;
let anchuraPalabra = 5;

/* Sonidos */
// https://pixabay.com
const victoria = cargarSonido("sounds/victoria.mp3");
const derrota = cargarSonido("sounds/derrota.mp3");

// https://freesound.org
const reinicioPartida = cargarSonido("sounds/nueva_partida.mp3"); // autoría: bdunis4


export let palabra = "PLAZA" // getPalabraAzar();

// Se inicializa a 0,0 el índice de la baldosa actual
let fila = 0;    // intento actual
let columna = 0;    // letra actual de ese intento

window.onload = function() {
    document.getElementById("btn_nueva_palabra").addEventListener("click", generarNuevaPartida);

    inicializarTablero();
    inicializarTecladoPantalla();
    procesoInput();
}

/* -- Funciones -- */

function inicializarTablero() {
    // Inicialización de las casillas conformantes del tablero
    for (let f = 0; f < numIntentos; f++) {
        for (let c = 0; c < anchuraPalabra; c++) {
            let baldosa = document.createElement("span");
            baldosa.id = f.toString() + "-" + c.toString() // "fila-columna"
            baldosa.innerText = "";
            baldosa.classList.add("baldosa");
            document.getElementById("tablero").appendChild(baldosa);
        }
    }
}

function inicializarTecladoPantalla() {
    let teclado = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
        ["⏎", "Z", "X", "C", "V", "B", "N", "M", "⌫"]
    ];

    // Inicialización de botones del teclado en pantalla
    for (let i = 0; i < teclado.length; i++) {
        let filaActual = teclado[i];
        let filaTeclado = document.createElement("div");
        filaTeclado.classList.add("teclado_fila");

        for (let j = 0; j < filaActual.length; j++) {
            let baldosaTecla = document.createElement("button");
            
            let teclaBoton = filaActual[j];
            baldosaTecla.innerText = teclaBoton;
            
            if (teclaBoton == "⏎")
                baldosaTecla.id = "Enter";
            else if (teclaBoton == "⌫")
                baldosaTecla.id = "Backspace";
            else if (teclaBoton >= "A" && teclaBoton <= "Z")
                baldosaTecla.id = "Key" + teclaBoton;

            baldosaTecla.addEventListener("click", procesoTeclaBoton);

            if (teclaBoton == "⏎")
                baldosaTecla.classList.add("enter_baldosa");
            else if (teclaBoton == "⌫")
                baldosaTecla.classList.add("backspace_baldosa")
            else
                baldosaTecla.classList.add("tecla_baldosa")
            
            filaTeclado.appendChild(baldosaTecla);
        }
        document.querySelector("main").appendChild(filaTeclado);
    }

    function procesoTeclaBoton() {
        let e = {"code" : this.id};
        procesoInputTeclaBoton(e);
    }
}


function procesoInput() {
    document.addEventListener("keyup", (tecla) => {
        if (juegoTerminado) return;

        if (columna < anchuraPalabra) { // mientras no sea la última columna, permite introducir letras [A - Z]
            if (tecla.code >= "KeyA" && tecla.code <= "KeyZ") {
                let baldosaActual = document.getElementById(fila.toString() + "-" + columna.toString());

                if (baldosaActual.innerText == "") {
                    baldosaActual.innerText = tecla.code[3]; // key->X<-
                    columna += 1;
                }
            }
        }

        if (tecla.code == "Backspace") {
            if (columna > 0 && columna <= anchuraPalabra)
                columna -= 1;

            let baldosaActual = document.getElementById(fila.toString() + "-" + columna.toString());
            baldosaActual.innerText = "";
        }

        else if (tecla.code == "Enter") {
            if (inputPalabraCompleta() == true){
                actualizarEstadoJuego();

                fila += 1;
                columna = 0;

                if (fila >= numIntentos && partidaGanada == false) {
                    derrota.play();
                    juegoTerminado = true;
                    setTimeout(() => {
                        console.log("ola");
                        mostrarPantallaResultado("derrota");
                        return;
                    }, tiempoCargaPantallaResultado);
                }
            }
            else{
                for (let posicion = 0; posicion < anchuraPalabra; posicion++){
                    let baldosaActual = document.getElementById(fila.toString() + "-" + posicion.toString());
    
                    if (baldosaActual.classList.contains("jello-horizontal"))
                        reiniciarAnimacionBaldosas(baldosaActual);
                        
                    baldosaActual.classList.add("jello-horizontal");
                }
            }
        }
    });
}


function procesoInputTeclaBoton(teclaBoton) {
    if (juegoTerminado) return;

    if (columna < anchuraPalabra) {
        if (teclaBoton.code >= "KeyA" && teclaBoton.code <= "KeyZ") { // teclas [ A - Z ]
            let baldosaActual = document.getElementById(fila.toString() + "-" + columna.toString());

            if (baldosaActual.innerText == "") {
                baldosaActual.innerText = teclaBoton.code[3]; // key->X<-
                columna += 1;
            }
        }
    }

    if (teclaBoton.code == "Backspace") {
        if (columna > 0 && columna <= anchuraPalabra)
            columna -= 1;

        let baldosaActual = document.getElementById(fila.toString() + "-" + columna.toString());
        baldosaActual.innerText = "";
    }

    else if (teclaBoton.code == "Enter") {
        if (inputPalabraCompleta() == true) {
            actualizarEstadoJuego();

            fila += 1;
            columna = 0;

            if (fila >= numIntentos && partidaGanada == false) {
                derrota.play();
                juegoTerminado = true;
                setTimeout(() => {
                    console.log("ola");
                    mostrarPantallaResultado("derrota");
                    return;
                }, tiempoCargaPantallaResultado);
            }
        }
        else {
            for (let posicion = 0; posicion < anchuraPalabra; posicion++){
                let baldosaActual = document.getElementById(fila.toString() + "-" + posicion.toString());

                if (baldosaActual.classList.contains("jello-horizontal"))
                    reiniciarAnimacionBaldosas(baldosaActual);
                    
                baldosaActual.classList.add("jello-horizontal");
            }
        }
    }
}


function actualizarEstadoJuego() {
    let letrasCorrectas = 0;
    let conteoLetras = {};
    const delay_animacion_flip = 350;

    for (let i = 0; i < palabra.length; i++){
        let letra = palabra[i];

        if (conteoLetras[letra])
            conteoLetras[letra] += 1;
        else
            conteoLetras[letra] = 1;
    }

    for (let posicion = 0; posicion < anchuraPalabra; posicion++){
        let baldosaActual = document.getElementById(fila.toString() + "-" + posicion.toString());
        let letra = baldosaActual.innerText;

        // La revelación de los resultados se revelan con un delay para encajar con la animación flip de cada baldosa del tablero
        
            if (palabra[posicion] == letra){
                baldosaActual.classList.add("correcta");

                let letraBoton = document.getElementById("Key" + letra);
                letraBoton.classList.remove("presente");
                letraBoton.classList.add("correcta");

                letrasCorrectas += 1;
                conteoLetras[letra] -= 1;
            }

            if (letrasCorrectas == anchuraPalabra) {
                victoria.play();
                juegoTerminado = true;
                partidaGanada = true;
                setTimeout(() => {
                    mostrarPantallaResultado("victoria");
                    return;
                }, tiempoCargaPantallaResultado);
            }
        
        if (baldosaActual.classList.contains("jello-horizontal"))
            baldosaActual.classList.remove("jello-horizontal");
        baldosaActual.classList.add("animacion_flip");
        baldosaActual.style.animationDelay = `${(posicion * delay_animacion_flip) / 2}ms`;
    }

    // Se realiza un segundo bucle con la finalidad de evitar letras acertadas duplicadas (inexistentes)
    for (let posicion = 0; posicion < anchuraPalabra; posicion++){
        let baldosaActual = document.getElementById(fila.toString() + "-" + posicion.toString());
        let letra = baldosaActual.innerText;

        setTimeout(() => {
            if (!baldosaActual.classList.contains("correcta")){
                let letraBoton = document.getElementById("Key" + letra);
                if (palabra.includes(letra) && conteoLetras[letra] > 0){
                    baldosaActual.classList.add("presente");
                    letraBoton.classList.add("presente");

                    conteoLetras[letra] -= 1;
                }

                else{
                    baldosaActual.classList.add("incorrecta");
                    if (!letraBoton.classList.contains("correcta"))
                        letraBoton.classList.add("incorrecta");
                }
            }
        }, ((posicion + 1) * 200));
    }
}

function getPalabraAzar() {
    let palabrasArray = [
        "coche", "tecla", "movil",
        "bolsa", "calma", "bicho",
        "audio", "pulso", "termo",
        "sobre", "rombo", "letra",
        "peras", "casco", "verso",
    ]

    let min = 0;
    let max = palabrasArray.length - 1;
    let numAzar = Math.floor(min + Math.random() * (max + 1 - min));

    return palabrasArray[numAzar].toUpperCase();
}

function reiniciarTecladoPantalla() {
    let baldosas = document.querySelectorAll(".tecla_baldosa, .enter_baldosa, .backspace_baldosa");

    baldosas.forEach(baldosa => {
        if (baldosa.innerText == "⏎") 
            baldosa.className = "enter_baldosa";
        else if (baldosa.innerText == "⌫") 
            baldosa.className = "backspace_baldosa";
        else 
            baldosa.className = "tecla_baldosa";
        
    });
}

function reiniciarAnimacionBaldosas(baldosa) {
    baldosa.style.animation = 'none';
    baldosa.offsetHeight;
    baldosa.style.animation = null; 
}

export function generarNuevaPartida() {
    palabra = "PLAZA" //getPalabraAzar();
    juegoTerminado = false;
    fila = 0;
    columna = 0;

    // Se reinicia el tablero:
    let tablero = document.getElementById("tablero");

    while (tablero.firstChild)
        tablero.firstChild.remove();
    
    inicializarTablero();
    reiniciarTecladoPantalla();

    reinicioPartida.play();

    // Si está en la pantalla del resultado, vuelve a la página home:
    const pantallaHome = document.getElementById("pantalla_home")
    
    if (pantallaHome.className == "oculta"){
        pantallaHome.className = "visible";
        document.getElementById("pantalla_resultado").className = "oculta";
    }
}

function inputPalabraCompleta() {
    let posicion = 0;

    while(posicion < anchuraPalabra){
        let baldosaActual = document.getElementById(fila.toString() + "-" + posicion.toString());
     
        if (baldosaActual.innerText === '')
            return false

        posicion++;
    }

    return true;
}