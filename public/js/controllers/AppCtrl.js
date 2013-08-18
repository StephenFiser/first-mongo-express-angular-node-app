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
    
  };

  $scope.removeProject = function(index) {
    $scope.projects.splice(index, 1);

  }

  $scope.tasks = [];
  $scope.trash = [];

  

  $scope.addTask = function(index) {
    if ($scope.projects[index].taskInput != '') {
      console.log($scope.projects[index].taskInput);
      console.log($scope.projects[index]);
      $scope.projects[index].tasks.push({title:$scope.projects[index].taskInput, remove:false, drag:true, checked: "danger"});
      $scope.projects[index].taskInput = '';
    }
  };

  $scope.show = function() {
    console.log($scope.projects);
  }

    

    $scope.logout = function() {
      $http({
        method: 'GET',
        url: '/logout'
      }).success(function() {
        window.location = '/login';
      });
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    $scope.alerts = [];

       $scope.open = function () {
        $scope.shouldBeOpen = true;
      };

      $scope.close = function () {
        $scope.closeMsg = 'I was closed at: ' + new Date();
        $scope.shouldBeOpen = false;
      };

      $scope.save = function() {
        $scope.alerts.push({type:'success', msg: 'Successfully Saved!'})
                     .delay(800)
                     .splice({type:'success', msg: 'Successfully Saved!'}, 1);
        $http({
        method: 'PUT',
        url: '/person',
        data: $scope.person
        });
      };

      $scope.items = ['item1', 'item2'];

      $scope.opts = {
        backdropFade: true,
        dialogFade:true
      };
  });
  });