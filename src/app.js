'use strict';

import {app, ipcMain, ipcRenderer, BrowserWindow} from 'electron';
const isDev = require('electron-is-dev');
const path = require('path');

if (isDev) {
  console.log('Running in development');
} else {
  console.log('Running in production');
}
require('electron-debug')({showDevTools: true});

let mainWindow = null;

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    alwaysOnTop: true,
    autoHideMenuBar: true,
    width: 580,
    height: 365,
    webPreferences: {
			plugins: true,
			allowDisplayingInsecureContent: true,
			nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
		}
  });
  mainWindow.setSkipTaskbar(true);
  mainWindow.setTitle('Hublin');
  mainWindow.loadURL(`https://hubl.in/electron`);
});
