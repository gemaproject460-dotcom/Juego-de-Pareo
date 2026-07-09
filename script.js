
//=====================================
// VARIABLES
//=====================================

let nivel = 1;
let tiempo = 60;
let intervalo;

//=====================================
// DATOS DEL NIVEL 1
//=====================================

const nivel1 = [

{
    img:"incendio.png",
    texto:"Incendio",
    respuesta:"bomberos"
},

{
    img:"robo.png",
    texto:"Robo",
    respuesta:"policia"
},

{
    img:"herido.png",
    texto:"Persona herida",
    respuesta:"ambulancia"
},

{
    img:"sinaproc.png",
    texto:"Rescate",
    respuesta:"sinaproc"
}

];

const respuestas1 = [

{
    id:"bomberos",
    nombre:"Bomberos",
    img:"bomberos.png"
},

{
    id:"policia",
    nombre:"Policía",
    img:"policia.png"
},

{
    id:"ambulancia",
    nombre:"Ambulancia",
    img:"ambulancia.png"
},

{
    id:"sinaproc",
    nombre:"SINAPROC",
    img:"sinaproc.png"
}

];

//=====================================
// DATOS DEL NIVEL 2
//=====================================

const nivel2 = [

{
    img:"bomberos.png",
    texto:"Bomberos",
    respuesta:"103"
},

{
    img:"policia.png",
    texto:"Policía",
    respuesta:"104"
},

{
    img:"ambulancia.png",
    texto:"Ambulancia",
    respuesta:"911"
},

{
    img:"sinaproc.png",
    texto:"SINAPROC",
    respuesta:"520-4426"
}

];

const respuestas2 = [

"103",
"104",
"911",
"520-4426"

];

//=====================================
// CARGAR NIVEL 1
//=====================================

function cargarNivel1(){

    izq.innerHTML = "";
    der.innerHTML = "";

    nivelTitulo.innerHTML = "Nivel 1: Emergencia → Institución";

    nivel1.forEach(item=>{

        izq.innerHTML += `

        <div class="tarjeta">

            <img src="${item.img}">

            <span>${item.texto}</span>

        </div>

        <div
            class="opcion"
            data-r="${item.respuesta}"
            ondragover="permitir(event)"
            ondrop="soltar(event)">
        </div>

        `;

    });

    respuestas1.sort(()=>Math.random()-0.5);

    respuestas1.forEach(item=>{

        der.innerHTML += `

        <div
            class="arr"
            id="${item.id}"
            draggable="true"
            ondragstart="arrastrar(event)">

            <img src="${item.img}">

            ${item.nombre}

        </div>

        `;

    });

}

//=====================================
// CARGAR NIVEL 2
//=====================================

function cargarNivel2(){

    izq.innerHTML = "";
    der.innerHTML = "";

    nivelTitulo.innerHTML = "Nivel 2: Institución → Número";

    nivel2.forEach(item=>{

        izq.innerHTML += `

        <div class="tarjeta">

            <img src="${item.img}">

            <span>${item.texto}</span>

        </div>

        <div
            class="opcion"
            data-r="${item.respuesta}"
            ondragover="permitir(event)"
            ondrop="soltar(event)">
        </div>

        `;

    });

    respuestas2.sort(()=>Math.random()-0.5);

    respuestas2.forEach(item=>{

        der.innerHTML += `

        <div
            class="arr"
            id="${item}"
            draggable="true"
            ondragstart="arrastrar(event)">

            ${item}

        </div>

        `;

    });

}

//=====================================
// ARRASTRAR
//=====================================

function arrastrar(e){

    e.dataTransfer.setData("text",e.target.id);

}

//=====================================
// PERMITIR SOLTAR
//=====================================

function permitir(e){

    e.preventDefault();

}

//=====================================
// SOLTAR TARJETA
//=====================================

function soltar(e){

    e.preventDefault();

    const id = e.dataTransfer.getData("text");

    const tarjeta = document.getElementById(id);

    if(!tarjeta) return;

    // Si el cuadro ya tenía una respuesta, la devuelve
    if(e.currentTarget.firstChild){

        der.appendChild(e.currentTarget.firstChild);

    }

    e.currentTarget.appendChild(tarjeta);

    // Ajustar automáticamente al cuadro
    tarjeta.style.width = "100%";
    tarjeta.style.margin = "0";
    tarjeta.style.height = "100%";
    tarjeta.style.display = "flex";
    tarjeta.style.flexDirection = "column";
    tarjeta.style.justifyContent = "center";
    tarjeta.style.alignItems = "center";

}//=====================================
// VERIFICAR RESPUESTAS
//=====================================

function verificar(){

    const zonas = document.querySelectorAll(".opcion");

    let correctas = 0;

    zonas.forEach(zona=>{

        if(
            zona.firstChild &&
            zona.firstChild.id == zona.dataset.r
        ){
            correctas++;
        }

    });

    const total = zonas.length;
    const puntaje = Math.round((correctas/total)*100);

    resultado.innerHTML = `
        <p> Correctas: <b>${correctas}</b></p>
        <p> Incorrectas: <b>${total-correctas}</b></p>
        <p> Puntaje: <b>${puntaje}%</b></p>
    `;

    if(puntaje==100){

        mensajeFinal.innerHTML=" ¡Excelente trabajo!";

    }else{

        mensajeFinal.innerHTML=" Sigue practicando.";

    }

    modal.style.display="flex";

}

//=====================================
// CERRAR MODAL
//=====================================

function cerrarModal(){

    modal.style.display="none";

    if(nivel==1){

        nivel=2;

        tiempo=60;

        timer.innerHTML="01:00";

        cargarNivel2();

    }else{

        alert(" ¡Has terminado el juego!");

        location.reload();

    }

}

//=====================================
// CRONÓMETRO
//=====================================

function iniciarTiempo(){

    clearInterval(intervalo);

    intervalo = setInterval(()=>{

        tiempo--;

        let minutos = Math.floor(tiempo/60);
        let segundos = tiempo%60;

        timer.innerHTML =
        String(minutos).padStart(2,"0") +
        ":" +
        String(segundos).padStart(2,"0");

        if(tiempo<=0){

            clearInterval(intervalo);

            verificar();

        }

    },1000);

}

//=====================================
// INICIAR JUEGO
//=====================================

cargarNivel1();

iniciarTiempo();
