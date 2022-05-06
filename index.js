const chalk = require('chalk')
const fs = require('fs') //Não precisa instalar, somente importar pois já é do Node

function extraiLinks(texto) {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
    const arrayResultados = [];
    let temp;

    while((temp = regex.exec(texto)) !== null) {
      arrayResultados.push({ [temp[1]]: temp[2] })
    }

    return arrayResultados.length === 0 ? 'não há links': arrayResultados;
  }

async function pegaArquivo(caminhoArquivo) {
    const encoding = 'utf-8'
    try {
        const texto = await fs.promises.readFile(caminhoArquivo, encoding)
        return extraiLinks(texto)
    } catch (erro) {
        console.log(chalk.red(erro))
    }
}

module.exports = pegaArquivo
