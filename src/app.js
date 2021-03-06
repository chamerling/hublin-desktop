'use strict';

import {app, ipcMain, ipcRenderer, BrowserWindow, Menu} from 'electron';
import menubar from 'menubar';
const isDev = require('electron-is-dev');
const path = require('path');
const username = require('username');
import {saveConference} from './store';
const ENDPOINT = 'https://hubl.in';
const APP_NAME = 'Hublin';

if (isDev) {
  console.log('Running in development');
} else {
  console.log('Running in production');
}
require('electron-debug')({showDevTools: true});

let mb = menubar({
  icon: __dirname + '/app/assets/menubarTemplate.png',
  tooltip: APP_NAME,
  showDockIcon: true,
  preloadWindow : true,
  width: 400,
  height: 500,
  resizable: false
});


mb.on('ready', () => {

  mb.tray.on('drop-text', (evt, data) => {
    if (data) {
      openConference(data)
    }
  });

  Menu.setApplicationMenu(require('./menu'));

  function initialize() {
    mb.window.setSize(320, 300)
    mb.window.setMaximumSize(320, 300)
    mb.window.setMinimumSize(320, 300)
    mb.window.setResizable(false)
    mb.window.loadURL('file://' + __dirname + '/app/index.html')
  }

  initialize();
});

let mainWindow = null;

app.on('window-all-closed', () => {
});

app.on('ready', () => {
  console.log(`${APP_NAME} is ready`);
});

function openConference(name) {
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    backgroundColor: '#000',
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
  mainWindow.loadURL(`${ENDPOINT}/${name}`);
  mainWindow.on('closed', () => {
    mainWindow = null
  });
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.setTitle(`${APP_NAME} - ${name}`);
  });
}

function getConferenceName(name) {
  if (name) {
    return Promise.resolve(name);
  }

  return username();
}

ipcMain.on('newConference', (evt, conference) => {
  getConferenceName(conference.name).then(name => {
    openConference(name);
    saveConference(name);
  });
});

ipcMain.on('closeConference', () => {
  if (mainWindow) {
    mainWindow.close();
  }
});
