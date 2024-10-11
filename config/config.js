const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'config.json');

// Leer la configuración
function readConfig() {
    if (fs.existsSync(configPath)) {
        const rawData = fs.readFileSync(configPath);
        return JSON.parse(rawData);
    }
    return {}; // Devuelve un objeto vacío si el archivo no existe
}

// Escribir la configuración
const writeConfig = (newConfig) => {
    const existingConfig = readConfig(); // Leer la configuración existente
    const updatedConfig = { ...existingConfig, ...newConfig }; // Combinar la nueva configuración con la existente

    fs.writeFileSync(configPath, JSON.stringify(updatedConfig, null, 2)); // Escribir el nuevo objeto de configuración en el archivo
};

module.exports = {
    readConfig,
    writeConfig,
};
