// inicio Juanma -----------------------------------------------------

let contadorRespuestas = 0 // acumulador para obtener el total de respuestas correctas
let contadorPreguntas = 0 // contador para poder iterar las preguntas
let arrResultados = [] // array que acumula los resultados para añadirlos a localStorage
if (JSON.parse(localStorage.getItem("respuestas"))) { // si existen datos en localStorage los añadimos al arrResultados
    arrResultados = JSON.parse(localStorage.getItem("respuestas"))
}
let formBox = document.getElementById("formBox")
let formElement = document.createElement("form")

let obtenerPreguntasAPI = async() => {
    let datos = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    let res = await datos.json()
    res.results.forEach((element, i) => { // se iteran las preguntas devueltas por el fetch
        let pregunta = {
                name: `preguntaAPI_${i}`,
                label: element.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'"),
                correct: element.correct_answer.replace(/&quot;/g, '"').replace(/&#039;/g, "'")
            } //se crea el objeto de la pregunta

        let respuestas = []
        element.incorrect_answers.forEach(element => {
                let respuesta = {
                    label: element.replace(/&quot;/g, '"').replace(/&#039;/g, "'"),
                    value: element.replace(/&quot;/g, '"').replace(/&#039;/g, "'")
                }
                respuestas.push(respuesta)
            }) // se añaden las respuestas incorrectas a un array

        let numRndm = Math.floor(Math.random() * respuestas.length) // se obtiene un numero random entre 0 y el numero de respuestas incorrectas
        respuestas.splice(numRndm, 0, {
                label: element.correct_answer.replace(/&quot;/g, '"').replace(/&#039;/g, "'"),
                value: element.correct_answer.replace(/&quot;/g, '"').replace(/&#039;/g, "'")
            }) // se añade la respuesta correcta en una posicion aleatoria del array respuestas

        pregunta.answers = respuestas // se añaden las respuestas al objeto de la pregunta
        questions.push(pregunta) // se añade la pregunta al array questions
    });
}

let comprobarRespuestas = () => {
    document.getElementById(`formulario`).addEventListener("submit", function(event) {
        event.preventDefault()
        let valRespuestas = document.querySelectorAll('[name]')
        let arrNames = []

        for (let i = 1; i < valRespuestas.length - 1; i++) {
            if (!arrNames.includes(valRespuestas[i].name)) {
                arrNames.push(valRespuestas[i].name)
            }
        }

        for (let j = 0; j < arrNames.length; j++) {
            let contadorResp = undefined

            let valResp = document.querySelectorAll(`[name="${arrNames[j]}"]`)
            for (let i = 0; i < valResp.length; i++) {
                if (valResp[i].checked) {
                    if (valResp[i].value == questions[j].correct) {
                        console.log(`correcto`)
                        contadorRespuestas++
                        // correcto(valResp[i].id)
                    } else {
                        // incorrecto(valResp[i].id)
                    }
                }
                if (contadorResp == undefined) {
                    // campoVacio(arrNames, j)
                }
            }
        }
        guardarResultados()
    })
}

let guardarResultados = () => {
    const fecha = new Date(); // se obtiene la fecha y hora del momento en el que se acaba el quiz
    const dia = fecha.getDate()
    const mes = () => fecha.getMonth() + 1 < 10 ? "0" + (fecha.getMonth() + 1) : fecha.getMonth()
    const hora = fecha.getHours()
    const minuto = () => fecha.getMinutes() < 10 ? "0" + fecha.getMinutes() : fecha.getMinutes()

    const diaHora = `${dia}/${mes()} - ${hora}:${minuto()}`

    const fechaRespuesta = { // se crea un objeto con la fecha/hora y respuestas acertadas
        fecha: diaHora,
        aciertos: contadorRespuestas
    }

    arrResultados.push(fechaRespuesta) // se añade el objeto al array de resultados
    localStorage.setItem(`respuestas`, JSON.stringify(arrResultados)) // se actualiza la informacion en el loclStorage

    location.href = "results.html"; // se redirige a la pagina de resultados
}

// function correcto(id) {
//     document.getElementById(id).className = "green"
//     document.querySelector(`label[for="${id}"]`).className = "green"
// }

// function incorrecto(id) {
//     document.getElementById(id).className = "red"
//     document.querySelector(`label[for="${id}"]`).className = "red"
// }

// fin Juanma -----------------------------------------------------

//Inicio Victor -----------------------------------------------------

function printQuestion(pregunta, i) { // añadida i
    formElement.setAttribute("id", `formulario`) //se crea una id diferente para poder borrar cada pregunta
    formElement.setAttribute("class", `formulario`)
    formBox.appendChild(formElement)

    let fieldElement = document.createElement("fieldset")
    fieldElement.setAttribute("id", `fieldset${i}`) //se crea una id diferente para cada pregunta
    fieldElement.setAttribute("class", `fieldset`)
    formElement.appendChild(fieldElement)

    let h3Element = document.createElement("h3")
    h3Element.setAttribute("id", `h3_${i}`) //se crea una id diferente para cada pregunta
    h3Element.setAttribute("class", `legend`)
    let preguntaContent = document.createTextNode(htmlEntities(pregunta.label))
    h3Element.appendChild(preguntaContent)
    fieldElement.appendChild(h3Element)


    for (let j = 0; j < pregunta.answers.length; j++) {
        let inputElement = document.createElement("input")
        inputElement.setAttribute("id", `input${i}${j}`)
        inputElement.setAttribute("class", "switchInput")
        inputElement.setAttribute("type", "radio")
        inputElement.setAttribute("name", htmlEntities(pregunta.name)) // modificado name para que solo se pueda seleccionar una respuesta
        inputElement.setAttribute("value", htmlEntities(pregunta.answers[j].value)) // añadido value para poder hacer la comprobacion de las respuestas correctas
        fieldElement.appendChild(inputElement)

        let labelElement = document.createElement("label")
        labelElement.setAttribute("class", "switch")
        labelElement.setAttribute("for", `input${i}${j}`) // modificado el for para que coincida con el id del input y se pueda seleccionar la respuesta pinchando en el texto
        let contenido = document.createTextNode(htmlEntities(pregunta.answers[j].label))
        labelElement.appendChild(contenido)
        fieldElement.appendChild(labelElement)

        let brElement = document.createElement("br")
        fieldElement.appendChild(brElement)
    }
}

let pintarSubmit = () => {
    let submitElement = document.createElement("input")
    submitElement.setAttribute("id", "SendForm")
    submitElement.setAttribute("type", "submit")
    submitElement.setAttribute("value", "Comprobar!")
    formElement.appendChild(submitElement)
}

let printQuestions = async(arr) => {
    let consultarAPI = await obtenerPreguntasAPI()
    let i = 0
    for (i = 0; i < arr.length; i++) { //se iteran las preguntas
        printQuestion(arr[i], i)
    }

    pintarSubmit() // se pinta el submit
    comprobarRespuestas(i)
}
printQuestions(questions)

//fin Victor -----------------------------------------------------