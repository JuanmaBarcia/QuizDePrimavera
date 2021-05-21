
let leerRespuestas = JSON.parse(localStorage.getItem("respuestas"))

console.log(leerRespuestas.pop().aciertos)


let leerPreguntas = JSON.parse(localStorage.getItem("numero de preguntas"))


document.getElementById("resultado").innerHTML=leerRespuestas.pop().aciertos
document.getElementById("numeropreguntas").innerHTML=leerPreguntas