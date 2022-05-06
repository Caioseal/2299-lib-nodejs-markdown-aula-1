const chalk = require('chalk')
const pegaArquivo = require('./index')
const validaURLs = require('./http-validacao')


const caminho = process.argv

async function processaTexto(caminhoArquivo) {
    const resultado = await pegaArquivo(caminhoArquivo[2])
    if (caminho[3] === 'validar') {
        console.log(chalk.yellow('Links validados'))
        console.log(JSON.stringify(await validaURLs(resultado), null, 4))
    } else {
        console.log(JSON.stringify(resultado, null, 4))
    }
}

processaTexto(caminho)