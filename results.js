
let leerRespuestas = JSON.parse(localStorage.getItem("respuestas"))
document.getElementById("resultado").innerHTML=leerRespuestas.pop().aciertos


let leerPreguntas = JSON.parse(localStorage.getItem("numero de preguntas"))


document.getElementById("numeropreguntas").innerHTML=leerPreguntas