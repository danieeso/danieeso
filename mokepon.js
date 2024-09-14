const sectionSeleccionar = document.getElementById("Seleccionar")
const sectionReiniciar = document.getElementById("Reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")

const sectionSeleccionarMascota = document.getElementById("Seleccionar-mascota")

const botonReiniciar = document.getElementById("Boton-reiniciar")
const spanMascotaJugador = document.getElementById("Mascota-Jugador")
const spanMascotaEnemigo = document.getElementById("Mascota-Enemigo")

const spanVidasJugador = document.getElementById("vidas-Jugador")
const spanVidasEnemigo = document.getElementById("vidas-Enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")
const contebedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionesDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let inputLangostelvis
let inputTucapalma
let inputPydos 
let mascotaJugador
let mascotaDeJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonfuego 
let botonagua
let botontierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo 
let victoriasJugador =  0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'
let alturaQueBuscamos 
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 600

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 80
        this.alto = 80
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0

        
    }
    pintarMokepon() {
        lienzo.drawImage(
        this.mapaFoto,
        this.x,
        this.y,
        this.ancho,
        this.alto
        )
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, "./assets/mokepons_mokepon_hipodoge_attack.png")

let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, "./assets/mokepons_mokepon_capipepo_attack.png")

let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, "./assets/mokepons_mokepon_ratigueya_attack.png")

let langostelvis = new Mokepon('Langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', 5, "./assets/mokepons_mokepon_langostelvis_attack.png")

let tucapalma = new Mokepon('Tucapalma', './assets/mokepons_mokepon_Tucapalma_attack.png', 5, "./assets/mokepons_mokepon_Tucapalma_attack.png")

let pydos = new Mokepon('Pydos', './assets/mokepons_mokepon_Pydos_attack.png', 5, "./assets/mokepons_mokepon_Pydos_attack.png")



const HIPODOGE_ATAQUES = [
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🌵", id: "boton-tierra" },
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)



const CAPIPEPO_ATAQUES = [
    { nombre: "🌵", id: "boton-tierra" },
    { nombre: "🌵", id: "boton-tierra" },
    { nombre: "🌵", id: "boton-tierra" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
]

capipepo.ataques.push(...CAPIPEPO_ATAQUES)



const RATIGUEYA_ATAQUES = [
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🌵", id: "boton-tierra" },
]

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)



const LANGOSTELVIS_ATAQUES = [
    { nombre: "💧", id: "boton_agua"},
    { nombre: "💧", id: "boton_agua"},
    { nombre: "🔥", id: "boton_fuego"},
    { nombre: "🔥", id: "boton_fuego"},
    { nombre: "🌵", id: "boton-tierra" },
]

langostelvis.ataques.push(...LANGOSTELVIS_ATAQUES)



const TUCAPALMA_ATAQUES = [
    {nombre: "💧", id: "boton_agua"},
    {nombre: "💧", id: "boton_agua"},
    {nombre: "🌵", id: "boton_tierra"},
    {nombre: "🌵", id: "boton_tierra"},
    { nombre: "🔥", id: "boton-fuego" },
]

tucapalma.ataques.push(...TUCAPALMA_ATAQUES)



const PYDOS_ATAQUES = [
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    {nombre: "🌵", id: "boton_tierra"},
    {nombre: "🌵", id: "boton_tierra"},
    { nombre: "💧", id: "boton-agua" },
]

pydos.ataques.push(...PYDOS_ATAQUES)



mokepones.push(hipodoge, capipepo, ratigueya, langostelvis, tucapalma, pydos)

function iniciarJuego() {

    sectionSeleccionar.style.display = "none"
    sectionVerMapa.style.display = "none"

mokepones.forEach((mokepon) => {
    opcionesDeMokepones = `
    <input type="radio" name="mascota" id=${mokepon.nombre} />
    <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
        <p>${mokepon.nombre}</p>
        <img src=${mokepon.foto} alt=${mokepon.nombre}>
    </label>
    `

contebedorTarjetas.innerHTML += opcionesDeMokepones

 inputHipodoge = document.getElementById("Hipodoge")
 inputCapipepo = document.getElementById("Capipepo")
 inputRatigueya = document.getElementById("Ratigueya")
 inputLangostelvis = document.getElementById("Langostelvis")
 inputTucapalma = document.getElementById("Tucapalma")
 inputPydos = document.getElementById("Pydos")

})
    sectionReiniciar.style.display = "none"

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    
    botonReiniciar.addEventListener("click", reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://192.168.0.43:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador() {

    
    
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else if (inputLangostelvis.checked) {
        spanMascotaJugador.innerHTML = inputLangostelvis.id
        mascotaJugador = inputLangostelvis.id
    } else if (inputTucapalma.checked) {
        spanMascotaJugador.innerHTML = inputTucapalma.id
        mascotaJugador = inputTucapalma.id
    } else if (inputPydos.checked) {
        spanMascotaJugador.innerHTML = inputPydos.id
        mascotaJugador = inputPydos.id
    } else {
        alert("seleciona una poh")
        return
    }
    sectionSeleccionarMascota.style.display = "none"

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = "flex"
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://192.168.0.43:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador) {
    mokepones.forEach((mokepon) => {
        if (mascotaJugador === mokepon.nombre) {
            ataques = mokepon.ataques
        }
    })
        
    mostrarAtaques(ataques)
    
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    botonfuego = document.getElementById("boton-fuego")
    botonagua = document.getElementById("boton-agua")
    botontierra = document.getElementById("boton-tierra")
    botones = document.querySelectorAll(".BAtaque")

}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target. innerText === "🔥") {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = "#856e2a"
                boton.disabled = true
            } else if (e.target. innerText === "💧") {
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.background = "#856e2a"
                boton.disabled = true
            } else {
                ataqueJugador.push("TIERRA")
                console.log(ataqueJugador)
                boton.style.background = "#856e2a"
                boton.disabled = true
            }
            if (ataqueJugador.length === 5) {
                enviarAtaques()
            }
            
        })
        
    })
    
}

function enviarAtaques() {
    fetch(`http://192.168.0.43:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://192.168.0.43:8080/mokepon/${enemigoId}/ataques`)
    .then(function(res){
        if (res.ok) {
            res.json()
            .then(function({ ataques }) {
                if (ataques.length === 5) {
                    ataqueEnemigo = ataques
                    combate()
                }
            })
        }
    })
}
function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre;
    ataquesMokeponEnemigo = enemigo.ataques;
    secuenciaAtaque();
}

function ataqueAleatorioEnemigo() {
console.log("Ataques enemigo", ataquesMokeponEnemigo);

    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);
    let ataque = ataquesMokeponEnemigo[ataqueAleatorio].nombre;
    ataquesMokeponEnemigo.splice(ataqueAleatorio, 1);
  
    if (ataque == "🔥") {
      ataqueEnemigo.push("FUEGO");
    } else if (ataque == "💧") {
      ataqueEnemigo.push("AGUA");
    } else {
      ataqueEnemigo.push("TIERRA");
    }
  
    console.log(ataqueEnemigo);
    iniciarPelea();
  }

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo [enemigo]
}

function combate() { 
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponente(index, index)
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] ==='AGUA' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponente(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
            
        }
    }

    revisarVidas()
}
function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("EMPATE... ¿y ahora que?")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("Felicitaiones :)")
    }else {
        crearMensajeFinal("Para-La-Proxima :(")
    }

}

function crearMensaje(resultado) {
    
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {

    sectionMensajes.innerHTML = resultadoFinal

    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas(){

    mascotaDeJugadorObjeto.x = mascotaDeJugadorObjeto.x + mascotaDeJugadorObjeto.velocidadX
    mascotaDeJugadorObjeto.y = mascotaDeJugadorObjeto.y + mascotaDeJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaDeJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaDeJugadorObjeto.x, mascotaDeJugadorObjeto.y)

    mokeponesEnemigos.forEach(function (mokepon) {
        if (mokepon != undefined) {
         mokepon.pintarMokepon()
         revisarColision(mokepon)
        }
    })
}

function enviarPosicion(x, y) {
    fetch(`http://192.168.0.43:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
            .then(function ({ enemigos }) {
                mokeponesEnemigos = enemigos.map(function (enemigo) {
                    console.log({enemigo});
                    
                    let mokeponEnemigo = null
                    const mokeponNombre = enemigo.mokepon.nombre || ""

                    if (mokeponNombre === "Hipodoge") {
                        mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/mokepons_mokepon_hipodoge_attack.png', enemigo.id)
                    } else if (mokeponNombre === "Capipepo") {
                        mokeponEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/mokepons_mokepon_capipepo_attack.png', enemigo.id)
                    } else if (mokeponNombre === "Ratigueya") {
                        mokeponEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/mokepons_mokepon_ratigueya_attack.png', enemigo.id)
                    } else if (mokeponNombre === "Langostelvis") {
                        mokeponEnemigo = new Mokepon('Langostelvis', './assets/mokepons_mokepon_Langostelvis_attack.png', 5, './assets/mokepons_mokepon_Langostelvis_attack.png', enemigo.id)
                    } else if (mokeponNombre === "Tucapalma") {
                        mokeponEnemigo = new Mokepon('Tucapalma', './assets/mokepons_mokepon_Tucapalma_attack.png', 5, './assets/mokepons_mokepon_Tucapalma_attack.png', enemigo.id)
                    } else if (mokeponNombre === "Pydos") {
                        mokeponEnemigo = new Mokepon('Pydos', './assets/mokepons_mokepon_Pydos_attack.png', 5, './assets/mokepons_mokepon_Pydos_attack.png', enemigo.id)
                    }

                    mokeponEnemigo.x = enemigo.x || 0
                    mokeponEnemigo.y = enemigo.y || 0

                    return mokeponEnemigo
                })
            })
        }
    })
}


function moverDerecha() {
    mascotaDeJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
    mascotaDeJugadorObjeto.velocidadX = - 5
}

function moverArriba() {
    mascotaDeJugadorObjeto.velocidadY = - 5
}

function moverAbajo() {
    mascotaDeJugadorObjeto.velocidadY = 5
}

function detenerMovimiento() {
    mascotaDeJugadorObjeto.velocidadX = 0
    mascotaDeJugadorObjeto.velocidadY = 0
}

function precionTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break;
        case 'w':
            moverArriba()
            break;
        case 'ArrowDown':
            moverAbajo()
            break;
        case 's':
            moverAbajo()
            break;
        case 'ArrowLeft':
            moverIzquierda()
            break;
        case 'a':
            moverIzquierda()
            break;
        case 'ArrowRight':
            moverDerecha()
            break;
        case 'd':
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa(){

    mascotaDeJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    console.log(mascotaDeJugadorObjeto, mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)

   window.addEventListener("keydown", precionTecla)

    window.addEventListener("keyup", detenerMovimiento)

}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre ) {
            ataques = mokepones[i].ataques
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo) {

const arribaEnemigo = enemigo.y
const abajoEnemigo = enemigo.y + enemigo.alto
const derechaEnemigo = enemigo.x + enemigo.ancho
const izquierdaEnemigo = enemigo.x

const arribaMascota = 
mascotaDeJugadorObjeto.y
const abajoMascota = 
mascotaDeJugadorObjeto.y + mascotaDeJugadorObjeto.alto
const derechaMascota = 
mascotaDeJugadorObjeto.x + mascotaDeJugadorObjeto.ancho
const izquierdaMascota = 
mascotaDeJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    console.log('Se detecto una colision');

    enemigoId = enemigo.id
    sectionSeleccionar.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)
