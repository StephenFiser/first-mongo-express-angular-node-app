angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $location, $http, Person) {

  
  Person.getPerson().then(function(data) {
    $scope.person = data;
    console.log($scope.person);

    $scope.projects = $scope.person.projects;
    console.log($scope.projects);

  
  

  $scope.projectInput = '';


  $scope.createProject = function() {
    if ($scope.projectInput != '') {
      console.log($scope.projectInput);
      $scope.projects.push({title:$scope.projectInput, tasks: []});
      $scope.projectInput = '';
    }
  };

  $scope.editProject = function(index) {
    console.log($scope.projects[index].title);
  };

  $scope.tasks = [];
  $scope.trash = [];

  

  $scope.addTask = function() {
    if ($scope.taskInput != '') {
      console.log($scope.taskInput);
      $scope.tasks.push({title:$scope.taskInput, remove:false, drag:true, checked: "danger"});
      $scope.taskInput = '';
    }
  };

  $scope.show = function() {
    console.log($scope.projects);
  }

    $scope.save = function() {
      $http({
      method: 'PUT',
      url: '/person',
      data: $scope.person
      }).
      success(function (data, status, headers, config) {
        console.log(data);
      }).
      error(function (data, status, headers, config) {
        console.log('error');
      });
    };




       $scope.open = function () {
        $scope.shouldBeOpen = true;
      };

      $scope.close = function () {
        $scope.closeMsg = 'I was closed at: ' + new Date();
        $scope.shouldBeOpen = false;
      };

      $scope.items = ['item1', 'item2'];

      $scope.opts = {
        backdropFade: true,
        dialogFade:true
      };
  });
  });