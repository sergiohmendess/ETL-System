/**
 * Transforma dados extraídos.
 * @param {object[]} data - Dados extraídos como uma lista de objetos.
 * @returns {object[]} - Dados transformados.
 */
function transform(data) {
    return data.map(record => {
        const value = parseFloat(record.value);
        return {
            ...record,
            value: isNaN(value) ? 'N/A' : value.toFixed(2),
            doubledValue: isNaN(value) ? 'N/A' : (value * 2).toFixed(2)
        };
    });
}

module.exports = transform;
