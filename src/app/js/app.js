'use strict';

import {ipcRenderer} from 'electron';
import * as angular from 'angular';
import 'angular-ui-router';

const app = angular.module('hublin.app', ['ui.router']);

app.factory('hublinService', () => {

  return {
    createConference
  };

  function createConference(name) {
    ipcRenderer.send('newConference', {name});
  }
});

app.controller('HublinMenubarController', ($scope, hublinService) => {
  $scope.newConference = function() {
    hublinService.createConference('electron');
  };
});

app.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider.state('hublin', {
    url: '/',
    views: {
      'main': {
        controller: 'HublinMenubarController',
        templateUrl: './templates/menu.html'
      }
    }
  });

  $urlRouterProvider.otherwise('/');
});
