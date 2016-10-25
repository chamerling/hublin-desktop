'use strict';

const low = require('lowdb');
const db = low('db.json',  {storage: require('lowdb/lib/file-async')});
db.defaults({ conferences: []}).value();

function saveConference(name) {
  db.get('conferences').push({
    name,
    created: Date.now()
  }).value();
}

function getConferences() {
  return db.get('conferences').value();
}

function getLastConference() {
  return db.get('conferences').sortBy('created').take(1).value()[0];
}

export {
  saveConference,
  getConferences,
  getLastConference
};
