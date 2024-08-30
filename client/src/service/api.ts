export function fetchConteggioCantieri() {
    return fetch("http://127.0.0.1:5000/conteggiocantieri", { mode: 'cors' })
        .then(data => data.json());
}

export function fetchPianoAnno() {
    return fetch("http://127.0.0.1:5000/pianoanno", {mode: 'cors'})
        .then(data => data.json());
}

export function fetchPercentualePresenza() {
    return fetch("http://127.0.0.1:5000/percentualepreseza", {mode: 'cors'})
        .then(data => data.json());
}

export function fetchAndamentiPiani() {
    return fetch("http://127.0.0.1:5000/andamentopiani", {mode: 'cors'})
        .then(data => data.json());
}