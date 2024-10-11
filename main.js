/*
 * Este archivo es parte de AikenGen.
 *
 * AikenGen es software libre: puedes redistribuirlo y/o modificarlo
 * bajo los términos de la Licencia Pública General de GNU, ya sea la versión 3
 * de la licencia, o (a tu elección) cualquier versión posterior.
 *
 * Este programa se distribuye con la esperanza de que sea útil, pero SIN NINGUNA
 * GARANTÍA; incluso sin la garantía implícita de COMERCIALIZACIÓN o IDONEIDAD
 * PARA UN PROPÓSITO PARTICULAR. Consulta la Licencia Pública General de GNU
 * para más detalles.
 */

const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

let mainWindow;

function createWindow() {
  // Obtener las dimensiones de la pantalla principal
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  // Crear la ventana utilizando el ancho y alto de la pantalla
  const mainWindow = new BrowserWindow({
    width: width,   // Utiliza el ancho total de la pantalla
    height: height, // Utiliza el alto total de la pantalla
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.setMenu(null); // Oculta la barra de menú

  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '/frontend/build/index.html')}`;

  mainWindow.loadURL(startUrl);

  // Maximizar la ventana automáticamente
  mainWindow.maximize();

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('resize', () => {
    const { width, height } = mainWindow.getBounds();
  });

  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
