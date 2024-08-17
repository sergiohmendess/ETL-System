const fs = require('fs');
const csv = require('csv-parser');

/**
 * Lê e analisa dados de um arquivo CSV.
 * @param {string} filePath - Caminho para o arquivo CSV.
 * @returns {Promise<object[]>} - Dados extraídos como uma lista de objetos.
 */
async function extract(filePath) {
    if (!fs.existsSync(filePath)) {
        throw new Error(`O arquivo ${filePath} não existe.`);
    }
    
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => {
                console.error(`Erro ao ler o arquivo ${filePath}:`, error);
                reject(error);
            });
    });
}

module.exports = extract;
