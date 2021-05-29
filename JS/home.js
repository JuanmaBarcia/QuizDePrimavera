import { firebaseConfig } from './config.js'
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

let fecha = []
let aciertos = []

async function readResults() {
    let data = await db
        .collection("results")
        .orderBy("fecha", "desc")
        .limit(5)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                fecha.push(doc.data().fecha)
                aciertos.push(doc.data().aciertos)
            });
        });
    pintarGrafica(fecha, aciertos)
}
readResults()

let pintarGrafica = (arrFecha, arrAciertos) => {
    new Chartist.Line('.ct-chart', {

        labels: arrFecha.reverse(),
        series: [arrAciertos.reverse()],
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

        },
        plugins: [
            Chartist.plugins.ctAxisTitle({
              axisX: {
                axisTitle: "Fecha",
                axisClass: "ct-axis-title",
                offset: {
                  x: 0,
                  y: 50
                },
                textAnchor: "middle"
              },
              axisY: {
                axisTitle: "Aciertos",
                axisClass: "ct-axis-title",
                offset: {
                  x: 0,
                  y: -1
                },
                flipTitle: false
              }
            })
          ]
    });
}
