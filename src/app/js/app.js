'use strict';

import {ipcRenderer} from 'electron';
import * as angular from 'angular';
import 'angular-material';
import 'angular-animate';
import 'angular-ui-router';

const app = angular.module('hublin.app', ['ui.router', 'ngMaterial', 'ngAnimate']);

app.factory('hublinService', () => {

  return {
    createConference
  };

  function createConference(name) {
    ipcRenderer.send('newConference', {name});
  }
});

app.controller('HublinMenubarController', ($scope, hublinService) => {

  $scope.conference = {
    name: ''
  };

  $scope.newConference = function() {
    hublinService.createConference($scope.conference.name);
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
