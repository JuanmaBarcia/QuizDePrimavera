const resp = {
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
})