let leerRespuestas = JSON.parse(localStorage.getItem("respuestas"))
let leerPreguntas = JSON.parse(localStorage.getItem("numero de preguntas"))

document.getElementById("resultado").innerHTML = leerRespuestas.pop().aciertos
document.getElementById("numeropreguntas").innerHTML = leerPreguntas