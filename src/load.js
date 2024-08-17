const fs = require('fs');
const fastcsv = require('fast-csv');

/**
 * Salva dados transformados em um arquivo CSV.
 * @param {object[]} data - Dados transformados.
 * @param {string} outputFilePath - Caminho para o arquivo CSV de saída.
 * @returns {Promise<string>} - Mensagem de sucesso.
 */
async function load(data, outputFilePath) {
    return new Promise((resolve, reject) => {
        const ws = fs.createWriteStream(outputFilePath);
        fastcsv
            .write(data, { headers: true })
            .pipe(ws)
            .on('finish', () => resolve('Dados carregados com sucesso.'))
            .on('error', (error) => {
                console.error(`Erro ao salvar o arquivo ${outputFilePath}:`, error);
                reject(error);
            });
    });
}

module.exports = load;
