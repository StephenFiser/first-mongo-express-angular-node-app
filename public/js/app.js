'use strict';

// Declare app level module which depends on filters, and services

var app = angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'ngDragDrop',
]);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/view1', {
      templateUrl: 'partials/partial1',
      controller: 'MyCtrl1'
    }).
    when('/view2', {
      templateUrl: 'partials/partial2',
      controller: 'MyCtrl2'
    }).
    otherwise({
      redirectTo: '/view1'
    });

  $locationProvider.html5Mode(true);
});

app.factory('Person', function($http) {
  var Person = {
    getPerson: function() {
      var promise = $http.get('/person').then(function(response) {
        console.log(response);
        return response.data;
      });
      return promise;
    }
  };
  return Person;
});

app.filter('removeWhite', function() {
  return function(input) {
    return input.replace(/\s+/g, '');
  }
});
