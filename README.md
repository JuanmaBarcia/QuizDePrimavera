# QuizDePrimavera

# Tareas pendientes

# Objetivo

# -HECHO- El Quiz constará de 10 preguntas. Cada pregunta tendrá 4 opciones y sólo una de ellas será la correcta.
# -HECHO- Podrán ser preguntas nuestras o preguntas que vengan de https://opentdb.com/
# -HECHO- La aplicación tendrá que ser una SPA. Sólo una pregunta cada vez en pantalla.


# Requisitos para este proyecto

# -HECHO- Manipulación dinámica del DOM
# -HECHO- Crear una página SPA para las preguntas
# -HECHO- Manejo de ES6
# -HECHO- Asincronía. Usar API de preguntas https://opentdb.com/
# -HECHO- APIs HTML5: Uso de Local storage y gráficas, etc...
# -HECHO- Sin frameworks ni librerias externas en la medida de lo posible
# -HECHO- Gestión del proyecto desde el inicio en un repositorio propio en Github
Código limpio, buenas prácticas


Opcional

Otras APIs, mix de preguntas de distinas fuentes...
En general, cualquier extra será bien recibido para que investiguéis por vuestra cuenta, siempre y cuando tenga sentido


# FASES

FASE 1: Diseño del front
Diseño responsive, mobile first, semántica HTML5

FASE 2: Lógica de JavaScript
Adaptar nuestra app acorde a lo que vimos en clase

# -HECHO- proyectos-quiz-resurrected{

# -HECHO- Hacer que nuestra aplicación de Quiz imprima y corrija tantas preguntas como le pasemos, a través de una colección de objetos.

# -HECHO- Van a entrar en juego 2 funciones, printQuestions y printQuestion, y una colección de objetos, questions.

# -HECHO- printQuestions recibe la colección de preguntas questions y devuelve el HTML con todas las preguntas.
# -HECHO- printQuestion recibe una pregunta y devuelve el HTML de esa pregunta.
# -HECHO- questions es una colección con todas las preguntas.

# -HECHO- Crearemos nuestra función printQuestion, donde pondremos una de las preguntas, completa. Con esto se nos queda igual que # printQuestions, imprimiendo un string con una pregunta, pero una en vez de 5.

# -HECHO- Una vez tenemos esta pregunta, sacaremos todos los valores relevantes, en forma de objeto, como aquí.

# Ejemplo:

# const question = {
#   name: 'elminster',
#   label: '¿Cual es el nombre mas comun del mundo?',
#   answers: [
#     {label: 'Un bardo', value: 'bardo'},
#     {label: 'Un mercader', value: 'mercader'},
#     {label: 'Un mago', value: 'mago'},
#     {label: 'Un marinero', value: 'marinero'},
#   ]
# }

# -HECHO- Haz que al ejecutar printQuestion con el objeto anterior question como argumento, devuelva el mismo HTML. 
# -HECHO- Con esto, tenemos una función que, al pasarle una pregunta, devuelve el HTML para esa pregunta.

# -HECHO- Crea la colección questions y mete todas las preguntas ahí, con el mismo formato que tiene el objeto question.

# -HECHO- ¡Hora de montar el puzzle!

# -HECHO- Una vez llegado hasta aquí, tendrás todo lo necesario: printQuestions, printQuestion y tu colección de questions

# -HECHO- El funcionamiento es el siguiente: - printQuestions se ejecuta y toma como argumento questions. - Dentro de printQuestions iterarás sobre dichas questions e imprimirás cada una de ellas con printQuestion en cada iteración

# Premium

# -HECHO- Te habrás dado cuenta que todo aquello que se halla dentro de printQuestion es susceptible de mejorarse, como iterar para cada answer, crear funciones adicionales... ¡HAZLO!

# -HECHO- Nuestra misión hoy será hacer que la validación sea posible para todos las preguntas que queramos. Esto se logra de la siguiente manera: En cada pregunta, de nuestra colección de preguntas, debe estar la respuesta correcta.

# -HECHO- Lleva a cada pregunta su respuesta correcta.
# Ejemplo:

# const question = {
#   name: 'elminster',
#   label: '¿Cual es el nombre mas comun del mundo?',
#   answers: [
#     {label: 'Un bardo', value: 'bardo'},
#     {label: 'Un mercader', value: 'mercader'},
#     {label: 'Un mago', value: 'mago'},
#     {label: 'Un marinero', value: 'marinero'},
#   ]
#   correct: 'mago'
# }

# -HECHO- Una vez que el usuario envíe sus resultados, iteraremos por cada uno de ellos y buscaremos dentro de la colección questions su respuesta correctabuscaremos dentro de la colección questions su respuesta correcta.
}

# -HECHO- Conseguir con 10 preguntas nuestras, guardadas en un array de objetos, se pueda jugar a nuestro Quiz. [{..},{..},{..}...{..# }]

# FASE 3: Asincronía
# -HECHO- Javascript: Manejo de asincronía. Leer 10 preguntas random de la API de prenguntas para generar el Quiz

# FASE 4 (avanzado) - APIs HTML5
# -HECHO- Almacenar la puntuación de cada partida en un array de objetos [{..},{..},{..}...{..}] en Local Storage. 
# -HECHO- Guardar puntuación y fecha en cada objeto del array

Mostrar en la Home con una gráfica los resultados de las últimas partidas jugadas (leer puntuaciones de LocalStorage). # Representar Fecha(eje X) vs Puntuación(eje Y)

Ventanas
home.html. Página de bienvenida + gráfica de últimos resultados
# -HECHO- question.html SPA. Página para renderizar las 10 distintas preguntas
results.html Página para mostrar resultado del quiz
