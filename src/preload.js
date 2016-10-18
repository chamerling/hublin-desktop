var ipcRenderer = require('electron').ipcRenderer;

document.addEventListener('click', event => {
  if (event.target.className === 'fa fa-phone fa-2x conference-toggle-terminate-call-button conference-light-button') {
    ipcRenderer.send('closeConference');
  }
});
