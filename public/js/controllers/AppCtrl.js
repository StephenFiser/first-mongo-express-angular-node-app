angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $location, $http, Person) {

  console.log(Person);

  $scope.person = {};
  Person.getPerson().success(function(data) {
    $scope.person = data;
    console.log(data);
  });

    $scope.addTask = function() {
      console.log($scope.taskInput);
      $scope.person.projects.push({title:$scope.taskInput});
      
      $scope.taskInput = '';
    };



    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!'
    });

  }).
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  });