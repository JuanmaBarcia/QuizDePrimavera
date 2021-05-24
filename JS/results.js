import { firebaseConfig } from './config.js'
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

function readResult(idResult) {
    db
        .collection("results")
        .doc(idResult)
        .get()
        .then((doc) => {
            if (doc.exists) {
                document.getElementById("resultado").innerHTML = doc.data().aciertos
                document.getElementById("numeropreguntas").innerHTML = doc.data().numPreguntas
            } else {
                console.log("No such document!");
            }
        })
        .catch((error) => {
            console.log("Error getting document:", error);
        });
}

let idResult = JSON.parse(localStorage.getItem("idResult"))
readResult(idResult)