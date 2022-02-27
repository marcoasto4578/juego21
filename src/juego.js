
const cartasUsuario=document.getElementById("usuario");
const cartasMaquina=document.getElementById("maquina");
const BtnNuevaCarta=document.getElementById("nueva-carta");
const BtnNuevoJuego=document.getElementById("nuevo-juego");
const BtnTerminar=document.getElementById("terminar");
const finalBoton=document.getElementById("final");
const puntajeJugador=document.getElementById("puntajeJugador");
const puntajeMaquina=document.getElementById("puntajeMaquina");
const gana_pierde=document.getElementById("gana-pierde");
const marcador=document.querySelector(".marcador__puntaje")

let cartas=[];
let cartaMayor=["A","J","K","Q"];
let tipo=["C","D","H","S"];

let jugador=0;
let maquina=0;
let sumadeCartasUsuario=0
let sumadeCartasMaquina=0
let numero=Math.abs(21-sumadeCartasUsuario)
let diferenciaUsuario;
let diferenciaMaquina;

crearMazo(cartas)
function crearMazo(cartas) {
    
    tipo.forEach(letra => {
        for (let i = 2; i < 11; i++) {
            cartas.push(i+letra) 
        }
        cartaMayor.forEach(mayor => {
            cartas.push(mayor+letra)
        });
        
    });
}

BtnNuevoJuego.addEventListener("click",()=>{
    sumadeCartasMaquina=null;
    sumadeCartasUsuario=0;
    eliminarHtml()
    cartas=[]
    crearMazo(cartas)

})
BtnTerminar.addEventListener("click",()=>{
    maquina>jugador?
    gana_pierde.textContent=`PERDISTE: ${jugador} - ${maquina}`:
    maquina<jugador?
    gana_pierde.textContent=`GANASTE: ${jugador} - ${maquina}`:
    gana_pierde.textContent=`EMPATE: ${jugador} - ${maquina}`
    
})

BtnNuevaCarta.addEventListener("click",()=>{
    let random=Math.floor(Math.random()*cartas.length)
    let cartaElegida=cartas[random]
    
    sumadeCartasUsuario=sumatoria(sumadeCartasUsuario,random)
    filtrar(cartaElegida)
    crearHtml(cartaElegida,cartasUsuario)       
    diferenciaUsuario=Math.abs(21-sumadeCartasUsuario);
    puntajeJugador.textContent=`Ususario 1 : 21 => ${sumadeCartasUsuario} = "${diferenciaUsuario}"`
    
    
})
finalBoton.addEventListener("click",()=>{

    if (sumadeCartasMaquina) {return}
    do {
        
        let random=Math.floor(Math.random()*cartas.length)
        let cartaElegida=cartas[random]
        sumadeCartasMaquina=sumatoria(sumadeCartasMaquina,random)
        diferenciaMaquina=21-sumadeCartasMaquina;
        console.log(`21-${sumadeCartasMaquina}=${diferenciaMaquina}`);
        
        crearHtml(cartas[random],cartasMaquina)
        filtrar(cartaElegida)
        puntajeMaquina.textContent=`Maquina : 21 => ${sumadeCartasMaquina} = "${Math.abs(diferenciaMaquina)}"`

       
    } while (Math.abs(diferenciaMaquina)>diferenciaUsuario&&Math.abs(diferenciaMaquina)===diferenciaMaquina);
    
    if (Math.abs(diferenciaMaquina)<diferenciaUsuario) {
        gana_pierde.textContent="PERDISTE"
        maquina+=1
        marcador.textContent=`MAQUINA: ${maquina} - USUARIO 1: ${jugador}`
        return
    }
    if (Math.abs(diferenciaMaquina)===diferenciaUsuario) {
        gana_pierde.textContent="EMPATE!!!"
        maquina+=1
        jugador+=1
        marcador.textContent=`MAQUINA: ${maquina} - USUARIO 1: ${jugador}`
        return
    }
    
    jugador+=1
    marcador.textContent=`MAQUINA: ${maquina} - USUARIO 1: ${jugador}`
    gana_pierde.textContent="GANASTE!!!"
    
    
})


function sumatoria(suma,random) {
    primerosCaracteres=cartas[random].substring(0,cartas[random].length-1)
    numero=parseInt(cartas[random])
    !numero?
    (primerosCaracteres==="Q"? suma+=12 :
    primerosCaracteres==="J"? suma+=11 :
    primerosCaracteres==="K"? suma+=13 :suma+=14):suma+=numero 
    return suma    
}

function filtrar(cartaElegida) {
    if (cartas.length===0) {return}
    cartas=cartas.filter((carta)=>(carta!==cartaElegida))
}

function crearHtml(cartaElegida,elemento) {
    if (cartas.length===0) {return}
    const imagen=document.createElement("img")
    imagen.setAttribute("src",`./assets/cartas/${cartaElegida}.png`)
    elemento.appendChild(imagen)
}
function eliminarHtml() {
    cartasUsuario.innerHTML=""
    cartasMaquina.innerHTML=""
    puntajeJugador.textContent=`Ususario 1 :`
    puntajeMaquina.textContent=`Maquina :`
    gana_pierde.textContent="resultado"
}












