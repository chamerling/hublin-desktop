'use strict';

const storage = require('electron-json-storage');

function saveConference(name, callback) {
  const id = Date.now();

  storage.get('conferences', (err, data) => {
    if (err) {
      return;
    }

    data[id] = {
      name,
      date: id
    };

    storage.set('conferences', data, callback);
  });
}

function getConferences(callback) {
  storage.get('conferences', callback);
}

module.exports.getConferences = getConferences;
module.exports.saveConference = saveConference;
