const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

function gerenciaErros(erro) {
    throw new Error (erro.message)
}

async function checaStatus(arrayURLs) {
    try {
        const arrayStatus = await Promise
        .all(arrayURLs
            .map(async url => {
                const response = await fetch(url)
                return `${response.status} - ${response.statusText}`
            }))
    return arrayStatus
    } 
    catch (erro) {
        gerenciaErros(erro)
    }
}

function geraArrayURL(arrayLinks) {
    return arrayLinks.map(objetoLink => Object.values(objetoLink).join())
}

async function validaURLs(arrayLinks) {
    const links = geraArrayURL(arrayLinks)
    const statusLink = await checaStatus(links)
    
    const resultados = arrayLinks.map((objeto, indice) => ({
        ...objeto, //Spread Operator
        status: statusLink[indice]
    }))
    return resultados
}

module.exports = validaURLs