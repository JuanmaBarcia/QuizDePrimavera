let resultados = JSON.parse(localStorage.getItem("respuestas"))
let ultimosresultados = resultados.slice(resultados.length-5,resultados.length)

let fecha = []
let aciertos = []

for (let i = 0; i < ultimosresultados.length; i++) {
    fecha.push(ultimosresultados[i].fecha)
    aciertos.push(ultimosresultados[i].aciertos)
}

  let pintarGrafica = (fecha, aciertos) => {
    new Chartist.Line('.ct-chart', {
    labels: fecha,
    series: [aciertos],
  },
  {
    high:10,
    low: 0,
    showArea: false,
    axisX:{
        
    },
    axisY: {
      onlyInteger: true,
      
    }
  });
}
pintarGrafica(fecha, aciertos)