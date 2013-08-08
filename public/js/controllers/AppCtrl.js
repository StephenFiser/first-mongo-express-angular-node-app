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

  $scope.editProject = function(index) {
    console.log($scope.projects[index].title);
  };

  $scope.tasks = [];
  $scope.trash = [];

  $scope.projects = [
    {title: "General Tasks", tasks: []}
  ];

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
  