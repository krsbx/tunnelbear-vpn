import { app, BrowserWindow, shell } from 'electron';
import { release } from 'os';
import { join } from 'path';

const DIST_PATH = join(__dirname, '../dist');

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

export const ROOT_PATH = {
  // /dist
  dist: DIST_PATH,
  // /dist or /public
  public: app.isPackaged ? DIST_PATH : join(DIST_PATH, '../public'),
};

// Here, you can also use other preload
const preload = join(__dirname, 'preload.js');
const url = process.env.VITE_DEV_SERVER_URL ?? 'http://127.0.0.1:7777';
const indexHtml = join(ROOT_PATH.dist, 'index.html');

const createWindow = async () => {
  const mainWindow = new BrowserWindow({
    title: 'VITE ELECTRON TEMPLATE',
    icon: join(ROOT_PATH.public, 'vite.svg'),
    webPreferences: {
      preload,
      contextIsolation: true,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
    },
    minWidth: 500,
    minHeight: 500,
  });

  if (app.isPackaged) {
    mainWindow.loadFile(indexHtml);
  } else {
    mainWindow.loadURL(url);
    mainWindow.webContents.openDevTools();
  }

  mainWindow.removeMenu();
  mainWindow.setMenuBarVisibility(false);

  // Test actively push message to the Electron-Renderer
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow?.webContents.send(
      'main-process-message',
      new Date().toLocaleString()
    );
  });

  // Make all links open with the browser, not with the application
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url);
    if (url.startsWith('http:')) shell.openExternal(url);
    return { action: 'deny' };
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
