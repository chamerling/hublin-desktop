'use strict';

import {app, ipcMain, ipcRenderer, BrowserWindow, Menu} from 'electron';
import menubar from 'menubar';
const isDev = require('electron-is-dev');
const path = require('path');

if (isDev) {
  console.log('Running in development');
} else {
  console.log('Running in production');
}
require('electron-debug')({showDevTools: true});

let mb = menubar({
  icon: __dirname + '/app/assets/menubarTemplate.png',
  tooltip: 'Hublin',
  showDockIcon: true,
  preloadWindow : true,
  width: 400,
  height: 500,
  resizable: false
});

mb.on('ready', function() {

  Menu.setApplicationMenu(require('./menu'));

  function initialize() {
    mb.window.setSize(320, 500)
    mb.window.setMaximumSize(320, 600)
    mb.window.setMinimumSize(320, 400)
    mb.window.setResizable(false)
    mb.window.loadURL('file://' + __dirname + '/app/index.html')
  }

  initialize();
});

let mainWindow = null;

app.on('window-all-closed', () => {
});

app.on('ready', () => {
  console.log('Hublin is ready')
});

function openConference(name) {
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
  mainWindow.setTitle(`Hublin - ${name}`);
  mainWindow.loadURL(`https://hubl.in/${name}`);
}

ipcMain.on('newConference', conference => {
  openConference(conference.name || 'electron');
});
