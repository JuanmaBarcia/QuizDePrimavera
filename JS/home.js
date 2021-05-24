import { firebaseConfig } from './config.js'
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

let arrFecha = []
let arrAciertos = []

async function readResults() {
    let data = await db
        .collection("results")
        .orderBy("fecha", "desc")
        .limit(5)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                arrFecha.push(doc.data().fecha)
                arrAciertos.push(doc.data().aciertos)
            });
        });
}
readResults()

let resultados = JSON.parse(localStorage.getItem("respuestas"))
let ultimosresultados = resultados.slice(resultados.length - 5, resultados.length)


// for (let i = 0; i < ultimosresultados.length; i++) {
//     fecha.push(ultimosresultados[i].fecha)
//     aciertos.push(ultimosresultados[i].aciertos)
// }

let pintarGrafica = (fecha, aciertos) => {
    new Chartist.Line('.ct-chart', {
        labels: fecha,
        series: [aciertos],
    }, {
        high: 10,
        low: 0,
        showArea: false,
        charPadding: {
            top: 35,
            right: 15,
            bottom: 25,
            left: 5
        },
        axisY: {
            onlyInteger: true,

        }
    });
}
pintarGrafica(arrFecha, arrAciertos)