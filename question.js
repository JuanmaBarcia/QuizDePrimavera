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
                name: `pregunta_${i}`,
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

        //   console.log(questions[contadorPreguntas].correct)

        comprobarRespuestas(contadorPreguntas) // se llama al comprobador de las respuestas y se le pasa como parametro el indice de la pregunta en la que estamos

    } else { // si no hay mas preguntas se ejecuta esto
        const fecha = new Date(); // se obtiene la fecha y hora del momento en el que se acaba el quiz
        const dia = fecha.getDate()
        const mes = () => fecha.getMonth() + 1 < 10 ? "0" + (fecha.getMonth() + 1) : fecha.getMonth()
        const hora = fecha.getHours()
        const minuto = () => fecha.getMinutes() < 10 ? "0" + fecha.getMinutes() : fecha.getMinutes()

        const diaHora = `${dia}/${mes()}<br>${hora}:${minuto()}`

        const fechaRespuesta = { // se crea un objeto con la fecha/hora y respuestas acertadas
            fecha: diaHora,
            aciertos: contadorRespuestas
        }

        arrResultados.push(fechaRespuesta) // se añade el objeto al array de resultados
        localStorage.setItem(`respuestas`, JSON.stringify(arrResultados)) // se actualiza la informacion en el loclStorage

        location.href = "results.html"; // se redirige a la pagina de resultados
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

    let legendElement = document.createElement("legend")
    legendElement.setAttribute("id", "legend")
    let preguntaContent = document.createTextNode(pregunta.label)
    legendElement.appendChild(preguntaContent)
    fieldElement.appendChild(legendElement)

    for (let j = 0; j < pregunta.answers.length; j++) {
        let inputElement = document.createElement("input")
        inputElement.setAttribute("id", `input${j}`)
        inputElement.setAttribute("class", "switchInput")
        inputElement.setAttribute("type", "radio")
        inputElement.setAttribute("name", `nameQuestion`) // modificado name para que solo se pueda seleccionar una respuesta
        inputElement.setAttribute("value", pregunta.answers[j].value) // añadido value para poder hacer la comprobacion de las respuestas correctas
        fieldElement.appendChild(inputElement)

        let labelElement = document.createElement("label")
        labelElement.setAttribute("class", "switch")
        labelElement.setAttribute("for", `input${j}`) // modificado el for para que coincida con el id del input y se pueda seleccionar la respuesta pinchando en el texto
        let contenido = document.createTextNode(pregunta.answers[j].label)
        labelElement.appendChild(contenido)
        fieldElement.appendChild(labelElement)

        let brElement = document.createElement("br")
        fieldElement.appendChild(brElement)
    }

    let submitElement = document.createElement("input")
    submitElement.setAttribute("id", "SendForm")
    submitElement.setAttribute("type", "submit")
    submitElement.setAttribute("value", "Comprobar!")
    formElement.appendChild(submitElement)
}

function printQuestions() {
    for (let i = 0; i < questions.length; i++) {
        //console.log(questions[i].label);
        //console.log(questions);
        printQuestion(questions[i])
    }
}

//fin Victor -----------------------------------------------------


// ============================= codigo inicial =============================== //

//   const resp = {
//       q5001: "pn",
//       q5002: [true, false, false],
//       q5003: 14,
//       q5004: [false, true, false],
//       q5005: "16Sem",
//       q5006: [true, true, false]
//   }

//   function campoRelleno(arr, index) {
//       if (document.querySelector(`#${arr[index]} p`)) {
//           document.querySelector(`#${arr[index]} p`).remove()
//       }
//   }

//   function campoVacio(arr, index) {
//       if (!document.querySelector(`#${arr[index]} p`)) {
//           let pElement = document.createElement("p");
//           let contenido = document.createTextNode("Por favor seleccione alguna respuesta");
//           pElement.appendChild(contenido);
//           document.querySelector(`#${arr[index]}`).appendChild(pElement);
//           let p = document.querySelector(`#${arr[index]} p`);
//           let attr = document.createAttribute("class");
//           attr.value = "campo_vacio";
//           p.setAttributeNode(attr);
//       }
//       document.getElementById(arr[index]).className = "default"
//   }

//   function correcto(arr, index) {
//       document.getElementById(arr[index]).className = "green"
//   }

//   function incorrecto(arr, index) {
//       document.getElementById(arr[index]).className = "red"
//   }

//   document.getElementById("quiz").addEventListener("submit", function(event) {

//       event.preventDefault();

//       let valRespuestas = document.querySelectorAll('[name]')
//       let arrNames = []

//       for (let i = 1; i < valRespuestas.length - 1; i++) {
//           if (!arrNames.includes(valRespuestas[i].name)) {
//               arrNames.push(valRespuestas[i].name)
//           }
//       }
//       // --------------------------- Validaciones --------------------------- //

//       for (let j = 0; j < arrNames.length; j++) {
//           let valResp = document.querySelectorAll(`[name="${arrNames[j]}"]`)
//           let contadorResp = undefined
//           let arrResp = []
//           for (let i = 0; i < valResp.length; i++) {

//               // -------------------------------------------- RADIO -------------------------------------------- //
//               if (valResp[i].type == "radio") {
//                   if (valResp[i].checked) {
//                       contadorResp++
//                       campoRelleno(arrNames, j)
//                       if (valResp[i].value == resp[arrNames[j]]) {
//                           correcto(arrNames, j)
//                       } else {
//                           incorrecto(arrNames, j)
//                       }
//                   }
//                   if (contadorResp == undefined) {
//                       campoVacio(arrNames, j)
//                   }
//               }

//               // -------------------------------------------- NUMBER -------------------------------------------- //


//               if (valResp[i].type == "number") {
//                   if (!valResp[i].value) {
//                       campoVacio(arrNames, j)
//                   } else {
//                       campoRelleno(arrNames, j)
//                       if (valResp[i].value == resp[arrNames[j]]) {
//                           correcto(arrNames, j)
//                       } else {
//                           incorrecto(arrNames, j)
//                       }
//                   }
//               }

//               // ------------------------------------------- CHECKBOX ------------------------------------------- //

//               if (valResp[i].type == "checkbox") {
//                   arrResp.push(valResp[i].checked)
//                   if (valResp[i].checked) {
//                       contadorResp++
//                   }
//                   if (arrResp.toString() == resp[arrNames[j]].toString()) {
//                       contadorResp++
//                       campoRelleno(arrNames, j)
//                       correcto(arrNames, j)
//                   } else {
//                       campoRelleno(arrNames, j)
//                       incorrecto(arrNames, j)
//                   }
//                   if (contadorResp == undefined) {
//                       campoVacio(arrNames, j)
//                   }
//               }

//               // ---------------------------------------- SELECT MULTIPLE ---------------------------------------- //

//               if (valResp[i].type == "select-multiple") {
//                   for (let i = 0; i < valResp[0].length; i++) {
//                       arrResp.push(valResp[0][i].selected)
//                       if (valResp[0][i].selected) {
//                           contadorResp++
//                       }
//                       if (arrResp.toString() == resp[arrNames[j]].toString()) {
//                           contadorResp++
//                           campoRelleno(arrNames, j)
//                           correcto(arrNames, j)
//                       } else {
//                           campoRelleno(arrNames, j)
//                           incorrecto(arrNames, j)
//                       }
//                       if (contadorResp == undefined) {
//                           campoVacio(arrNames, j)
//                       }
//                   }
//               }
//           }
//       }
//   })