import { questions, htmlEntities } from './preguntas.js'
import { firebaseConfig } from './config.js'
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

async function createResult(result) {
    let data = await db.collection("results").add(result)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            localStorage.setItem(`idResult`, JSON.stringify(docRef.id))
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    location.href = "results.html"; // se redirige a la pagina de resultados
}

// inicio Juanma -----------------------------------------------------

let contadorRespuestas = 0 // acumulador para obtener el total de respuestas correctas
let contadorPreguntas = 0 // contador para poder iterar las preguntas
let arrResultados = [] // array que acumula los resultados para añadirlos a localStorage
if (JSON.parse(localStorage.getItem("respuestas"))) { // si existen datos en localStorage los añadimos al arrResultados
    arrResultados = JSON.parse(localStorage.getItem("respuestas"))
}

let obtenerPreguntasAPI = async() => {
    let datos = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    let res = await datos.json()
    res.results.forEach((element, i) => { // se iteran las preguntas devueltas por el fetch
        let pregunta = {
                name: `preguntaAPI_${i}`,
                label: element.question,
                correct: element.correct_answer
            } //se crea el objeto de la pregunta

        let respuestas = []
        element.incorrect_answers.forEach(element => {
                let respuesta = {
                    label: element,
                    value: element
                }
                respuestas.push(respuesta)
            }) // se añaden las respuestas incorrectas a un array

        let numRndm = Math.floor(Math.random() * respuestas.length) // se obtiene un numero random entre 0 y el numero de respuestas incorrectas
        respuestas.splice(numRndm, 0, {
                label: element.correct_answer,
                value: element.correct_answer
            }) // se añade la respuesta correcta en una posicion aleatoria del array respuestas

        pregunta.answers = respuestas // se añaden las respuestas al objeto de la pregunta
        questions.push(pregunta) // se añade la pregunta al array questions
    });

    iterarPregunta()
}
obtenerPreguntasAPI()

let iterarPregunta = () => {
    if (contadorPreguntas < questions.length) { // se comprueba que en cada iteracion tengamos unas pregunta que hacer
        if (contadorPreguntas != 0 && contadorPreguntas < questions.length) { // si no es la primera pregunta ni la ultima se borra la pregunta anterior del DOM
            document.getElementById(`formBox`).innerHTML = ""
        }

        printQuestion(questions[contadorPreguntas], contadorPreguntas) // se pinta la pregunta que corresponde a cada iteracion

        // console.log(questions[contadorPreguntas].correct)

        comprobarRespuestas(contadorPreguntas) // se llama al comprobador de las respuestas y se le pasa como parametro el indice de la pregunta en la que estamos

    } else { // si no hay mas preguntas se ejecuta esto
        const fecha = new Date(); // se obtiene la fecha y hora del momento en el que se acaba el quiz
        const dia = fecha.getDate()
        const mes = () => fecha.getMonth() + 1 < 10 ? "0" + (fecha.getMonth() + 1) : fecha.getMonth()
        const hora = fecha.getHours()
        const minuto = () => fecha.getMinutes() < 10 ? "0" + fecha.getMinutes() : fecha.getMinutes()

        const diaHora = `${dia}/${mes()} - ${hora}:${minuto()}`

        const fechaRespuesta = { // se crea un objeto con la fecha/hora y respuestas acertadas
            fecha: diaHora,
            aciertos: contadorRespuestas,
            numPreguntas: contadorPreguntas
        }

        createResult(fechaRespuesta)

        // arrResultados.push(fechaRespuesta) // se añade el objeto al array de resultados
        // localStorage.setItem(`respuestas`, JSON.stringify(arrResultados)) // se actualiza la informacion en el loclStorage
        // localStorage.setItem(`numero de preguntas`, JSON.stringify(contadorPreguntas))

    }
}

let comprobarRespuestas = (i) => {
    document.getElementById(`formulario${i}`).addEventListener("submit", function(event) { // se añade un addEventListener diferente al submit de cada pregunta segun el indice que se le pasa en la llamada a la funcion
        event.preventDefault()
        let respuestas = Array.from(event.path[0]) // se convierte en array la devolucion de datos del formulario

        for (let i = 1; i < respuestas.length - 1; i++) { // se itera el array de datos
            const resp = respuestas[i];

            if (resp.checked && resp.value == questions[contadorPreguntas].correct) { // si la respuesta que esta marcada es igual a la respuesta correcta se suma uno al contadorRespuestas
                contadorRespuestas++
            }
        }

        contadorPreguntas++ // se suma uno al contador preguntas para poder pintar la siguiente pregunta
        iterarPregunta()
    })
}

function correcto(id) {
    document.getElementById(id).className = "green"
    document.querySelector(`label[for="${id}"]`).className = "green"
}

function incorrecto(id) {
    document.getElementById(id).className = "red"
    document.querySelector(`label[for="${id}"]`).className = "red"
}

// fin Juanma -----------------------------------------------------

//Inicio Victor -----------------------------------------------------

function printQuestion(pregunta, i) { // añadida i
    let formBox = document.getElementById("formBox")

    let formElement = document.createElement("form")
    formElement.setAttribute("id", `formulario${i}`) //se crea una id diferente para poder borrar cada pregunta
    formBox.appendChild(formElement)

    let fieldElement = document.createElement("fieldset")
    fieldElement.setAttribute("id", "fieldset")
    formElement.appendChild(fieldElement)

    let h3Element = document.createElement("h3")
    h3Element.setAttribute("id", "question")
    let preguntaContent = document.createTextNode(htmlEntities(pregunta.label))
    h3Element.appendChild(preguntaContent)
    fieldElement.appendChild(h3Element)

    for (let j = 0; j < pregunta.answers.length; j++) {
        let inputElement = document.createElement("input")
        inputElement.setAttribute("id", `input${j}`)
        inputElement.setAttribute("class", "switchInput")
        inputElement.setAttribute("type", "radio")
        inputElement.setAttribute("name", htmlEntities(pregunta.name)) // modificado name para que solo se pueda seleccionar una respuesta
        inputElement.setAttribute("value", htmlEntities(pregunta.answers[j].value)) // añadido value para poder hacer la comprobacion de las respuestas correctas
        fieldElement.appendChild(inputElement)

        let labelElement = document.createElement("label")
        labelElement.setAttribute("class", "switch")
        labelElement.setAttribute("for", `input${j}`) // modificado el for para que coincida con el id del input y se pueda seleccionar la respuesta pinchando en el texto
        let contenido = document.createTextNode(htmlEntities(pregunta.answers[j].label))
        labelElement.appendChild(contenido)
        fieldElement.appendChild(labelElement)
    }

    let submitElement = document.createElement("input")
    submitElement.setAttribute("id", "SendForm")
    submitElement.setAttribute("type", "submit")
    submitElement.setAttribute("value", "Comprobar!")
    formElement.appendChild(submitElement)
}

//fin Victor -----------------------------------------------------