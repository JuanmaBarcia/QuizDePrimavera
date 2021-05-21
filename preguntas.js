const questions = [{
    name: 'uno',
    label: '¿Cuál de estos títulos no tiene un Oscar a mejor película?',
    answers: [
        { label: 'Argo', value: 'Argo' },
        { label: 'El resplandor', value: 'El resplandor' },
        { label: 'Infiltrados', value: 'Infiltrados' },
        { label: 'Nomadland', value: 'Nomadland' },
    ],
    correct: 'El resplandor'
}, {
    name: 'dos',
    label: '¿Cuál de estas mujeres acumula más nominaciones como mejor actriz?',
    answers: [
        { label: 'Meryl Streep', value: 'Meryl Streep' },
        { label: 'Katharine Hepburn', value: 'Katharine Hepburn' },
        { label: 'Bette Davis', value: 'Bette Davis' },
        { label: 'Jane Fonda', value: 'Jane Fonda' },
    ],
    correct: 'Meryl Streep'
}, {
    name: 'tres',
    label: '¿Qué cinta obtuvo el Oscar a la mejor película en 1984?',
    answers: [
        { label: 'En un lugar del corazon', value: 'En un lugar del corazon' },
        { label: 'Pasaje a la India', value: 'Pasaje a la India' },
        { label: 'Amadeus', value: 'Amadeus' },
        { label: 'Los gritos del silencio', value: 'Los gritos del silencio' },
    ],
    correct: 'Amadeus'
}, {
    name: 'cuatro',
    label: '¿Qué hombre acumula más nominaciones a los Oscar como mejor actor?',
    answers: [
        { label: 'Paul Newman', value: 'Paul Newman' },
        { label: 'Jack Nicholson', value: 'Jack Nicholson' },
        { label: 'Marlon Bradon', value: 'Marlon Bradon' },
        { label: 'Robert Redford', value: 'Robert Redford' },
    ],
    correct: 'Jack Nicholson'
}, {
    name: 'cinco',
    label: '¿Qué director acumula más Oscars a la mejor dirección?',
    answers: [
        { label: 'John Ford', value: 'John Ford' },
        { label: 'Steven Spielberg', value: 'Steven Spielberg' },
        { label: 'Clint Eastwood', value: 'Clint Eastwood' },
        { label: 'Tim Burton', value: 'Tim Burton' },
    ],
    correct: 'John Ford'
}]

// funcion que decodifica los caracteres especiales
function htmlEntities(str) {
    return String(str).replace('&ntilde;', 'ñ')
        .replace(/&Ntilde;/g, 'Ñ')
        .replace(/&amp;/g, '&')
        .replace(/&Ntilde;/g, 'Ñ')
        .replace(/&ntilde;/g, 'ñ')
        .replace(/&Ntilde;/g, 'Ñ')
        .replace(/&Agrave;/g, 'À')
        .replace(/&Aacute;/g, 'Á')
        .replace(/&Acirc;/g, 'Â')
        .replace(/&Atilde;/g, 'Ã')
        .replace(/&Auml;/g, 'Ä')
        .replace(/&Aring;/g, 'Å')
        .replace(/&AElig;/g, 'Æ')
        .replace(/&Ccedil;/g, 'Ç')
        .replace(/&Egrave;/g, 'È')
        .replace(/&Eacute;/g, 'É')
        .replace(/&Ecirc;/g, 'Ê')
        .replace(/&Euml;/g, 'Ë')
        .replace(/&Igrave;/g, 'Ì')
        .replace(/&Iacute;/g, 'Í')
        .replace(/&Icirc;/g, 'Î')
        .replace(/&Iuml;/g, 'Ï')
        .replace(/&ETH;/g, 'Ð')
        .replace(/&Ntilde;/g, 'Ñ')
        .replace(/&Ograve;/g, 'Ò')
        .replace(/&Oacute;/g, 'Ó')
        .replace(/&Ocirc;/g, 'Ô')
        .replace(/&Otilde;/g, 'Õ')
        .replace(/&Ouml;/g, 'Ö')
        .replace(/&Oslash;/g, 'Ø')
        .replace(/&Ugrave;/g, 'Ù')
        .replace(/&Uacute;/g, 'Ú')
        .replace(/&Ucirc;/g, 'Û')
        .replace(/&Uuml;/g, 'Ü')
        .replace(/&Yacute;/g, 'Ý')
        .replace(/&THORN;/g, 'Þ')
        .replace(/&szlig;/g, 'ß')
        .replace(/&agrave;/g, 'à')
        .replace(/&aacute;/g, 'á')
        .replace(/&acirc;/g, 'â')
        .replace(/&atilde;/g, 'ã')
        .replace(/&auml;/g, 'ä')
        .replace(/&aring;/g, 'å')
        .replace(/&aelig;/g, 'æ')
        .replace(/&ccedil;/g, 'ç')
        .replace(/&egrave;/g, 'è')
        .replace(/&eacute;/g, 'é')
        .replace(/&ecirc;/g, 'ê')
        .replace(/&euml;/g, 'ë')
        .replace(/&igrave;/g, 'ì')
        .replace(/&iacute;/g, 'í')
        .replace(/&icirc;/g, 'î')
        .replace(/&iuml;/g, 'ï')
        .replace(/&eth;/g, 'ð')
        .replace(/&ntilde;/g, 'ñ')
        .replace(/&ograve;/g, 'ò')
        .replace(/&oacute;/g, 'ó')
        .replace(/&ocirc;/g, 'ô')
        .replace(/&otilde;/g, 'õ')
        .replace(/&ouml;/g, 'ö')
        .replace(/&oslash;/g, 'ø')
        .replace(/&ugrave;/g, 'ù')
        .replace(/&uacute;/g, 'ú')
        .replace(/&ucirc;/g, 'û')
        .replace(/&uuml;/g, 'ü')
        .replace(/&yacute;/g, 'ý')
        .replace(/&thorn;/g, 'þ')
        .replace(/&yuml;/g, 'ÿ')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
}