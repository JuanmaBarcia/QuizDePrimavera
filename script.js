  const questions = [{
      name: 'dos',
      label: '2+2',
      answers: [
          { label: 'cuatro', value: 4 },
          { label: 'cinco', value: 5 },
          { label: 'seis', value: 6 },
          { label: 'siete', value: 7 },
      ],
      correct: 4
  }, {
      name: 'tres',
      label: '3+3',
      answers: [
          { label: 'cuatro', value: 4 },
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
      correct: 4
  }, {
      name: 'seis',
      label: '6+6',
      answers: [
          { label: 'cuatro', value: 4 },
          { label: 'doce', value: 12 },
          { label: 'seis', value: 6 },
          { label: 'siete', value: 7 },
      ],
      correct: 4
  }, {
      name: 'q5001',
      label: '¿Qué cuerpo de seguridad gestiona la expedición del DNI?',
      answers: [
          { label: 'La Policía Nacional', value: "pn" },
          { label: 'La Guardia civil', value: "gc" },
          { label: 'La Policía Local', value: "pl" }
      ],
      correct: "pn"
  }]
////Inicio Victor////

  function printQuestion(pregunta) {
      console.log(pregunta)
    let formBox = document.getElementById("formBox")
    let formElement = document.createElement("form")
    formElement.setAttribute("id", "formulario")
    formBox.appendChild(formElement)
    
    let fieldElement = document.createElement("fieldset")
    fieldElement.setAttribute("id","fieldset")
    formElement.appendChild(fieldElement)
    
    let legendElement = document.createElement("legend")
    legendElement.setAttribute("id", "legend")
    fieldElement.appendChild(legendElement)
    let preguntaContent = document.createTextNode(pregunta.label)
    legendElement.appendChild(preguntaContent)
    //for (let index = 0; index < questions.length; index++) {
       for (let j = 0; j < questions[0].answers.length; j++) {
        //console.log(questions[index].answers)
        let inputElement = document.createElement("input")
        inputElement.setAttribute("id", `input${j}`)
        inputElement.setAttribute("class", "switchInput")
        inputElement.setAttribute("type", "radio")
        inputElement.setAttribute("name", questions[0].answers[j].label)
        fieldElement.appendChild(inputElement)
        let labelElement = document.createElement("label")
        labelElement.setAttribute("class", "switch")
        labelElement.setAttribute("for", "La Policía Nacional")
        let contenido = document.createTextNode(questions[0].answers[j].label)
        labelElement.appendChild(contenido)
        let brElement = document.createElement("br")
        fieldElement.appendChild(labelElement)
        fieldElement.appendChild(brElement)
       }
        
        //}
        let submitElement = document.createElement("input")
        submitElement.setAttribute("id", "SendForm")
        submitElement.setAttribute("type", "submit")
        submitElement.setAttribute("value", "Comprobar!")
        formBox.appendChild(submitElement)
  }
  

  function printQuestions(){
    for (let i = 0; i < questions.length; i++) {
        //console.log(questions[i].label);
        //console.log(questions);
        printQuestion(questions[i])
    }
}
printQuestions()

  // ============================= codigo inicial =============================== //

  /* const resp = {
      q5001: "pn",
      q5002: [true, false, false],
      q5003: 14,
      q5004: [false, true, false],
      q5005: "16Sem",
      q5006: [true, true, false]
  }

  function campoRelleno(arr, index) {
      if (document.querySelector(`#${arr[index]} p`)) {
          document.querySelector(`#${arr[index]} p`).remove()
      }
  }

  function campoVacio(arr, index) {
      if (!document.querySelector(`#${arr[index]} p`)) {
          let pElement = document.createElement("p");
          let contenido = document.createTextNode("Por favor seleccione alguna respuesta");
          pElement.appendChild(contenido);
          document.querySelector(`#${arr[index]}`).appendChild(pElement);
          let p = document.querySelector(`#${arr[index]} p`);
          let attr = document.createAttribute("class");
          attr.value = "campo_vacio";
          p.setAttributeNode(attr);
      }
      document.getElementById(arr[index]).className = "default"
  }

  function correcto(arr, index) {
      document.getElementById(arr[index]).className = "green"
  }

  function incorrecto(arr, index) {
      document.getElementById(arr[index]).className = "red"
  }

  document.getElementById("quiz").addEventListener("submit", function(event) {

      event.preventDefault();

      let valRespuestas = document.querySelectorAll('[name]')
      let arrNames = []

      for (let i = 1; i < valRespuestas.length - 1; i++) {
          if (!arrNames.includes(valRespuestas[i].name)) {
              arrNames.push(valRespuestas[i].name)
          }
      }
      // --------------------------- Validaciones --------------------------- //

      for (let j = 0; j < arrNames.length; j++) {
          let valResp = document.querySelectorAll(`[name="${arrNames[j]}"]`)
          let contadorResp = undefined
          let arrResp = []
          for (let i = 0; i < valResp.length; i++) {

              // -------------------------------------------- RADIO -------------------------------------------- //
              if (valResp[i].type == "radio") {
                  if (valResp[i].checked) {
                      contadorResp++
                      campoRelleno(arrNames, j)
                      if (valResp[i].value == resp[arrNames[j]]) {
                          correcto(arrNames, j)
                      } else {
                          incorrecto(arrNames, j)
                      }
                  }
                  if (contadorResp == undefined) {
                      campoVacio(arrNames, j)
                  }
              }

              // -------------------------------------------- NUMBER -------------------------------------------- //

              if (valResp[i].type == "number") {
                  if (!valResp[i].value) {
                      campoVacio(arrNames, j)
                  } else {
                      campoRelleno(arrNames, j)
                      if (valResp[i].value == resp[arrNames[j]]) {
                          correcto(arrNames, j)
                      } else {
                          incorrecto(arrNames, j)
                      }
                  }
              }

              // ------------------------------------------- CHECKBOX ------------------------------------------- //

              if (valResp[i].type == "checkbox") {
                  arrResp.push(valResp[i].checked)
                  if (valResp[i].checked) {
                      contadorResp++
                  }
                  if (arrResp.toString() == resp[arrNames[j]].toString()) {
                      contadorResp++
                      campoRelleno(arrNames, j)
                      correcto(arrNames, j)
                  } else {
                      campoRelleno(arrNames, j)
                      incorrecto(arrNames, j)
                  }
                  if (contadorResp == undefined) {
                      campoVacio(arrNames, j)
                  }
              }

              // ---------------------------------------- SELECT MULTIPLE ---------------------------------------- //

              if (valResp[i].type == "select-multiple") {
                  for (let i = 0; i < valResp[0].length; i++) {
                      arrResp.push(valResp[0][i].selected)
                      if (valResp[0][i].selected) {
                          contadorResp++
                      }
                      if (arrResp.toString() == resp[arrNames[j]].toString()) {
                          contadorResp++
                          campoRelleno(arrNames, j)
                          correcto(arrNames, j)
                      } else {
                          campoRelleno(arrNames, j)
                          incorrecto(arrNames, j)
                      }
                      if (contadorResp == undefined) {
                          campoVacio(arrNames, j)
                      }
                  }
              }
          }
      }
  }) */