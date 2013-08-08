angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $location, $http, Person) {

  console.log(Person);

  $scope.person = {};
  Person.getPerson().success(function(data) {
    $scope.person = data;
    console.log(data);
  });

  $scope.projectInput = '';


  $scope.createProject = function() {
    if ($scope.projectInput != '') {
      console.log($scope.projectInput);
      $scope.projects.push({title:$scope.projectInput, tasks: []});
      $scope.projectInput = '';
    }
  };

  $scope.tasks = [];

  $scope.projects = [
    {title: "General Tasks", tasks: []}
  ];

  $scope.addTask = function() {
    if ($scope.taskInput != '') {
      console.log($scope.taskInput);
      $scope.tasks.push({title:$scope.taskInput, done:false, drag:true, checked: "info"});
      $scope.taskInput = '';
    }
  };

  $scope.removeTask = function() {
    console.log(this);
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