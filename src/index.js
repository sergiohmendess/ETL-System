const path = require('path');
const extract = require('./extract');
const transform = require('./transform');
const load = require('./load');
const winston = require('winston');

// Configuração do logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'etl.log' })
    ]
});

/**
 * Executa o processo ETL.
 * @param {string} inputFilePath - Caminho para o arquivo CSV de entrada.
 * @param {string} outputFilePath - Caminho para o arquivo CSV de saída.
 */
async function runETL(inputFilePath, outputFilePath) {
    try {
        logger.info('Iniciando ETL...');
        
        // Extração
        const data = await extract(inputFilePath);
        logger.info('Dados extraídos', { data });

        // Transformação
        const transformedData = transform(data);
        logger.info('Dados transformados', { data: transformedData });

        // Carregamento
        const result = await load(transformedData, outputFilePath);
        logger.info(result);
    } catch (err) {
        logger.error('Erro no processo ETL', { error: err });
    }
}

// Exemplo de uso
const inputFilePath = path.join(__dirname, '../data/input.csv');
const outputFilePath = path.join(__dirname, '../data/output.csv');
runETL(inputFilePath, outputFilePath);
