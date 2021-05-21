let resultados = JSON.parse(localStorage.getItem("respuestas"))

let fecha = []
let aciertos = []

for (let i = 0; i < resultados.length; i++) {
    fecha.push(resultados[i].fecha)
    aciertos.push(resultados[i].aciertos)
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
    axisY: {
      onlyInteger: true,
      
    }
  });
}
pintarGrafica(fecha, aciertos)