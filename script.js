  const questions = [{
      name: 'dos',
      label: '2+2',
      answers: [
          { label: 'cuatro', value: 4 },
          { label: 'cinco', value: 5 },
          { label: 'ocho', value: 8 },
          { label: 'siete', value: 7 },
      ],
      correct: 4
  }, {
      name: 'tres',
      label: '3+3',
      answers: [
          { label: 'diez', value: 10 },
          { label: 'cinco', value: 5 },
          { label: 'seis', value: 6 },
          { label: 'siete', value: 7 },
      ],
      correct: 6
  }, {
      name: 'cuatro',
      label: '4+4',
      answers: [
          { label: 'ocho', value: 8 },
          { label: 'cinco', value: 5 },
          { label: 'seis', value: 6 },
          { label: 'siete', value: 7 },
      ],
      correct: 8
  }, {
      name: 'cinco',
      label: '5+5',
      answers: [
          { label: 'cuatro', value: 4 },
          { label: 'diez', value: 10 },
          { label: 'seis', value: 6 },
          { label: 'siete', value: 7 },
      ],
      correct: 10
  }, {
      name: 'seis',
      label: '6+6',
      answers: [
          { label: 'cuatro', value: 4 },
          { label: 'doce', value: 12 },
          { label: 'seis', value: 6 },
          { label: 'siete', value: 7 },
      ],
      correct: 12
  }]

  // inicio Juanma -----------------------------------------------------

  let contadorRespuestas = 0
  let contadorPreguntas = 0

  let obtenerPreguntasAPI = async() => {
      let datos = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      let res = await datos.json()
      res.results.forEach((element, i) => {
          let pregunta = {
              name: `pregunta_${i}`,
              label: element.question,
              correct: element.correct_answer
          }

          let respuestas = []
          element.incorrect_answers.forEach(element => {
              let respuesta = {
                  label: element,
                  value: element
              }
              respuestas.push(respuesta)
          })

          let numRndm = Math.floor(Math.random() * respuestas.length)
          respuestas.splice(numRndm, 0, {
              label: element.correct_answer,
              value: element.correct_answer
          })

          pregunta.answers = respuestas
          questions.push(pregunta)
      });

      //   console.log(questions)
      iterarPregunta()
  }
  obtenerPreguntasAPI()

  let iterarPregunta = () => {
      if (contadorPreguntas < questions.length) {
          if (contadorPreguntas != 0) {
              document.getElementById(`formBox`).innerHTML = ""
          }

          printQuestion(questions[contadorPreguntas], contadorPreguntas)
              //   console.log(questions[contadorPreguntas].correct)
          comprobarDatos(contadorPreguntas)

      } else {
          console.log(`Se acabaron las preguntas`)
          console.log(contadorRespuestas)
              //METER LOS RESULTADOS EN EL LOCAL STORAGE
          document.getElementById(`formBox`).innerHTML = ""
              // PINTAR RESULTADOS
      }
  }

  let comprobarDatos = (i) => {
      document.getElementById(`formulario${i}`).addEventListener("submit", function(event) {
          event.preventDefault()
          let respuestas = Array.from(event.path[0])

          for (let i = 1; i < respuestas.length - 1; i++) {
              const resp = respuestas[i];

              if (resp.checked && resp.value == questions[contadorPreguntas].correct) {
                  contadorRespuestas++
              }
          }

          contadorPreguntas++
          iterarPregunta()
      })
  }

  // fin Juanma -----------------------------------------------------

  //Inicio Victor -----------------------------------------------------

  function printQuestion(pregunta, i) {
      let formBox = document.getElementById("formBox")

      let formElement = document.createElement("form")
      formElement.setAttribute("id", `formulario${i}`)
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
          inputElement.setAttribute("name", `nameQuestion`)
          inputElement.setAttribute("value", pregunta.answers[j].value)
          fieldElement.appendChild(inputElement)

          let labelElement = document.createElement("label")
          labelElement.setAttribute("class", "switch")
          labelElement.setAttribute("for", `input${j}`)
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
      printQuestion(questions[contadorPreguntas])
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