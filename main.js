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

const { app, BrowserWindow, screen, ipcMain } = require('electron');
const path = require('path');
const config = require('./config/config.js');

const isDev = process.env.NODE_ENV === 'development';

let mainWindow;

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: false, // Mantenerlo en falso por seguridad
      contextIsolation: true,  // Aislar el contexto para mayor seguridad
      preload: path.join(__dirname, 'preload.js') // Aquí cargamos el preload script
    }
  });

  mainWindow.setMenu(null);

  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '/frontend/build/index.html')}`;

  mainWindow.loadURL(startUrl);
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

// IPC Handlers for config management
ipcMain.handle('read-config', async () => {
  return config.readConfig();  // Devuelve la configuración
});

ipcMain.on('write-config', (event, data) => {
  config.writeConfig(data);  // Escribe la configuración
});

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
